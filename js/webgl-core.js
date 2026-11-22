// =============================================================================
// WEBGL-CORE.JS - Cheerful 3D Yellow Robot Companion & Falling Skills Catcher
// Features:
// 1. Procedural 3D Cheerful Yellow Robot (matching reference design: spherical
//    yellow helmet, silver crown crest, side headphones, glossy visor, glowing
//    emerald green eyes with happy '^ ^' squint, and floating yellow boots).
// 2. Real-time cursor tracking (head, eyes, and torso pitch/yaw).
// 3. Falling Skills Catch Mini-Game: Authentic skill logos (Python, ROS, C++, etc.)
//    float down in glowing bubbles; clicking catches them with spark particle FX,
//    a celebratory "Skill Acquired" toast, and cheerful robot victory cheers!
// =============================================================================

import { techLogos } from './tech-logos.js';

export function initWebGLCore() {
  const container = document.getElementById('webgl-hero-container');
  if (!container) return;

  if (typeof THREE === 'undefined') {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.onload = () => setupCheerfulRobotScene(container);
    document.head.appendChild(script);
    return;
  }

  setupCheerfulRobotScene(container);
}

// Global action triggers between 3D scene and falling skills game
let triggerCheerfulCatchAnim = () => {};
let triggerCheerfulSpin = () => {};

