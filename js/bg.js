/* bg.js — アニメーション背景 */
(function () {
  const canvas = document.getElementById('bg-canvas');
  const ctx    = canvas.getContext('2d');

  // 内部解像度を下げて描画するピクセル数自体を減らす（CSSで100%に引き伸ばすので見た目のサイズは変わらない）
  const RENDER_SCALE = 0.55;

  function resize() {
    canvas.width  = Math.round(window.innerWidth  * RENDER_SCALE);
    canvas.height = Math.round(window.innerHeight * RENDER_SCALE);
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
      this.sprite = this.makeSprite();
    }

    // グラデーションは形が変わらないので一度だけオフスクリーンに描いておき、
    // 毎フレームは drawImage だけで済ませる（createRadialGradient の再計算をなくす）
    makeSprite() {
      const size = Math.ceil(this.r * 2);
      const sprite = document.createElement('canvas');
      sprite.width = sprite.height = size;
      const sctx = sprite.getContext('2d');
      const g = sctx.createRadialGradient(this.r, this.r, 0, this.r, this.r, this.r);
      g.addColorStop(0,   this.color);
      g.addColorStop(0.5, this.color.replace(/[\d.]+\)$/, '0.06)'));
      g.addColorStop(1,   'transparent');
      sctx.fillStyle = g;
      sctx.beginPath();
      sctx.arc(this.r, this.r, this.r, 0, Math.PI * 2);
      sctx.fill();
      return sprite;
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
      ctx.drawImage(this.sprite, this.x - this.r, this.y - this.r);
    }
  }

  // RENDER_SCALE で縮小した座標系に合わせて半径・速度もスケールする
  function make(color, rMin, rMax, speedMax) {
    const r   = (rMin + Math.random() * (rMax - rMin)) * RENDER_SCALE;
    const spd = (0.15 + Math.random() * speedMax) * RENDER_SCALE;
    const ang = Math.random() * Math.PI * 2;
    return new Blob({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r,
      color,
      vx: Math.cos(ang) * spd,
      vy: Math.sin(ang) * spd,
    });
  }

  // 数を6→4に減らして更新・描画コストを削減
  const blobs = [
    make('rgba(88,  166, 255, 0.20)', 320, 520, 0.3),
    make('rgba(210, 168, 255, 0.18)', 280, 460, 0.28),
    make('rgba(88,  166, 255, 0.14)', 220, 380, 0.35),
    make('rgba(63,  185, 80,  0.10)', 200, 340, 0.25),
  ];

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion) {
    blobs.forEach(b => b.draw());
    return;
  }

  // 60fpsではなく24fps相当に間引いて描画負荷を減らす
  const FRAME_INTERVAL = 1000 / 24;
  let lastTime = 0;
  let rafId = null;

  function frame(time) {
    if (!document.hidden) rafId = requestAnimationFrame(frame);
    if (time - lastTime < FRAME_INTERVAL) return;
    lastTime = time;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    blobs.forEach(b => { b.update(); b.draw(); });
  }

  rafId = requestAnimationFrame(frame);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(rafId);
    } else {
      rafId = requestAnimationFrame(frame);
    }
  });
})();
