/* ==================================================================
   NursaFlow — Noyau (icônes, stockage, état, IA, navigation)
   ================================================================== */
'use strict';

/* ---------- Jeu d'icônes SVG (style line, trait uniforme) ---------- */
const I = {
  home:'<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.4V21h14V9.4"/>',
  cal:'<rect x="3" y="4.5" width="18" height="16.5" rx="2.4"/><path d="M3 9h18M8 2.5v4M16 2.5v4"/>',
  task:'<path d="M4 6h2M4 12h2M4 18h2"/><path d="M9 6h11M9 12h11M9 18h11"/>',
  book:'<path d="M4 5.2A2.2 2.2 0 0 1 6.2 3H20v15H6.2A2.2 2.2 0 0 0 4 20.2Z"/><path d="M4 20.2A2.2 2.2 0 0 1 6.2 18H20"/>',
  layers:'<path d="M12 3 3 8l9 5 9-5-9-5Z"/><path d="M3 13l9 5 9-5"/><path d="M3 18l9 5 9-5" opacity=".55"/>',
  cube:'<path d="M12 2.5 21 7.5v9L12 21.5 3 16.5v-9Z"/><path d="M3 7.5 12 12l9-4.5M12 12v9.5"/>',
  share:'<circle cx="6" cy="12" r="2.6"/><circle cx="18" cy="6" r="2.6"/><circle cx="18" cy="18" r="2.6"/><path d="M8.3 10.9 15.7 7.1M8.3 13.1 15.7 16.9"/>',
  fileText:'<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z"/><path d="M14 3v5h5M9 13h6M9 17h4"/>',
  pill:'<path d="m10.5 20.5-7-7a5 5 0 0 1 7-7l7 7a5 5 0 0 1-7 7Z"/><path d="m8.5 8.5 7 7"/>',
  clipboard:'<rect x="8" y="3.5" width="8" height="4" rx="1.4"/><path d="M9 5.5H6.5A1.5 1.5 0 0 0 5 7v12.5A1.5 1.5 0 0 0 6.5 21h11a1.5 1.5 0 0 0 1.5-1.5V7a1.5 1.5 0 0 0-1.5-1.5H15"/><path d="M9 12l1.6 1.6L14 10"/>',
  quiz:'<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M9.2 9.4a2.8 2.8 0 1 1 3.6 2.7c-.8.3-1.3.9-1.3 1.7M12 17h.01"/>',
  cards:'<rect x="3" y="6" width="13" height="15" rx="2.2"/><path d="M8 3h11a2 2 0 0 1 2 2v13"/>',
  steth:'<path d="M5 3v5a4 4 0 0 0 8 0V3"/><path d="M5 3H3.5M13 3h1.5M9 16v1.5a4.5 4.5 0 0 0 9 0V15"/><circle cx="18" cy="12.5" r="2.5"/>',
  calc:'<rect x="4.5" y="2.5" width="15" height="19" rx="2.4"/><path d="M8 6.5h8M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15v4M8 19h4"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  spark:'<path d="M12 3v3.2M12 17.8V21M4.2 12H1M23 12h-3.2M6.3 6.3 4 4M20 20l-2.3-2.3M17.7 6.3 20 4M4 20l2.3-2.3"/><circle cx="12" cy="12" r="3.4"/>',
  trash:'<path d="M3.5 6h17M8.5 6V4.4a1.4 1.4 0 0 1 1.4-1.4h4.2a1.4 1.4 0 0 1 1.4 1.4V6M18.5 6l-.8 13.2a2 2 0 0 1-2 1.8H8.3a2 2 0 0 1-2-1.8L5.5 6"/>',
  chevL:'<path d="M15 18l-6-6 6-6"/>', chevR:'<path d="M9 18l6-6-6-6"/>',
  clock:'<circle cx="12" cy="12" r="8.5"/><path d="M12 7.2v5l3.2 2"/>',
  check:'<path d="M20 6 9 17l-5-5"/>',
  x:'<path d="M18 6 6 18M6 6l12 12"/>',
  up:'<path d="M12 19V5M6 11l6-6 6 6"/>', down:'<path d="M12 5v14M6 13l6 6 6-6"/>',
  alert:'<path d="M12 3 2.5 20.5h19Z"/><path d="M12 9.5v4M12 17h.01"/>',
  heart:'<path d="M12 20s-6.5-4.2-8.8-8.2A4.6 4.6 0 0 1 12 6a4.6 4.6 0 0 1 8.8 5.8C18.5 15.8 12 20 12 20Z"/><path d="M8.5 12h2l1-2 1.5 4 1-2h1.5"/>',
  scalpel:'<path d="M20.3 4.7 11 14l-3.4 1 1-3.4 9.3-9.3a1.8 1.8 0 0 1 2.4 2.4Z"/><path d="M8.6 14.4 4 19a2 2 0 0 0 2.8 2.8L11 17"/>',
  baby:'<circle cx="12" cy="5.6" r="2.8"/><path d="M6.5 21v-.5a5.5 5.5 0 0 1 11 0V21"/><path d="M9 12.5 7 14.5M15 12.5l2 2"/>',
  blocks:'<rect x="3.5" y="12.5" width="8" height="8" rx="1.4"/><rect x="12.5" y="6.5" width="8" height="8" rx="1.4"/><path d="M6 15.5h3M15 9.5h3"/>',
  cane:'<path d="M15.5 4.2A3.2 3.2 0 0 0 12 7.4V21"/><path d="M12 21a2.6 2.6 0 0 1-5.2 0"/><path d="M12 8H9"/>',
  brain:'<path d="M12 4.5a4 4 0 0 0-4 4c0 1.2.5 2 1.2 2.8.6.7.8 1.3.8 2.2V17h4v-3.5c0-.9.2-1.5.8-2.2C15.5 10.5 16 9.7 16 8.5a4 4 0 0 0-4-4Z"/><path d="M10 20h4M12 4.5V17"/>',
  network:'<circle cx="12" cy="5" r="2.4"/><circle cx="5" cy="18.5" r="2.4"/><circle cx="19" cy="18.5" r="2.4"/><path d="M12 7.4 6.4 16.4M12 7.4l5.6 9M7.4 18.5h9.2"/>',
  copy:'<rect x="9" y="9" width="12" height="12" rx="2.2"/><path d="M6 15H4.5A1.5 1.5 0 0 1 3 13.5V4.5A1.5 1.5 0 0 1 4.5 3h9A1.5 1.5 0 0 1 15 4.5V6"/>',
  play:'<path d="M7 5.3v13.4a.6.6 0 0 0 .9.5l11-6.7a.6.6 0 0 0 0-1L7.9 4.8a.6.6 0 0 0-.9.5Z"/>',
  refresh:'<path d="M3.5 12a8.5 8.5 0 0 1 14.5-6M20.5 12A8.5 8.5 0 0 1 6 18"/><path d="M18 2v4h-4M6 22v-4h4"/>',
  chart:'<path d="M4 20V4M4 20h16"/><rect x="7" y="12" width="3" height="5" rx=".6"/><rect x="12" y="8" width="3" height="9" rx=".6"/><rect x="17" y="14" width="3" height="3" rx=".6"/>',
  flag:'<path d="M5 21V4M5 4h11l-2 3.5L16 11H5"/>',
  upload:'<path d="M12 15V4M8 8l4-4 4 4"/><path d="M4 15v3.5A1.5 1.5 0 0 0 5.5 20h13a1.5 1.5 0 0 0 1.5-1.5V15"/>',
  bulb:'<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.3 1 2.2V16h6v-.3c0-.9.3-1.5 1-2.2A6 6 0 0 0 12 3Z"/>',
  syringe:'<path d="m18 3 3 3M16 5l3 3M14.5 6.5 20 12l-8 8H4v-8Z" opacity="0"/><path d="M4.5 19.5 3 21M8 16l-3.5 3.5M17.5 3.5 20.5 6.5M13 6l5 5-7 7H6v-5Z"/><path d="m10.5 8.5 5 5M9 10l2 2M12 7l2 2"/>',
  target:'<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1"/>',
  smile:'<circle cx="12" cy="12" r="9"/><path d="M8 13.5s1.4 2 4 2 4-2 4-2"/><path d="M9 9.2h.01M15 9.2h.01"/>',
  gear:'<circle cx="12" cy="12" r="3.2"/><path d="M19.4 13a1.5 1.5 0 0 0 .3 1.6l.1.1a1.9 1.9 0 1 1-2.7 2.7l-.1-.1a1.5 1.5 0 0 0-1.6-.3 1.5 1.5 0 0 0-.9 1.4V19a1.9 1.9 0 1 1-3.8 0v-.1a1.5 1.5 0 0 0-1-1.4 1.5 1.5 0 0 0-1.6.3l-.1.1a1.9 1.9 0 1 1-2.7-2.7l.1-.1a1.5 1.5 0 0 0 .3-1.6 1.5 1.5 0 0 0-1.4-.9H5a1.9 1.9 0 1 1 0-3.8h.1a1.5 1.5 0 0 0 1.4-1 1.5 1.5 0 0 0-.3-1.6l-.1-.1A1.9 1.9 0 1 1 8.8 4.9l.1.1a1.5 1.5 0 0 0 1.6.3H10.6a1.5 1.5 0 0 0 .9-1.4V5a1.9 1.9 0 1 1 3.8 0v.1a1.5 1.5 0 0 0 .9 1.4 1.5 1.5 0 0 0 1.6-.3l.1-.1a1.9 1.9 0 1 1 2.7 2.7l-.1.1a1.5 1.5 0 0 0-.3 1.6V11a1.5 1.5 0 0 0 1.4.9H19a1.9 1.9 0 1 1 0 3.8h-.1a1.5 1.5 0 0 0-1.4.9Z"/>'
};
function ic(name,cls){return `<svg class="ic ${cls||''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${I[name]||''}</svg>`;}

/* ---------- Stockage persistant : window.storage → localStorage → mémoire ---------- */
const _mem = {};
const Store = {
  async get(k){
    try{ if(window.storage){ const r=await window.storage.get('nf:'+k,false); return r?JSON.parse(r.value):null; } }catch(e){}
    try{ const v=localStorage.getItem('nf:'+k); return v?JSON.parse(v):null; }catch(e){}
    return _mem[k] ?? null;
  },
  async set(k,val){
    const s=JSON.stringify(val);
    try{ if(window.storage){ await window.storage.set('nf:'+k,s,false); return; } }catch(e){}
    try{ localStorage.setItem('nf:'+k,s); return; }catch(e){}
    _mem[k]=val;
  }
};

/* ---------- Matières (psychiatrie ajoutée ; intégration = transversale) ---------- */
const SUBJECTS = {
  medecine:{name:'Médecine',icon:'heart',color:'blue',hex:'#2563EB'},
  chirurgie:{name:'Chirurgie',icon:'scalpel',color:'teal',hex:'#0EA5A4'},
  perinatalite:{name:'Périnatalité',icon:'baby',color:'pink',hex:'#EC4899'},
  pediatrie:{name:'Pédiatrie',icon:'blocks',color:'yellow',hex:'#F59E0B'},
  pharmacologie:{name:'Pharmacologie',icon:'pill',color:'violet',hex:'#7C5CFC'},
  geriatrie:{name:'Gériatrie',icon:'cane',color:'green',hex:'#10B981'},
  psychiatrie:{name:'Psychiatrie',icon:'brain',color:'teal',hex:'#0891B2'},
  integration:{name:'Intégration',icon:'network',color:'indigo',hex:'#4F46E5',transversal:true}
};
const CORE_SUBJECTS = Object.keys(SUBJECTS).filter(id=>!SUBJECTS[id].transversal);
const EVTYPES={cours:{l:'Cours',hex:'#2563EB'},stage:{l:'Stage',hex:'#0EA5A4'},labo:{l:'Labo',hex:'#7C5CFC'},examen:{l:'Examen',hex:'#EC4899'},perso:{l:'Perso',hex:'#F59E0B'}};

const DEFAULT_SKILLS=['Prise des signes vitaux complets','Évaluation de la douleur (PQRSTU)','Installation d\'une perfusion IV','Administration de médicaments PO','Injection sous-cutanée','Injection intramusculaire','Réfection de pansement stérile','Prélèvement sanguin','Glycémie capillaire','Installation d\'une sonde vésicale','Oxygénothérapie (lunette nasale)','Calcul et vérification de dose'];

/* ---------- État global ---------- */
let S = {
  profile:{name:'',streak:0,lastActive:null,studySec:0,stageHours:0,quiz:{}},
  tasks:[], events:[], subjects:{}, summaries:[], meds:[], exams:[], cards:[], cases:[],
  stage:{skills:[],journal:[],sheets:[]}
};
window.S = S;

/* ---------- Versionnage du schéma & migrations (P1-1) ----------
   SCHEMA_VERSION est la version courante des données. MIGRATIONS[n] fait
   passer un état complet (mêmes clés que S) de la version n à n+1, en le
   mutant en place. Chaque migration doit être IDEMPOTENTE : la ré-appliquer
   sur un état déjà migré ne change rien. Utilisé au démarrage (loadAll) et
   à l'import (importData). Quand tu changes la forme des données : incrémente
   SCHEMA_VERSION et ajoute MIGRATIONS[ancienne version]. */
const SCHEMA_VERSION=2;
const STATE_KEYS=['profile','tasks','events','subjects','summaries','meds','exams','cards','cases','stage'];
const MIGRATIONS={
  // v1 → v2 : sauvegardes d'avant le versionnage — normalise les formats
  // hérités (subjects en tableau, profile.quiz absent, stage incomplet).
  1(st){
    if(!st.profile||typeof st.profile!=='object')st.profile={name:'',streak:0,lastActive:null,studySec:0,stageHours:0,quiz:{}};
    if(!st.profile.quiz||typeof st.profile.quiz!=='object')st.profile.quiz={};
    ['tasks','events','summaries','meds','exams','cards','cases'].forEach(k=>{if(!Array.isArray(st[k]))st[k]=[];});
    if(!st.subjects||Array.isArray(st.subjects)||typeof st.subjects!=='object')st.subjects={};
    if(!st.stage||typeof st.stage!=='object')st.stage={};
    ['skills','journal','sheets'].forEach(k=>{if(!Array.isArray(st.stage[k]))st.stage[k]=[];});
    return st;
  }
};
function migrateState(st,from){
  let v=from;
  while(v<SCHEMA_VERSION&&MIGRATIONS[v]){ st=MIGRATIONS[v](st)||st; v++; }
  return v;
}

async function loadAll(){
  for(const k of STATE_KEYS){ const v=await Store.get(k); if(v!=null) S[k]=v; }
  const stored=await Store.get('schemaVersion');
  const from=(typeof stored==='number'&&stored>=1)?stored:1;
  if(from<SCHEMA_VERSION){
    migrateState(S,from);
    for(const k of STATE_KEYS) await Store.set(k,S[k]); // re-persiste l'état migré
  }
  if(stored!==SCHEMA_VERSION) await Store.set('schemaVersion',SCHEMA_VERSION);
  if(!S.subjects||Array.isArray(S.subjects)) S.subjects={};
  for(const id in SUBJECTS){ if(!S.subjects[id]) S.subjects[id]={objectives:[],notes:''}; }
  if(!S.profile.quiz) S.profile.quiz={};
  if(!S.stage) S.stage={skills:[],journal:[],sheets:[]};
  if(!S.stage.skills||!S.stage.skills.length) S.stage.skills=DEFAULT_SKILLS.map(l=>({id:uid(),label:l,done:false,date:null}));
}

/* Écritures debouncées : les mutations rapprochées d'une même clé (ex.
   cocher plusieurs tâches) ne déclenchent qu'une écriture. Le flush sur
   beforeunload/visibilitychange évite de perdre une écriture en attente. */
const SAVE_DEBOUNCE_MS=250;
const _pendingSaves={};
const save=k=>{
  clearTimeout(_pendingSaves[k]);
  _pendingSaves[k]=setTimeout(()=>{delete _pendingSaves[k];Store.set(k,S[k]);},SAVE_DEBOUNCE_MS);
};
function cancelPendingSaves(){for(const k in _pendingSaves){clearTimeout(_pendingSaves[k]);delete _pendingSaves[k];}}
function flushSaves(){for(const k in _pendingSaves){clearTimeout(_pendingSaves[k]);delete _pendingSaves[k];Store.set(k,S[k]);}}
window.addEventListener('beforeunload',flushSaves);
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden')flushSaves();});

/* ---------- Utilitaires ---------- */
const $ = s => document.querySelector(s);
const uid = () => Math.random().toString(36).slice(2,10)+Date.now().toString(36).slice(-3);
const esc = s => (s==null?'':String(s)).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const attr = o => esc(JSON.stringify(o)); // pour passer un objet dans un onclick en simple-quote
const todayISO = () => { const d=new Date(); return new Date(d.getTime()-d.getTimezoneOffset()*6e4).toISOString().slice(0,10); };
const fmtDate = iso => { if(!iso) return ''; const d=new Date(iso+'T00:00'); return d.toLocaleDateString('fr-CA',{weekday:'short',day:'numeric',month:'short'}); };
const daysUntil = iso => Math.round((new Date(iso+'T00:00')-new Date(todayISO()+'T00:00'))/864e5);

function toast(msg,type){
  const t=document.createElement('div'); t.className='toast '+(type||'');
  t.innerHTML=(type==='ok'?ic('check'):type==='err'?ic('alert'):'')+`<span>${esc(msg)}</span>`;
  $('#toasts').appendChild(t);
  setTimeout(()=>{t.style.opacity='0';t.style.transform='translateY(12px)';t.style.transition='.3s';setTimeout(()=>t.remove(),320);},2700);
}
function modal(html,wide){ $('#modal').className='modal'+(wide?' wide':''); $('#modal').innerHTML=html; $('#overlay').classList.add('show'); }
function closeModal(){ $('#overlay').classList.remove('show'); }
$('#overlay').addEventListener('click',e=>{ if(e.target.id==='overlay') closeModal(); });
document.addEventListener('keydown',e=>{ if(e.key==='Escape') closeModal(); });
function copyText(txt){ navigator.clipboard?.writeText(txt).then(()=>toast('Copié','ok'),()=>toast('Copie impossible','err')); }
const emptyBox=(icon,h,p)=>`<div class="empty"><div class="eic">${ic(icon)}</div><h3>${h}</h3><p>${p}</p></div>`;

/* ---------- IA (API Claude) — deux modes ----------
   1) Dans claude.ai : appel relayé automatiquement (aucune clé requise).
   2) App téléchargée / hébergée : clé API personnelle de l'utilisateur
      (stockée localement) + en-tête d'accès navigateur direct autorisé
      par Anthropic. C'est ce qui permet aux fonctions IA de marcher hors
      de claude.ai. */
let _apiKey='';
let _apiModel='claude-sonnet-4-5';
const SYS_DEFAULT='Tu es Friday, un tuteur expert en soins infirmiers pour un étudiant au Cégep au Québec. Utilise la terminologie infirmière québécoise (OIIQ/OIIAQ, PTI, jugement clinique). Réponds en français québécois.';
function aiReady(){
  const proxy=(typeof window!=='undefined'&&!!window.storage)||/(^|\.)claude\.ai$/.test(location.hostname)||/anthropic/.test(location.hostname);
  return {key:!!_apiKey,proxy};
}
function aiHint(){
  const a=aiReady();if(a.key||a.proxy)return '';
  return `<div class="card pad mb" style="border:1px solid var(--yellow-solid);background:var(--yellow-t)"><div class="row between wrap" style="gap:10px">
    <div class="row" style="gap:10px"><span style="color:var(--yellow-d)">${ic('alert')}</span><div><b style="font-size:13.5px">Active les fonctions IA</b><div class="muted" style="font-size:12.5px">Dans l'application téléchargée, ajoute ta clé API Anthropic (stockée seulement sur cet appareil) pour utiliser résumés, quiz, fiches et cas cliniques.</div></div></div>
    <button class="btn sm primary" onclick="go('settings')">${ic('gear')} Configurer</button></div></div>`;
}
/* ---------- Gestion d'erreurs IA uniforme (P0-3) ----------
   askClaude lance des erreurs typées (e.code) ; aiError(e, retryJs) les
   affiche de façon centralisée avec un message fr-CA actionnable et un
   bouton « Réessayer ». retryJs = expression inline à exécuter au clic
   (ex. 'doMeds()'), même convention que les onclick du reste de l'app. */
