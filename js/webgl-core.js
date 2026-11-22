// =============================================================================
// WEBGL-CORE.JS - Buddy the Robot (3D Hero Companion) & Falling Skills Catcher
// Features:
// 1. Procedural 3D Buddy the Robot matching the reference design:
//    - Glossy bumblebee yellow head and body with soft metallic sheen
//    - Dark curved screen visor with expressive animated eyes (pupils follow cursor!)
//    - Multiple expressions: 'happy', 'joy', 'wink', 'love' (heart eyes!), 'wow'
//    - Glowing teal eyebrows, animated smiling / laughing mouth, pulsing pink blush cheeks
//    - Headphone ear discs, glowing antenna bulb with breathing pulse, chest diamond
//    - Floating arms and feet with smooth organic zero-gravity hover & shadow
// 2. Interactive Skills Catcher Mini-Game:
//    - Skill logos fall down in glowing orbs
//    - Single-click / touch instant catch (pointerdown + touchstart)
//    - Celebratory upward jump, wave, and joy/love expression
//    - Web Audio API cheerful upward major arpeggio chime (C5-E5-G5-C6)
//    - Upbeat, enthusiastic speech synthesis (higher pitch, energetic tempo)
// 3. Status Bar below canvas for 100% unobstructed robot visibility
// =============================================================================

import { techLogos } from './tech-logos.js';

export function initWebGLCore() {
  const container = document.getElementById('webgl-hero-container');
  if (!container) return;

  if (typeof THREE === 'undefined') {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.onload = () => setupBuddyRobotScene(container);
    document.head.appendChild(script);
    return;
  }

  setupBuddyRobotScene(container);
}

// Global action triggers
let triggerBuddyCatchAnim = () => {};
let triggerBuddySpin = () => {};

// =============================================================================
// CHEERFUL WEB AUDIO CHIME & SPEECH SYNTHESIS
// =============================================================================
let audioCtx = null;

function playCheerfulChime() {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    if (!audioCtx) audioCtx = new AudioContextClass();
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    // Upward cheerful major arpeggio: C5 (523.25Hz), E5 (659.25Hz), G5 (783.99Hz), C6 (1046.50Hz)
    const notes = [523.25, 659.25, 783.99, 1046.50];
    const now = audioCtx.currentTime;

    notes.forEach((freq, idx) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'triangle'; // Warm, bell-like, friendly chime
      osc.frequency.setValueAtTime(freq, now + idx * 0.07);

      gain.gain.setValueAtTime(0.18, now + idx * 0.07);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.32);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(now + idx * 0.07);
      osc.stop(now + idx * 0.07 + 0.33);
    });
  } catch (err) {
    // AudioContext blocked or unsupported
  }
}

function speakCheerfulMessage(text) {
  if (!('speechSynthesis' in window)) return;
  try {
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}✨⭐🎉👋🤖]/gu, '').trim();
    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.15;   // Upbeat, energetic tempo
    utterance.pitch = 1.35;  // Higher, cheerful, friendly robot pitch
    utterance.volume = 0.85;

    // Pick best available cheerful / natural voice
    const voices = window.speechSynthesis.getVoices();
    if (voices && voices.length > 0) {
      const preferred = voices.find(v => 
        (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('Victoria') || v.name.includes('Zira') || v.name.includes('Female')) && v.lang.startsWith('en')
      ) || voices.find(v => v.lang.startsWith('en'));
      if (preferred) utterance.voice = preferred;
    }

    window.speechSynthesis.speak(utterance);
  } catch (err) {
    // Speech synthesis blocked
  }
}

