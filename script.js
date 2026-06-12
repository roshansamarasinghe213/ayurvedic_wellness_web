/* ============================================================
   VEDA & BLOOM — Ayurvedic Wellness Blog
   script.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ----------------------------------------------------------
     1. NAV: Scroll shadow + Mobile hamburger
  ---------------------------------------------------------- */
  const nav = document.getElementById('main-nav');
  const hamburger = document.getElementById('nav-hamburger');
  const navLinks = document.getElementById('nav-links');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Close mobile menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  /* ----------------------------------------------------------
     2. SCROLL REVEAL via IntersectionObserver
  ---------------------------------------------------------- */
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target); // animate once
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach(el => revealObserver.observe(el));

  /* ----------------------------------------------------------
     3. PILLAR CARDS: Accessible keyboard interaction
  ---------------------------------------------------------- */
  document.querySelectorAll('.pillar-card').forEach(card => {
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.classList.toggle('active');
      }
    });
  });

  /* ----------------------------------------------------------
     4. FACILITIES SLIDER
  ---------------------------------------------------------- */
  const facilityTrack = document.getElementById('facility-track');
  const facilityDotsWrap = document.getElementById('facility-dots');
  const facilityPrev = document.getElementById('facility-prev');
  const facilityNext = document.getElementById('facility-next');

  if (facilityTrack) {
    const slides = facilityTrack.querySelectorAll('.facility-slide');
    let current = 0;

    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'facility-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      facilityDotsWrap.appendChild(dot);
    });

    const dots = facilityDotsWrap.querySelectorAll('.facility-dot');

    function goTo(index) {
      current = (index + slides.length) % slides.length;
      slides.forEach((s, i) => s.classList.toggle('active', i === current));
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    facilityPrev.addEventListener('click', () => goTo(current - 1));
    facilityNext.addEventListener('click', () => goTo(current + 1));

    // Auto-advance
    let autoTimer = setInterval(() => goTo(current + 1), 6000);
    const slider = facilityTrack.closest('.facility-slider');
    slider.addEventListener('mouseenter', () => clearInterval(autoTimer));
    slider.addEventListener('mouseleave', () => {
      autoTimer = setInterval(() => goTo(current + 1), 6000);
    });
  }

  /* ----------------------------------------------------------
     5. RITUAL STEPS: Highlight on click
  ---------------------------------------------------------- */
  const ritualSteps = document.querySelectorAll('.ritual-step');
  ritualSteps.forEach((step, index) => {
    step.setAttribute('tabindex', '0');
    step.addEventListener('click', () => {
      ritualSteps.forEach(s => s.style.background = '');
      step.style.background = 'rgba(124, 154, 107, 0.12)';
      step.style.transform = 'translateX(10px)';
      setTimeout(() => { step.style.transform = ''; }, 400);
    });
    step.addEventListener('keydown', e => {
      if (e.key === 'Enter') step.click();
    });
  });

  /* ----------------------------------------------------------
     6. CONTACT FORM: Validation & submit
  ---------------------------------------------------------- */
  const contactNameInput  = document.getElementById('contact-name');
  const contactEmailInput = document.getElementById('contact-email');
  const contactPhoneInput = document.getElementById('contact-phone');
  const contactMsgInput   = document.getElementById('contact-message');
  const contactSubmitBtn  = document.getElementById('contact-submit-btn');
  const contactMsg        = document.getElementById('contact-msg');

  if (contactSubmitBtn) {
    contactSubmitBtn.addEventListener('click', () => {
      const name  = contactNameInput.value.trim();
      const email = contactEmailInput.value.trim();
      const phone = contactPhoneInput.value.trim();
      const msg   = contactMsgInput.value.trim();

      if (!name) {
        contactMsg.textContent = 'Please enter your name.';
        contactMsg.style.color = '#C4956A';
        contactNameInput.focus(); return;
      }
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        contactMsg.textContent = 'Please enter a valid email address.';
        contactMsg.style.color = '#C4956A';
        contactEmailInput.focus(); return;
      }
      if (!phone) {
        contactMsg.textContent = 'Please enter your phone number.';
        contactMsg.style.color = '#C4956A';
        contactPhoneInput.focus(); return;
      }
      if (!msg) {
        contactMsg.textContent = 'Please enter your message.';
        contactMsg.style.color = '#C4956A';
        contactMsgInput.focus(); return;
      }

      contactSubmitBtn.textContent = 'Sending…';
      contactSubmitBtn.disabled = true;

      setTimeout(() => {
        contactMsg.textContent = '🌿 Thank you! We\'ll be in touch with you soon.';
        contactMsg.style.color = '#4A6B3A';
        contactNameInput.value = '';
        contactEmailInput.value = '';
        contactPhoneInput.value = '';
        contactMsgInput.value = '';
        contactSubmitBtn.textContent = 'Message Sent ✓';
        contactSubmitBtn.style.background = '#4A6B3A';
      }, 1200);
    });
  }

  /* ----------------------------------------------------------
     7. SMOOTH SCROLL for nav links
  ---------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 70; // nav height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ----------------------------------------------------------
     8. NAV CTA: Scroll to booking
  ---------------------------------------------------------- */
  document.querySelector('.nav-cta')?.addEventListener('click', () => {
    const booking = document.querySelector('.booking');
    if (booking) {
      const top = booking.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });

  /* ----------------------------------------------------------
     BOOKING FORM: Validation & submit
  ---------------------------------------------------------- */
  const bookingBtn = document.getElementById('booking-btn');
  const bookingMsg = document.getElementById('booking-msg');

  if (bookingBtn) {
    bookingBtn.addEventListener('click', () => {
      const name     = document.getElementById('book-name').value.trim();
      const email    = document.getElementById('book-email').value.trim();
      const phone    = document.getElementById('book-phone').value.trim();
      const checkin  = document.getElementById('book-checkin').value;
      const checkout = document.getElementById('book-checkout').value;
      const guests   = document.getElementById('book-guests').value;
      const room     = document.getElementById('book-room').value;

      if (!name) {
        bookingMsg.textContent = 'Please enter your full name.';
        bookingMsg.style.color = '#C4956A';
        document.getElementById('book-name').focus(); return;
      }
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        bookingMsg.textContent = 'Please enter a valid email address.';
        bookingMsg.style.color = '#C4956A';
        document.getElementById('book-email').focus(); return;
      }
      if (!phone) {
        bookingMsg.textContent = 'Please enter your phone number.';
        bookingMsg.style.color = '#C4956A';
        document.getElementById('book-phone').focus(); return;
      }
      if (!checkin || !checkout) {
        bookingMsg.textContent = 'Please select your check-in and check-out dates.';
        bookingMsg.style.color = '#C4956A'; return;
      }
      if (new Date(checkout) <= new Date(checkin)) {
        bookingMsg.textContent = 'Check-out must be after check-in.';
        bookingMsg.style.color = '#C4956A'; return;
      }
      if (!guests) {
        bookingMsg.textContent = 'Please select the number of guests.';
        bookingMsg.style.color = '#C4956A'; return;
      }
      if (!room) {
        bookingMsg.textContent = 'Please select a room type.';
        bookingMsg.style.color = '#C4956A'; return;
      }

      bookingBtn.textContent = 'Processing…';
      bookingBtn.disabled = true;

      setTimeout(() => {
        bookingMsg.textContent = '🌿 Your reservation request has been received! We\'ll confirm your stay within 24 hours.';
        bookingMsg.style.color = '#4A6B3A';
        bookingBtn.textContent = 'Request Sent ✓';
        bookingBtn.style.background = '#4A6B3A';
        document.querySelectorAll('.booking-field input, .booking-field select, .booking-field textarea').forEach(el => el.value = '');
      }, 1400);
    });
  }

  /* ----------------------------------------------------------
     9. HERO BUTTONS
  ---------------------------------------------------------- */
  const heroBtns = document.querySelectorAll('.hero-btns button');
  if (heroBtns[0]) {
    heroBtns[0].addEventListener('click', () => {
      const pillars = document.querySelector('.pillars');
      if (pillars) {
        const top = pillars.getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  }
  if (heroBtns[1]) {
    heroBtns[1].addEventListener('click', () => {
      showToast('🌿 Dosha quiz coming soon! Subscribe to be notified.');
    });
  }

  /* ----------------------------------------------------------
     10. FOOTER LINKS: Prevent default
  ---------------------------------------------------------- */
  document.querySelectorAll('.footer-links a, .footer-social a').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      showToast('Page coming soon!');
    });
  });

  /* ----------------------------------------------------------
     12. PROGRESS BAR on scroll
  ---------------------------------------------------------- */
  const progressBar = document.createElement('div');
  progressBar.style.cssText = `
    position: fixed; top: 0; left: 0; height: 2px; width: 0;
    background: linear-gradient(to right, #7C9A6B, #C4956A);
    z-index: 200; transition: width 0.1s linear;
    pointer-events: none;
  `;
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = pct + '%';
  });

  /* ----------------------------------------------------------
     13. TOAST NOTIFICATION helper
  ---------------------------------------------------------- */
  function showToast(message) {
    const existing = document.querySelector('.toast-notification');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed; bottom: 2rem; left: 50%; transform: translateX(-50%) translateY(20px);
      background: #2C2416; color: white; padding: 12px 24px;
      border-radius: 40px; font-size: 14px; font-family: 'Inter', sans-serif;
      z-index: 9999; opacity: 0;
      transition: opacity 0.3s ease, transform 0.3s ease;
      box-shadow: 0 8px 30px rgba(0,0,0,0.2);
      pointer-events: none; white-space: nowrap;
    `;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(-50%) translateY(0)';
      });
    });

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(10px)';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  /* ----------------------------------------------------------
     14. DUAL VIDEO BACKGROUND — full-play crossfade loop
         Each video plays completely to the end before crossfading
         to the next one. No timeupdate polling — uses the 'ended'
         event so nothing gets cut off early.
  ---------------------------------------------------------- */
  const vidA = document.getElementById('heroVidA');
  const vidB = document.getElementById('heroVidB');

  if (vidA && vidB) {
    const FADE_DURATION = 1200; // ms — must match CSS transition on .hero-vid

    let current = vidA;
    let next    = vidB;

    // Silently start a video from the beginning
    function playVideo(v) {
      v.currentTime = 0;
      v.play().catch(() => {});
    }

    // Called when the current video fires 'ended'
    function onEnded() {
      // Start the next video immediately so it's running during the fade
      playVideo(next);

      // Cross-fade: show next, hide current
      next.classList.add('active');
      current.classList.remove('active');

      // After the CSS opacity transition completes, reset the outgoing video
      // and re-attach the 'ended' listener to the newly active one
      const outgoing = current;
      setTimeout(() => {
        outgoing.pause();
        outgoing.currentTime = 0;
        outgoing.removeEventListener('ended', onEnded); // clean up old listener
      }, FADE_DURATION + 100);

      // Swap roles and listen for the new current video's end
      current = next;
      next    = outgoing;
      current.addEventListener('ended', onEnded, { once: true });
    }

    // Preload both, start Video A, listen for its end
    vidA.load();
    vidB.load();
    playVideo(vidA);
    vidA.addEventListener('ended', onEnded, { once: true });
  }

  /* ----------------------------------------------------------
     15. Active nav link highlighting on scroll
  ---------------------------------------------------------- */
  const sections = document.querySelectorAll('section[id], div[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navAnchors.forEach(a => {
          a.style.color = '';
          if (a.getAttribute('href') === `#${id}`) {
            a.style.color = 'var(--sage-dark)';
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => sectionObserver.observe(s));


  /* ----------------------------------------------------------
     16. ABOUT US VIDEO — ensure autoplay, retry on policy block
  ---------------------------------------------------------- */
  const aboutVid = document.getElementById('aboutVid');
  if (aboutVid) {
    // autoplay + loop is set in HTML; this catches browsers that block it
    const playAbout = () => {
      aboutVid.play().catch(() => {
        // If blocked, play on first user interaction
        document.addEventListener('click', () => aboutVid.play().catch(() => {}), { once: true });
        document.addEventListener('touchstart', () => aboutVid.play().catch(() => {}), { once: true });
      });
    };
    if (aboutVid.readyState >= 2) {
      playAbout();
    } else {
      aboutVid.addEventListener('canplay', playAbout, { once: true });
    }
  }

});
