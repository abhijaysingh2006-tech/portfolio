// =============================================================================
// SHOOTING-STARS.JS - Randomized Shooting Star Spawner
// Spawns shooting stars at random positions, speeds, and sizes every 1-3 seconds.
// Pure vanilla JS, zero external libraries, respects prefers-reduced-motion.
// =============================================================================

export function initShootingStars() {
  const container = document.getElementById('shooting-stars-layer');
  if (!container) return;

  // Respect user preference for reduced motion
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (prefersReduced.matches) return;

  const MAX_ACTIVE_STARS = 4;
  let activeCount = 0;

  function spawnStar() {
    // Skip if page is in background or max active stars reached
    if (document.hidden || activeCount >= MAX_ACTIVE_STARS) {
      scheduleNext();
      return;
    }

    const star = document.createElement('div');
    star.className = 'shooting-star';

    // Spawn randomly in the top/right quadrant of the viewport
    const startX = Math.random() * 75 + 25; // 25vw to 100vw
    const startY = Math.random() * 40 - 10; // -10vh to 30vh

    // Randomized tail length, duration, and scale
    const tailLength = Math.floor(Math.random() * 90 + 110); // 110px - 200px
    const duration = (Math.random() * 1.0 + 1.1).toFixed(2);  // 1.1s - 2.1s
    const scale = (Math.random() * 0.5 + 0.75).toFixed(2);   // 0.75 - 1.25

    // Travel distance diagonally towards bottom-left
    const distance = Math.floor(Math.random() * 320 + 720);  // 720px - 1040px
    const travelX = -distance;
    const travelY = Math.round(distance * 0.78);

    star.style.left = `${startX}vw`;
    star.style.top = `${startY}vh`;
    star.style.width = `${tailLength}px`;
    star.style.setProperty('--duration', `${duration}s`);
    star.style.setProperty('--scale', scale);
    star.style.setProperty('--travel-x', `${travelX}px`);
    star.style.setProperty('--travel-y', `${travelY}px`);

    activeCount++;
    container.appendChild(star);

    // Auto-remove once animation completes
    star.addEventListener('animationend', () => {
      star.remove();
      activeCount--;
    }, { once: true });

    scheduleNext();
  }

  function scheduleNext() {
    // Random interval between 1.0 and 2.8 seconds
    const nextDelay = Math.random() * 1800 + 1000;
    setTimeout(spawnStar, nextDelay);
  }

  // Initial trigger after page settles
  setTimeout(spawnStar, 800);
}
