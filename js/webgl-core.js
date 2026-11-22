// =============================================================================
// WEBGL-CORE.JS - Interactive Autonomous 3D Robot Companion & Spatial Assistant
// Procedural Three.js 3D Robot with real-time cursor tracking (head, eyes, body),
// organic hovering physics, LED visor blinking, wave animations, and
// visitor greeting speech bubble.
// =============================================================================

export function initWebGLCore() {
  const container = document.getElementById('webgl-hero-container');
  if (!container) return;

  // Check if THREE is loaded
  if (typeof THREE === 'undefined') {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.onload = () => setupRobotScene(container);
    document.head.appendChild(script);
    return;
  }

  setupRobotScene(container);
}

function setupRobotScene(container) {
  // 1. Scene & Camera Setup
  const scene = new THREE.Scene();
  const width = container.clientWidth || 500;
  const height = container.clientHeight || 420;

  const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
  camera.position.set(0, 0.2, 6.8);

  // 2. High-performance WebGL Renderer
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;

  container.innerHTML = '';
  container.appendChild(renderer.domElement);

  // Theme Detection
  const isDark = () => document.documentElement.getAttribute('data-theme') === 'dark';

  const getRobotPalette = () => {
    const dark = isDark();
    return {
      armorPrimary: dark ? 0x181e2e : 0xe2e8f0,
      armorSecondary: dark ? 0x0d121f : 0xcbd5e1,
      armorHighlight: dark ? 0x242e47 : 0xf1f5f9,
      metalness: dark ? 0.82 : 0.45,
      roughness: dark ? 0.24 : 0.32,
      visorGlass: dark ? 0x030712 : 0x1e293b,
      eyeGlow: 0x00e5ff,
      coreGlow: 0x2dd4bf,
      beaconGlow: 0xf59e0b,
      lightAmbient: dark ? 1.0 : 1.4,
      lightDirectional: dark ? 1.5 : 1.8,
      rimLight: dark ? 0x00e5ff : 0x0284c7,
    };
  };

  let palette = getRobotPalette();

  // 3. Lighting System
  const ambientLight = new THREE.AmbientLight(0xffffff, palette.lightAmbient);
  scene.add(ambientLight);

  const keyLight = new THREE.DirectionalLight(0xffffff, palette.lightDirectional);
  keyLight.position.set(4, 5, 5);
  scene.add(keyLight);

  const rimLight = new THREE.DirectionalLight(palette.rimLight, 1.2);
  rimLight.position.set(-4, -2, -3);
  scene.add(rimLight);

  const fillLight = new THREE.PointLight(palette.coreGlow, 1.4, 6);
  fillLight.position.set(0, 0, 1.5);
  scene.add(fillLight);

  // 4. Robot Assembly
  const robotRoot = new THREE.Group();
  scene.add(robotRoot);

  // Material Library
  const primaryMat = new THREE.MeshStandardMaterial({
    color: palette.armorPrimary,
    metalness: palette.metalness,
    roughness: palette.roughness,
  });

  const secondaryMat = new THREE.MeshStandardMaterial({
    color: palette.armorSecondary,
    metalness: palette.metalness * 0.9,
    roughness: palette.roughness * 1.2,
  });

  const highlightMat = new THREE.MeshStandardMaterial({
    color: palette.armorHighlight,
    metalness: 0.9,
    roughness: 0.18,
  });

  const visorMat = new THREE.MeshStandardMaterial({
    color: palette.visorGlass,
    metalness: 0.95,
    roughness: 0.08,
  });

  const eyeMat = new THREE.MeshBasicMaterial({
    color: palette.eyeGlow,
  });

  const coreMat = new THREE.MeshStandardMaterial({
    color: palette.coreGlow,
    emissive: palette.coreGlow,
    emissiveIntensity: 0.85,
    roughness: 0.2,
  });

  const beaconMat = new THREE.MeshStandardMaterial({
    color: palette.beaconGlow,
    emissive: palette.beaconGlow,
    emissiveIntensity: 0.95,
    roughness: 0.2,
  });

  // A. Torso Assembly
  const torsoGroup = new THREE.Group();
  robotRoot.add(torsoGroup);

  // Torso main body
  const bodyGeo = new THREE.BoxGeometry(1.3, 1.35, 0.95);
  const bodyMesh = new THREE.Mesh(bodyGeo, primaryMat);
  bodyMesh.position.y = -0.15;
  torsoGroup.add(bodyMesh);

  // Front chest armor plate
  const chestPlateGeo = new THREE.BoxGeometry(1.08, 0.85, 0.18);
  const chestPlate = new THREE.Mesh(chestPlateGeo, secondaryMat);
  chestPlate.position.set(0, -0.05, 0.48);
  torsoGroup.add(chestPlate);

  // Arc Reactor Core (Glowing pulsing center)
  const coreBezelGeo = new THREE.TorusGeometry(0.24, 0.04, 16, 32);
  const coreBezel = new THREE.Mesh(coreBezelGeo, highlightMat);
  coreBezel.position.set(0, -0.05, 0.58);
  torsoGroup.add(coreBezel);

  const coreDiskGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.06, 32);
  coreDiskGeo.rotateX(Math.PI / 2);
  const coreDisk = new THREE.Mesh(coreDiskGeo, coreMat);
  coreDisk.position.set(0, -0.05, 0.57);
  torsoGroup.add(coreDisk);

  // Shoulder Mount Plates
  const leftShoulderPadGeo = new THREE.BoxGeometry(0.32, 0.22, 0.92);
  const leftShoulderPad = new THREE.Mesh(leftShoulderPadGeo, highlightMat);
  leftShoulderPad.position.set(-0.72, 0.45, 0);
  torsoGroup.add(leftShoulderPad);

  const rightShoulderPadGeo = new THREE.BoxGeometry(0.32, 0.22, 0.92);
  const rightShoulderPad = new THREE.Mesh(rightShoulderPadGeo, highlightMat);
  rightShoulderPad.position.set(0.72, 0.45, 0);
  torsoGroup.add(rightShoulderPad);

  // Anti-Gravity Thruster Bell at Base
  const thrusterBellGeo = new THREE.CylinderGeometry(0.38, 0.58, 0.45, 24, 1, true);
  const thrusterBell = new THREE.Mesh(thrusterBellGeo, secondaryMat);
  thrusterBell.position.y = -0.92;
  torsoGroup.add(thrusterBell);

  const thrusterRingGeo = new THREE.TorusGeometry(0.42, 0.05, 16, 32);
  thrusterRingGeo.rotateX(Math.PI / 2);
  const thrusterRing = new THREE.Mesh(thrusterRingGeo, coreMat);
  thrusterRing.position.y = -1.14;
  torsoGroup.add(thrusterRing);

  // B. Neck & Head Assembly
  const headGroup = new THREE.Group();
  headGroup.position.set(0, 0.92, 0);
  torsoGroup.add(headGroup);

  // Neck joint
  const neckGeo = new THREE.CylinderGeometry(0.24, 0.28, 0.32, 16);
  const neckMesh = new THREE.Mesh(neckGeo, highlightMat);
  neckMesh.position.y = -0.22;
  headGroup.add(neckMesh);

  // Main Head Helmet
  const headGeo = new THREE.BoxGeometry(1.24, 0.98, 1.05);
  const headMesh = new THREE.Mesh(headGeo, primaryMat);
  headGroup.add(headMesh);

  // Crown curved cap
  const crownGeo = new THREE.CylinderGeometry(0.52, 0.62, 1.02, 16);
  crownGeo.rotateZ(Math.PI / 2);
  const crownMesh = new THREE.Mesh(crownGeo, secondaryMat);
  crownMesh.position.set(0, 0.48, 0);
  headGroup.add(crownMesh);

  // Visor Faceplate
  const visorGeo = new THREE.BoxGeometry(1.06, 0.52, 0.14);
  const visorMesh = new THREE.Mesh(visorGeo, visorMat);
  visorMesh.position.set(0, 0.02, 0.52);
  headGroup.add(visorMesh);

  // Glowing LED Visor Eyes (Blinkable)
  const eyeLeftGeo = new THREE.BoxGeometry(0.25, 0.09, 0.04);
  const eyeLeft = new THREE.Mesh(eyeLeftGeo, eyeMat);
  eyeLeft.position.set(-0.25, 0.04, 0.6);
  headGroup.add(eyeLeft);

  const eyeRightGeo = new THREE.BoxGeometry(0.25, 0.09, 0.04);
  const eyeRight = new THREE.Mesh(eyeRightGeo, eyeMat);
  eyeRight.position.set(0.25, 0.04, 0.6);
  headGroup.add(eyeRight);

  // Antenna Stalk & Glowing Beacon
  const antennaStalkGeo = new THREE.CylinderGeometry(0.028, 0.028, 0.52, 8);
  const antennaStalk = new THREE.Mesh(antennaStalkGeo, highlightMat);
  antennaStalk.position.set(0, 0.85, 0);
  headGroup.add(antennaStalk);

  const beaconGeo = new THREE.SphereGeometry(0.09, 16, 16);
  const beaconMesh = new THREE.Mesh(beaconGeo, beaconMat);
  beaconMesh.position.set(0, 1.13, 0);
  headGroup.add(beaconMesh);

  // Ear Pods (Left & Right)
  const earGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.16, 16);
  earGeo.rotateZ(Math.PI / 2);
  const earLeft = new THREE.Mesh(earGeo, highlightMat);
  earLeft.position.set(-0.68, 0.05, 0);
  headGroup.add(earLeft);

  const earRight = new THREE.Mesh(earGeo, highlightMat);
  earRight.position.set(0.68, 0.05, 0);
  headGroup.add(earRight);

  // C. Left Arm Assembly (Relaxed Stance)
  const leftArmGroup = new THREE.Group();
  leftArmGroup.position.set(-0.84, 0.35, 0);
  torsoGroup.add(leftArmGroup);

  const leftShoulder = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 16), highlightMat);
  leftArmGroup.add(leftShoulder);

  const leftUpperArm = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.09, 0.55, 12), secondaryMat);
  leftUpperArm.position.y = -0.32;
  leftArmGroup.add(leftUpperArm);

  const leftElbow = new THREE.Mesh(new THREE.SphereGeometry(0.12, 12, 12), highlightMat);
  leftElbow.position.y = -0.62;
  leftArmGroup.add(leftElbow);

  const leftForearm = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.08, 0.48, 12), primaryMat);
  leftForearm.position.set(0, -0.88, 0.08);
  leftForearm.rotation.x = -0.3;
  leftArmGroup.add(leftForearm);

  const leftHand = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.16, 0.08), highlightMat);
  leftHand.position.set(0, -1.14, 0.16);
  leftArmGroup.add(leftHand);

  // D. Right Arm Assembly (Animated Waving & Greeting)
  const rightArmGroup = new THREE.Group();
  rightArmGroup.position.set(0.84, 0.35, 0);
  torsoGroup.add(rightArmGroup);

  const rightShoulder = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 16), highlightMat);
  rightArmGroup.add(rightShoulder);

  const rightUpperArm = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.09, 0.55, 12), secondaryMat);
  rightUpperArm.position.y = -0.32;
  rightArmGroup.add(rightUpperArm);

  const rightElbow = new THREE.Mesh(new THREE.SphereGeometry(0.12, 12, 12), highlightMat);
  rightElbow.position.y = -0.62;
  rightArmGroup.add(rightElbow);

  const rightForearmGroup = new THREE.Group();
  rightForearmGroup.position.set(0, -0.62, 0);
  rightArmGroup.add(rightForearmGroup);

  const rightForearm = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.08, 0.48, 12), primaryMat);
  rightForearm.position.y = -0.26;
  rightForearmGroup.add(rightForearm);

  const rightHand = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.16, 0.08), highlightMat);
  rightHand.position.y = -0.52;
  rightForearmGroup.add(rightHand);

  // E. Floating Orbital Data Halo
  const haloGeo = new THREE.TorusGeometry(1.85, 0.018, 16, 80);
  haloGeo.rotateX(Math.PI / 2.3);
  const haloMat = new THREE.MeshStandardMaterial({
    color: palette.eyeGlow,
    emissive: palette.eyeGlow,
    emissiveIntensity: 0.5,
    metalness: 0.3,
    roughness: 0.2,
    transparent: true,
    opacity: 0.65,
  });
  const haloMesh = new THREE.Mesh(haloGeo, haloMat);
  robotRoot.add(haloMesh);

  // 5. Cursor Tracking & Motion Variables
  let mouseX = 0;
  let mouseY = 0;
  let targetMouseX = 0;
  let targetMouseY = 0;

  // Window & Container Mouse Listener
  const updatePointer = (clientX, clientY) => {
    const rect = container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Normalizing between -1 and 1 relative to container center
    targetMouseX = Math.max(-1.5, Math.min(1.5, (clientX - centerX) / (rect.width * 0.75)));
    targetMouseY = Math.max(-1.5, Math.min(1.5, (clientY - centerY) / (rect.height * 0.75)));
  };

  window.addEventListener('mousemove', (e) => {
    updatePointer(e.clientX, e.clientY);
  });

  window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      updatePointer(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });

  container.addEventListener('mouseleave', () => {
    targetMouseX = 0;
    targetMouseY = 0;
  });

  // 6. Waving Animation State Machine
  let isWaving = true; // Auto wave immediately on visit!
  let waveTimer = 0;
  let waveDuration = 3.5; // Wave for 3.5 seconds on visit

  exportFunctionTriggerWave = () => {
    isWaving = true;
    waveTimer = 0;
    waveDuration = 3.0;
  };

  // 7. Interactive Speech Bubble Integration
  setupRobotSpeechBubble();

  // Clicking robot triggers wave and next dialogue
  container.addEventListener('click', () => {
    exportFunctionTriggerWave();
    advanceRobotDialogue();
  });

  // 8. Blink Animation Timer
  let blinkTimer = 0;
  let nextBlink = 3.0;
  let isBlinking = false;

  // 9. Render Loop
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();
    const elapsed = clock.getElapsedTime();

    // Smooth cursor interpolation
    mouseX += (targetMouseX - mouseX) * 0.08;
    mouseY += (targetMouseY - mouseY) * 0.08;

    // A. Head Tracking Cursor (Direct Pitch and Yaw)
    headGroup.rotation.y = mouseX * 0.85; // Yaw towards mouse
    headGroup.rotation.x = -mouseY * 0.55; // Pitch up/down

    // B. Torso Banking & Subtle Follow
    torsoGroup.rotation.y = mouseX * 0.28;
    torsoGroup.rotation.z = -mouseX * 0.1;
    torsoGroup.rotation.x = -mouseY * 0.12;

    // C. Organic Hovering Float
    const hoverFloat = Math.sin(elapsed * 2.4) * 0.12;
    robotRoot.position.y = hoverFloat - (mouseY * 0.15);
    robotRoot.position.x = mouseX * 0.35;

    // D. Pulsing Core & Beacon
    const pulse = 0.7 + Math.sin(elapsed * 4.0) * 0.3;
    coreMat.emissiveIntensity = pulse;
    beaconMat.emissiveIntensity = 0.6 + Math.sin(elapsed * 6.0) * 0.4;

    // Halo gentle rotation
    haloMesh.rotation.z = elapsed * 0.4;
    haloMesh.rotation.y = Math.sin(elapsed * 0.5) * 0.2;

    // E. Waving State Handler
    if (isWaving) {
      waveTimer += delta;
      // Raise right arm to wave position
      rightArmGroup.rotation.z = THREE.MathUtils.lerp(rightArmGroup.rotation.z, -1.35, 0.12);
      rightArmGroup.rotation.x = THREE.MathUtils.lerp(rightArmGroup.rotation.x, -0.45, 0.12);
      rightForearmGroup.rotation.z = Math.sin(waveTimer * 10.0) * 0.45;

      if (waveTimer >= waveDuration) {
        isWaving = false;
      }
    } else {
      // Return right arm to relaxed hover posture
      rightArmGroup.rotation.z = THREE.MathUtils.lerp(rightArmGroup.rotation.z, 0.08, 0.08);
      rightArmGroup.rotation.x = THREE.MathUtils.lerp(rightArmGroup.rotation.x, 0.0, 0.08);
      rightForearmGroup.rotation.z = THREE.MathUtils.lerp(rightForearmGroup.rotation.z, 0.0, 0.08);
    }

    // F. Eye Blinking Logic
    blinkTimer += delta;
    if (blinkTimer >= nextBlink && !isBlinking) {
      isBlinking = true;
      eyeLeft.scale.y = 0.08;
      eyeRight.scale.y = 0.08;
      setTimeout(() => {
        eyeLeft.scale.y = 1.0;
        eyeRight.scale.y = 1.0;
        isBlinking = false;
        blinkTimer = 0;
        nextBlink = 3.5 + Math.random() * 3.0; // Next blink in 3.5 - 6.5s
      }, 140);
    }

    renderer.render(scene, camera);
  }

  animate();

  // 10. Responsive Resizing
  const handleResize = () => {
    if (!container) return;
    const w = container.clientWidth || 500;
    const h = container.clientHeight || 420;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  };

  window.addEventListener('resize', handleResize);

  // 11. Theme Update Listener
  const observer = new MutationObserver(() => {
    palette = getRobotPalette();
    primaryMat.color.setHex(palette.armorPrimary);
    primaryMat.metalness = palette.metalness;
    primaryMat.roughness = palette.roughness;

    secondaryMat.color.setHex(palette.armorSecondary);
    highlightMat.color.setHex(palette.armorHighlight);
    visorMat.color.setHex(palette.visorGlass);
    ambientLight.color.setHex(0xffffff);
    ambientLight.intensity = palette.lightAmbient;
    rimLight.color.setHex(palette.rimLight);
  });

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  });
}

