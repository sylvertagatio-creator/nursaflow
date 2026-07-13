/**
 * tests/smoke.mjs — Filet de tests automatisés de NursaFlow (ticket P0-1).
 *
 * Formalise la procédure de validation de CLAUDE.md §7, sans navigateur réel :
 *   1. Syntaxe du JS inline (node --check sur le script extrait) ;
 *   2. Absence de doublons de fonctions (historique de duplication de blocs) ;
 *   3. Démarrage headless (jsdom) en conditions défavorables : file://,
 *      CDN bloqués (three/jszip absents), fetch hors ligne ;
 *   4. Navigation de toutes les vues sans erreur console ni écran d'erreur ;
 *   5. CRUD d'une tâche (création, complétion, suppression) ;
 *   6. Ajout d'une flashcard ;
 *   7. Calculatrice de dose : 70 kg × 5 mg/kg = 350 mg ;
 *   8. Ouverture des Réglages (clé IA + avis clinique affichés) ;
 *   9. Erreurs IA uniformes (P0-3) : action IA sans clé puis hors ligne
 *      → message clair + bouton « Réessayer » fonctionnel, jamais de
 *      spinner infini ni d'erreur console ;
 *  10. Export d'une sauvegarde puis ré-import (round-trip) ;
 *  11. Migration (P1-1) : importer une vieille sauvegarde sans schemaVersion
 *      (formats hérités) doit la migrer et tout restaurer sans perte.
 *
 * Usage :
 *   npm install jsdom --no-save   # une seule fois
 *   node tests/smoke.mjs
 *
 * Code de sortie 0 si tout passe, 1 si une vérification échoue
 * (y compris si une vue plante ou si une erreur console apparaît).
 */

