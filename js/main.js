/* ── MAGNETIC BUTTONS ─────────────────────────────────────────────── */
document.querySelectorAll('.btn-p, .btn-s').forEach(b => {
  b.addEventListener('mousemove', function(e) {
    const r = this.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width  / 2) * .12;
    const y = (e.clientY - r.top  - r.height / 2) * .12;
    this.style.transform = `translate(${x}px,${y}px) translateY(-2px)`;
  });
  b.addEventListener('mouseleave', function() {
    this.style.transform = '';
  });
});
