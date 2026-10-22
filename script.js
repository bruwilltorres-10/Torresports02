/* =========================================
   1. GERENCIAMENTO DE TEMA (DARK MODE)
   ========================================= */
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    body.classList.add('dark-mode');
    body.classList.remove('light-mode');
    themeToggle.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');
    const isDark = body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeToggle.textContent = isDark ? '☀️' : '🌙';
});

/* =========================================
   2. RASTREAMENTO DE UTMS E WHATSAPP INTELIGENTE
   ========================================= */
const urlParams = new URLSearchParams(window.location.search);
const utmSource = urlParams.get('utm_source') || 'direto';
const utmMedium = urlParams.get('utm_medium') || 'none';

if (utmSource !== 'direto') {
    localStorage.setItem('utm_source', utmSource);
    localStorage.setItem('utm_medium', utmMedium);
}

function generateSmartWALink(phone, customMessage) {
    const savedSource = localStorage.getItem('utm_source') || 'site';
    const baseMessage = `Olá! Vim pelo ${savedSource} e gostaria de saber mais. ${customMessage}`;
    const encodedMessage = encodeURIComponent(baseMessage);
    return `https://wa.me/${phone}?text=${encodedMessage}`;
}

// Aplica a lógica a TODOS os botões de WhatsApp do site
const waPhone = '5511989887743';
const buttons = [
    document.getElementById('hero-cta'),
    document.getElementById('sticky-wa'),
    document.getElementById('whatsapp-float')
];

buttons.forEach(btn => {
    if (btn) {
        btn.href = generateSmartWALink(waPhone, 'Gostaria de conhecer os produtos e consultoria.');
    }
});

/* =========================================
   3. FORMULÁRIO INTELIGENTE (SEM BACKEND)
   ========================================= */
const contactForm = document.getElementById('contact-form');
const successModal = document.getElementById('success-modal');
const modalWaLink = document.getElementById('modal-wa-link');
const closeModalBtn = document.getElementById('close-modal');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const interest = document.getElementById('interest').value;
    const message = document.getElementById('message').value;
    
    localStorage.setItem('form_draft_name', name);
    
    const finalMessage = `Olá, meu nome é *${name}*.\nTenho interesse em: *${interest}*.\nMensagem: ${message}`;
    modalWaLink.href = generateSmartWALink(waPhone, finalMessage);
    
    successModal.showModal();
    trackEvent('form_submission', 'contact_form', interest);
    contactForm.reset();
});

closeModalBtn.addEventListener('click', () => successModal.close());

/* =========================================
   4. GERENCIAMENTO DE COOKIES (LGPD) E TRACKING
   ========================================= */
const cookieBanner = document.getElementById('cookie-banner');
const acceptCookiesBtn = document.getElementById('accept-cookies');

if (!localStorage.getItem('cookies_accepted')) {
    cookieBanner.classList.remove('hidden');
}

acceptCookiesBtn.addEventListener('click', () => {
    localStorage.setItem('cookies_accepted', 'true');
    cookieBanner.classList.add('hidden');
});

function trackEvent(eventName, category, label) {
    const hasConsent = localStorage.getItem('cookies_accepted') === 'true';
    if (hasConsent) {
        console.log(`[TRACKING] Event: ${eventName} | Category: ${category} | Label: ${label}`);
        // Descomente em produção:
        // if (typeof gtag !== 'undefined') gtag('event', eventName, { 'event_category': category, 'event_label': label });
        // if (typeof fbq !== 'undefined') fbq('trackCustom', eventName, { category, label });
    }
}

/* =========================================
   5. ANIMAÇÕES AO ROLAR (Intersection Observer)
   ========================================= */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card, .testimonial-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

/* =========================================
   6. MENU MOBILE
   ========================================= */
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');

mobileMenuBtn.addEventListener('click', () => {
    if (navMenu.style.display === 'flex') {
        navMenu.style.display = 'none';
    } else {
        navMenu.style.display = 'flex';
        navMenu.style.flexDirection = 'column';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '70px';
        navMenu.style.left = '0';
        navMenu.style.width = '100%';
        navMenu.style.backgroundColor = 'var(--white)';
        navMenu.style.padding = '1rem';
        navMenu.style.boxShadow = 'var(--shadow)';
    }
});