function setupCheerfulRobotScene(container) {
  // 1. Scene & Camera Setup
  const scene = new THREE.Scene();
  const width = container.clientWidth || 480;
  const height = container.clientHeight || 420;

  const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
  camera.position.set(0, 0.1, 6.6);

  // 2. High-performance WebGL Renderer
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;

  container.innerHTML = '';
  container.appendChild(renderer.domElement);

  // Theme Detection
  const isDark = () => document.documentElement.getAttribute('data-theme') === 'dark';

  const getRobotPalette = () => {
    const dark = isDark();
    return {
      yellowBody: dark ? 0xf59e0b : 0xeab308,     // Glossy Bumblebee Yellow / Warm Amber
      yellowHighlight: dark ? 0xfbbf24 : 0xfde047,
      silverMetal: 0x94a3b8,                      // Brushed Silver Joint Rods & Soles
      darkMetal: 0x334155,                        // Dark Titanium Accents
      visorGlass: dark ? 0x07111e : 0x0f172a,     // Glossy Astronaut Bubble Visor
      eyeGreen: 0x22c55e,                         // Cheerful Emerald/Mint Green LED Eyes
      lightAmbient: dark ? 1.1 : 1.4,
      lightDirectional: dark ? 1.6 : 1.9,
      keyWarmth: 0xffedd5,
    };
  };

  let palette = getRobotPalette();

  // 3. Lighting System
  const ambientLight = new THREE.AmbientLight(0xffffff, palette.lightAmbient);
  scene.add(ambientLight);

  const keyLight = new THREE.DirectionalLight(palette.keyWarmth, palette.lightDirectional);
  keyLight.position.set(4, 5, 5);
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0x38bdf8, 1.0);
  fillLight.position.set(-4, -2, -3);
  scene.add(fillLight);

  const eyeGlowLight = new THREE.PointLight(palette.eyeGreen, 1.2, 5);
  eyeGlowLight.position.set(0, 0.8, 1.2);
  scene.add(eyeGlowLight);

  // 4. Robot Hierarchy & Assembly
  const robotRoot = new THREE.Group();
  scene.add(robotRoot);

  // Material Library
  const yellowMat = new THREE.MeshStandardMaterial({
    color: palette.yellowBody,
    metalness: 0.22,
    roughness: 0.22,
  });

  const yellowHighlightMat = new THREE.MeshStandardMaterial({
    color: palette.yellowHighlight,
    metalness: 0.25,
    roughness: 0.18,
  });

  const silverMat = new THREE.MeshStandardMaterial({
    color: palette.silverMetal,
    metalness: 0.88,
    roughness: 0.2,
  });

  const darkMetalMat = new THREE.MeshStandardMaterial({
    color: palette.darkMetal,
    metalness: 0.82,
    roughness: 0.35,
  });

  const visorMat = new THREE.MeshStandardMaterial({
    color: palette.visorGlass,
    metalness: 0.95,
    roughness: 0.06,
  });

  const eyeMat = new THREE.MeshBasicMaterial({
    color: palette.eyeGreen,
  });

  // A. Torso Assembly (Cute rounded yellow chassis)
  const torsoGroup = new THREE.Group();
  robotRoot.add(torsoGroup);

  const chestGeo = new THREE.SphereGeometry(0.72, 24, 24);
  chestGeo.scale(0.92, 1.05, 0.88);
  const chestMesh = new THREE.Mesh(chestGeo, yellowMat);
  chestMesh.position.y = -0.15;
  torsoGroup.add(chestMesh);

  // Center chest badge / dial ("1" dial ring)
  const dialBezel = new THREE.Mesh(new THREE.TorusGeometry(0.18, 0.035, 16, 24), silverMat);
  dialBezel.position.set(0, -0.12, 0.62);
  torsoGroup.add(dialBezel);

  const dialInner = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.05, 24), darkMetalMat);
  dialInner.rotateX(Math.PI / 2);
  dialInner.position.set(0, -0.12, 0.6);
  torsoGroup.add(dialInner);

  // Neck ball joint
  const neckMesh = new THREE.Mesh(new THREE.SphereGeometry(0.24, 16, 16), silverMat);
  neckMesh.position.y = 0.62;
  torsoGroup.add(neckMesh);

  // B. Head Assembly (Large cute spherical helmet with silver crest & headphone ears)
  const headGroup = new THREE.Group();
  headGroup.position.set(0, 0.95, 0);
  torsoGroup.add(headGroup);

  // Spherical yellow helmet
  const helmetGeo = new THREE.SphereGeometry(1.12, 32, 32);
  helmetGeo.scale(1.0, 0.98, 0.94);
  const helmetMesh = new THREE.Mesh(helmetGeo, yellowMat);
  headGroup.add(helmetMesh);

  // Silver crown crest / racing stripe over helmet top
  const crestGeo = new THREE.CylinderGeometry(1.13, 1.13, 0.22, 32, 1, true);
  crestGeo.rotateZ(Math.PI / 2);
  const crestMesh = new THREE.Mesh(crestGeo, silverMat);
  crestMesh.position.set(0, 0.05, 0);
  headGroup.add(crestMesh);

  // Curved dark glossy bubble visor
  const visorGeo = new THREE.SphereGeometry(1.02, 32, 32, 0, Math.PI, 0, Math.PI * 0.72);
  visorGeo.rotateY(-Math.PI / 2);
  visorGeo.rotateX(Math.PI / 10);
  const visorMesh = new THREE.Mesh(visorGeo, visorMat);
  visorMesh.position.set(0, 0.05, 0.14);
  headGroup.add(visorMesh);

  // Expressive Eyes: Normal pill eyes vs Cheerful happy squint arcs (^ ^)
  const pillEyesGroup = new THREE.Group();
  headGroup.add(pillEyesGroup);

  const eyeLeftGeo = new THREE.BoxGeometry(0.24, 0.1, 0.04);
  const eyeLeft = new THREE.Mesh(eyeLeftGeo, eyeMat);
  eyeLeft.position.set(-0.28, 0.12, 0.92);
  pillEyesGroup.add(eyeLeft);

  const eyeRightGeo = new THREE.BoxGeometry(0.24, 0.1, 0.04);
  const eyeRight = new THREE.Mesh(eyeRightGeo, eyeMat);
  eyeRight.position.set(0.28, 0.12, 0.92);
  pillEyesGroup.add(eyeRight);

  // Cheerful Happy Eyes (^ ^ smiling arcs)
  const happyEyesGroup = new THREE.Group();
  happyEyesGroup.visible = false;
  headGroup.add(happyEyesGroup);

  const happyArcGeo = new THREE.TorusGeometry(0.12, 0.035, 12, 18, Math.PI);
  const happyEyeLeft = new THREE.Mesh(happyArcGeo, eyeMat);
  happyEyeLeft.position.set(-0.28, 0.1, 0.92);
  happyEyesGroup.add(happyEyeLeft);

  const happyEyeRight = new THREE.Mesh(happyArcGeo, eyeMat);
  happyEyeRight.position.set(0.28, 0.1, 0.92);
  happyEyesGroup.add(happyEyeRight);

  // Side Headphone Ear Pods (Left & Right)
  const earLeftGroup = new THREE.Group();
  earLeftGroup.position.set(-1.12, 0.08, 0);
  headGroup.add(earLeftGroup);

  const earLeftMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.22, 24), darkMetalMat);
  earLeftMesh.rotateZ(Math.PI / 2);
  earLeftGroup.add(earLeftMesh);

  const earLeftRing = new THREE.Mesh(new THREE.TorusGeometry(0.26, 0.04, 16, 24), silverMat);
  earLeftRing.rotateY(Math.PI / 2);
  earLeftRing.position.x = -0.12;
  earLeftGroup.add(earLeftRing);

  const earRightGroup = new THREE.Group();
  earRightGroup.position.set(1.12, 0.08, 0);
  headGroup.add(earRightGroup);

  const earRightMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.22, 24), darkMetalMat);
  earRightMesh.rotateZ(Math.PI / 2);
  earRightGroup.add(earRightMesh);

  const earRightRing = new THREE.Mesh(new THREE.TorusGeometry(0.26, 0.04, 16, 24), silverMat);
  earRightRing.rotateY(Math.PI / 2);
  earRightRing.position.x = 0.12;
  earRightGroup.add(earRightRing);

  // C. Left Arm Assembly (Cheerful Outstretched Posture)
  const leftArmGroup = new THREE.Group();
  leftArmGroup.position.set(-0.76, 0.32, 0);
  torsoGroup.add(leftArmGroup);

  const leftShoulder = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 16), silverMat);
  leftArmGroup.add(leftShoulder);

  const leftUpperArm = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.07, 0.45, 12), silverMat);
  leftUpperArm.position.set(-0.16, -0.22, 0.1);
  leftUpperArm.rotation.set(-0.3, 0, 0.6);
  leftArmGroup.add(leftUpperArm);

  const leftElbow = new THREE.Mesh(new THREE.SphereGeometry(0.12, 12, 12), darkMetalMat);
  leftElbow.position.set(-0.36, -0.42, 0.22);
  leftArmGroup.add(leftElbow);

  const leftForearm = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.12, 0.46, 16), yellowMat);
  leftForearm.position.set(-0.52, -0.62, 0.38);
  leftForearm.rotation.set(-0.5, 0.3, 0.8);
  leftArmGroup.add(leftForearm);

  // Articulated silver hand reaching out
  const leftHand = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.2, 0.08), silverMat);
  leftHand.position.set(-0.66, -0.82, 0.52);
  leftHand.rotation.set(-0.3, 0.5, 0.6);
  leftArmGroup.add(leftHand);

  // D. Right Arm Assembly (Animated Catching & Cheerful Waving)
  const rightArmGroup = new THREE.Group();
  rightArmGroup.position.set(0.76, 0.32, 0);
  torsoGroup.add(rightArmGroup);

  const rightShoulder = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 16), silverMat);
  rightArmGroup.add(rightShoulder);

  const rightUpperArm = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.07, 0.45, 12), silverMat);
  rightUpperArm.position.set(0.16, -0.22, 0.1);
  rightUpperArm.rotation.set(-0.3, 0, -0.6);
  rightArmGroup.add(rightUpperArm);

  const rightElbow = new THREE.Mesh(new THREE.SphereGeometry(0.12, 12, 12), darkMetalMat);
  rightElbow.position.set(0.36, -0.42, 0.22);
  rightArmGroup.add(rightElbow);

  const rightForearmGroup = new THREE.Group();
  rightForearmGroup.position.set(0.36, -0.42, 0.22);
  rightArmGroup.add(rightForearmGroup);

  const rightForearm = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.12, 0.46, 16), yellowMat);
  rightForearm.position.set(0.16, -0.2, 0.16);
  rightForearm.rotation.set(-0.5, -0.3, -0.8);
  rightForearmGroup.add(rightForearm);

  const rightHand = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.2, 0.08), silverMat);
  rightHand.position.set(0.3, -0.4, 0.3);
  rightHand.rotation.set(-0.3, -0.5, -0.6);
  rightForearmGroup.add(rightHand);

  // E. Legs & Floating Yellow Boots (Just like reference image!)
  const leftLegGroup = new THREE.Group();
  leftLegGroup.position.set(-0.34, -0.72, 0);
  torsoGroup.add(leftLegGroup);

  const leftHip = new THREE.Mesh(new THREE.SphereGeometry(0.14, 12, 12), darkMetalMat);
  leftLegGroup.add(leftHip);

  const leftThigh = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.1, 0.35, 14), yellowMat);
  leftThigh.position.set(-0.06, -0.2, 0.05);
  leftThigh.rotation.set(-0.35, 0, 0.2);
  leftLegGroup.add(leftThigh);

  const leftBoot = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.38, 0.58), yellowHighlightMat);
  leftBoot.position.set(-0.1, -0.48, 0.24);
  leftBoot.rotation.set(0.4, 0, 0.2);
  leftLegGroup.add(leftBoot);

  const leftSole = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.08, 0.6), silverMat);
  leftSole.position.set(-0.1, -0.66, 0.24);
  leftSole.rotation.set(0.4, 0, 0.2);
  leftLegGroup.add(leftSole);

  const rightLegGroup = new THREE.Group();
  rightLegGroup.position.set(0.34, -0.72, 0);
  torsoGroup.add(rightLegGroup);

  const rightHip = new THREE.Mesh(new THREE.SphereGeometry(0.14, 12, 12), darkMetalMat);
  rightLegGroup.add(rightHip);

  const rightThigh = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.1, 0.35, 14), yellowMat);
  rightThigh.position.set(0.06, -0.2, -0.05);
  rightThigh.rotation.set(-0.15, 0, -0.2);
  rightLegGroup.add(rightThigh);

  const rightBoot = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.38, 0.58), yellowHighlightMat);
  rightBoot.position.set(0.1, -0.48, 0.12);
  rightBoot.rotation.set(0.2, 0, -0.2);
  rightLegGroup.add(rightBoot);

  const rightSole = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.08, 0.6), silverMat);
  rightSole.position.set(0.1, -0.66, 0.12);
  rightSole.rotation.set(0.2, 0, -0.2);
  rightLegGroup.add(rightSole);

  // 5. Cursor Tracking & Motion
  let mouseX = 0;
  let mouseY = 0;
  let targetMouseX = 0;
  let targetMouseY = 0;

  const updatePointer = (clientX, clientY) => {
    const rect = container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    targetMouseX = Math.max(-1.5, Math.min(1.5, (clientX - centerX) / (rect.width * 0.7)));
    targetMouseY = Math.max(-1.5, Math.min(1.5, (clientY - centerY) / (rect.height * 0.7)));
  };

  window.addEventListener('mousemove', (e) => updatePointer(e.clientX, e.clientY));
  window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) updatePointer(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: true });

  container.addEventListener('mouseleave', () => {
    targetMouseX = 0;
    targetMouseY = 0;
  });

  // 6. Cheerful Animation States
  let isCheerfulCatching = false;
  let cheerfulTimer = 0;
  let cheerfulBounce = 0;

  let isSpinning = false;
  let spinAngle = 0;

  triggerCheerfulCatchAnim = (targetNormX, targetNormY) => {
    isCheerfulCatching = true;
    cheerfulTimer = 0;
    cheerfulBounce = 0.45; // Joyful bounce upward!

    // Switch eyes to happy squint (^ ^)
    pillEyesGroup.visible = false;
    happyEyesGroup.visible = true;

    // Direct head toward caught skill
    targetMouseX = targetNormX || 0;
    targetMouseY = targetNormY || -0.5;
  };

  triggerCheerfulSpin = () => {
    isSpinning = true;
    spinAngle = 0;
    pillEyesGroup.visible = false;
    happyEyesGroup.visible = true;
    setTimeout(() => {
      pillEyesGroup.visible = true;
      happyEyesGroup.visible = false;
    }, 1800);
  };

  container.addEventListener('click', (e) => {
    // Only spin if clicked canvas directly and not a skill bubble
    if (!e.target.closest('.falling-skill-orb')) {
      triggerCheerfulSpin();
    }
  });

  // 7. Blinking Logic
  let blinkTimer = 0;
  let nextBlink = 3.2;
  let isBlinking = false;

  // 8. Render Animation Loop
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();
    const elapsed = clock.getElapsedTime();

    // Smooth cursor interpolation
    mouseX += (targetMouseX - mouseX) * 0.08;
    mouseY += (targetMouseY - mouseY) * 0.08;

    // Head tracks cursor
    headGroup.rotation.y = mouseX * 0.75;
    headGroup.rotation.x = -mouseY * 0.45;

    // Torso banking
    torsoGroup.rotation.y = mouseX * 0.25;
    torsoGroup.rotation.z = -mouseX * 0.1;

    // Organic cheerful floating hover
    const hoverY = Math.sin(elapsed * 2.8) * 0.14;
    robotRoot.position.y = hoverY + cheerfulBounce - (mouseY * 0.12);
    robotRoot.position.x = mouseX * 0.3;

    // Playful floating kicking boots
    leftLegGroup.rotation.x = Math.sin(elapsed * 2.5) * 0.18;
    rightLegGroup.rotation.x = -Math.sin(elapsed * 2.5) * 0.18;

    // Handling cheerful catch celebration
    if (isCheerfulCatching) {
      cheerfulTimer += delta;
      cheerfulBounce = Math.max(0, cheerfulBounce - delta * 0.7);

      // Raise both arms in victory celebration!
      leftArmGroup.rotation.z = THREE.MathUtils.lerp(leftArmGroup.rotation.z, -1.2, 0.15);
      leftArmGroup.rotation.x = THREE.MathUtils.lerp(leftArmGroup.rotation.x, -0.6, 0.15);
      rightArmGroup.rotation.z = THREE.MathUtils.lerp(rightArmGroup.rotation.z, 1.2, 0.15);
      rightArmGroup.rotation.x = THREE.MathUtils.lerp(rightArmGroup.rotation.x, -0.6, 0.15);

      if (cheerfulTimer >= 2.0) {
        isCheerfulCatching = false;
        pillEyesGroup.visible = true;
        happyEyesGroup.visible = false;
      }
    } else {
      cheerfulBounce = 0;
      // Cheerful idle outstretched arms
      leftArmGroup.rotation.z = THREE.MathUtils.lerp(leftArmGroup.rotation.z, 0.1 + Math.sin(elapsed * 2.0) * 0.08, 0.08);
      leftArmGroup.rotation.x = THREE.MathUtils.lerp(leftArmGroup.rotation.x, 0.0, 0.08);
      rightArmGroup.rotation.z = THREE.MathUtils.lerp(rightArmGroup.rotation.z, -0.1 - Math.sin(elapsed * 2.0) * 0.08, 0.08);
      rightArmGroup.rotation.x = THREE.MathUtils.lerp(rightArmGroup.rotation.x, 0.0, 0.08);
    }

    // Full 360 victory spin
    if (isSpinning) {
      spinAngle += delta * 8.0;
      robotRoot.rotation.y = spinAngle;
      if (spinAngle >= Math.PI * 2) {
        isSpinning = false;
        robotRoot.rotation.y = 0;
      }
    }

    // Eye blinking
    if (!happyEyesGroup.visible) {
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
          nextBlink = 3.0 + Math.random() * 3.5;
        }, 130);
      }
    }

    renderer.render(scene, camera);
  }

  animate();

  // 9. Resize Handling
  const handleResize = () => {
    if (!container) return;
    const w = container.clientWidth || 480;
    const h = container.clientHeight || 420;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  };

  window.addEventListener('resize', handleResize);

  // 10. Theme Mutation Observer
  const observer = new MutationObserver(() => {
    palette = getRobotPalette();
    yellowMat.color.setHex(palette.yellowBody);
    yellowHighlightMat.color.setHex(palette.yellowHighlight);
    visorMat.color.setHex(palette.visorGlass);
    ambientLight.color.setHex(0xffffff);
    ambientLight.intensity = palette.lightAmbient;
    keyLight.intensity = palette.lightDirectional;
  });

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  });

  // 11. Mount Falling Skills Mini-Game & Cheerful Greeting
  setupFallingSkillsMiniGame(container);
  setupRobotSpeechBubble();
}

