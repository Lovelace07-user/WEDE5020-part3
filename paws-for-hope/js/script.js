/* ============================================
   Paws for Hope - Part 3 JavaScript
   WEDE5020POE - Enhancing Functionality & SEO
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  // ---------- 1. MOBILE NAV TOGGLE ----------
  const nav = document.querySelector('nav ul');
  const menuBtn = document.getElementById('menu-toggle');
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function () {
      nav.classList.toggle('show');
      this.classList.toggle('open');
    });
  }

  // ---------- 2. ACCORDION (About / FAQ style) ----------
  const accordionBtns = document.querySelectorAll('.accordion-btn');
  accordionBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const content = this.nextElementSibling;
      const isOpen = content.classList.contains('open');

      // Close all
      document.querySelectorAll('.accordion-content').forEach(function (c) {
        c.classList.remove('open');
      });
      document.querySelectorAll('.accordion-btn').forEach(function (b) {
        b.classList.remove('active');
      });

      // Open clicked if it was closed
      if (!isOpen) {
        content.classList.add('open');
        this.classList.add('active');
      }
    });
  });

  // ---------- 3. ANIMAL FILTER / SEARCH (services page) ----------
  const searchInput = document.getElementById('animal-search');
  const typeFilter = document.getElementById('type-filter');
  const animalCards = document.querySelectorAll('.animal-card');

  function filterAnimals() {
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    const selectedType = typeFilter ? typeFilter.value.toLowerCase() : 'all';

    animalCards.forEach(function (card) {
      const name = card.querySelector('h3') ? card.querySelector('h3').textContent.toLowerCase() : '';
      const type = card.getAttribute('data-type') || '';
      const desc = card.querySelector('p') ? card.querySelector('p').textContent.toLowerCase() : '';

      const matchesSearch = name.includes(searchTerm) || desc.includes(searchTerm);
      const matchesType = selectedType === 'all' || type === selectedType;

      if (matchesSearch && matchesType) {
        card.style.display = 'block';
        card.classList.add('fade-in');
      } else {
        card.style.display = 'none';
      }
    });
  }

  if (searchInput) searchInput.addEventListener('input', filterAnimals);
  if (typeFilter) typeFilter.addEventListener('change', filterAnimals);

  // ---------- 4. LIGHTBOX GALLERY ----------
  const galleryImages = document.querySelectorAll('.gallery-img');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');

  galleryImages.forEach(function (img) {
    img.addEventListener('click', function () {
      if (lightbox && lightboxImg) {
        lightboxImg.src = this.src;
        lightboxImg.alt = this.alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }
  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }

  function closeLightbox() {
    if (lightbox) {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  // ---------- 5. MODAL (optional success / info) ----------
  window.showModal = function (title, message) {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalMsg = document.getElementById('modal-message');
    if (modal && modalTitle && modalMsg) {
      modalTitle.textContent = title;
      modalMsg.textContent = message;
      modal.classList.add('active');
    }
  };

  const modalClose = document.getElementById('modal-close');
  if (modalClose) {
    modalClose.addEventListener('click', function () {
      document.getElementById('modal').classList.remove('active');
    });
  }

  // ---------- 6. FORM VALIDATION - ENQUIRY ----------
  const enquiryForm = document.getElementById('enquiry-form');
  if (enquiryForm) {
    enquiryForm.addEventListener('submit', function (e) {
      e.preventDefault();
      clearErrors(enquiryForm);

      let valid = true;
      const fullname = enquiryForm.querySelector('#fullname');
      const email = enquiryForm.querySelector('#email');
      const phone = enquiryForm.querySelector('#phone');
      const interest = enquiryForm.querySelector('#interest');
      const message = enquiryForm.querySelector('#message');

      if (!fullname.value.trim() || fullname.value.trim().length < 2) {
        showError(fullname, 'Please enter your full name (at least 2 characters).');
        valid = false;
      }

      if (!email.value.trim() || !isValidEmail(email.value)) {
        showError(email, 'Please enter a valid email address.');
        valid = false;
      }

      if (phone.value.trim() && !isValidPhone(phone.value)) {
        showError(phone, 'Please enter a valid South African phone number.');
        valid = false;
      }

      if (!interest.value) {
        showError(interest, 'Please select what you are interested in.');
        valid = false;
      }

      if (message.value.trim().length > 0 && message.value.trim().length < 10) {
        showError(message, 'Message should be at least 10 characters if provided.');
        valid = false;
      }

      if (valid) {
        // Simulate AJAX success
        showModal('Thank you!', 'Thanks for getting in touch. We’ll get back to you within a couple of working days.');
        enquiryForm.reset();
      }
    });
  }

  // ---------- 7. FORM VALIDATION - CONTACT ----------
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      clearErrors(contactForm);

      let valid = true;
      const name = contactForm.querySelector('#name');
      const email = contactForm.querySelector('#email');
      const subject = contactForm.querySelector('#subject');
      const message = contactForm.querySelector('#message');

      if (!name.value.trim() || name.value.trim().length < 2) {
        showError(name, 'Please enter your full name.');
        valid = false;
      }

      if (!email.value.trim() || !isValidEmail(email.value)) {
        showError(email, 'Please enter a valid email address.');
        valid = false;
      }

      if (!subject.value.trim()) {
        showError(subject, 'Please enter a subject.');
        valid = false;
      }

      if (!message.value.trim() || message.value.trim().length < 15) {
        showError(message, 'Please write a message of at least 15 characters.');
        valid = false;
      }

      if (valid) {
        // Simulate sending email / AJAX
        showModal('Message Sent', 'Thanks for the message. We’ll reply as soon as we can.');
        contactForm.reset();
      }
    });
  }

  // ---------- HELPER FUNCTIONS ----------
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function isValidPhone(phone) {
    // Basic SA phone: optional +27 or 0, then 9 digits
    return /^(\+27|0)[0-9]{9}$/.test(phone.replace(/\s/g, ''));
  }

  function showError(input, message) {
    const formGroup = input.closest('.form-group') || input.parentElement;
    const error = document.createElement('span');
    error.className = 'error-message';
    error.textContent = message;
    formGroup.appendChild(error);
    input.classList.add('input-error');
  }

  function clearErrors(form) {
    form.querySelectorAll('.error-message').forEach(function (el) {
      el.remove();
    });
    form.querySelectorAll('.input-error').forEach(function (el) {
      el.classList.remove('input-error');
    });
  }

  // ---------- 8. SMOOTH SCROLL & FADE-IN ON SCROLL ----------
  const fadeEls = document.querySelectorAll('.fade-on-scroll');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.15 });

    fadeEls.forEach(function (el) {
      observer.observe(el);
    });
  }

  // ---------- 9. CURRENT YEAR IN FOOTER ----------
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

});
