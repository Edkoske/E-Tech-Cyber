// script.js - Enhanced with error handling and accessibility

'use strict';

// Professional page loading with error handling
window.addEventListener('load', function() {
  try {
    const loadingScreen = document.getElementById('loading-screen');
    const contentWrapper = document.querySelector('.content-wrapper');

    if (loadingScreen && contentWrapper) {
      setTimeout(() => {
        loadingScreen.classList.add('hidden');
        contentWrapper.classList.add('visible');
        
        // Remove loading screen from DOM after animation
        setTimeout(() => {
          if (loadingScreen.parentNode) {
            loadingScreen.style.display = 'none';
          }
        }, 500);
      }, 1200);
    }
  } catch (error) {
    console.warn('Loading screen error:', error);
  }
});

// Mobile menu toggle with accessibility
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');
const closeIcon = document.getElementById('close-icon');

function toggleMobileMenu() {
  if (!mobileMenu || !menuIcon || !closeIcon) return;
  
  const isHidden = mobileMenu.classList.contains('hidden');
  mobileMenu.classList.toggle('hidden');
  menuIcon.classList.toggle('hidden');
  closeIcon.classList.toggle('hidden');
  
  // Update ARIA attributes for accessibility
  if (mobileMenuBtn) {
    mobileMenuBtn.setAttribute('aria-expanded', isHidden ? 'true' : 'false');
  }
}

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', toggleMobileMenu);
  
  // Close menu on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu && !mobileMenu.classList.contains('hidden')) {
      toggleMobileMenu();
    }
  });
}

// Close mobile menu when clicking on a link
if (mobileMenu) {
  const mobileLinks = mobileMenu.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
        if (menuIcon) menuIcon.classList.remove('hidden');
        if (closeIcon) closeIcon.classList.add('hidden');
        if (mobileMenuBtn) mobileMenuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

// Smooth scrolling with error handling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#' || href === '#!') {
      e.preventDefault();
      return;
    }
    
    e.preventDefault();
    try {
      const target = document.querySelector(href);
      if (target) {
        const offset = 80;
        const targetPosition = target.offsetTop - offset;
        window.scrollTo({ 
          top: targetPosition, 
          behavior: 'smooth' 
        });
        
        // Update URL without triggering scroll
        if (history.pushState) {
          history.pushState(null, null, href);
        }
      }
    } catch (error) {
      console.warn('Smooth scroll error:', error);
      // Fallback to default behavior
      window.location.href = href;
    }
  });
});

// Professional navigation scroll effect with throttling
let ticking = false;
const nav = document.querySelector('nav.nav-professional') || document.querySelector('nav');

function updateNav() {
  if (!nav) return;
  
  const currentScroll = window.pageYOffset || window.scrollY || document.documentElement.scrollTop;
  if (currentScroll > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(updateNav);
    ticking = true;
  }
}, { passive: true });

// Lazy load images with error handling
document.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('img[src^="https://images.pexels.com"]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
          }
        }
      });
    });

    images.forEach(img => {
      imageObserver.observe(img);
    });
  }
  
  // Handle image load errors gracefully
  images.forEach(img => {
    img.addEventListener('error', function() {
      this.style.display = 'none';
      const parent = this.parentElement;
      if (parent && parent.classList.contains('image-overlay')) {
        parent.classList.add('bg-gradient-to-br', 'from-gray-100', 'to-gray-200');
      }
    }, { once: true });
  });
});

// Add loading state for external resources
document.addEventListener('DOMContentLoaded', function() {
  // Preload critical images
  const heroImage = document.querySelector('section img');
  if (heroImage && heroImage.src) {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = heroImage.src;
    document.head.appendChild(link);
  }

  // Course card email functionality
  const courseCards = document.querySelectorAll('.course-card');
  const email = 'edisonkipkemoi319@gmail.com';

  courseCards.forEach(card => {
    // Create ripple effect function
    const createRipple = (e) => {
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      
      const rect = card.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      
      card.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    };

    // Click handler
    const handleCourseClick = (e) => {
      // Create ripple effect
      createRipple(e);
      
      // Add loading state
      card.classList.add('email-loading');
      
      const courseName = card.getAttribute('data-course');
      const coursePrice = card.getAttribute('data-price');
      
      // Get course features from the card
      const features = [];
      const listItems = card.querySelectorAll('ul li');
      listItems.forEach(li => {
        const span = li.querySelector('span');
        if (span) {
          const text = span.textContent.trim();
          if (text) {
            features.push(text);
          }
        }
      });

      // Create email subject and body
      const subject = `Inquiry about ${courseName} Course - E-Tech Cyber Cafe`;
      
      // Build email body with proper line breaks
      const emailBody = [
        'Hello E-Tech Cyber Cafe Team,',
        '',
        `I am interested in learning more about the ${courseName} course.`,
        '',
        'Course Information:',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        `Course Name: ${courseName}`,
        `Price: ${coursePrice}`,
        '',
        'Course Features:',
        ...features.map(f => `• ${f}`),
        '',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        '',
        'I would like to know more about:',
        '• Course duration and schedule',
        '• Available class times',
        '• Registration process',
        '• Payment options and plans',
        '• Prerequisites (if any)',
        '',
        'Please send me the course details and next steps.',
        '',
        'Thank you for your time!',
        '',
        'Best regards,',
        '[Your Name]'
      ].join('\n');

      // Encode for URL - encodeURIComponent handles special characters
      // Replace \n with %0D%0A (CRLF) for better email client compatibility
      const encodedSubject = encodeURIComponent(subject);
      const encodedBody = encodeURIComponent(emailBody).replace(/%0A/g, '%0D%0A');
      
      // Create mailto link
      const mailtoLink = `mailto:${email}?subject=${encodedSubject}&body=${encodedBody}`;

      // Open email client directly - using the most reliable method
      // Create a temporary anchor element and trigger click for better browser compatibility
      const link = document.createElement('a');
      link.href = mailtoLink;
      link.style.display = 'none';
      document.body.appendChild(link);
      
      // Small delay for visual feedback
      setTimeout(() => {
        try {
          link.click();
          
          // Remove loading state after email opens
          setTimeout(() => {
            card.classList.remove('email-loading');
          }, 500);
          
          // Remove link after a short delay
          setTimeout(() => {
            if (link.parentNode) {
              document.body.removeChild(link);
            }
          }, 100);
        } catch (error) {
          console.error('Error opening email client:', error);
          // Remove loading state
          card.classList.remove('email-loading');
          
          // Fallback: Use window.location
          try {
            window.location.href = mailtoLink;
          } catch (e) {
            // Last resort: Show alert with email info
            alert(`To inquire about ${courseName} course, please email:\n\n${email}\n\nSubject: ${subject}`);
          }
          // Clean up link
          if (link.parentNode) {
            document.body.removeChild(link);
          }
        }
      }, 150);
    };

    // Add click event
    card.addEventListener('click', handleCourseClick);

    // Add keyboard support (Enter and Space keys)
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        // Create a synthetic event for ripple effect
        const syntheticEvent = {
          clientX: card.getBoundingClientRect().left + card.offsetWidth / 2,
          clientY: card.getBoundingClientRect().top + card.offsetHeight / 2
        };
        handleCourseClick(syntheticEvent);
      }
    });
  });
});

