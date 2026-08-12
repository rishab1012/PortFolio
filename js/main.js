/* =========================================================
   RISHAB SALGAONKAR — main.js
   Nav toggle, scroll-triggered animations, year stamp
   ========================================================= */

(function () {
'use strict';

/* ----- Mobile nav toggle ----- */
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

if (navToggle && navLinks) {

    const openMenu = () => {
        navLinks.classList.add('open');
        navToggle.classList.add('active');
        navToggle.setAttribute('aria-expanded', 'true');
        document.body.classList.add('nav-open');
    };

    const closeMenu = () => {
        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('nav-open');
    };

    navToggle.addEventListener('click', () => {
        const isOpen = navLinks.classList.contains('open');
        isOpen ? closeMenu() : openMenu();
    });

    // Close menu when a link is tapped (mobile UX)
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close menu when tapping outside it
    document.addEventListener('click', (e) => {
        const isOpen = navLinks.classList.contains('open');
        if (!isOpen) return;
        const clickedInsideMenu = navLinks.contains(e.target);
        const clickedToggle = navToggle.contains(e.target);
        if (!clickedInsideMenu && !clickedToggle) closeMenu();
    });

    // Close menu on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMenu();
    });

    // Close menu if resized back to desktop width
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) closeMenu();
    });
}

/* ----- Navbar shadow on scroll ----- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (!navbar) return;
    navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

/* ----- Scroll-triggered fade-in animations ----- */
const animatedEls = document.querySelectorAll('[data-animate]');
if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    animatedEls.forEach(el => observer.observe(el));
} else {
    animatedEls.forEach(el => el.classList.add('visible'));
}

/* ----- Footer year ----- */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

})();