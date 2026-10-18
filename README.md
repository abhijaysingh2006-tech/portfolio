# Abhijay Singh — Robotics & AI Systems Portfolio

A minimalist, high-performance static developer portfolio built with clean **Vanilla HTML5, CSS3, and JavaScript (ES Modules)**.

---

## ✨ Features
1. **Automated GitHub Repository Sync**:
   - Directly fetches your public repositories from [`https://api.github.com/users/abhijaysingh2006-tech/repos`](https://api.github.com/users/abhijaysingh2006-tech).
   - Any time you push or create a new public repository on GitHub, it automatically populates on your website without editing code.
   - Includes graceful cached fallback items in case of unauthenticated rate limits.
2. **Aesthetically Soothing Monochrome Palette**:
   - Editorial Black & White design with crisp hairline borders and subtle grid textures.
   - Built-in Dark Mode & Light Mode toggle with local preference persistence.
   - High-legibility typography using *Inter* and *JetBrains Mono*.
3. **Verified Information & Integrity**:
   - Zero invented metrics or placeholder statistics.
   - Features Smart India Hackathon (SIH) 2026, ISRO Bharatiya Antariksh Hackathon 2026, and SJCIT Anviya Hackathon.
   - Highlights 1-year tenure as IEEE Student Chairman at VTU Muddenahalli.
   - Direct WhatsApp connect link (`https://wa.me/917004793221`) without raw phone numbers in the text body.
   - Direct links to your GitHub profile: [`https://github.com/abhijaysingh2006-tech`](https://github.com/abhijaysingh2006-tech).

---

## 📁 Architecture

```text
├── index.html       # Clean semantic HTML structure
├── css/
│   └── style.css    # Monochrome aesthetic, typography, dark/light themes
├── js/
│   ├── content.js   # Central profile store (personal info, hackathons, skills)
│   └── main.js      # Automated GitHub API sync, dynamic DOM rendering, theme toggle
├── assets/
│   └── resume.pdf   # Resume document ready for download
└── README.md
```

---

## 🚀 Running Locally

You can preview the site immediately with any local server:

```powershell
# Using Python
python -m http.server 3000

# Or using npx
npx serve .
```

Visit `http://localhost:3000` in your browser.

---

## 🌐 Deploy to Vercel (Instant Zero-Config)

This site is 100% static:
1. Push your changes to your GitHub repository.
2. Go to [Vercel](https://vercel.com/) and click **Add New > Project**.
3. Import your GitHub repository.
4. Leave settings as **Static** and deploy.
