/* Darwawin Portfolio — Responsive JavaScript */
(() => {
  "use strict";

  // ==========================================
  // 1. MOBILE NAVIGATION
  // ==========================================
  const menuButton = document.querySelector(".menu-toggle");
  const primaryNav = document.querySelector(".primary-nav");

  if (menuButton && primaryNav) {
    const closeMenu = () => {
      primaryNav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute(
        "aria-label",
        "Open navigation menu"
      );
    };

    menuButton.addEventListener("click", () => {
      const isOpen =
        menuButton.getAttribute("aria-expanded") === "true";

      menuButton.setAttribute(
        "aria-expanded",
        String(!isOpen)
      );

      menuButton.setAttribute(
        "aria-label",
        isOpen
          ? "Open navigation menu"
          : "Close navigation menu"
      );

      primaryNav.classList.toggle("open", !isOpen);
    });

    // Close menu after selecting a navigation link
    primaryNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    // Close menu with Escape key
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });
  }

  // ==========================================
  // 2. AUTOMATIC COPYRIGHT YEAR
  // ==========================================
  const year = document.querySelector("#year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // ==========================================
  // 3. ACTIVE NAVIGATION LINK
  // ==========================================
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  if (
    "IntersectionObserver" in window &&
    sections.length &&
    navLinks.length
  ) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          navLinks.forEach((link) => {
            const isActive =
              link.getAttribute("href") ===
              `#${entry.target.id}`;

            link.classList.toggle("active", isActive);
          });
        });
      },
      {
        rootMargin: "-35% 0px -55% 0px"
      }
    );

    sections.forEach((section) => {
      sectionObserver.observe(section);
    });
  }

  // ==========================================
  // 4. ELECTRIC BLUE SCROLL PROGRESS BAR
  // ==========================================
  const progressTrack = document.createElement("div");

  progressTrack.className = "scroll-progress-track";
  progressTrack.setAttribute("aria-hidden", "true");

  const progressBar = document.createElement("div");

  progressBar.className = "scroll-progress-bar";

  progressTrack.appendChild(progressBar);
  document.body.prepend(progressTrack);

  let progressTicking = false;

  const updateScrollProgress = () => {
    const scrollableHeight =
      document.documentElement.scrollHeight -
      window.innerHeight;

    const progress =
      scrollableHeight > 0
        ? window.scrollY / scrollableHeight
        : 0;

    progressBar.style.transform =
      `scaleX(${Math.min(1, Math.max(0, progress))})`;

    progressTicking = false;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (!progressTicking) {
        window.requestAnimationFrame(updateScrollProgress);
        progressTicking = true;
      }
    },
    { passive: true }
  );

  window.addEventListener("resize", updateScrollProgress);

  updateScrollProgress();

  // ==========================================
  // 5. SCROLL REVEAL — DOWN AND UP
  // ==========================================
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const revealSelectors = [
    ".about-panel",
    ".about-copy > p",
    ".fact-card",
    ".section-intro",
    ".skill-card",
    ".works-heading",
    ".project-card",
    ".education-card",
    ".contact-panel"
  ];

  const revealElements = document.querySelectorAll(
    revealSelectors.join(", ")
  );

  if (
    !reduceMotion &&
    "IntersectionObserver" in window &&
    revealElements.length
  ) {
    document.documentElement.classList.add("js-motion");

    revealElements.forEach((element, index) => {
      element.classList.add("reveal");

      // Slight delay between elements
      element.style.setProperty(
        "--reveal-delay",
        `${(index % 4) * 70}ms`
      );
    });

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Show element when entering the viewport
            entry.target.classList.add("is-visible");
          } else {
            // Reset when leaving the viewport
            // so the animation can play again
            entry.target.classList.remove("is-visible");
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px"
      }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  }

  // ==========================================
  // 6. PROJECT CARD INTERACTION
  // ==========================================
  const projectCards = document.querySelectorAll(".project-card");

  projectCards.forEach((card) => {
    card.addEventListener("focusin", () => {
      card.classList.add("is-interacting");
    });

    card.addEventListener("focusout", (event) => {
      if (!card.contains(event.relatedTarget)) {
        card.classList.remove("is-interacting");
      }
    });

    // Support touch devices without requiring hover
    card.addEventListener("touchstart", () => {
      card.classList.add("is-interacting");
    }, { passive: true });
  });
})();
