// ===================================
// HILUCO Website - Interactive JavaScript
// ===================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {

    // ===================================
    // Language Switcher
    // ===================================
    const langButtons = document.querySelectorAll('.lang-btn');

    langButtons.forEach(button => {
        button.addEventListener('click', function () {
            const targetLang = this.getAttribute('data-lang');
            const currentPage = window.location.pathname;

            // Determine target page based on language
            if (targetLang === 'ja') {
                // Switch to Japanese
                if (!currentPage.includes('index_ja.html')) {
                    window.location.href = 'index_ja.html';
                }
            } else {
                // Switch to English (default)
                if (currentPage.includes('index_ja.html')) {
                    window.location.href = 'index.html';
                }
            }
        });
    });

    // ===================================
    // Smooth Scroll for Scroll Indicator
    // ===================================
    const scrollIndicator = document.getElementById('scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function () {
            const overviewSection = document.getElementById('overview');
            if (overviewSection) {
                overviewSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // ===================================
    // Intersection Observer for Timeline Items
    // ===================================
    const timelineItems = document.querySelectorAll('.timeline-item');

    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    });

    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });

    // ===================================
    // Intersection Observer for Fade-in Elements
    // ===================================
    const fadeElements = document.querySelectorAll('.domain-card, .possibility-card, .glass-card');

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(30px)';
                    entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

                    requestAnimationFrame(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    });
                }, index * 100);

                fadeObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });

    // ===================================
    // Parallax Effect for Hero Background
    // ===================================
    const hero = document.querySelector('.hero');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroHeight = hero.offsetHeight;

        if (scrolled < heroHeight) {
            const opacity = 1 - (scrolled / heroHeight);
            hero.style.opacity = opacity;
        }
    });

    // ===================================
    // Hide Scroll Indicator on Scroll
    // ===================================
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollIndicator) {
            if (scrollTop > 100) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.pointerEvents = 'none';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.pointerEvents = 'auto';
            }
        }

        lastScrollTop = scrollTop;
    });

    // ===================================
    // Enhanced Hover Effects for Possibility Cards
    // ===================================
    const possibilityCards = document.querySelectorAll('.possibility-card');

    possibilityCards.forEach(card => {
        card.addEventListener('mouseenter', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.width = '0';
            ripple.style.height = '0';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(0, 212, 255, 0.1)';
            ripple.style.transform = 'translate(-50%, -50%)';
            ripple.style.pointerEvents = 'none';
            ripple.style.transition = 'width 0.6s ease, height 0.6s ease, opacity 0.6s ease';
            ripple.style.opacity = '1';

            this.style.position = 'relative';
            this.appendChild(ripple);

            requestAnimationFrame(() => {
                ripple.style.width = '300px';
                ripple.style.height = '300px';
                ripple.style.opacity = '0';
            });

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // ===================================
    // Timeline Year Pulse Animation on Scroll
    // ===================================
    const timelineYears = document.querySelectorAll('.timeline-year');

    const yearObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'pulse 2s ease-in-out infinite';
            }
        });
    }, {
        threshold: 0.5
    });

    timelineYears.forEach(year => {
        yearObserver.observe(year);
    });

    // ===================================
    // Add Gradient Animation to Text Elements
    // ===================================
    const gradientTexts = document.querySelectorAll('.text-gradient, .text-gradient-warm');

    gradientTexts.forEach(text => {
        text.style.backgroundSize = '200% 200%';
        text.style.animation = 'gradientShift 3s ease infinite';
    });

    // Add gradient shift keyframes dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
    `;
    document.head.appendChild(style);

    // ===================================
    // Smooth Scroll for All Internal Links
    // ===================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ===================================
    // Performance: Reduce Motion for Users Who Prefer It
    // ===================================
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (prefersReducedMotion.matches) {
        // Disable animations for users who prefer reduced motion
        document.querySelectorAll('*').forEach(element => {
            element.style.animation = 'none';
            element.style.transition = 'none';
        });
    }

    // ===================================
    // Add Loading Animation
    // ===================================
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';

        requestAnimationFrame(() => {
            document.body.style.opacity = '1';
        });
    });

    // ===================================
    // Console Easter Egg
    // ===================================
    console.log('%c🌟 HILUCO - ウェルビーイングの未来をデザインする',
        'font-size: 20px; font-weight: bold; color: #00d4ff; text-shadow: 0 0 10px rgba(0, 212, 255, 0.5);');
    console.log('%c脳・心・身体・社会参加を統合し、人と組織と地域のウェルビーイングをデザインする',
        'font-size: 14px; color: #94a3b8;');
});
