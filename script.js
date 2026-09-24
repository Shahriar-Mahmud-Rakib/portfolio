/**
 * PORTFOLIO SCRIPTS
 * Md. Rakibul Islam — SQA Engineer & Business Analyst
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. DYNAMIC YEAR
     ========================================================================== */
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ==========================================================================
     2. DYNAMIC TYPEWRITER EFFECT
     ========================================================================== */
  const typewriterEl = document.getElementById('typewriter');
  const roles = [
    'Software Quality Assurance',
    'Manual & Functional Testing',
    'Postman REST API Testing',
    'Apache JMeter Performance QA',
    'Business Analysis & User Stories',
    'SQL Database Verification'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 90;

  function typeEffect() {
    if (!typewriterEl) return;

    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typewriterEl.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 45;
    } else {
      typewriterEl.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 90;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typeSpeed = 1800; // Pause at end of word
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typeSpeed = 400; // Pause before typing next
    }

    setTimeout(typeEffect, typeSpeed);
  }

  typeEffect();

  /* ==========================================================================
     3. SCROLL PROGRESS INDICATOR & NAVBAR SCROLL EFFECT
     ========================================================================== */
  const scrollProgress = document.getElementById('scroll-progress');
  const header = document.getElementById('header');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    // Progress Bar
    if (scrollProgress) {
      scrollProgress.style.width = `${scrollPercent}%`;
    }

    // Header Background
    if (header) {
      if (scrollTop > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Back to Top Button
    if (backToTopBtn) {
      if (scrollTop > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* ==========================================================================
     4. MOBILE MENU TOGGLE
     ========================================================================== */
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  const navItems = document.querySelectorAll('.nav-link');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const icon = menuToggle.querySelector('i');
      if (icon) {
        if (navLinks.classList.contains('open')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-xmark');
        } else {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      }
    });

    navItems.forEach(item => {
      item.addEventListener('click', () => {
        navLinks.classList.remove('open');
        const icon = menuToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      });
    });
  }

  /* ==========================================================================
     5. ACTIVE NAV LINK SCROLL SPY
     ========================================================================== */
  const sections = document.querySelectorAll('section[id]');

  function scrollActiveNav() {
    const scrollY = window.pageYOffset + 150;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute('id');
      const navLink = document.querySelector(`.nav-links a[href*='${sectionId}']`);

      if (navLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLink.classList.add('active');
        } else {
          navLink.classList.remove('active');
        }
      }
    });
  }

  window.addEventListener('scroll', scrollActiveNav);

  /* ==========================================================================
     6. HERO METRICS COUNTER ANIMATION
     ========================================================================== */
  const statNumbers = document.querySelectorAll('.stat-num');
  let animatedStats = false;

  function animateCounters() {
    statNumbers.forEach(stat => {
      const target = +stat.getAttribute('data-target');
      const symbol = stat.querySelector('span') ? stat.querySelector('span').outerHTML : '';
      let count = 0;
      const speed = target / 35; // 35 steps

      const updateCount = () => {
        count += speed;
        if (count < target) {
          stat.innerHTML = `${Math.ceil(count)}${symbol}`;
          setTimeout(updateCount, 40);
        } else {
          stat.innerHTML = `${target}${symbol}`;
        }
      };

      updateCount();
    });
  }

  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animatedStats) {
        animatedStats = true;
        animateCounters();
      }
    });
  }, { threshold: 0.3 });

  const heroSection = document.getElementById('home');
  if (heroSection) {
    heroObserver.observe(heroSection);
  }

  /* ==========================================================================
     7. SKILLS FILTERING
     ========================================================================== */
  const skillFilterBtns = document.querySelectorAll('.skills-filter-nav .filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  skillFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      skillFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.9)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  /* ==========================================================================
     8. PROJECTS FILTERING
     ========================================================================== */
  const projectFilterBtns = document.querySelectorAll('.projects-filter-nav .filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  projectFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      projectFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-pfilter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-pcategory');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  /* ==========================================================================
     9. PROJECT DETAILS MODAL DATA & POPUP
     ========================================================================== */
  const projectDetailsData = {
    'ultra-snaped': {
      title: 'Ultra Snaped: Team & Task Management Platform',
      category: 'Manual E2E Testing & Performance',
      timeline: '4 Months (SaaS Release)',
      overview: 'Ultra Snaped is an enterprise-grade project and task collaboration suite with multi-organization roles, real-time board sync, timesheet logs, and invoicing.',
      deliverables: [
        'Designed and executed 150+ granular test cases covering positive, negative, and edge scenarios.',
        'Executed JMeter performance testing for up to 300 concurrent user sessions with response times staying under 1.2s.',
        'Identified, documented, and verified 40+ defects in Jira across RBAC permissions and billing workflows.',
        'Conducted Cross-Browser validation across Google Chrome, Firefox, Safari, and Edge.'
      ],
      tools: ['Manual Testing', 'Apache JMeter', 'Jira', 'Postman', 'MySQL']
    },
    'open-mart': {
      title: 'Open Mart: Multi-Vendor E-Commerce Platform',
      category: 'Functional, Regression & Payment QA',
      timeline: '3 Months (Full Lifecycle)',
      overview: 'Open Mart is a large-scale e-commerce platform offering multi-vendor storefronts, dynamic inventory pricing, coupon engines, cart persistence, and secure checkout gateways.',
      deliverables: [
        'Conducted complete functional verification of end-to-end purchasing flows from product search to payment completion.',
        'Tested complex coupon logic, tax calculation rules, and currency conversion edge cases.',
        'Created extensive regression test suites executed prior to bi-weekly staging builds.',
        'Discovered and reported critical race conditions during concurrent inventory checkout.'
      ],
      tools: ['Functional Testing', 'Regression Suites', 'UAT', 'Postman', 'Chrome DevTools']
    },
    'postman-api': {
      title: 'RESTful API Testing & Automation Suite',
      category: 'API Automation & Schema Validation',
      timeline: 'Ongoing QA Framework',
      overview: 'Comprehensive API testing collection created in Postman to validate microservice endpoints, authentication tokens, payload schemas, and response performance.',
      deliverables: [
        'Created automated JavaScript test assertion scripts for status codes (200, 201, 400, 401, 403, 404, 500).',
        'Implemented JSON schema validation scripts using TinyValidator / AJV patterns.',
        'Configured Postman Environment & Global variables with dynamic auth token generation.',
        'Built automated test collection runners for rapid regression execution.'
      ],
      tools: ['Postman', 'Newman CLI', 'JavaScript', 'REST APIs', 'JSON Schema']
    },
    'jmeter-perf': {
      title: 'High-Concurrency Load & Stress Testing Framework',
      category: 'Performance Benchmarking & Bottleneck Analysis',
      timeline: '2 Months Benchmark Study',
      overview: 'Performance testing initiative using Apache JMeter to analyze server throughput, system stability under peak loads, and threshold failure points.',
      deliverables: [
        'Constructed Thread Groups simulating user ramp-up periods, constant throughput timers, and spike scenarios (up to 500 virtual users).',
        'Monitored and extracted key metrics: Average Response Time, Latency, 90th Percentile, Throughput (TPS), and Error Percentage.',
        'Identified database connection pool exhaustion as the primary bottleneck under 350+ concurrent requests.',
        'Delivered comprehensive executive summary reports with actionable optimization recommendations.'
      ],
      tools: ['Apache JMeter', 'Perfmon Plugin', 'Server Metrics', 'HTML Reports']
    },
    'ba-specs': {
      title: 'Business Requirements Specification & SDLC Specs',
      category: 'Business Analysis & Process Modeling',
      timeline: '6 Months Requirements Lifecycle',
      overview: 'End-to-end business analysis work translating client vision into technical product specifications, user story maps, and developer/QA handoff packages.',
      deliverables: [
        'Authored Business Requirements Documents (BRD) and Functional Requirements Documents (FRD).',
        'Modeled business workflows, sequence diagrams, and process flowcharts using BPMN standards.',
        'Wrote 80+ user stories formatted with clear Given-When-Then (Gherkin) acceptance criteria.',
        'Facilitated sprint grooming, stakeholder demos, and requirement clarification workshops.'
      ],
      tools: ['BRD / FRD', 'User Story Mapping', 'Jira / Confluence', 'BPMN Diagrams']
    },
    'security-audit': {
      title: 'Web Application Security & OWASP Assessment',
      category: 'Security Testing & Vulnerability Audit',
      timeline: '1.5 Months Audit',
      overview: 'Security testing review evaluating web endpoints and input forms against common OWASP Top 10 vulnerabilities.',
      deliverables: [
        'Tested login and registration forms for SQL Injection (SQLi) and Cross-Site Scripting (XSS) injection patterns.',
        'Verified broken object-level authorization (BOLA / IDOR) across multi-user role access.',
        'Validated CSRF token verification and secure cookie flags (HttpOnly, Secure, SameSite).',
        'Documented vulnerability findings with severity ratings and mitigation advice for engineering teams.'
      ],
      tools: ['Security QA', 'OWASP Top 10', 'Burp Suite Basics', 'DevTools']
    }
  };

  const projectModal = document.getElementById('project-modal');
  const modalTarget = document.getElementById('modal-content-target');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const detailButtons = document.querySelectorAll('.btn-project-details');

  function openProjectModal(projectId) {
    const data = projectDetailsData[projectId];
    if (!data || !modalTarget) return;

    modalTarget.innerHTML = `
      <div class="modal-header">
        <span class="project-category-badge" style="margin-bottom: 12px; display: inline-block;">${data.category}</span>
        <h3 class="modal-title">${data.title}</h3>
        <div class="modal-meta-bar">
          <span><i class="fa-regular fa-clock"></i> <strong>Timeline:</strong> ${data.timeline}</span>
        </div>
      </div>
      <div class="modal-body">
        <div class="modal-section">
          <h4><i class="fa-solid fa-circle-info"></i> Project Overview</h4>
          <p>${data.overview}</p>
        </div>
        <div class="modal-section">
          <h4><i class="fa-solid fa-list-check"></i> Key QA Deliverables & Execution</h4>
          <ul>
            ${data.deliverables.map(item => `<li>${item}</li>`).join('')}
          </ul>
        </div>
        <div class="modal-section">
          <h4><i class="fa-solid fa-screwdriver-wrench"></i> Technologies & Tools Used</h4>
          <div class="project-tech-tags">
            ${data.tools.map(tool => `<span class="tech-tag">${tool}</span>`).join('')}
          </div>
        </div>
      </div>
    `;

    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    if (projectModal) {
      projectModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  }

  detailButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const projectId = btn.getAttribute('data-project');
      openProjectModal(projectId);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
  }

  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) {
        closeProjectModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal && projectModal.classList.contains('active')) {
      closeProjectModal();
    }
  });

  /* ==========================================================================
     10. 1-CLICK CLIPBOARD COPY WITH TOAST NOTIFICATION
     ========================================================================== */
  const copyButtons = document.querySelectorAll('.copy-btn[data-copy]');
  const toastContainer = document.getElementById('toast-container');

  function showToast(message) {
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: var(--accent-primary);"></i> <span>${message}</span>`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-10px)';
      toast.style.transition = '0.3s ease';
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 2800);
  }

  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied "${textToCopy}" to clipboard!`);
          
          // Icon visual feedback
          const icon = btn.querySelector('i');
          if (icon) {
            icon.className = 'fa-solid fa-check';
            setTimeout(() => {
              icon.className = 'fa-regular fa-copy';
            }, 2000);
          }
        }).catch(err => {
          console.error('Failed to copy text: ', err);
        });
      }
    });
  });

  /* ==========================================================================
     11. SCROLL REVEAL ANIMATIONS (IntersectionObserver)
     ========================================================================== */
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  /* ==========================================================================
     12. DYNAMIC COLOR THEME SWITCHER
     ========================================================================== */
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themePaletteMenu = document.getElementById('theme-palette-menu');
  const themeOptions = document.querySelectorAll('.theme-opt');

  // Load saved theme or default to 'violet' (Cosmic Royal Violet)
  const savedTheme = localStorage.getItem('portfolio-theme') || 'violet';
  applyTheme(savedTheme);

  function applyTheme(themeName) {
    if (themeName === 'violet') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', themeName);
    }
    localStorage.setItem('portfolio-theme', themeName);

    themeOptions.forEach(opt => {
      if (opt.getAttribute('data-theme') === themeName) {
        opt.classList.add('active');
      } else {
        opt.classList.remove('active');
      }
    });
  }

  if (themeToggleBtn && themePaletteMenu) {
    themeToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      themePaletteMenu.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
      if (!themePaletteMenu.contains(e.target) && e.target !== themeToggleBtn) {
        themePaletteMenu.classList.remove('open');
      }
    });
  }

  themeOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      const theme = opt.getAttribute('data-theme');
      applyTheme(theme);
      if (themePaletteMenu) {
        themePaletteMenu.classList.remove('open');
      }
      showToast(`Applied ${opt.querySelector('.theme-name')?.textContent || theme} theme!`);
    });
  });

});