// =============================================================================
// THREE.JS SCENE SETUP - BUDDY THE ROBOT
// =============================================================================
function setupBuddyRobotScene(container) {
  const scene = new THREE.Scene();
  const width = container.clientWidth || 480;
  const height = container.clientHeight || 420;

  // Perspective Camera
  const cam = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
  cam.position.set(0, 1.0, 6.8);
  cam.lookAt(0, 0.95, 0);

  // High-performance WebGL Renderer
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

  // 1. Lighting System (Matches Buddy Reference)
  const hemiLight = new THREE.HemisphereLight(0xfff4d0, 0x3a4a7a, 0.95);
  scene.add(hemiLight);

  const keyLight = new THREE.DirectionalLight(0xffffff, 0.95);
  keyLight.position.set(3, 5, 4);
  scene.add(keyLight);

  const rimLight = new THREE.DirectionalLight(0x2dd4bf, 0.65);
  rimLight.position.set(-4, 2, -3);
  scene.add(rimLight);

  // 2. Buddy Materials
  const yellow = new THREE.MeshStandardMaterial({
    color: 0xffc93c,
    roughness: 0.35,
    metalness: 0.05,
  });

  const yellow2 = new THREE.MeshStandardMaterial({
    color: 0xffe27a,
    roughness: 0.4,
  });

  const metal = new THREE.MeshStandardMaterial({
    color: 0xcfd6e4,
    roughness: 0.2,
    metalness: 0.9,
  });

  const screen = new THREE.MeshStandardMaterial({
    color: 0x10172e,
    roughness: 0.15,
    metalness: 0.3,
  });

  const glow = new THREE.MeshStandardMaterial({
    color: 0x2dd4bf,
    emissive: 0x2dd4bf,
    emissiveIntensity: 0.9,
  });

  const pink = new THREE.MeshStandardMaterial({
    color: 0xff8fa3,
    emissive: 0xff6f8a,
    emissiveIntensity: 0.35,
  });

  const white = new THREE.MeshStandardMaterial({
    color: 0xeafffb,
    emissive: 0xaaf5ea,
    emissiveIntensity: 0.7,
    roughness: 0.2,
  });

  const dark = new THREE.MeshBasicMaterial({ color: 0x0b1230 });
  const shineM = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const redM = new THREE.MeshBasicMaterial({ color: 0xff4f6d });
  const tongueM = new THREE.MeshBasicMaterial({ color: 0xff9fb0 });

  // Extruded Heart Geometry for 'love' expression
  const hs = new THREE.Shape();
  hs.moveTo(0, -0.1);
  hs.bezierCurveTo(-0.2, 0.02, -0.12, 0.18, 0, 0.08);
  hs.bezierCurveTo(0.12, 0.18, 0.2, 0.02, 0, -0.1);
  const heartG = new THREE.ExtrudeGeometry(hs, { depth: 0.03, bevelEnabled: false });

  // 3. Buddy Hierarchy
  const bot = new THREE.Group();
  scene.add(bot);

  function addMesh(geo, mat, x, y, z, parent) {
    const obj = new THREE.Mesh(geo, mat);
    obj.position.set(x, y, z);
    (parent || bot).add(obj);
    return obj;
  }

  // A. Torso Body
  const body = addMesh(new THREE.SphereGeometry(0.72, 48, 32), yellow, 0, 0.3, 0);
  body.scale.set(1, 0.95, 0.95);

  // B. Head Group
  const head = new THREE.Group();
  head.position.y = 1.45;
  bot.add(head);

  // Yellow spherical helmet
  addMesh(new THREE.SphereGeometry(0.95, 56, 40), yellow, 0, 0, 0, head);

  // Glossy dark curved visor screen
  const face = addMesh(new THREE.SphereGeometry(0.7, 48, 32), screen, 0, -0.02, 0.7, head);
  face.scale.set(1.05, 0.78, 0.45);

  // C. Expressive Eyes Setup (White Sclera + Movable Dark Pupil + Reflections + Arc + Heart)
  let browT = 0;
  let eyeS = 1;
  let eyeT = 1;
  let lookX = 0;
  let lookY = 0;

  function makeEye(x) {
    const g = new THREE.Group();
    g.position.set(x, 0.1, 0.97);
    head.add(g);

    const o = {};
    o.open = new THREE.Group();
    g.add(o.open);

    const ball = new THREE.Mesh(new THREE.SphereGeometry(0.15, 28, 20), white);
    ball.scale.set(1, 1.25, 0.35);
    o.open.add(ball);

    o.pupil = new THREE.Mesh(new THREE.SphereGeometry(0.085, 20, 16), dark);
    o.pupil.position.z = 0.04;
    o.pupil.scale.set(1, 1.1, 0.5);
    o.open.add(o.pupil);

    // Cute eye catchlights (highlights)
    const s1 = new THREE.Mesh(new THREE.SphereGeometry(0.03, 12, 10), shineM);
    s1.position.set(0.035, 0.04, 0.1);
    o.pupil.add(s1);

    const s2 = new THREE.Mesh(new THREE.SphereGeometry(0.014, 10, 8), shineM);
    s2.position.set(-0.03, -0.035, 0.1);
    o.pupil.add(s2);

    // Glowing arc for joy / wink
    o.arc = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.035, 10, 28, Math.PI), glow);
    o.arc.position.y = -0.04;
    g.add(o.arc);

    // Glowing pink heart for love
    o.heart = new THREE.Mesh(heartG, pink);
    o.heart.position.z = 0.03;
    g.add(o.heart);

    return o;
  }

  const eL = makeEye(-0.3);
  const eR = makeEye(0.3);

  // Glowing teal eyebrows
  function makeBrow(s) {
    const b = new THREE.Mesh(new THREE.TorusGeometry(0.13, 0.022, 8, 20, Math.PI * 0.6), glow);
    b.position.set(s * 0.3, 0.34, 0.95);
    b.rotation.z = s * 0.2 * Math.PI;
    head.add(b);
    return b;
  }
  const browL = makeBrow(-1);
  const browR = makeBrow(1);

  // Mouths: Smile arc, Mouth open with tongue, and Mouth 'O'
  const smile = addMesh(new THREE.TorusGeometry(0.17, 0.03, 10, 28, Math.PI), glow, 0, -0.12, 1.0, head);
  smile.rotation.z = Math.PI;

  const mouthOpen = new THREE.Group();
  mouthOpen.position.set(0, -0.1, 1.03);
  head.add(mouthOpen);
  mouthOpen.add(new THREE.Mesh(new THREE.CircleGeometry(0.19, 32, Math.PI, Math.PI), redM));
  const tg = new THREE.Mesh(new THREE.CircleGeometry(0.06, 20), tongueM);
  tg.position.set(0, -0.125, 0.002);
  mouthOpen.add(tg);

  const mouthO = new THREE.Mesh(new THREE.CircleGeometry(0.07, 24), redM);
  mouthO.position.set(0, -0.14, 1.03);
  head.add(mouthO);

  // Glowing pink blush cheeks
  const cheekL = addMesh(new THREE.CircleGeometry(0.085, 24), pink, -0.5, -0.08, 0.95, head);
  cheekL.rotation.y = -0.5;

  const cheekR = addMesh(new THREE.CircleGeometry(0.085, 24), pink, 0.5, -0.08, 0.95, head);
  cheekR.rotation.y = 0.5;

  // Expression controller
  function setExpr(name) {
    const e = { L: 'open', R: 'open', m: 'smile', b: 0 };
    eyeT = 1;

    if (name === 'joy') {
      e.L = e.R = 'arc';
      e.m = 'open';
      e.b = 0.1;
    } else if (name === 'wink') {
      e.R = 'arc';
      e.m = 'open';
      e.b = 0.04;
    } else if (name === 'love') {
      e.L = e.R = 'heart';
      e.m = 'open';
    } else if (name === 'wow') {
      e.m = 'o';
      e.b = 0.2;
      eyeT = 1.25;
    }

    [[eL, e.L], [eR, e.R]].forEach(([eyeObj, state]) => {
      eyeObj.open.visible = state === 'open';
      eyeObj.arc.visible = state === 'arc';
      eyeObj.heart.visible = state === 'heart';
    });

    smile.visible = e.m === 'smile';
    mouthOpen.visible = e.m === 'open';
    mouthO.visible = e.m === 'o';
    browT = e.b;
  }

  setExpr('happy');

  // D. Ear Discs & Antenna
  [-1, 1].forEach((s) => {
    const e = addMesh(new THREE.CylinderGeometry(0.2, 0.2, 0.16, 32), metal, s * 0.96, 0, 0, head);
    e.rotation.z = Math.PI / 2;
    const gInner = addMesh(new THREE.CylinderGeometry(0.1, 0.1, 0.18, 24), glow, s * 0.98, 0, 0, head);
    gInner.rotation.z = Math.PI / 2;
  });

  // Antenna stalk and glowing bulb
  addMesh(new THREE.CylinderGeometry(0.025, 0.025, 0.4, 12), metal, 0, 1.1, 0, head);
  const bulb = addMesh(new THREE.SphereGeometry(0.1, 24, 20), glow, 0, 1.34, 0, head);

  // E. Chest Badge (Silver ring + Amber Octahedron Diamond)
  addMesh(new THREE.TorusGeometry(0.19, 0.045, 16, 40), metal, 0, 0.35, 0.68, bot);
  const dia = addMesh(
    new THREE.OctahedronGeometry(0.1),
    new THREE.MeshStandardMaterial({
      color: 0xff9f1c,
      emissive: 0xff9f1c,
      emissiveIntensity: 0.6,
    }),
    0, 0.35, 0.68, bot
  );
  dia.scale.set(0.8, 1.2, 0.4);

  // F. Floating Arms
  function createArm(s) {
    const armGroup = new THREE.Group();
    armGroup.position.set(s * 1.05, 0.45, 0);
    bot.add(armGroup);

    addMesh(new THREE.CylinderGeometry(0.1, 0.1, 0.42, 20), metal, 0, 0, 0, armGroup);
    addMesh(new THREE.SphereGeometry(0.16, 24, 20), yellow, 0, -0.3, 0, armGroup);
    armGroup.rotation.z = -s * 0.45;
    return armGroup;
  }

  const armL = createArm(-1);
  const armR = createArm(1);

  // G. Feet
  [-0.32, 0.32].forEach((x) => {
    addMesh(new THREE.CylinderGeometry(0.2, 0.26, 0.2, 28), yellow2, x, -0.62, 0.06);
    addMesh(new THREE.CylinderGeometry(0.22, 0.28, 0.05, 28), metal, x, -0.74, 0.06);
  });

  // H. Soft Ground Shadow
  const shadowCanvas = document.createElement('canvas');
  shadowCanvas.width = shadowCanvas.height = 128;
  const shadowCtx = shadowCanvas.getContext('2d');
  const grad = shadowCtx.createRadialGradient(64, 64, 4, 64, 64, 62);
  grad.addColorStop(0, 'rgba(0, 0, 0, 0.38)');
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  shadowCtx.fillStyle = grad;
  shadowCtx.fillRect(0, 0, 128, 128);

  const shadowMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(2.6, 2.6),
    new THREE.MeshBasicMaterial({
      map: new THREE.CanvasTexture(shadowCanvas),
      transparent: true,
      depthWrite: false,
    })
  );
  shadowMesh.rotation.x = -Math.PI / 2;
  shadowMesh.position.y = -1.05;
  scene.add(shadowMesh);

  // ===========================================================================
  // INTERACTION & CURSOR PUPIL TRACKING
  // ===========================================================================
  let mouseTargetX = 0;
  let mouseTargetY = 0;

  const updatePointer = (clientX, clientY) => {
    const rect = container.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    mouseTargetX = Math.max(-1.5, Math.min(1.5, (clientX - cx) / (rect.width * 0.5)));
    mouseTargetY = Math.max(-1.5, Math.min(1.5, (clientY - cy) / (rect.height * 0.5)));
  };

  window.addEventListener('mousemove', (e) => updatePointer(e.clientX, e.clientY));
  window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) updatePointer(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: true });

  container.addEventListener('mouseleave', () => {
    mouseTargetX = 0;
    mouseTargetY = 0;
  });

  // ===========================================================================
  // CELEBRATION & ACTIONS
  // ===========================================================================
  let isCatching = false;
  let catchTimer = 0;
  let botBounce = 0;

  let isSpinning = false;
  let spinAngle = 0;

  const celebratoryExpressions = ['joy', 'love', 'wink'];
  let exprIndex = 0;

  triggerBuddyCatchAnim = (targetNormX, targetNormY) => {
    isCatching = true;
    catchTimer = 0;
    botBounce = 0.38; // Cheerful upward jump

    // Rotate through happy expressions
    const chosenExpr = celebratoryExpressions[exprIndex % celebratoryExpressions.length];
    exprIndex++;
    setExpr(chosenExpr);

    // Direct head slightly toward caught orb
    mouseTargetX = targetNormX || 0;
    mouseTargetY = targetNormY || -0.4;
  };

  triggerBuddySpin = () => {
    isSpinning = true;
    spinAngle = 0;
    setExpr('wow');
    playCheerfulChime();
    speakCheerfulMessage("Hi! I'm Buddy, Abhijay's portfolio robot! Let's explore!");

    setTimeout(() => {
      setExpr('happy');
    }, 2000);
  };

  container.addEventListener('click', (e) => {
    if (!e.target.closest('.falling-skill-orb')) {
      triggerBuddySpin();
    }
  });

  // ===========================================================================
  // MAIN ANIMATION LOOP
  // ===========================================================================
  const clock = new THREE.Clock();
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function renderLoop() {
    requestAnimationFrame(renderLoop);

    const delta = clock.getDelta();
    const t = clock.getElapsedTime();

    // Smooth cursor interpolation
    lookX += (mouseTargetX - lookX) * 0.1;
    lookY += (mouseTargetY - lookY) * 0.1;

    // Organic hover floating
    if (!prefersReducedMotion) {
      bot.position.y = Math.sin(t * 2) * 0.08 + botBounce;
      bot.position.x = lookX * 0.15;
      head.rotation.y = lookX * 0.45;
      head.rotation.x = -lookY * 0.25;
      head.rotation.z = Math.sin(t * 1.5) * 0.04;

      // Antenna bulb pulsing glow
      bulb.material.emissiveIntensity = 0.7 + 0.4 * Math.sin(t * 4);

      // Cheeks pulsing
      cheekL.scale.setScalar(1 + 0.08 * Math.sin(t * 3));
      cheekR.scale.setScalar(cheekL.scale.x);

      // Heart eye pulsing (when love expression is on)
      eL.heart.scale.setScalar(1.5 + 0.12 * Math.sin(t * 6));
      eR.heart.scale.setScalar(eL.heart.scale.x);

      // Eyebrows height interpolation
      browL.position.y += (0.34 + browT - browL.position.y) * 0.12;
      browR.position.y = browL.position.y;

      // Natural eye blinking (every ~4s)
      const blink = (t % 4) < 0.12 ? 0.15 : 1;
      eyeS += (eyeT - eyeS) * 0.2;

      // Smooth pupil tracking of cursor!
      [eL, eR].forEach((e) => {
        e.open.scale.set(eyeS, eyeS * blink, 1);
        e.pupil.position.x += (lookX * 0.05 - e.pupil.position.x) * 0.15;
        e.pupil.position.y += (-lookY * 0.05 - e.pupil.position.y) * 0.15;
      });

      // Catch celebration animation
      if (isCatching) {
        catchTimer += delta;
        botBounce = Math.max(0, botBounce - delta * 0.55);

        // Raise arms high in joyful wave
        armL.rotation.z = THREE.MathUtils.lerp(armL.rotation.z, 1.35, 0.15);
        armR.rotation.z = THREE.MathUtils.lerp(armR.rotation.z, -1.35, 0.15);

        if (catchTimer >= 2.0) {
          isCatching = false;
          setExpr('happy');
        }
      } else {
        botBounce = 0;
        // Idle organic arm sway
        armR.rotation.z = -0.45 - 0.45 * Math.max(0, Math.sin(t * 3));
        armL.rotation.z = 0.45 + Math.sin(t * 2) * 0.06;
      }

      // 360 Spin on click
      if (isSpinning) {
        spinAngle += delta * 7.5;
        bot.rotation.y = spinAngle;
        if (spinAngle >= Math.PI * 2) {
          isSpinning = false;
          bot.rotation.y = 0;
        }
      }
    }

    renderer.render(scene, cam);
  }

  requestAnimationFrame(renderLoop);

  // Resize handler
  const handleResize = () => {
    if (!container) return;
    const w = container.clientWidth || 480;
    const h = container.clientHeight || 420;
    cam.aspect = w / h;
    cam.updateProjectionMatrix();
    renderer.setSize(w, h);
  };

  window.addEventListener('resize', handleResize);

  // Mount Falling Skills Mini-Game & Status Bar
  setupFallingSkillsMiniGame(container);
  setupRobotStatusBar();
}