// =============================================================================
// FALLING SKILLS MINI-GAME & SKILL ACQUIRED MECHANIC
// =============================================================================

const skillsCatalog = [
  { key: 'python', name: 'Python', phrase: 'Autonomous AI pipelines & ML inference unlocked!' },
  { key: 'cpp', name: 'C++', phrase: 'Real-time high-throughput robotics algorithms activated!' },
  { key: 'ros', name: 'ROS 2', phrase: 'Robotics nodes & sensor telemetry publishing live!' },
  { key: 'solidity', name: 'Solidity', phrase: 'Immutable smart contracts & Quai Network anchored!' },
  { key: 'golang', name: 'Go', phrase: 'Ultra-fast tamper-evident log forwarders deployed!' },
  { key: 'javascript', name: 'JavaScript', phrase: 'Modern responsive web interfaces running smooth!' },
  { key: 'typescript', name: 'TypeScript', phrase: 'Strict type safety & scalable systems architecture!' },
  { key: 'c', name: 'C', phrase: 'Bare-metal microcontroller & firmware mastery!' },
  { key: 'linux', name: 'Linux', phrase: 'Root access defense & kernel audit logging engaged!' },
  { key: 'git', name: 'Git', phrase: 'Flawless distributed version control & open-source sync!' },
  { key: 'arduino', name: 'Arduino', phrase: 'Sensors, actuators & embedded robotics interfacing!' },
  { key: 'opencv', name: 'OpenCV', phrase: 'Computer vision, object tracking & spatial awareness!' },
  { key: 'postgresql', name: 'PostgreSQL', phrase: 'Relational data clustering & analytical indexes!' },
  { key: 'sqlite', name: 'SQLite', phrase: 'Lightweight off-host witness database online!' },
];

