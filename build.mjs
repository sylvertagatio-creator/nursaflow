/**
 * build.mjs — Assemble le livrable autonome nursaflow.html (ticket P0-2).
 *
 * Source de vérité, dans src/ :
 *   src/index.html — squelette HTML (méta PWA, manifest, CDN, DOM) avec deux jetons
 *   src/styles.css — design system complet (contenu du <style>)
 *   src/app.js     — toute la logique (contenu du <script> final)
 *
 * `node build.mjs` remplace @@NURSAFLOW:STYLES@@ et @@NURSAFLOW:APP_JS@@
 * par le contenu des fichiers source et écrit nursaflow.html à la racine.
 * Aucune dépendance : le livrable reste un fichier unique autonome.
 *
 * Ne modifie jamais nursaflow.html à la main : édite src/, relance le build,
 * puis valide avec `node tests/smoke.mjs`.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = dirname(fileURLToPath(import.meta.url));
const read = f => readFileSync(join(ROOT, f), 'utf8');
// Retire au plus un saut de ligne final : le squelette fournit déjà le sien
const chomp = s => (s.endsWith('\n') ? s.slice(0, -1) : s);

const parts = {
  '@@NURSAFLOW:STYLES@@': chomp(read('src/styles.css')),
  '@@NURSAFLOW:APP_JS@@': chomp(read('src/app.js'))
};

let out = read('src/index.html');
for (const [token, content] of Object.entries(parts)) {
  const pieces = out.split(token);
  if (pieces.length !== 2) {
    console.error(`build.mjs : le jeton ${token} doit apparaître exactement une fois dans src/index.html (trouvé ${pieces.length - 1} fois).`);
    process.exit(1);
  }
  out = pieces.join(content); // split/join : aucun motif spécial de String.replace
}

const dest = join(ROOT, 'nursaflow.html');
writeFileSync(dest, out);
console.log(`nursaflow.html régénéré (${Buffer.byteLength(out, 'utf8')} octets). Valide avec : node tests/smoke.mjs`);
