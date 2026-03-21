// Password gate
(function () {
  const KEY = 'sketch_auth';
  const PASS = 'NIP2026';
  const gate = document.getElementById('password-gate');
  const form = document.getElementById('gate-form');
  const input = document.getElementById('gate-input');
  const error = document.getElementById('gate-error');

  if (sessionStorage.getItem(KEY) === '1') {
    gate.remove();
    return;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (input.value.trim().toUpperCase() === PASS) {
      sessionStorage.setItem(KEY, '1');
      gate.classList.add('hidden');
      setTimeout(() => gate.remove(), 650);
    } else {
      error.style.opacity = '1';
      input.value = '';
      input.focus();
      setTimeout(() => { error.style.opacity = '0'; }, 2500);
    }
  });
})();

// Fade-in on scroll — observe ALL elements with .fade-in class
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Smartcrop.js — smart face-detection cropping for headshots
function applySmartCrop(img) {
  const wrap = img.closest('.team-card-img-wrap, .talent-img-wrap');
  const w = wrap ? wrap.offsetWidth : img.offsetWidth || 400;
  const h = img.offsetHeight || 300;
  if (typeof smartcrop === 'undefined' || !w || !h) return;
  smartcrop.crop(img, { width: w, height: h }).then(result => {
    const c = result.topCrop;
    const x = ((c.x / img.naturalWidth) * 100).toFixed(1);
    const y = ((c.y / img.naturalHeight) * 100).toFixed(1);
    img.style.objectPosition = `${x}% ${y}%`;
  });
}

window.addEventListener('load', () => {
  document.querySelectorAll('.team-card-bg, .talent-img').forEach(img => {
    if (img.complete && img.naturalWidth > 0) applySmartCrop(img);
    else img.addEventListener('load', () => applySmartCrop(img));
  });
});