const acquiredSkillsSet = new Set();

function setupFallingSkillsMiniGame(container) {
  // Create or clean falling skills overlay
  let fallingLayer = container.querySelector('#falling-skills-layer');
  if (fallingLayer) fallingLayer.remove();

  fallingLayer = document.createElement('div');
  fallingLayer.id = 'falling-skills-layer';
  fallingLayer.className = 'falling-skills-container';
  container.appendChild(fallingLayer);

  // Spawning timer for falling skill bubbles
  let isPageVisible = true;
  document.addEventListener('visibilitychange', () => {
    isPageVisible = !document.hidden;
  });

  let skillIndex = 0;

  function spawnFallingSkill() {
    if (!isPageVisible || !container) return;

    // Select skill from catalog
    const skill = skillsCatalog[skillIndex % skillsCatalog.length];
    skillIndex++;

    const orb = document.createElement('div');
    orb.className = 'falling-skill-orb';

    // Position randomly along top (15% to 80% to stay centered over robot)
    const startXPercent = 14 + Math.random() * 68;
    orb.style.left = `${startXPercent}%`;
    orb.style.top = '-50px';

    // Insert authentic vector logo & tooltip
    const logoSvg = techLogos[skill.key] || '<svg width="22" height="22"><circle cx="11" cy="11" r="9" fill="#f59e0b"/></svg>';
    orb.innerHTML = `
      ${logoSvg}
      <span class="falling-skill-tooltip">${skill.name}</span>
    `;

    fallingLayer.appendChild(orb);

    // Falling animation variables
    let posY = -50;
    const speed = 1.1 + Math.random() * 0.7; // Gentle fall
    let animId = null;

    function dropStep() {
      posY += speed;
      orb.style.top = `${posY}px`;

      const maxH = container.clientHeight || 420;
      if (posY > maxH + 40) {
        cancelAnimationFrame(animId);
        orb.remove();
      } else {
        animId = requestAnimationFrame(dropStep);
      }
    }

    animId = requestAnimationFrame(dropStep);

    // Click Catch Handler: Catch skill, pop orb, cheer robot!
    orb.addEventListener('click', (e) => {
      e.stopPropagation();
      cancelAnimationFrame(animId);

      const orbRect = orb.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const relX = orbRect.left - containerRect.left + orbRect.width / 2;
      const relY = orbRect.top - containerRect.top + orbRect.height / 2;

      // 1. Normalized coordinate for 3D Robot to look and reach toward
      const normX = ((relX / containerRect.width) - 0.5) * 2;
      const normY = ((relY / containerRect.height) - 0.5) * 2;

      // 2. Trigger Cheerful Robot Catch Animation
      triggerCheerfulCatchAnim(normX, normY);

      // 3. Burst Particle FX
      spawnBurstParticles(fallingLayer, relX, relY);

      // 4. Floating "Skill Acquired" Toast
      spawnSkillAcquiredToast(fallingLayer, relX, relY, skill.name);

      // 5. Update Acquired Skills Counter
      acquiredSkillsSet.add(skill.key);
      updateScorePill();

      // 6. Update Speech Bubble with Cheerful Praise
      updateCheerfulSpeech(skill);

      // Remove orb
      orb.remove();
    });
  }

  // Periodic spawn loop: every 2.0s
  setInterval(spawnFallingSkill, 2000);
  // Initial immediate spawn
  setTimeout(spawnFallingSkill, 600);
}