const AI_TIMEOUT_MS=60000;
function aiErr(code,msg){const e=new Error(msg);e.code=code;return e;}
const AI_ERR_TITLES={
  'no-key':'Fonctions IA non configurées',
  auth:'Clé API refusée',
  quota:'Limite d\'utilisation atteinte',
  timeout:'Le service IA ne répond pas',
  network:'Connexion impossible',
  json:'Réponse IA illisible',
  http:'Erreur du service IA'
};
function aiError(e,retryJs){
  const code=(e&&e.code)||'http';
  const showSettings=code==='no-key'||code==='auth';
  return `<div class="empty"><div class="eic">${ic('alert')}</div><h3>${esc(AI_ERR_TITLES[code]||AI_ERR_TITLES.http)}</h3><p>${esc((e&&e.message)||'Erreur inconnue.')}</p>
    <div class="row wrap mt" style="gap:8px;justify-content:center">
      ${retryJs?`<button class="btn primary sm" onclick="${esc(retryJs)}">${ic('refresh')} Réessayer</button>`:''}
      ${showSettings?`<button class="btn sm" onclick="go('settings')">${ic('gear')} Ouvrir les Réglages</button>`:''}
    </div></div>`;
}
async function askClaude(userText,opt){
  opt=opt||{};
  const ready=aiReady();
  if(!ready.key&&!ready.proxy) throw aiErr('no-key','Les fonctions IA nécessitent une clé API personnelle. Ajoute-la dans les Réglages (elle reste sur cet appareil).');
  const body={max_tokens:opt.max||2400,system:opt.system||SYS_DEFAULT,messages:[{role:'user',content:userText}]};
  const headers={'Content-Type':'application/json'};
  if(_apiKey){ headers['x-api-key']=_apiKey; headers['anthropic-version']='2023-06-01'; headers['anthropic-dangerous-direct-browser-access']='true'; body.model=_apiModel||'claude-sonnet-4-5'; }
  else { body.model='claude-sonnet-4-6'; }
  const ctrl=new AbortController();
  const timer=setTimeout(()=>ctrl.abort(),AI_TIMEOUT_MS);
  let res,data;
  try{
    try{ res=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers,body:JSON.stringify(body),signal:ctrl.signal}); }
    catch(netErr){
      if(ctrl.signal.aborted) throw aiErr('timeout','Le service IA n\'a pas répondu après '+Math.round(AI_TIMEOUT_MS/1000)+' secondes. Réessaie dans un instant.');
      throw aiErr('network','Connexion au service IA impossible. Vérifie ta connexion Internet, puis réessaie.');
    }
    if(res.status===401||res.status===403) throw aiErr('auth','Clé API refusée par le service. Vérifie ta clé dans les Réglages.');
    if(res.status===429) throw aiErr('quota','Le service IA limite temporairement les requêtes (429). Attends une minute, puis réessaie.');
    if(!res.ok){ let t='';try{t=await res.text();}catch(e){} throw aiErr('http','Le service IA a répondu '+res.status+(t?' — '+t.replace(/\s+/g,' ').slice(0,150):'')+'. Réessaie dans un instant.'); }
    try{ data=await res.json(); }
    catch(e){
      if(ctrl.signal.aborted) throw aiErr('timeout','Le service IA a mis plus de '+Math.round(AI_TIMEOUT_MS/1000)+' secondes à répondre. Réessaie dans un instant.');
      throw aiErr('json','La réponse du service IA est illisible. Réessaie dans un instant.');
    }
  }finally{ clearTimeout(timer); }
  let text=(data.content||[]).filter(b=>b.type==='text').map(b=>b.text).join('\n').trim();
  if(opt.json){
    text=text.replace(/```json/gi,'').replace(/```/g,'').trim();
    const a=text.indexOf('{'),b=text.indexOf('[');let st=-1;
    if(a<0)st=b; else if(b<0)st=a; else st=Math.min(a,b);
    if(st>0) text=text.slice(st);
    const ea=text.lastIndexOf('}'),eb=text.lastIndexOf(']');const en=Math.max(ea,eb);
    if(en>-1) text=text.slice(0,en+1);
    try{ return JSON.parse(text); }
    catch(e){ throw aiErr('json','La réponse IA n\'était pas dans le format attendu. Relance la génération.'); }
  }
  return text;
}

/* ================================================================
   NAVIGATION / ROUTEUR
   ================================================================ */
const VIEWS=[
  {sec:'Organisation'},
  {id:'dash',label:'Tableau de bord',icon:'home',fn:()=>renderDash()},
  {id:'cal',label:'Calendrier',icon:'cal',fn:()=>renderCal()},
  {id:'tasks',label:'Tâches',icon:'task',fn:()=>renderTasks()},
  {sec:'Apprentissage'},
  {id:'subjects',label:'Matières',icon:'book',fn:()=>renderSubjects()},
  {id:'integration',label:'Intégration',icon:'layers',fn:()=>renderIntegration()},
  {id:'anatomy',label:'Anatomie 3D',icon:'cube',fn:()=>renderAnatomy()},
  {id:'schemas',label:'Schémas intégrateurs',icon:'share',fn:()=>renderSchemas()},
  {sec:'Outils IA'},
  {id:'ppt',label:'Résumeur PPT',icon:'fileText',fn:()=>renderPPT()},
  {id:'meds',label:'Fiches médicaments',icon:'pill',fn:()=>renderMeds()},
  {id:'cases',label:'Cas cliniques',icon:'clipboard',fn:()=>renderCases()},
  {id:'quiz',label:'Examens & quiz',icon:'quiz',fn:()=>renderQuiz()},
  {sec:'Révision & clinique'},
  {id:'cards',label:'Flashcards',icon:'cards',fn:()=>renderCards()},
  {id:'stage',label:'Préparation aux stages',icon:'steth',fn:()=>renderStage()},
  {id:'tools',label:'Outils cliniques',icon:'calc',fn:()=>renderTools()},
  {sec:'Compte'},
  {id:'settings',label:'Réglages',icon:'gear',fn:()=>renderSettings()}
];
let current='dash';

function buildNav(){
  const nav=$('#nav'); nav.innerHTML='';
  VIEWS.forEach(v=>{
    if(v.sec){ const l=document.createElement('div'); l.className='nav-label'; l.textContent=v.sec; nav.appendChild(l); return; }
    const b=document.createElement('button'); b.className='nav-item'+(v.id===current?' active':''); b.dataset.id=v.id;
    let badge='';
    if(v.id==='cards'){ const d=dueCards().length; if(d) badge=`<span class="nav-badge">${d}</span>`; }
    if(v.id==='tasks'){ const d=S.tasks.filter(t=>!t.done).length; if(d) badge=`<span class="nav-badge">${d}</span>`; }
    b.innerHTML=ic(v.icon)+`<span>${v.label}</span>`+badge;
    b.onclick=()=>go(v.id); nav.appendChild(b);
  });
  const mt=$('#mtabs'); mt.innerHTML='';
  ['dash','quiz','cards','tools'].forEach(id=>{
    const v=VIEWS.find(x=>x.id===id);
    const b=document.createElement('button'); b.className='mtab'+(id===current?' active':'');
    b.innerHTML=ic(v.icon)+`<span>${v.label.split(' ')[0]}</span>`; b.onclick=()=>go(id); mt.appendChild(b);
  });
  const more=document.createElement('button'); more.className='mtab';
  more.innerHTML=ic('layers')+`<span>Menu</span>`; more.onclick=openMobileMenu; mt.appendChild(more);
}
function openMobileMenu(){
  let html=`<div class="modal-head"><h2>Navigation</h2><button class="btn icon ghost" onclick="closeModal()">${ic('x')}</button></div><div class="modal-body" style="padding:12px">`;
  VIEWS.forEach(v=>{
    if(v.sec){html+=`<div class="nav-label" style="padding:12px 8px 5px">${v.sec}</div>`;return;}
    let badge='';
    if(v.id==='cards'){const d=dueCards().length;if(d)badge=`<span class="nav-badge" style="margin-left:auto">${d}</span>`;}
    if(v.id==='tasks'){const d=S.tasks.filter(t=>!t.done).length;if(d)badge=`<span class="nav-badge" style="margin-left:auto">${d}</span>`;}
    html+=`<button class="nav-item ${v.id===current?'active':''}" style="margin-bottom:2px" onclick="closeModal();go('${v.id}')">${ic(v.icon)}<span>${v.label}</span>${badge}</button>`;
  });
  html+=`</div>`;
  modal(html);
}
function go(id){ current=id; buildNav(); const v=VIEWS.find(x=>x.id===id); $('#main').scrollTop=0;
  try{v.fn();}catch(e){console.error(e);$('#main').innerHTML=topbar('Oups','Une erreur est survenue')+`<div class="view">${emptyBox('alert','Erreur d\'affichage',esc(e.message))}</div>`;}
  if(['ppt','meds','cases','quiz','schemas'].indexOf(id)>=0){const h=aiHint();if(h){const vw=$('#main').querySelector('.view');if(vw)vw.insertAdjacentHTML('afterbegin',h);}}
  friday.onNav(id);
}
function topbar(title,sub,actions){ return `<div class="topbar"><div><h1>${title}</h1>${sub?`<div class="sub">${sub}</div>`:''}</div><div class="topbar-actions">${actions||''}</div></div>`; }

/* ---------- Séries (streak) ---------- */
function bumpStreak(){
  const t=todayISO(); if(S.profile.lastActive===t) return;
  const y=new Date(Date.now()-864e5); const yISO=new Date(y.getTime()-y.getTimezoneOffset()*6e4).toISOString().slice(0,10);
  S.profile.streak=S.profile.lastActive===yISO?(S.profile.streak+1):1;
  S.profile.lastActive=t; save('profile'); $('#sideStreak').textContent=S.profile.streak;
}
/* ==================================================================
   VUES — Organisation, Matières, Intégration, Flashcards
   ================================================================== */
const subjIcon=(id,cls)=>ic(SUBJECTS[id].icon,cls);
function subjProgress(id){const o=S.subjects[id]?.objectives||[];return o.length?Math.round(o.filter(x=>x.done).length/o.length*100):0;}
function subjOverall(){const v=CORE_SUBJECTS.map(subjProgress);return Math.round(v.reduce((a,b)=>a+b,0)/v.length);}
function quizMastery(id){const q=S.profile.quiz[id];return q&&q.t?Math.round(q.c/q.t*100):null;}
function shade(hex){const n=parseInt(hex.slice(1),16);const r=Math.max(0,(n>>16)-32),g=Math.max(0,((n>>8)&255)-32),b=Math.max(0,(n&255)-32);return`#${((r<<16)|(g<<8)|b).toString(16).padStart(6,'0')}`;}

/* ---------- 1 · TABLEAU DE BORD ---------- */
function renderDash(){
  const now=new Date();
  const hi=now.getHours()<12?'Bon matin':now.getHours()<18?'Bon après-midi':'Bonne soirée';
  const name=S.profile.name?', '+esc(S.profile.name):'';
  const openTasks=S.tasks.filter(t=>!t.done);
  const todayTasks=openTasks.filter(t=>t.due===todayISO());
  const due=dueCards().length;
  const upExams=S.events.filter(e=>e.type==='examen'&&daysUntil(e.date)>=0).sort((a,b)=>a.date.localeCompare(b.date));
  const upEvents=S.events.filter(e=>daysUntil(e.date)>=0).sort((a,b)=>a.date.localeCompare(b.date)).slice(0,5);
  const prog=subjOverall();

  $('#main').innerHTML=topbar(hi+name,now.toLocaleDateString('fr-CA',{weekday:'long',day:'numeric',month:'long',year:'numeric'}))+`
  <div class="view">
    <div class="card pad" style="background:linear-gradient(135deg,#2563EB,#0EA5A4);color:#fff;border:none;margin-bottom:18px;overflow:hidden">
      <div class="row between" style="align-items:flex-start">
        <div><div style="font-size:11.5px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;opacity:.85">Ta journée en un coup d'œil</div>
          <div style="font-family:var(--f-disp);font-weight:800;font-size:24px;margin-top:6px;line-height:1.25">${todayTasks.length} tâche${todayTasks.length!==1?'s':''} · ${due} révision${due!==1?'s':''} · ${upExams.length} examen${upExams.length!==1?'s':''} à venir</div></div>
        <div class="chip" style="background:rgba(255,255,255,.18);color:#fff">${ic('flag')} ${S.profile.streak} j</div>
      </div>
      <div class="ecg mt"><svg viewBox="0 0 600 40" preserveAspectRatio="none"><path d="M0 20 H120 l10 -15 8 30 10 -23 7 16 H240 l14 -20 9 32 8 -12 H420 l10 -15 8 30 10 -23 7 16 H600"/></svg></div>
    </div>

    <div class="grid g-4" style="margin-bottom:20px">
      ${statCard('b','task',openTasks.length,'Tâches à faire')}
      ${statCard('p','cards',due,'Cartes à réviser')}
      ${statCard('g','target',prog+'%','Progression globale')}
      ${statCard('y','steth',S.profile.stageHours||0,'Heures de stage')}
    </div>

    <div class="grid g-2">
      <div class="card pad">
        <div class="row between mb"><div class="sec-title" style="margin:0">${ic('task','ic-sm')} À faire aujourd'hui</div><button class="btn sm ghost" onclick="go('tasks')">Tout voir ${ic('chevR','ic-sm')}</button></div>
        <div id="dashTasks">${todayTasks.length?todayTasks.map(taskRow).join(''):emptyBox('check','Rien de prévu aujourd\'hui','Profites-en pour prendre de l\'avance sur tes lectures.')}</div>
      </div>
      <div class="card pad">
        <div class="row between mb"><div class="sec-title" style="margin:0">${ic('cal','ic-sm')} Prochains événements</div><button class="btn sm ghost" onclick="go('cal')">Calendrier ${ic('chevR','ic-sm')}</button></div>
        ${upEvents.length?upEvents.map(e=>{const d=daysUntil(e.date);const s=SUBJECTS[e.subject];return `
          <div class="li"><span class="dot" style="background:${EVTYPES[e.type].hex};width:10px;height:10px"></span>
            <div style="flex:1"><div class="li-title" style="font-size:14px">${esc(e.title)}</div>
              <div class="li-meta"><span class="chip" style="background:${EVTYPES[e.type].hex}1e;color:${EVTYPES[e.type].hex}">${EVTYPES[e.type].l}</span>${s?`<span>${subjIcon(e.subject,'ic-sm')} ${s.name}</span>`:''}</div></div>
            <div style="text-align:right;font-size:12px;font-weight:700;color:${d<=2?'var(--pink-d)':'var(--ink-3)'}">${d===0?'Aujourd\'hui':d===1?'Demain':'dans '+d+' j'}<br><span class="muted" style="font-weight:500">${fmtDate(e.date)}</span></div>
          </div>`;}).join(''):emptyBox('cal','Aucun événement','Ajoute tes cours, stages et examens au calendrier.')}
      </div>
    </div>

    <div class="card pad mt">
      <div class="row between mb"><div class="sec-title" style="margin:0">${ic('book','ic-sm')} Progression par matière</div><button class="btn sm ghost" onclick="go('integration')">Vue Intégration ${ic('chevR','ic-sm')}</button></div>
      <div class="grid g-3">
        ${CORE_SUBJECTS.map(id=>{const s=SUBJECTS[id];const p=subjProgress(id);return `
          <div class="row" style="gap:11px;cursor:pointer" onclick="openSubject('${id}')">
            <div style="width:34px;height:34px;border-radius:10px;background:${s.hex}16;color:${s.hex};display:grid;place-items:center;flex:none">${subjIcon(id)}</div>
            <div style="flex:1"><div class="row between" style="margin-bottom:5px"><b style="font-size:13.5px">${s.name}</b><span class="muted" style="font-size:12px;font-weight:600">${p}%</span></div>
            <div class="progress"><i style="width:${p}%;background:${s.hex}"></i></div></div></div>`;}).join('')}
      </div>
    </div>
  </div>`;
}
const statCard=(c,icon,n,l)=>`<div class="stat ${c}"><div class="sic">${ic(icon,'ic-xl')}</div><div class="n">${n}</div><div class="l">${l}</div></div>`;

/* ---------- 2 · TÂCHES ---------- */
let taskFilter='all';
function renderTasks(){
  const acts=`<button class="btn primary" onclick="taskModal()">${ic('plus')} Nouvelle tâche</button>`;
  $('#main').innerHTML=topbar('Tâches','Organise tes travaux, lectures et révisions',acts)+`
  <div class="view">
    <div class="tabs mb">${[['all','Toutes'],['today','Aujourd\'hui'],['week','7 jours'],['high','Prioritaires'],['done','Complétées']].map(([k,l])=>`<button class="${taskFilter===k?'on':''}" onclick="taskFilter='${k}';renderTasks()">${l}</button>`).join('')}</div>
    <div class="card pad" id="taskList"></div>
  </div>`;
  renderTaskList();
}
function renderTaskList(){
  let list=[...S.tasks];
  if(taskFilter==='today')list=list.filter(t=>!t.done&&t.due===todayISO());
  else if(taskFilter==='week')list=list.filter(t=>!t.done&&t.due&&daysUntil(t.due)>=0&&daysUntil(t.due)<=7);
  else if(taskFilter==='high')list=list.filter(t=>!t.done&&t.prio==='h');
  else if(taskFilter==='done')list=list.filter(t=>t.done);
  else list=list.filter(t=>!t.done);
  list.sort((a,b)=>(a.due||'9999').localeCompare(b.due||'9999')||({h:0,m:1,l:2}[a.prio]-{h:0,m:1,l:2}[b.prio]));
  $('#taskList').innerHTML=list.length?list.map(taskRow).join(''):emptyBox('check','Aucune tâche ici','Ajoute une tâche pour commencer à t\'organiser.');
}
function taskRow(t){const s=SUBJECTS[t.subject];return `<div class="li ${t.done?'done':''}">
  <div class="prio ${t.prio}"></div>
  <div class="check ${t.done?'on':''}" onclick="toggleTask('${t.id}')">${ic('check')}</div>
  <div style="flex:1"><div class="li-title">${esc(t.title)}</div>
    <div class="li-meta">${s?`<span class="chip" style="background:${s.hex}16;color:${s.hex}">${subjIcon(t.subject,'ic-sm')} ${s.name}</span>`:''}${t.cat?`<span>${esc(t.cat)}</span>`:''}${t.due?`<span style="color:${!t.done&&daysUntil(t.due)<0?'var(--pink-d)':daysUntil(t.due)===0?'var(--yellow-d)':'var(--ink-3)'}">${ic('clock','ic-sm')} ${fmtDate(t.due)}</span>`:''}</div></div>
  <button class="btn icon ghost" onclick="delTask('${t.id}')" title="Supprimer">${ic('trash')}</button></div>`;}
function taskModal(){
  modal(`<div class="modal-head"><h2>Nouvelle tâche</h2><button class="btn icon ghost" onclick="closeModal()">${ic('x')}</button></div>
  <div class="modal-body">
    <label class="field"><span>Titre</span><input class="inp" id="tTitle" placeholder="Ex. Lire le chapitre 12 — Insuffisance cardiaque"></label>
    <div class="row" style="gap:12px"><label class="field" style="flex:1"><span>Matière</span><select class="sel" id="tSubj"><option value="">—</option>${CORE_SUBJECTS.map(id=>`<option value="${id}">${SUBJECTS[id].name}</option>`).join('')}</select></label>
      <label class="field" style="flex:1"><span>Catégorie</span><select class="sel" id="tCat"><option>Lecture</option><option>Travail</option><option>Révision</option><option>Labo</option><option>Examen</option><option>Stage</option></select></label></div>
    <div class="row" style="gap:12px"><label class="field" style="flex:1"><span>Échéance</span><input class="inp" type="date" id="tDue" value="${todayISO()}"></label>
      <label class="field" style="flex:1"><span>Priorité</span><select class="sel" id="tPrio"><option value="m">Moyenne</option><option value="h">Haute</option><option value="l">Basse</option></select></label></div>
  </div>
  <div class="modal-foot"><button class="btn ghost" onclick="closeModal()">Annuler</button><button class="btn primary" onclick="addTask()">Ajouter</button></div>`);
  setTimeout(()=>$('#tTitle').focus(),90);
}
function addTask(){const title=$('#tTitle').value.trim();if(!title)return toast('Donne un titre à ta tâche','err');
  S.tasks.push({id:uid(),title,subject:$('#tSubj').value,cat:$('#tCat').value,due:$('#tDue').value,prio:$('#tPrio').value,done:false});
  save('tasks');closeModal();renderTasks();buildNav();toast('Tâche ajoutée','ok');}
function toggleTask(id){const t=S.tasks.find(x=>x.id===id);if(!t)return;t.done=!t.done;if(t.done){bumpStreak();friday.say('celebrate');}save('tasks');if(current==='tasks')renderTaskList();else if(current==='dash')renderDash();buildNav();}
function delTask(id){S.tasks=S.tasks.filter(x=>x.id!==id);save('tasks');if(current==='tasks')renderTaskList();else if(current==='dash')renderDash();buildNav();}

