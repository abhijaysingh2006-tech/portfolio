// =============================================================================
// SHOOTING-STARS.JS - High-Performance Canvas Starfield & Meteor Engine
// Twinkling stars + diagonal shooting stars with glowing heads and fading tails.
// Pauses when tab is hidden, respects prefers-reduced-motion, pure vanilla JS.
// =============================================================================

export function initShootingStars() {
  const canvas = document.getElementById('star-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Accessibility: Respect user preference for reduced motion
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  let width = 0;
  let height = 0;
  let dpr = 1;
  let animFrameId = null;
  let isRunning = false;

  // Star color palette (White, Soft Teal, Warm Amber)
  const starColors = [
    '255, 255, 255',      // Pure White
    '224, 242, 254',      // Ice Blue
    '45, 212, 191',       // Mint / Teal
    '245, 158, 11',       // Warm Amber
  ];

  // Static twinkling star collection
  const NUM_STARS = 130;
  const stars = [];

  // Active shooting stars collection
  const shootingStars = [];
  const MAX_SHOOTING_STARS = 3;
  let lastSpawnTime = 0;
  let nextSpawnDelay = 1400; // ms

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
      const colorIdx = Math.random() < 0.7 ? (Math.random() < 0.5 ? 0 : 1) : (Math.random() < 0.6 ? 2 : 3);
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 0.9 + 0.4, // 0.4px - 1.3px
        baseAlpha: Math.random() * 0.5 + 0.25,
        twinkleSpeed: Math.random() * 0.025 + 0.008,
        phase: Math.random() * Math.PI * 2,
        color: starColors[colorIdx]
      });
    }
  }

  function spawnShootingStar() {
    if (shootingStars.length >= MAX_SHOOTING_STARS) return;

    // Angle: ~135 degrees (flying top-right to bottom-left)
    const angle = (135 + (Math.random() * 14 - 7)) * (Math.PI / 180);
    const speed = Math.random() * 7 + 9; // 9 - 16 px/frame
    const length = Math.random() * 70 + 110; // 110 - 180px

    // Start in the upper / right area
    const startX = Math.random() * (width * 0.8) + (width * 0.2);
    const startY = Math.random() * (height * 0.4) - 40;

    shootingStars.push({
      x: startX,
      y: startY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      length: length,
      headRadius: Math.random() * 0.6 + 1.2,
      opacity: 0,
      fadeIn: true,
      maxOpacity: Math.random() * 0.35 + 0.65,
      life: 0,
      maxLife: Math.random() * 50 + 65,
      trailTeal: Math.random() > 0.4
    });
  }

  function updateAndDraw(now) {
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';

    // Clear frame
    ctx.clearRect(0, 0, width, height);

    // If light theme, render with very faint subtlety or skip heavy particles
    const globalMultiplier = isDark ? 1.0 : 0.2;

    // 1. Draw Twinkling Stars
    for (let i = 0; i < stars.length; i++) {
      const s = stars[i];
      s.phase += s.twinkleSpeed;
      const alpha = Math.max(0.1, s.baseAlpha + Math.sin(s.phase) * 0.3) * globalMultiplier;

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${s.color}, ${alpha.toFixed(3)})`;
      ctx.fill();

      // Soft glow for slightly larger stars
      if (s.radius > 1.0 && isDark) {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.color}, ${(alpha * 0.25).toFixed(3)})`;
        ctx.fill();
      }
    }

    // 2. Shooting Stars (Disabled in light mode for clean readability)
    if (isDark && !prefersReduced.matches) {
      if (now - lastSpawnTime > nextSpawnDelay) {
        spawnShootingStar();
        lastSpawnTime = now;
        nextSpawnDelay = Math.random() * 1600 + 1400; // 1.4s - 3.0s
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const star = shootingStars[i];
        star.life++;
        star.x += star.vx;
        star.y += star.vy;

        // Fade in, then fade out
        if (star.life < 15) {
          star.opacity = (star.life / 15) * star.maxOpacity;
        } else if (star.life > star.maxLife - 20) {
          star.opacity = ((star.maxLife - star.life) / 20) * star.maxOpacity;
        }

        if (star.life >= star.maxLife || star.x < -100 || star.y > height + 100) {
          shootingStars.splice(i, 1);
          continue;
        }

        if (star.opacity <= 0) continue;

        // Tail calculation (backward vector)
        const tailX = star.x - Math.cos(Math.atan2(star.vy, star.vx)) * star.length;
        const tailY = star.y - Math.sin(Math.atan2(star.vy, star.vx)) * star.length;

        // Gradient for fading tail
        const grad = ctx.createLinearGradient(tailX, tailY, star.x, star.y);
        grad.addColorStop(0, 'rgba(45, 212, 191, 0)');
        if (star.trailTeal) {
          grad.addColorStop(0.5, `rgba(45, 212, 191, ${(star.opacity * 0.4).toFixed(3)})`);
          grad.addColorStop(0.85, `rgba(224, 242, 254, ${(star.opacity * 0.85).toFixed(3)})`);
        } else {
          grad.addColorStop(0.5, `rgba(251, 146, 60, ${(star.opacity * 0.35).toFixed(3)})`);
          grad.addColorStop(0.85, `rgba(255, 255, 255, ${(star.opacity * 0.85).toFixed(3)})`);
        }
        grad.addColorStop(1, `rgba(255, 255, 255, ${star.opacity.toFixed(3)})`);

        // Draw tail streak
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(star.x, star.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.8;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Glowing Star Head
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.headRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity.toFixed(3)})`;
        ctx.shadowColor = star.trailTeal ? '#2dd4bf' : '#fb923c';
        ctx.shadowBlur = 10;
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

  // Handle visibility changes (Tab switching)
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
    // If reduced motion is preferred, draw static stars once and do not loop
    updateAndDraw(0);
  } else {
    start();
  }
}
