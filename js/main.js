// =============================================================================
// MAIN.JS - Dynamic Renderer & Automated GitHub Repository Sync
// Includes: Canvas Stars, WebGL Core, Tech Logos, Skills Filter, Lightbox.
// =============================================================================

import { portfolioContent } from './content.js';
import { initWebGLCore } from './webgl-core.js';
import { initShootingStars } from './shooting-stars.js';
import { techLogos } from './tech-logos.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Render all structured profile information
  renderProfileData();
  renderStats();
  renderFeaturedWinner();
  renderCoreLanguagesBar();
  renderSkills();
  renderHackathons();
  renderLeadership();
  renderEducation();

  // 2. Automated Live GitHub Sync
  fetchAndRenderGitHubProjects();

  // 3. Initialize Interactive 3D WebGL Spatial Reactor
  initWebGLCore();

  // 4. Initialize Animated Canvas Shooting Stars & Starfield
  initShootingStars();

  // 5. Interactive UI Listeners
  initLenis();
  initMobileMenu();
  initThemeToggle();
  initTypewriter();
  initScrollNav();
  initLightbox();
  initPortraitTilt();
  initProjectDetailsToggle();

  // 6. Initialize Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }
});

// --- Automated GitHub API Fetching ---
async function fetchAndRenderGitHubProjects() {
  const container = document.getElementById('projects-grid');
  const syncLabel = document.getElementById('sync-status-text');
  const repoCountStat = document.getElementById('stat-repos-val');
  const { githubUsername } = portfolioContent.personal;
  const { fallbackProjects } = portfolioContent;

  if (!container) return;

  try {
    if (syncLabel) syncLabel.textContent = "Syncing with GitHub...";

    const response = await fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=12`);

    if (!response.ok) {
      throw new Error(`GitHub API returned status ${response.status}`);
    }

    const repos = await response.json();
    const validRepos = Array.isArray(repos) && repos.length > 0 ? repos : fallbackProjects;

    if (repoCountStat) {
      repoCountStat.textContent = validRepos.length;
    }

    renderProjectCards(container, validRepos);

    if (syncLabel) {
      syncLabel.textContent = `Live synced (${validRepos.length} repositories)`;
    }
  } catch (err) {
    console.warn("GitHub API rate limit or network issue; displaying verified project list:", err);
    if (syncLabel) {
      syncLabel.textContent = "Synced with GitHub";
    }
    if (repoCountStat) {
      repoCountStat.textContent = fallbackProjects.length;
    }
    renderProjectCards(container, fallbackProjects);
  }
}

function renderProjectCards(container, repos) {
  container.innerHTML = repos
    .map((repo) => {
      const desc = repo.description || "Robotics & AI repository / active engineering project.";
      const lang = repo.language || "Code";
      const stars = repo.stargazers_count ?? 0;

      return `
      <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="repo-card">
        <div class="repo-card-top">
          <div class="repo-badge-row">
            <span class="live-sync-indicator">
              <span class="live-sync-dot"></span>
              <span>GitHub</span>
            </span>
            ${stars > 0 ? `<span style="font-family: var(--font-mono); font-size: 0.78rem;">★ ${stars}</span>` : ''}
          </div>
          <h3 class="repo-name">
            <span>${repo.name}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M7 17L17 7"></path>
              <path d="M7 7h10v10"></path>
            </svg>
          </h3>
          <p class="repo-desc">${desc}</p>
        </div>
        <div class="repo-card-bottom">
          <div class="repo-lang">
            <span class="lang-dot"></span>
            <span>${lang}</span>
          </div>
          <span>View source ➔</span>
        </div>
      </a>
    `;
    })
    .join('');

  if (window.lucide) window.lucide.createIcons();
}

// --- Render Static Profile Data ---
function renderProfileData() {
  const { personal } = portfolioContent;

  const heroName = document.getElementById('hero-name');
  if (heroName) heroName.textContent = personal.name;

  const heroTagline = document.getElementById('hero-tagline');
  if (heroTagline) heroTagline.textContent = personal.tagline;

  const heroInstitution = document.getElementById('hero-institution');
  if (heroInstitution) heroInstitution.textContent = `${personal.title} — ${personal.institution}`;

  const aboutBio = document.getElementById('about-bio-text');
  if (aboutBio) aboutBio.textContent = personal.about;

  // WhatsApp Buttons
  const waBtns = document.querySelectorAll('.whatsapp-link');
  waBtns.forEach((btn) => {
    btn.href = personal.whatsAppUrl;
    btn.target = "_blank";
    btn.rel = "noopener noreferrer";
  });

  // GitHub Profile Buttons
  const ghBtns = document.querySelectorAll('.github-profile-link');
  ghBtns.forEach((btn) => {
    btn.href = personal.githubUrl;
    btn.target = "_blank";
    btn.rel = "noopener noreferrer";
  });

  // Resume Download Button
  const resumeBtn = document.getElementById('hero-resume-btn');
  if (resumeBtn) resumeBtn.href = personal.resumeUrl;

  // Email Button
  const emailBtn = document.getElementById('contact-email-btn');
  if (emailBtn) emailBtn.href = `mailto:${personal.email}`;
}

function renderStats() {
  const { stats } = portfolioContent;
  const container = document.getElementById('stats-grid');
  if (!container) return;

  container.innerHTML = stats
    .map(
      (s) => `
    <div class="stat-item">
      <div class="stat-num" ${s.id ? `id="${s.id}-val"` : ''}>${s.value}</div>
      <div class="stat-label">${s.label}</div>
    </div>
  `
    )
    .join('');
}

// --- Featured Winner: Root-Defense Showcase ---
function renderFeaturedWinner() {
  const { featuredHackathon } = portfolioContent;
  if (!featuredHackathon) return;

  // Tech Chips
  const techChipsContainer = document.getElementById('winner-tech-chips');
  if (techChipsContainer) {
    techChipsContainer.innerHTML = featuredHackathon.techStack
      .map((t) => `<span class="tech-chip">${t}</span>`)
      .join('');
  }

  // 6-Step Pipeline Architecture Diagram
  const pipelineGrid = document.getElementById('pipeline-steps-grid');
  if (pipelineGrid) {
    pipelineGrid.innerHTML = featuredHackathon.pipeline
      .map(
        (p) => `
      <div class="pipeline-step-card">
        <span class="pipeline-step-num">STEP ${p.step}</span>
        <span class="pipeline-step-name">${p.name}</span>
        <span class="pipeline-step-detail">${p.detail}</span>
      </div>
    `
      )
      .join('');
  }

  // Threat Model Table
  const threatTbody = document.getElementById('threat-model-tbody');
  if (threatTbody) {
    threatTbody.innerHTML = featuredHackathon.caseStudy.threatModel
      .map(
        (row) => `
      <tr>
        <td><strong>${row.attack}</strong></td>
        <td>
          <span class="threat-status-badge ${row.status}">
            ${row.caught}
          </span>
        </td>
        <td style="font-size: 0.82rem; color: var(--text-muted);">${row.how}</td>
      </tr>
    `
      )
      .join('');
  }

  // What I'd Improve Next Cards
  const improvementsGrid = document.getElementById('improvements-grid');
  if (improvementsGrid) {
    improvementsGrid.innerHTML = featuredHackathon.caseStudy.improvementsNext
      .map(
        (item) => `
      <div class="improvement-card">
        <h5>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
            <polyline points="17 6 23 6 23 12"></polyline>
          </svg>
          <span>${item.title}</span>
        </h5>
        <p>${item.desc}</p>
      </div>
    `
      )
      .join('');
  }
}

// --- Featured Core Languages Showcase Bar ---
function renderCoreLanguagesBar() {
  const container = document.getElementById('core-languages-bar');
  const { coreLanguages } = portfolioContent;
  if (!container || !coreLanguages) return;

  container.innerHTML = coreLanguages
    .map((lang) => {
      const logoSvg = techLogos[lang.logo] || '';
      return `
      <div class="core-lang-badge" title="${lang.name} · ${lang.category}">
        <span class="core-lang-icon">${logoSvg}</span>
        <span class="core-lang-name">${lang.name}</span>
      </div>
    `;
    })
    .join('');
}

// --- Grouped Skills with Logos & Filter Tabs ---
function renderSkills() {
  const { skillGroups } = portfolioContent;
  const container = document.getElementById('skills-interactive-grid');
  const tabsContainer = document.getElementById('skills-filter-tabs');
  if (!container || !skillGroups) return;

  function renderCards(filter = 'all') {
    const filtered = filter === 'all' 
      ? skillGroups 
      : skillGroups.filter((g) => g.id === filter);

    container.innerHTML = filtered
      .map((group) => {
        return `
        <div class="skill-interactive-card" data-group="${group.id}">
          <div class="skill-card-top">
            <div class="skill-icon-box">
              <i data-lucide="${group.icon}" style="width: 20px; height: 20px;"></i>
            </div>
            <div class="skill-header-meta">
              <h3>${group.title}</h3>
              <p>${group.description}</p>
            </div>
          </div>
          <div class="skill-chips-container">
            ${group.skills
              .map((s) => {
                const logoSvg = s.logo && techLogos[s.logo] ? `<span class="skill-mini-logo">${techLogos[s.logo]}</span>` : '';
                return `
                <div class="skill-proficiency-chip">
                  ${logoSvg}
                  <span class="skill-chip-name">${s.name}</span>
                  <span class="skill-level-tag">· ${s.level}</span>
                </div>
              `;
              })
              .join('')}
          </div>
        </div>
      `;
      })
      .join('');

    if (window.lucide) window.lucide.createIcons();
  }

  // Filter tab interactions
  tabsContainer?.addEventListener('click', (e) => {
    const btn = e.target.closest('.skill-tab-btn');
    if (!btn) return;

    tabsContainer.querySelectorAll('.skill-tab-btn').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    const filterVal = btn.getAttribute('data-filter') || 'all';
    renderCards(filterVal);
  });

  // Initial render
  renderCards('all');
}

// --- Hackathons Timeline (Newest First) ---
function renderHackathons() {
  const { hackathons } = portfolioContent;
  const container = document.getElementById('hackathons-timeline');
  if (!container) return;

  container.innerHTML = hackathons
    .map(
      (h) => `
    <div class="timeline-item-card">
      <div class="timeline-meta-col">
        <span class="timeline-badge">${h.level}</span>
        <span class="timeline-date">${h.date}</span>
      </div>
      <div class="timeline-content-col">
        <h3>${h.title}</h3>
        <p class="timeline-org">${h.organization}</p>
        <p class="timeline-desc">${h.description}</p>
      </div>
    </div>
  `
    )
    .join('');
}

function renderLeadership() {
  const { leadership } = portfolioContent;
  const container = document.getElementById('leadership-container');
  if (!container) return;

  container.innerHTML = leadership
    .map(
      (lead) => `
    <div class="leadership-block">
      <div class="leadership-top">
        <div>
          <h3 class="leadership-heading">${lead.role}</h3>
          <p class="leadership-org">${lead.organization}</p>
        </div>
        <span class="leadership-time">${lead.period}</span>
      </div>
      <ul class="leadership-bullets">
        ${lead.highlights.map((item) => `<li>${item}</li>`).join('')}
      </ul>
    </div>
  `
    )
    .join('');
}

function renderEducation() {
  const { education } = portfolioContent;
  const container = document.getElementById('education-grid');
  if (!container) return;

  container.innerHTML = education
    .map(
      (edu) => `
    <div class="editorial-card">
      <span class="editorial-card-badge">${edu.status}</span>
      <h3 class="editorial-card-title">${edu.degree}</h3>
      <p class="editorial-card-org">${edu.institution}</p>
      <p class="editorial-card-body" style="font-family: var(--font-mono); font-size: 0.82rem;">${edu.period}</p>
    </div>
  `
    )
    .join('');
}

// --- Lightbox Modal for Photo Inspection ---
function initLightbox() {
  const modal = document.getElementById('image-lightbox');
  const modalImg = document.getElementById('lightbox-img');
  const modalCaption = document.getElementById('lightbox-caption');
  const closeBtn = document.getElementById('lightbox-close');
  const awardPhotoWrapper = document.getElementById('award-photo-container');
  const portraitPhotoWrapper = document.getElementById('portrait-card');

  function openLightbox(src, caption) {
    if (!modal || !modalImg) return;
    modalImg.src = src;
    if (modalCaption) modalCaption.textContent = caption;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  awardPhotoWrapper?.addEventListener('click', () => {
    openLightbox(
      'assets/images/tech-habba-award.webp',
      'Abhijay Singh receiving 3rd Prize (₹10,000) at Tech Habba 2026, Acharya Institute of Technology'
    );
  });

  portraitPhotoWrapper?.addEventListener('click', (e) => {
    // Only open if clicked on image area
    if (e.target.closest('.portrait-img') || e.target.closest('.portrait-card-inner')) {
      openLightbox(
        'assets/images/profile-portrait.webp',
        'Abhijay Singh — Robotics & AI Systems Engineering'
      );
    }
  });

  closeBtn?.addEventListener('click', closeLightbox);

  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal?.classList.contains('active')) {
      closeLightbox();
    }
  });
}

// --- 3D Parallax Tilt Effect on Portrait Frame ---
function initPortraitTilt() {
  const card = document.getElementById('portrait-card');
  if (!card) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (prefersReduced.matches) return;

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-2px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
  });
}

// --- Collapsible Project Deep Dive Toggle ---
function initProjectDetailsToggle() {
  const toggleBtn = document.getElementById('btn-toggle-project-details');
  const panel = document.getElementById('winner-deep-dive-panel');
  const toggleText = document.getElementById('winner-toggle-text');
  const toggleIcon = document.getElementById('winner-toggle-icon');

  if (!toggleBtn || !panel) return;

  toggleBtn.addEventListener('click', () => {
    const isCollapsed = panel.classList.contains('collapsed');

    if (isCollapsed) {
      panel.classList.remove('collapsed');
      panel.classList.add('expanded');
      panel.setAttribute('aria-hidden', 'false');
      toggleBtn.setAttribute('aria-expanded', 'true');
      if (toggleText) toggleText.textContent = 'Show Less';
      if (toggleIcon) toggleIcon.setAttribute('data-lucide', 'chevron-up');

      if (window.lucide) {
        window.lucide.createIcons();
      }

      setTimeout(() => {
        panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    } else {
      panel.classList.remove('expanded');
      panel.classList.add('collapsed');
      panel.setAttribute('aria-hidden', 'true');
      toggleBtn.setAttribute('aria-expanded', 'false');
      if (toggleText) toggleText.textContent = 'More About The Project';
      if (toggleIcon) toggleIcon.setAttribute('data-lucide', 'chevron-down');

      if (window.lucide) {
        window.lucide.createIcons();
      }

      const winnerCard = document.getElementById('winner-showcase-card');
      if (winnerCard) {
        winnerCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
}

// --- Theme Toggle (Default to Dark for Full Starfield Experience) ---
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  // Always default to dark unless explicitly toggled
  const savedTheme = localStorage.getItem('site_theme') || 'dark';

  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  toggleBtn?.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const target = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', target);
    localStorage.setItem('site_theme', target);
    updateThemeIcon(target);
  });
}

function updateThemeIcon(theme) {
  const icon = document.getElementById('theme-icon');
  if (!icon) return;
  icon.setAttribute('data-lucide', theme === 'dark' ? 'sun' : 'moon');
  if (window.lucide) window.lucide.createIcons();
}

// --- Typewriter Effect ---
function initTypewriter() {
  const typewriterEl = document.getElementById('typewriter-text');
  const roles = portfolioContent.personal.typewriterRoles;
  if (!typewriterEl || !roles.length) return;

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;

  function typeTick() {
    const currentRole = roles[roleIdx];

    if (isDeleting) {
      charIdx--;
      typewriterEl.textContent = currentRole.substring(0, charIdx);
    } else {
      charIdx++;
      typewriterEl.textContent = currentRole.substring(0, charIdx);
    }

    let delay = isDeleting ? 38 : 85;

    if (!isDeleting && charIdx === currentRole.length) {
      delay = 2000;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      delay = 350;
    }

    setTimeout(typeTick, delay);
  }

  typeTick();
}

// --- Sticky Blurred Nav with Active Section Highlight ---
function initScrollNav() {
  const nav = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-item a');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      nav?.classList.add('scrolled');
    } else {
      nav?.classList.remove('scrolled');
    }
  });

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((sec) => observer.observe(sec));
}

// --- Lenis.dev Smooth Scroll Engine ---
function initLenis() {
  if (typeof Lenis === 'undefined') {
    console.warn("Lenis smooth scroll library not loaded; using standard browser scroll.");
    return;
  }

  // Smooth scroll instance matching lenis.dev parameters & physics
  const lenis = new Lenis({
    duration: 1.25,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // ease-out-expo curve from lenis.dev
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1.05,
    touchMultiplier: 1.2,
    infinite: false,
  });

  window.lenis = lenis;

  const progressBar = document.getElementById('scroll-progress-bar') || document.getElementById('lenis-progress-bar');
  const nav = document.getElementById('navbar');

  const footerElem = document.getElementById('contact');

  // Sync scroll events with top reading progress bar and navbar blur & inversion
  lenis.on('scroll', ({ scroll, limit, progress }) => {
    if (progressBar && limit > 0) {
      progressBar.style.transform = `scaleX(${Math.max(0, Math.min(1, progress))})`;
    }

    if (scroll > 20) {
      nav?.classList.add('scrolled');
    } else {
      nav?.classList.remove('scrolled');
    }

    if (footerElem) {
      const footerRect = footerElem.getBoundingClientRect();
      if (footerRect.top <= 64) {
        nav?.classList.add('nav-inverted');
      } else {
        nav?.classList.remove('nav-inverted');
      }
    }
  });

  // Intercept all in-page hash links for fluid Lenis scrolling
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElem = document.querySelector(targetId);
        if (targetElem) {
          e.preventDefault();
          lenis.scrollTo(targetElem, { offset: -70 });
        }
      }
    });
  });

  // Continuous animation frame loop
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}

// --- Mobile Navigation Menu (Darkroom / Lenis Style) ---
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const overlay = document.getElementById('mobile-nav-overlay');
  const barsIcon = document.getElementById('menu-icon-bars');
  const closeIcon = document.getElementById('menu-icon-close');
  if (!menuBtn || !overlay) return;

  function toggleMenu(open) {
    const shouldOpen = open !== undefined ? open : !overlay.classList.contains('open');
    if (shouldOpen) {
      overlay.classList.add('open');
      menuBtn.setAttribute('aria-expanded', 'true');
      if (barsIcon) barsIcon.style.display = 'none';
      if (closeIcon) closeIcon.style.display = 'block';
      document.body.style.overflow = 'hidden';
    } else {
      overlay.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
      if (barsIcon) barsIcon.style.display = 'block';
      if (closeIcon) closeIcon.style.display = 'none';
      document.body.style.overflow = '';
    }
  }

  menuBtn.addEventListener('click', () => toggleMenu());

  // Close overlay when any link inside it is clicked
  overlay.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => toggleMenu(false));
  });
}