/* ---------- 3 · CALENDRIER ---------- */
let weekOffset=0;
function renderCal(){
  const acts=`<button class="btn primary" onclick="evModal()">${ic('plus')} Événement</button>`;
  $('#main').innerHTML=topbar('Calendrier','Cours, stages, labos et examens',acts)+`
  <div class="view">
    <div class="row between mb wrap" style="gap:10px">
      <div class="row" style="gap:6px"><button class="btn icon" onclick="weekOffset--;renderCal()">${ic('chevL')}</button><button class="btn sm" onclick="weekOffset=0;renderCal()">Cette semaine</button><button class="btn icon" onclick="weekOffset++;renderCal()">${ic('chevR')}</button></div>
      <div class="row wrap" style="gap:6px">${Object.entries(EVTYPES).map(([k,v])=>`<span class="chip" style="background:${v.hex}16;color:${v.hex}"><span class="dot" style="background:${v.hex}"></span>${v.l}</span>`).join('')}</div>
    </div>
    <div class="cal" id="calGrid"></div>
  </div>`;
  const grid=$('#calGrid');const base=new Date();base.setDate(base.getDate()-((base.getDay()+6)%7)+weekOffset*7);
  const dn=['Lun','Mar','Mer','Jeu','Ven','Sam','Dim'];let html='';
  for(let i=0;i<7;i++){const d=new Date(base);d.setDate(base.getDate()+i);const iso=new Date(d.getTime()-d.getTimezoneOffset()*6e4).toISOString().slice(0,10);
    const evs=S.events.filter(e=>e.date===iso).sort((a,b)=>(a.time||'').localeCompare(b.time||''));
    html+=`<div class="cal-day ${iso===todayISO()?'today':''}"><div class="row between"><span class="cal-dname">${dn[i]}</span><span class="cal-dnum">${d.getDate()}</span></div>
      ${evs.map(e=>`<div class="cal-ev" style="background:${EVTYPES[e.type].hex}" onclick="evModal('${e.id}')">${e.time?e.time+' ':''}${esc(e.title)}</div>`).join('')}
      <button class="btn ghost sm" style="margin-top:auto;color:var(--ink-4);padding:3px;font-size:11px" onclick="evModal(null,'${iso}')">+ ajouter</button></div>`;}
  grid.innerHTML=html;
}
function evModal(id,presetDate){
  const e=id?S.events.find(x=>x.id===id):null;
  modal(`<div class="modal-head"><h2>${e?'Modifier':'Nouvel'} événement</h2><button class="btn icon ghost" onclick="closeModal()">${ic('x')}</button></div>
  <div class="modal-body">
    <label class="field"><span>Titre</span><input class="inp" id="eTitle" value="${e?esc(e.title):''}" placeholder="Ex. Examen mi-session — Pharmaco"></label>
    <div class="row" style="gap:12px"><label class="field" style="flex:1"><span>Type</span><select class="sel" id="eType">${Object.entries(EVTYPES).map(([k,v])=>`<option value="${k}" ${e&&e.type===k?'selected':''}>${v.l}</option>`).join('')}</select></label>
      <label class="field" style="flex:1"><span>Matière</span><select class="sel" id="eSubj"><option value="">—</option>${CORE_SUBJECTS.map(id=>`<option value="${id}" ${e&&e.subject===id?'selected':''}>${SUBJECTS[id].name}</option>`).join('')}</select></label></div>
    <div class="row" style="gap:12px"><label class="field" style="flex:1"><span>Date</span><input class="inp" type="date" id="eDate" value="${e?e.date:(presetDate||todayISO())}"></label>
      <label class="field" style="flex:1"><span>Heure</span><input class="inp" type="time" id="eTime" value="${e?e.time||'':''}"></label></div>
  </div>
  <div class="modal-foot">${e?`<button class="btn ghost" style="margin-right:auto;color:var(--pink-d)" onclick="delEvent('${e.id}')">Supprimer</button>`:''}<button class="btn ghost" onclick="closeModal()">Annuler</button><button class="btn primary" onclick="saveEvent('${id||''}')">Enregistrer</button></div>`);
  setTimeout(()=>$('#eTitle').focus(),90);
}
function saveEvent(id){const title=$('#eTitle').value.trim();if(!title)return toast('Ajoute un titre','err');
  const o={title,type:$('#eType').value,subject:$('#eSubj').value,date:$('#eDate').value,time:$('#eTime').value};
  if(id){Object.assign(S.events.find(x=>x.id===id),o);}else{S.events.push({id:uid(),...o});}
  save('events');closeModal();renderCal();toast('Événement enregistré','ok');}
function delEvent(id){S.events=S.events.filter(x=>x.id!==id);save('events');closeModal();renderCal();}

/* ---------- 4 · MATIÈRES ---------- */
function renderSubjects(){
  $('#main').innerHTML=topbar('Matières','Tes domaines de formation infirmière')+`
  <div class="view"><div class="grid g-3">
    <div class="subj integ" onclick="go('integration')">
      <div class="sic">${ic('network')}</div>
      <div style="flex:1"><h3>Intégration</h3><small style="opacity:.9">Matière transversale — compile et relie toutes les autres. Ouvre le tableau de synthèse.</small></div>
      ${ic('chevR','ic-lg')}
    </div>
    ${CORE_SUBJECTS.map(id=>{const s=SUBJECTS[id];const p=subjProgress(id);const o=S.subjects[id]?.objectives||[];return `
      <div class="subj" style="background:linear-gradient(135deg,${s.hex},${shade(s.hex)})" onclick="openSubject('${id}')">
        <div class="row between"><div class="sic">${subjIcon(id)}</div><span class="chip" style="background:rgba(255,255,255,.22);color:#fff">${o.length} objectif${o.length!==1?'s':''}</span></div>
        <div><h3>${s.name}</h3><div class="bar"><i style="width:${p}%"></i></div><small>${p}% maîtrisé</small></div></div>`;}).join('')}
  </div></div>`;
}
function openSubject(id){
  const s=SUBJECTS[id];const sd=S.subjects[id]||{objectives:[],notes:''};
  modal(`<div class="modal-head"><div style="width:38px;height:38px;border-radius:11px;background:${s.hex}18;color:${s.hex};display:grid;place-items:center">${subjIcon(id)}</div><h2>${s.name}</h2><button class="btn icon ghost" onclick="closeModal()">${ic('x')}</button></div>
  <div class="modal-body">
    <div class="sec-title">${ic('target','ic-sm')} Objectifs d'apprentissage / compétences</div>
    <div id="objList">${objList(id)}</div>
    <div class="row mt" style="gap:8px"><input class="inp" id="objNew" placeholder="Ajouter un objectif ou une compétence…" onkeydown="if(event.key==='Enter')addObj('${id}')"><button class="btn primary" onclick="addObj('${id}')">${ic('plus')}</button></div>
    <div class="hr"></div>
    <div class="sec-title">${ic('fileText','ic-sm')} Notes rapides</div>
    <textarea class="ta" id="subjNotes" placeholder="Concepts à retenir, points faibles, questions pour le prof…" onchange="saveNotes('${id}')">${esc(sd.notes)}</textarea>
    <div class="row wrap mt" style="gap:8px">
      <button class="btn green sm" onclick="closeModal();go('meds');setTimeout(()=>{var e=document.getElementById('medSubj');if(e)e.value='${id}'},160)">${ic('pill')} Fiches médicaments</button>
      <button class="btn pink sm" onclick="closeModal();go('quiz');setTimeout(()=>{var e=document.getElementById('qSubj');if(e)e.value='${id}'},160)">${ic('quiz')} Générer un quiz</button>
      <button class="btn violet sm" onclick="closeModal();go('schemas');setTimeout(()=>{var e=document.getElementById('schPatho');if(e)e.focus()},160)">${ic('share')} Schéma</button>
    </div>
  </div>`,true);
}
function objList(id){const o=S.subjects[id].objectives;return o.length?o.map(x=>`
  <div class="li" style="padding:8px 4px"><div class="check ${x.done?'on':''}" onclick="toggleObj('${id}','${x.id}')">${ic('check')}</div>
    <div style="flex:1" class="li-title ${x.done?'done':''}">${esc(x.text)}</div>
    <button class="btn icon ghost" onclick="delObj('${id}','${x.id}')">${ic('trash')}</button></div>`).join(''):`<p class="muted" style="font-size:13px">Aucun objectif pour l'instant. Ajoute-en pour suivre ta maîtrise.</p>`;}
function addObj(id){const i=$('#objNew');const t=i.value.trim();if(!t)return;S.subjects[id].objectives.push({id:uid(),text:t,done:false});save('subjects');i.value='';$('#objList').innerHTML=objList(id);}
function toggleObj(id,oid){const o=S.subjects[id].objectives.find(x=>x.id===oid);o.done=!o.done;if(o.done)bumpStreak();save('subjects');$('#objList').innerHTML=objList(id);}
function delObj(id,oid){S.subjects[id].objectives=S.subjects[id].objectives.filter(x=>x.id!==oid);save('subjects');$('#objList').innerHTML=objList(id);}
function saveNotes(id){S.subjects[id].notes=$('#subjNotes').value;save('subjects');toast('Notes enregistrées','ok');}

/* ---------- 5 · INTÉGRATION (tableau de synthèse transversal) ---------- */
function renderIntegration(){
  const prog=subjOverall();
  const allObj=CORE_SUBJECTS.flatMap(id=>(S.subjects[id].objectives||[]).map(o=>({...o,subj:id})));
  const doneObj=allObj.filter(o=>o.done).length;
  const weak=CORE_SUBJECTS.map(id=>({id,p:subjProgress(id),q:quizMastery(id)}))
    .sort((a,b)=>((a.p+(a.q??100))/2)-((b.p+(b.q??100))/2)).slice(0,3);
  const keyMeds=S.meds.slice(0,4);
  $('#main').innerHTML=topbar('Intégration','Vue transversale — synthèse et révision croisée de toutes les matières')+`
  <div class="view">
    <div class="card pad" style="background:linear-gradient(135deg,#6366F1,#4F46E5);color:#fff;border:none;margin-bottom:18px">
      <div class="row between wrap" style="gap:14px">
        <div><div style="font-size:11.5px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;opacity:.85">Progression consolidée</div>
          <div style="font-family:var(--f-disp);font-weight:800;font-size:40px;line-height:1;margin-top:4px">${prog}%</div>
          <div style="opacity:.9;font-size:13px;margin-top:4px">${doneObj} / ${allObj.length} objectifs maîtrisés · ${CORE_SUBJECTS.length} matières</div></div>
        <div class="row" style="gap:8px"><button class="btn" style="background:rgba(255,255,255,.16);border-color:transparent;color:#fff" onclick="go('cases')">${ic('clipboard')} Cas intégrateur</button>
          <button class="btn" style="background:#fff;border-color:#fff;color:var(--indigo)" onclick="crossReview()">${ic('cards')} Révision croisée</button></div>
      </div>
    </div>

    <div class="grid g-2">
      <div class="card pad">
        <div class="sec-title">${ic('chart','ic-sm')} Maîtrise par matière</div>
        ${CORE_SUBJECTS.map(id=>{const s=SUBJECTS[id];const p=subjProgress(id);const q=quizMastery(id);return `
          <div style="margin-bottom:13px"><div class="row between" style="margin-bottom:5px"><span class="row" style="gap:8px"><span style="color:${s.hex}">${subjIcon(id,'ic-sm')}</span><b style="font-size:13.5px">${s.name}</b></span>
            <span class="muted" style="font-size:12px;font-weight:600">obj ${p}%${q!=null?` · quiz ${q}%`:''}</span></div>
            <div class="progress"><i style="width:${p}%;background:${s.hex}"></i></div></div>`;}).join('')}
      </div>
      <div class="card pad">
        <div class="sec-title">${ic('flag','ic-sm')} À renforcer en priorité</div>
        <p class="muted" style="font-size:13px;margin-bottom:12px">Zones les plus faibles selon tes objectifs et tes résultats de quiz.</p>
        ${weak.map(w=>{const s=SUBJECTS[w.id];return `
          <div class="li"><div style="width:32px;height:32px;border-radius:9px;background:${s.hex}16;color:${s.hex};display:grid;place-items:center;flex:none">${subjIcon(w.id)}</div>
            <div style="flex:1"><div class="li-title" style="font-size:14px">${s.name}</div><div class="li-meta">objectifs ${w.p}%${w.q!=null?` · quiz ${w.q}%`:' · aucun quiz fait'}</div></div>
            <button class="btn sm" onclick="go('quiz');setTimeout(()=>{var e=document.getElementById('qSubj');if(e)e.value='${w.id}'},160)">S'exercer</button></div>`;}).join('')}
      </div>
    </div>

    <div class="card pad mt">
      <div class="row between mb"><div class="sec-title" style="margin:0">${ic('layers','ic-sm')} Objectifs compilés (toutes matières)</div><span class="chip">${doneObj}/${allObj.length}</span></div>
      ${allObj.length?`<div class="grid g-2">${CORE_SUBJECTS.filter(id=>(S.subjects[id].objectives||[]).length).map(id=>{const s=SUBJECTS[id];const o=S.subjects[id].objectives;return `
        <div><div class="row" style="gap:7px;margin-bottom:6px;color:${s.hex}">${subjIcon(id,'ic-sm')}<b style="font-size:12.5px;color:var(--ink)">${s.name}</b></div>
        <ul class="clean" style="font-size:13px">${o.map(x=>`<li class="row" style="gap:8px;padding:3px 0"><span style="color:${x.done?'var(--green)':'var(--ink-4)'}">${ic(x.done?'check':'clock','ic-sm')}</span><span class="${x.done?'muted':''}" style="${x.done?'text-decoration:line-through':''}">${esc(x.text)}</span></li>`).join('')}</ul></div>`;}).join('')}</div>`
        :emptyBox('layers','Aucun objectif à compiler','Ajoute des objectifs dans chaque matière — ils apparaîtront ici, reliés entre eux.')}
    </div>

    ${keyMeds.length?`<div class="card pad mt"><div class="sec-title">${ic('pill','ic-sm')} Fiches médicaments clés</div>
      <div class="row wrap" style="gap:8px">${keyMeds.map(m=>`<button class="tag" onclick="viewMeds('${m.id}')" style="cursor:pointer">${ic('pill','ic-sm')} ${esc(m.patho)} · ${m.items.length} méd.</button>`).join('')}</div></div>`:''}
  </div>`;
}
function crossReview(){
  const due=dueCards();
  if(!S.cards.length)return toast('Crée d\'abord des flashcards (via un résumé ou manuellement)','err');
  reviewQueue=(due.length?due:[...S.cards]).sort(()=>Math.random()-.5);reviewIdx=0;cardFlipped=false;
  go('cards');setTimeout(()=>{$('#main').querySelector('.view')&&renderReview();},60);
}

/* ---------- 8 · FLASHCARDS (répétition espacée SM-2 allégé) ---------- */
function dueCards(){const now=Date.now();return S.cards.filter(c=>(c.due||0)<=now);}
function addCard(recto,verso,subject){S.cards.push({id:uid(),recto,verso,subject:subject||'medecine',ease:2.4,interval:0,due:Date.now(),reps:0});save('cards');}
let reviewQueue=[],reviewIdx=0,cardFlipped=false;
function renderCards(){
  const due=dueCards();
  $('#main').innerHTML=topbar('Flashcards','Révision par répétition espacée',`<button class="btn" onclick="cardModal()">${ic('plus')} Carte</button>`)+`
  <div class="view">
    <div class="grid g-3 mb">${statCard('b','cards',S.cards.length,'Cartes au total')}${statCard('p','clock',due.length,'À réviser maintenant')}${statCard('g','check',S.cards.filter(c=>c.reps>2).length,'Bien maîtrisées')}</div>
    ${due.length?`<div class="center"><button class="btn primary" style="padding:13px 28px;font-size:15px" onclick="startReview()">${ic('play')} Réviser ${due.length} carte${due.length>1?'s':''}</button></div>`:emptyBox('check','Tout est à jour !','Aucune carte à réviser pour l\'instant. Reviens plus tard ou crées-en de nouvelles.')}
    <div class="card pad mt"><div class="sec-title">${ic('cards','ic-sm')} Toutes les cartes</div>
      ${S.cards.length?S.cards.map(c=>`<div class="li"><span class="dot" style="background:${SUBJECTS[c.subject]?.hex||'#888'};width:10px;height:10px"></span>
        <div style="flex:1"><div class="li-title" style="font-size:14px">${esc(c.recto)}</div><div class="li-meta">${esc(c.verso.slice(0,64))}${c.verso.length>64?'…':''}</div></div>
        <button class="btn icon ghost" onclick="S.cards=S.cards.filter(x=>x.id!=='${c.id}');save('cards');renderCards();buildNav()">${ic('trash')}</button></div>`).join(''):`<p class="muted" style="font-size:13px">Aucune carte. Crées-en ou génère-les depuis un résumé PPT.</p>`}</div>
  </div>`;
}
function cardModal(){modal(`<div class="modal-head"><h2>Nouvelle flashcard</h2><button class="btn icon ghost" onclick="closeModal()">${ic('x')}</button></div>
  <div class="modal-body"><label class="field"><span>Matière</span><select class="sel" id="cSubj">${CORE_SUBJECTS.map(id=>`<option value="${id}">${SUBJECTS[id].name}</option>`).join('')}</select></label>
    <label class="field"><span>Recto (question)</span><textarea class="ta" id="cR" placeholder="Ex. Quels sont les signes de l'hypoglycémie ?"></textarea></label>
    <label class="field"><span>Verso (réponse)</span><textarea class="ta" id="cV" placeholder="Ex. Tremblements, diaphorèse, tachycardie, confusion…"></textarea></label></div>
  <div class="modal-foot"><button class="btn ghost" onclick="closeModal()">Annuler</button><button class="btn primary" onclick="saveCard()">Ajouter</button></div>`);}
function saveCard(){const r=$('#cR').value.trim(),v=$('#cV').value.trim();if(!r||!v)return toast('Remplis les deux côtés','err');addCard(r,v,$('#cSubj').value);closeModal();renderCards();buildNav();toast('Carte ajoutée','ok');}
function startReview(){reviewQueue=dueCards();reviewIdx=0;cardFlipped=false;renderReview();}
function renderReview(){
  const host=$('#main').querySelector('.view');if(!host)return;
  if(reviewIdx>=reviewQueue.length){host.innerHTML=`<div class="empty"><div class="eic" style="background:var(--green-t);color:var(--green)">${ic('check')}</div><h3>Révision terminée !</h3><p>Bravo, tu as passé toutes tes cartes. Friday est fier de toi.</p><button class="btn primary mt" onclick="renderCards()">Retour</button></div>`;bumpStreak();friday.say('celebrate');buildNav();return;}
  const c=reviewQueue[reviewIdx];const s=SUBJECTS[c.subject];
  host.innerHTML=`<div class="row between mb"><span class="chip" style="background:${s.hex}16;color:${s.hex}">${subjIcon(c.subject,'ic-sm')} ${s.name}</span><span class="muted" style="font-weight:600">${reviewIdx+1} / ${reviewQueue.length}</span></div>
    <div class="fc ${cardFlipped?'flip':''}" id="fcard" onclick="cardFlipped=!cardFlipped;this.classList.toggle('flip');document.getElementById('fcHint').textContent=cardFlipped?'Comment as-tu répondu ?':'Touche la carte pour révéler la réponse'">
      <div class="fc-inner"><div class="fc-face fc-front"><div class="lbl">Question</div><div class="txt">${esc(c.recto)}</div></div>
        <div class="fc-face fc-back"><div class="lbl">Réponse</div><div class="txt">${esc(c.verso)}</div></div></div></div>
    <div class="fc-hint" id="fcHint">${cardFlipped?'Comment as-tu répondu ?':'Touche la carte pour révéler la réponse'}</div>
    ${cardFlipped?`<div class="row" style="gap:9px;justify-content:center;margin-top:16px;flex-wrap:wrap">
      <button class="btn" style="border-color:var(--pink);color:var(--pink-d)" onclick="rate(0)">Encore</button>
      <button class="btn" style="border-color:var(--yellow);color:var(--yellow-d)" onclick="rate(1)">Difficile</button>
      <button class="btn" style="border-color:var(--blue);color:var(--blue-d)" onclick="rate(2)">Correct</button>
      <button class="btn green" onclick="rate(3)">Facile</button></div>`:''}`;
}
function rate(q){const c=reviewQueue[reviewIdx];
  if(q===0){c.interval=0;c.ease=Math.max(1.6,c.ease-0.2);c.due=Date.now()+6e5;}
  else{c.reps++;c.ease=Math.min(3,c.ease+(q===3?0.15:q===2?0:-0.15));
    c.interval=c.interval===0?(q===1?1:q===2?2:4):Math.round(c.interval*c.ease*(q===1?0.6:q===3?1.3:1));c.due=Date.now()+c.interval*864e5;}
  save('cards');reviewIdx++;cardFlipped=false;renderReview();}
/* ==================================================================
   OUTILS IA — PPT, Médicaments, Cas cliniques
   ================================================================== */

/* ---------- 6 · RÉSUMEUR PPT ---------- */
function renderPPT(){
  $('#main').innerHTML=topbar('Résumeur de PowerPoint','Transforme tes diapos en notes d\'étude structurées')+`
  <div class="view"><div class="grid g-2">
    <div class="card pad">
      <div class="sec-title">${ic('upload','ic-sm')} Source</div>
      <label class="field"><span>Matière</span><select class="sel" id="pptSubj">${CORE_SUBJECTS.map(id=>`<option value="${id}">${SUBJECTS[id].name}</option>`).join('')}</select></label>
      <label class="btn block" style="border-style:dashed;padding:20px;flex-direction:column;gap:6px;cursor:pointer">${ic('fileText','ic-lg')}<b>Importer un fichier .pptx</b><small class="muted">le texte des diapos est extrait automatiquement</small><input type="file" accept=".pptx" style="display:none" onchange="loadPptx(this)"></label>
      <div class="center muted" style="margin:12px 0;font-size:12px">— ou colle le texte —</div>
      <textarea class="ta" id="pptText" style="min-height:170px" placeholder="Colle ici le contenu de tes diapositives…"></textarea>
      <button class="btn primary block mt" id="pptGo" onclick="doSummary()">${ic('spark')} Générer le résumé</button>
    </div>
    <div class="card pad" id="pptOut"><div class="sec-title">${ic('fileText','ic-sm')} Résumé</div>${emptyBox('fileText','Ton résumé apparaîtra ici','Importe un .pptx ou colle du texte, puis lance Friday.')}</div>
  </div>
  <div class="card pad mt"><div class="sec-title">${ic('cards','ic-sm')} Résumés sauvegardés</div><div id="pptSaved">${savedSummaries()}</div></div>
  </div>`;
}
function savedSummaries(){return S.summaries.length?S.summaries.map(s=>{const su=SUBJECTS[s.subject];return`
  <div class="li"><span style="color:${su?su.hex:'#888'}">${su?subjIcon(s.subject):ic('fileText')}</span>
    <div style="flex:1"><div class="li-title">${esc(s.title)}</div><div class="li-meta">${su?su.name:''} · ${s.date}</div></div>
    <button class="btn sm" onclick="viewSummary('${s.id}')">Ouvrir</button>
    <button class="btn icon ghost" onclick="S.summaries=S.summaries.filter(x=>x.id!=='${s.id}');save('summaries');renderPPT()">${ic('trash')}</button></div>`;}).join(''):`<p class="muted" style="font-size:13px">Aucun résumé sauvegardé.</p>`;}
async function loadPptx(input){
  const f=input.files[0];if(!f)return;
  try{ toast('Extraction du texte…');
    const zip=await JSZip.loadAsync(f);const slides=[];
    const names=Object.keys(zip.files).filter(n=>/ppt\/slides\/slide\d+\.xml$/.test(n)).sort((a,b)=>a.localeCompare(b,undefined,{numeric:true}));
    for(const n of names){const xml=await zip.files[n].async('string');const txt=(xml.match(/<a:t>[^<]*<\/a:t>/g)||[]).map(t=>t.replace(/<\/?a:t>/g,'')).join(' ');if(txt.trim())slides.push(txt);}
    if(!slides.length)return toast('Aucun texte trouvé dans ce fichier','err');
    $('#pptText').value=slides.map((s,i)=>`— Diapo ${i+1} —\n${s}`).join('\n\n');
    toast(names.length+' diapositives importées','ok');
  }catch(e){toast('Impossible de lire ce fichier','err');}
}
async function doSummary(){
  const text=$('#pptText').value.trim();if(text.length<40)return toast('Ajoute plus de contenu à résumer','err');
  const subj=$('#pptSubj').value;const btn=$('#pptGo');btn.disabled=true;btn.innerHTML='<span class="spin"></span> Friday résume…';
  $('#pptOut').innerHTML=`<div class="ai-loading"><div class="spin dark"></div><div class="pulse">Friday analyse tes diapositives…</div></div>`;
  try{
    const r=await askClaude(`Voici le contenu de diapositives de cours en ${SUBJECTS[subj].name} (soins infirmiers). Résume-le en notes d'étude claires et structurées.\n\n${text}`,{json:true,max:2600,
      system:'Tu es un tuteur en soins infirmiers. Réponds UNIQUEMENT avec un objet JSON valide, sans texte autour: {"titre":"...","concepts":["..."],"definitions":[{"terme":"...","def":"..."}],"points_examen":["..."],"a_retenir":"une phrase clé"}. Français québécois.'});
    $('#pptOut').innerHTML=`<div class="sec-title">${ic('fileText','ic-sm')} ${esc(r.titre||'Résumé')}</div>
      <div class="chip yellow mb">${ic('bulb','ic-sm')} À retenir : ${esc(r.a_retenir||'')}</div>
      <h4 style="font-size:14px;margin:14px 0 8px">Concepts clés</h4><ul class="bul">${(r.concepts||[]).map(c=>`<li>${esc(c)}</li>`).join('')}</ul>
      <h4 style="font-size:14px;margin:16px 0 8px">Définitions</h4>${(r.definitions||[]).map(d=>`<div style="margin-bottom:7px;font-size:14px"><b>${esc(d.terme)} :</b> ${esc(d.def)}</div>`).join('')}
      <h4 style="font-size:14px;margin:16px 0 8px">Points d'examen probables</h4><ul class="bul">${(r.points_examen||[]).map(p=>`<li>${esc(p)}</li>`).join('')}</ul>
      <div class="row mt wrap" style="gap:8px"><button class="btn green sm" onclick='saveSummary(${attr({subject:subj,...r})})'>${ic('check')} Sauvegarder</button>
      <button class="btn pink sm" onclick='cardsFromSummary(${attr(r)})'>${ic('cards')} Créer des flashcards</button></div>`;
  }catch(e){$('#pptOut').innerHTML=aiError(e,'doSummary()');}
  btn.disabled=false;btn.innerHTML=ic('spark')+' Générer le résumé';
}
function saveSummary(data){S.summaries.unshift({id:uid(),date:todayISO(),subject:data.subject,title:data.titre||'Résumé',data});save('summaries');if($('#pptSaved'))$('#pptSaved').innerHTML=savedSummaries();bumpStreak();toast('Résumé sauvegardé','ok');}
function viewSummary(id){const s=S.summaries.find(x=>x.id===id);const r=s.data;
  modal(`<div class="modal-head"><h2>${esc(r.titre||s.title)}</h2><button class="btn icon ghost" onclick="closeModal()">${ic('x')}</button></div>
  <div class="modal-body"><div class="chip yellow mb">${ic('bulb','ic-sm')} ${esc(r.a_retenir||'')}</div>
    <h4 style="margin:10px 0 6px">Concepts clés</h4><ul class="bul">${(r.concepts||[]).map(c=>`<li>${esc(c)}</li>`).join('')}</ul>
    <h4 style="margin:14px 0 6px">Définitions</h4>${(r.definitions||[]).map(d=>`<div class="mb"><b>${esc(d.terme)} :</b> ${esc(d.def)}</div>`).join('')}
    <h4 style="margin:14px 0 6px">Points d'examen</h4><ul class="bul">${(r.points_examen||[]).map(p=>`<li>${esc(p)}</li>`).join('')}</ul></div>`,true);}
