/* =====================================
   MEDISHORT360 V2
   JAVASCRIPT - INTERACTIVIDAD AVANZADA
   ===================================== */

// ===== VARIABLES GLOBALES DEL CARRUSEL =====
let currentSlide = 0;
const carousel = document.querySelector('.carousel');
const slides = document.querySelectorAll('.carousel-slide');
const totalSlides = slides.length;

// ===== FUNCIÓN: Siguiente slide =====
function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
}

// ===== FUNCIÓN: Slide anterior =====
function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
}

// ===== FUNCIÓN: Ir a slide específico =====
function goToSlide(n) {
    currentSlide = n % totalSlides;
    updateCarousel();
}

// ===== FUNCIÓN: Actualizar carrusel =====
function updateCarousel() {
    const offset = -currentSlide * 100;
    carousel.style.transform = `translateX(${offset}%)`;
    
    // Actualizar indicadores
    document.querySelectorAll('.indicator').forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
    });
}

// ===== AUTO-CARRUSEL (opcional) =====
let autoSlideInterval = setInterval(nextSlide, 8000);

// Pausar auto-carrusel al pasar el mouse
document.querySelector('.carousel-wrapper')?.addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
});

// Reanudar auto-carrusel al salir el mouse
document.querySelector('.carousel-wrapper')?.addEventListener('mouseleave', () => {
    autoSlideInterval = setInterval(nextSlide, 8000);
});

// ===== FUNCIÓN: Scroll suave a secciones =====
function scrollTo(id) {
    const elemento = document.getElementById(id);
    if (elemento) {
        elemento.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// ===== EVENTO: Click en links de navegación =====
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        const id = href.substring(1);
        scrollTo(id);
    });
});

// ===== FUNCIÓN: Compra de producto (placeholder) =====
function buyProduct(productId) {
    const productNames = {
        'ms360-enf': 'MS360-ENF Bundle ($6.00)',
        'ms360-uci': 'MS360-UCI ($3.00)',
        'ms360-aspa': 'MS360-ASPA ($3.00)',
        'ms360-x3': 'MS360-X3 ($3.00)',
        'ms360-%': 'MS360-% ($3.00)'
    };

    const productName = productNames[productId] || 'Producto';
    
    alert(`
🛒 Compra: ${productName}

Los métodos de pago serán habilitados próximamente.

Método 1: (Pendiente - Probablemente MercadoPago)
Método 2: (Pendiente)

Contacta: onlyfreetime1992@gmail.com
    `);
}

// ===== EFECTO: Hover en botones =====
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
    
    btn.addEventListener('click', function() {
        // Efecto ripple
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.background = 'rgba(255,255,255,0.5)';
        ripple.style.borderRadius = '50%';
        ripple.style.animation = 'rippleEffect 0.6s ease-out';
        ripple.style.pointerEvents = 'none';
        
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

// ===== ANIMACIÓN: Ripple en botones =====
const style = document.createElement('style');
style.innerHTML = `
    @keyframes rippleEffect {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== EFECTO: Parallax en hero =====
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrollPosition = window.scrollY;
        hero.style.backgroundPosition = `0 ${scrollPosition * 0.5}px`;
    }
});

// ===== EFECTO: Animación de scroll =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar elementos para animación
document.querySelectorAll('.product-card, .feature-card, .gallery-item, .pricing-card, .testimonio-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// ===== EFECTO: Cambio de header al scroll =====
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    }
});

// ===== EFECTO: Hover en gallery items =====
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.cursor = 'pointer';
    });
});

// ===== EFECTO: Click en videos =====
document.querySelectorAll('.video-placeholder').forEach(video => {
    video.addEventListener('click', function() {
        window.open('https://tiktok.com/@medishort360', '_blank');
    });
});

// ===== EFECTO: Teclado (navegación carrusel) =====
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft') {
        prevSlide();
    } else if (event.key === 'ArrowRight') {
        nextSlide();
    }
});

// ===== EFECTO: Smooth scroll para browsers antiguos =====
if (!window.CSS || !window.CSS.supports('scroll-behavior', 'smooth')) {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'auto', block: 'start' });
            }
        });
    });
}

// ===== EFECTO: Tooltip en hover =====
document.querySelectorAll('[data-tooltip]').forEach(el => {
    el.addEventListener('mouseenter', function() {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = this.getAttribute('data-tooltip');
        tooltip.style.position = 'absolute';
        tooltip.style.background = 'rgba(0,0,0,0.8)';
        tooltip.style.color = 'white';
        tooltip.style.padding = '8px 12px';
        tooltip.style.borderRadius = '4px';
        tooltip.style.fontSize = '12px';
        tooltip.style.zIndex = '1000';
        tooltip.style.pointerEvents = 'none';
        
        document.body.appendChild(tooltip);
        
        this.addEventListener('mouseleave', () => {
            tooltip.remove();
        });
    });
});

// ===== LOG DE INICIALIZACIÓN =====
console.log('✅ MEDISHORT360 V2 Cargado');
console.log('🚀 Carrusel: Activo');
console.log('⌨️ Atajos: Flechas izq/dcha para carrusel');
console.log('📱 Responsive: Optimizado para móvil y desktop');

// ===== EVENTO: Page Load =====
window.addEventListener('load', function() {
    console.log('✅ Página cargada completamente');
    
    // Inicializar carrusel
    updateCarousel();
    
    // Efecto de carga
    document.body.style.animation = 'fadeInUp 0.6s ease-out';
});

// ===== PREVENIR EVENTOS NO DESEADOS =====
document.addEventListener('contextmenu', function(e) {
    // No bloqueamos - permitimos click derecho
});

// ===== DETECCIÓN DE DISPOSITIVO =====
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
if (isMobile) {
    console.log('📱 Dispositivo móvil detectado');
    // Optimizaciones para móvil pueden ir aquí
}

// ===== SOPORTE PARA SWIPE EN MÓVIL =====
let touchStartX = 0;
let touchEndX = 0;

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        // Swipe izquierda
        nextSlide();
    }
    if (touchEndX > touchStartX + 50) {
        // Swipe derecha
        prevSlide();
    }
}

document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
}, false);

document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, false);

// ===== MODO DEBUG (opcional) =====
if (window.location.search.includes('debug')) {
    console.log('🔧 MODO DEBUG ACTIVADO');
    console.log('Total de slides:', totalSlides);
    console.log('Slide actual:', currentSlide);
}
