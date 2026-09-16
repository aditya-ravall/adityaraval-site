/* ── PARTICLE CANVAS ──────────────────────────────────────────────── */
(function () {
  const cv = document.getElementById('canvas');
  const cx = cv.getContext('2d');
  let W, H, pts;
  const N = 72, LINK = 128, SPEED = 0.38;
  let mx = -999, my = -999;

  function resize() {
    W = cv.width  = cv.offsetWidth;
    H = cv.height = cv.offsetHeight;
  }

  function mkPt() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - .5) * SPEED,
      vy: (Math.random() - .5) * SPEED,
      r: Math.random() * 1.4 + .5,
      a: Math.random() * .45 + .15
    };
  }

  function init() { resize(); pts = Array.from({ length: N }, mkPt); }

  function frame() {
    cx.clearRect(0, 0, W, H);

    /* ambient vignette */
    const g = cx.createRadialGradient(W*.5, H*.5, 0, W*.5, H*.5, W*.65);
    g.addColorStop(0, 'rgba(0,18,50,0)');
    g.addColorStop(1, 'rgba(5,10,20,.35)');
    cx.fillStyle = g; cx.fillRect(0, 0, W, H);

    pts.forEach((p, i) => {
      /* mouse repel */
      const dx = p.x - mx, dy = p.y - my;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < 110) {
        const f = (110 - dist) / 110 * .06;
        p.vx += (dx/dist)*f; p.vy += (dy/dist)*f;
      }
      /* speed clamp */
      const sp = Math.sqrt(p.vx*p.vx + p.vy*p.vy);
      if (sp > 1.4) { p.vx *= .94; p.vy *= .94; }

      p.x += p.vx; p.y += p.vy;
      if (p.x < -8) p.x = W+8; if (p.x > W+8) p.x = -8;
      if (p.y < -8) p.y = H+8; if (p.y > H+8) p.y = -8;

      /* dot */
      cx.beginPath();
      cx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      cx.fillStyle = `rgba(0,185,255,${p.a})`;
      cx.fill();

      /* links */
      for (let j = i+1; j < pts.length; j++) {
        const q = pts[j];
        const dx2 = p.x-q.x, dy2 = p.y-q.y;
        const d2 = Math.sqrt(dx2*dx2+dy2*dy2);
        if (d2 < LINK) {
          cx.beginPath();
          cx.moveTo(p.x, p.y); cx.lineTo(q.x, q.y);
          cx.strokeStyle = `rgba(0,180,255,${(1-d2/LINK)*.2})`;
          cx.lineWidth = .55; cx.stroke();
        }
      }
      /* mouse line */
      const md = Math.sqrt((p.x-mx)**2+(p.y-my)**2);
      if (md < LINK*1.6) {
        cx.beginPath();
        cx.moveTo(p.x,p.y); cx.lineTo(mx,my);
        cx.strokeStyle = `rgba(0,212,255,${(1-md/(LINK*1.6))*.35})`;
        cx.lineWidth = .7; cx.stroke();
      }
    });
    requestAnimationFrame(frame);
  }

  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', e => {
    const r = cv.getBoundingClientRect();
    mx = e.clientX - r.left; my = e.clientY - r.top;
  });
  window.addEventListener('touchmove', e => {
    const t = e.touches[0], r = cv.getBoundingClientRect();
    mx = t.clientX - r.left; my = t.clientY - r.top;
  }, { passive: true });
  document.addEventListener('mouseleave', () => { mx = -999; my = -999; });
  init(); frame();
})();

