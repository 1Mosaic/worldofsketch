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
