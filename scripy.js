// ── REPOS DATA ──
let allRepos=[];
let langCounts={};

// ── GAMES GALLERY DATA ──
const games=[
  {emoji:'🎮',name:'Super Mario',color:'#e74c3c'},
  {emoji:'⚔️',name:'Zelda',color:'#f39c12'},
  {emoji:'🎯',name:'Halo',color:'#27ae60'},
  {emoji:'🏎️',name:'Mario Kart',color:'#e74c3c'},
  {emoji:'👻',name:'Pac-Man',color:'#f1c40f'},
  {emoji:'🦸',name:'Spider-Man',color:'#c0392b'},
  {emoji:'🔫',name:'Counter-Strike',color:'#ff6b35'},
  {emoji:'🧱',name:'Minecraft',color:'#8B6914'},
  {emoji:'🚀',name:'Among Us',color:'#c0392b'},
  {emoji:'🌿',name:'Stardew Valley',color:'#27ae60'},
  {emoji:'🐉',name:'Dragon Ball FighterZ',color:'#e67e22'},
  {emoji:'⚡',name:'Pokémon',color:'#f39c12'},
  {emoji:'🏆',name:'Fortnite',color:'#8e44ad'},
  {emoji:'🕹️',name:'Sonic',color:'#2980b9'},
  {emoji:'🦁',name:'God of War',color:'#c0392b'},
  {emoji:'🌌',name:'No Man\'s Sky',color:'#1a252f'},
  {emoji:'🎸',name:'Guitar Hero',color:'#8e44ad'},
  {emoji:'🧟',name:'Resident Evil',color:'#2c3e50'},
  {emoji:'🏰',name:'Dark Souls',color:'#7f8c8d'},
  {emoji:'🌊',name:'Subnautica',color:'#2980b9'},
  {emoji:'🤖',name:'Nier: Automata',color:'#95a5a6'},
  {emoji:'🦊',name:'Star Fox',color:'#e67e22'},
  {emoji:'💎',name:'Hollow Knight',color:'#8e44ad'},
  {emoji:'🎭',name:'Persona 5',color:'#e74c3c'},
];

// ── LANG CLASS ──
function langClass(l){
  if(!l)return'lang-other';
  const m={'JavaScript':'lang-js','TypeScript':'lang-ts','Python':'lang-py','HTML':'lang-html','CSS':'lang-css','Java':'lang-java','C':'lang-c','C++':'lang-c','C#':'lang-c'};
  return m[l]||'lang-other';
}

// ── PROJECT DESCRIPTION FROM NAME ──
function guessDesc(name,desc,lang){
  if(desc&&desc.trim()&&desc!=='null')return desc;
  const n=name.toLowerCase();
  if(n.includes('portfolio'))return'Portafolio personal con proyectos y habilidades.';
  if(n.includes('api'))return'Servicio API REST para consumo de datos.';
  if(n.includes('app'))return'Aplicación web con interfaz interactiva.';
  if(n.includes('bot'))return'Bot automatizado para tareas específicas.';
  if(n.includes('game'))return'Proyecto de videojuego o mecánica de juego.';
  if(n.includes('chat'))return'Aplicación de mensajería en tiempo real.';
  if(n.includes('crud'))return'Sistema CRUD con base de datos.';
  if(n.includes('login')||n.includes('auth'))return'Sistema de autenticación y gestión de usuarios.';
  if(n.includes('shop')||n.includes('store'))return'E-commerce o tienda en línea.';
  if(n.includes('calc'))return'Calculadora o herramienta matemática.';
  return`Proyecto en ${lang||'código'} alojado en GitHub.`;
}

// ── FETCH REPOS ──
async function fetchRepos(){
  try{
    const [uRes,rRes]=await Promise.all([
      fetch('https://api.github.com/users/ypd651'),
      fetch('https://api.github.com/users/ypd651/repos?per_page=100&sort=updated')
    ]);
    const user=await uRes.json();
    const repos=await rRes.json();
    if(!Array.isArray(repos))throw new Error('no repos');
    allRepos=repos.filter(r=>!r.fork);
    updateStats(user,repos);
    buildLangCounts();
    renderProjectsGrid('projects-grid-home',allRepos.slice(0,6));
    renderProjectsGrid('projects-grid',allRepos);
    renderLangBars();
  }catch(e){
    document.getElementById('projects-grid-home').innerHTML=`<div class="projects-loading">[ ERROR CARGANDO REPOS — VERIFICA TU USERNAME DE GITHUB ]</div>`;
    document.getElementById('projects-grid').innerHTML=`<div class="projects-loading">[ ERROR CARGANDO REPOS ]</div>`;
    // Fallback demo repos
    allRepos=demoRepos();
    renderProjectsGrid('projects-grid-home',allRepos.slice(0,6));
    renderProjectsGrid('projects-grid',allRepos);
    buildLangCounts();
    renderLangBars();
  }
}

