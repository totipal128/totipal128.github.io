/* ============================================
   ISMAIL TOTIPAL - Developer Portfolio
   Main JavaScript
   ============================================ */

"use strict";

document.addEventListener("DOMContentLoaded", function () {
  /* ==========================================
     TYPING EFFECT
     ========================================== */
  const typingElement = document.getElementById("typingText");
  if (typingElement) {
    const words = [
      "Developer Aplikasi",
      "Laravel Developer",
      "Python Enthusiast",
      "Rust Learner",
      "Svelte Developer",
      "Tauri & Desktop Dev",
      "Project Builder",
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function typeEffect() {
      const currentWord = words[wordIndex];

      if (isDeleting) {
        typingElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
      } else {
        typingElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
      }

      if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500;
      }

      setTimeout(typeEffect, typeSpeed);
    }

    typeEffect();
  }

  /* ==========================================
     PARTICLES BACKGROUND
     ========================================== */
  const particlesContainer = document.getElementById("particles");
  if (particlesContainer) {
    const particleCount =
      window.innerWidth < 768 ? 15 : Math.floor(window.innerWidth / 40);

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.classList.add("particle");
      particle.style.left = Math.random() * 100 + "%";
      particle.style.width = Math.random() * 3 + 2 + "px";
      particle.style.height = particle.style.width;
      particle.style.animationDuration = Math.random() * 15 + 10 + "s";
      particle.style.animationDelay = Math.random() * 10 + "s";
      particlesContainer.appendChild(particle);
    }

    /* --- Floating Code Symbols --- */
    const codeSymbols = [
      "{", "}", "<", ">", "/", "//", "_", "=>", "fn",
      "let", "if", "for", "&", "*", "$", "#", "..."
    ];
    const symbolCount = window.innerWidth < 768 ? 6 : 12;

    for (let i = 0; i < symbolCount; i++) {
      const symbol = document.createElement("span");
      symbol.classList.add("code-symbol");
      symbol.textContent = codeSymbols[Math.floor(Math.random() * codeSymbols.length)];
      symbol.style.left = Math.random() * 90 + 5 + "%";
      symbol.style.fontSize = (Math.random() * 10 + 10) + "px";
      symbol.style.animationDuration = (Math.random() * 20 + 15) + "s";
      symbol.style.animationDelay = (Math.random() * 15) + "s";
      symbol.style.opacity = (Math.random() * 0.12 + 0.04);
      particlesContainer.appendChild(symbol);
    }
  }

  /* ==========================================
     NAVBAR MOBILE TOGGLE
     ========================================== */
  const navbarToggle = document.getElementById("navbarToggle");
  const navbarMobile = document.getElementById("navbarMobile");
  const navbarOverlay = document.getElementById("navbarOverlay");

  function openNavbarMenu() {
    navbarMobile.classList.add("open");
    navbarOverlay.classList.add("show");
    document.body.style.overflow = "hidden";
  }

  function closeNavbarMenu() {
    navbarMobile.classList.remove("open");
    navbarOverlay.classList.remove("show");
    document.body.style.overflow = "";
  }

  if (navbarToggle) {
    navbarToggle.addEventListener("click", function () {
      if (navbarMobile.classList.contains("open")) {
        closeNavbarMenu();
      } else {
        openNavbarMenu();
      }
    });
  }

  if (navbarOverlay) {
    navbarOverlay.addEventListener("click", closeNavbarMenu);
  }

  /* Close mobile menu on link click */
  if (navbarMobile) {
    navbarMobile.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeNavbarMenu);
    });
  }

  /* ==========================================
     SMOOTH SCROLL & ACTIVE NAV
     ========================================== */
  const navLinks = document.querySelectorAll(
    ".navbar-links li a[href^='#'], .navbar-mobile-links li a[href^='#']"
  );
  const sections = document.querySelectorAll("section[id]");

  navLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const target = document.getElementById(targetId);

      if (target) {
        const offset = 80;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  /* --- Active nav link on scroll --- */
  function updateActiveNav() {
    let current = "";
    const scrollPos = window.scrollY + 150;

    sections.forEach(function (section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(function (link) {
      link.classList.remove("active");
      const href = link.getAttribute("href").substring(1);
      if (href === current) {
        link.classList.add("active");
      }
    });
  }

  /* --- Throttled scroll handler --- */
  let isScrolling = false;
  window.addEventListener("scroll", function () {
    if (!isScrolling) {
      window.requestAnimationFrame(function () {
        updateActiveNav();
        isScrolling = false;
      });
      isScrolling = true;
    }
  });

  /* ==========================================
     SCROLL REVEAL (IntersectionObserver)
     ========================================== */
  const revealElements = document.querySelectorAll(".reveal");

  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  /* ==========================================
     PROJECT DATA & MODAL
     ========================================== */
  const projectsData = [
    {
      id: "sipena",
      title: "SIPENA",
      icon: "fab fa-laravel",
      iconBg: "laravel-bg",
      description: "Sistem Informasi Perpustakaan berbasis web dengan manajemen anggota, peminjaman buku, katalog digital, dan laporan otomatis.",
      tags: ["laravel", "mysql", "bootstrap"],
      features: [
        "Manajemen anggota perpustakaan",
        "Katalog buku dengan pencarian",
        "Sistem peminjaman & pengembalian",
        "Laporan otomatis (Excel/PDF)",
        "Role-based access (admin, petugas, anggota)",
      ],
      demoUrl: "#",
      githubUrl: "#",
    },
    {
      id: "automl",
      title: "AutoML Pipeline",
      icon: "fab fa-python",
      iconBg: "python-bg",
      description: "Pipeline machine learning otomatis yang menangani preprocessing data, feature engineering, training model, dan deployment sebagai REST API.",
      tags: ["python", "ml", "api"],
      features: [
        "Auto preprocessing & cleaning data",
        "Feature engineering otomatis",
        "Multi-model training & comparison",
        "Hyperparameter tuning otomatis",
        "Deploy sebagai REST API dengan FastAPI",
      ],
      demoUrl: "#",
      githubUrl: "#",
    },
    {
      id: "ferris-cli",
      title: "Ferris CLI",
      icon: "fas fa-cog",
      iconBg: "rust-bg",
      description: "Koleksi CLI tools untuk produktivitas developer — file organizer, log parser, task runner, dan utilitas sistem. Dibangun dengan performa tinggi dan zero dependency.",
      tags: ["rust", "cli", "perf"],
      features: [
        "File organizer otomatis",
        "Log parser dengan filtering",
        "Task runner ringan",
        "Cross-platform (Windows, macOS, Linux)",
        "Performa tinggi dengan Rust",
      ],
      demoUrl: "#",
      githubUrl: "#",
    },
    {
      id: "gomicro",
      title: "GoMicro Gateway",
      icon: "fab fa-golang",
      iconBg: "golang-bg",
      description: "API Gateway untuk arsitektur microservices dengan fitur rate limiting, autentikasi JWT, load balancing, dan monitoring terintegrasi.",
      tags: ["golang", "api", "jwt"],
      features: [
        "Rate limiting per endpoint",
        "Autentikasi JWT & OAuth2",
        "Load balancing round-robin",
        "Monitoring & logging terpusat",
        "Hot-reload configuration",
      ],
      demoUrl: "#",
      githubUrl: "#",
    },
    {
      id: "svelte-dash",
      title: "SvelteDash",
      icon: "fas fa-bolt",
      iconBg: "svelte-bg",
      description: "Dashboard analitik real-time dengan visualisasi data interaktif, reactive UI ringan, dan performa tinggi berkat kompilasi Svelte.",
      tags: ["svelte", "js", "css"],
      features: [
        "Visualisasi data real-time (Chart.js)",
        "Filter & sorting interaktif",
        "Responsive & mobile-friendly",
        "Dark/light mode built-in",
        "Bundle size minimal dengan Svelte",
      ],
      demoUrl: "#",
      githubUrl: "#",
    },
    {
      id: "tauri-pos",
      title: "TauriDeck POS",
      icon: "fas fa-laptop-code",
      iconBg: "desktop-bg",
      description: "Aplikasi desktop Point of Sale lintas platform dengan antarmuka modern, database lokal SQLite, dan performa native berkat Rust + Tauri.",
      tags: ["rust", "tauri", "svelte"],
      features: [
        "Antarmuka POS yang responsif",
        "Manajemen inventaris & stok",
        "Laporan penjualan harian/bulanan",
        "Database lokal SQLite",
        "Cross-platform (Windows, macOS, Linux)",
      ],
      demoUrl: "#",
      githubUrl: "#",
    },
  ];

  const projectsGrid = document.getElementById("projectsGrid");
  const modal = document.getElementById("projectModal");
  const modalBackdrop = document.getElementById("modalBackdrop");
  const modalClose = document.getElementById("modalClose");

  /* Render project cards */
  if (projectsGrid) {
    projectsData.forEach(function (project, index) {
      const card = document.createElement("div");
      card.className = "project-card reveal";
      card.style.transitionDelay = (index * 0.1) + "s";
      card.dataset.projectId = project.id;

      card.innerHTML = `
        <div class="project-preview">
          <div class="project-icon ${project.iconBg}">
            <i class="${project.icon}"></i>
          </div>
          <div class="project-overlay">
            <span><i class="fas fa-search-plus"></i> Lihat Detail</span>
          </div>
        </div>
        <div class="project-body">
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <div class="project-tags">
            ${project.tags.map(function(t) {
              return '<span class="tag tag-' + t + '">' + t.charAt(0).toUpperCase() + t.slice(1) + '</span>';
            }).join("")}
          </div>
        </div>
      `;

      card.addEventListener("click", function () {
        openProjectModal(project);
      });

      projectsGrid.appendChild(card);
    });
  }

  /* Tag display name mapping */
  const tagNames = {
    laravel: "Laravel",
    mysql: "MySQL",
    bootstrap: "Bootstrap",
    python: "Python",
    ml: "Scikit-learn",
    api: "FastAPI",
    rust: "Rust",
    cli: "CLI",
    perf: "High Perf",
    golang: "Golang",
    jwt: "JWT",
    svelte: "Svelte",
    js: "TypeScript",
    css: "Tailwind",
    tauri: "Tauri",
  };

  /* Open modal */
  function openProjectModal(project) {
    const iconEl = document.getElementById("modalIcon");
    const titleEl = document.getElementById("modalTitle");
    const techEl = document.getElementById("modalTech");
    const descEl = document.getElementById("modalDescription");
    const featuresEl = document.getElementById("modalFeatures");
    const demoLink = document.getElementById("modalDemoLink");
    const githubLink = document.getElementById("modalGithubLink");

    iconEl.className = "modal-icon " + project.iconBg;
    iconEl.innerHTML = '<i class="' + project.icon + '"></i>';
    titleEl.textContent = project.title;
    techEl.innerHTML = project.tags.map(function(t) {
      var name = tagNames[t] || t.charAt(0).toUpperCase() + t.slice(1);
      return '<span class="tag tag-' + t + '">' + name + '</span>';
    }).join("");
    descEl.textContent = project.description;
    featuresEl.innerHTML = project.features.map(function(f) {
      return '<span class="modal-feature-item"><i class="fas fa-check-circle"></i> ' + f + '</span>';
    }).join("");

    var hasDemo = project.demoUrl && project.demoUrl !== "#";
    var hasGithub = project.githubUrl && project.githubUrl !== "#";

    if (hasDemo) {
      demoLink.href = project.demoUrl;
      demoLink.classList.remove("disabled");
      demoLink.innerHTML = '<i class="fas fa-external-link-alt"></i> Live Demo';
    } else {
      demoLink.href = "#";
      demoLink.classList.add("disabled");
      demoLink.innerHTML = '<i class="fas fa-clock"></i> Coming Soon';
    }

    if (hasGithub) {
      githubLink.href = project.githubUrl;
      githubLink.classList.remove("disabled");
      githubLink.innerHTML = '<i class="fab fa-github"></i> Source Code';
    } else {
      githubLink.href = "#";
      githubLink.classList.add("disabled");
      githubLink.innerHTML = '<i class="fas fa-clock"></i> Coming Soon';
    }

    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeProjectModal() {
    modal.classList.remove("open");
    document.body.style.overflow = "";
  }

  if (modalClose) {
    modalClose.addEventListener("click", closeProjectModal);
  }
  if (modalBackdrop) {
    modalBackdrop.addEventListener("click", closeProjectModal);
  }

  /* Close modal on Escape key */
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal && modal.classList.contains("open")) {
      closeProjectModal();
    }
  });

  /* ==========================================
     THEME TOGGLE (Dark / Light Mode)
     ========================================== */
  const themeToggle = document.getElementById("themeToggle");
  const themeToggleMobile = document.getElementById("themeToggleMobile");

  function setTheme(theme) {
    if (theme === "light") {
      document.body.classList.add("light-mode");
    } else {
      document.body.classList.remove("light-mode");
    }
    localStorage.setItem("portfolio-theme", theme);
    const isLight = theme === "light";
    if (themeToggle) {
      themeToggle.setAttribute("aria-pressed", isLight);
    }
    if (themeToggleMobile) {
      themeToggleMobile.setAttribute("aria-pressed", isLight);
    }
  }

  function toggleTheme() {
    const isLight = document.body.classList.contains("light-mode");
    setTheme(isLight ? "dark" : "light");
  }

  /* Load saved theme */
  const savedTheme = localStorage.getItem("portfolio-theme");
  if (savedTheme === "light") {
    setTheme("light");
  } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
    /* Optionally follow system preference if no saved theme */
    /* Disabled by default — start in dark mode per design */
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }
  if (themeToggleMobile) {
    themeToggleMobile.addEventListener("click", toggleTheme);
  }

  /* ==========================================
     FOOTER YEAR
     ========================================== */
  const footerYear = document.querySelector(".footer p");
  if (footerYear) {
    const year = new Date().getFullYear();
    footerYear.innerHTML = footerYear.innerHTML.replace("2024", year);
  }
});
