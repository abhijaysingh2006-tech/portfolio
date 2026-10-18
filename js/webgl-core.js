// =============================================================================
// WEBGL-CORE.JS - Interactive 3D Spatial Gyroscopic Reactor & Particle Field
// Butter-smooth Three.js WebGL visualization inspired by spatial computing,
// robotics, and autonomous systems architecture.
// =============================================================================

export function initWebGLCore() {
  const container = document.getElementById('webgl-hero-container');
  if (!container) return;

  // Verify WebGL availability
  if (!window.WebGLRenderingContext) {
    container.classList.add('webgl-fallback');
    return;
  }

  // Check if THREE is loaded
  if (typeof THREE === 'undefined') {
    console.warn('Three.js library not detected. Loading dynamically...');
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.onload = () => setupScene(container);
    document.head.appendChild(script);
    return;
  }

  setupScene(container);
}

function setupScene(container) {
  // 1. Scene & Camera Setup
  const scene = new THREE.Scene();
  const width = container.clientWidth || 500;
  const height = container.clientHeight || 450;

  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
  camera.position.set(0, 0, 7.2);

  // 2. High-performance WebGL Renderer
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;

  container.innerHTML = '';
  container.appendChild(renderer.domElement);

  // Theme detection
  const isDark = () => document.documentElement.getAttribute('data-theme') === 'dark';

  // Palette definitions
  const getThemePalette = () => {
    const dark = isDark();
    return {
      fog: dark ? 0x09090b : 0xfbfbfb,
      coreSphere: dark ? 0x181822 : 0xf0f0f5,
      coreMetalness: dark ? 0.75 : 0.4,
      coreRoughness: dark ? 0.25 : 0.35,
      wireframe: dark ? 0x38bdf8 : 0x0284c7,
      wireframeOpacity: dark ? 0.42 : 0.35,
      ring1: dark ? 0x64748b : 0x94a3b8,
      ring2: dark ? 0x475569 : 0x64748b,
      cyan: 0x00e5ff,
      amber: 0xf59e0b,
      lightAmbient: dark ? 0.85 : 1.25,
      lightDirectional: dark ? 1.4 : 1.8,
      particleColor: dark ? 0xa1a1aa : 0x71717a,
    };
  };

  let palette = getThemePalette();

  // Subtle depth fog
  scene.fog = new THREE.Fog(palette.fog, 6, 14);

  // 3. Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, palette.lightAmbient);
  scene.add(ambientLight);

  const dirLight1 = new THREE.DirectionalLight(0xffffff, palette.lightDirectional);
  dirLight1.position.set(5, 6, 5);
  scene.add(dirLight1);

  const dirLight2 = new THREE.DirectionalLight(0x00e5ff, 0.8);
  dirLight2.position.set(-5, -3, -3);
  scene.add(dirLight2);

  const pointLight = new THREE.PointLight(0xf59e0b, 1.2, 8);
  pointLight.position.set(2, 2, 2);
  scene.add(pointLight);

  // 4. Main Gyroscopic Reactor Group
  const masterGroup = new THREE.Group();
  scene.add(masterGroup);

  // A. Central Core Sphere
  const coreGeo = new THREE.SphereGeometry(0.96, 48, 48);
  const coreMat = new THREE.MeshStandardMaterial({
    color: palette.coreSphere,
    roughness: palette.coreRoughness,
    metalness: palette.coreMetalness,
  });
  const coreMesh = new THREE.Mesh(coreGeo, coreMat);
  masterGroup.add(coreMesh);

  // B. Outer Icosahedron Constellation Cage
  const cageGroup = new THREE.Group();
  masterGroup.add(cageGroup);

  const cageGeo = new THREE.IcosahedronGeometry(1.42, 1);
  const cageMat = new THREE.MeshBasicMaterial({
    color: palette.wireframe,
    wireframe: true,
    transparent: true,
    opacity: palette.wireframeOpacity,
  });
  const cageMesh = new THREE.Mesh(cageGeo, cageMat);
  cageGroup.add(cageMesh);

  // Extract unique vertices for glowing constellation node beads
  const posAttr = cageGeo.attributes.position;
  const vertexSet = new Set();
  const nodeBeads = [];
  const beadGeo = new THREE.SphereGeometry(0.038, 14, 14);

  for (let i = 0; i < posAttr.count; i++) {
    const x = Number(posAttr.getX(i).toFixed(3));
    const y = Number(posAttr.getY(i).toFixed(3));
    const z = Number(posAttr.getZ(i).toFixed(3));
    const key = `${x},${y},${z}`;

    if (!vertexSet.has(key)) {
      vertexSet.add(key);
      const isCyan = (nodeBeads.length % 3 === 0);
      const beadMat = new THREE.MeshStandardMaterial({
        color: isCyan ? palette.cyan : palette.amber,
        emissive: isCyan ? 0x0088aa : 0xaa6600,
        emissiveIntensity: 0.6,
        roughness: 0.2,
        metalness: 0.8,
      });
      const bead = new THREE.Mesh(beadGeo, beadMat);
      bead.position.set(x, y, z);
      cageGroup.add(bead);
      nodeBeads.push(bead);
    }
  }

  // C. Gyroscopic Orbital Rings
  // Ring 1: Major tilted torus
  const ring1Group = new THREE.Group();
  ring1Group.rotation.set(Math.PI / 3.4, Math.PI / 4.2, 0);
  masterGroup.add(ring1Group);
  const ring1Geo = new THREE.TorusGeometry(1.92, 0.026, 20, 100);
  const ring1Mat = new THREE.MeshStandardMaterial({
    color: palette.ring1,
    metalness: 0.65,
    roughness: 0.28,
  });
  const ring1Mesh = new THREE.Mesh(ring1Geo, ring1Mat);
  ring1Group.add(ring1Mesh);

  // Ring 2: Counter-rotating secondary ring
  const ring2Group = new THREE.Group();
  ring2Group.rotation.set(-Math.PI / 3.6, -Math.PI / 4.8, 0);
  masterGroup.add(ring2Group);
  const ring2Geo = new THREE.TorusGeometry(1.72, 0.018, 16, 90);
  const ring2Mat = new THREE.MeshStandardMaterial({
    color: palette.ring2,
    metalness: 0.5,
    roughness: 0.35,
  });
  const ring2Mesh = new THREE.Mesh(ring2Geo, ring2Mat);
  ring2Group.add(ring2Mesh);

  // Ring 3: Wide equatorial orbital track with orbiting beacon
  const ring3Group = new THREE.Group();
  ring3Group.rotation.set(Math.PI / 2.2, -Math.PI / 5, 0);
  masterGroup.add(ring3Group);
  const ring3Geo = new THREE.TorusGeometry(2.26, 0.015, 16, 100);
  const ring3Mat = new THREE.MeshStandardMaterial({
    color: palette.cyan,
    metalness: 0.4,
    roughness: 0.2,
  });
  const ring3Mesh = new THREE.Mesh(ring3Geo, ring3Mat);
  ring3Group.add(ring3Mesh);

  // Orbiting satellite beacon on Ring 3
  const beaconGeo = new THREE.SphereGeometry(0.065, 16, 16);
  const beaconMat = new THREE.MeshStandardMaterial({
    color: palette.cyan,
    emissive: palette.cyan,
    emissiveIntensity: 0.8,
    metalness: 0.2,
    roughness: 0.2,
  });
  const beacon = new THREE.Mesh(beaconGeo, beaconMat);
  beacon.position.set(2.26, 0, 0);
  ring3Group.add(beacon);

  // Ring 4: Amber resonance ring
  const ring4Group = new THREE.Group();
  ring4Group.rotation.set(-Math.PI / 3.8, Math.PI / 4, 0);
  masterGroup.add(ring4Group);
  const ring4Geo = new THREE.TorusGeometry(1.54, 0.016, 16, 80);
  const ring4Mat = new THREE.MeshStandardMaterial({
    color: palette.amber,
    metalness: 0.5,
    roughness: 0.25,
  });
  const ring4Mesh = new THREE.Mesh(ring4Geo, ring4Mat);
  ring4Group.add(ring4Mesh);

  // D. Orbiting Robotics/AI Satellite Nodes
  const satelliteGroup = new THREE.Group();
  masterGroup.add(satelliteGroup);
  const satellites = [
    { pos: [1.82, 0.72, 0.4], size: 0.075, color: palette.cyan },
    { pos: [1.45, -0.75, 0.85], size: 0.082, color: palette.amber },
    { pos: [-1.52, 0.55, 0.65], size: 0.065, color: palette.cyan },
    { pos: [-1.35, -0.42, 0.85], size: 0.055, color: 0x94a3b8 },
    { pos: [0.72, -1.35, 0.75], size: 0.05, color: palette.cyan },
    { pos: [-0.98, 0.95, -0.65], size: 0.055, color: palette.amber },
  ];

  satellites.forEach((sat) => {
    const sGeo = new THREE.SphereGeometry(sat.size, 20, 20);
    const sMat = new THREE.MeshStandardMaterial({
      color: sat.color,
      metalness: 0.7,
      roughness: 0.2,
    });
    const sMesh = new THREE.Mesh(sGeo, sMat);
    sMesh.position.set(...sat.pos);
    satelliteGroup.add(sMesh);
  });

  // E. Atmospheric Particle Cloud
  const particleCount = 140;
  const pPositions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    pPositions[i * 3] = (Math.random() - 0.5) * 14;
    pPositions[i * 3 + 1] = (Math.random() - 0.5) * 10;
    pPositions[i * 3 + 2] = (Math.random() - 0.5) * 8;
  }
  const pGeometry = new THREE.BufferGeometry();
  pGeometry.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
  const pMaterial = new THREE.PointsMaterial({
    color: palette.particleColor,
    size: 0.045,
    transparent: true,
    opacity: 0.6,
  });
  const particleField = new THREE.Points(pGeometry, pMaterial);
  scene.add(particleField);

  // 5. Physics Spring Lerping ("Smooth like Butter")
  const targetRotation = { x: 0, y: 0 };
  const currentRotation = { x: 0, y: 0 };
  const velocity = { x: 0, y: 0 };
  const SPRING = 0.048;
  const DAMPING = 0.88;

  let isDragging = false;
  let previousMousePos = { x: 0, y: 0 };

  // Mouse move over window
  window.addEventListener('mousemove', (e) => {
    if (isDragging) return;
    const nx = (e.clientX / window.innerWidth) * 2 - 1;
    const ny = -(e.clientY / window.innerHeight) * 2 + 1;
    targetRotation.y = nx * 0.45;
    targetRotation.x = -ny * 0.35;
  }, { passive: true });

  // Drag interaction on canvas for tactile control
  container.addEventListener('mousedown', (e) => {
    isDragging = true;
    previousMousePos = { x: e.clientX, y: e.clientY };
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - previousMousePos.x;
    const deltaY = e.clientY - previousMousePos.y;
    previousMousePos = { x: e.clientX, y: e.clientY };

    velocity.y += deltaX * 0.003;
    velocity.x += deltaY * 0.003;
  });

  // Touch controls for mobile
  container.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      isDragging = true;
      previousMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - previousMousePos.x;
    const deltaY = e.touches[0].clientY - previousMousePos.y;
    previousMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };

    velocity.y += deltaX * 0.004;
    velocity.x += deltaY * 0.004;
  }, { passive: true });

  // Scroll reactivity
  let scrollProgress = 0;
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    scrollProgress = maxScroll > 0 ? Math.min(scrollY / 800, 1) : 0;
  }, { passive: true });

  // 6. Viewport Visibility & Intersection Observer
  let isVisible = true;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      isVisible = entry.isIntersecting;
    });
  }, { threshold: 0.1 });
  observer.observe(container);

  // 7. Theme Sync Mutation Observer
  const updateThemeColors = () => {
    palette = getThemePalette();
    scene.fog.color.setHex(palette.fog);
    coreMat.color.setHex(palette.coreSphere);
    coreMat.roughness = palette.coreRoughness;
    coreMat.metalness = palette.coreMetalness;
    cageMat.color.setHex(palette.wireframe);
    cageMat.opacity = palette.wireframeOpacity;
    ring1Mat.color.setHex(palette.ring1);
    ring2Mat.color.setHex(palette.ring2);
    pMaterial.color.setHex(palette.particleColor);
    ambientLight.intensity = palette.lightAmbient;
    dirLight1.intensity = palette.lightDirectional;
  };

  const themeObserver = new MutationObserver(() => {
    updateThemeColors();
  });
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  });

  // 8. Responsive Resize
  const handleResize = () => {
    const w = container.clientWidth || 500;
    const h = container.clientHeight || 450;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  };
  window.addEventListener('resize', handleResize);

  // 9. Main Render Loop
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    if (!isVisible) return;

    const delta = clock.getDelta();
    const elapsedTime = clock.getElapsedTime();

    // Spring physics update
    const diffX = targetRotation.x - currentRotation.x;
    const diffY = targetRotation.y - currentRotation.y;
    velocity.x = velocity.x * DAMPING + diffX * SPRING;
    velocity.y = velocity.y * DAMPING + diffY * SPRING;

    currentRotation.x += velocity.x;
    currentRotation.y += velocity.y;

    // Apply master rotation with subtle organic idle drift
    masterGroup.rotation.x = currentRotation.x + Math.sin(elapsedTime * 0.25) * 0.05;
    masterGroup.rotation.y = currentRotation.y + elapsedTime * 0.08;

    // Gentle floating bob & scroll translation
    const floatOffset = Math.sin(elapsedTime * 0.6) * 0.05;
    const scrollOffsetY = -scrollProgress * 0.8;
    const targetScale = Math.max(0.75, 1 - scrollProgress * 0.25);

    masterGroup.position.y = floatOffset + scrollOffsetY;
    masterGroup.scale.set(targetScale, targetScale, targetScale);

    // Inner orbital component spins
    coreMesh.rotation.y += delta * 0.12;
    cageGroup.rotation.y -= delta * 0.18;
    cageGroup.rotation.x += delta * 0.08;

    ring1Group.rotation.z -= delta * 0.25;
    ring2Group.rotation.z += delta * 0.32;
    ring3Group.rotation.z -= delta * 0.18;
    ring4Group.rotation.y += delta * 0.22;

    satelliteGroup.rotation.y += delta * 0.15;
    satelliteGroup.rotation.x -= delta * 0.05;

    // Particle field slow drift
    particleField.rotation.y = elapsedTime * 0.02;

    renderer.render(scene, camera);
  }

  animate();
}