function cardsFromSummary(r){const defs=(r.definitions||[]).map(d=>({recto:d.terme,verso:d.def}));const pts=(r.concepts||[]).slice(0,4).map(c=>({recto:'Explique : '+String(c).split(':')[0].slice(0,60),verso:c}));const all=[...defs,...pts];if(!all.length)return toast('Rien à convertir','err');all.forEach(c=>addCard(c.recto,c.verso,'medecine'));toast(all.length+' flashcards créées','ok');buildNav();}

/* ---------- 7 · FICHES MÉDICAMENTS ---------- */
function renderMeds(){
  $('#main').innerHTML=topbar('Fiches médicaments','Par pathologie — classe, mécanisme et surveillances infirmières')+`
  <div class="view">
    <div class="card pad mb"><div class="row wrap" style="gap:12px;align-items:flex-end">
      <label class="field" style="flex:2;min-width:220px;margin:0"><span>Maladie / problème de santé étudié</span><input class="inp" id="medPatho" placeholder="Ex. Insuffisance cardiaque, MPOC, diabète type 2…" onkeydown="if(event.key==='Enter')doMeds()"></label>
      <label class="field" style="flex:1;min-width:150px;margin:0"><span>Matière</span><select class="sel" id="medSubj">${CORE_SUBJECTS.map(id=>`<option value="${id}">${SUBJECTS[id].name}</option>`).join('')}</select></label>
      <button class="btn primary" id="medGo" onclick="doMeds()">${ic('spark')} Générer</button></div>
      <div class="chip pink mt">${ic('check','ic-sm')} Les 5 bons : bon patient · bon médicament · bonne dose · bonne voie · bon moment</div></div>
    <div id="medOut">${S.meds.length?savedMeds():emptyBox('pill','Aucune fiche pour l\'instant','Entre une pathologie et Friday génère les médicaments à connaître.')}</div>
  </div>`;
}
function savedMeds(){return `<div class="sec-title">${ic('cards','ic-sm')} Fiches sauvegardées</div>`+S.meds.map(m=>`
  <div class="li"><span style="color:var(--violet)">${ic('pill')}</span><div style="flex:1"><div class="li-title">${esc(m.patho)}</div><div class="li-meta">${m.items.length} médicaments · ${SUBJECTS[m.subject]?.name||''} · ${m.date}</div></div>
    <button class="btn sm" onclick="viewMeds('${m.id}')">Ouvrir</button><button class="btn icon ghost" onclick="S.meds=S.meds.filter(x=>x.id!=='${m.id}');save('meds');renderMeds()">${ic('trash')}</button></div>`).join('');}
async function doMeds(){
  const patho=$('#medPatho').value.trim();if(!patho)return toast('Entre une pathologie','err');
  const subj=$('#medSubj').value;const btn=$('#medGo');if(btn){btn.disabled=true;btn.innerHTML='<span class="spin"></span> Génération…';}
  $('#medOut').innerHTML=`<div class="ai-loading"><div class="spin dark"></div><div class="pulse">Friday prépare les fiches pour « ${esc(patho)} »…</div></div>`;
  try{
    const r=await askClaude(`Liste les médicaments essentiels à connaître pour un étudiant en soins infirmiers concernant : ${patho}.`,{json:true,max:2900,
      system:'Tu es un pharmacologue clinicien pour étudiants infirmiers au Québec. Réponds UNIQUEMENT avec un tableau JSON valide: [{"nom":"générique (commercial)","classe":"classe pharmacologique","mecanisme":"mécanisme d\'action bref","indications":"indication liée à la pathologie","effets_secondaires":"effets indésirables clés","surveillances":"surveillances infirmières précises","contre_indications":"contre-indications","enseignement":"enseignement au patient"}]. Donne 4 à 7 médicaments pertinents. Français québécois.'});
    const items=Array.isArray(r)?r:(r.medicaments||[]);
    S.meds.unshift({id:uid(),date:todayISO(),patho,subject:subj,items});save('meds');bumpStreak();
    $('#medOut').innerHTML=medCards(items,patho)+`<div class="hr"></div>`+savedMeds();toast('Fiches générées et sauvegardées','ok');
  }catch(e){$('#medOut').innerHTML=aiError(e,'doMeds()');}
  if(btn){btn.disabled=false;btn.innerHTML=ic('spark')+' Générer';}
}
const MEDKEYS={mecanisme:'Mécanisme',indications:'Indication',effets_secondaires:'Effets 2ᵃⁱʳᵉˢ',surveillances:'Surveillances',contre_indications:'Contre-ind.',enseignement:'Enseignement'};
function medCards(items,patho){return `<div class="sec-title">${ic('pill','ic-sm')} ${esc(patho)} — ${items.length} médicaments</div><div class="grid g-2">`+items.map(medCardHTML).join('')+`</div>`;}
function medCardHTML(m){return `<div class="med"><div class="med-head"><div class="pill">${ic('pill')}</div><div><div class="med-name">${esc(m.nom)}</div><div class="chip violet" style="margin-top:3px">${esc(m.classe)}</div></div></div>
  <div class="med-body">${Object.keys(MEDKEYS).map(k=>m[k]?`<div class="med-row"><div class="k">${MEDKEYS[k]}</div><div class="v">${esc(m[k])}</div></div>`:'').join('')}</div></div>`;}
function viewMeds(id){const m=S.meds.find(x=>x.id===id);modal(`<div class="modal-head"><h2>${ic('pill')} ${esc(m.patho)}</h2><button class="btn icon ghost" onclick="closeModal()">${ic('x')}</button></div><div class="modal-body">${m.items.map(medCardHTML).join('<div style="height:14px"></div>')}</div>`,true);}

/* ---------- Cas cliniques intégrateurs (multi-matières, IA) ---------- */
let currentCase=null;
function renderCases(){
  $('#main').innerHTML=topbar('Cas cliniques intégrateurs','Scénarios réalistes qui croisent plusieurs matières')+`
  <div class="view">
    <div class="card pad mb"><div class="sec-title">${ic('spark','ic-sm')} Générer un cas</div>
      <p class="muted" style="font-size:13px;margin-bottom:12px">Friday construit un cas qui combine plusieurs domaines (ex. patiente âgée + périnatalité + surveillance pharmacologique), avec questions de jugement clinique et débreffage.</p>
      <div class="row wrap" style="gap:8px;margin-bottom:12px"><span style="font-size:12.5px;font-weight:700;color:var(--ink-2);align-self:center">Matières à croiser :</span>
        ${CORE_SUBJECTS.map(id=>`<label class="tag" style="cursor:pointer"><input type="checkbox" class="caseSubj" value="${id}" style="margin-right:5px">${SUBJECTS[id].name}</label>`).join('')}</div>
      <div class="row wrap" style="gap:12px;align-items:flex-end">
        <label class="field" style="flex:1;min-width:180px;margin:0"><span>Contexte (optionnel)</span><input class="inp" id="caseCtx" placeholder="Ex. femme de 34 ans en post-partum, antécédents d'anxiété…"></label>
        <button class="btn violet" id="caseGo" onclick="doCase()">${ic('clipboard')} Créer le cas</button></div>
    </div>
    <div id="caseOut">${S.cases.length?savedCases():emptyBox('clipboard','Aucun cas généré','Sélectionne des matières et lance un cas clinique intégrateur.')}</div>
  </div>`;
}
function savedCases(){return `<div class="sec-title">${ic('cards','ic-sm')} Cas sauvegardés</div>`+S.cases.map(c=>`
  <div class="li"><span style="color:var(--indigo)">${ic('clipboard')}</span><div style="flex:1"><div class="li-title">${esc(c.titre)}</div><div class="li-meta">${(c.subjects||[]).map(s=>SUBJECTS[s]?.name).filter(Boolean).join(' · ')} · ${c.date}</div></div>
    <button class="btn sm" onclick="viewCase('${c.id}')">Ouvrir</button><button class="btn icon ghost" onclick="S.cases=S.cases.filter(x=>x.id!=='${c.id}');save('cases');renderCases()">${ic('trash')}</button></div>`).join('');}
async function doCase(){
  const subs=[...document.querySelectorAll('.caseSubj:checked')].map(c=>c.value);
  if(subs.length<1)return toast('Choisis au moins une matière','err');
  const ctx=$('#caseCtx').value.trim();const btn=$('#caseGo');btn.disabled=true;btn.innerHTML='<span class="spin"></span> Création…';
  $('#caseOut').innerHTML=`<div class="ai-loading"><div class="spin dark"></div><div class="pulse">Friday construit un cas intégrateur…</div></div>`;
  try{
    const r=await askClaude(`Crée un cas clinique intégrateur réaliste pour un étudiant en soins infirmiers qui croise ces matières : ${subs.map(s=>SUBJECTS[s].name).join(', ')}.${ctx?' Contexte imposé : '+ctx:''} Le cas doit exiger un raisonnement clinique reliant les domaines.`,{json:true,max:3200,
      system:'Tu es concepteur de cas cliniques (style NGN/OIIQ). Réponds UNIQUEMENT avec un objet JSON: {"titre":"...","vignette":"présentation clinique détaillée du patient","questions":[{"question":"...","piste":"élément de réponse attendu / jugement clinique"}],"debreffage":"synthèse expliquant les liens entre les matières et le rôle infirmier"}. 3 à 5 questions. Français québécois.'});
    r.subjects=subs;currentCase=r;
    S.cases.unshift({id:uid(),date:todayISO(),subjects:subs,titre:r.titre,data:r});save('cases');bumpStreak();
    renderCaseView(r);toast('Cas généré','ok');
  }catch(e){$('#caseOut').innerHTML=aiError(e,'doCase()');}
  btn.disabled=false;btn.innerHTML=ic('clipboard')+' Créer le cas';
}
function renderCaseView(r,inModal){
  const body=`<div class="chip violet mb">${(r.subjects||[]).map(s=>SUBJECTS[s]?.name).filter(Boolean).join(' + ')}</div>
    <h3 style="margin-bottom:8px">${esc(r.titre)}</h3>
    <div class="situ">${esc(r.vignette)}</div>
    ${(r.questions||[]).map((q,i)=>`<div class="q-card"><div class="q-num">Question ${i+1}</div><div style="font-weight:600;margin:8px 0;font-size:15px">${esc(q.question)}</div>
      <details style="cursor:pointer"><summary style="color:var(--blue-d);font-weight:600;font-size:13.5px">Voir la piste de réponse</summary><div class="q-explain" style="margin-top:10px"><b>Jugement clinique attendu :</b> ${esc(q.piste)}</div></details></div>`).join('')}
    <div class="anno role"><h4>${ic('bulb','ic-sm')} Débreffage intégrateur</h4><p>${esc(r.debreffage)}</p></div>`;
  if(inModal){modal(`<div class="modal-head"><h2>Cas clinique</h2><button class="btn icon ghost" onclick="closeModal()">${ic('x')}</button></div><div class="modal-body">${body}</div>`,true);}
  else{$('#caseOut').innerHTML=`<div class="card pad">${body}</div><div class="hr"></div>${savedCases()}`;}
}
function viewCase(id){const c=S.cases.find(x=>x.id===id);renderCaseView(c.data,true);}

/* ==================================================================
   9 · MOTEUR DE QUIZ ADAPTATIF (QCM, SATA crédit partiel, ordonné)
   ================================================================== */
let currentQuiz=null,quizAns={},quizRevealed=false,quizMode='bank';

/* Banque de questions intégrée — fonctionne hors ligne, sans clé API.
   Faits de niveau manuel, contexte infirmier québécois (OIIQ). C'est le
   socle "autonome" : l'IA ne sert qu'à générer du contenu supplémentaire. */
