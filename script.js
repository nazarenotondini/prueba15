
(() => {
  const navToggle = document.querySelector('.navToggle');
  const nav = document.querySelector('#navMenu');

  function setExpanded(isOpen){
    navToggle?.setAttribute('aria-expanded', String(isOpen));
    nav?.classList.toggle('is-open', isOpen);
  }

  navToggle?.addEventListener('click', () => {
    const isOpen = nav?.classList.contains('is-open');
    setExpanded(!isOpen);
  });

  // Close nav on link click (mobile)
  nav?.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (!a) return;
    setExpanded(false);
  });

  // Close nav on outside click (mobile)
  document.addEventListener('click', (e) => {
    if (!navToggle || !nav) return;
    const isOpen = nav.classList.contains('is-open');
    if (!isOpen) return;
    const inside = nav.contains(e.target) || navToggle.contains(e.target);
    if (!inside) setExpanded(false);
  });

  // Email copy
  document.querySelectorAll('[data-copy]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const value = btn.getAttribute('data-copy') || '';
      try{
        await navigator.clipboard.writeText(value);
        const prev = btn.textContent;
        btn.textContent = 'Copiado ✓';
        setTimeout(() => btn.textContent = prev, 1400);
      }catch{
        alert('No se pudo copiar. Email: ' + value);
      }
    });
  });

  // Share
  const shareBtn = document.querySelector('[data-share]');
  shareBtn?.addEventListener('click', async () => {
    const url = window.location.href;
    const data = { title: document.title, url };
    try{
      if (navigator.share) {
        await navigator.share(data);
      } else {
        await navigator.clipboard.writeText(url);
        const prev = shareBtn.textContent;
        shareBtn.textContent = 'Link copiado ✓';
        setTimeout(() => shareBtn.textContent = prev, 1400);
      }
    }catch{ /* user cancelled */ }
  });

  // Year
  const y = document.querySelector('#year');
  if (y) y.textContent = String(new Date().getFullYear());
})();