function demoRepos(){
  return[
    {name:'portfolio-web',description:'Mi portafolio personal como desarrollador.',language:'HTML',stargazers_count:5,forks_count:2,html_url:'https://github.com/ypd651',topics:['html','css','javascript'],updated_at:'2024-01-01'},
    {name:'backend-api',description:'API REST construida con Node.js y Express.',language:'JavaScript',stargazers_count:8,forks_count:3,html_url:'https://github.com/ypd651',topics:['nodejs','express','api'],updated_at:'2024-01-01'},
    {name:'python-scripts',description:'Scripts utilitarios en Python para automatización.',language:'Python',stargazers_count:4,forks_count:1,html_url:'https://github.com/ypd651',topics:['python','automation'],updated_at:'2024-01-01'},
    {name:'react-dashboard',description:'Dashboard analítico en React con gráficas.',language:'TypeScript',stargazers_count:12,forks_count:4,html_url:'https://github.com/ypd651',topics:['react','typescript','dashboard'],updated_at:'2024-01-01'},
    {name:'game-project',description:'Mini juego desarrollado en JavaScript puro.',language:'JavaScript',stargazers_count:7,forks_count:2,html_url:'https://github.com/ypd651',topics:['game','canvas','javascript'],updated_at:'2024-01-01'},
    {name:'database-manager',description:'Gestor de base de datos con interfaz gráfica.',language:'Python',stargazers_count:3,forks_count:1,html_url:'https://github.com/ypd651',topics:['python','database','gui'],updated_at:'2024-01-01'},
  ];
}

function updateStats(user,repos){
  document.getElementById('stat-repos').textContent=user.public_repos||repos.length;
  document.getElementById('stat-followers').textContent=user.followers||0;
  const totalStars=repos.reduce((a,r)=>a+(r.stargazers_count||0),0);
  document.getElementById('stat-stars').textContent=totalStars;
}

function buildLangCounts(){
  langCounts={};
  allRepos.forEach(r=>{if(r.language){langCounts[r.language]=(langCounts[r.language]||0)+1;}});
  document.getElementById('stat-langs').textContent=Object.keys(langCounts).length;
}

function renderLangBars(){
  const total=allRepos.length||1;
  const sorted=Object.entries(langCounts).sort((a,b)=>b[1]-a[1]).slice(0,8);
  const colors=['#00f5ff','#ff006e','#39ff14','#bf00ff','#ff6b00','#f7df1e','#4b9cd3','#9999ff'];
  document.getElementById('lang-bars').innerHTML=sorted.map(([lang,count],i)=>`
    <div style="margin-bottom:1rem;">
      <div style="display:flex;justify-content:space-between;margin-bottom:.3rem;">
        <span style="font-family:var(--font-ui);font-size:.7rem;color:${colors[i]}">${lang}</span>
        <span style="font-size:.8rem;color:var(--text-muted)">${count} repos · ${Math.round(count/total*100)}%</span>
      </div>
      <div style="height:6px;background:rgba(255,255,255,.06);border-radius:3px;overflow:hidden;">
        <div style="height:100%;width:${Math.round(count/total*100)}%;background:${colors[i]};border-radius:3px;box-shadow:0 0 8px ${colors[i]};transition:width 1s ease-out;"></div>
      </div>
    </div>
  `).join('');
}

function renderProjectsGrid(gridId,repos){
  const grid=document.getElementById(gridId);
  if(!repos||!repos.length){grid.innerHTML='<div class="projects-loading">[ SIN REPOS ]</div>';return;}
  grid.innerHTML=repos.map(r=>`
    <div class="project-card" onclick='openRepo(${JSON.stringify(r)})'>
      <span class="project-card-lang ${langClass(r.language)}">${r.language||'CODE'}</span>
      <h3>${r.name}</h3>
      <p>${guessDesc(r.name,r.description,r.language)}</p>
      <div class="project-meta">
        <span class="project-stars">⭐ ${r.stargazers_count||0}</span>
        <span class="project-forks">🔀 ${r.forks_count||0}</span>
        <span class="project-link">VER →</span>
      </div>
    </div>
  `).join('');
}

function filterRepos(lang){
  document.querySelectorAll('#filter-bar .chip').forEach(c=>c.style.background='');
  document.getElementById('filter-bar').querySelector('[onclick*="'+lang+'"]').style.background='rgba(0,245,255,.2)';
  let filtered=allRepos;
  if(lang!=='all'&&lang!=='other')filtered=allRepos.filter(r=>r.language===lang);
  else if(lang==='other')filtered=allRepos.filter(r=>!['JavaScript','TypeScript','Python','HTML'].includes(r.language));
  renderProjectsGrid('projects-grid',filtered);
}

