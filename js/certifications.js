/* ── LIGHTBOX ─────────────────────────────────────────────────────── */
const certSrcs = [
  'assets/certifications/acmegrade.jpg',
  'assets/certifications/Deloitte.png',
  'assets/certifications/Commonwealth.png',
  'assets/certifications/Ai-Cybersecurity.jpg',
  'assets/certifications/Cybersecurity.png',
  'assets/certifications/Mastercard.png'
];

function openLb(idx) {
  const img = document.getElementById('lb-img');
  img.removeAttribute('onerror');
  img.src = certSrcs[idx];
  img.onerror = function () {
    this.onerror = null;
    this.alt = 'Certificate image not found: ' + certSrcs[idx];
  };
  document.getElementById('lb').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLb() {
  document.getElementById('lb').classList.remove('open');
  document.body.style.overflow = '';
}
document.getElementById('lb').addEventListener('click', function(e) {
  if (e.target === this) closeLb();
});
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLb(); });

