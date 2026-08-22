/* =========================================================
   LINGOSKY — ANIMATION SYSTEM
   Scroll reveal, counters, custom cursor, 3D tilt, FAQ, particles
   ========================================================= */
(function(){

  /* ---------- Scroll reveal ---------- */
  function initReveal(){
    const els = document.querySelectorAll('[data-reveal]');
    if(!els.length) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          const delay = entry.target.getAttribute('data-reveal-delay') || 0;
          setTimeout(() => entry.target.classList.add('in'), Number(delay));
          obs.unobserve(entry.target);
        }
      });
    }, {threshold:.16});
    els.forEach(el => obs.observe(el));
  }

  /* ---------- Counters ---------- */
  function initCounters(){
    const counters = document.querySelectorAll('[data-count]');
    if(!counters.length) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'), 10);
        const suffix = el.getAttribute('data-suffix') || '';
        const duration = 1800;
        const start = performance.now();
        function tick(now){
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.floor(eased * target).toLocaleString('en-US') + suffix;
          if(p < 1) requestAnimationFrame(tick);
          else el.textContent = target.toLocaleString('en-US') + suffix;
        }
        requestAnimationFrame(tick);
        obs.unobserve(el);
      });
    }, {threshold:.5});
    counters.forEach(c => obs.observe(c));
  }

  /* ---------- Custom cursor (desktop only) ---------- */
  function initCursor(){
    if(window.matchMedia('(hover: none), (pointer: coarse)').matches) return;
    const dot = document.createElement('div');
    dot.id = 'cursor-dot';
    document.body.appendChild(dot);
    window.addEventListener('mousemove', e => {
      dot.style.left = e.clientX + 'px';
      dot.style.top = e.clientY + 'px';
    });
    document.querySelectorAll('a, button, .card-tilt, input, textarea, select').forEach(el => {
      el.addEventListener('mouseenter', () => dot.classList.add('grow'));
      el.addEventListener('mouseleave', () => dot.classList.remove('grow'));
    });
  }

  /* ---------- 3D card tilt ---------- */
  function initTilt(){
    const cards = document.querySelectorAll('.card-tilt');
    if(window.matchMedia('(hover: none)').matches) return;
    cards.forEach(card => {
      card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - .5;
        const y = (e.clientY - r.top) / r.height - .5;
        card.style.transform = `perspective(900px) rotateY(${x*6}deg) rotateX(${-y*6}deg) translateY(-4px)`;
      });
      card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });
  }

  /* ---------- Magnetic buttons ---------- */
  function initMagnetic(){
    if(window.matchMedia('(hover: none)').matches) return;
    document.querySelectorAll('.btn-gold, .btn-outline').forEach(btn => {
      btn.addEventListener('mousemove', e => {
        const r = btn.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width/2) * .25;
        const y = (e.clientY - r.top - r.height/2) * .35;
        btn.style.transform = `translate(${x}px,${y}px)`;
      });
      btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
    });
  }

  /* ---------- Gold particles ambient field ---------- */
  function initParticles(container, count){
    if(!container) return;
    for(let i=0;i<count;i++){
      const p = document.createElement('span');
      p.className = 'particle-gold';
      const size = 2 + Math.random()*3;
      p.style.width = size+'px';
      p.style.height = size+'px';
      p.style.left = Math.random()*100+'%';
      p.style.bottom = (Math.random()*40)+'px';
      p.style.animationDelay = (Math.random()*8)+'s';
      p.style.animationDuration = (6+Math.random()*6)+'s';
      container.appendChild(p);
    }
  }

  /* ---------- FAQ accordion ---------- */
  function initFAQ(){
    document.querySelectorAll('.faq-item').forEach(item => {
      const trigger = item.querySelector('.faq-q');
      const panel = item.querySelector('.faq-a');
      if(!trigger || !panel) return;
      trigger.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item.open').forEach(o => {
          o.classList.remove('open');
          o.querySelector('.faq-a').style.maxHeight = null;
        });
        if(!isOpen){
          item.classList.add('open');
          panel.style.maxHeight = panel.scrollHeight + 'px';
        }
      });
    });
  }

  window.LingoSkyAnim = { initParticles };

  document.addEventListener('DOMContentLoaded', () => {
    initReveal();
    initCounters();
    initCursor();
    initTilt();
    initMagnetic();
    initFAQ();
  });
})();
