/* Solo habilita la instalación cuando existen destinos HTTPS confirmados. */
(() => {
  fetch('./install-links.json', {cache: 'no-store'})
    .then(response => { if (!response.ok) throw new Error('Enlaces no disponibles'); return response.json(); })
    .then(links => {
      document.querySelectorAll('[data-install-app]').forEach(button => {
        const value = links[button.dataset.installApp];
        if (!value) return;
        const url = new URL(value);
        if (url.protocol !== 'https:' || url.username || url.password) return;
        button.href = url.href;
        button.removeAttribute('aria-disabled');
        button.removeAttribute('tabindex');
        button.textContent = 'Abrir e instalar ↗';
        button.closest('.install-card').querySelector('.install-status').textContent = button.dataset.installApp === 'pct' ? 'Gratis · sin activación' : 'Instalación gratuita · 3 usos de prueba';
      });
    }).catch(() => { /* Mantener los botones deshabilitados si falta configuración. */ });
  document.querySelectorAll('[data-install-app]').forEach(button => {
    button.addEventListener('click', event => { if (button.getAttribute('aria-disabled') === 'true') event.preventDefault(); });
  });
})();