function updateScorePill() {
  const pill = document.getElementById('skills-acquired-pill');
  if (pill) {
    pill.textContent = `ACQUIRED: ${acquiredSkillsSet.size} / ${skillsCatalog.length}`;
    pill.style.color = '#10b981';
    pill.style.borderColor = 'rgba(16, 185, 129, 0.5)';
  }
}

function spawnBurstParticles(parent, x, y) {
  const colors = ['#f59e0b', '#fbbf24', '#22c55e', '#ffffff', '#38bdf8'];
  for (let i = 0; i < 12; i++) {
    const spark = document.createElement('div');
    spark.className = 'skill-burst-spark';
    spark.style.left = `${x}px`;
    spark.style.top = `${y}px`;
    spark.style.background = colors[i % colors.length];

    const angle = (i / 12) * Math.PI * 2 + Math.random() * 0.4;
    const dist = 32 + Math.random() * 38;
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist;

    spark.style.setProperty('--dx', `${dx}px`);
    spark.style.setProperty('--dy', `${dy}px`);

    parent.appendChild(spark);
    setTimeout(() => spark.remove(), 600);
  }
}

function spawnSkillAcquiredToast(parent, x, y, skillName) {
  const toast = document.createElement('div');
  toast.className = 'skill-acquired-toast';
  toast.style.left = `${x}px`;
  toast.style.top = `${y}px`;
  toast.innerHTML = `
    <span>✨</span>
    <span>Skill Acquired: ${skillName}!</span>
  `;
  parent.appendChild(toast);
  setTimeout(() => toast.remove(), 1400);
}

