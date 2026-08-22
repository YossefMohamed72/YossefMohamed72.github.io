/* =========================================================
   LINGOSKY — CINEMATIC LOADING SCREEN + AIRPLANE INTRO
   Runs on the homepage only. Skips automatically for
   returning visitors (localStorage) unless "Replay" is used.
   ========================================================= */
(function(){
  const SEEN_KEY = 'lingosky_intro_seen';

  function buildMarkers(){
    const wrap = document.getElementById('intro-markers');
    if(!wrap) return;
    const points = [
      {top:'34%',left:'8%'},   // near start
      {top:'30%',left:'22%'},  // Europe
      {top:'46%',left:'30%'},  // Africa
      {top:'38%',left:'48%'},  // Middle East
      {top:'32%',left:'62%'},  // Asia
      {top:'40%',left:'55%'},  // UAE approach
    ];
    points.forEach((p,i) => {
      const dot = document.createElement('span');
      dot.className = 'intro-marker';
      dot.style.top = p.top;
      dot.style.left = p.left;
      dot.style.animationDelay = (0.6 + i*0.9) + 's';
      wrap.appendChild(dot);
      requestAnimationFrame(() => setTimeout(()=>dot.classList.add('ping'), 50));
    });
  }

  function runIntro(fast){
    const loading = document.getElementById('loading-screen');
    const intro = document.getElementById('intro');
    const scenes = intro ? intro.querySelectorAll('.intro-scene') : [];
    const plane = document.getElementById('intro-plane');
    const route = document.getElementById('intro-route');
    const skip = document.getElementById('skip-intro');
    const body = document.body;

    if(!loading || !intro){ return; }

    body.style.overflow = 'hidden';
    const timers = [];
    const T = (fn, t) => timers.push(setTimeout(fn, t));

    function finish(){
      timers.forEach(clearTimeout);
      intro.classList.add('hide');
      body.style.overflow = '';
      localStorage.setItem(SEEN_KEY, '1');
      setTimeout(() => { intro.style.display = 'none'; document.getElementById('homepage-content')?.classList.add('ready'); }, 800);
    }

    if(skip) skip.addEventListener('click', finish);

    // Loading screen duration
    const loadDur = fast ? 900 : 2000;
    T(() => {
      loading.classList.add('hide');
      intro.classList.add('active');
      scenes[0]?.classList.add('on');
      buildMarkers();
    }, loadDur);

    if(fast){
      // Returning visitor: short version — brand reveal only
      T(() => { scenes.forEach(s=>s.classList.remove('on')); scenes[4]?.classList.add('on'); document.getElementById('intro-brand')?.classList.add('show'); }, loadDur + 300);
      T(finish, loadDur + 2600);
      return;
    }

    // Scene 1 -> 2: map + plane launch
    T(() => {
      scenes[0]?.classList.remove('on');
      scenes[1]?.classList.add('on');
      route?.classList.add('draw');
      plane?.classList.add('fly');
    }, loadDur + 900);

    // Scene 3: UAE skyline
    T(() => {
      document.getElementById('intro-city')?.classList.add('show');
    }, loadDur + 6200);

    // Scene 4: brand reveal
    T(() => {
      scenes[1]?.classList.remove('on');
      scenes[2]?.classList.add('on');
      document.getElementById('intro-brand')?.classList.add('show');
    }, loadDur + 7600);

    // Finish
    T(finish, loadDur + 10600);
  }

  function initReplay(){
    const btn = document.getElementById('replay-journey');
    if(!btn) return;
    btn.addEventListener('click', () => {
      window.location.href = 'index.html?replay=1';
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initReplay();
    const introEl = document.getElementById('intro');
    if(!introEl) return; // not homepage

    const params = new URLSearchParams(window.location.search);
    const forceReplay = params.get('replay') === '1';
    const seen = localStorage.getItem(SEEN_KEY);

    if(forceReplay) localStorage.removeItem(SEEN_KEY);
    runIntro(!!seen && !forceReplay);
  });
})();
