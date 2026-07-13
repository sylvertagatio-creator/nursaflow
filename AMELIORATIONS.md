# AMÉLIORATIONS.md — Backlog technique de NursaFlow

> Backlog priorisé pour Claude Code. Lis d'abord `CLAUDE.md`.
> Chaque ticket suit le format : **Objectif · Où · Quoi faire · Critères d'acceptation**.
> Priorités : **P0** (fondations/qualité, à faire tôt) · **P1** (fort impact) ·
> **P2** (valeur produit) · **P3** (nice-to-have) · **P4** (vision commerciale, gros chantier).
>
> Règle d'or : **ne casse pas le fichier unique autonome** sans passer par le ticket
> « Refonte structurelle » (P2-REFACTOR), et valide chaque changement avec la procédure
> de `CLAUDE.md` §7.

---

## A. Robustesse & qualité du code (P0)

### P0-1 · Filet de tests automatisés
- **Où** : nouveau dossier `tests/` (hors du fichier livré) + script `tests/smoke.mjs`.
- **Quoi** : formaliser le test jsdom déjà utilisé : démarrage sans erreur en `file://`,
  CDN bloqués, `fetch` hors ligne ; puis parcours (navigation de toutes les vues, CRUD
  tâche, ajout flashcard, `calcRun` = 350 mg pour 70 kg × 5 mg/kg, ouverture Réglages,
  export/import). Ajouter `node --check` sur le JS extrait et la détection de doublons.
- **Acceptation** : `node tests/smoke.mjs` sort en code 0 et affiche 0 erreur console ;
  échoue si une vue plante.

### P0-2 · Séparer sans casser (source ↔ build)
- **Problème** : tout éditer dans un HTML de 1760 lignes est fragile (historique de
  duplication de blocs).
- **Quoi** : introduire une source éclatée `src/` (`styles.css`, `app.js`, `index.html`)
  + un petit script `build.mjs` qui **inline** tout dans `nursaflow.html` (le livrable
  autonome reste identique). Aucune dépendance runtime ajoutée.
- **Acceptation** : `node build.mjs` régénère un `nursaflow.html` byte-équivalent au
  comportement actuel ; le test P0-1 passe sur la sortie.

### P0-3 · Gestion d'erreurs IA uniforme
- **Où** : `askClaude`, et tous les `render*` qui appellent l'IA (`doSummary`, `doMeds`,
  `doCase`, `doQuiz`, `doServiceSheet`, `doSchema`).
- **Quoi** : centraliser l'affichage d'erreur (composant `aiError(msg)`), distinguer
  clé absente / 401 / réseau / quota (429) / JSON invalide, avec message fr-CA actionnable
  et bouton « Réessayer ». Timeout (`AbortController`, ~60 s) sur chaque appel.
- **Acceptation** : couper le réseau → message clair + réessai fonctionnel, jamais de spinner infini.

### P0-4 · Accessibilité (a11y) de base
- **Où** : composants globaux (`.modal`, `.nav-item`, `.mtab`, `.check`, `.seg`, `.q-opt`).
- **Quoi** : rôles ARIA (`role="dialog"` + focus trap sur `.modal`, `aria-current` sur nav),
  navigation clavier (Échap ferme le modal — déjà partiel ; Entrée/Espace sur les éléments
  cliquables non-`<button>`), `aria-label` sur les boutons icônes, contraste vérifié.
- **Acceptation** : tout parcours principal réalisable au clavier ; audit Lighthouse a11y ≥ 90.

---

## B. Persistance & données (P1)

### P1-1 · Robustesse du `Store` + versionnage du schéma
- **Où** : `Store`, `loadAll`, `exportData`, `importData`.
- **Quoi** : ajouter un `schemaVersion` dans les données ; écrire des **migrations** à
  l'ouverture (idempotentes). `importData` doit valider la version et migrer si besoin.
  Envelopper chaque `set` d'un debounce pour éviter les écritures trop fréquentes.
- **Acceptation** : importer une vieille sauvegarde met à jour sans perte ni plantage.