function updateCheerfulSpeech(skill) {
  const bubbleText = document.getElementById('robot-speech-text');
  if (bubbleText) {
    bubbleText.style.opacity = '0';
    setTimeout(() => {
      bubbleText.innerHTML = `Yay! 🎉 <strong>Skill Acquired: ${skill.name}!</strong> ${skill.phrase} ⭐`;
      bubbleText.style.opacity = '1';
    }, 120);
  }

  // Optional Voice Utterance
  speakMessage(`Skill acquired: ${skill.name}!`);
}

function speakMessage(text) {
  if ('speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.1;
      utterance.pitch = 1.25;
      utterance.volume = 0.75;
      window.speechSynthesis.speak(utterance);
    } catch (err) {}
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

  let bubble = document.getElementById('robot-speech-bubble');
  if (!bubble) {
    bubble = document.createElement('div');
    bubble.id = 'robot-speech-bubble';
    bubble.className = 'robot-speech-bubble visible';
    bubble.innerHTML = `
      <div class="speech-header">
        <div class="speech-bot-title">
          <span class="speech-bot-avatar">🤖</span>
          <span class="speech-bot-name">CHEERFUL BOT // VTU-AI</span>
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
        Hi! 👋 Click falling skill logos to catch & acquire them with me!
      </p>
      <div class="speech-bubble-tail"></div>
    `;

    parentFrame.appendChild(bubble);

    bubble.addEventListener('click', (e) => {
      if (e.target.closest('#robot-voice-btn')) return;
      triggerCheerfulSpin();
    });

    const voiceBtn = bubble.querySelector('#robot-voice-btn');
    if (voiceBtn) {
      voiceBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const text = document.getElementById('robot-speech-text')?.textContent || "Hi! Welcome to my portfolio!";
        speakMessage(text);
      });
    }
  }
}
