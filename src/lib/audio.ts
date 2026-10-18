// Pure Web Audio API & Speech Synthesizer - 0kb assets, instant, offline-ready
let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playAnimeSound(type: 'click' | 'open' | 'close' | 'blip' | 'levelup' | 'burst') {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    if (type === 'click') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(1400, now + 0.04);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.04);
    } else if (type === 'open') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.12);
    } else if (type === 'levelup') {
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.06);
        gain.gain.setValueAtTime(0.05, now + i * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.06);
        osc.stop(now + i * 0.06 + 0.08);
      });
    } else if (type === 'blip') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, now);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.03);
    }
  } catch (e) {
    // Fail silently if browser audio is blocked
  }
}

// 1. Rasengan Chakra Charging Sound (High-frequency vortex whir)
export function playRasenganCharge() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(1600, now + 1.2);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.12, now + 1.0);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.3);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 1.3);
  } catch (e) {}
}

// 2. Rasengan Energy Blast / Impact Explosion
export function playRasenganBlast() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Sub-bass impact thud
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(140, now);
    subOsc.frequency.exponentialRampToValueAtTime(35, now + 0.6);

    subGain.gain.setValueAtTime(0.35, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

    subOsc.connect(subGain);
    subGain.connect(ctx.destination);
    subOsc.start(now);
    subOsc.stop(now + 0.6);

    // High frequency energy sizzle
    const highOsc = ctx.createOscillator();
    const highGain = ctx.createGain();
    highOsc.type = 'triangle';
    highOsc.frequency.setValueAtTime(800, now);
    highOsc.frequency.exponentialRampToValueAtTime(120, now + 0.4);

    highGain.gain.setValueAtTime(0.18, now);
    highGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    highOsc.connect(highGain);
    highGain.connect(ctx.destination);
    highOsc.start(now);
    highOsc.stop(now + 0.4);
  } catch (e) {}
}

// 3. The Signature Anime "TINGGGG!" Crystal Chime Sound with long shimmering sustain
export function playAnimeTing() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Fundamental high bell tone (2093 Hz = C7)
    const bell1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    bell1.type = 'sine';
    bell1.frequency.setValueAtTime(2093, now);
    bell1.frequency.exponentialRampToValueAtTime(2150, now + 0.05);

    gain1.gain.setValueAtTime(0.28, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 1.4);

    bell1.connect(gain1);
    gain1.connect(ctx.destination);
    bell1.start(now);
    bell1.stop(now + 1.4);

    // Overtone harmonic (4186 Hz = C8 crystal sparkle)
    const bell2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    bell2.type = 'sine';
    bell2.frequency.setValueAtTime(4186, now);

    gain2.gain.setValueAtTime(0.18, now);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

    bell2.connect(gain2);
    gain2.connect(ctx.destination);
    bell2.start(now);
    bell2.stop(now + 1.2);

    // Shimmer accent (3135 Hz = G7)
    const bell3 = ctx.createOscillator();
    const gain3 = ctx.createGain();
    bell3.type = 'sine';
    bell3.frequency.setValueAtTime(3135, now);

    gain3.gain.setValueAtTime(0.12, now);
    gain3.gain.exponentialRampToValueAtTime(0.001, now + 1.0);

    bell3.connect(gain3);
    gain3.connect(ctx.destination);
    bell3.start(now);
    bell3.stop(now + 1.0);
  } catch (e) {}
}

// 4. Authentic Naruto Voice: "Welcome to my portfolio!"
export function playNarutoVoice(onEnd?: () => void) {
  try {
    if (typeof window !== 'undefined') {
      const narutoAudio = new Audio('/audio/naruto-welcome.mp3');
      narutoAudio.volume = 1.0;
      
      narutoAudio.onended = () => {
        if (onEnd) onEnd();
      };
      
      narutoAudio.onerror = () => {
        // Fallback to speech synthesis if audio file blocked
        speakWelcomeMessage(onEnd);
      };

      const playPromise = narutoAudio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          speakWelcomeMessage(onEnd);
        });
      }
      return;
    }
  } catch (e) {
    speakWelcomeMessage(onEnd);
  }
}

// Fallback Speech Synthesizer: "Welcome to my portfolio"
export function speakWelcomeMessage(onEnd?: () => void) {
  try {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      if (onEnd) onEnd();
      return;
    }

    window.speechSynthesis.cancel(); // Stop any pending speech

    const utterance = new SpeechSynthesisUtterance('Welcome to my portfolio');
    utterance.rate = 1.1;
    utterance.pitch = 1.3; // High-energy anime shonen pitch
    utterance.volume = 1.0;

    // Pick young / high voice if available
    const voices = window.speechSynthesis.getVoices();
    const preferred = voices.find(
      (v) => v.lang.startsWith('en') && (v.name.includes('Ana') || v.name.includes('Junior') || v.name.includes('Google') || v.name.includes('Natural'))
    ) || voices.find((v) => v.lang.startsWith('en'));

    if (preferred) utterance.voice = preferred;

    if (onEnd) {
      utterance.onend = onEnd;
      utterance.onerror = onEnd;
    }

    window.speechSynthesis.speak(utterance);
  } catch (e) {
    if (onEnd) onEnd();
  }
}