import { readFileSync, writeFileSync, readdirSync, mkdtempSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { JSDOM, VirtualConsole } from 'jsdom';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const sleep = ms => new Promise(r => setTimeout(r, ms));

/* ---------- Petit harnais de vérifications ---------- */
const results = [];
function check(name, ok, detail) {
  results.push({ name, ok });
  console.log(`  [${ok ? 'OK   ' : 'ÉCHEC'}] ${name}${!ok && detail ? ` — ${detail}` : ''}`);
}

/* ---------- Localiser le livrable ---------- */
const candidates = readdirSync(ROOT).filter(f => /^nursaflow.*\.html$/i.test(f));
candidates.sort((a, b) => (a === 'nursaflow.html' ? -1 : b === 'nursaflow.html' ? 1 : a.localeCompare(b)));
if (!candidates.length) {
  console.error('Aucun fichier nursaflow*.html trouvé à la racine du projet.');
  process.exit(1);
}
const htmlName = candidates[0];
const html = readFileSync(join(ROOT, htmlName), 'utf8');
console.log(`Test de fumée NursaFlow — fichier : ${htmlName}\n`);

/* ---------- 1 · Syntaxe du JS inline (node --check) ---------- */
const inlineScripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
const js = inlineScripts[inlineScripts.length - 1] || '';
check('JS inline extrait du HTML', js.length > 1000, `bloc <script> introuvable ou trop court (${js.length} caractères)`);

const tmp = mkdtempSync(join(tmpdir(), 'nursaflow-smoke-'));
try {
  const jsPath = join(tmp, '_app.js');
  writeFileSync(jsPath, js);
  let syntaxOk = true, syntaxErr = '';
  try { execFileSync(process.execPath, ['--check', jsPath], { stdio: 'pipe' }); }
  catch (e) { syntaxOk = false; syntaxErr = String(e.stderr || e.message).trim().slice(0, 300); }
  check('Syntaxe valide (node --check)', syntaxOk, syntaxErr);

  /* ---------- 2 · Doublons de fonctions ---------- */
  const names = [];
  for (const line of js.split('\n')) {
    const m = line.match(/^(?:async )?function ([A-Za-z0-9_$]+)/);
    if (m) names.push(m[1]);
  }
  const dups = [...new Set(names.filter((n, i) => names.indexOf(n) !== i))];
  check(`Aucune fonction dupliquée (${names.length} déclarations)`, dups.length === 0, `doublons : ${dups.join(', ')}`);

  /* ---------- 3 · Démarrage headless : file:// + CDN bloqués + hors ligne ---------- */
  const consoleErrors = [];
  const vc = new VirtualConsole();
  vc.on('error', (...args) => consoleErrors.push('console.error : ' + args.map(String).join(' ')));
  vc.on('jsdomError', err => consoleErrors.push('jsdomError : ' + (err && err.message)));

  const exportBlobs = [];
  const dom = new JSDOM(html, {
    // file:// : origine opaque → localStorage inaccessible, Store doit se replier sur _mem
    url: 'file:///nursaflow/nursaflow.html',
    // Les <script src> CDN ne sont pas chargés (comportement jsdom par défaut)
    // → simule le wifi de cégep qui bloque cdnjs : window.THREE / window.JSZip absents
    runScripts: 'dangerously',
    pretendToBeVisual: true,
    virtualConsole: vc,
    beforeParse(window) {
      // Hors ligne : tout fetch échoue ; les fonctions non-IA doivent rester utilisables
      window.fetch = () => Promise.reject(new TypeError('réseau coupé (simulation du test)'));
      // jsdom n'implémente pas URL.createObjectURL : on capture le Blob exporté
      window.URL.createObjectURL = b => { exportBlobs.push(b); return 'blob:nursaflow-test'; };
      window.URL.revokeObjectURL = () => {};
      // Neutralise la navigation du <a download> d'exportData (non implémentée dans jsdom)
      window.addEventListener('click', e => { if (e.target && e.target.tagName === 'A') e.preventDefault(); }, true);
    }
  });
  const win = dom.window, doc = win.document;

  await sleep(650); // laisse l'init async + l'onboarding (300 ms) s'exécuter

  const navItems = doc.querySelectorAll('#nav .nav-item').length;
  check(`Navigation latérale rendue (${navItems} entrées)`, navItems >= 10);
  check('Barre mobile rendue (5 onglets)', doc.querySelectorAll('#mtabs .mtab').length === 5);
  const bootMain = doc.querySelector('#main').innerHTML;
  check('#main non vide (tableau de bord)', bootMain.trim().length > 0 && !bootMain.includes('Un problème est survenu au démarrage'));
  check('Démarrage sans erreur console', consoleErrors.length === 0, consoleErrors.slice(0, 3).join(' | '));

  /* ---------- 4 · Navigation de toutes les vues ---------- */
  const ids = win.eval('VIEWS.filter(v=>v.id).map(v=>v.id)');
  const brokenViews = [];
  for (const id of ids) {
    const before = consoleErrors.length;
    win.go(id);
    await sleep(120); // laisse s'exécuter les setTimeout internes (ex. repli 3D sans THREE)
    const m = doc.querySelector('#main').innerHTML;
    const ok = m.trim().length > 0 && !m.includes("Erreur d'affichage") && consoleErrors.length === before;
    if (!ok) brokenViews.push(id + (consoleErrors.length > before ? ` (${consoleErrors.slice(before).join('; ')})` : ''));
  }
  check(`Navigation des ${ids.length} vues sans plantage`, brokenViews.length === 0, brokenViews.join(' | '));

  /* ---------- 5 · CRUD d'une tâche ---------- */
  win.go('tasks');
  const nTasks = win.S.tasks.length;
  win.taskModal();
  doc.querySelector('#tTitle').value = 'Tâche du test de fumée';
  win.addTask();
  const task = win.S.tasks[win.S.tasks.length - 1];
  check('Tâche : création + affichage dans la liste',
    win.S.tasks.length === nTasks + 1 && doc.querySelector('#taskList').textContent.includes('Tâche du test de fumée'));
  win.toggleTask(task.id);
  check('Tâche : marquée comme faite', win.S.tasks.find(t => t.id === task.id)?.done === true);
  win.delTask(task.id);
  check('Tâche : suppression', !win.S.tasks.some(t => t.id === task.id));

  /* ---------- 6 · Ajout d'une flashcard ---------- */
  const nCards = win.S.cards.length;
  win.addCard('Recto — test de fumée', 'Verso — test de fumée', 'medecine');
  win.go('cards');
  check('Flashcard : ajoutée et due immédiatement',
    win.S.cards.length === nCards + 1 && win.dueCards().some(c => c.recto === 'Recto — test de fumée'));

  /* ---------- 7 · Calculatrice de dose : 70 kg × 5 mg/kg = 350 mg ---------- */
  win.go('tools');
  doc.querySelector('#c1').value = '70';
  doc.querySelector('#c2').value = '5';
  win.calcRun();
  const calcTxt = doc.querySelector('#calcRes').textContent;
  check('calcRun : 70 kg × 5 mg/kg = 350 mg', /^350\s*mg/.test(calcTxt), `affiché : « ${calcTxt} »`);

  /* ---------- 8 · Ouverture des Réglages ---------- */
  win.go('settings');
  check('Réglages : champ de clé IA et avis clinique affichés',
    !!doc.querySelector('#setKey') && doc.querySelector('#main').textContent.includes("outil d'aide à l'étude"));

  /* ---------- 9 · Erreurs IA uniformes (P0-3) ---------- */
  // a) Sans clé, hors claude.ai : l'action IA doit afficher l'erreur « clé absente »
  //    proprement — pas de spinner infini, bouton de génération réactivé, 0 erreur console.
  win.go('meds');
  doc.querySelector('#medPatho').value = 'MPOC';
  const aiErrsBefore = consoleErrors.length;
  await win.doMeds();
  const medOut = doc.querySelector('#medOut');
  check('IA sans clé : message clair + Réessayer + Réglages, sans plantage',
    medOut.textContent.includes('Fonctions IA non configurées')
    && medOut.textContent.includes('Réessayer')
    && medOut.textContent.includes('Ouvrir les Réglages')
    && !medOut.querySelector('.ai-loading')
    && doc.querySelector('#medGo').disabled === false
    && consoleErrors.length === aiErrsBefore,
    `contenu : « ${medOut.textContent.trim().slice(0, 120)} »`);

  // b) Avec clé mais réseau coupé : le clic sur « Réessayer » relance vraiment
  //    l'appel, qui aboutit à l'erreur réseau — réessai fonctionnel.
  win.eval('_apiKey="cle-de-test"');
  medOut.querySelector('button.btn.primary').click(); // → doMeds() → fetch rejeté
  await sleep(80); // laisse la promesse rejeter et le rendu se faire
  check('IA hors ligne : erreur réseau propre après clic sur Réessayer',
    medOut.textContent.includes('Connexion impossible')
    && medOut.textContent.includes('Réessayer')
    && !medOut.querySelector('.ai-loading')
    && doc.querySelector('#medGo').disabled === false
    && consoleErrors.length === aiErrsBefore,
    `contenu : « ${medOut.textContent.trim().slice(0, 120)} »`);
  win.eval('_apiKey=""'); // restaure l'état sans clé pour la suite du parcours

  /* ---------- 10 · Export / import ---------- */
  win.exportData();
  const blob = exportBlobs[exportBlobs.length - 1];
  let dump = null;
  if (blob) {
    const txt = typeof blob.text === 'function'
      ? await blob.text()
      : await new Promise((res, rej) => { const fr = new win.FileReader(); fr.onload = () => res(fr.result); fr.onerror = () => rej(fr.error); fr.readAsText(blob); });
    try { dump = JSON.parse(txt); } catch { /* dump reste null */ }
  }
  check('Export : sauvegarde JSON valide et complète',
    !!dump && dump._app === 'NursaFlow' && Array.isArray(dump.tasks)
    && Array.isArray(dump.cards) && dump.cards.some(c => c.recto === 'Recto — test de fumée'));

  if (dump) {
    const modified = JSON.parse(JSON.stringify(dump));
    modified.profile = { ...modified.profile, name: 'Testeuse Import' };
    modified.tasks = [{ id: 'imp1', title: 'Tâche importée', subject: '', cat: 'Révision', due: null, prio: 'm', done: false }];
    const file = new win.File([JSON.stringify(modified)], 'nursaflow-sauvegarde.json', { type: 'application/json' });
    win.importData({ files: [file] });
    // Attendre le FileReader, mais finir avant le location.reload() planifié à +600 ms
    let imported = false;
    for (let i = 0; i < 16 && !imported; i++) {
      await sleep(25);
      imported = win.S.profile.name === 'Testeuse Import'
        && win.S.tasks.length === 1 && win.S.tasks[0].title === 'Tâche importée';
    }
    check('Import : données restaurées depuis la sauvegarde', imported);
  } else {
    check('Import : données restaurées depuis la sauvegarde', false, 'sauté — export invalide');
  }

  /* ---------- 11 · Migration d'une vieille sauvegarde (P1-1) ---------- */
  // Sauvegarde d'avant le versionnage : pas de _schema, subjects en tableau
  // (ancien format), profile sans quiz, stage sans sheets.
  const oldSave = {
    _app: 'NursaFlow', _v: 2,
    profile: { name: 'Ancienne Utilisatrice', streak: 4, lastActive: null, studySec: 0, stageHours: 0 },
    tasks: [{ id: 'old1', title: 'Tâche héritée', subject: 'medecine', cat: 'Lecture', due: null, prio: 'h', done: false }],
    cards: [{ id: 'oldc1', recto: 'Vieux recto', verso: 'Vieux verso', subject: 'medecine', ease: 2.4, interval: 0, due: 0, reps: 0 }],
    subjects: [],
    stage: { skills: [], journal: [{ id: 'oldj1', service: 'Médecine', date: '2025-01-15', situation: 'Situation héritée', reasoning: 'Raisonnement hérité' }] }
  };
  win.importData({ files: [new win.File([JSON.stringify(oldSave)], 'vieille-sauvegarde.json', { type: 'application/json' })] });
  let migrated = false;
  for (let i = 0; i < 40 && !migrated; i++) { await sleep(10); migrated = win.S.profile.name === 'Ancienne Utilisatrice'; }
  const schemaStored = await win.eval('Store.get("schemaVersion")');
  check('Migration : vieille sauvegarde sans schemaVersion importée sans perte',
    migrated
    && win.S.tasks.length === 1 && win.S.tasks[0].title === 'Tâche héritée'
    && win.S.cards.some(c => c.recto === 'Vieux recto')
    && win.S.stage.journal.some(j => j.situation === 'Situation héritée')
    && !Array.isArray(win.S.subjects) && typeof win.S.subjects === 'object'  // tableau hérité → objet
    && typeof win.S.profile.quiz === 'object'                                // quiz ajouté par la migration
    && Array.isArray(win.S.stage.sheets)                                     // sheets ajouté par la migration
    && schemaStored === 2,                                                   // version persistée
    `profil=${win.S.profile.name} · schemaVersion=${schemaStored}`);

  win.close(); // stoppe les minuteries (dont les location.reload() d'importData)

  /* ---------- Bilan ---------- */
  check('Aucune erreur console sur tout le parcours', consoleErrors.length === 0, consoleErrors.slice(0, 5).join(' | '));

  const failed = results.filter(r => !r.ok);
  console.log(`\n${results.length - failed.length}/${results.length} vérifications réussies · ${consoleErrors.length} erreur(s) console`);
  if (failed.length) {
    console.error('Test de fumée : ÉCHEC');
    process.exit(1);
  }
  console.log('Test de fumée : SUCCÈS');
  process.exit(0);
} finally {
  rmSync(tmp, { recursive: true, force: true });
}
