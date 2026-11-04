/**
 * Aisha — Portfolio
 * Language switcher (EN/NL), header style on scroll, mobile menu, active nav
 * link, hero code card, entrance animations, project switching and the
 * footer year. No libraries.
 */
(function () {
  "use strict";

  const header = document.getElementById("site-header");
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav__link");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const translations = window.PORTFOLIO_TRANSLATIONS || { nl: {}, ui: { en: {}, nl: {} } };
  const STORAGE_KEY = "portfolio-language";
  let language = "en";
  const languageListeners = [];

  // Text created by this script, in the current language
  const t = (key) => translations.ui[language][key] || translations.ui.en[key] || key;

  // Run now and again whenever the language changes
  const onLanguageChange = (callback) => {
    languageListeners.push(callback);
    callback();
  };

  const readLanguage = () => {
    try {
      return localStorage.getItem(STORAGE_KEY) === "nl" ? "nl" : "en";
    } catch (error) {
      return "en";
    }
  };

  const saveLanguage = (lang) => {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (error) {
      // Storage unavailable (e.g. private mode): the choice lasts for this visit
    }
  };

  // Language: English is the text in the HTML. Elements with data-i18n get
  // their Dutch HTML from translations.js; data-i18n-attr="attr:key;attr:key"
  // does the same for attributes such as alt and aria-label.
  function initLanguage() {
    const textElements = document.querySelectorAll("[data-i18n]");
    const attrElements = document.querySelectorAll("[data-i18n-attr]");
    const buttons = document.querySelectorAll(".lang-switch__btn");

    const attrPairs = (el) => el.dataset.i18nAttr.split(";").map((pair) => pair.split(":"));

    // Keep the English so it can be restored after switching to Dutch
    const englishText = new Map();
    const englishAttrs = new Map();
    textElements.forEach((el) => englishText.set(el, el.innerHTML));
    attrElements.forEach((el) => {
      englishAttrs.set(el, attrPairs(el).map(([attr]) => el.getAttribute(attr)));
    });

    const apply = (lang) => {
      language = lang;
      const dutch = lang === "nl" ? translations.nl : {};

      textElements.forEach((el) => {
        const value = dutch[el.dataset.i18n] || englishText.get(el);
        if (el.innerHTML !== value) el.innerHTML = value;
      });

      attrElements.forEach((el) => {
        const originals = englishAttrs.get(el);
        attrPairs(el).forEach(([attr, key], i) => {
          el.setAttribute(attr, dutch[key] || originals[i]);
        });
      });

      document.documentElement.lang = lang;
      buttons.forEach((button) => {
        button.setAttribute("aria-pressed", String(button.dataset.lang === lang));
      });
      languageListeners.forEach((callback) => callback());
    };

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        if (button.dataset.lang === language) return;
        apply(button.dataset.lang);
        saveLanguage(language);
      });
    });

    apply(readLanguage());
  }

  // Header gets a background once the page is scrolled
  function initHeader() {
    const update = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 12);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  // Mobile menu: toggle button, close on link click or Escape
  function initMobileNav() {
    // Content behind the open menu should not be reachable with Tab
    const background = document.querySelectorAll("main, footer");

    const isOpen = () => navToggle.getAttribute("aria-expanded") === "true";

    const updateLabel = () => {
      navToggle.setAttribute("aria-label", t(isOpen() ? "menu.close" : "menu.open"));
    };

    const setOpen = (open) => {
      navToggle.setAttribute("aria-expanded", String(open));
      navMenu.classList.toggle("is-open", open);
      document.body.classList.toggle("nav-open", open);
      background.forEach((el) => { el.inert = open; });
      updateLabel();
    };

    navToggle.addEventListener("click", () => setOpen(!isOpen()));

    // Any link in the header (menu links and the logo) closes the menu
    header.addEventListener("click", (event) => {
      if (event.target.closest("a")) setOpen(false);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && isOpen()) {
        setOpen(false);
        navToggle.focus();
      }
    });

    // Close the menu when the window is resized to desktop width
    window.matchMedia("(max-width: 768px)").addEventListener("change", (event) => {
      if (!event.matches) setOpen(false);
    });

    onLanguageChange(updateLabel);
  }

  // Highlight the nav link of the section in the middle of the screen
  function initActiveLinks() {
    const sections = document.querySelectorAll("main section[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          navLinks.forEach((link) => {
            const isCurrent = link.getAttribute("href") === `#${entry.target.id}`;
            link.classList.toggle("is-active", isCurrent);
            if (isCurrent) {
              link.setAttribute("aria-current", "true");
            } else {
              link.removeAttribute("aria-current");
            }
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
  }

  // Hero code card: shows its three snippets in turn. It pauses while the
  // mouse is over the code, while the card is off screen or the tab is hidden,
  // and when the visitor presses pause. With reduced motion it starts paused.
  function initCodeCard() {
    const card = document.getElementById("code-card");
    const snippets = card.querySelectorAll(".code-card__snippet");
    const fileNames = card.querySelectorAll(".code-card__file-name");
    const body = card.querySelector(".code-card__body");
    const toggle = card.querySelector(".code-card__toggle");
    const INTERVAL = 5500;

    let index = 0;
    let timer = null;
    let userPaused = reduceMotion.matches;
    let hovered = false;
    let onScreen = true;

    const show = (next) => {
      index = next;
      snippets.forEach((snippet, i) => snippet.classList.toggle("is-active", i === index));
      fileNames.forEach((name, i) => name.classList.toggle("is-active", i === index));
    };

    const schedule = () => {
      clearTimeout(timer);
      if (userPaused || hovered || !onScreen || document.hidden) return;
      timer = setTimeout(() => {
        show((index + 1) % snippets.length);
        schedule();
      }, INTERVAL);
    };

    const updateToggle = () => {
      toggle.setAttribute("aria-label", t(userPaused ? "code.play" : "code.pause"));
      toggle.classList.toggle("is-paused", userPaused);
    };

    toggle.addEventListener("click", () => {
      userPaused = !userPaused;
      updateToggle();
      schedule();
    });

    // Hold the current snippet while someone reads it with the mouse
    body.addEventListener("pointerenter", (event) => {
      if (event.pointerType !== "mouse") return;
      hovered = true;
      schedule();
    });
    body.addEventListener("pointerleave", () => {
      if (!hovered) return;
      hovered = false;
      schedule();
    });

    new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      schedule();
    }).observe(card);

    document.addEventListener("visibilitychange", schedule);

    reduceMotion.addEventListener("change", (event) => {
      if (event.matches) {
        userPaused = true;
        updateToggle();
        schedule();
      }
    });

    onLanguageChange(updateToggle);
    schedule();
  }

  // Fade elements with the "reveal" class in when they scroll into view.
  // Children of a "reveal-stagger" element fade in one after another.
  function initReveal() {
    const items = document.querySelectorAll(".reveal, .reveal-stagger");

    if (reduceMotion.matches) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    items.forEach((item) => {
      // Small delay between cards that sit next to each other
      if (item.classList.contains("reveal")) {
        const siblings = Array.from(item.parentElement.children)
          .filter((el) => el.classList.contains("reveal"));
        const index = Math.min(siblings.indexOf(item), 5);
        item.style.setProperty("--reveal-delay", `${index * 0.08}s`);
      }

      if (item.classList.contains("reveal-stagger")) {
        Array.from(item.children).forEach((child, i) => {
          child.style.setProperty("--stagger-index", i);
        });
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    items.forEach((item) => observer.observe(item));
  }

  // Projects: clicking a smaller card swaps it with the featured card
  function initProjects() {
    const grid = document.querySelector(".projects-grid");
    const announcer = document.getElementById("project-announcer");
    const cards = Array.from(grid.querySelectorAll(".project-card"));

    // The featured card's button is disabled; the others can be selected
    const updateButtons = () => {
      cards.forEach((card) => {
        const isFeatured = card.classList.contains("project-card--featured");
        const button = card.querySelector(".project-card__select");
        button.disabled = isFeatured;
        button.querySelector(".visually-hidden").hidden = isFeatured;
      });
    };

    // Move the chosen card to the top and the old featured card into its place
    const swap = (card, current) => {
      const next = card.nextElementSibling;
      grid.prepend(card);
      if (next) {
        next.before(current);
      } else {
        grid.append(current);
      }
      current.classList.remove("project-card--featured");
      card.classList.add("project-card--featured");
      updateButtons();
    };

    // Focus and announce the new featured card, and scroll it into view if needed
    const afterSwap = (card) => {
      const title = card.querySelector(".project-card__select").firstChild.textContent.trim();
      announcer.textContent = t("projects.announce").replace("{title}", title);

      card.setAttribute("tabindex", "-1");
      card.focus({ preventScroll: true });

      const top = card.getBoundingClientRect().top;
      if (top < header.offsetHeight || top > window.innerHeight / 2) {
        card.scrollIntoView({ behavior: reduceMotion.matches ? "auto" : "smooth", block: "start" });
      }
    };

    const feature = (card) => {
      const current = grid.querySelector(".project-card--featured");
      if (card === current) return;

      // The cards are already on screen; stop the entrance animation replaying
      cards.forEach((c) => c.classList.remove("reveal"));

      swap(card, current);

      // Short fade on the two cards that moved (skipped with reduced motion)
      if (!reduceMotion.matches) {
        [card, current].forEach((c) => {
          c.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 350, easing: "ease-out" });
        });
      }

      afterSwap(card);
    };

    cards.forEach((card) => {
      card.querySelector(".project-card__select").addEventListener("click", () => feature(card));
    });

    updateButtons();
  }

  function initYear() {
    document.getElementById("year").textContent = new Date().getFullYear();
  }

  initLanguage();
  initHeader();
  initMobileNav();
  initActiveLinks();
  initCodeCard();
  initReveal();
  initProjects();
  initYear();
})();
