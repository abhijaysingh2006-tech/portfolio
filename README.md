# Abhijay Singh — Robotics, AI & Systems Security Portfolio

A high-performance, responsive developer portfolio built with clean **Vanilla HTML5, CSS3, and JavaScript (ES Modules)** with an interactive **3D WebGL Spatial Core**, **Canvas Shooting Starfield**, and a featured **Tech Habba 2026 Winner Showcase**.

---

## ✨ Key Highlights & Features

1. **🏆 Featured Winner: Root-Defense (Tech Habba 2026)**:
   - **Result**: 3rd Prize Winner (₹10,000 cash award), Team Flute, Acharya Institute of Technology, Bengaluru (21 November 2026).
   - **Architecture**: Tamper-evident security logging anchored on Quai Network (Proof-of-Work EVM).
   - **Interactive 6-Step Ingestion Pipeline**: Log Sources → Agent (hash chain + sign + key ratchet) → Off-host Witness (append-only, 5s heartbeat alarm) → Merkle Batcher → Quai Smart Contract → Auditor Portal (recompute & verify in 1-click).
   - **Threat Model Matrix**: Full breakdown of attack vectors, detection guarantees, and honest security boundaries.
   - **PDF Whitepaper & Deck**: Linked directly in assets (`assets/Root-Defense.pdf`).

2. **🌌 High-Performance Canvas Starfield & Shooting Stars**:
   - Pure vanilla Canvas engine with twinkling stars (white, teal, amber) and realistic diagonal shooting stars with glowing heads and fading tails.
   - Fixed background at `z-index: -1`, `pointer-events: none`.
   - Automatic battery/CPU optimization: pauses during tab backgrounding (`visibilitychange` / `document.hidden`).
   - Accessible: automatically respects `prefers-reduced-motion`.

3. **🪐 Interactive 3D WebGL Spatial Robotics Core**:
   - Three.js gyroscopic reactor with nested titanium/carbon rings, pulsing energy core, and interactive cursor/touch drag physics.
   - Runs smoothly at 60 FPS with responsive viewport scaling.

4. **⚡ Grouped Skills with Interactive Discipline Filter**:
   - Skills categorized into:
     - *Robotics & Embedded AI* (ROS, OpenCV, Embedded Systems, Arduino)
     - *Machine Learning* (Neural Networks, Computer Vision, Geospatial Data)
     - *Security & Cryptography* (Tamper-evident logs, Merkle trees, SHA-256, Ed25519, Key Ratchet)
     - *Blockchain & Decentralized* (Solidity, Quai Network, EVM, Hardhat/Anvil)
     - *Backend & Systems* (Python, Go, Linux auth/syslog, SQLite, PostgreSQL)
     - *Web & Tooling* (HTML5, Modern CSS, ES Modules, Git/GitHub)
   - Interactive category filter tabs for instant responsive sorting.

5. **📸 High-Performance WebP Responsive Photos**:
   - **Portrait**: Refined frame in the Overview section with subtle 3D hover tilt and status badge.
   - **Award Photo**: Integrated inside the Winner Card with a click-to-expand accessible lightbox modal.
   - WebP format with JPEG fallbacks and responsive `srcset` (`400w`, `800w`, `600w`, `1024w`).

6. **🎨 Cohesive Color Grading**:
   - Deep Midnight Black (`#09090b`) for dark mode with subtle glassmorphism.
   - Warm Linen (`#f6f3ec`) for light mode.
   - **Primary Accent**: Root-Defense Teal (`#2dd4bf` / `#14b8a6`) from project deck.
   - **Secondary Accent**: Sunset Amber (`#f59e0b` / `#fb923c`) from natural photo tones.
   - WCAG AA compliant text contrast across both themes.

7. **🔄 Automated Live GitHub Repository Sync**:
   - Fetches live repositories dynamically from [`api.github.com/users/abhijaysingh2006-tech/repos`](https://github.com/abhijaysingh2006-tech).
   - Automatically renders new public repositories with language tags and star counts.
   - Graceful fallback cache if unauthenticated rate limits occur.

---

## 📁 Architecture

```text
├── index.html                  # Semantic, accessible HTML5 structure
├── css/
│   └── style.css               # Cohesive palette, WebGL frame, Winner card, Lightbox
├── js/
│   ├── content.js              # Central verified store (facts, winner deck, skills)
│   ├── main.js                 # GitHub API sync, dynamic DOM rendering, theme & lightbox
│   ├── webgl-core.js           # Interactive Three.js 3D spatial robotics core
│   └── shooting-stars.js       # Canvas starfield & meteor animation engine
├── assets/
│   ├── images/
│   │   ├── profile-portrait.webp       # Optimized portrait (WebP)
│   │   ├── profile-portrait-400.webp   # Responsive mobile width
│   │   ├── profile-portrait-800.webp   # Retina desktop width
│   │   ├── profile-portrait.jpg        # Standard JPEG fallback
│   │   ├── tech-habba-award.webp       # Tech Habba award winning photo (WebP)
│   │   ├── tech-habba-award-600.webp   # Responsive card width
│   │   ├── tech-habba-award-1024.webp  # Full lightbox resolution
│   │   └── tech-habba-award.jpg        # Standard JPEG fallback
│   ├── resume.pdf              # Verified résumé
│   └── Root-Defense.pdf        # Tech Habba 2026 Root-Defense architecture paper
└── README.md
```

---

## 🚀 Running Locally

```powershell
# Using Python
python -m http.server 8080

# Or using npx http-server
npx http-server -p 8080 -c-1
```

Visit `http://localhost:8080` in your browser.
