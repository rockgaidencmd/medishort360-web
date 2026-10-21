(() => {
  const root = document.getElementById('lemon-purchases');
  if (!root || !(location.hostname.includes('-git-') || ['localhost','127.0.0.1'].includes(location.hostname))) return;
  root.replaceChildren();
  const note = document.createElement('p');
  note.textContent = 'PRUEBAS: compras simuladas, sin dinero real. Estos enlaces todavía no son para clientes.';
  root.append(note);
  const products = [
    ['ASPA — $1', '9ac6c9f7-8271-4875-9cbb-e54b79de5101'],
    ['Dosis y Goteo IV — $1', 'b46d39af-33df-406d-ab9d-daa9d90fbf2a'],
    ['Herramientas UCI — $1', '1a186f11-1c4c-4f95-a6b9-4df319d0fab0'],
    ['Vademécum Enfermería — $2', '1a9ebfde-6ac0-4d48-bf53-94c47746eb3e']
  ];
  for (const [name,id] of products) {
    const link = document.createElement('a');
    link.className = 'btn-pricing-secondary';
    link.href = 'https://medishort360.lemonsqueezy.com/checkout/buy/' + id;
    link.target = '_blank'; link.rel = 'noopener';
    link.textContent = 'Probar compra: ' + name + ' ↗';
    root.append(link);
  }
})();