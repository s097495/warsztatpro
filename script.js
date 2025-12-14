// ========================================
// LOGO CLICK - RELOAD PAGE
// ========================================

const logo = document.querySelector('.logo');
if (logo) {
    logo.addEventListener('click', () => {
        window.location.href = window.location.href.split('#')[0];
    });
}

// ========================================
// SMOOTH SCROLLING
// ========================================

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

// ========================================
// NAVIGATION SCROLL EFFECT
// ========================================

const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// ========================================
// FLOATING CTA BUTTON
// ========================================

const floatingCTA = document.getElementById('floatingCTA');
const heroSection = document.querySelector('.hero');

if (floatingCTA && heroSection) {
    window.addEventListener('scroll', () => {
        const heroHeight = heroSection.offsetHeight;
        if (window.pageYOffset > heroHeight - 200) {
            floatingCTA.classList.add('visible');
        } else {
            floatingCTA.classList.remove('visible');
        }
    });
}

// ========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Optional: stop observing after animation
            // observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all fade-in-up elements
document.querySelectorAll('.fade-in-up').forEach(el => {
    observer.observe(el);
});

// ========================================
// ========================================
// FORM HANDLING - EMAILJS (dynamic load)
// ========================================

const contactForm = document.getElementById('contactForm');
let emailjsLoading = false;

function initEmailJS() {
    if (window.emailjsInitialized) return;
    window.emailjs.init('HXNQuj1VVisVhXcVx');
    window.emailjsInitialized = true;
}

function ensureEmailJSLoaded(callback) {
    if (window.emailjs) {
        initEmailJS();
        callback();
        return;
    }
    if (emailjsLoading) return;
    emailjsLoading = true;
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
    script.async = true;
    script.onload = () => {
        initEmailJS();
        callback();
    };
    script.onerror = () => {
        alert('Nie udało się załadować EmailJS. Spróbuj ponownie.');
    };
    document.body.appendChild(script);
}

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        ensureEmailJSLoaded(() => {
            window.emailjs.sendForm('service_pem7wsq', 'template_39e2mjr', contactForm)
                .then(function() {
                    alert('Dziękujemy za kontakt! Wiadomość została wysłana.');
                    contactForm.reset();
                }, function(error) {
                    alert('Błąd: ' + JSON.stringify(error));
                });
        });
    });
}

// ========================================
// PARALLAX EFFECT FOR HERO
// ========================================

const heroBg = document.querySelector('.hero-bg');

if (heroBg) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        if (scrolled < window.innerHeight) {
            heroBg.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    });
}

// ========================================
// MOBILE MENU TOGGLE
// ========================================

const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
        const spans = mobileMenuToggle.querySelectorAll('span');
        if (mobileMenuToggle.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(10px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// Close mobile menu when clicking on a link
if (navLinks && mobileMenuToggle) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
}

// ========================================
// CARD TILT EFFECT (PREMIUM INTERACTION)
// ========================================

const cards = document.querySelectorAll('.station-card, .audience-card, .step-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ========================================
// COUNTER ANIMATION FOR STATS
// ========================================

function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

// Trigger counter animation when stats come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                const number = parseInt(text);
                if (!isNaN(number)) {
                    animateCounter(stat, number);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// ========================================
// LAZY LOADING FOR IMAGES (when you add real images)
// ========================================

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// ========================================
// CURSOR TRAIL EFFECT (OPTIONAL PREMIUM FEATURE)
// ========================================

// Uncomment to enable cursor trail effect
/*
const cursor = document.createElement('div');
cursor.classList.add('cursor-trail');
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});
*/

// ========================================
// PERFORMANCE: REDUCE ANIMATIONS ON LOW-END DEVICES
// ========================================

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    // Disable animations for users who prefer reduced motion
    document.querySelectorAll('.fade-in, .fade-in-up').forEach(el => {
        el.style.animation = 'none';
        el.style.transition = 'none';
        el.style.opacity = '1';
        el.style.transform = 'none';
    });
}

// ========================================
// INITIALIZE ON PAGE LOAD
// ========================================

window.addEventListener('DOMContentLoaded', () => {
    console.log('🚗 Warsztat Samoobsługowy - Strona załadowana!');
    
    // Add loaded class to body for additional animations
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// ========================================
// LIGHTBOX GALLERY
// ========================================

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxDescription = document.getElementById('lightboxDescription');
const lightboxClose = document.getElementById('lightboxClose');

// Add click event to all gallery images
document.querySelectorAll('.gallery-item img').forEach(img => {
    img.addEventListener('click', function() {
        lightbox.classList.add('active');
        lightboxImg.src = this.src;
        lightboxDescription.textContent = this.getAttribute('data-description');
        document.body.style.overflow = 'hidden';
    });
});

// Close lightbox
lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Close on ESC key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
    }
});

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

// ========================================
// SERVICE WORKER (OPTIONAL - FOR PWA)
// ========================================

if ('serviceWorker' in navigator) {
    // Uncomment when you want to enable PWA features
    // navigator.serviceWorker.register('/sw.js')
    //     .then(reg => console.log('Service Worker registered', reg))
    //     .catch(err => console.log('Service Worker registration failed', err));
}