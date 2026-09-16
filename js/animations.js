/* ── REVEAL ───────────────────────────────────────────────────────── */
(function () {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.rv').forEach(el => obs.observe(el));
})();


/* ── COUNT-UP ─────────────────────────────────────────────────────── */
(function () {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = +el.dataset.target;
      const sfx = el.dataset.sfx || '';
      const dur = 1700, t0 = performance.now();
      function tick(now) {
        const p = Math.min((now - t0) / dur, 1);
        const ease = 1 - (1-p)**3;
        el.textContent = Math.round(ease * target).toLocaleString() + sfx;
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.stat-n[data-target]').forEach(el => obs.observe(el));
})();

