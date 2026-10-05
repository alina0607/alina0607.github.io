// Pointer light: a soft glow follows the pointer, and the nearest card's border lights up
// with the brand gradient where the pointer is. Off for touch screens and reduced motion.
(function () {
  const fine = window.matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)');
  if (!fine.matches) return;
  const root = document.documentElement;
  const cards = document.querySelectorAll(
    '.project-card, .edu-item, .skill-group, .sidebar-card, .award-item, .result-box, .rec-card');
  document.body.classList.add('has-glow');

  let x = 0, y = 0, queued = false;
  function paint() {
    queued = false;
    root.style.setProperty('--mx', x + 'px');
    root.style.setProperty('--my', y + 'px');
    cards.forEach(function (card) {
      const r = card.getBoundingClientRect();
      const near = x > r.left - 120 && x < r.right + 120 && y > r.top - 120 && y < r.bottom + 120;
      card.classList.toggle('lit', near);
      if (near) {
        card.style.setProperty('--cx', (x - r.left) + 'px');
        card.style.setProperty('--cy', (y - r.top) + 'px');
      }
    });
  }
  window.addEventListener('pointermove', function (e) {
    x = e.clientX; y = e.clientY;
    if (!queued) { queued = true; requestAnimationFrame(paint); }
  }, { passive: true });
  document.addEventListener('pointerleave', function () {
    cards.forEach(function (card) { card.classList.remove('lit'); });
  });
})();
