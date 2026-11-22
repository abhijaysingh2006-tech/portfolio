// =============================================================================
// SHOOTING-STARS.JS - High-Visibility Canvas Starfield & Meteor Engine
// Twinkling stars + luminous diagonal shooting stars with glowing heads & tails.
// Pauses when tab is hidden, respects prefers-reduced-motion, pure vanilla JS.
// =============================================================================

export function initShootingStars() {
  const canvas = document.getElementById('star-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  let width = 0;
  let height = 0;
  let dpr = 1;
  let animFrameId = null;
  let isRunning = false;

  // Star color palette (Pure White, Luminous Teal, Sunset Amber, Ice Blue)
  const starColors = [
    '255, 255, 255',      // Pure White
    '224, 242, 254',      // Ice Blue
    '45, 212, 191',       // Luminous Teal
    '251, 146, 60',       // Warm Amber
  ];

  // Static twinkling stars collection
  const NUM_STARS = 160;
  const stars = [];

  // Active shooting stars collection
  const shootingStars = [];
  const MAX_SHOOTING_STARS = 4;
  let lastSpawnTime = 0;
  let nextSpawnDelay = 1100; // ms

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.scale(dpr, dpr);
    generateStars();
  }

  function generateStars() {
    stars.length = 0;
    for (let i = 0; i < NUM_STARS; i++) {
      const colorIdx = Math.random() < 0.65 ? (Math.random() < 0.5 ? 0 : 1) : (Math.random() < 0.6 ? 2 : 3);
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.2 + 0.5, // 0.5px - 1.7px
        baseAlpha: Math.random() * 0.55 + 0.35,
        twinkleSpeed: Math.random() * 0.03 + 0.012,
        phase: Math.random() * Math.PI * 2,
        color: starColors[colorIdx]
      });
    }
  }

  function spawnShootingStar() {
    if (shootingStars.length >= MAX_SHOOTING_STARS) return;

    // Angle: ~135 degrees (heading diagonally top-right to bottom-left)
    const angle = (135 + (Math.random() * 16 - 8)) * (Math.PI / 180);
    const speed = Math.random() * 8 + 10; // 10 - 18 px/frame
    const length = Math.random() * 100 + 130; // 130 - 230px tail

    // Start in the upper-right quadrant
    const startX = Math.random() * (width * 0.85) + (width * 0.15);
    const startY = Math.random() * (height * 0.35) - 30;

    shootingStars.push({
      x: startX,
      y: startY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      length: length,
      headRadius: Math.random() * 0.8 + 1.6,
      opacity: 0,
      maxOpacity: Math.random() * 0.25 + 0.75,
      life: 0,
      maxLife: Math.random() * 55 + 65,
      trailTeal: Math.random() > 0.35
    });
  }

  function updateAndDraw(now) {
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';

    // In light mode: Clear and skip rendering (night sky is exclusively for dark mode)
    if (!isDark) {
      ctx.clearRect(0, 0, width, height);
      return;
    }

    // Clear frame
    ctx.clearRect(0, 0, width, height);

    // In dark mode: Paint smooth cosmic night sky gradient directly onto canvas
    if (isDark) {
      const bgGrad = ctx.createRadialGradient(
        width * 0.8, height * 0.1, 0,
        width * 0.5, height * 0.5, Math.max(width, height) * 0.95
      );
      bgGrad.addColorStop(0, '#0c162d');
      bgGrad.addColorStop(0.45, '#080d1a');
      bgGrad.addColorStop(0.85, '#05070d');
      bgGrad.addColorStop(1, '#020306');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);
    }

    const globalAlpha = isDark ? 1.0 : 0.35;

    // 1. Draw Twinkling Stars
    for (let i = 0; i < stars.length; i++) {
      const s = stars[i];
      s.phase += s.twinkleSpeed;
      const alpha = Math.min(1, Math.max(0.15, s.baseAlpha + Math.sin(s.phase) * 0.38)) * globalAlpha;

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${s.color}, ${alpha.toFixed(3)})`;
      ctx.fill();

      // Atmospheric soft glow for slightly brighter stars
      if (s.radius > 1.0 && isDark) {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius * 2.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.color}, ${(alpha * 0.28).toFixed(3)})`;
        ctx.fill();
      }
    }

    // 2. Animate Shooting Stars
    if (!prefersReduced.matches) {
      if (now - lastSpawnTime > nextSpawnDelay) {
        spawnShootingStar();
        lastSpawnTime = now;
        nextSpawnDelay = Math.random() * 1200 + 900; // Spawns every 0.9s - 2.1s
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const star = shootingStars[i];
        star.life++;
        star.x += star.vx;
        star.y += star.vy;

        // Smooth fade-in, then fade-out
        if (star.life < 14) {
          star.opacity = (star.life / 14) * star.maxOpacity;
        } else if (star.life > star.maxLife - 22) {
          star.opacity = ((star.maxLife - star.life) / 22) * star.maxOpacity;
        }

        if (star.life >= star.maxLife || star.x < -150 || star.y > height + 150) {
          shootingStars.splice(i, 1);
          continue;
        }

        if (star.opacity <= 0) continue;

        // Tail calculation (backward vector along velocity)
        const angle = Math.atan2(star.vy, star.vx);
        const tailX = star.x - Math.cos(angle) * star.length;
        const tailY = star.y - Math.sin(angle) * star.length;

        // Linear gradient for tail
        const grad = ctx.createLinearGradient(tailX, tailY, star.x, star.y);
        grad.addColorStop(0, 'rgba(45, 212, 191, 0)');
        if (star.trailTeal) {
          grad.addColorStop(0.4, `rgba(45, 212, 191, ${(star.opacity * 0.45).toFixed(3)})`);
          grad.addColorStop(0.8, `rgba(224, 242, 254, ${(star.opacity * 0.85).toFixed(3)})`);
        } else {
          grad.addColorStop(0.4, `rgba(251, 146, 60, ${(star.opacity * 0.45).toFixed(3)})`);
          grad.addColorStop(0.8, `rgba(255, 247, 237, ${(star.opacity * 0.85).toFixed(3)})`);
        }
        grad.addColorStop(1, `rgba(255, 255, 255, ${star.opacity.toFixed(3)})`);

        // Draw tail streak
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(star.x, star.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2.4;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Glowing Star Head with dual flare
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.headRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity.toFixed(3)})`;
        ctx.shadowColor = star.trailTeal ? '#2dd4bf' : '#fb923c';
        ctx.shadowBlur = 14;
        ctx.fill();
        ctx.shadowBlur = 0; // Reset
      }
    }

    if (isRunning) {
      animFrameId = requestAnimationFrame(updateAndDraw);
    }
  }

  function start() {
    if (isRunning) return;
    isRunning = true;
    lastSpawnTime = performance.now();
    animFrameId = requestAnimationFrame(updateAndDraw);
  }

  function stop() {
    isRunning = false;
    if (animFrameId) {
      cancelAnimationFrame(animFrameId);
      animFrameId = null;
    }
  }

  // Handle visibility changes
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stop();
    } else {
      start();
    }
  });

  // Handle Window Resize
  let resizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      resize();
    }, 150);
  });

  // Initialize
  resize();

  if (prefersReduced.matches) {
    updateAndDraw(0);
  } else {
    start();
  }
}
