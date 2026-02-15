/**
 * Law Firm — Shared JavaScript
 * Minimal: mobile nav toggle, accessibility
 */

(function () {
  'use strict';

  var nav = document.querySelector('.main-nav');
  var toggle = document.querySelector('.nav-toggle');

  if (nav && toggle) {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', 'main-nav');
    nav.id = 'main-nav';

    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.contains('is-open');
      nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
      document.body.style.overflow = isOpen ? '' : 'hidden';
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // Close nav on escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav && nav.classList.contains('is-open')) {
      nav.classList.remove('is-open');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });

  // Contact form: submit via fetch then redirect to thank-you page (works on localhost and production)
  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var submitBtn = contactForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = '送出中…';
      }
      fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        redirect: 'manual'
      })
        .then(function (response) {
          if (response.type === 'opaqueredirect' || response.status === 0 || response.ok) {
            window.location.replace('thank-you.html');
          } else {
            contactForm.submit();
          }
        })
        .catch(function () {
          contactForm.submit();
        })
        .finally(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = '送出';
          }
        });
    });
  }
})();
