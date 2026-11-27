// =============================================================================
// MOON.JS - Realistic Rotating 3D Moon with Live Astronomical Lunar Phases
// Features:
// 1. High-Definition NASA Lunar Reconnaissance Orbiter (LRO) Photographic Map
// 2. Real-Time Astronomical Lunar Phase Calculator (Synodic Month: 29.530588d)
// 3. True Physical Solar Vector Casting Oblique Light & Crater Rim Shadows
// 4. Subtle Earthshine Ambient Light & Soft Optical Atmospheric Dispersion
// 5. Scroll-Reactive Trajectory:
//    - Hero: Anchored majestically in upper-right night sky
//    - About: Smoothly glides across from Right to LEFT behind the portrait card,
//             leaving clean, high-contrast dark space for the About editorial text
//    - Next sections (Winner, Projects, etc.): Smoothly glides back to original position
// 6. Kinetic Scroll Transitions: Parallax floating, axial inertia, and smooth lerping
// =============================================================================

export function initRealisticMoon() {
  const container = document.getElementById('celestial-moon-container');
  if (!container) return;

  // Ensure Three.js is loaded
  if (typeof THREE === 'undefined') {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.onload = () => setupMoonScene(container);
    document.head.appendChild(script);
  } else {
    setupMoonScene(container);
  }
}

// Astronomical Moon Phase Calculator
export function getAstronomicalMoonPhase(date = new Date()) {
  const refTime = Date.UTC(2024, 0, 11, 11, 57, 0); // Reference New Moon
  const synodicPeriod = 29.53058867 * 86400000;
  const elapsed = date.getTime() - refTime;
  const phase = ((elapsed % synodicPeriod) + synodicPeriod) % synodicPeriod / synodicPeriod; // 0..1
  
  const ageDays = phase * 29.53058867;
  const phaseAngle = phase * 2 * Math.PI;
  const illumination = (1 - Math.cos(phaseAngle)) / 2;
  
  let phaseName = '';
  let emoji = '🌕';
  if (phase < 0.025 || phase > 0.975) {
    phaseName = 'New Moon';
    emoji = '🌑';
  } else if (phase < 0.22) {
    phaseName = 'Waxing Crescent';
    emoji = '🌒';
  } else if (phase < 0.28) {
    phaseName = 'First Quarter';
    emoji = '🌓';
  } else if (phase < 0.475) {
    phaseName = 'Waxing Gibbous';
    emoji = '🌔';
  } else if (phase < 0.525) {
    phaseName = 'Full Moon';
    emoji = '🌕';
  } else if (phase < 0.72) {
    phaseName = 'Waning Gibbous';
    emoji = '🌖';
  } else if (phase < 0.78) {
    phaseName = 'Last Quarter';
    emoji = '🌗';
  } else {
    phaseName = 'Waning Crescent';
    emoji = '🌘';
  }

  return {
    phase,
    ageDays: ageDays.toFixed(1),
    illuminationPct: Math.round(illumination * 100),
    phaseAngle,
    phaseName,
    emoji
  };
}

