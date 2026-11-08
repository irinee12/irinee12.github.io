(()=>{
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const calm=matchMedia('(prefers-reduced-motion:reduce)').matches,hov=matchMedia('(hover:hover)').matches;
let mx=-999,my=-999;

// efek partikel saat ditekan
function burst(x,y,n=10,set=['💗','✨','🌸','🫧','⭐','🎀']){if(calm)return;
 for(let i=0;i<n;i++){const e=document.createElement('span');e.className='fx';e.textContent=set[Math.random()*set.length|0];e.style.left=x+'px';e.style.top=y+'px';document.body.append(e);
  const a=Math.random()*6.28,d=40+Math.random()*100;
  e.animate([{transform:'translate(0,0) scale(.4)',opacity:1},{transform:`translate(${Math.cos(a)*d}px,${Math.sin(a)*d-40}px) scale(1.2) rotate(${Math.random()*240-120}deg)`,opacity:0}],{duration:800+Math.random()*500,easing:'cubic-bezier(.2,.8,.3,1)'}).onfinish=()=>e.remove()}}

// teks: huruf-huruf hidup
const hop=s=>s.animate([{transform:'none'},{transform:'translateY(-.35em) rotate(-10deg) scale(1.2)',color:'#E85D8A'},{transform:'none'}],{duration:600,easing:'cubic-bezier(.3,1.8,.5,1)'});
function split(el){const t=el.textContent.trim();el.setAttribute('aria-label',t);el.textContent='';let i=0;
 t.split(' ').forEach((w,k,a)=>{const W=document.createElement('span');W.className='w';W.setAttribute('aria-hidden','true');
  [...w].forEach(ch=>{const s=document.createElement('span');s.className='l';s.textContent=ch;s.style.setProperty('--i',i++);s.onpointerenter=()=>hop(s);s.onclick=e=>burst(e.clientX,e.clientY,6);W.append(s)});
  el.append(W);if(k<a.length-1)el.append(' ')})}
$$('h1,h2').forEach(split);

// urutan muncul tiap slide
$$('.slide').forEach(s=>$$('.hello,.role,.heroin>div,.hint,.sub,.about p,.card,.soft,.grp,.chips button,.note,.big,.links,.foot',s).forEach((e,i)=>{e.classList.add('pop');e.style.setProperty('--i',i)}));

// klik di mana saja, kursor lembut
addEventListener('pointerdown',e=>burst(e.clientX,e.clientY,8));
addEventListener('pointermove',e=>{mx=e.clientX;my=e.clientY});
const cur=$('#cur');let cx=0,cy=0;
if(hov&&!calm){(function f(){cx+=(mx-cx)*.18;cy+=(my-cy)*.18;cur.style.transform=`translate(${cx}px,${cy}px)`;requestAnimationFrame(f)})();
 addEventListener('pointerover',e=>cur.classList.toggle('big',!!e.target.closest('a,button,.pet')))}

// mengetik peran
const roles=['UI/UX Designer','Front-End Developer','pengembang IoT & web','pencinta antarmuka yang ramah'],ty=$('#typed');let r=0,c=0,del=false;
(function tick(){const w=roles[r];ty.textContent=w.slice(0,c);if(calm){ty.textContent=roles[0];return}
 if(!del&&c<w.length)c++;else if(!del){del=true;return setTimeout(tick,1400)}else if(c>0)c--;else{del=false;r=(r+1)%roles.length}
 setTimeout(tick,del?35:80)})();

// tombol magnet
if(!calm&&hov)$$('.magnet').forEach(b=>{b.onpointermove=e=>{const q=b.getBoundingClientRect();b.style.transform=`translate(${(e.clientX-q.x-q.width/2)*.25}px,${(e.clientY-q.y-q.height/2)*.35}px)`};b.onpointerleave=()=>b.style.transform=''});

// kartu, chip, avatar, email
$$('.card').forEach(k=>{k.onclick=()=>{const on=k.classList.toggle('on');k.setAttribute('aria-pressed',on);if(on){const b=k.getBoundingClientRect();burst(b.x+b.width/2,b.y+b.height/2,8)}};k.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();k.click()}}});
$$('.chips button').forEach(b=>b.onclick=e=>{b.classList.remove('boing');void b.offsetWidth;b.classList.add('boing');burst(e.clientX||0,e.clientY||0,7,['🫧','✨','💗'])});
$('#avatar').onclick=e=>{e.currentTarget.animate([{rotate:'0deg'},{rotate:'360deg'}],{duration:700,easing:'cubic-bezier(.3,1.4,.5,1)'});burst(e.clientX,e.clientY,12)};
const toast=$('#toast');$('#copy').onclick=async e=>{try{await navigator.clipboard.writeText('Irinee120906@gmail.com');toast.textContent='Email tersalin 💌'}catch{toast.textContent='Email: Irinee120906@gmail.com'}
 toast.classList.add('show');burst(e.clientX,e.clientY,16);setTimeout(()=>toast.classList.remove('show'),2200)};