### P1-2 · Quota localStorage & télémétrie de stockage
- **Où** : `Store.set`.
- **Quoi** : capter `QuotaExceededError`, prévenir l'utilisateur, proposer l'export. Afficher
  dans Réglages l'espace approximatif utilisé.
- **Acceptation** : simuler un quota plein → message clair, pas de perte silencieuse.

### P1-3 · Sauvegarde/restauration renforcée
- **Où** : `exportData`, `importData`.
- **Quoi** : inclure la version d'app, un horodatage lisible, et une **fusion optionnelle**
  (remplacer vs fusionner) à l'import. Confirmer avant écrasement.
- **Acceptation** : l'utilisateur choisit « remplacer » ou « fusionner » ; les deux marchent.

---

## C. Fonctions pédagogiques (P1–P2)

### P1-4 · Répétition espacée complète (passer de SM-2 allégé à SM-2/FSRS)
- **Où** : `dueCards`, `rate`, structure des cartes (`S.cards`).
- **Quoi** : implémenter un vrai algorithme (facteur de facilité, intervalles, lapses),
  ou intégrer une variante FSRS. Ajouter statistiques de rétention et file « à réviser ».
- **Acceptation** : les intervalles évoluent correctement selon les notes ; tests unitaires
  de l'algorithme dans `tests/`.

### P2-1 · Banque de quiz enrichie + import/export
- **Où** : `QUIZ_BANK`, `renderQuiz`, `startBank`.
- **Quoi** : permettre à l'utilisateur d'ajouter ses propres questions (QCM/SATA/ordre),
  d'importer/exporter des paquets JSON, et de filtrer par matière/difficulté/compétence.
- **Acceptation** : créer, sauvegarder, rejouer un paquet perso ; export/import round-trip.

### P2-2 · Suivi de progression & tableau de bord analytique
- **Où** : `renderDash`, `renderIntegration`, `quizMastery`.
- **Quoi** : graphes de progression par matière et dans le temps (SVG maison, sans lib),
  détection des points faibles, objectifs hebdomadaires, séries (streak) enrichies.
- **Acceptation** : le tableau de bord montre l'évolution réelle sur plusieurs sessions.