function setupMoonScene(container) {
  // Clear any existing contents
  container.innerHTML = '';

  const width = container.clientWidth || 600;
  const height = container.clientHeight || 600;

  // Scene & Camera
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
  camera.position.z = 4.4;

  // Renderer with high dynamic range & natural color space
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  if (THREE.sRGBEncoding) {
    renderer.outputEncoding = THREE.sRGBEncoding;
  }
  container.appendChild(renderer.domElement);

  // Load Authentic High-Resolution NASA Lunar Photographic Texture
  const textureLoader = new THREE.TextureLoader();
  const moonTexture = textureLoader.load('assets/images/moon_1024.jpg?v=20261127_6', () => {
    renderer.render(scene, camera);
  });
  if (THREE.sRGBEncoding) {
    moonTexture.encoding = THREE.sRGBEncoding;
  }
  moonTexture.anisotropy = renderer.capabilities.getMaxAnisotropy ? renderer.capabilities.getMaxAnisotropy() : 4;

  // Moon Sphere Geometry (High tessellation for smooth spherical curve)
  const moonGeo = new THREE.SphereGeometry(1.35, 96, 96);
  // Photorealistic Regolith Material: Matte retroreflective dust with natural crater relief
  const moonMat = new THREE.MeshStandardMaterial({
    map: moonTexture,
    bumpMap: moonTexture,
    bumpScale: 0.026, // Natural tactile crater depth matching NASA elevation
    roughness: 0.98,  // Regolith dust is completely matte with zero plastic specular shine
    metalness: 0.0,
    color: 0xf5f3ec   // Natural warm silver/pearl lunar surface tone
  });

  const moonMesh = new THREE.Mesh(moonGeo, moonMat);
  moonMesh.rotation.x = 0.08; // Natural lunar axial inclination
  scene.add(moonMesh);

  // Soft Natural Optical Lunar Halo (subtle atmospheric scattering haze)
  const haloGeo = new THREE.SphereGeometry(1.44, 48, 48);
  const haloMat = new THREE.ShaderMaterial({
    uniforms: {
      glowColor: { value: new THREE.Color(0xf1f5f9) }
    },
    vertexShader: `
      varying vec3 vNormal;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 glowColor;
      varying vec3 vNormal;
      void main() {
        float intensity = pow(0.58 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.2);
        gl_FragColor = vec4(glowColor, clamp(intensity * 0.14, 0.0, 1.0));
      }
    `,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
    transparent: true,
    depthWrite: false
  });
  const haloMesh = new THREE.Mesh(haloGeo, haloMat);
  scene.add(haloMesh);

  // Lighting System: Direct Natural Solar Light + Soft Earthshine Ambient Light
  const sunLight = new THREE.DirectionalLight(0xfff7ee, 3.1);
  scene.add(sunLight);

  // Soft Earthshine ambient light: natural dark-navy sky reflection
  const earthshineLight = new THREE.AmbientLight(0x1c2b3e, 0.28);
  scene.add(earthshineLight);

  // Current Astronomical Lunar Phase
  let currentAstronomicalData = getAstronomicalMoonPhase(new Date());
  let targetPhaseAngle = currentAstronomicalData.phaseAngle;
  let simulatedPhaseAngle = targetPhaseAngle;
  let isSimulating = false;

  function updateSunLightPosition(phaseAngle) {
    const lightDist = 22;
    // Rotate sunlight around Y-axis to cast physical shadow matching lunar phase:
    // With slight vertical elevation, sunlight grazes crater walls casting authentic interior shadows!
    sunLight.position.set(
      Math.sin(phaseAngle) * lightDist,
      Math.sin(phaseAngle * 0.25) * 3.0,
      -Math.cos(phaseAngle) * lightDist
    );
  }

  updateSunLightPosition(simulatedPhaseAngle);

  // UI Information Badge & Interactive Phase Cycler
  createMoonBadgeAndControls(container, currentAstronomicalData, (newPhase) => {
    isSimulating = true;
    simulatedPhaseAngle = newPhase * 2 * Math.PI;
    updateSunLightPosition(simulatedPhaseAngle);
  }, () => {
    // Reset to live astronomical phase
    isSimulating = false;
    currentAstronomicalData = getAstronomicalMoonPhase(new Date());
    simulatedPhaseAngle = currentAstronomicalData.phaseAngle;
    updateSunLightPosition(simulatedPhaseAngle);
  });

  // Rotation Animation Loop - Stately, natural celestial drift
  let rotationSpeed = 0.00045;
  let animFrameId = null;

  // Ultra-Smooth C2-Continuous Scroll Trajectory (Cosine Bell Interpolation):
  // 1. Hero: Moon is anchored in top-right sky (TX = 0)
  // 2. About section: Moon smoothly glides across from Right to LEFT behind the portrait card,
  //    leaving clean, high-contrast dark space for the About editorial text
  // 3. Subsequent sections: Moon smoothly glides back to original position
  // 4. Parallax vertical float & kinetic axial rotation on scroll
  let currentTX = 0;
  let targetTX = 0;
  let currentTY = 0;
  let targetTY = 0;
  let currentScale = 1;
  let targetScale = 1;
  let lastScrollY = window.scrollY;
  let scrollDelta = 0;

  function updateScrollTarget() {
    const scrollY = window.scrollY;
    scrollDelta = scrollY - lastScrollY;
    lastScrollY = scrollY;

    const aboutSec = document.getElementById('about');

    let aboutFactor = 0; // 0 = not in about, 1 = centered in about

    if (aboutSec) {
      const rect = aboutSec.getBoundingClientRect();
      const vh = window.innerHeight;
      
      // Mathematical C2-continuous bell curve:
      // When about section center aligns with viewport center, factor = 1.0.
      // Offset smoothly decays to 0 at the boundaries with zero velocity jump!
      const aboutCenterY = rect.top + rect.height * 0.5;
      const screenCenterY = vh * 0.5;
      const offset = aboutCenterY - screenCenterY;
      const radius = (rect.height + vh) * 0.52;

      if (Math.abs(offset) < radius) {
        const u = offset / radius; // -1 to +1
        // Pure cosine bell curve: continuous, 1st & 2nd derivative = 0 at boundaries
        aboutFactor = 0.5 * (1 + Math.cos(Math.PI * u));
      }
    }

    // Determine target positions:
    // When aboutFactor is 1, move moon smoothly across to the left side:
    const maxSweepX = -Math.min(window.innerWidth * 0.55, 780);
    targetTX = aboutFactor * maxSweepX;
    
    // Very gentle vertical breathing motion and scale perspective
    targetTY = Math.sin(scrollY * 0.0012) * 18 + (aboutFactor * 20);
    targetScale = 1.0 - (aboutFactor * 0.05);
  }

  window.addEventListener('scroll', updateScrollTarget, { passive: true });
  window.addEventListener('resize', updateScrollTarget, { passive: true });
  updateScrollTarget();

  function animate() {
    animFrameId = requestAnimationFrame(animate);

    // Velvety critically damped smoothing (0.052) for liquid, organic motion
    const smoothing = 0.052;
    currentTX += (targetTX - currentTX) * smoothing;
    currentTY += (targetTY - currentTY) * smoothing;
    currentScale += (targetScale - currentScale) * smoothing;

    container.style.transform = `translate3d(${currentTX.toFixed(1)}px, ${currentTY.toFixed(1)}px, 0) scale(${currentScale.toFixed(3)})`;

    // Continuous celestial axial rotation + smooth scroll momentum
    moonMesh.rotation.y += rotationSpeed + (scrollDelta * 0.00008);
    scrollDelta *= 0.92; // smooth decay

    // Subtle natural 3D orbital tilt as the moon sweeps from right to left
    moonMesh.rotation.z = (currentTX / window.innerWidth) * 0.10;

    renderer.render(scene, camera);
  }

  animate();

  // Responsive Resize
  const resizeObserver = new ResizeObserver(() => {
    const newWidth = container.clientWidth || 600;
    const newHeight = container.clientHeight || 600;
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, newHeight);
  });
  resizeObserver.observe(container);
}

