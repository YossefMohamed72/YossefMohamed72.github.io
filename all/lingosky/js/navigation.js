/* =========================================================
   LINGOSKY — NAVIGATION
   Sticky navbar, mobile menu, active link, page transitions
   ========================================================= */
(function(){
  function initNavbarScroll(){
    const nav = document.getElementById('navbar');
    if(!nav) return;
    const onScroll = () => {
      if(window.scrollY > 40){ nav.classList.add('scrolled'); }
      else{ nav.classList.remove('scrolled'); }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, {passive:true});
  }

  function initMobileMenu(){
    const hamburger = document.getElementById('hamburger');
    const menu = document.getElementById('mobile-menu');
    if(!hamburger || !menu) return;
    const toggle = () => {
      hamburger.classList.toggle('open');
      menu.classList.toggle('open');
      document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
    };
    hamburger.addEventListener('click', toggle);
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      menu.classList.remove('open');
      document.body.style.overflow = '';
    }));
  }

  function markActiveLink(){
    // NOTE: this used to query ".nav-link", a class that doesn't exist
    // anywhere in the markup (the real class is "lingo-nav-link"), so
    // the desktop nav never actually got an active state. Fixed below.
    const current = (location.pathname.split('/').pop() || 'index.html');
    const isCurrent = (href) => href === current || (current === '' && href === 'index.html');

    document.querySelectorAll('.lingo-nav-link, .mobile-link, .lingo-nav-dropdown-link').forEach(a => {
      if(isCurrent(a.getAttribute('href'))){
        a.classList.add('active');
      }
    });

    // If the active page lives inside the "More" dropdown, also highlight the toggle.
    const moreToggle = document.getElementById('nav-more-toggle');
    const moreMenu = document.getElementById('nav-more-menu');
    if(moreToggle && moreMenu && moreMenu.querySelector('.lingo-nav-dropdown-link.active')){
      moreToggle.classList.add('active');
    }
  }

  function initNavDropdown(){
    const toggle = document.getElementById('nav-more-toggle');
    const menu = document.getElementById('nav-more-menu');
    const wrapper = toggle ? toggle.closest('.lingo-nav-dropdown') : null;
    if(!toggle || !menu || !wrapper) return;

    const closeMenu = () => {
      wrapper.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    };
    const openMenu = () => {
      wrapper.classList.add('open');
      toggle.setAttribute('aria-expanded', 'true');
    };

    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      wrapper.classList.contains('open') ? closeMenu() : openMenu();
    });

    document.addEventListener('click', (e) => {
      if(!wrapper.contains(e.target)) closeMenu();
    });

    document.addEventListener('keydown', (e) => {
      if(e.key === 'Escape'){
        closeMenu();
        if(document.activeElement && wrapper.contains(document.activeElement)) toggle.focus();
      }
    });

    // Close when a dropdown link is followed, so it doesn't stay open on the next page.
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  }

  function initPageTransitions(){
    const overlay = document.getElementById('page-transition');
    if(!overlay) return;

    // Entering this page: wipe away
    overlay.classList.add('leave');

    document.querySelectorAll('a[href$=".html"]').forEach(link => {
      if(link.hostname !== window.location.hostname) return;
      link.addEventListener('click', function(e){
        const href = this.getAttribute('href');
        if(!href || href.startsWith('#')) return;
        e.preventDefault();
        overlay.classList.remove('leave');
        overlay.classList.add('enter');
        setTimeout(() => { window.location.href = href; }, 480);
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initNavbarScroll();
    initMobileMenu();
    initNavDropdown();
    markActiveLink();
    initPageTransitions();
  });
})();
