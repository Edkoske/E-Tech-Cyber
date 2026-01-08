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

// The small obfuscated iframe script from original HTML
(function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'9bab6fd2c7338a61',t:'MTc2Nzg3MjYwMi4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();