// maskot: mata mengikuti kursor, berubah warna & bicara tiap slide
const pet=$('#pet'),say=$('#say'),pus=$$('.pu',pet);
const lines=['Halo! Aku Irine, tekan aku ya 🌷','Ini cerita singkat tentang aku','Empat proyek, satu per satu!','Ini peralatan tempurku 🛠️','Begini cara kerjaku 💪','Ayo ngobrol, aku tunggu! 💌'];
const pal=[['#FFB6CB','#F28BB0'],['#D9C2FA','#B79BF0'],['#FFE59A','#FFC970'],['#BDE8D4','#8ED3B4'],['#FFC0D0','#E4A0F0'],['#FFB6CB','#F28BB0']];
const chat=['Hehe, geli! 🤭','Kamu baik banget 💗','Aku suka warna pink!','Coba lihat proyek IoT-ku 🐟','Magang di tempatmu? Boleh banget!'];
function talk(t){say.textContent=t;say.classList.remove('in');void say.offsetWidth;say.classList.add('in')}
function jump(){pet.classList.remove('jump');void pet.offsetWidth;pet.classList.add('jump')}
addEventListener('pointermove',e=>{const q=pet.getBoundingClientRect(),dx=e.clientX-q.x-q.width/2,dy=e.clientY-q.y-q.height/2,a=Math.atan2(dy,dx),d=Math.min(1,Math.hypot(dx,dy)/220)*q.width*.05;
 pus.forEach(p=>p.style.transform=`translate(${Math.cos(a)*d}px,${Math.sin(a)*d}px)`)});
pet.onclick=e=>{jump();pet.classList.add('wow');setTimeout(()=>pet.classList.remove('wow'),700);burst(e.clientX,e.clientY,14);talk(chat[Math.random()*chat.length|0])};
pet.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();pet.click()}};

// slide: ledakan lingkaran dari titik yang ditekan
const slides=$$('.slide'),ids=slides.map(s=>s.id),dots=$('#dots');let cur_=-1,lock=0;
slides.forEach((s,i)=>{const d=document.createElement('button');d.setAttribute('aria-label','Ke slide '+(i+1));d.onclick=e=>go(i,e.clientX,e.clientY);dots.append(d)});
function go(n,x,y,quiet){n=Math.max(0,Math.min(slides.length-1,n));if(n===cur_)return;const old=slides[cur_],nw=slides[n];
 x??=innerWidth/2;y??=innerHeight/2;cur_=n;
 slides.forEach(s=>s.classList.remove('under'));
 if(old){old.classList.remove('active');old.classList.add('under');old.inert=true}
 nw.classList.add('active');nw.inert=false;nw.scrollTop=0;
 if(old&&!calm){nw.animate([{clipPath:`circle(0px at ${x}px ${y}px)`},{clipPath:`circle(150vmax at ${x}px ${y}px)`}],{duration:950,easing:'cubic-bezier(.65,0,.25,1)'}).onfinish=()=>old.classList.remove('under')}
 else if(old)old.classList.remove('under');
 slides.forEach(s=>{if(s!==nw&&s!==old)s.inert=true});
 $$('button',dots).forEach((d,i)=>d.classList.toggle('on',i===n));
 $$('.nav nav a').forEach(a=>a.classList.toggle('now',+a.dataset.go===n));
 $('#prev').disabled=n===0;$('#next').disabled=n===slides.length-1;
 document.body.dataset.s=n;pet.style.setProperty('--pc1',pal[n][0]);pet.style.setProperty('--pc2',pal[n][1]);
 if(!quiet){talk(lines[n]);jump();burst(x,y,14)}else talk(lines[n]);
 history.replaceState(null,'','#'+ids[n])}
$$('[data-go]').forEach(a=>a.onclick=e=>{e.preventDefault();go(+a.dataset.go,e.clientX,e.clientY)});
$('#prev').onclick=e=>go(cur_-1,e.clientX,e.clientY);$('#next').onclick=e=>go(cur_+1,e.clientX,e.clientY);
addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='PageDown')go(cur_+1);if(e.key==='ArrowLeft'||e.key==='PageUp')go(cur_-1)});
addEventListener('wheel',e=>{const s=slides[cur_];if(s.scrollHeight>s.clientHeight+4||Date.now()-lock<1100||Math.abs(e.deltaY)<20)return;lock=Date.now();go(cur_+(e.deltaY>0?1:-1),e.clientX,e.clientY)},{passive:true});
let sx,sy;const st=$('.stage');st.addEventListener('pointerdown',e=>{if(e.pointerType==='touch'){sx=e.clientX;sy=e.clientY}});
st.addEventListener('pointerup',e=>{if(sx==null)return;const dx=e.clientX-sx,dy=e.clientY-sy;sx=null;if(Math.abs(dx)>60&&Math.abs(dx)>Math.abs(dy)*1.5)go(cur_+(dx<0?1:-1),e.clientX,e.clientY)});
go(Math.max(0,ids.indexOf(location.hash.slice(1))),null,null,true);

// partikel melayang yang menghindari kursor
if(!calm){const cv=$('#fx2'),g=cv.getContext('2d'),em=['💗','✨','🌸','🫧','⭐'];let W,H;const rs=()=>{W=cv.width=innerWidth;H=cv.height=innerHeight};rs();addEventListener('resize',rs);
 const ps=Array.from({length:innerWidth<700?16:32},()=>({x:Math.random()*W,y:Math.random()*H,s:14+Math.random()*20,v:.2+Math.random()*.5,e:em[Math.random()*5|0],o:Math.random()*6,vx:0,vy:0}));
 (function f(){g.clearRect(0,0,W,H);g.globalAlpha=.55;
  for(const p of ps){const dx=p.x-mx,dy=p.y-my,d=Math.hypot(dx,dy);if(d<130){p.vx+=dx/d*1.2;p.vy+=dy/d*1.2}
   p.vx*=.92;p.vy*=.92;p.o+=.02;p.x+=p.vx+Math.sin(p.o)*.4;p.y+=p.vy-p.v;if(p.y<-40){p.y=H+40;p.x=Math.random()*W}if(p.x<-40)p.x=W+40;if(p.x>W+40)p.x=-40;
   g.font=p.s+'px serif';g.fillText(p.e,p.x,p.y)}
  requestAnimationFrame(f)})()}
})();
