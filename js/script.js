/* ============================================================
   script.js — Jeanne Kilimo UI/UX Portfolio
   ============================================================ */

/* ── 1. NAV: scroll shadow + mobile hamburger ─────────────── */
const navbar  = document.getElementById('navbar');
const toggle  = document.querySelector('.nav-toggle');
const navList = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
  navbar?.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

toggle?.addEventListener('click', () => {
  const open = navList.classList.toggle('open');
  toggle.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', String(open));
});

navList?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navList.classList.remove('open');
    toggle?.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
  });
});


/* ── 2. SCROLL REVEAL ─────────────────────────────────────── */
const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));


/* ── 3. ACTIVE NAV LINK on scroll ────────────────────────── */
const sections   = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navAnchors.forEach(a => {
        a.classList.toggle('active-link', a.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));


/* ── 4. FORMSPREE AJAX ────────────────────────────────────── */
const form       = document.getElementById('contact-form');
const submitBtn  = document.getElementById('submit-btn');
const formStatus = document.getElementById('form-status');

form?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const original = submitBtn.textContent;
  submitBtn.textContent = 'Sending…';
  submitBtn.disabled = true;
  formStatus.textContent = '';
  formStatus.className = 'form-status';

  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    });

    if (res.ok) {
      formStatus.textContent = '✓ Message sent! I\'ll be in touch soon.';
      formStatus.style.color = '#2d9a6b';
      form.reset();
    } else {
      throw new Error('Something went wrong. Please email me directly.');
    }
  } catch (err) {
    formStatus.textContent = `✗ ${err.message}`;
    formStatus.style.color = '#c0392b';
  } finally {
    submitBtn.textContent = original;
    submitBtn.disabled = false;
  }
});