// ── OPEN REPO MODAL ──
async function openRepo(repo){
  const overlay=document.getElementById('modal-overlay');
  document.getElementById('modal-lang-badge').className='modal-lang '+langClass(repo.language);
  document.getElementById('modal-lang-badge').textContent=repo.language||'CODE';
  document.getElementById('modal-title').textContent=repo.name;
  document.getElementById('modal-desc').textContent=guessDesc(repo.name,repo.description,repo.language);
  const updated=repo.updated_at?new Date(repo.updated_at).toLocaleDateString('es-CO'):'N/A';
  document.getElementById('modal-stats').innerHTML=`
    <div class="modal-stat"><span>STARS</span><span>⭐ ${repo.stargazers_count||0}</span></div>
    <div class="modal-stat"><span>FORKS</span><span>🔀 ${repo.forks_count||0}</span></div>
    <div class="modal-stat"><span>ACTUALIZADO</span><span>${updated}</span></div>
    ${repo.topics&&repo.topics.length?`<div class="modal-stat"><span>TOPICS</span><span style="font-size:.75rem;color:var(--neon-purple)">${repo.topics.slice(0,4).join(' · ')}</span></div>`:''}
  `;
  document.getElementById('modal-btns').innerHTML=`
    <a class="btn btn-primary" href="${repo.html_url}" target="_blank">🐙 VER EN GITHUB</a>
    ${repo.homepage?`<a class="btn btn-ghost" href="${repo.homepage}" target="_blank">🌐 DEMO EN VIVO</a>`:''}
  `;
  const readmeWrap=document.getElementById('modal-readme-wrap');
  document.getElementById('modal-readme').textContent='Cargando README...';
  readmeWrap.style.display='block';
  overlay.classList.add('show');
  document.body.style.overflow='hidden';
  // Fetch README
  try{
    const res=await fetch(`https://api.github.com/repos/ypd651/${repo.name}/readme`,{headers:{Accept:'application/vnd.github.v3.raw'}});
    if(res.ok){
      const txt=await res.text();
      document.getElementById('modal-readme').textContent=txt.slice(0,1200)+(txt.length>1200?'\n\n[... ver más en GitHub]':'');
    }else{
      document.getElementById('modal-readme').textContent=guessDesc(repo.name,repo.description,repo.language)+'\n\nVisita GitHub para ver el README completo y el código fuente.';
    }
  }catch{document.getElementById('modal-readme').textContent='No se pudo cargar el README. Visita GitHub para más detalles.';}
}

function openModal(data){
  document.getElementById('modal-lang-badge').textContent='';
  document.getElementById('modal-title').textContent=data.name;
  document.getElementById('modal-desc').textContent=data.description;
  document.getElementById('modal-stats').innerHTML='';
  document.getElementById('modal-btns').innerHTML='<button class="btn btn-ghost" onclick="closeModal()">CERRAR</button>';
  document.getElementById('modal-readme-wrap').style.display='none';
  document.getElementById('modal-overlay').classList.add('show');
  document.body.style.overflow='hidden';
}

function closeModal(){
  document.getElementById('modal-overlay').classList.remove('show');
  document.body.style.overflow='';
}
function closeModalCheck(e){if(e.target===document.getElementById('modal-overlay'))closeModal();}

// ── GALLERY ──
function buildGallery(){
  const inner=document.getElementById('gallery-inner');
  const grid=document.getElementById('gallery-grid');
  const double=[...games,...games];
  inner.innerHTML=double.map(g=>`
    <div class="gallery-card" style="background:${g.color}22;border-color:${g.color}33;" onclick="openModal({name:'${g.name}',description:'Uno de los videojuegos más icónicos de la historia del gaming. Un clásico que ha definido una generación de jugadores.'})">
      <div class="gallery-card-bg" style="background:radial-gradient(circle,${g.color}22,transparent)">${g.emoji}</div>
      <div class="gallery-card-label">${g.name}</div>
    </div>
  `).join('');
  grid.innerHTML=games.map(g=>`
    <div class="gallery-card" style="height:120px;background:${g.color}15;border-color:${g.color}25;" onclick="openModal({name:'${g.name}',description:'Videojuego icónico en la historia del gaming.'})">
      <div class="gallery-card-bg" style="font-size:2.5rem;background:radial-gradient(circle,${g.color}20,transparent)">${g.emoji}</div>
      <div class="gallery-card-label">${g.name}</div>
    </div>
  `).join('');
}

