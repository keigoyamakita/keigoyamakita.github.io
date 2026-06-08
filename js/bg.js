/* bg.js — アニメーション背景 */
(function () {
  const canvas = document.getElementById('bg-canvas');
  const ctx    = canvas.getContext('2d');

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class Blob {
    constructor({ x, y, r, color, vx, vy }) {
      this.x = x; this.y = y; this.r = r;
      this.color = color;
      this.vx = vx; this.vy = vy;
      // ゆらぎ用
      this.angle  = Math.random() * Math.PI * 2;
      this.wobble = 0.003 + Math.random() * 0.004;
    }

    update() {
      this.angle += this.wobble;
      this.x += this.vx + Math.sin(this.angle * 1.3) * 0.4;
      this.y += this.vy + Math.cos(this.angle)       * 0.4;

      const pad = this.r * 0.5;
      if (this.x < -pad)                    { this.x = -pad;                    this.vx *= -1; }
      if (this.x > canvas.width  + pad)     { this.x = canvas.width  + pad;     this.vx *= -1; }
      if (this.y < -pad)                    { this.y = -pad;                    this.vy *= -1; }
      if (this.y > canvas.height + pad)     { this.y = canvas.height + pad;     this.vy *= -1; }
    }

    draw() {
      const g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r);
      g.addColorStop(0,   this.color);
      g.addColorStop(0.5, this.color.replace(/[\d.]+\)$/, '0.06)'));
      g.addColorStop(1,   'transparent');
      ctx.beginPath();
      ctx.fillStyle = g;
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function make(color, rMin, rMax, speedMax) {
    const r  = rMin + Math.random() * (rMax - rMin);
    const spd = 0.15 + Math.random() * speedMax;
    const ang = Math.random() * Math.PI * 2;
    return new Blob({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r,
      color,
      vx: Math.cos(ang) * spd,
      vy: Math.sin(ang) * spd,
    });
  }

  const blobs = [
    make('rgba(88,  166, 255, 0.20)', 320, 520, 0.3),
    make('rgba(210, 168, 255, 0.18)', 280, 460, 0.28),
    make('rgba(88,  166, 255, 0.14)', 220, 380, 0.35),
    make('rgba(63,  185, 80,  0.10)', 200, 340, 0.25),
    make('rgba(210, 168, 255, 0.12)', 260, 420, 0.32),
    make('rgba(255, 140, 80,  0.07)', 180, 300, 0.3),
  ];

  function frame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    blobs.forEach(b => { b.update(); b.draw(); });
    requestAnimationFrame(frame);
  }
  frame();
})();
