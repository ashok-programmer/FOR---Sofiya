const $=s=>document.querySelector(s);const $$=s=>[...document.querySelectorAll(s)];
const birth=new Date('2009-09-06T00:00:00+04:00');
function counter(){const now=new Date();let ms=Math.max(0,now-birth);const sec=Math.floor(ms/1000),days=Math.floor(sec/86400),hrs=Math.floor(sec%86400/3600),mins=Math.floor(sec%3600/60),s=sec%60;const y=now.getFullYear()-2009;$('#ageCounter').textContent=`${y} years · ${days} days · ${String(hrs).padStart(2,'0')}:${String(mins).padStart(2,'0')}:${String(s).padStart(2,'0')}`}
counter();setInterval(counter,1000);
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});$$('.reveal').forEach(e=>io.observe(e));
function openLetter(card){card.querySelector('.envelope').style.display='none';card.querySelector('.letter-view').classList.add('show');card.classList.add('open')}
$$('[data-letter]').forEach(card=>card.addEventListener('click',()=>openLetter(card)));
$$('.slowly-item').forEach(card=>card.addEventListener('click',()=>openLetter(card)));
const steps=$$('.step');let idx=0;function renderStep(){steps.forEach((s,i)=>s.classList.toggle('active',i===idx));$('#p5progress').textContent=`${String(idx+1).padStart(2,'0')} / 31`;$('#prev').disabled=idx===0;$('#next').textContent=idx===steps.length-1?'DONE':'NEXT';}function go(n){idx=Math.max(0,Math.min(steps.length-1,n));renderStep();document.querySelector('#p5 .conv-stage').scrollIntoView({behavior:'smooth',block:'center'})}$('#prev').onclick=()=>go(idx-1);$('#next').onclick=()=>go(idx+1);steps.forEach(s=>{const r=s.querySelector('.tap-reveal');if(r)r.addEventListener('click',e=>{e.stopPropagation();if(!r.classList.contains('open'))r.classList.add('open')});});renderStep();
$('#lastThing').onclick=()=>$('#modal').classList.add('show');$('#modal').addEventListener('click',e=>{if(e.target.id==='modal'||e.target.id==='closeModal')$('#modal').classList.remove('show')});

// V6 ambient cursor light — subtle, never neon
window.addEventListener('pointermove', e=>{document.documentElement.style.setProperty('--mx',e.clientX+'px');document.documentElement.style.setProperty('--my',e.clientY+'px')},{passive:true});

// Tiny floating particles only on capable displays; keeps the page lightweight.
(function(){
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const layer=document.createElement('div');
  layer.className='ambient-particles';
  layer.setAttribute('aria-hidden','true');
  Object.assign(layer.style,{position:'fixed',inset:'0',pointerEvents:'none',zIndex:'58',overflow:'hidden'});
  for(let i=0;i<14;i++){
    const p=document.createElement('i');
    const size=(Math.random()*2+1).toFixed(1)+'px';
    Object.assign(p.style,{position:'absolute',width:size,height:size,borderRadius:'50%',background:'rgba(205,170,240,.38)',left:(Math.random()*100)+'%',top:(Math.random()*100)+'%',opacity:(.12+Math.random()*.35).toFixed(2),filter:'blur(.2px)',animation:`particleFloat ${10+Math.random()*12}s ease-in-out ${-Math.random()*10}s infinite`});
    layer.appendChild(p);
  }
  document.body.appendChild(layer);
  const style=document.createElement('style');
  style.textContent='@keyframes particleFloat{0%,100%{transform:translate3d(0,0,0);opacity:.08}50%{transform:translate3d(12px,-18px,0);opacity:.45}}';
  document.head.appendChild(style);
})();