// ── GOKU ──
let gokuAttacking=false;
function gokuAttack(){
  if(gokuAttacking)return;
  gokuAttacking=true;
  const sprite=document.getElementById('goku-sprite');
  const beam=document.getElementById('energy-beam');
  const target=document.getElementById('portfolio-target');
  const btn=document.getElementById('goku-btn');
  btn.textContent='⚡ CARGANDO...';
  btn.disabled=true;
  sprite.classList.add('goku-charging');
  // Spawn ki balls
  for(let i=0;i<8;i++){
    setTimeout(()=>{spawnKiBall(sprite);},i*80);
  }
  setTimeout(()=>{
    sprite.textContent='🔥';
    setTimeout(()=>{
      beam.style.width='calc(85% - 60px)';
      setTimeout(()=>{
        target.classList.add('goku-hit');
        // Sparks
        for(let i=0;i<12;i++){
          setTimeout(()=>{spawnKiBall(target,true);},i*50);
        }
        setTimeout(()=>{
          beam.style.width='0';
          sprite.textContent='🐉';
          sprite.classList.remove('goku-charging');
          target.classList.remove('goku-hit');
          btn.textContent='⚡ KAMEHAMEHA!';
          btn.disabled=false;
          gokuAttacking=false;
        },1200);
      },600);
    },400);
  },800);
}
function spawnKiBall(el,burst){
  const container=document.getElementById('ki-balls');
  const rect=el.getBoundingClientRect();
  const mainRect=document.getElementById('main').getBoundingClientRect();
  const ball=document.createElement('div');
  ball.className='ki-ball';
  const tx=(Math.random()-0.5)*(burst?120:60);
  const ty=(Math.random()-0.5)*(burst?120:60)-30;
  ball.style.setProperty('--tx',tx+'px');
  ball.style.setProperty('--ty',ty+'px');
  ball.style.left=(rect.left-mainRect.left+rect.width/2-6)+'px';
  ball.style.top=(rect.top-mainRect.top+rect.height/2-6)+'px';
  container.appendChild(ball);
  setTimeout(()=>ball.remove(),1000);
}

// ── SPA NAVIGATION ──
function showPage(page){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.sb-item').forEach(i=>i.classList.remove('active'));
  const el=document.getElementById('page-'+page);
  if(el){el.classList.add('active');el.classList.remove('fade-in');void el.offsetWidth;el.classList.add('fade-in');}
  document.querySelectorAll('.sb-item').forEach(i=>{
    if(i.getAttribute('onclick')&&i.getAttribute('onclick').includes("'"+page+"'"))i.classList.add('active');
  });
  window.scrollTo({top:0,behavior:'smooth'});
  // Close sidebar on mobile
  if(window.innerWidth<=768)document.getElementById('sidebar').classList.remove('open');
}

// ── SIDEBAR ──
function toggleSidebar(){
  document.getElementById('sidebar').classList.toggle('open');
}

// ── CURSOR ──
const cursor=document.getElementById('cursor');
const trail=document.getElementById('cursor-trail');
document.addEventListener('mousemove',e=>{
  cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px';
  setTimeout(()=>{trail.style.left=e.clientX+'px';trail.style.top=e.clientY+'px';},80);
});

// ── COPY EMAIL ──
function copyEmail(){
  const email='ypd651@github.com';
  navigator.clipboard.writeText(email).then(()=>{
    document.getElementById('email-txt').textContent='¡Copiado! '+email;
    setTimeout(()=>document.getElementById('email-txt').textContent='Click para copiar',2000);
  });
}

// ── TYPING EFFECT ──
const phrases=['// FULL STACK DEVELOPER','// OPEN SOURCE LOVER','// GAMER AT HEART','// BUG HUNTER 9000'];
let phraseIdx=0,charIdx=0,typing=true;
function typeEffect(){
  const el=document.getElementById('typing-sub');
  if(!el)return;
  if(typing){
    el.textContent=phrases[phraseIdx].slice(0,charIdx+1);
    charIdx++;
    if(charIdx>=phrases[phraseIdx].length){typing=false;setTimeout(typeEffect,2000);return;}
  }else{
    el.textContent=phrases[phraseIdx].slice(0,charIdx-1);
    charIdx--;
    if(charIdx<=0){typing=true;phraseIdx=(phraseIdx+1)%phrases.length;setTimeout(typeEffect,400);return;}
  }
  setTimeout(typeEffect,typing?100:50);
}

// ── INIT ──
window.addEventListener('load',()=>{
  setTimeout(()=>{
    document.getElementById('loading-screen').style.opacity='0';
    document.getElementById('loading-screen').style.transition='opacity .5s';
    setTimeout(()=>document.getElementById('loading-screen').style.display='none',500);
    fetchRepos();
    buildGallery();
    typeEffect();
  },2600);
});

// ESC closes modal
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal();});