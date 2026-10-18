// =============================================================================
// CONTENT.JS - Central Data Store for Abhijay Singh's Portfolio
// ALL personal information, verified stats, hackathons, and education live here.
// Live projects are fetched automatically from GitHub (with fallback).
// =============================================================================

export const portfolioContent = {
  // --- Personal & Profile Info ---
  personal: {
    name: "Abhijay Singh",
    shortName: "Abhijay",
    title: "Robotics & Artificial Intelligence Undergraduate",
    institution: "VTU Muddenahalli, Karnataka",
    location: "Bengaluru, India",
    tagline: "Building resilient autonomous systems, machine learning pipelines, and real-world engineering solutions.",
    typewriterRoles: [
      "Robotics & Autonomous Systems",
      "AI / Machine Learning Engineer",
      "SIH Round 1 Selected",
      "Former IEEE Student Chairman"
    ],
    email: "abhijaysingh2006@gmail.com",
    // WhatsApp URL (number kept strictly within the link)
    whatsAppUrl: "https://wa.me/917004793221",
    // Resume document inside assets/
    resumeUrl: "assets/resume.pdf",
    
    // Live GitHub Profile
    githubUsername: "abhijaysingh2006-tech",
    githubUrl: "https://github.com/abhijaysingh2006-tech",
    linkedinUrl: "[TODO url]",
    
    // Minimal, aesthetically pleasing first-person summary
    about: 
      "I am an undergraduate specializing in Robotics and Artificial Intelligence at VTU Muddenahalli. My work bridges physical hardware systems and modern machine learning — from sensor-driven robotics to real-time predictive models. Having cleared Round 1 (Internal College Hackathon) of Smart India Hackathon to get selected, competed in hackathons with ISRO, and served as IEEE Student Chairman, I focus on building reliable, clean, and impactful software architectures."
  },

  // --- Verified Numeric Counters ---
  stats: [
    { label: "Public Repositories", value: "Auto-synced", id: "stat-repos" },
    { label: "Hackathons Completed", value: "3" },
    { label: "SIH Internal Round", value: "Selected" },
    { label: "IEEE Student Chairman", value: "1 Year" },
    { label: "Academic Tenure", value: "2024 – 2028" }
  ],

  // --- Grouped Skills & Tooling ---
  skills: [
    {
      category: "Programming & Core",
      items: ["Python", "C", "C++", "JavaScript", "TypeScript"]
    },
    {
      category: "Robotics & AI Domains",
      items: ["Robotics Systems", "Machine Learning", "Computer Vision", "ROS", "Embedded Systems", "Arduino"]
    },
    {
      category: "Engineering & Dev Tools",
      items: ["Git & GitHub", "Linux", "VS Code", "REST APIs", "Modern Web Architecture"]
    },
    {
      category: "Leadership & Collaboration",
      items: ["Technical Leadership", "Cross-functional Teamwork", "Project Ideation", "Public Speaking", "Problem Solving"]
    },
    {
      category: "Languages",
      items: ["English", "Hindi"]
    }
  ],

  // --- Hackathon Track Record ---
  hackathons: [
    {
      title: "Smart India Hackathon (SIH)",
      level: "Internal Round — Selected",
      organization: "VTU Muddenahalli / Ministry of Education",
      summary: "Competed in the internal college hackathon, cleared Round 1, and earned official nomination/selection.",
      description: "Spearheaded problem evaluation, architectural prototyping, and defense under competitive college evaluation criteria to secure selection."
    },
    {
      title: "Bharatiya Antariksh Hackathon 2026",
      level: "National Level",
      organization: "ISRO (Indian Space Research Organisation)",
      summary: "Engineered space-data processing algorithms leveraging Earth observation datasets.",
      description: "Applied machine learning and geospatial data manipulation to extract actionable planetary intelligence."
    },
    {
      title: "Anviya Hackathon",
      level: "Inter-College Level",
      organization: "SJCIT",
      summary: "Transformed an early concept into a working functional prototype in a single sprint.",
      description: "Rapid iteration, hardware/software interfacing, and collaborative technical execution."
    }
  ],

  // --- Leadership Experience ---
  leadership: [
    {
      role: "Student Chairman",
      organization: "IEEE Student Branch, VTU Muddenahalli",
      period: "1 Year Tenure",
      highlights: [
        "Led branch governance, setting technical roadmap and mentoring student teams.",
        "Organized hands-on technical bootcamps, workshops, and expert sessions.",
        "Fostered member engagement, inter-college participation, and academic technical culture."
      ]
    }
  ],

  // --- Academic Background ---
  education: [
    {
      degree: "B.Tech in Robotics & Artificial Intelligence",
      institution: "VTU Muddenahalli, Karnataka",
      period: "2024 – 2028 (Expected)",
      status: "In Progress"
    }
  ],

  // Fallback repo items if GitHub rate limits unauthenticated requests
  fallbackProjects: [
    {
      name: "disaster-alert-system",
      description: "AI-powered disaster alert system with NLP social media analysis for real-time emergency intelligence.",
      html_url: "https://github.com/abhijaysingh2006-tech/disaster-alert-system",
      language: "JavaScript",
      stargazers_count: 0
    },
    {
      name: "ZenNews-",
      description: "A calm, clutter-free news platform aggregating trustworthy headlines into an ad-free dual-column layout.",
      html_url: "https://github.com/abhijaysingh2006-tech/ZenNews-",
      language: "JavaScript",
      stargazers_count: 0
    },
    {
      name: "trialsetu",
      description: "Clinical trials and patient connection platform built for seamless medical trial matching.",
      html_url: "https://github.com/abhijaysingh2006-tech/trialsetu",
      language: "TypeScript",
      stargazers_count: 0
    },
    {
      name: "MINION-S",
      description: "Modular autonomous robotic agent project exploring control algorithms and sensor integration.",
      html_url: "https://github.com/abhijaysingh2006-tech/MINION-S",
      language: "TypeScript",
      stargazers_count: 0
    },
    {
      name: "smt",
      description: "Smart monitoring tool and real-time dashboard prototype.",
      html_url: "https://github.com/abhijaysingh2006-tech/smt",
      language: "HTML",
      stargazers_count: 0
    }
  ]
};
