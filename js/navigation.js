/* ── NAV ACTIVE ───────────────────────────────────────────────────── */
(function () {
  const secs = document.querySelectorAll('section[id]');
  const lks  = document.querySelectorAll('.nav-links a');
  const obs  = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        lks.forEach(l => l.classList.remove('active'));
        const a = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
        if (a) a.classList.add('active');
      }
    });
  }, { threshold: 0.4 });
  secs.forEach(s => obs.observe(s));
})();


/* ── HAMBURGER ────────────────────────────────────────────────────── */
const hb = document.getElementById('hamburger');
const mm = document.getElementById('mob-menu');
hb.addEventListener('click', () => {
  hb.classList.toggle('open');
  mm.classList.toggle('open');
});
function closeMob() { hb.classList.remove('open'); mm.classList.remove('open'); }

