// Ibrahim Ada - Ud Atölyesi
// Modern Website JavaScript

document.addEventListener('DOMContentLoaded', function () {

    // ===================================
    // NAVBAR SCROLL EFFECT
    // ===================================

    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    // Scroll effect for navbar
    function handleScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    // Mobile menu toggle
    navToggle.addEventListener('click', function () {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function () {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function (e) {
        if (navMenu.classList.contains('active') &&
            !navMenu.contains(e.target) &&
            !navToggle.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // ===================================
    // ACTIVE NAV LINK ON SCROLL
    // ===================================

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function highlightNavLink() {
        const scrollY = window.scrollY;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);

    // ===================================
    // SMOOTH SCROLL
    // ===================================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===================================
    // SCROLL ANIMATIONS
    // ===================================

    const animatedElements = document.querySelectorAll('.service-card, .feature-card, .contact-card, .story-card, .gallery-item');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });

    // ===================================
    // HERO PARTICLES EFFECT
    // ===================================

    const particlesContainer = document.getElementById('particles');

    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';

        const size = Math.random() * 4 + 2;
        const x = Math.random() * 100;
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 5;

        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(201, 168, 108, ${Math.random() * 0.3 + 0.1});
            border-radius: 50%;
            left: ${x}%;
            bottom: -20px;
            animation: floatUp ${duration}s linear ${delay}s infinite;
        `;

        particlesContainer.appendChild(particle);
    }

    // Create particles
    for (let i = 0; i < 30; i++) {
        createParticle();
    }

    // Add float up animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatUp {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // ===================================
    // COUNTER ANIMATION
    // ===================================

    function animateCounter(el, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);

        function updateCounter() {
            start += increment;
            if (start < target) {
                el.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                el.textContent = target;
            }
        }

        updateCounter();
    }

    // ===================================
    // TYPING EFFECT FOR HERO
    // ===================================

    const titleHighlight = document.querySelector('.title-highlight');
    if (titleHighlight) {
        const originalText = titleHighlight.textContent;
        titleHighlight.style.borderRight = '3px solid var(--color-primary)';

        // Remove the cursor after animation
        setTimeout(() => {
            titleHighlight.style.borderRight = 'none';
        }, 3000);
    }

    // ===================================
    // HOVER EFFECTS ENHANCEMENT
    // ===================================

    // Add magnetic effect to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mousemove', function (e) {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });

        btn.addEventListener('mouseleave', function () {
            btn.style.transform = '';
        });
    });

    // ===================================
    // PRELOADER (Optional, add HTML if needed)
    // ===================================

    window.addEventListener('load', function () {
        document.body.classList.add('loaded');
    });

    // ===================================
    // LAZY LOADING IMAGES
    // ===================================

    const lazyImages = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));

    // ===================================
    // CONSOLE GREETING
    // ===================================

    console.log('%c🎵 İbrahim Ada Ud Atölyesi', 'font-size: 20px; font-weight: bold; color: #c9a86c;');
    console.log('%cGeleneksel el sanatının modern yorumu', 'font-size: 12px; color: #a0a0a0;');

    // ===================================
    // AUDIO AUTOPLAY HANDLING
    // ===================================
    const audio = document.getElementById('startup-audio');

    if (audio) {
        // NOTE: Autoplay policies require starting muted.
        // We will unmute on the first user interaction.

        const unmuteAndPlay = function () {
            audio.muted = false;
            audio.volume = 0.5;
            audio.play().catch(e => console.log("Audio play failed on interaction:", e));

            // Remove listeners once activated
            document.removeEventListener('click', unmuteAndPlay);
            document.removeEventListener('touchstart', unmuteAndPlay);
            document.removeEventListener('keydown', unmuteAndPlay);
        };

        // Try to play immediately (muted)
        const playPromise = audio.play();

        if (playPromise !== undefined) {
            playPromise.then(_ => {
                console.log("Muted autoplay started. Waiting for interaction to unmute.");
                // Add listeners to unmute
                document.addEventListener('click', unmuteAndPlay);
                document.addEventListener('touchstart', unmuteAndPlay);
                document.addEventListener('keydown', unmuteAndPlay);
            }).catch(error => {
                console.log("Autoplay prevented entirely. Waiting for interaction.");
                // Add listeners to play from scratch
                document.addEventListener('click', unmuteAndPlay);
                document.addEventListener('touchstart', unmuteAndPlay);
                document.addEventListener('keydown', unmuteAndPlay);
            });
        }
    }

});

// ===================================
// UTILITY FUNCTIONS
// ===================================

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