// =============================================================================
// FALLING SKILLS MINI-GAME & INSTANT SINGLE-CLICK CATCH MECHANIC
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
  let fallingLayer = container.querySelector('#falling-skills-layer');
  if (fallingLayer) fallingLayer.remove();

  fallingLayer = document.createElement('div');
  fallingLayer.id = 'falling-skills-layer';
  fallingLayer.className = 'falling-skills-container';
  container.appendChild(fallingLayer);

  let isPageVisible = true;
  document.addEventListener('visibilitychange', () => {
    isPageVisible = !document.hidden;
  });

  let skillIndex = 0;

  function spawnFallingSkill() {
    if (!isPageVisible || !container) return;

    const skill = skillsCatalog[skillIndex % skillsCatalog.length];
    skillIndex++;

    const orb = document.createElement('div');
    orb.className = 'falling-skill-orb';

    const startXPercent = 14 + Math.random() * 68;
    orb.style.left = `${startXPercent}%`;
    orb.style.top = '-55px';

    const logoSvg = techLogos[skill.key] || '<svg width="24" height="24"><circle cx="12" cy="12" r="10" fill="#f59e0b"/></svg>';
    orb.innerHTML = `
      ${logoSvg}
      <span class="falling-skill-tooltip">${skill.name}</span>
    `;

    fallingLayer.appendChild(orb);

    let posY = -55;
    const speed = 1.1 + Math.random() * 0.7;
    let animId = null;

    function dropStep() {
      posY += speed;
      orb.style.top = `${posY}px`;

      const maxH = container.clientHeight || 420;
      if (posY > maxH + 45) {
        cancelAnimationFrame(animId);
        orb.remove();
      } else {
        animId = requestAnimationFrame(dropStep);
      }
    }

    animId = requestAnimationFrame(dropStep);

    // =========================================================================
    // INSTANT SINGLE-CLICK / TOUCH CATCH HANDLER
    // =========================================================================
    let caught = false;
    const handleCatch = (e) => {
      if (caught) return;
      caught = true;

      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }

      cancelAnimationFrame(animId);

      const orbRect = orb.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const relX = orbRect.left - containerRect.left + orbRect.width / 2;
      const relY = orbRect.top - containerRect.top + orbRect.height / 2;

      // Normalized coordinates for Buddy to look toward
      const normX = ((relX / containerRect.width) - 0.5) * 2;
      const normY = ((relY / containerRect.height) - 0.5) * 2;

      // 1. Buddy Catch Jump Animation & Joy/Love/Wink Expression
      triggerBuddyCatchAnim(normX, normY);

      // 2. Play Cheerful Synthesized Chime (C5 -> E5 -> G5 -> C6)
      playCheerfulChime();

      // 3. Burst Particle FX
      spawnBurstParticles(fallingLayer, relX, relY);

      // 4. Floating "Skill Acquired" Toast
      spawnSkillAcquiredToast(fallingLayer, relX, relY, skill.name);

      // 5. Update Acquired Skills Counter
      acquiredSkillsSet.add(skill.key);
      updateScorePill();

      // 6. Update Status Bar below canvas with Cheerful Praise & Voice
      updateCheerfulSpeech(skill);

      // Remove orb immediately
      orb.remove();
    };

    orb.addEventListener('pointerdown', handleCatch);
    orb.addEventListener('touchstart', handleCatch, { passive: false });
    orb.addEventListener('click', handleCatch);
  }

  // Periodic spawn loop
  setInterval(spawnFallingSkill, 2100);
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
  const colors = ['#f59e0b', '#fbbf24', '#2dd4bf', '#ffffff', '#22c55e', '#ff8fa3'];
  for (let i = 0; i < 16; i++) {
    const spark = document.createElement('div');
    spark.className = 'skill-burst-spark';
    spark.style.left = `${x}px`;
    spark.style.top = `${y}px`;
    spark.style.background = colors[i % colors.length];

    const angle = (i / 16) * Math.PI * 2 + Math.random() * 0.4;
    const dist = 36 + Math.random() * 44;
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
  const statusText = document.getElementById('robot-speech-text');
  if (statusText) {
    statusText.style.opacity = '0';
    setTimeout(() => {
      statusText.innerHTML = `Yay! 🎉 <strong>Skill Acquired: ${skill.name}!</strong> ${skill.phrase} ⭐`;
      statusText.style.opacity = '1';
    }, 90);
  }

  // Cheerful voice output
  speakCheerfulMessage(`Yay! Skill acquired: ${skill.name}! ${skill.phrase}`);
}

// =============================================================================
// STATUS BAR INTERACTION (Positioned Below Canvas)
// =============================================================================
function setupRobotStatusBar() {
  const statusBar = document.getElementById('robot-status-bar');
  if (!statusBar) return;

  const voiceBtn = statusBar.querySelector('#robot-voice-btn');
  if (voiceBtn) {
    voiceBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      playCheerfulChime();
      const text = document.getElementById('robot-speech-text')?.textContent || "Hi! I'm Buddy! Click falling skill logos to catch & acquire them with me!";
      speakCheerfulMessage(text);
    });
  }

  statusBar.addEventListener('click', (e) => {
    if (e.target.closest('#robot-voice-btn')) return;
    triggerBuddySpin();
  });
}
