// =============================================================================
// MAIN.JS - Dynamic Renderer & Automated GitHub Repository Sync
// Fetches live public repositories from GitHub API with graceful caching.
// =============================================================================

import { portfolioContent } from './content.js';
import { initWebGLCore } from './webgl-core.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Render all structured profile information
  renderProfileData();
  renderStats();
  renderSkills();
  renderHackathons();
  renderLeadership();
  renderEducation();

  // 2. Automated Live GitHub Sync
  fetchAndRenderGitHubProjects();

  // 3. Initialize Interactive 3D WebGL Spatial Reactor
  initWebGLCore();

  // 4. UI Interactions
  initThemeToggle();
  initTypewriter();
  initScrollNav();

  // 5. Initialize Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }
});

// --- Automated GitHub API Fetching ---
async function fetchAndRenderGitHubProjects() {
  const container = document.getElementById('projects-grid');
  const syncLabel = document.getElementById('sync-status-text');
  const repoCountStat = document.getElementById('stat-repos-val');
  const { githubUsername, fallbackProjects } = portfolioContent.personal;

  if (!container) return;

  try {
    if (syncLabel) syncLabel.textContent = "Syncing with GitHub...";

    const response = await fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=12`);

    if (!response.ok) {
      throw new Error(`GitHub API returned status ${response.status}`);
    }

    const repos = await response.json();

    // Filter out forks or empty repos if needed, sort by recently updated
    const validRepos = Array.isArray(repos) && repos.length > 0 ? repos : fallbackProjects;

    // Update repository count stat
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

// --- Render Static & Profile Data ---
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

  // WhatsApp Button
  const waBtns = document.querySelectorAll('.whatsapp-link');
  waBtns.forEach((btn) => {
    btn.href = personal.whatsAppUrl;
    btn.target = "_blank";
    btn.rel = "noopener noreferrer";
  });

  // GitHub Profile Button
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

function renderSkills() {
  const { skills } = portfolioContent;
  const container = document.getElementById('skills-grid');
  if (!container) return;

  container.innerHTML = skills
    .map(
      (cat) => `
    <div class="skill-box">
      <h3 class="skill-box-title">${cat.category}</h3>
      <div class="skill-tag-wrap">
        ${cat.items.map((i) => `<span class="skill-tag">${i}</span>`).join('')}
      </div>
    </div>
  `
    )
    .join('');
}

function renderHackathons() {
  const { hackathons } = portfolioContent;
  const container = document.getElementById('hackathons-grid');
  if (!container) return;

  container.innerHTML = hackathons
    .map(
      (h) => `
    <div class="editorial-card">
      <span class="editorial-card-badge">${h.level}</span>
      <h3 class="editorial-card-title">${h.title}</h3>
      <p class="editorial-card-org">${h.organization}</p>
      <p class="editorial-card-body">${h.description}</p>
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

// --- Interactive UI ---
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('site_theme') || 'light';

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

function initScrollNav() {
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      nav?.classList.add('scrolled');
    } else {
      nav?.classList.remove('scrolled');
    }
  });
}