const QUIZ_BANK={
  medecine:[
    {type:"qcm",competence:"Évaluation",question:"Quel ensemble de signes évoque une hypoglycémie ?",options:["Diaphorèse, tremblements, confusion","Polyurie, polydipsie, haleine fruitée","Bradycardie et hypertension","Peau sèche et chaude"],reponse:0,explication:"L'hypoglycémie donne des signes adrénergiques (sueurs, tremblements) et neuroglycopéniques (confusion). L'option 2 décrit plutôt une hyperglycémie / acidocétose."},
    {type:"qcm",competence:"Priorités",situation:"Patient en œdème aigu du poumon, très dyspnéique.",question:"Quelle intervention infirmière est prioritaire ?",options:["Installer en position assise (Fowler haute) et administrer l'oxygène","Coucher le patient à plat","Le faire marcher dans le corridor","Reporter l'évaluation respiratoire"],reponse:0,explication:"Priorité ABC : la position assise et l'oxygène améliorent la ventilation et diminuent le travail respiratoire."},
    {type:"sata",competence:"Pharmacovigilance",question:"Quelles surveillances sont pertinentes chez un patient sous furosémide (diurétique de l'anse) ? (Choisir toutes les bonnes réponses)",options:["Surveiller la kaliémie","Peser le patient chaque jour","Surveiller la tension artérielle","Encourager une diète riche en sodium","Surveiller les signes de déshydratation"],reponses:[0,1,2,4],explication:"Le furosémide fait perdre du potassium et du liquide : on surveille K⁺, TA, poids et déshydratation. Une diète riche en sodium serait contre-productive."},
    {type:"qcm",competence:"Oxygénothérapie",question:"Chez un patient atteint de MPOC, l'oxygénothérapie doit généralement être :",options:["Administrée à faible débit en surveillant l'état respiratoire","À haut débit systématiquement","Complètement contre-indiquée","Réservée à la nuit"],reponse:0,explication:"On vise une SpO₂ cible (souvent 88-92 %) avec un faible débit, en surveillant, pour éviter la dépression du stimulus respiratoire."},
    {type:"qcm",competence:"Pharmacovigilance",question:"Quel signe évoque une toxicité à la digoxine ?",options:["Nausées, vomissements et troubles visuels (halos)","Hyperglycémie","Constipation isolée","Éruption cutanée"],reponse:0,explication:"Les signes classiques de toxicité digitalique incluent troubles digestifs, visuels (halos jaunes-verts) et arythmies."}
  ],
  chirurgie:[
    {type:"qcm",competence:"Priorités",situation:"À la salle de réveil, immédiatement après une chirurgie.",question:"Quelle évaluation est prioritaire ?",options:["La perméabilité des voies respiratoires et la respiration","La douleur","Le pansement","La reprise de l'alimentation"],reponse:0,explication:"Priorité ABC : voies respiratoires et respiration d'abord au réveil anesthésique."},
    {type:"sata",competence:"Prévention",question:"Quelles mesures préviennent la thrombose veineuse profonde après une chirurgie ?",options:["Mobilisation précoce","Bas ou jambières de compression","Encourager l'hydratation","Repos strict au lit prolongé","Exercices de flexion des chevilles"],reponses:[0,1,2,4],explication:"On favorise la circulation (mobilisation, compression, hydratation, exercices). Le repos prolongé augmente le risque."},
    {type:"qcm",competence:"Évaluation",question:"Quel ensemble de signes évoque une hémorragie / un choc hypovolémique post-opératoire ?",options:["Tachycardie, hypotension, pâleur, agitation","Bradycardie et hypertension","Rougeur et chaleur des extrémités","Bradypnée isolée"],reponse:0,explication:"Le choc hypovolémique se manifeste par tachycardie, hypotension, pâleur et altération de l'état de conscience."},
    {type:"qcm",competence:"Intervention",question:"En cas d'éviscération d'une plaie abdominale, l'infirmière doit :",options:["Couvrir avec des compresses stériles humidifiées (NaCl) et aviser le médecin","Repousser les organes dans l'abdomen","Laisser la plaie à l'air libre","Faire boire le patient"],reponse:0,explication:"On protège les viscères avec des compresses stériles humides et on avise sans tenter de replacer les organes."},
    {type:"qcm",competence:"Soins de plaie",question:"Un drain Jackson-Pratt fonctionne par :",options:["Aspiration douce (pression négative)","Gravité uniquement","Irrigation continue","Pression positive"],reponse:0,explication:"Le Jackson-Pratt est un drain aspiratif à pression négative ; le réservoir doit rester comprimé."}
  ],
  perinatalite:[
    {type:"qcm",competence:"Évaluation",question:"Quelle est la cause la plus fréquente d'hémorragie post-partum immédiate ?",options:["L'atonie utérine","Une déchirure cervicale","La rétention placentaire","Un trouble de la coagulation"],reponse:0,explication:"L'atonie utérine (utérus mou qui ne se contracte pas) est la première cause ; le massage du fond utérin est la première intervention."},
    {type:"qcm",competence:"Priorités",situation:"En post-partum, l'utérus est mou et le saignement augmente.",question:"Quelle est la première intervention infirmière ?",options:["Masser le fond utérin","Administrer un analgésique","Installer une sonde urinaire","Attendre l'évolution"],reponse:0,explication:"Le massage du fond utérin stimule la contraction et limite le saignement ; c'est le premier geste."},
    {type:"sata",competence:"Surveillance",question:"Quels signes doivent faire suspecter une pré-éclampsie ?",options:["Hypertension","Protéinurie","Céphalées et troubles visuels","Œdème du visage et des mains","Bradycardie fœtale isolée"],reponses:[0,1,2,3],explication:"La pré-éclampsie associe HTA, protéinurie et signes de gravité (céphalées, troubles visuels, œdème). La bradycardie fœtale isolée relève d'un autre problème."},
    {type:"qcm",competence:"Allaitement",question:"Quel signe indique une bonne prise du sein lors de l'allaitement ?",options:["L'aréole est en grande partie dans la bouche, lèvres éversées","Des bruits de claquement","Des joues creusées","Une douleur intense et persistante"],reponse:0,explication:"Une bonne prise inclut une grande partie de l'aréole, des lèvres retroussées et une succion sans douleur."},
    {type:"qcm",competence:"Nouveau-né",question:"Quel signe indique une détresse respiratoire chez le nouveau-né ?",options:["Tirage, battement des ailes du nez, geignement","Acrocyanose isolée des extrémités","Hoquet","Éternuement"],reponse:0,explication:"Tirage, battement des ailes du nez et geignement expiratoire sont des signes de détresse. L'acrocyanose des extrémités est normale dans les premières heures."}
  ],
  pediatrie:[
    {type:"qcm",competence:"Évaluation",question:"Quel signe évoque une déshydratation chez le nourrisson ?",options:["Fontanelle déprimée, muqueuses sèches, couches sèches","Fontanelle bombée","Gain de poids","Salivation abondante"],reponse:0,explication:"La déshydratation donne une fontanelle déprimée et des muqueuses sèches. Une fontanelle bombée évoque plutôt une hypertension intracrânienne."},
    {type:"qcm",competence:"Neurologie",question:"Quel signe précoce évoque une hypertension intracrânienne chez le jeune enfant ?",options:["Irritabilité et fontanelle bombée","Bradycardie isolée","Prise de poids","Diarrhée"],reponse:0,explication:"Chez le nourrisson, l'irritabilité, les vomissements et la fontanelle bombée sont des signes d'HTIC ; la bradycardie est tardive."},
    {type:"qcm",competence:"Pharmacologie",question:"Le calcul des doses en pédiatrie repose principalement sur :",options:["Le poids de l'enfant (mg/kg)","L'âge seulement","La taille seulement","Le choix des parents"],reponse:0,explication:"Les doses pédiatriques se calculent selon le poids (mg/kg), avec double vérification."},
    {type:"sata",competence:"Prévention",question:"Quelles recommandations favorisent un sommeil sécuritaire du nourrisson (prévention du SMSN) ?",options:["Coucher sur le dos","Surface ferme, sans oreiller ni toutou","Éviter la surchauffe","Coucher sur le ventre pour mieux dormir","Environnement sans fumée"],reponses:[0,1,2,4],explication:"On couche le bébé sur le dos, sur une surface ferme dégagée, sans surchauffe ni fumée. Le décubitus ventral augmente le risque."},
    {type:"qcm",competence:"Sécurité",question:"Devant une suspicion d'épiglottite, l'infirmière doit ÉVITER :",options:["D'examiner la gorge avec un abaisse-langue","De garder l'enfant calme","De l'installer en position assise","D'aviser rapidement le médecin"],reponse:0,explication:"Examiner la gorge peut provoquer un spasme et une obstruction complète des voies respiratoires : à ne pas faire."}
  ],
  pharmacologie:[
    {type:"qcm",competence:"Administration",question:"Avant d'administrer la digoxine, l'infirmière doit d'abord :",options:["Prendre le pouls apical pendant 1 minute (tenir la dose si < 60/min)","Vérifier la température","Vérifier la glycémie","Mesurer la diurèse"],reponse:0,explication:"On prend le pouls apical 1 minute ; on tient généralement la dose si la FC est inférieure à 60/min chez l'adulte."},
    {type:"qcm",competence:"Anticoagulation",question:"Quel test surveille l'effet de la warfarine (Coumadin) ?",options:["L'INR","Le TCA seul","La glycémie","La créatinine"],reponse:0,explication:"La warfarine se surveille par l'INR. Le TCA (aPTT) surveille plutôt l'héparine non fractionnée."},
    {type:"qcm",competence:"Sécurité",question:"Quel est l'antidote de l'héparine ?",options:["Le sulfate de protamine","La vitamine K","La naloxone","Le flumazénil"],reponse:0,explication:"Le sulfate de protamine renverse l'héparine. La vitamine K est l'antidote de la warfarine."},
    {type:"sata",competence:"Pharmacovigilance",question:"Quels signes évoquent une toxicité aux opioïdes ?",options:["Dépression respiratoire","Myosis (pupilles en pointe)","Sédation importante","Mydriase et agitation","Diminution de l'état de conscience"],reponses:[0,1,2,4],explication:"La triade opioïde = dépression respiratoire, myosis et sédation / baisse de conscience. L'antidote est la naloxone."},
    {type:"qcm",competence:"Sécurité",question:"Lesquels font partie des « bons » de l'administration des médicaments ?",options:["Bon patient, bon médicament, bonne dose, bonne voie, bon moment","Bonne couleur, bon goût","Bon prix, bon format","Bon fabricant, bonne marque"],reponse:0,explication:"Les 5 bons (et plus) encadrent une administration sécuritaire ; on y ajoute souvent la bonne documentation et la bonne raison."}
  ],
  geriatrie:[
    {type:"qcm",competence:"Évaluation",question:"Qu'est-ce qui distingue le delirium de la démence ?",options:["Un début brutal et une fluctuation de l'état de conscience","Un début insidieux sur plusieurs années","Une mémoire toujours stable","L'absence de cause identifiable"],reponse:0,explication:"Le delirium est aigu, fluctuant et souvent réversible (chercher la cause) ; la démence est progressive et chronique."},
    {type:"sata",competence:"Prévention",question:"Quelles mesures préviennent les chutes chez la personne âgée ?",options:["Éclairage adéquat","Chaussures antidérapantes","Retirer les tapis glissants","Barres d'appui à la salle de bain","Contention physique systématique"],reponses:[0,1,2,3],explication:"On sécurise l'environnement (lumière, chaussures, tapis, barres d'appui). La contention n'est pas une mesure de prévention et comporte des risques."},
    {type:"qcm",competence:"Pharmacologie",question:"La polypharmacie chez l'aîné augmente surtout le risque de :",options:["Interactions et effets indésirables","Guérison plus rapide","Réduction des coûts","Meilleure observance"],reponse:0,explication:"Plus il y a de médicaments, plus le risque d'interactions, d'effets indésirables et d'erreurs augmente."},
    {type:"qcm",competence:"Évaluation",question:"Chez la personne âgée, une infection urinaire peut se manifester d'abord par :",options:["Une confusion ou un changement de l'état mental","Une forte fièvre systématique","Une éruption cutanée","Une toux"],reponse:0,explication:"Chez l'aîné, l'infection se présente souvent de façon atypique, par une confusion nouvelle plutôt que par de la fièvre."},
    {type:"qcm",competence:"Soins de la peau",question:"Quelle est une mesure clé de prévention des lésions de pression ?",options:["Le repositionnement régulier et les soins de la peau","Masser vigoureusement les rougeurs","Limiter les changements de position","Diminuer l'hydratation"],reponse:0,explication:"On repositionne régulièrement et on protège la peau. Masser les rougeurs est déconseillé et l'hydratation doit être maintenue."}
  ],
  psychiatrie:[
    {type:"qcm",competence:"Sécurité",question:"Face à un client qui exprime des idées suicidaires, la priorité de l'infirmière est de :",options:["Évaluer le risque et assurer la sécurité (plan, moyens, environnement)","Changer de sujet","Le laisser seul pour qu'il se calme","Minimiser ses propos"],reponse:0,explication:"La sécurité est prioritaire : évaluer le risque (plan, moyens, intention) et sécuriser l'environnement, sans laisser la personne seule."},
    {type:"qcm",competence:"Pharmacovigilance",question:"Quels signes évoquent un syndrome sérotoninergique ?",options:["Agitation, hyperthermie, myoclonies, diaphorèse","Bradycardie et hypothermie","Constipation isolée","Somnolence seule"],reponse:0,explication:"Le syndrome sérotoninergique associe agitation, hyperthermie, hyperréflexie/myoclonies et instabilité autonome."},
    {type:"sata",competence:"Pharmacovigilance",question:"Quels sont des effets extrapyramidaux des antipsychotiques ?",options:["Dystonie aiguë","Akathisie","Parkinsonisme (rigidité, tremblements)","Hyperglycémie isolée","Dyskinésie tardive"],reponses:[0,1,2,4],explication:"Les effets extrapyramidaux incluent dystonie, akathisie, parkinsonisme et dyskinésie tardive. L'hyperglycémie est un effet métabolique distinct."},
    {type:"qcm",competence:"Évaluation",question:"Quelle complication grave peut survenir lors d'un sevrage alcoolique ?",options:["Le delirium tremens (confusion, hallucinations, convulsions)","Une hypersomnie bénigne","Une hypertension légère isolée","De la constipation"],reponse:0,explication:"Le delirium tremens est une urgence : agitation, hallucinations, instabilité autonome, risque de convulsions."},
    {type:"qcm",competence:"Communication",question:"Quelle intervention favorise une communication thérapeutique ?",options:["L'écoute active et le reflet des émotions","Donner rapidement des conseils","Rassurer faussement","Poser surtout des questions fermées"],reponse:0,explication:"L'écoute active, le reflet et les questions ouvertes favorisent l'alliance thérapeutique ; les fausses réassurances la nuisent."}
  ]
};

function renderQuiz(){
  const stats=S.profile.quiz;const done=Object.values(stats).reduce((a,q)=>a+q.t,0);
  $('#main').innerHTML=topbar('Examens & quiz','Banque intégrée hors ligne + génération IA optionnelle')+`
  <div class="view">
    <div class="seg mb"><button class="${quizMode==='bank'?'on':''}" onclick="quizMode='bank';renderQuiz()">${ic('quiz','ic-sm')} Banque hors ligne</button><button class="${quizMode==='ai'?'on':''}" onclick="quizMode='ai';renderQuiz()">${ic('spark','ic-sm')} Créer avec l'IA</button></div>
    ${quizMode==='bank'?quizBankPanel():quizAiPanel()}
    ${done?quizPerfPanel(stats):''}
    <div id="quizOut">${emptyBox('quiz','Prêt à te tester ?',quizMode==='bank'?'Choisis une matière et commence — aucune connexion ni clé requise.':'Décris un sujet précis et l\'IA génère un quiz sur mesure.')}</div>
  </div>`;
}
function quizBankPanel(){
  return `<div class="card pad mb"><div class="row wrap" style="gap:12px;align-items:flex-end">
    <label class="field" style="min-width:190px;margin:0"><span>Matière</span><select class="sel" id="bkSubj">${CORE_SUBJECTS.filter(id=>QUIZ_BANK[id]&&QUIZ_BANK[id].length).map(id=>`<option value="${id}">${SUBJECTS[id].name} (${QUIZ_BANK[id].length} questions)</option>`).join('')}</select></label>
    <label class="field" style="min-width:120px;margin:0"><span>Nombre</span><select class="sel" id="bkN"><option>5</option><option>8</option><option>10</option></select></label>
    <button class="btn primary" onclick="startBank()">${ic('play')} Commencer</button></div>
    <div class="chip green mt">${ic('check','ic-sm')} Banque révisée intégrée — fonctionne entièrement hors ligne</div></div>`;
}
function quizAiPanel(){
  return `${aiHint()}<div class="card pad mb"><div class="row wrap" style="gap:12px;align-items:flex-end">
      <label class="field" style="flex:2;min-width:200px;margin:0"><span>Sujet à évaluer</span><input class="inp" id="qTopic" placeholder="Ex. Soins post-op abdominaux, choc septique, allaitement…"></label>
      <label class="field" style="min-width:150px;margin:0"><span>Matière</span><select class="sel" id="qSubj">${CORE_SUBJECTS.map(id=>`<option value="${id}">${SUBJECTS[id].name}</option>`).join('')}</select></label></div>
      <div class="row wrap mt" style="gap:12px;align-items:flex-end">
        <label class="field" style="min-width:130px;margin:0"><span>Difficulté</span><select class="sel" id="qDiff"><option value="intermédiaire">Intermédiaire</option><option value="avancée">Avancée</option><option value="très complexe (type OIIQ / NGN)" selected>Très complexe (OIIQ)</option></select></label>
        <label class="field" style="min-width:110px;margin:0"><span>Questions</span><select class="sel" id="qN"><option>5</option><option selected>8</option><option>10</option></select></label>
        <label class="field" style="flex:1;min-width:160px;margin:0"><span>Formats</span><select class="sel" id="qFmt"><option value="un mélange de QCM, de SATA (réponses multiples) et de questions ordonnées">Mixte (QCM + SATA + ordonné)</option><option value="des QCM à réponse unique">QCM seulement</option><option value="des SATA (réponses multiples)">SATA seulement</option></select></label>
        <button class="btn pink" id="qGo" onclick="doQuiz()">${ic('spark')} Créer le quiz</button></div>
    </div>`;
}
function quizPerfPanel(stats){
  return `<div class="card pad mb"><div class="row between mb"><div class="sec-title" style="margin:0">${ic('chart','ic-sm')} Ta performance</div><button class="btn sm ghost" onclick="studyPlan()">${ic('target')} Plan d'étude</button></div>
    <div class="grid g-3">${CORE_SUBJECTS.filter(id=>stats[id]&&stats[id].t).map(id=>{const m=quizMastery(id);const s=SUBJECTS[id];return `<div><div class="row between" style="margin-bottom:5px"><span class="row" style="gap:7px;color:${s.hex}">${subjIcon(id,'ic-sm')}<b style="font-size:13px;color:var(--ink)">${s.name}</b></span><span class="muted" style="font-size:12px;font-weight:700;color:${m>=70?'var(--green-d)':m>=50?'var(--yellow-d)':'var(--pink-d)'}">${m}%</span></div><div class="progress"><i style="width:${m}%;background:${m>=70?'var(--green)':m>=50?'var(--yellow)':'var(--pink)'}"></i></div></div>`;}).join('')}</div></div>`;
}
function startBank(){
  const subj=$('#bkSubj').value;let pool=(QUIZ_BANK[subj]||[]).slice();if(!pool.length)return toast('Aucune question pour cette matière','err');
  pool.sort(()=>Math.random()-.5);const n=Math.min(parseInt($('#bkN').value)||5,pool.length);
  const qs=pool.slice(0,n).map(q=>Object.assign({},q));
  currentQuiz={titre:'Quiz — '+SUBJECTS[subj].name,subject:subj,questions:qs};quizAns={};quizRevealed=false;renderQuizRun();
}
async function doQuiz(){
  const topic=$('#qTopic').value.trim();if(!topic)return toast('Indique un sujet','err');
  const subj=$('#qSubj').value,diff=$('#qDiff').value,n=$('#qN').value,fmt=$('#qFmt').value;
  const btn=$('#qGo');btn.disabled=true;btn.innerHTML='<span class="spin"></span> Création…';
  $('#quizOut').innerHTML=`<div class="ai-loading"><div class="spin dark"></div><div class="pulse">Friday rédige ton quiz ${esc(diff)} sur « ${esc(topic)} »…</div></div>`;
  try{
    const r=await askClaude(`Crée un quiz de difficulté ${diff} pour un étudiant en soins infirmiers (${SUBJECTS[subj].name}) sur : ${topic}. Utilise ${fmt}. ${n} questions au total. Les cas doivent tester le jugement clinique, les priorités et les surveillances.`,{json:true,max:4000,
      system:'Tu es concepteur d\'examens OIIQ/NGN. Réponds UNIQUEMENT avec un objet JSON: {"titre":"...","questions":[{"type":"qcm|sata|ordre","situation":"contexte clinique (optionnel)","question":"...","options":["..."],"reponse":0,"reponses":[0,2],"ordre":["étape1","étape2","étape3"],"explication":"justification détaillée","competence":"compétence évaluée"}]}. Pour qcm: options+reponse(index). Pour sata: options+reponses(indices, 2 à 4 bonnes). Pour ordre: "ordre"=liste des étapes DANS LE BON ORDRE (ignore options/reponse). Français québécois, terminologie OIIQ.'});
    (r.questions||[]).forEach(q=>{ if(q.type==='ordre'&&q.ordre){ q._shuffled=q.ordre.map((t,i)=>({t,i})).sort(()=>Math.random()-.5); } });
    currentQuiz=r;currentQuiz.subject=subj;quizAns={};quizRevealed=false;renderQuizRun();
  }catch(e){$('#quizOut').innerHTML=aiError(e,'doQuiz()');}
  btn.disabled=false;btn.innerHTML=ic('spark')+' Créer le quiz';
}
function renderQuizRun(){
  const q=currentQuiz.questions||[];
  $('#quizOut').innerHTML=`<div class="row between mb"><h3>${esc(currentQuiz.titre||'Quiz de pratique')}</h3><span class="chip blue">${q.length} questions</span></div>
    ${q.map((qq,i)=>quizQ(qq,i)).join('')}
    <div class="center mt">${quizRevealed?`<div class="chip green" style="font-size:15px;padding:11px 20px">Score : ${Math.round(quizScore()/q.length*100)}% (${quizScore().toFixed(1)} / ${q.length})</div><br><br>`:''}
      <button class="btn ${quizRevealed?'':'primary'}" onclick="${quizRevealed?'renderQuiz()':'revealQuiz()'}">${quizRevealed?'Nouveau quiz':'Corriger le quiz'}</button></div>`;
}
function quizQ(qq,i){
  const head=`<div class="q-card"><div class="row between"><span class="q-num">Question ${i+1}${qq.competence?' · '+esc(qq.competence):''}</span>${qq.type==='sata'?'<span class="chip teal">SATA — plusieurs réponses</span>':qq.type==='ordre'?'<span class="chip violet">Mettre en ordre</span>':''}</div>
    ${qq.situation?`<div class="situ">${esc(qq.situation)}</div>`:''}<div style="font-weight:600;margin:10px 0;font-size:15px">${esc(qq.question)}</div>`;
  if(qq.type==='ordre'){
    const arr=qq._shuffled||[];
    return head+arr.map((it,pos)=>`<div class="ord-item"><span class="num">${pos+1}</span><span style="flex:1">${esc(it.t)}${quizRevealed?` <b style="color:${it.i===pos?'var(--green-d)':'var(--pink-d)'}">(rang correct : ${it.i+1})</b>`:''}</span>${quizRevealed?'':`<span class="ord-btns"><button class="btn icon sm" onclick="ordMove(${i},${pos},-1)" ${pos===0?'disabled':''}>${ic('up','ic-sm')}</button><button class="btn icon sm" onclick="ordMove(${i},${pos},1)" ${pos===arr.length-1?'disabled':''}>${ic('down','ic-sm')}</button></span>`}</div>`).join('')
      +(quizRevealed?`<div class="q-explain"><b>Explication :</b> ${esc(qq.explication)}</div>`:'')+`</div>`;
  }
  const sel=quizAns[i];
  const opts=(qq.options||[]).map((o,oi)=>{
    let cls='';
    if(qq.type==='sata'){
      const chosen=Array.isArray(sel)&&sel.includes(oi);const correct=(qq.reponses||[]).includes(oi);
      if(quizRevealed){cls=correct?'correct':(chosen?'wrong':'');if(correct&&!chosen)cls='miss';}else if(chosen)cls='sel';
      cls='sata '+cls;
    }else{
      if(quizRevealed){if(oi===qq.reponse)cls='correct';else if(sel===oi)cls='wrong';}else if(sel===oi)cls='sel';
    }
    return `<div class="q-opt ${cls}" onclick="${quizRevealed?'':(qq.type==='sata'?`toggleSata(${i},${oi})`:`pickQcm(${i},${oi})`)}"><span class="key">${'ABCDE'[oi]||'?'}</span><span>${esc(o)}</span></div>`;
  }).join('');
  return head+opts+(quizRevealed?`<div class="q-explain"><b>Explication :</b> ${esc(qq.explication)}</div>`:'')+`</div>`;
}
function pickQcm(i,oi){quizAns[i]=oi;renderQuizRun();}
function toggleSata(i,oi){const a=Array.isArray(quizAns[i])?quizAns[i]:[];const idx=a.indexOf(oi);if(idx>=0)a.splice(idx,1);else a.push(oi);quizAns[i]=a;renderQuizRun();}
function ordMove(i,pos,dir){const arr=currentQuiz.questions[i]._shuffled;const j=pos+dir;if(j<0||j>=arr.length)return;[arr[pos],arr[j]]=[arr[j],arr[pos]];renderQuizRun();}
function quizScore(){return (currentQuiz.questions||[]).reduce((tot,q,i)=>{
  if(q.type==='qcm')return tot+(quizAns[i]===q.reponse?1:0);
  if(q.type==='sata'){const chosen=Array.isArray(quizAns[i])?quizAns[i]:[];const correct=q.reponses||[];const good=chosen.filter(x=>correct.includes(x)).length;const bad=chosen.filter(x=>!correct.includes(x)).length;return tot+Math.max(0,(good-bad)/(correct.length||1));}
  if(q.type==='ordre'){const arr=q._shuffled||[];const ok=arr.filter((it,pos)=>it.i===pos).length;return tot+ok/(arr.length||1);}
  return tot;},0);}
