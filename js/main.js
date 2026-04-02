/* ================================================================
   NICHOLAS WOLF - nicholaswolf.com
   main.js — Navigation, animations, scroll effects
   ================================================================ */

(function () {
  'use strict';

  // ----------------------------------------------------------------
  // NAV: Scroll shadow
  // Adds .scrolled class to nav when page is scrolled
  // ----------------------------------------------------------------
  const nav = document.getElementById('nav');

  function onScroll() {
    if (window.scrollY > 10) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load

  // ----------------------------------------------------------------
  // NAV: Active link highlighting
  // Marks the current page's nav link as .active
  // ----------------------------------------------------------------
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-links a, .nav-mobile a');

  navLinks.forEach(function (link) {
    const linkPath = link.getAttribute('href');
    if (linkPath === currentPath) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // ----------------------------------------------------------------
  // NAV: Mobile hamburger menu
  // Toggles the mobile overlay open/closed
  // ----------------------------------------------------------------
  const hamburger = document.getElementById('nav-hamburger');
  const mobileMenu = document.getElementById('nav-mobile');

  function openMenu() {
    hamburger.classList.add('open');
    mobileMenu.classList.add('open');
    mobileMenu.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // prevent scroll when menu is open
  }

  function closeMenu() {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
    // Wait for fade-out transition before hiding
    setTimeout(function () {
      if (!mobileMenu.classList.contains('open')) {
        mobileMenu.style.display = '';
      }
    }, 400);
  }

  hamburger.addEventListener('click', function () {
    if (hamburger.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close menu when a mobile nav link is clicked
  mobileMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // Close menu on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && hamburger.classList.contains('open')) {
      closeMenu();
    }
  });

  // ----------------------------------------------------------------
  // FADE-IN ANIMATIONS
  // Uses IntersectionObserver to animate .fade-in elements into view
  // ----------------------------------------------------------------
  const fadeEls = document.querySelectorAll('.fade-in');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // animate once only
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    fadeEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show all immediately if IntersectionObserver not supported
    fadeEls.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // ----------------------------------------------------------------
  // SMOOTH SCROLL
  // Polyfill-style smooth scroll for anchor links (CSS handles it
  // for modern browsers; this is a safety net)
  // ----------------------------------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

})();
