cat > js/main.js << 'EOF'
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