function revealQuiz(){quizRevealed=true;const q=currentQuiz.questions||[];const sc=quizScore();
  const subj=currentQuiz.subject;const cur=S.profile.quiz[subj]||{c:0,t:0};cur.c+=sc;cur.t+=q.length;S.profile.quiz[subj]=cur;save('profile');
  bumpStreak();renderQuizRun();friday.say(sc/q.length>=0.7?'celebrate':'encourage');}
function studyPlan(){
  const ranked=CORE_SUBJECTS.map(id=>({id,m:quizMastery(id)})).filter(x=>x.m!=null).sort((a,b)=>a.m-b.m);
  modal(`<div class="modal-head"><h2>${ic('target')} Plan d'étude personnalisé</h2><button class="btn icon ghost" onclick="closeModal()">${ic('x')}</button></div>
  <div class="modal-body">${ranked.length?`<p class="muted" style="font-size:13.5px;margin-bottom:14px">Basé sur tes résultats de quiz — commence par le haut de la liste.</p>${ranked.map((r,idx)=>{const s=SUBJECTS[r.id];const lvl=r.m>=70?'Consolidation':r.m>=50?'À renforcer':'Priorité haute';return `<div class="li"><span style="font-family:var(--f-disp);font-weight:800;color:var(--ink-4);width:22px">${idx+1}</span><div style="width:32px;height:32px;border-radius:9px;background:${s.hex}16;color:${s.hex};display:grid;place-items:center;flex:none">${subjIcon(r.id)}</div><div style="flex:1"><div class="li-title" style="font-size:14px">${s.name} — ${r.m}%</div><div class="li-meta">${lvl}</div></div><button class="btn sm" onclick="closeModal();go('quiz');setTimeout(()=>{var e=document.getElementById('qSubj');if(e)e.value='${r.id}'},160)">S'exercer</button></div>`;}).join('')}`:`<p>Fais quelques quiz pour générer ton plan d'étude.</p>`}</div>`);
}

/* ==================================================================
   10 · PRÉPARATION AUX STAGES
   ================================================================== */
let stageTab='prep';
function renderStage(){
  const done=S.stage.skills.filter(s=>s.done).length;
  $('#main').innerHTML=topbar('Préparation aux stages','Gestes techniques, raisonnement clinique et suivi des heures')+`
  <div class="view">
    <div class="grid g-3 mb">${statCard('t','steth',S.profile.stageHours||0,'Heures cumulées')}${statCard('g','check',`${done}/${S.stage.skills.length}`,'Gestes pratiqués')}${statCard('v','clipboard',S.stage.journal.length,'Entrées de raisonnement')}</div>
    <div class="tabs mb">${[['prep','Fiches par service'],['skills','Gestes techniques'],['journal','Raisonnement clinique'],['hours','Heures']].map(([k,l])=>`<button class="${stageTab===k?'on':''}" onclick="stageTab='${k}';renderStage()">${l}</button>`).join('')}</div>
    <div id="stageBody"></div>
  </div>`;
  renderStageBody();
}
function renderStageBody(){
  const b=$('#stageBody');
  if(stageTab==='skills'){
    b.innerHTML=`<div class="card pad"><div class="row between mb"><div class="sec-title" style="margin:0">${ic('check','ic-sm')} Checklist des gestes techniques</div><button class="btn sm" onclick="addSkill()">${ic('plus')} Geste</button></div>
      ${S.stage.skills.map(s=>`<div class="li"><div class="check ${s.done?'on':''}" onclick="toggleSkill('${s.id}')">${ic('check')}</div><div style="flex:1"><div class="li-title ${s.done?'done':''}" style="font-size:14px">${esc(s.label)}</div>${s.done&&s.date?`<div class="li-meta">Pratiqué le ${fmtDate(s.date)}</div>`:''}</div><button class="btn icon ghost" onclick="delSkill('${s.id}')">${ic('trash')}</button></div>`).join('')}</div>`;
  }else if(stageTab==='journal'){
    b.innerHTML=`<div class="card pad"><div class="row between mb"><div class="sec-title" style="margin:0">${ic('clipboard','ic-sm')} Carnet de raisonnement clinique</div><button class="btn sm primary" onclick="journalModal()">${ic('plus')} Entrée</button></div>
      <p class="muted" style="font-size:13px;margin-bottom:12px">Le « pourquoi » derrière chaque soin, pas seulement le « comment ».</p>
      ${S.stage.journal.length?S.stage.journal.map(j=>`<div class="q-card"><div class="row between"><b style="font-size:14px">${esc(j.service||'Stage')} · ${fmtDate(j.date)}</b><button class="btn icon ghost sm" onclick="S.stage.journal=S.stage.journal.filter(x=>x.id!=='${j.id}');save('stage');renderStage()">${ic('trash')}</button></div>
        <div style="margin-top:8px;font-size:13.5px"><b>Situation :</b> ${esc(j.situation)}</div><div class="q-explain" style="margin-top:8px"><b>Raisonnement :</b> ${esc(j.reasoning)}</div></div>`).join(''):emptyBox('clipboard','Aucune entrée','Note un soin observé ou posé et le raisonnement clinique derrière.')}</div>`;
  }else if(stageTab==='hours'){
    b.innerHTML=`<div class="card pad" style="max-width:420px"><div class="sec-title">${ic('clock','ic-sm')} Heures de stage</div>
      <div class="calc-result">${S.profile.stageHours||0} h<small>cumulées</small></div>
      <div class="row mt" style="gap:8px"><input class="inp" type="number" id="hAdd" placeholder="Ajouter des heures (ex. 8)" step="any" min="0"><button class="btn primary" onclick="addHours()">${ic('plus')} Ajouter</button></div>
      <button class="btn ghost sm mt" style="color:var(--pink-d)" onclick="if(confirm('Remettre le compteur à zéro ?')){S.profile.stageHours=0;save('profile');renderStage()}">Réinitialiser</button></div>`;
  }else{
    const services=['Médecine','Chirurgie','Urgence','Périnatalité','Pédiatrie','Santé mentale','Gériatrie','Soins intensifs'];
    b.innerHTML=`<div class="card pad mb"><div class="row wrap" style="gap:10px;align-items:flex-end">
      <label class="field" style="flex:1;min-width:200px;margin:0"><span>Service / unité de stage</span><select class="sel" id="svcPick">${services.map(s=>`<option>${s}</option>`).join('')}</select></label>
      <button class="btn primary" id="svcGo" onclick="doServiceSheet()">${ic('spark')} Générer la fiche de préparation</button></div></div>
      <div id="svcOut">${S.stage.sheets.length?S.stage.sheets.map(sheetHTML).join(''):emptyBox('steth','Aucune fiche de service','Génère une fiche : clientèle, pathologies fréquentes, médicaments, priorités de surveillance et gestes.')}</div>`;
  }
}
function addSkill(){const l=prompt('Nom du geste technique :');if(l&&l.trim()){S.stage.skills.push({id:uid(),label:l.trim(),done:false,date:null});save('stage');renderStage();}}
function toggleSkill(id){const s=S.stage.skills.find(x=>x.id===id);s.done=!s.done;s.date=s.done?todayISO():null;if(s.done)bumpStreak();save('stage');renderStageBody();}
function delSkill(id){S.stage.skills=S.stage.skills.filter(x=>x.id!==id);save('stage');renderStage();}
function addHours(){const h=parseFloat($('#hAdd').value);if(!h||h<=0)return toast('Entre un nombre d\'heures valide','err');S.profile.stageHours=(S.profile.stageHours||0)+h;save('profile');bumpStreak();renderStage();toast(h+' h ajoutées','ok');}
function journalModal(){modal(`<div class="modal-head"><h2>Nouvelle entrée de raisonnement</h2><button class="btn icon ghost" onclick="closeModal()">${ic('x')}</button></div>
  <div class="modal-body"><div class="row" style="gap:12px"><label class="field" style="flex:1"><span>Service</span><input class="inp" id="jSvc" placeholder="Ex. Médecine"></label><label class="field" style="flex:1"><span>Date</span><input class="inp" type="date" id="jDate" value="${todayISO()}"></label></div>
    <label class="field"><span>Situation clinique</span><textarea class="ta" id="jSitu" placeholder="Ex. Patient de 72 ans, dyspnée, SpO₂ 88 %…"></textarea></label>
    <label class="field"><span>Raisonnement (le « pourquoi »)</span><textarea class="ta" id="jReason" placeholder="Pourquoi cette intervention ? Quel jugement clinique ?"></textarea></label></div>
  <div class="modal-foot"><button class="btn ghost" onclick="closeModal()">Annuler</button><button class="btn primary" onclick="saveJournal()">Enregistrer</button></div>`);}
function saveJournal(){const situ=$('#jSitu').value.trim(),reason=$('#jReason').value.trim();if(!situ||!reason)return toast('Remplis la situation et le raisonnement','err');
  S.stage.journal.unshift({id:uid(),service:$('#jSvc').value.trim(),date:$('#jDate').value,situation:situ,reasoning:reason});save('stage');bumpStreak();closeModal();renderStage();toast('Entrée ajoutée','ok');}
async function doServiceSheet(){
  const svc=$('#svcPick').value;const btn=$('#svcGo');btn.disabled=true;btn.innerHTML='<span class="spin"></span> Génération…';
  $('#svcOut').innerHTML=`<div class="ai-loading"><div class="spin dark"></div><div class="pulse">Friday prépare ta fiche pour le service de ${esc(svc)}…</div></div>`;
  try{
    const r=await askClaude(`Prépare une fiche de préparation de stage pour un étudiant infirmier affecté au service : ${svc} (contexte québécois).`,{json:true,max:2200,
      system:'Tu es une préceptrice de stage. Réponds UNIQUEMENT avec un objet JSON: {"clientele":"...","pathologies":["..."],"medicaments":["..."],"surveillances":["priorités de surveillance"],"gestes":["gestes fréquents"],"conseil":"un conseil clé pour réussir"}. Français québécois.'});
    r.service=svc;S.stage.sheets.unshift({id:uid(),...r});save('stage');bumpStreak();renderStageBody();toast('Fiche générée','ok');
  }catch(e){$('#svcOut').innerHTML=aiError(e,'doServiceSheet()');}
  btn.disabled=false;btn.innerHTML=ic('spark')+' Générer la fiche de préparation';
}
function sheetHTML(s){const list=(t,arr,icn)=>arr&&arr.length?`<div style="margin-top:10px"><div class="row" style="gap:6px;color:var(--ink-2);font-weight:700;font-size:12px;text-transform:uppercase;letter-spacing:.04em;margin-bottom:4px">${ic(icn,'ic-sm')} ${t}</div><ul class="bul" style="font-size:13.5px">${arr.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>`:'';
  return `<div class="card pad mb"><div class="row between"><h3 class="row" style="gap:8px">${ic('steth')} ${esc(s.service)}</h3><button class="btn icon ghost sm" onclick="S.stage.sheets=S.stage.sheets.filter(x=>x.id!=='${s.id}');save('stage');renderStage()">${ic('trash')}</button></div>
    <div class="anno" style="margin-top:10px"><p><b>Clientèle :</b> ${esc(s.clientele)}</p></div>
    ${list('Pathologies fréquentes',s.pathologies,'heart')}${list('Médicaments courants',s.medicaments,'pill')}${list('Priorités de surveillance',s.surveillances,'alert')}${list('Gestes fréquents',s.gestes,'syringe')}
    ${s.conseil?`<div class="anno role" style="margin-top:10px"><h4>${ic('bulb','ic-sm')} Conseil</h4><p>${esc(s.conseil)}</p></div>`:''}</div>`;}

/* ==================================================================
   11 · OUTILS CLINIQUES (doses, SBAR, références)
   ================================================================== */
let toolsTab='doses',calcTab='poids';
function renderTools(){
  $('#main').innerHTML=topbar('Outils cliniques','Calcul de doses, transmission SBAR et valeurs de référence')+`
  <div class="view">
    <div class="tabs mb">${[['doses','Calcul de doses'],['sbar','Transmission SBAR'],['ref','Références & valeurs']].map(([k,l])=>`<button class="${toolsTab===k?'on':''}" onclick="toolsTab='${k}';renderTools()">${l}</button>`).join('')}</div>
    <div id="toolsBody"></div>
  </div>`;
  renderToolsBody();
}
function renderToolsBody(){
  const b=$('#toolsBody');
  if(toolsTab==='doses'){
    b.innerHTML=`<div class="tabs mb">${[['poids','Dose selon le poids'],['perf','Débit de perfusion'],['regle','Règle de trois'],['gtt','Gouttes / min']].map(([k,l])=>`<button class="${calcTab===k?'on':''}" onclick="calcTab='${k}';renderToolsBody()">${l}</button>`).join('')}</div>
      <div class="grid g-2"><div class="card pad" id="calcBody"></div>
        <div class="card pad" style="background:var(--yellow-t);border-color:#F6E4BB"><div class="sec-title" style="color:var(--yellow-d)">${ic('alert','ic-sm')} Rappel de sécurité</div>
          <p style="font-size:13.5px;line-height:1.6;color:var(--ink-2)">Ces calculs soutiennent l'apprentissage. <b>Vérifie toujours</b> avec la double vérification, les 5 bons et le jugement clinique. Ne jamais administrer sur la seule base d'un calcul automatisé.</p></div></div>`;
    renderCalcBody();
  }else if(toolsTab==='sbar'){
    b.innerHTML=`<div class="grid g-2"><div class="card pad"><div class="sec-title">${ic('clipboard','ic-sm')} Construire une transmission SBAR</div>
      ${['S — Situation','B — Contexte (Background)','A — Évaluation (Assessment)','R — Recommandation'].map((l,i)=>`<label class="field"><span>${l}</span><textarea class="ta" id="sbar${i}" style="min-height:64px" oninput="buildSbar()" placeholder="${['Qui, où, quoi maintenant…','Antécédents, raison d\'admission…','Signes vitaux, ce que tu observes, ton impression…','Ce que tu demandes / proposes…'][i]}"></textarea></label>`).join('')}</div>
      <div class="card pad"><div class="row between mb"><div class="sec-title" style="margin:0">${ic('fileText','ic-sm')} Aperçu</div><button class="btn sm" onclick="copySbar()">${ic('copy')} Copier</button></div>
        <div id="sbarOut" style="font-size:13.5px;line-height:1.7;white-space:pre-wrap;color:var(--ink-2)">Remplis les champs pour générer ta transmission structurée.</div></div></div>`;
  }else{
    b.innerHTML=`<div class="grid g-2">
      <div class="card pad"><div class="sec-title">${ic('heart','ic-sm')} Signes vitaux normaux par âge</div>
        <table class="ref-tbl"><tr><th>Groupe</th><th>FC (bpm)</th><th>FR</th><th>TA syst.</th></tr>
        ${[['Nouveau-né','100-160','30-60','60-90'],['Nourrisson','90-150','25-40','70-100'],['Bambin','80-140','20-30','80-110'],['Enfant','70-120','18-25','90-110'],['Adolescent','60-100','12-20','100-120'],['Adulte','60-100','12-20','90-120'],['Aîné','60-100','12-20','90-130']].map(r=>`<tr><td>${r[0]}</td><td class="mono">${r[1]}</td><td class="mono">${r[2]}</td><td class="mono">${r[3]}</td></tr>`).join('')}</table>
        <div class="chip green mt">SpO₂ : 95-100 % · Temp. : 36,1-37,8 °C</div></div>
      <div class="card pad"><div class="sec-title">${ic('pill','ic-sm')} Valeurs de laboratoire courantes</div>
        <table class="ref-tbl"><tr><th>Analyse</th><th>Valeur normale</th></tr>
        ${[['Na⁺','135-145 mmol/L'],['K⁺','3,5-5,0 mmol/L'],['Glycémie (à jeun)','4,0-6,0 mmol/L'],['Créatinine','60-110 µmol/L'],['Hémoglobine','120-160 g/L'],['Leucocytes','4,0-11,0 ×10⁹/L'],['INR (sans anticoag.)','0,8-1,2']].map(r=>`<tr><td>${r[0]}</td><td class="mono">${r[1]}</td></tr>`).join('')}</table></div>
      <div class="card pad"><div class="sec-title">${ic('bulb','ic-sm')} Aide-mémoire (mnémoniques)</div>
        <p style="font-size:13.5px;line-height:1.7"><b>PQRSTU</b> (douleur) : Provoquer/Pallier · Qualité · Région/iRradiation · Sévérité · Temps · Signification (Understanding).<br><b>AMPLE</b> : Allergies · Médicaments · Passé médical · Last meal · Événements.<br><b>SAMPLE</b> : Symptômes · Allergies · Médication · Passé · Last meal · Événement.</p></div>
      <div class="card pad"><div class="sec-title">${ic('fileText','ic-sm')} Abréviations fréquentes</div>
        <table class="ref-tbl">${[['PRN','au besoin'],['BID / TID / QID','2× / 3× / 4× par jour'],['PO / IV / SC / IM','voies d\'administration'],['NPO','à jeun (rien par la bouche)'],['SV','signes vitaux'],['PTI','plan thérapeutique infirmier'],['DRS','douleur rétrosternale']].map(r=>`<tr><td class="mono">${r[0]}</td><td>${r[1]}</td></tr>`).join('')}</table></div>
    </div>`;
  }
}
function renderCalcBody(){
  const b=$('#calcBody');const inp=(id,lbl,ph,unit)=>`<label class="field"><span>${lbl}</span><div style="position:relative"><input class="inp" id="${id}" type="number" step="any" min="0" placeholder="${ph}" oninput="calcRun()" style="font-family:var(--f-mono)">${unit?`<span style="position:absolute;right:13px;top:11px;color:var(--ink-3);font-size:13px;font-weight:600">${unit}</span>`:''}</div></label>`;
  const t={poids:['Dose selon le poids (mg/kg)',inp('c1','Poids du patient','70','kg')+inp('c2','Dose prescrite','5','mg/kg')],
    perf:['Débit de perfusion (mL/h)',inp('c1','Volume total','1000','mL')+inp('c2','Durée','8','h')],
    regle:['Règle de trois',inp('c1','Dose désirée','250','mg')+inp('c2','Dose disponible','500','mg')+inp('c3','Volume disponible','5','mL')],
    gtt:['Gouttes par minute',inp('c1','Volume','1000','mL')+inp('c2','Durée','480','min')+inp('c3','Facteur','20','gtt/mL')]}[calcTab];
  b.innerHTML=`<div class="sec-title">${ic('calc','ic-sm')} ${t[0]}</div>${t[1]}<div class="calc-result" id="calcRes">—</div>`;
}
function calcRun(){
  const raw=id=>{const e=$('#'+id);return e?e.value:'';};const v=id=>parseFloat(raw(id));const res=$('#calcRes');if(!res)return;
  const provided=['c1','c2','c3'].map(raw).filter(x=>x!=='');
  if(provided.some(x=>parseFloat(x)<0)){res.className='calc-result err';res.textContent='Les valeurs doivent être positives.';return;}
  let out=null,unit='',lbl='';
  if(calcTab==='poids'){if(v('c1')>0&&v('c2')>0){out=v('c1')*v('c2');unit='mg';lbl='dose totale à administrer';}}
  else if(calcTab==='perf'){if(raw('c2')!==''&&v('c2')===0){res.className='calc-result err';res.textContent='La durée ne peut pas être 0.';return;}if(v('c1')>0&&v('c2')>0){out=v('c1')/v('c2');unit='mL/h';lbl='débit de perfusion';}}
  else if(calcTab==='regle'){if(raw('c2')!==''&&v('c2')===0){res.className='calc-result err';res.textContent='La dose disponible ne peut pas être 0.';return;}if(v('c1')>0&&v('c2')>0&&v('c3')>0){out=v('c1')/v('c2')*v('c3');unit='mL';lbl='volume à prélever';}}
  else if(calcTab==='gtt'){if(raw('c2')!==''&&v('c2')===0){res.className='calc-result err';res.textContent='La durée ne peut pas être 0.';return;}if(v('c1')>0&&v('c2')>0&&v('c3')>0){out=Math.round((v('c1')*v('c3'))/v('c2'));unit='gtt/min';lbl='débit en gouttes';}}
  res.className='calc-result';
  if(out==null||isNaN(out)){res.textContent='—';}
  else{const disp=calcTab==='gtt'?out:(Math.round(out*100)/100).toLocaleString('fr-CA');res.innerHTML=`${disp} ${unit}<small>${lbl}</small>`;}
}
function buildSbar(){const g=i=>{const e=$('#sbar'+i);return e?e.value.trim():'';};const parts=[['SITUATION',g(0)],['CONTEXTE',g(1)],['ÉVALUATION',g(2)],['RECOMMANDATION',g(3)]].filter(p=>p[1]);
  $('#sbarOut').textContent=parts.length?parts.map(p=>p[0]+' : '+p[1]).join('\n\n'):'Remplis les champs pour générer ta transmission structurée.';}
function copySbar(){const txt=$('#sbarOut').textContent;if(!txt||txt.startsWith('Remplis'))return toast('Rien à copier','err');copyText(txt);}

/* ==================================================================
   6bis · ANATOMIE 3D (Three.js) — pathologies interactives
   ================================================================== */
const PATHO3D={
  coeur:{label:'Insuffisance cardiaque',build:'heart',physio:'Le myocarde affaibli n\'éjecte plus assez de sang. Les cavités se dilatent, la fraction d\'éjection chute, et le sang reflue (congestion pulmonaire ou périphérique).',role:'Surveiller dyspnée, œdème, gain de poids quotidien, saturation. Positionner en Fowler, restreindre le sodium, administrer les diurétiques et surveiller le K⁺.'},
  poumons:{label:'MPOC / BPCO',build:'lungs',physio:'L\'obstruction chronique et la perte d\'élasticité provoquent une rétention d\'air (hyperinflation). L\'expiration devient laborieuse et les échanges gazeux diminuent.',role:'Surveiller SpO₂ et effort respiratoire, oxygène à faible débit prudent, positionner en trépied, enseigner la respiration à lèvres pincées et l\'usage des inhalateurs.'},
  vaisseau:{label:'AVC ischémique',build:'vessel',physio:'Un caillot obstrue une artère cérébrale. En aval, le tissu privé d\'oxygène commence à mourir : « time is brain ».',role:'Reconnaître les signes VITE, noter l\'heure d\'apparition, surveiller l\'état neurologique et la glycémie, préparer l\'imagerie et la thrombolyse si admissible.'}
};
let anatomyKey='coeur',anatomyPatho=true;
function renderAnatomy(){
  const p=PATHO3D[anatomyKey];
  $('#main').innerHTML=topbar('Anatomie & pathologie 3D','Manipule le modèle pour comprendre le mécanisme et le rôle infirmier')+`
  <div class="view">
    <div class="row wrap between mb" style="gap:10px">
      <div class="tabs">${Object.entries(PATHO3D).map(([k,v])=>`<button class="${anatomyKey===k?'on':''}" onclick="anatomyKey='${k}';renderAnatomy()">${v.label}</button>`).join('')}</div>
      <div class="seg"><button class="${!anatomyPatho?'on':''}" onclick="anatomyPatho=false;ANATOMY.setState(false);renderAnatomyAnno()">Sain</button><button class="${anatomyPatho?'on':''}" onclick="anatomyPatho=true;ANATOMY.setState(true);renderAnatomyAnno()">Pathologique</button></div>
    </div>
    <div class="grid g-2">
      <div class="viewer3d" id="viewer3d">
        <div class="v3d-badge">${ic('cube','ic-sm')} ${p.label}</div>
        <div class="v3d-part" id="v3dPart"></div>
        <div class="v3d-hint">${ic('refresh','ic-sm')} glisse pour tourner · molette pour zoomer · touche une structure</div>
        <div class="v3d-loading" id="v3dLoading"><span class="spin" style="border-color:rgba(255,255,255,.25);border-top-color:#fff"></span> Chargement du modèle…</div>
      </div>
      <div id="anatomyAnno"></div>
    </div>
  </div>`;
  renderAnatomyAnno();
  setTimeout(()=>{try{if(!window.THREE)throw new Error('Three.js non chargé');ANATOMY.init($('#viewer3d'),PATHO3D[anatomyKey].build,anatomyPatho);const ld=$('#v3dLoading');if(ld)ld.remove();}catch(e){const v=$('#viewer3d');if(v)v.innerHTML+=`<div style="color:#fff;padding:30px;text-align:center;position:absolute;inset:0;display:grid;place-items:center">Rendu 3D indisponible ici.<br><small style="opacity:.7">${esc(e.message)}</small></div>`;}},80);
}
function renderAnatomyAnno(){const p=PATHO3D[anatomyKey];const el=$('#anatomyAnno');if(!el)return;
  el.innerHTML=`<div class="card pad"><h3 class="mb">${p.label}</h3>
    <div class="anno"><h4>${ic('bulb','ic-sm')} Physiopathologie</h4><p>${p.physio}</p></div>
    <div class="anno role"><h4>${ic('steth','ic-sm')} Rôle infirmier</h4><p>${p.role}</p></div>
    <div class="row wrap mt" style="gap:8px"><button class="btn sm violet" onclick="go('schemas');setTimeout(()=>{var e=document.getElementById('schPatho');if(e){e.value='${p.label}'}},160)">${ic('share')} Schéma intégrateur</button>
      <button class="btn sm" onclick="go('meds');setTimeout(()=>{var e=document.getElementById('medPatho');if(e){e.value='${p.label}';doMeds()}},220)">${ic('pill')} Médicaments liés</button></div></div>`;
}
const ANATOMY={
  raf:null,renderer:null,scene:null,camera:null,group:null,parts:null,patho:true,rot:{x:-.18,y:.4},vel:{x:0,y:.0022},
  drag:false,last:null,camZ:6,build:null,_base:null,_handlers:null,raycaster:null,pointer:null,named:[],hovered:null,container:null,
  init(container,build,patho){
    if(!container)return;this.dispose();container.querySelectorAll('canvas').forEach(c=>c.remove());
    this.container=container;
    const w=container.clientWidth,h=container.clientHeight;this.patho=patho;
    this.scene=new THREE.Scene();
    this.camera=new THREE.PerspectiveCamera(45,w/h,.1,100);this.camZ=6;this.camera.position.z=this.camZ;
    this.renderer=new THREE.WebGLRenderer({antialias:true,alpha:true});this.renderer.setPixelRatio(Math.min(devicePixelRatio,2));this.renderer.setSize(w,h);
    container.appendChild(this.renderer.domElement);
    /* éclairage : hémisphère douce (ciel/sol) + lumière clé + léger contre-jour pour détacher les formes */
    this.scene.add(new THREE.HemisphereLight(0x9db8ff,0x0b1220,.55));
    const key=new THREE.DirectionalLight(0xffffff,.85);key.position.set(4,6,7);this.scene.add(key);
    const rim=new THREE.DirectionalLight(0x6f9dff,.55);rim.position.set(-5,-2,-6);this.scene.add(rim);
    const fill=new THREE.PointLight(0xffffff,.25);fill.position.set(-3,3,4);this.scene.add(fill);
    this.group=new THREE.Group();this.scene.add(this.group);
    this.raycaster=new THREE.Raycaster();this.pointer=new THREE.Vector2(-10,-10);this.named=[];
    this.build=build;this.rot={x:-.18,y:.4};this.vel={x:0,y:.0022};this[build]();this.setState(patho);
    this._bind(container);this._loop();
  },
  _mat(color,opts){return new THREE.MeshStandardMaterial(Object.assign({color,roughness:.5,metalness:.05},opts||{}));},
  _name(mesh,label){mesh.userData.label=label;this.named.push(mesh);return mesh;},
  heart(){const g=this.group;this.parts={};
    const lv=new THREE.Mesh(new THREE.SphereGeometry(1,32,32),this._mat(0xd94f57));lv.scale.set(.95,1.25,.95);lv.position.x=.35;g.add(lv);this._name(lv,'Ventricule gauche');
    const rv=new THREE.Mesh(new THREE.SphereGeometry(.85,32,32),this._mat(0xc23b52));rv.scale.set(.9,1.15,.9);rv.position.set(-.5,-.1,0);g.add(rv);this._name(rv,'Ventricule droit');
    const aorta=new THREE.Mesh(new THREE.TorusGeometry(.5,.16,16,40,Math.PI),this._mat(0xe8867a));aorta.position.set(.2,1.2,0);aorta.rotation.z=.3;g.add(aorta);this._name(aorta,'Aorte');
    const pa=new THREE.Mesh(new THREE.CylinderGeometry(.2,.22,1,20),this._mat(0x6aa9e0));pa.position.set(-.4,1.1,0);pa.rotation.z=.4;g.add(pa);this._name(pa,'Artère pulmonaire');
    this.parts.beat=[lv,rv];this.parts.lv=lv;this.parts.rv=rv;this.parts.glow=lv;this._base=[[.95,1.25,.95],[.9,1.15,.9]];},
  lungs(){const g=this.group;this.parts={};
    const mk=(x,label)=>{const m=new THREE.Mesh(new THREE.SphereGeometry(.95,32,32),this._mat(0xf0a3b4,{roughness:.7}));m.scale.set(.8,1.35,.7);m.position.x=x;g.add(m);this._name(m,label);return m;};
    const r=mk(.75,'Poumon droit'),l=mk(-.75,'Poumon gauche');
    const tr=new THREE.Mesh(new THREE.CylinderGeometry(.15,.15,1,16),this._mat(0xcfd8e6));tr.position.y=1.15;g.add(tr);this._name(tr,'Trachée');
    const b1=new THREE.Mesh(new THREE.CylinderGeometry(.09,.09,.7,12),this._mat(0xcfd8e6));b1.position.set(.35,.7,0);b1.rotation.z=-.6;g.add(b1);this._name(b1,'Bronche droite');
    const b2=b1.clone();b2.position.x=-.35;b2.rotation.z=.6;g.add(b2);this._name(b2,'Bronche gauche');
    this.parts.breathe=[l,r];this.parts.glow=r;},
  vessel(){const g=this.group;this.parts={};
    const wall=new THREE.Mesh(new THREE.CylinderGeometry(.6,.6,5,32,1,true),new THREE.MeshStandardMaterial({color:0xd98a86,transparent:true,opacity:.28,side:THREE.DoubleSide,roughness:.6}));
    wall.rotation.z=Math.PI/2;g.add(wall);this._name(wall,'Paroi artérielle');
    const clot=new THREE.Mesh(new THREE.SphereGeometry(.55,24,24),this._mat(0x3a3f4a,{roughness:.8}));clot.position.x=.3;g.add(clot);this.parts.clot=clot;this._name(clot,'Caillot (thrombus)');this.parts.glow=clot;
    const cells=[];for(let i=0;i<16;i++){const c=new THREE.Mesh(new THREE.SphereGeometry(.16,14,14),this._mat(0xff5b6e));c.position.set(-2.4+i*.32,(Math.random()-.5)*.4,(Math.random()-.5)*.4);g.add(c);cells.push(c);}
    cells.forEach(c=>this._name(c,'Globule rouge'));
    this.parts.cells=cells;},
  setState(patho){this.patho=patho;if(!this.parts)return;
    if(this.build==='heart'){const col=patho?0xb0455f:0xd94f57;this.parts.lv.material.color.setHex(col);}
    if(this.build==='lungs'){this.parts.breathe.forEach(m=>m.material.color.setHex(patho?0xc9b0b8:0xf0a3b4));}
    if(this.build==='vessel'){this.parts.clot.visible=patho;}
  },
  _bind(container){
    const dn=e=>{this.drag=true;container.classList.add('grabbing');this.last=this._pt(e);this.vel={x:0,y:0};};
    const mv=e=>{
      const p=this._pt(e);
      if(this.drag){const dx=(p.x-this.last.x)*.01,dy=(p.y-this.last.y)*.01;this.rot.y+=dx;this.rot.x+=dy;this.vel={x:dy*.4,y:dx*.4};this.last=p;}
      const rect=container.getBoundingClientRect();this.pointer.x=((p.x-rect.left)/rect.width)*2-1;this.pointer.y=-((p.y-rect.top)/rect.height)*2+1;
    };
    const up=()=>{this.drag=false;container.classList.remove('grabbing');};
    const leave=()=>{this.pointer.x=-10;this.pointer.y=-10;this._setHover(null);};
    container.addEventListener('mousedown',dn);window.addEventListener('mousemove',mv);window.addEventListener('mouseup',up);
    container.addEventListener('mouseleave',leave);
    container.addEventListener('touchstart',dn,{passive:true});container.addEventListener('touchmove',mv,{passive:true});container.addEventListener('touchend',up);
    container.addEventListener('wheel',e=>{e.preventDefault();this.camZ=Math.max(3.5,Math.min(10,this.camZ+e.deltaY*.003));},{passive:false});
    this._handlers={mv,up,leave};
  },
  _pt(e){const t=e.touches?e.touches[0]:(e.changedTouches?e.changedTouches[0]:e);return{x:t.clientX,y:t.clientY};},
  _setHover(mesh){
    if(this.hovered===mesh)return;this.hovered=mesh;
    const badge=document.getElementById('v3dPart');if(!badge)return;
    if(mesh){badge.textContent=mesh.userData.label;badge.classList.add('show');if(this.container)this.container.style.cursor='pointer';}
    else{badge.classList.remove('show');if(this.container&&!this.drag)this.container.style.cursor='grab';}
  },
  _loop(){
    this.raf=requestAnimationFrame(()=>this._loop());
    if(!this.renderer||!document.body.contains(this.renderer.domElement)){this.dispose();return;}
    const t=performance.now()*.001;
    if(!this.drag){
      this.rot.y+=this.vel.y;this.rot.x+=this.vel.x;
      this.vel.y+=(0.0022-this.vel.y)*.02; this.vel.x*=.92; /* amortissement + reprise douce de l'auto-rotation */
    }
    if(this.group){this.group.rotation.x+=(this.rot.x-this.group.rotation.x)*.12;this.group.rotation.y+=(this.rot.y-this.group.rotation.y)*.12;}
    if(this.build==='heart'&&this.parts){const amp=this.patho?.04:.13,sp=this.patho?3:5.2;const beat=1-Math.abs(Math.sin(t*sp))*amp;const dil=this.patho?1.28:1,dy=this.patho?1.15:1;
      this.parts.lv.scale.set(this._base[0][0]*dil*beat,this._base[0][1]*dy*beat,this._base[0][2]*dil*beat);
      this.parts.rv.scale.set(this._base[1][0]*dil*beat,this._base[1][1]*(this.patho?1.12:1)*beat,this._base[1][2]*dil*beat);}
    if(this.build==='lungs'&&this.parts){const amp=this.patho?.03:.12,base=this.patho?1.2:1;const br=1+Math.sin(t*(this.patho?1.4:2))*amp;this.parts.breathe.forEach(m=>m.scale.set(.8*base*br,1.35*base*(this.patho?1.05:1)*br,.7*base*br));}
    if(this.build==='vessel'&&this.parts){this.parts.cells.forEach(c=>{c.position.x+=.03;if(c.position.x>2.6)c.position.x=-2.5;if(this.patho&&c.position.x>-.4&&c.position.x<.9)c.position.x=-2.5;});}
    /* halo pulsant sur la structure pathologique — attire l'œil sans changer la lecture du modèle */
    if(this.patho&&this.parts&&this.parts.glow&&this.parts.glow.material&&this.parts.glow.material.emissive){
      const pulse=.18+Math.sin(t*2.4)*.14;this.parts.glow.material.emissive.setHex(0xff4d5e);this.parts.glow.material.emissiveIntensity=Math.max(0,pulse);
    }
    /* survol/tap : détection de la pièce anatomique pointée */
    if(this.raycaster&&this.named.length){
      this.raycaster.setFromCamera(this.pointer,this.camera);
      const hits=this.raycaster.intersectObjects(this.named,false);
      this._setHover(hits.length?hits[0].object:null);
    }
    this.camera.position.z+=(this.camZ-this.camera.position.z)*.1;
    this.renderer.render(this.scene,this.camera);
  },
  dispose(){if(this.raf)cancelAnimationFrame(this.raf);this.raf=null;
    if(this._handlers){window.removeEventListener('mousemove',this._handlers.mv);window.removeEventListener('mouseup',this._handlers.up);this._handlers=null;}
    if(this.renderer){try{this.renderer.dispose();this.renderer.domElement.remove();}catch(e){}this.renderer=null;}
    this.named=[];this.hovered=null;
  }
};

/* ==================================================================
   7bis · SCHÉMAS INTÉGRATEURS (concept maps SVG)
   ================================================================== */
const SCHEMA_PRESETS={
  'Insuffisance cardiaque':{titre:'Insuffisance cardiaque',cols:[
    {title:'Physiopathologie',nodes:[{label:'Débit cardiaque abaissé',detail:'Le myocarde affaibli éjecte moins de sang à chaque contraction.'},{label:'Congestion',detail:'Le sang reflue : œdème pulmonaire ou périphérique.'}]},
    {title:'Pharmacologie',nodes:[{label:'Diurétiques',detail:'Réduisent la surcharge liquidienne (furosémide).'},{label:'IECA / ARA',detail:'Diminuent la postcharge et protègent le cœur.'},{label:'Bêta-bloquants',detail:'Ralentissent la FC, améliorent la fonction à long terme.'}]},
    {title:'Surveillance infirmière',nodes:[{label:'Poids quotidien',detail:'Un gain rapide indique une rétention liquidienne.'},{label:'Respiration / SpO₂',detail:'Dépister dyspnée et hypoxie.'},{label:'Électrolytes (K⁺)',detail:'Les diurétiques peuvent causer une hypokaliémie.'}]},
    {title:'Raisonnement clinique',nodes:[{label:'Prioriser la respiration',detail:'ABC : positionner en Fowler, oxygène au besoin.'},{label:'Éducation',detail:'Restriction sodée, pesée quotidienne, reconnaître l\'aggravation.'}]}]},
  'Diabète type 2':{titre:'Diabète type 2',cols:[
    {title:'Physiopathologie',nodes:[{label:'Résistance à l\'insuline',detail:'Les cellules répondent mal à l\'insuline; la glycémie s\'élève.'},{label:'Hyperglycémie chronique',detail:'Atteinte des vaisseaux, nerfs, reins et yeux.'}]},
    {title:'Pharmacologie',nodes:[{label:'Metformine',detail:'Diminue la production hépatique de glucose.'},{label:'Insuline',detail:'Selon l\'évolution; risque d\'hypoglycémie.'}]},
    {title:'Surveillance infirmière',nodes:[{label:'Glycémie capillaire',detail:'Avant les repas et au coucher selon le protocole.'},{label:'Pieds et peau',detail:'Prévenir plaies et infections (neuropathie).'},{label:'Signes hypo/hyper',detail:'Diaphorèse, confusion vs soif, polyurie.'}]},
    {title:'Raisonnement clinique',nodes:[{label:'Traiter l\'hypo d\'abord',detail:'15 g de glucides rapides, réévaluer en 15 min.'},{label:'Enseignement',detail:'Alimentation, activité, adhésion au traitement.'}]}]}
};
let currentSchema=null;
function renderSchemas(){
  $('#main').innerHTML=topbar('Schémas intégrateurs','Relie physiopathologie → pharmacologie → surveillance → raisonnement')+`
  <div class="view">
    <div class="card pad mb"><div class="row wrap" style="gap:10px;align-items:flex-end">
      <label class="field" style="flex:1;min-width:220px;margin:0"><span>Pathologie / sujet</span><input class="inp" id="schPatho" placeholder="Ex. Insuffisance cardiaque, MPOC, choc septique…" onkeydown="if(event.key==='Enter')doSchema()"></label>
      <button class="btn violet" id="schGo" onclick="doSchema()">${ic('spark')} Générer le schéma</button></div>
      <div class="row wrap mt" style="gap:6px"><span class="muted" style="font-size:12.5px;align-self:center">Exemples prêts :</span>${Object.keys(SCHEMA_PRESETS).map(k=>`<button class="tag" style="cursor:pointer" onclick="loadPreset('${k}')">${ic('share','ic-sm')} ${k}</button>`).join('')}</div></div>
    <div id="schOut">${emptyBox('share','Aucun schéma affiché','Choisis un exemple ou génère un schéma intégrateur pour une pathologie.')}</div>
  </div>`;
}
function loadPreset(k){currentSchema=SCHEMA_PRESETS[k];drawSchema();}
async function doSchema(){
  const patho=$('#schPatho').value.trim();if(!patho)return toast('Entre une pathologie','err');
  if(SCHEMA_PRESETS[patho]){loadPreset(patho);return;}
  const btn=$('#schGo');btn.disabled=true;btn.innerHTML='<span class="spin"></span> Génération…';
  $('#schOut').innerHTML=`<div class="ai-loading"><div class="spin dark"></div><div class="pulse">Friday relie les concepts pour « ${esc(patho)} »…</div></div>`;
  try{
    const r=await askClaude(`Construis un schéma intégrateur infirmier pour : ${patho}. Relie les 4 niveaux.`,{json:true,max:2400,
      system:'Réponds UNIQUEMENT avec un objet JSON: {"titre":"...","cols":[{"title":"Physiopathologie","nodes":[{"label":"court","detail":"explication"}]},{"title":"Pharmacologie","nodes":[...]},{"title":"Surveillance infirmière","nodes":[...]},{"title":"Raisonnement clinique","nodes":[...]}]}. 2 à 3 nodes par colonne, labels courts. Français québécois.'});
    currentSchema=r;bumpStreak();drawSchema();
  }catch(e){$('#schOut').innerHTML=aiError(e,'doSchema()');}
  btn.disabled=false;btn.innerHTML=ic('spark')+' Générer le schéma';
}
function drawSchema(){
  const d=currentSchema;if(!d||!d.cols)return;
  const cols=d.cols,colColors=['#2563EB','#7C5CFC','#0EA5A4','#4F46E5'];
  const CW=170,GAP=54,NH=58,NG=16,PADX=14,PADY=52;
  const maxN=Math.max(...cols.map(c=>c.nodes.length));
  const W=PADX*2+cols.length*CW+(cols.length-1)*GAP;
  const H=PADY+maxN*(NH+NG)+8;
  const colX=k=>PADX+k*(CW+GAP);
  const nodeY=(k,ni)=>{const n=cols[k].nodes.length;const total=n*NH+(n-1)*NG;const start=PADY+(maxN*(NH+NG)-NG-total)/2;return start+ni*(NH+NG);};
  let lines='',nodes='',heads='';
  cols.forEach((c,k)=>{
    heads+=`<text x="${colX(k)+CW/2}" y="32" text-anchor="middle" font-family="Plus Jakarta Sans,sans-serif" font-weight="800" font-size="12.5" fill="${colColors[k]}">${esc(c.title)}</text>`;
    c.nodes.forEach((nd,ni)=>{
      const x=colX(k),y=nodeY(k,ni);
      if(k<cols.length-1){cols[k+1].nodes.forEach((_,nj)=>{const x1=x+CW,y1=y+NH/2,x2=colX(k+1),y2=nodeY(k+1,nj)+NH/2;const mx=(x1+x2)/2;lines+=`<path d="M${x1} ${y1} C${mx} ${y1} ${mx} ${y2} ${x2} ${y2}" stroke="${colColors[k]}" stroke-width="1.4" fill="none" opacity=".22"/>`;});}
      nodes+=`<g class="snode" onclick="schemaNode(${k},${ni})"><rect x="${x}" y="${y}" width="${CW}" height="${NH}" rx="13" fill="${colColors[k]}14" stroke="${colColors[k]}55" stroke-width="1.5"/><foreignObject x="${x+10}" y="${y+8}" width="${CW-20}" height="${NH-16}"><div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Inter,sans-serif;font-size:12px;font-weight:600;color:#182335;line-height:1.3;display:flex;align-items:center;height:100%">${esc(nd.label)}</div></foreignObject></g>`;
    });
  });
  $('#schOut').innerHTML=`<div class="card pad"><div class="row between mb wrap" style="gap:8px"><h3>${esc(d.titre||'Schéma intégrateur')}</h3><span class="chip muted">Clique un concept pour le détail</span></div>
    <div class="schema-wrap"><svg class="schema" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">${lines}${heads}${nodes}</svg></div></div>`;
}
function schemaNode(k,ni){const nd=currentSchema.cols[k].nodes[ni];const ct=currentSchema.cols[k].title;
  modal(`<div class="modal-head"><h2>${esc(nd.label)}</h2><button class="btn icon ghost" onclick="closeModal()">${ic('x')}</button></div><div class="modal-body"><div class="chip violet mb">${esc(ct)}</div><p style="font-size:14.5px;line-height:1.6">${esc(nd.detail||'')}</p></div>`);
}
/* ==================================================================
   ACCUEIL (premier lancement) + avis clinique
   ================================================================== */
const DISCLAIMER='NursaFlow est un outil d\'aide à l\'étude. Son contenu — y compris les fiches de médicaments, les calculs de doses et les informations cliniques — peut comporter des erreurs et ne remplace pas les références officielles, l\'enseignement, le jugement clinique ni la double vérification. Ne l\'utilise jamais comme seule source pour un soin réel auprès d\'un patient.';
function showOnboarding(){
  modal(`<div class="modal-head"><div class="brand-mark" style="width:34px;height:34px">${ic('heart')}</div><h2>Bienvenue dans NursaFlow</h2></div>
  <div class="modal-body">
    <p style="font-size:14px;line-height:1.6;margin-bottom:14px">Ton compagnon d'étude en soins infirmiers : organisation, révision, préparation aux examens et aux stages — avec un tuteur nommé <b>Friday</b>.</p>
    <label class="field"><span>Ton prénom (facultatif)</span><input class="inp" id="obName" placeholder="Ex. Camille"></label>
    <div class="anno mb"><h4>${ic('spark','ic-sm')} Fonctions IA — facultatives</h4><p>Résumés, quiz et fiches générés par l'IA nécessitent une clé API Anthropic (à ajouter dans Réglages). Tout le reste — tâches, calendrier, flashcards, calculs, 3D — fonctionne sans clé ni connexion.</p></div>
    <div class="anno" style="border-color:var(--yellow-solid);background:var(--yellow-t)"><h4 style="color:var(--yellow-d)">${ic('alert','ic-sm')} Avis important</h4><p>${DISCLAIMER}</p></div>
  </div>
  <div class="modal-foot"><button class="btn primary block" onclick="finishOnboarding()">J'ai compris — commencer</button></div>`);
}
function finishOnboarding(){const n=$('#obName');if(n&&n.value.trim())S.profile.name=n.value.trim();S.profile.onboarded=true;save('profile');closeModal();renderDash();if(S.profile.name)toast('Bienvenue, '+S.profile.name+' !','ok');}

/* ==================================================================
   RÉGLAGES — connexion IA (clé personnelle) + données
   ================================================================== */
function renderSettings(){
  const a=aiReady();
  const statusChip=_apiKey?`<div class="chip green">${ic('check','ic-sm')} Clé configurée</div>`:(a.proxy?`<div class="chip blue">${ic('spark','ic-sm')} IA disponible (environnement Claude)</div>`:`<div class="chip yellow">${ic('alert','ic-sm')} IA non configurée</div>`);
  $('#main').innerHTML=topbar('Réglages','Connexion à l\'IA et gestion de tes données')+`
  <div class="view"><div class="grid g-2">
    <div class="card pad">
      <div class="sec-title">${ic('spark','ic-sm')} Connexion à l'IA (Claude)</div>
      ${statusChip}
      <p class="muted" style="font-size:13px;margin:12px 0">Pour utiliser les fonctions IA (résumés, quiz, fiches médicaments, cas cliniques) dans l'application téléchargée, colle ta clé API Anthropic. Elle est stockée uniquement sur cet appareil et n'est jamais envoyée ailleurs qu'à Anthropic.</p>
      <label class="field"><span>Clé API Anthropic</span><input class="inp" id="setKey" type="password" placeholder="sk-ant-..." value="${esc(_apiKey)}"></label>
      <label class="field"><span>Modèle</span><input class="inp" id="setModel" value="${esc(_apiModel)}" placeholder="claude-sonnet-4-5"></label>
      <div class="row wrap" style="gap:8px"><button class="btn primary" id="setTest" onclick="testApi()">${ic('check')} Enregistrer et tester</button><button class="btn ghost" onclick="clearApi()">Effacer la clé</button></div>
      <div id="setResult" class="mt"></div>
      <div class="hr"></div>
      <p class="muted" style="font-size:12px;line-height:1.6">Comment obtenir une clé : crée un compte sur <b>console.anthropic.com</b>, va dans <b>API Keys</b>, crée une clé et copie-la ici. L'usage de l'API se fait selon les tarifs de ton compte Anthropic. Si le modèle indiqué provoque une erreur, essaie <b>claude-sonnet-4-5</b> ou <b>claude-3-5-sonnet-latest</b>.</p>
    </div>
    <div class="card pad">
      <div class="sec-title">${ic('layers','ic-sm')} Tes données</div>
      <p class="muted" style="font-size:13px;margin-bottom:14px">Tâches, fiches, cartes et progression sont sauvegardées sur cet appareil. Exporte une copie de sauvegarde quand tu veux.</p>
      <button class="btn block mb" onclick="exportData()">${ic('fileText')} Exporter mes données (fichier .json)</button>
      <label class="btn block mb" style="cursor:pointer">${ic('upload')} Restaurer une sauvegarde<input type="file" accept=".json,application/json" style="display:none" onchange="importData(this)"></label>
      <button class="btn block" style="color:var(--pink-d);border-color:#F3C9D8" onclick="if(confirm('Effacer TOUTES tes données NursaFlow ? Action irréversible.')){resetData()}">${ic('trash')} Réinitialiser l'application</button>
      <div class="hr"></div>
      <div class="sec-title">${ic('smile','ic-sm')} Ton prénom (facultatif)</div>
      <div class="row" style="gap:8px"><input class="inp" id="setName" value="${esc(S.profile.name||'')}" placeholder="Ex. Camille"><button class="btn" onclick="saveName()">${ic('check')}</button></div>
      <p class="muted" style="font-size:12px;margin-top:8px">Friday t'accueillera par ton prénom.</p>
      <div class="hr"></div>
      <div class="anno" style="border-color:var(--yellow-solid);background:var(--yellow-t)"><h4 style="color:var(--yellow-d)">${ic('alert','ic-sm')} Avis important</h4><p style="font-size:12.5px">${DISCLAIMER}</p></div>
      <p class="muted center" style="font-size:11px;margin-top:12px">NursaFlow · version 2.0</p>
    </div>
  </div></div>`;
}
async function testApi(){
  _apiKey=$('#setKey').value.trim();_apiModel=$('#setModel').value.trim()||'claude-sonnet-4-5';
  await Store.set('apikey',_apiKey);await Store.set('apimodel',_apiModel);buildNav();
  const r=$('#setResult');
  if(!_apiKey){r.innerHTML=`<div class="chip">Aucune clé — l'IA restera inactive hors de claude.ai.</div>`;return;}
  const btn=$('#setTest');btn.disabled=true;btn.innerHTML='<span class="spin"></span> Test en cours…';r.innerHTML='';
  try{
    await askClaude('Réponds uniquement par: OK',{max:20});
    r.innerHTML=`<div class="chip green" style="max-width:100%">${ic('check','ic-sm')} Connexion réussie — les fonctions IA sont prêtes.</div>`;toast('IA connectée','ok');
  }catch(e){
    r.innerHTML=`<div class="chip yellow" style="max-width:100%;white-space:normal;text-align:left;line-height:1.5">${ic('alert','ic-sm')} ${esc(e.message)}</div>`;
  }
  btn.disabled=false;btn.innerHTML=ic('check')+' Enregistrer et tester';
}
function clearApi(){_apiKey='';Store.set('apikey','');const k=$('#setKey');if(k)k.value='';const r=$('#setResult');if(r)r.innerHTML=`<div class="chip">Clé effacée.</div>`;buildNav();toast('Clé effacée','ok');}
function saveName(){S.profile.name=$('#setName').value.trim();save('profile');toast('Enregistré','ok');}
function exportData(){
  const dump={_app:'NursaFlow',_v:2,_schema:SCHEMA_VERSION,_date:new Date().toISOString()};STATE_KEYS.forEach(k=>dump[k]=S[k]);
  const blob=new Blob([JSON.stringify(dump,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);
  const a=document.createElement('a');a.href=url;a.download='nursaflow-sauvegarde.json';document.body.appendChild(a);a.click();a.remove();URL.revokeObjectURL(url);
  toast('Sauvegarde exportée','ok');
}
function importData(input){
  const f=input.files&&input.files[0];if(!f)return;
  const rd=new FileReader();
  rd.onload=async()=>{
    try{
      const d=JSON.parse(rd.result);
      if(!STATE_KEYS.some(k=>k in d))throw new Error('Fichier non reconnu');
      const from=(typeof d._schema==='number'&&d._schema>=1)?d._schema:1; // sauvegardes d'avant P1-1 = v1
      if(from>SCHEMA_VERSION){toast('Sauvegarde créée par une version plus récente de NursaFlow — mets l\'app à jour avant d\'importer','err');return;}
      const st={};for(const k of STATE_KEYS)st[k]=(k in d)?d[k]:S[k];
      if(from<SCHEMA_VERSION)migrateState(st,from);
      cancelPendingSaves(); // une écriture debouncée en attente ne doit pas écraser l'import
      for(const k of STATE_KEYS){ S[k]=st[k]; await Store.set(k,st[k]); }
      await Store.set('schemaVersion',SCHEMA_VERSION);
      toast('Sauvegarde restaurée','ok');setTimeout(()=>location.reload(),600);
    }catch(e){toast('Fichier de sauvegarde invalide','err');}
  };
  rd.readAsText(f);
}
async function resetData(){cancelPendingSaves();for(const k of [...STATE_KEYS,'schemaVersion']){await Store.set(k,null);}location.reload();}

/* ==================================================================
   FRIDAY — compagnon actif (rappels, encouragements)
   ================================================================== */
const friday={
  visible:false,pending:0,_queue:[],
  init(){$('#fridayBtn').onclick=()=>this.toggle();this.checkReminders();setInterval(()=>this.checkReminders(),90000);setTimeout(()=>this.greet(),1200);},
  greet(){const h=new Date().getHours();const m=h<12?'Bon matin ! Prête à apprendre ?':h<18?'Bon retour ! On continue sur ta lancée ?':'Bonne soirée d\'étude ! Je suis là.';this.show(m,[{t:'C\'est parti',a:'dismiss'}]);},
  toggle(){this.visible?this.hide():this.checkReminders(true);},
  checkReminders(force){
    const actionable=[];
    if(!aiReady().proxy&&!_apiKey)actionable.push({m:'Pour activer les résumés, quiz et fiches générés par l\'IA, ajoute ta clé API dans les Réglages.',acts:[{t:'Réglages',a:'go:settings'},{t:'Plus tard',a:'dismiss'}]});
    const due=dueCards().length;
    if(due)actionable.push({m:`Tu as <b>${due} carte${due>1?'s':''}</b> à réviser. On s'y met ?`,acts:[{t:'Réviser',a:'go:cards'},{t:'Plus tard',a:'dismiss'}]});
    const exam=S.events.filter(e=>e.type==='examen'&&daysUntil(e.date)>=0&&daysUntil(e.date)<=3).sort((a,b)=>a.date.localeCompare(b.date))[0];
    if(exam)actionable.push({m:`Ton examen <b>${esc(exam.title)}</b> est ${daysUntil(exam.date)===0?'aujourd\'hui':daysUntil(exam.date)===1?'demain':'dans '+daysUntil(exam.date)+' jours'} ! Un quiz de pratique ?`,acts:[{t:'Me préparer',a:'go:quiz'},{t:'OK',a:'dismiss'}]});
    const overdue=S.tasks.filter(t=>!t.done&&t.due&&daysUntil(t.due)<0).length;
    if(overdue)actionable.push({m:`Tu as <b>${overdue} tâche${overdue>1?'s':''} en retard</b>. On rattrape ça ?`,acts:[{t:'Voir',a:'go:tasks'},{t:'OK',a:'dismiss'}]});
    const doneToday=S.profile.lastActive===todayISO();
    if(!actionable.length&&S.tasks.filter(t=>!t.done).length&&!doneToday)actionable.push({m:'Une petite tâche complétée aujourd\'hui garderait ta série active !',acts:[{t:'Mes tâches',a:'go:tasks'},{t:'OK',a:'dismiss'}]});
    const encour=['Chaque révision te rapproche de ton uniforme d\'infirmier(ère).','Rappelle-toi les <b>5 bons</b> à chaque administration.','Une pause de 5 minutes améliore la mémorisation à long terme.','Tu apprends à sauver des vies. C\'est énorme. Continue.'];
    const filler={m:encour[Math.floor(Math.random()*encour.length)],acts:[{t:'Merci Friday',a:'dismiss'}]};
    this.pending=actionable.length;const badge=$('#fridayBadge');
    if(this.pending&&!this.visible){badge.style.display='grid';badge.textContent=this.pending;}else badge.style.display='none';
    this._queue=actionable.length?actionable.slice():[filler];
    if(force)this.next();
  },
  next(){if(!this._queue||!this._queue.length)return this.greet();const m=this._queue.shift();this.show(m.m,m.acts);},
  say(kind){if(kind==='celebrate'){const c=['Bravo !','Bien joué !','Tu avances très bien.','Continue comme ça !'];this.show(c[Math.floor(Math.random()*c.length)],[{t:'Merci',a:'dismiss'}]);}
    else if(kind==='encourage'){this.show('Ce n\'était pas ton meilleur résultat, mais chaque essai te fait progresser. On regarde ton plan d\'étude ?',[{t:'Plan d\'étude',a:'go:quiz'},{t:'Plus tard',a:'dismiss'}]);}},
  show(html,acts){
    acts=acts||[];this.visible=true;$('#fridayBadge').style.display='none';
    const host=$('#fridayBubbleHost');
    host.innerHTML=`<div class="friday-bubble"><button class="bclose" onclick="friday.hide()">${ic('x','ic-sm')}</button>
      <div class="fname">${ic('smile','ic-sm')} Friday</div>
      <p>${html}</p>${acts.length?`<div class="bact">${acts.map(a=>`<button class="btn sm ${a.a.indexOf('go')===0?'primary':'ghost'}" onclick="friday.act('${a.a}')">${esc(a.t)}</button>`).join('')}</div>`:''}</div>`;
  },
  hide(){this.visible=false;$('#fridayBubbleHost').innerHTML='';this.checkReminders();},
  act(a){if(a==='dismiss'){this.hide();}else if(a.indexOf('go:')===0){go(a.slice(3));this.hide();}},
  onNav(id){/* réservé pour conseils contextuels futurs */}
};

/* ==================================================================
   INITIALISATION
   ================================================================== */
(async function(){
  try{
    await loadAll();
    _apiKey=(await Store.get('apikey'))||'';
    _apiModel=(await Store.get('apimodel'))||'claude-sonnet-4-5';
    if(S.profile.lastActive){const y=new Date(Date.now()-864e5);const yISO=new Date(y.getTime()-y.getTimezoneOffset()*6e4).toISOString().slice(0,10);if(S.profile.lastActive!==todayISO()&&S.profile.lastActive!==yISO)S.profile.streak=0;}
    $('#sideStreak').textContent=S.profile.streak||0;
    buildNav();renderDash();friday.init();
    if(!S.profile.onboarded) setTimeout(showOnboarding,300);
  }catch(e){
    console.error('Erreur d\'initialisation NursaFlow :',e);
    document.getElementById('main').innerHTML=`<div class="view"><div class="empty"><div class="eic">${ic('alert')}</div><h3>Un problème est survenu au démarrage</h3><p>${esc(e.message)}. Essaie de recharger la page ; tes données déjà sauvegardées sont conservées.</p></div></div>`;
  }
})();
