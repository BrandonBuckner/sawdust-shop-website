/* ============================================
   THE SAW DUST SHOP — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* --- Mobile Navigation Toggle --- */
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.site-nav__links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
      document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close nav when clicking a link
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  /* --- FAQ Accordion --- */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function (item) {
    const question = item.querySelector('.faq-item__question');
    if (question) {
      question.addEventListener('click', function () {
        const isActive = item.classList.contains('active');

        // Close all others
        faqItems.forEach(function (other) {
          other.classList.remove('active');
        });

        // Toggle current
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  /* --- Contact Form Handler --- */
  const contactForm = document.getElementById('quote-form');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const statusEl = document.getElementById('form-status');
      const honeypot = document.getElementById('website-url');

      // Honeypot check
      if (honeypot && honeypot.value !== '') {
        return;
      }

      // Gather form data
      const formData = {
        name: contactForm.querySelector('[name="name"]').value.trim(),
        email: contactForm.querySelector('[name="email"]').value.trim(),
        phone: contactForm.querySelector('[name="phone"]').value.trim(),
        city: contactForm.querySelector('[name="city"]').value.trim(),
        interest: contactForm.querySelector('[name="interest"]').value,
        message: contactForm.querySelector('[name="message"]').value.trim(),
        referral: contactForm.querySelector('[name="referral"]').value
      };

      // Basic validation
      if (!formData.name || !formData.email || !formData.message) {
        showStatus(statusEl, 'error', 'Please fill in your name, email, and project description.');
        return;
      }

      if (!isValidEmail(formData.email)) {
        showStatus(statusEl, 'error', 'Please enter a valid email address.');
        return;
      }

      // Submit to API Gateway
      /* BACKEND: Replace this URL with your API Gateway endpoint */
      var API_ENDPOINT = 'https://YOUR-API-GATEWAY-URL/submit-quote';

      var submitBtn = contactForm.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      fetch(API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
        .then(function (response) {
          if (response.ok) {
            showStatus(statusEl, 'success', 'Thanks! Your quote request has been sent. We\'ll get back to you soon.');
            contactForm.reset();
          } else {
            throw new Error('Server error');
          }
        })
        .catch(function () {
          showStatus(statusEl, 'error', 'Something went wrong. Please call us at (262) 488-0879 or try again later.');
        })
        .finally(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send Quote Request';
        });
    });
  }

  function showStatus(el, type, message) {
    if (!el) return;
    el.className = 'form-status form-status--' + type;
    el.textContent = message;
    el.style.display = 'block';
    el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  /* --- Image Carousel --- */
  document.querySelectorAll('[data-carousel]').forEach(function(container) {
    var slides = JSON.parse(container.dataset.carousel);
    if (slides.length < 2) return;

    var img = container.querySelector('img');
    var source = container.querySelector('source');
    var current = 0;

    var prevBtn = document.createElement('button');
    prevBtn.className = 'carousel-btn carousel-btn--prev';
    prevBtn.setAttribute('aria-label', 'Previous image');
    prevBtn.innerHTML = '&#8249;';

    var nextBtn = document.createElement('button');
    nextBtn.className = 'carousel-btn carousel-btn--next';
    nextBtn.setAttribute('aria-label', 'Next image');
    nextBtn.innerHTML = '&#8250;';

    var dotsEl = document.createElement('div');
    dotsEl.className = 'carousel-dots';

    var dots = slides.map(function(slide, i) {
      var dot = document.createElement('button');
      dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Image ' + (i + 1));
      dot.addEventListener('click', function() { goTo(i); });
      dotsEl.appendChild(dot);
      return dot;
    });

    container.appendChild(prevBtn);
    container.appendChild(nextBtn);
    container.appendChild(dotsEl);

    function goTo(index) {
      current = (index + slides.length) % slides.length;
      img.src = slides[current].src;
      img.alt = slides[current].alt;
      if (source) source.srcset = slides[current].webp || '';
      dots.forEach(function(d, i) { d.classList.toggle('active', i === current); });
    }

    prevBtn.addEventListener('click', function() { goTo(current - 1); });
    nextBtn.addEventListener('click', function() { goTo(current + 1); });
  });

  /* --- Lazy Load Images --- */
  var lazyImages = document.querySelectorAll('img[loading="lazy"]');
  lazyImages.forEach(function (img) {
    if (img.complete) {
      img.classList.add('loaded');
    } else {
      img.addEventListener('load', function () {
        img.classList.add('loaded');
      });
    }
  });

  /* --- Scroll Animations --- */
  if ('IntersectionObserver' in window) {
    var animatedElements = document.querySelectorAll('.animate-on-scroll');
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    animatedElements.forEach(function (el) {
      observer.observe(el);
    });
  }

});
