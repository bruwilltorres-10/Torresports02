document.addEventListener('DOMContentLoaded', () => {
    // =======================================================================
    // 1. GERENCIAMENTO DE UTM E WHATSAPP DINÂMICO (Robusto)
    // =======================================================================
    const getUTMParams = () => {
        const params = new URLSearchParams(window.location.search);
        const utmData = {
            source: params.get('utm_source') || sessionStorage.getItem('utm_source') || 'direto',
            medium: params.get('utm_medium') || sessionStorage.getItem('utm_medium') || 'none',
            campaign: params.get('utm_campaign') || sessionStorage.getItem('utm_campaign') || 'none'
        };
        
        // Salva na sessão para persistir entre páginas
        sessionStorage.setItem('utm_source', utmData.source);
        sessionStorage.setItem('utm_medium', utmData.medium);
        sessionStorage.setItem('utm_campaign', utmData.campaign);
        
        return utmData;
    };

    const utm = getUTMParams();
    const baseMessage = `Olá! Vim pelo site (Origem: ${utm.source} | Campanha: ${utm.campaign}) e gostaria de mais informações.`;
    const encodedMessage = encodeURIComponent(baseMessage);
    
    // Atualiza todos os links do WhatsApp no site
    document.querySelectorAll('.whatsapp-link').forEach(link => {
        const baseUrl = link.href.split('?')[0];
        link.href = `${baseUrl}?text=${encodedMessage}`;
    });

    // =======================================================================
    // 2. MODO ESCURO (DARK MODE)
    // =======================================================================
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', currentTheme);
    themeToggle.textContent = currentTheme === 'dark' ? '☀️' : '🌙';

    themeToggle.addEventListener('click', () => {
        const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    });

    // =======================================================================
    // 3. HEADER GLASSMORPHISM & BACK TO TOP
    // =======================================================================
    const header = document.getElementById('main-header');
    const backToTop = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }, { passive: true }); // 🚨 MELHORIA: Performance de scroll

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // =======================================================================
    // 4. MENU MOBILE (Acessível)
    // =======================================================================
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.getElementById('mobile-nav');
    
    mobileMenuBtn.addEventListener('click', () => {
        const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
        mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
        mobileNav.classList.toggle('active');
    });

    // Fechar menu ao clicar em um link
    mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        });
    });

    // =======================================================================
    // 5. INTERSECTION OBSERVER (Animações de Scroll Otimizadas)
    // =======================================================================
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // 🚨 MELHORIA: Parar de observar após animar
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // =======================================================================
    // 6. LGPD: GERENCIADOR DE CONSENTIMENTO REAL
    // =======================================================================
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('cookie-accept');
    const rejectBtn = document.getElementById('cookie-reject');
    const consent = localStorage.getItem('cookieConsent');

    if (!consent) {
        cookieBanner.style.display = 'block';
    }

    // Função para injetar scripts de rastreamento APENAS após consentimento
    function initializeTracking() {
        // 1. Google Analytics 4 & Ads
        const gaScript = document.createElement('script');
        gaScript.async = true;
        gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX'; // Substitua pelo ID real
        document.head.appendChild(gaScript);
        
        gaScript.onload = () => {
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX'); // Substitua pelo ID real
            gtag('config', 'AW-XXXXXXXXX'); // Substitua pelo ID do Ads
        };

        // 2. Meta Pixel
        const pixelScript = document.createElement('script');
        pixelScript.text = `
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1234567890'); // Substitua pelo ID real
            fbq('track', 'PageView');
        `;
        document.head.appendChild(pixelScript);
        
        console.log('✅ Rastreamento (GA4, Ads, Meta Pixel) ativado com consentimento LGPD.');
    }

    if (consent === 'accepted') {
        initializeTracking();
    }

    acceptBtn.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'accepted');
        cookieBanner.style.display = 'none';
        initializeTracking();
        trackEvent('cookie_consent_accepted');
    });

    rejectBtn.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'rejected');
        cookieBanner.style.display = 'none';
        console.log('🚫 Rastreamento de marketing bloqueado. Apenas cookies essenciais ativos.');
    });

    // Função global de rastreamento de eventos (segura)
    window.trackEvent = function(eventName, params = {}) {
        if (localStorage.getItem('cookieConsent') === 'accepted') {
            if (typeof gtag === 'function') gtag('event', eventName, params);
            if (typeof fbq === 'function') fbq('trackCustom', eventName, params);
        }
    };

    // =======================================================================
    // 7. FORMULÁRIO INTELIGENTE V2 (SessionStorage + Modal)
    // =======================================================================
    const contactForm = document.getElementById('contact-form');
    const successModal = document.getElementById('success-modal');
    const closeModalBtn = document.getElementById('close-modal');

    if (contactForm) {
        // Salvar rascunho em tempo real
        ['name', 'email', 'message'].forEach(id => {
            const el = document.getElementById(id);
            el.addEventListener('input', () => {
                const draft = {
                    name: document.getElementById('name').value,
                    email: document.getElementById('email').value,
                    message: document.getElementById('message').value
                };
                sessionStorage.setItem('formDraft', JSON.stringify(draft));
            });
        });

        // Restaurar rascunho
        const draft = sessionStorage.getItem('formDraft');
        if (draft) {
            const data = JSON.parse(draft);
            document.getElementById('name').value = data.name || '';
            document.getElementById('email').value = data.email || '';
            document.getElementById('message').value = data.message || '';
        }

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Gera link WhatsApp formatado
            const waText = encodeURIComponent(`Olá, meu nome é ${name}.\nE-mail: ${email}\nMensagem: ${message}`);
            const waLink = `https://wa.me/5511989887743?text=${waText}`;
            
            // Exibe modal de sucesso
            successModal.classList.add('active');
            successModal.setAttribute('aria-hidden', 'false');
            
            // Limpa formulário e sessionStorage
            contactForm.reset();
            sessionStorage.removeItem('formDraft');
            
            trackEvent('form_submission_whatsapp');

            // Redireciona após breve delay para o usuário ler o modal
            setTimeout(() => {
                window.open(waLink, '_blank');
                closeModalBtn.click();
            }, 2000);
        });
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            successModal.classList.remove('active');
            successModal.setAttribute('aria-hidden', 'true');
        });
    }

    // =======================================================================
    // 8. TRACKING DO BOTÃO FLUTUANTE WHATSAPP
    // =======================================================================
    const floatingWa = document.getElementById('floating-whatsapp');
    if (floatingWa) {
        floatingWa.addEventListener('click', () => {
            trackEvent('floating_whatsapp_click', { source: 'floating_button' });
        });
    }
});