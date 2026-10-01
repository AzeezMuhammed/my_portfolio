// ===== Preloader =====
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) setTimeout(() => preloader.classList.add('done'), 150);
});

// ===== Mobile menu toggle =====
const menuBtn = document.getElementById('menuBtn');
const navMenu = document.getElementById('navMenu');

if (menuBtn && navMenu) {
  menuBtn.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', isOpen);
  });

  // Close menu when a nav link is clicked (mobile)
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

// ===== Active nav link on scroll =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a[data-nav]');

function setActiveLink() {
  let current = sections[0]?.id;
  const scrollPos = window.scrollY + 120;

  sections.forEach(section => {
    if (scrollPos >= section.offsetTop) current = section.id;
  });

  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}
window.addEventListener('scroll', setActiveLink, { passive: true });
setActiveLink();

// ===== Navbar shadow on scroll =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (navbar) navbar.style.borderBottomColor = window.scrollY > 10 ? 'var(--border-light)' : 'var(--border)';
}, { passive: true });

// ===== Profile image fallback (shown if azeez.jpeg is missing) =====
const profileImg = document.getElementById('profileImg');
const profileFallback = document.getElementById('profileFallback');
if (profileImg && profileFallback) {
  profileImg.addEventListener('error', () => {
    profileImg.hidden = true;
    profileFallback.hidden = false;
  });
}

// ===== Animate skill bars when they scroll into view =====
const progressBars = document.querySelectorAll('.progress');
if ('IntersectionObserver' in window && progressBars.length) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const span = entry.target.querySelector('span');
        if (span) {
          entry.target.style.setProperty('--w', span.style.width);
          entry.target.classList.add('in-view');
        }
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  progressBars.forEach(bar => observer.observe(bar));
}

// ===== Contact form submission (via FormSubmit — no backend required) =====
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    formNote.textContent = '';
    formNote.classList.remove('success');

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        formNote.textContent = 'Message sent — thanks! I\'ll get back to you soon.';
        formNote.classList.add('success');
        contactForm.reset();
      } else {
        throw new Error('Request failed');
      }
    } catch (err) {
      formNote.textContent = 'Something went wrong. Please email me directly instead.';
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
}

// ===== Footer year =====
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();