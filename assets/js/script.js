/* ===================================================
   Sakshi Sonone — Portfolio Script
   =================================================== */

/* ---------- Typed Text Effect ---------- */
const phrases = ['Tech Educator', 'Java Developer', 'Web Developer', 'Tech Educator'];
let phraseIdx = 0, charIdx = 0, deleting = false;
const typedEl = document.getElementById('typed-text');

function type() {
  if (!typedEl) return;
  const phrase = phrases[phraseIdx];
  if (deleting) {
    typedEl.textContent = phrase.substring(0, --charIdx);
    if (charIdx === 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      setTimeout(type, 400);
      return;
    }
  } else {
    typedEl.textContent = phrase.substring(0, ++charIdx);
    if (charIdx === phrase.length) {
      deleting = true;
      setTimeout(type, 1800);
      return;
    }
  }
  setTimeout(type, deleting ? 60 : 100);
}
setTimeout(type, 1000);

/* ---------- Skills Accordion ---------- */
const skillTabs = document.querySelectorAll('[data-target]');
const skillContents = document.querySelectorAll('[data-content]');

skillTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = document.querySelector(tab.dataset.target);
    skillContents.forEach(tc => tc.classList.remove('skills_active'));
    skillTabs.forEach(t => t.classList.remove('skills_active'));
    if (target) target.classList.add('skills_active');
    tab.classList.add('skills_active');
  });
});

/* ---------- Work Filter ---------- */
const workFilterBtns = document.querySelectorAll('.work_item');
const workCards = document.querySelectorAll('.work_card');

workFilterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    workFilterBtns.forEach(b => b.classList.remove('active-work'));
    btn.classList.add('active-work');
    const filter = btn.textContent.trim().toLowerCase();
    workCards.forEach(card => {
      const category = (card.dataset.category || '').toLowerCase();
      if (filter === 'all' || category === filter) {
        card.style.display = 'block';
        card.style.animation = 'fadeInLeft 0.4s ease';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

/* ---------- Active Nav on Scroll ---------- */
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  sections.forEach(section => {
    const top = section.offsetTop - 100;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav_link[href="#${id}"]`);
    if (link) {
      if (scrollY >= top && scrollY < top + height) {
        document.querySelectorAll('.nav_link').forEach(l => l.classList.remove('active-link'));
        link.classList.add('active-link');
      }
    }
  });
});

/* ---------- Contact Form ---------- */
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.form_submit');
  const originalHTML = btn.innerHTML;
  btn.innerHTML = '<i class="uil uil-check-circle button_icon"></i><span>Message Sent!</span>';
  btn.style.background = '#22c55e';
  setTimeout(() => {
    btn.innerHTML = originalHTML;
    btn.style.background = '';
    e.target.reset();
  }, 3000);
}
