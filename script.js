// script.js — extracted from Index.html

// Professional page loading
window.addEventListener('load', function() {
  const loadingScreen = document.getElementById('loading-screen');
  const contentWrapper = document.querySelector('.content-wrapper');

  setTimeout(() => {
    if (loadingScreen) loadingScreen.classList.add('hidden');
    if (contentWrapper) contentWrapper.classList.add('visible');
  }, 1200);
});

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');
const closeIcon = document.getElementById('close-icon');

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', () => {
    if (mobileMenu) mobileMenu.classList.toggle('hidden');
    if (menuIcon) menuIcon.classList.toggle('hidden');
    if (closeIcon) closeIcon.classList.toggle('hidden');
  });
}

// Close mobile menu when clicking on a link
if (mobileMenu) {
  const mobileLinks = mobileMenu.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      if (menuIcon) menuIcon.classList.remove('hidden');
      if (closeIcon) closeIcon.classList.add('hidden');
    });
  });
}

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offset = 80;
      const targetPosition = target.offsetTop - offset;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
  });
});

// Professional navigation scroll effect
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  if (nav) {
    if (currentScroll > 50) nav.classList.add('scrolled'); else nav.classList.remove('scrolled');
  }
});

