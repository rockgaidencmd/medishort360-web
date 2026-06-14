/* ============================================
   MEDISHORT360 V3 — SCRIPT
   Seguridad + Interactividad
   ============================================ */

'use strict';

// ===== SEGURIDAD: SANITIZACIÓN DE INPUTS =====
// Elimina caracteres peligrosos para prevenir XSS e inyección
function sanitizeInput(str) {
    if (typeof str !== 'string') return '';
    return str
        .replace(/[<>'"`;(){}]/g, '')   // caracteres peligrosos HTML/JS
        .replace(/--/g, '')              // comentarios SQL
        .replace(/\/\*/g, '')            // comentarios SQL bloque
        .replace(/\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|EXEC|SCRIPT)\b/gi, '') // SQL keywords
        .trim()
        .slice(0, 500);                  // longitud máxima
}

// ===== SEGURIDAD: RATE LIMITING (cliente) =====
// Previene spam de clicks/requests desde el navegador
const RateLimiter = (() => {
    const hits = {};
    return {
        check(action, maxHits = 10, windowMs = 60000) {
            const now = Date.now();
            if (!hits[action]) hits[action] = [];
            hits[action] = hits[action].filter(t => now - t < windowMs);
            if (hits[action].length >= maxHits) {
                console.warn(`[MS360 Security] Rate limit activado para: ${action}`);
                return false;
            }
            hits[action].push(now);
            return true;
        }
    };
})();

// ===== SEGURIDAD: PROTECCIÓN BÁSICA DE PÁGINA =====
// Desactiva click derecho sobre imágenes de apps para proteger capturas
document.querySelectorAll('.app-card-images img').forEach(img => {
    img.addEventListener('contextmenu', e => e.preventDefault());
    img.addEventListener('dragstart', e => e.preventDefault());
});

// Oculta info sensible de consola en producción
if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    const noop = () => {};
    // Solo limpiamos en producción, no bloqueamos la consola completa
    console.debug = noop;
}

// ===== HEADER: scroll effect =====
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}, { passive: true });

// ===== NAV: scroll suave =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ===== ANIMACIONES: Intersection Observer =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

// Aplicar fade-up a elementos clave
document.querySelectorAll('.app-card, .pricing-card, .contact-card, .vademecum-inner, .how-to-buy, .legal-box').forEach((el, i) => {
    el.classList.add('fade-up');
    el.style.transitionDelay = `${(i % 4) * 0.08}s`;
    observer.observe(el);
});

// ===== BOTONES COMPRAR: Rate limiting + feedback visual =====
document.querySelectorAll('.btn-buy, .btn-pricing-main, .btn-pricing-secondary, .btn-notify').forEach(btn => {
    btn.addEventListener('click', function(e) {
        // Rate limiting: máximo 5 clics en compra por minuto
        if (!RateLimiter.check('purchase_click', 5, 60000)) {
            e.preventDefault();
            showToast('Por favor espera un momento antes de intentar de nuevo.');
            return;
        }
        // Feedback visual momentáneo
        const original = this.textContent;
        this.style.opacity = '0.8';
        setTimeout(() => { this.style.opacity = '1'; }, 300);
    });
});

// ===== TOAST NOTIFICACIÓN =====
function showToast(message) {
    const existing = document.querySelector('.ms-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'ms-toast';
    toast.textContent = sanitizeInput(message);
    toast.style.cssText = `
        position: fixed; bottom: 100px; right: 28px; z-index: 9999;
        background: rgba(13,20,36,0.97); color: #e2e8f0;
        padding: 12px 20px; border-radius: 10px;
        border: 1px solid rgba(0,168,255,0.3);
        font-size: 13px; font-weight: 500;
        box-shadow: 0 8px 30px rgba(0,0,0,0.5);
        animation: toastIn 0.3s ease;
        max-width: 280px;
    `;

    const styleEl = document.createElement('style');
    styleEl.textContent = `
        @keyframes toastIn { from { opacity:0; transform: translateY(10px); } to { opacity:1; transform: translateY(0); } }
    `;
    document.head.appendChild(styleEl);
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3500);
}

// ===== PROTECCIÓN ADICIONAL: Content Security =====
// Detecta si se intenta inyectar scripts externos en la página
const mutationObserver = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
            if (node.nodeName === 'SCRIPT' && !node.src?.includes('fonts.googleapis')) {
                console.warn('[MS360 Security] Script externo detectado y bloqueado.');
                node.remove();
            }
        });
    });
});
mutationObserver.observe(document.body, { childList: true, subtree: true });

// ===== VALIDACIÓN: links de pago y WhatsApp =====
// Asegura que los links de pago/WhatsApp sean legítimos antes de abrirlos
const LINKS_PERMITIDOS = [
    'https://wa.me/593986198167',
    'https://ppls.me/JfqBhPiaw5CrPw1ZuP2qw',  // App individual $3
    'https://ppls.me/C8Mkd4YhjTiouOVvw4SIQ'   // Bundle $6
];

document.querySelectorAll('a[href*="wa.me"], a[href*="ppls.me"]').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        const esValido = LINKS_PERMITIDOS.some(permitido => href.startsWith(permitido));
        if (!esValido) {
            e.preventDefault();
            console.warn('[MS360 Security] Link de pago/contacto inválido bloqueado.');
        }
    });
});

// ===== EFECTO: Parallax suave en hero =====
const hero = document.querySelector('.hero-bg');
if (hero) {
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        if (scrollY < 800) {
            hero.style.transform = `translateY(${scrollY * 0.3}px)`;
        }
    }, { passive: true });
}

// ===== INICIALIZACIÓN =====
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.4s ease';
    requestAnimationFrame(() => {
        document.body.style.opacity = '1';
    });
    console.log('%c MEDISHORT360 V3 ✓', 'color: #00a8ff; font-weight: bold; font-size: 14px;');
    console.log('%c Canal Médico Educativo · Ecuador', 'color: #d4a843; font-size: 12px;');
});
