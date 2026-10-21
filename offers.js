/* Oferta de apps independientes: vigente hasta el 31/12/2026, hora de Ecuador. */
(() => {
  const parts = new Intl.DateTimeFormat('en-US',{timeZone:'America/Guayaquil',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());
  const date = Object.fromEntries(parts.map(p=>[p.type,p.value]));
  const onSale = Number(date.year+date.month+date.day) <= 20261231;
  const calc = onSale ? 1 : 2, vade = onSale ? 2 : 4;
  const markup = (regular,price) => (onSale ? '<del class="ms-offer-old">$'+regular.toFixed(2)+'</del>' : '')+'<span>$'+price.toFixed(2)+'</span>'+(onSale ? '<span class="ms-offer-until"><span class="ms-offer-badge">50% de descuento</span><br>Hasta el 31 de diciembre de 2026</span>' : '');
  document.querySelectorAll('.app-card').forEach(card => {
    const price = card.querySelector('.app-price');
    if (price) price.innerHTML = markup(2,calc)+'<small>pago único</small>';
    const buy = card.querySelector('.btn-pay'); if (buy) buy.textContent='Solicitar pago — $'+calc.toFixed(2)+' ↗';
  });
  const vadeCard=document.querySelector('.pricing-card-vade');
  if(vadeCard){vadeCard.querySelector('.price-amount').innerHTML=markup(4,vade);vadeCard.querySelector('.btn-pricing-main').textContent='Solicitar pago — $'+vade.toFixed(2)+' ↗';}
  const solo=document.querySelector('.pricing-card:not(.featured)');
  if(solo){solo.querySelector('.price-amount').innerHTML=markup(2,calc);solo.querySelector('.btn-pricing-secondary').textContent='Solicitar pago — $'+calc.toFixed(2)+' ↗';}
  const top=document.querySelector('.btn-vade-buy');if(top)top.innerHTML='Solicitar pago — '+(onSale?'<del>$4</del> ':'')+'$'+vade+' ↗'+(onSale?'<span class="ms-offer-until">50% de descuento · Hasta el 31 de diciembre de 2026</span>':'');
  const separator=document.querySelector('.apps-section .apps-divider') || document.querySelector('.apps-divider');
  document.querySelectorAll('.pack-list .pack-val').forEach((node,index)=>{if(index===0)node.textContent='$'+vade;});
  const pack=document.querySelector('.pack-price-old');if(pack)pack.textContent='Vademécum $'+vade+' + App Maestra $3';
  document.querySelectorAll('.binance-precios li').forEach((node,index)=>{const price=index<2?calc:index===2?vade:index===3?3:5;const amount=node.querySelector('strong');if(amount)amount.textContent=price+' USDT';});
  document.querySelectorAll('p').forEach(node=>{if(node.textContent.trim()==='o elige una calculadora independiente por $2')node.textContent='o elige una calculadora independiente por $'+calc+(onSale?' · 50% de descuento hasta el 31 de diciembre de 2026':'');});
})();