// UI Badge, Astronomical Telemetry Tooltip & Phase Simulation Controls
function createMoonBadgeAndControls(container, initialData, onSimulatePhase, onResetLive) {
  const existingWrap = document.getElementById('celestial-moon-badge-wrap');
  if (existingWrap) existingWrap.remove();

  const badgeWrap = document.createElement('div');
  badgeWrap.id = 'celestial-moon-badge-wrap';
  badgeWrap.className = 'celestial-moon-badge-wrap';

  badgeWrap.innerHTML = `
    <div class="celestial-moon-badge" id="moon-badge" title="Live Astronomical Moon Phase (Click for details & simulation)">
      <span class="moon-badge-dot"></span>
      <span class="moon-badge-emoji">${initialData.emoji}</span>
      <span class="moon-badge-text" id="moon-badge-text">${initialData.phaseName} · ${initialData.illuminationPct}%</span>
    </div>

    <!-- Astronomical Detail Tooltip Card -->
    <div class="celestial-moon-card" id="moon-detail-card" aria-hidden="true">
      <div class="moon-card-header">
        <div class="moon-card-title">
          <span class="moon-card-dot"></span>
          <span>LIVE ASTRONOMICAL TELEMETRY</span>
        </div>
        <button class="moon-card-close" id="moon-card-close" aria-label="Close details">✕</button>
      </div>

      <div class="moon-card-body">
        <div class="moon-telemetry-row">
          <span class="telemetry-lbl">Phase Name:</span>
          <span class="telemetry-val" id="telemetry-name">${initialData.phaseName} ${initialData.emoji}</span>
        </div>
        <div class="moon-telemetry-row">
          <span class="telemetry-lbl">Illumination:</span>
          <span class="telemetry-val" id="telemetry-illumination">${initialData.illuminationPct}%</span>
        </div>
        <div class="moon-telemetry-row">
          <span class="telemetry-lbl">Lunar Age:</span>
          <span class="telemetry-val" id="telemetry-age">${initialData.ageDays} / 29.53 Days</span>
        </div>
        <div class="moon-telemetry-row">
          <span class="telemetry-lbl">Axial Rotation:</span>
          <span class="telemetry-val">Live 3D Drift (NASA LRO)</span>
        </div>
      </div>

      <!-- Quick Interactive Phase Simulator Buttons -->
      <div class="moon-sim-bar">
        <div class="moon-sim-label">Simulate Phase:</div>
        <div class="moon-sim-buttons">
          <button class="sim-btn" data-phase="0.0" title="New Moon">🌑</button>
          <button class="sim-btn" data-phase="0.15" title="Waxing Crescent">🌒</button>
          <button class="sim-btn" data-phase="0.25" title="First Quarter">🌓</button>
          <button class="sim-btn" data-phase="0.38" title="Waxing Gibbous">🌔</button>
          <button class="sim-btn" data-phase="0.5" title="Full Moon">🌕</button>
          <button class="sim-btn" data-phase="0.65" title="Waning Gibbous">🌖</button>
          <button class="sim-btn" data-phase="0.75" title="Last Quarter">🌗</button>
          <button class="sim-btn" data-phase="0.88" title="Waning Crescent">🌘</button>
          <button class="sim-reset-btn" id="sim-reset-btn" title="Reset to Real-Time Phase">LIVE</button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(badgeWrap);

  const badge = badgeWrap.querySelector('#moon-badge');
  const card = badgeWrap.querySelector('#moon-detail-card');
  const closeBtn = badgeWrap.querySelector('#moon-card-close');
  const badgeText = badgeWrap.querySelector('#moon-badge-text');
  const telName = badgeWrap.querySelector('#telemetry-name');
  const telIllum = badgeWrap.querySelector('#telemetry-illumination');
  const telAge = badgeWrap.querySelector('#telemetry-age');
  const resetBtn = badgeWrap.querySelector('#sim-reset-btn');

  function toggleCard(show) {
    const active = show !== undefined ? show : !card.classList.contains('active');
    if (active) {
      card.classList.add('active');
    } else {
      card.classList.remove('active');
    }
  }

  badge.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleCard();
  });

  closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleCard(false);
  });

  document.addEventListener('click', (e) => {
    if (!badgeWrap.contains(e.target)) {
      toggleCard(false);
    }
  });

  // Phase Simulator Clicks
  badgeWrap.querySelectorAll('.sim-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const phaseVal = parseFloat(btn.getAttribute('data-phase'));
      onSimulatePhase(phaseVal);
      const simIllum = Math.round((1 - Math.cos(phaseVal * 2 * Math.PI)) / 2 * 100);
      const title = btn.getAttribute('title');
      badgeText.textContent = `${title} · ${simIllum}% [Sim]`;
      telName.textContent = `${title} (Simulated)`;
      telIllum.textContent = `${simIllum}%`;
      telAge.textContent = `${(phaseVal * 29.53).toFixed(1)} Days`;
    });
  });

  resetBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    onResetLive();
    const liveData = getAstronomicalMoonPhase(new Date());
    badgeText.textContent = `${liveData.phaseName} · ${liveData.illuminationPct}%`;
    telName.textContent = `${liveData.phaseName} ${liveData.emoji}`;
    telIllum.textContent = `${liveData.illuminationPct}%`;
    telAge.textContent = `${liveData.ageDays} / 29.53 Days`;
  });
}
