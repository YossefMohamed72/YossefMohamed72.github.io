/* =========================================================
   LINGOSKY — MAIN
   WhatsApp link building, contact form, small utilities
   ========================================================= */
(function(){
  const WHATSAPP_NUMBER = '971526862320';

  function buildWhatsAppLink(message){
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }

  function initWhatsApp(){
    const lang = document.documentElement.getAttribute('lang') || 'en';
    const msg = lang === 'ar'
      ? 'مرحباً LingoSky، أرغب في معرفة المزيد عن خدماتكم.'
      : 'Hello LingoSky, I would like to know more about your services.';
    document.querySelectorAll('[data-whatsapp]').forEach(el => {
      el.setAttribute('href', buildWhatsAppLink(msg));
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener');
    });
  }

  function initContactForm(){
    const form = document.getElementById('contact-form');
    if(!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const status = document.getElementById('form-status');
      const lang = document.documentElement.getAttribute('lang') || 'en';
      if(status){
        status.textContent = lang === 'ar'
          ? 'شكراً لك! تم استلام طلبك وسيتواصل معك فريقنا قريباً.'
          : 'Thank you! Your request has been received. Our team will contact you shortly.';
        status.classList.remove('hidden');
      }
      form.reset();
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initWhatsApp();
    initContactForm();

    // update whatsapp text again on language switch
    document.querySelectorAll('.lang-switch button').forEach(btn => {
      btn.addEventListener('click', () => setTimeout(initWhatsApp, 30));
    });

    // year in footer
    document.querySelectorAll('.js-year').forEach(el => el.textContent = new Date().getFullYear());
  });
})();
