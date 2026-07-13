# CLAUDE.md — Guide du projet NursaFlow

> Ce fichier oriente un agent de codage (Claude Code) qui travaille sur NursaFlow.
> Lis-le en entier avant toute modification. Le backlog priorisé des améliorations
> est dans `AMELIORATIONS.md`.

## 1. Qu'est-ce que NursaFlow

Application web d'aide à l'étude pour les **étudiant·e·s en soins infirmiers au cégep (Québec)**.
Toute l'interface est en **français québécois (fr-CA)**, avec la terminologie infirmière
locale (OIIQ/OIIAQ, PTI, jugement clinique, PQRSTU, SBAR).

C'est aujourd'hui un **prototype fonctionnel (MVP)** livré comme **un seul fichier
`nursaflow.html` autonome**, généré depuis la source `src/` par `node build.mjs`
(voir §2). Il fonctionne :
- ouvert localement (`file://`),
- hébergé (http/https),
- installé sur l'écran d'accueil d'un téléphone (PWA légère via manifest inline),
- installé comme app de bureau (Edge/Chrome « installer comme application »).

## 2. Contrainte d'architecture la plus importante

**Le livrable est un fichier HTML unique et autonome.** Tout — CSS, JS, icônes SVG,
icône PWA (base64), manifest (data-URI) — est inline. Aucune dépendance runtime, aucun
bundler (`node_modules` ne sert qu'aux tests : jsdom).

**Source ↔ build (P0-2)** : la source de vérité est `src/` —
`src/index.html` (squelette avec les jetons `@@NURSAFLOW:STYLES@@` et
`@@NURSAFLOW:APP_JS@@`), `src/styles.css` (design system) et `src/app.js`
(toute la logique). `node build.mjs` inline le tout et régénère `nursaflow.html`.
**N'édite jamais `nursaflow.html` directement** : modifie `src/`, relance le build,
puis valide (§7).

Deux seules ressources externes chargées par CDN :
- `three.js r128` (anatomie 3D) — `cdnjs`
- `jszip 3.10.1` (extraction de texte des `.pptx`) — `cdnjs`
- polices Google (Wix Madefor, JetBrains Mono).

> **Ne casse pas le modèle « fichier unique » sans y avoir été explicitement invité.**
> Si une amélioration exige un vrai build (modules, backend), propose-la d'abord et
> décris la migration ; ne l'impose pas silencieusement. Voir `AMELIORATIONS.md` §
> « Refonte structurelle » pour le chemin recommandé.

## 3. Carte du code (`src/`, assemblé en `nursaflow.html` ~1760 lignes)

Un seul `<style>` (design system, `src/styles.css`) puis un seul `<script>`
(toute la logique, `src/app.js`).

| Zone | Contenu |
|---|---|
| `<head>` | méta PWA, manifest inline, icône base64, CDN, polices |
| `<style>` | **Design system** : tokens CSS (couleurs, espacements, rayons, ombres), composants (`.btn`, `.card`, `.stat`, `.modal`, `.viewer3d`, etc.), responsive + barre mobile |
| `I` (objet) | jeu d'icônes SVG (trait uniforme). Helper `ic(name, cls)` |
| `Store` | persistance en cascade : `window.storage` → `localStorage` → mémoire (`_mem`). Async `get/set` |
| `SUBJECTS` | 8 matières ; `integration` est `transversal:true`. `CORE_SUBJECTS` exclut l'intégration |
| `S` (état global) | `profile, tasks, events, subjects, summaries, meds, exams, cards, cases, stage`. Exposé en `window.S` |
| `askClaude()` | **appel IA à deux modes** (voir §5) + `aiReady()` / `aiHint()` |
| `VIEWS` + `go()` + `buildNav()` | routeur. Sidebar (bureau) + barre 4 onglets + **Menu** (mobile) |
| Vues `render*()` | une fonction de rendu par section (voir liste ci-dessous) |
| `QUIZ_BANK` | banque de questions QCM/SATA/ordonnancement hors-ligne |
| `ANATOMY` | moteur Three.js (cœur/poumons/vaisseau, raycaster, inertie, halo patho) |
| `SCHEMA_PRESETS` + `drawSchema()` | schémas intégrateurs (SVG) |
| `friday` | compagnon (rappels contextuels, bulle SVG) |
| `showOnboarding()` | accueil premier lancement + `DISCLAIMER` |
| `renderSettings()` | clé IA (BYOK), test, export/import/reset, prénom, version |
| `init` (IIFE async finale) | `loadAll()` → charge clé IA → rend le tableau de bord → onboarding |

### Vues principales (fonction → rôle)
- `renderDash` tableau de bord · `renderTasks` tâches · `renderCal` calendrier
- `renderSubjects` / `openSubject` matières · `renderIntegration` synthèse transversale
- `renderCards` / `startReview` flashcards (SM-2 allégé)
- `renderPPT` résumeur de `.pptx` · `renderMeds` fiches médicaments · `renderCases` cas cliniques
- `renderQuiz` (+ `doQuiz`, `renderQuizRun`, `quizScore`) quiz adaptatif
- `renderStage` préparation aux stages · `renderTools` outils cliniques (calc de dose, SBAR, tables)
- `renderAnatomy` anatomie 3D · `renderSchemas` schémas intégrateurs
- `renderSettings` réglages

## 4. Conventions de code (à respecter)

- **Vanilla JS**, pas de framework. Pas de TypeScript. Fonctions déclaratives globales.
- `$(sel)` = `document.querySelector`. Le rendu se fait en assignant `innerHTML`, puis
  les interactions passent par des `onclick="fn(...)"` en ligne.
- **Sécurité XSS** : toute donnée utilisateur affichée passe par `esc()`. Pour injecter
  du JSON dans un `onclick`, utilise `attr()`. **Ne régresse pas là-dessus.**
- **Icônes** : jamais d'emoji. Utilise `ic('nom')` ; ajoute les nouveaux tracés à l'objet `I`.
- **Couleurs/espacements** : utilise les variables CSS (`var(--blue)`, `var(--sp-4)`, …),
  jamais de valeurs magiques en dur.
- **Persistance** : passe toujours par `Store.get/set` et le miroir dans `S`. Après une
  mutation de `S.x`, appelle `save('x')`.
- **fr-CA** partout dans l'UI. Terminologie infirmière québécoise.
- **Pas de `localStorage`/`sessionStorage` directs dans un artifact claude.ai** — mais ici,
  dans le fichier autonome, `Store` les utilise volontairement en repli. C'est voulu.

## 5. Le point sensible : l'IA (`askClaude`)

`askClaude(userText, opt)` fonctionne en **deux modes** :

1. **Clé personnelle (BYOK)** — si `_apiKey` est défini (saisi dans Réglages) :
   appel direct à `https://api.anthropic.com/v1/messages` avec en-têtes `x-api-key`,
   `anthropic-version: 2023-06-01` et `anthropic-dangerous-direct-browser-access: true`.
   Modèle par défaut `_apiModel` (`claude-sonnet-4-5`).
2. **Relayé** — sans clé, dans l'environnement claude.ai : modèle `claude-sonnet-4-6`,
   l'authentification est gérée par l'hôte.

`opt.json:true` demande une sortie JSON (parsing tolérant). `aiReady()` détecte
l'environnement ; `aiHint()` affiche un bandeau « configure l'IA » sur les vues IA
(`ppt, meds, cases, quiz, schemas`) quand aucune clé n'est disponible.

> **⚠️ Sécurité produit** : le BYOK expose une clé côté client — acceptable pour un usage
> **personnel**, **inacceptable pour un produit commercial**. La cible est un **backend**
> qui détient la clé et applique des quotas. Voir `AMELIORATIONS.md` § « Backend & IA ».
> Ne code jamais de clé API en dur dans le fichier.

## 6. Sécurité clinique (non négociable)

NursaFlow touche aux **médicaments, doses et raisonnement clinique**. Règles :
- Ne présente jamais l'app comme un outil de décision au chevet du patient.
- Conserve `DISCLAIMER` et son affichage (onboarding + Réglages + outils).
- Le contenu clinique généré ou codé en dur doit rester prudent et vérifiable ; toute
  nouvelle donnée clinique « en dur » devrait être signalée comme à faire valider par
  un·e professionnel·le.
- La calculatrice de dose (`calcRun`) doit garder ses validations (bornes, unités,
  messages d'erreur). N'assouplis pas les garde-fous.

## 7. Comment valider une modification (obligatoire avant de livrer)

```bash
# 1) Régénérer le livrable depuis la source
node build.mjs

# 2) Lancer le filet de tests P0-1 sur la sortie
#    (installer jsdom une fois : npm install jsdom --no-save)
#    Couvre : node --check sur le JS extrait, détection de doublons de fonctions,
#    démarrage jsdom (file:// + CDN bloqués + hors ligne), navigation des vues,
#    CRUD tâche, flashcard, calcRun = 350 mg, Réglages, export/import.
node tests/smoke.mjs
```

**Toujours** ré-exécuter ces deux étapes après édition de `src/`. Le fichier a un historique de
duplication de blocs JS (édités par marqueurs `//__JS_*__` puis nettoyés au `sed`) : la
vérification des doublons est essentielle.

## 8. Pièges connus

- **Three.js r128** : pas de `OrbitControls`, pas de `CapsuleGeometry` (r142+). Utilise
  `CylinderGeometry`/`SphereGeometry`. Le contrôle caméra est **maison** (drag + inertie
  + molette), pas OrbitControls.
- `ANATOMY.dispose()` doit être appelé quand le canvas quitte le DOM (déjà géré dans la
  boucle `_loop`). Ne crée pas de fuite de `requestAnimationFrame`.
- Sur `file://`, les appels IA relayés échouent (normal) ; seul le BYOK marche. Les
  fonctions non-IA doivent, elles, marcher hors ligne.
- CDN bloqué (wifi de cégep) : `three`/`jszip` peuvent être absents → le code doit
  déjà gérer `window.THREE`/`window.JSZip` manquants sans planter (garde ce comportement).

## 9. Ton et périmètre

- Améliore sans dénaturer : c'est l'outil d'un·e étudiant·e, pas un jouet de démo.
- Chaque changement d'UI reste cohérent avec le design system (tokens WDS-like existants).
- En cas de doute entre « ajouter une dépendance lourde » et « rester autonome », préfère
  rester autonome, sauf indication contraire dans `AMELIORATIONS.md`.
