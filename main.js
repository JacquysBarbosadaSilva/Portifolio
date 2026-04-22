// ====== Year + local time ======
document.documentElement.classList.add('js');
document.getElementById('year').textContent = new Date().getFullYear();
function tick(){
  const d = new Date();
  const hh = String(d.getHours()).padStart(2,'0');
  const mm = String(d.getMinutes()).padStart(2,'0');
  document.getElementById('local-time').textContent = `${hh}:${mm}`;
}
tick(); setInterval(tick, 30000);

// ====== Eyes follow cursor + blink ======
(function(){
  const eyes = document.querySelectorAll('.menu .eyes .eye');
  if(!eyes.length) return;
  document.addEventListener('mousemove', e => {
    eyes.forEach(eye=>{
      const r = eye.getBoundingClientRect();
      const cx = r.left + r.width/2, cy = r.top + r.height/2;
      const ang = Math.atan2(e.clientY - cy, e.clientX - cx);
      const dist = 4;
      const x = Math.cos(ang)*dist, y = Math.sin(ang)*dist;
      const pupil = eye.querySelector('span');
      if(pupil) pupil.style.transform = `translate(${x}px, ${y}px)`;
    });
  });
  // Blink
  const eyesWrap = document.querySelector('.menu .eyes');
  setInterval(()=>{
    if(!eyesWrap) return;
    eyesWrap.classList.add('blink');
    setTimeout(()=>eyesWrap.classList.remove('blink'), 140);
  }, 4200);
})();

// ====== Section background color changes ======
(function(){
  const sections = document.querySelectorAll('.m[data-bg]');
  const obs = new IntersectionObserver(entries=>{
    entries.forEach(en=>{
      if(en.isIntersecting && en.intersectionRatio > 0.45){
        const bg = en.target.dataset.bg;
        document.body.classList.remove('bg-cream','bg-purple','bg-dark');
        document.body.classList.add('bg-'+bg);
      }
    });
  }, { threshold:[0.45, 0.6] });
  sections.forEach(s => obs.observe(s));
})();

// ====== Reveal on scroll ======
(function(){
  const targets = document.querySelectorAll('.section-head, .project-card, .cert-card, .push-line, .bio, .tech-pills, .contact-inner');
  targets.forEach(t => t.classList.add('reveal'));
  const io = new IntersectionObserver(entries=>{
    entries.forEach(en=>{
      if(en.isIntersecting){
        en.target.classList.add('in');
        io.unobserve(en.target);
      }
    });
  }, { threshold:0.15 });
  targets.forEach(t => io.observe(t));
  // Failsafe
  setTimeout(()=> targets.forEach(t=>t.classList.add('in')), 3500);
})();

// ====== 3D tilt on cards ======
(function(){
  const cards = document.querySelectorAll('[data-tilt]');
  cards.forEach(card=>{
    let rect;
    card.addEventListener('mouseenter', ()=>{ rect = card.getBoundingClientRect(); });
    card.addEventListener('mousemove', e=>{
      if(!rect) rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - .5;
      const y = (e.clientY - rect.top) / rect.height - .5;
      card.style.transform = `perspective(900px) rotateY(${x*10}deg) rotateX(${-y*10}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', ()=>{ card.style.transform = ''; });
  });
})();

// ====== Floating emojis (push-titles) ======
(function(){
  document.querySelectorAll('[data-float]').forEach((el,i)=>{
    el.style.animation = `floatY ${5 + i*0.6}s ease-in-out infinite`;
    el.style.animationDelay = `${i*0.4}s`;
  });
})();

// ====== Smooth-scroll active link highlight ======
(function(){
  const links = document.querySelectorAll('.menu nav .primary[href^="#"]');
  const map = {};
  links.forEach(a=>{
    const id = a.getAttribute('href').slice(1);
    const sec = document.getElementById(id);
    if(sec) map[id] = a;
  });
  const io = new IntersectionObserver(entries=>{
    entries.forEach(en=>{
      if(en.isIntersecting){
        Object.values(map).forEach(a=>a.classList.remove('home'));
        const link = map[en.target.id];
        if(link) link.classList.add('home');
      }
    });
  }, { threshold:.4 });
  Object.keys(map).forEach(id => io.observe(document.getElementById(id)));
})();
