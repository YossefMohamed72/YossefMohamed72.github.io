(()=>{
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
 const nativeTransitions=('onpageswap' in window)&&('onpagereveal' in window);
 const italian=document.documentElement.lang==='it';
 const overlay=document.createElement('div');overlay.className='page-curtain';overlay.setAttribute('aria-hidden','true');overlay.innerHTML='<span></span>';document.body.append(overlay);
 let navigating=false;
 window.addEventListener('pageshow',()=>{navigating=false;document.body.classList.remove('page-leaving');if(!document.querySelector('.brand-intro:not(.intro-finished)'))document.getElementById('app').inert=false});
 document.addEventListener('click',event=>{
  const a=event.target.closest('a[href]');if(!a||event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||a.hasAttribute('download')||a.target&&a.target!=='_self')return;
  const url=new URL(a.href,location.href);if(url.origin!==location.origin||!/^https?:$/.test(url.protocol)||url.pathname===location.pathname&&url.search===location.search)return;
  if(reduced.matches||nativeTransitions)return;
  if(navigating){event.preventDefault();return}navigating=true;event.preventDefault();document.body.classList.add('page-leaving');
  setTimeout(()=>location.assign(url.href),260);
 });
 if(!reduced.matches&&!nativeTransitions)document.body.classList.add('page-arriving');
 function nameImages(){const seen=new Set();document.querySelectorAll('[data-product] .productimage img,[data-shared-product]').forEach(img=>{const id=img.dataset.sharedProduct||img.closest('[data-product]')?.dataset.product;if(!id||seen.has(id)){img.style.viewTransitionName='none';return}seen.add(id);img.style.viewTransitionName='produce-'+id});}
 nameImages();new MutationObserver(nameImages).observe(document.getElementById('app'),{childList:true,subtree:true});
 let seen=false;try{seen=sessionStorage.getItem('agrivito-intro-v1')==='seen'}catch{}
 if(seen||reduced.matches)return;
 try{sessionStorage.setItem('agrivito-intro-v1','seen')}catch{}
 const intro=document.createElement('section');intro.className='brand-intro';intro.setAttribute('aria-label',italian?'Benvenuto in AgriVito':'Welcome to AgriVito');
 intro.innerHTML=`<div class="intro-orbit orbit-one"></div><div class="intro-orbit orbit-two"></div><div class="intro-content"><div class="intro-crest"><img src="${new URL('assets/logo.jpeg',document.baseURI).href}" alt="AgriVito"></div><div class="intro-rule"></div><div class="intro-name">AgriVito</div><p class="intro-years">${italian?'15 ANNI DI ESPERIENZA':'15 YEARS OF EXPERTISE'}</p><p class="intro-tagline">${italian?'Dai nostri campi al mondo.':'From our farms to the world.'}</p></div><div class="intro-bottom"><span>${italian?'COLTIVIAMO IL DOMANI':'GROWING TOMORROW'}</span><div class="intro-progress"><i></i></div><button class="intro-skip">${italian?'Salta intro':'Skip intro'} ↗</button></div>`;
 document.body.append(intro);document.body.classList.add('intro-active');const app=document.getElementById('app');app.inert=true;
 const previous=document.activeElement;const skip=intro.querySelector('button');skip.focus({preventScroll:true});let closed=false;
 function finish(){if(closed)return;closed=true;intro.classList.add('intro-finished');app.inert=false;document.body.classList.remove('intro-active');document.body.classList.add('intro-complete');if(previous&&previous!==document.body)previous.focus({preventScroll:true});else skip.blur();setTimeout(()=>intro.remove(),650)}
 skip.addEventListener('click',finish);intro.addEventListener('keydown',e=>{if(e.key==='Escape')finish()});setTimeout(finish,2400);
})();