### P2-3 · Anatomie 3D — profondeur pédagogique
- **Où** : `ANATOMY`, `PATHO3D`, `renderAnatomy`.
- **Quoi** : plus de structures nommées, coupes/étiquettes cliquables avec fiche latérale,
  mode quiz « nomme la structure », comparaison sain/pathologique côte à côte. Rester en
  r128 (pas d'OrbitControls). Envisager un repli 2D si WebGL indisponible.
- **Acceptation** : survol/tap révèle le nom + une explication ; dégradation propre sans WebGL.

### P3-1 · Générateur de schémas intégrateurs plus riche
- **Où** : `SCHEMA_PRESETS`, `drawSchema`, `doSchema`.
- **Quoi** : disposition automatique (éviter les chevauchements), export PNG/SVG, plus de
  gabarits (physiopatho → pharmaco → surveillance → jugement clinique).
- **Acceptation** : un schéma généré est lisible et exportable.

---

## D. Expérience & interface (P2)

### P2-4 · Mode sombre
- **Où** : tokens CSS `:root`, ajouter `[data-theme="dark"]`.
- **Quoi** : dupliquer la palette en variante sombre, bascule dans Réglages, respect de
  `prefers-color-scheme`. Tout passe déjà par des variables → chantier surtout CSS.
- **Acceptation** : bascule sans rechargement ; contraste conforme dans les deux thèmes.

### P2-5 · Navigation mobile complète & gestes
- **Où** : `buildNav`, `openMobileMenu`, barre `.mobile-tabs`.
- **Quoi** : la barre 4 onglets + Menu est en place ; ajouter accès rapide contextuel,
  transitions, et vérifier les zones sûres (encoche) sur tous les écrans.
- **Acceptation** : toutes les vues atteignables au pouce ; rien sous la barre système.

### P2-6 · États vides, chargements et micro-interactions
- **Où** : tous les `render*`.
- **Quoi** : uniformiser les états vides (déjà présents via `emptyBox`), squelettes de
  chargement pour les vues IA, retours haptiques/toasts cohérents.
- **Acceptation** : aucune vue « nue » ; chaque action asynchrone a un état visible.

---

## E. PWA & hors ligne (P2)

### P2-7 · Service worker & vrai mode hors ligne
- **Prérequis** : app **hébergée** (le service worker ne marche pas en `file://`).
- **Où** : nouveau `sw.js` + enregistrement conditionnel dans `init`.
- **Quoi** : mettre en cache la coque de l'app et les CDN (three/jszip/polices) pour un
  fonctionnement hors ligne des fonctions non-IA ; stratégie « cache-first » + mise à jour.
- **Acceptation** : hors ligne, l'app se charge et les outils non-IA fonctionnent.

### P2-8 · Auto-hébergement des dépendances
- **Où** : `<head>`.
- **Quoi** : option pour embarquer three/jszip/polices localement (ou inline) afin de ne
  plus dépendre d'un CDN filtré par le wifi d'un établissement.
- **Acceptation** : l'app se charge entièrement même avec les domaines CDN bloqués.

---

## F. Backend & IA — le vrai passage produit (P4, gros chantier)

> Voir aussi le document « Feuille de route de commercialisation ». Ces tickets changent
> l'architecture ; à traiter en projet séparé, pas en édition du fichier unique.

### P4-1 · Proxy IA côté serveur (déblocage central)
- **Quoi** : petit backend (fonctions serverless) qui reçoit les requêtes de l'app,
  appelle Claude avec **la clé du serveur** (jamais exposée), applique des **quotas**
  par utilisateur et journalise l'usage. L'app remplace l'appel direct de `askClaude`
  par un appel à `/api/ai`.
- **Acceptation** : l'IA fonctionne **sans** clé saisie par l'utilisateur ; la clé n'est
  jamais dans le client ; quotas respectés.

### P4-2 · Comptes & synchronisation multi-appareils
- **Quoi** : authentification (courriel), données rattachées au compte, synchro
  téléphone ↔ ordinateur, migration en douceur des données locales existantes.
- **Acceptation** : « mon compte, mes données, partout » ; pas de perte à la migration.

### P4-3 · Abonnement & paiement
- **Quoi** : Stripe ; offre gratuite limitée + premium (IA illimitée) ; tarif étudiant ;
  licences établissement.
- **Acceptation** : cycle d'abonnement complet testé (essai, paiement, expiration).

### P4-4 · Conformité (Loi 25 / vie privée)
- **Quoi** : consentement, politique de confidentialité, droit d'accès/suppression,
  hébergement conforme (Québec). Journalisation minimale et anonymisée.
- **Acceptation** : parcours de consentement + suppression de compte fonctionnels.

---

## G. Sécurité clinique continue (transversal, priorité haute)

### CLIN-1 · Registre du contenu clinique à valider
- **Où** : `QUIZ_BANK`, fiches médicaments codées en dur, tables de référence de `renderTools`,
  `DEFAULT_SKILLS`, `PATHO3D`.
- **Quoi** : marquer chaque bloc de contenu clinique en dur avec une source et un statut
  « à valider / validé par … ». Créer `CONTENU-CLINIQUE.md` recensant ces éléments.
- **Acceptation** : chaque donnée clinique en dur est traçable ; rien de non sourcé en prod.

### CLIN-2 · Garde-fous de la calculatrice de dose
- **Où** : `calcRun`, `renderCalcBody`.
- **Quoi** : conserver/renforcer bornes, unités, arrondis sûrs, messages d'erreur ;
  ajouter des cas limites (poids nul/négatif, unités incohérentes) aux tests.
- **Acceptation** : entrées invalides → erreur explicite, jamais de résultat trompeur.

---

## Ordre de démarrage recommandé
1. **P0-1, P0-2** (tests + source/build) — sécurise tout le reste.
2. **P0-3, P0-4** (erreurs IA + a11y) et **P1-1** (versionnage données).
3. **P1-4, P2-1, P2-2** (pédagogie) selon les retours utilisateurs.
4. **P2-4 → P2-8** (UX, PWA hors ligne) pour la finition.
5. **P4-*** (backend, comptes, paiement) uniquement après validation de l'intérêt.
6. **CLIN-1, CLIN-2** en continu, avant tout lancement public.
