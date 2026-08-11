(() => {
  "use strict";

  const menu = document.querySelector(".menu");
  const navLinks = document.querySelector("#main-nav");
  const nav = document.querySelector(".nav");

  const closeMenu = () => {
    if (!navLinks || !menu) return;
    navLinks.classList.remove("open");
    menu.setAttribute("aria-expanded", "false");
    menu.setAttribute("aria-label", "باز کردن منو");
  };

  const toggleMenu = () => {
    if (!navLinks || !menu) return;
    const isOpen = navLinks.classList.toggle("open");
    menu.setAttribute("aria-expanded", String(isOpen));
    menu.setAttribute("aria-label", isOpen ? "بستن منو" : "باز کردن منو");
  };

  if (menu && navLinks) {
    menu.addEventListener("click", toggleMenu);

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", (event) => {
      if (
        navLinks.classList.contains("open") &&
        !navLinks.contains(event.target) &&
        !menu.contains(event.target)
      ) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 850) closeMenu();
    }, { passive: true });
  }

  // Reveal-on-scroll with graceful fallback.
  const revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -30px 0px" });

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("show"));
  }

  // Keep the navigation visually consistent while scrolling.
  const updateNav = () => {
    if (nav) nav.classList.toggle("scrolled", window.scrollY > 20);
  };
  updateNav();
  window.addEventListener("scroll", updateNav, { passive: true });
})();
