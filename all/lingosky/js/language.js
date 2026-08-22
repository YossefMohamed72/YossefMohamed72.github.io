/* =========================================================
   LINGOSKY — LANGUAGE SYSTEM
   Reads data-en / data-ar attributes and swaps content + dir.
   ========================================================= */
(function(){
  const STORAGE_KEY = 'lingosky_lang';

  function applyLanguage(lang){
    const html = document.documentElement;
    html.setAttribute('lang', lang);
    html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

    document.querySelectorAll('[data-en]').forEach(el => {
      const val = lang === 'ar' ? el.getAttribute('data-ar') : el.getAttribute('data-en');
      if (val !== null) el.textContent = val;
    });

    document.querySelectorAll('[data-en-html]').forEach(el => {
      const val = lang === 'ar' ? el.getAttribute('data-ar-html') : el.getAttribute('data-en-html');
      if (val !== null) el.innerHTML = val;
    });

    document.querySelectorAll('[data-en-placeholder]').forEach(el => {
      const val = lang === 'ar' ? el.getAttribute('data-ar-placeholder') : el.getAttribute('data-en-placeholder');
      if (val !== null) el.setAttribute('placeholder', val);
    });

    document.querySelectorAll('.lang-switch button').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    document.querySelectorAll('[data-en-aria]').forEach(el => {
      const val = lang === 'ar' ? el.getAttribute('data-ar-aria') : el.getAttribute('data-en-aria');
      if (val !== null) el.setAttribute('aria-label', val);
    });

    localStorage.setItem(STORAGE_KEY, lang);
  }

  function initLanguage(){
    const saved = localStorage.getItem(STORAGE_KEY) || 'en';
    applyLanguage(saved);

    document.querySelectorAll('.lang-switch button').forEach(btn => {
      btn.addEventListener('click', () => applyLanguage(btn.dataset.lang));
    });
  }

  window.LingoSkyLang = { applyLanguage, initLanguage };
  document.addEventListener('DOMContentLoaded', initLanguage);
})();
