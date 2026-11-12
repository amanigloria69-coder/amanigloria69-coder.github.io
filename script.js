/* ==========================================================================
   Portfolio behaviour
   - reveals sections as they scroll into view
   - highlights the nav link for the section you're reading
   - copies the email address to the clipboard
   - keeps the footer year current
   ========================================================================== */

(() => {
  "use strict";

  /* --- Footer year ------------------------------------------------------- */

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* --- Reveal on scroll -------------------------------------------------- */

  const revealEls = document.querySelectorAll(".reveal");
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
    );

    revealEls.forEach((el) => revealObserver.observe(el));

    // Stagger siblings inside a grid so cards cascade instead of popping together.
    document.querySelectorAll(".projects, .hero__inner").forEach((group) => {
      [...group.children]
        .filter((child) => child.classList.contains("reveal"))
        .forEach((child, i) => {
          child.style.setProperty("--reveal-delay", `${i * 90}ms`);
        });
    });
  }

  /* --- Scroll spy -------------------------------------------------------- */

  const navLinks = [...document.querySelectorAll(".nav__menu a")];
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if (sections.length && "IntersectionObserver" in window) {
    const spyObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          navLinks.forEach((link) => {
            const isCurrent =
              link.getAttribute("href") === `#${entry.target.id}`;
            if (isCurrent) link.setAttribute("aria-current", "true");
            else link.removeAttribute("aria-current");
          });
        });
      },
      // Only count a section as "current" once it reaches the top third.
      { rootMargin: "-20% 0px -70% 0px" }
    );

    sections.forEach((section) => spyObserver.observe(section));
  }

  /* --- Copy email -------------------------------------------------------- */

  const copyBtn = document.getElementById("copy-email");
  const statusEl = document.getElementById("copy-status");

  if (copyBtn && statusEl) {
    copyBtn.addEventListener("click", async () => {
      const email = copyBtn.dataset.email;
      if (!email) return;

      try {
        await navigator.clipboard.writeText(email);
        statusEl.textContent = `Copied ${email} to your clipboard.`;
      } catch {
        // Clipboard API needs HTTPS or localhost; fall back to a prompt.
        window.prompt("Copy my email address:", email);
        statusEl.textContent = "";
        return;
      }

      window.clearTimeout(copyBtn._resetTimer);
      copyBtn._resetTimer = window.setTimeout(() => {
        statusEl.textContent = "";
      }, 4000);
    });
  }
})();