// Global wave trigger reference
let exportFunctionTriggerWave = () => {};

// Dialogues for the Robot Companion
const robotDialogues = [
  "Hi! 👋 Welcome to my portfolio! I track your cursor in real-time. Move around to look!",
  "Abhijay is an undergraduate in Robotics & AI at VTU Muddenahalli, Karnataka. 🤖",
  "🏆 Root-Defense won 3rd Prize (₹10,000) at Tech Habba 2026! Check it out below!",
  "I'm built with Three.js WebGL and procedural inverse kinematics! 🦾",
  "Explore the Core Languages bar and Repositories below, or tap Résumé to download!"
];

let currentDialogueIndex = 0;

function advanceRobotDialogue() {
  currentDialogueIndex = (currentDialogueIndex + 1) % robotDialogues.length;
  const bubbleText = document.getElementById('robot-speech-text');
  if (bubbleText) {
    bubbleText.style.opacity = '0';
    setTimeout(() => {
      bubbleText.textContent = robotDialogues[currentDialogueIndex];
      bubbleText.style.opacity = '1';
    }, 150);
  }
}

// =============================================================================
// SPEECH BUBBLE & VOICE GREETING
// =============================================================================
function setupRobotSpeechBubble() {
  const container = document.getElementById('webgl-hero-container');
  if (!container) return;

  const parentFrame = container.closest('.webgl-frame');
  if (!parentFrame) return;

  // Check if bubble already exists
  let bubble = document.getElementById('robot-speech-bubble');
  if (!bubble) {
    bubble = document.createElement('div');
    bubble.id = 'robot-speech-bubble';
    bubble.className = 'robot-speech-bubble visible';
    bubble.innerHTML = `
      <div class="speech-header">
        <div class="speech-bot-title">
          <span class="speech-bot-avatar">🤖</span>
          <span class="speech-bot-name">AI COMPANION // ABHI-BOT</span>
        </div>
        <div class="speech-header-actions">
          <button id="robot-voice-btn" class="speech-action-btn" title="Speak greeting" aria-label="Speak greeting aloud">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
            </svg>
          </button>
        </div>
      </div>
      <p id="robot-speech-text" class="speech-body">
        Hi! 👋 Welcome to my portfolio!
      </p>
      <div class="speech-bubble-tail"></div>
    `;

    parentFrame.appendChild(bubble);

    // Click bubble to cycle dialogue and wave
    bubble.addEventListener('click', (e) => {
      // Don't trigger if clicked audio button directly
      if (e.target.closest('#robot-voice-btn')) return;
      exportFunctionTriggerWave();
      advanceRobotDialogue();
    });

    // Voice synthesis audio button
    const voiceBtn = bubble.querySelector('#robot-voice-btn');
    if (voiceBtn) {
      voiceBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        exportFunctionTriggerWave();
        speakRobotMessage();
      });
    }

    // Attempt gentle speech greeting upon first user interaction
    const speakFirstGreeting = () => {
      window.removeEventListener('click', speakFirstGreeting);
      window.removeEventListener('keydown', speakFirstGreeting);
      // Optional subtle voice greeting if permitted
      speakRobotMessage(true);
    };

    window.addEventListener('click', speakFirstGreeting, { once: true });
    window.addEventListener('keydown', speakFirstGreeting, { once: true });
  }
}

function speakRobotMessage(subtle = false) {
  if ('speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
      const text = document.getElementById('robot-speech-text')?.textContent || "Hi! Welcome to my portfolio!";
      const cleanText = text.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}]/gu, '');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 1.05;
      utterance.pitch = 1.15;
      if (subtle) utterance.volume = 0.7;
      window.speechSynthesis.speak(utterance);
    } catch (err) {
      // Speech synthesis blocked or unavailable, speech bubble conveys message visually
    }
  }
}
