// Aisha — Portfolio: language, menu, scroll effects, copy email and year

const header = document.getElementById("site-header");
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav__link");
const copyButton = document.getElementById("copy-email");
const emailAddress = document.getElementById("contact-address");

const translations = window.PORTFOLIO_TRANSLATIONS;
let language = "en";

// The English text from the HTML, so we can switch back from Dutch
const english = {};


/* Language ---------------------------------------------------------------- */

// Text for labels made by this script
function t(key) {
  return translations.ui[language][key];
}

// Save the English text so we can switch back
function saveEnglishText() {
  document.querySelectorAll("[data-i18n]").forEach(function (element) {
    english[element.dataset.i18n] = element.innerHTML;
  });

  // data-i18n-attr="alt:farid.alt" translates an attribute
  document.querySelectorAll("[data-i18n-attr]").forEach(function (element) {
    const [attribute, key] = element.dataset.i18nAttr.split(":");
    english[key] = element.getAttribute(attribute);
  });
}

// Show the page in "en" or "nl"
function setLanguage(newLanguage) {
  language = newLanguage;

  // Dutch text if there is one, otherwise the English text
  function translate(key) {
    if (language === "nl" && translations.nl[key]) {
      return translations.nl[key];
    }
    return english[key];
  }

  document.querySelectorAll("[data-i18n]").forEach(function (element) {
    element.innerHTML = translate(element.dataset.i18n);
  });

  document.querySelectorAll("[data-i18n-attr]").forEach(function (element) {
    const [attribute, key] = element.dataset.i18nAttr.split(":");
    element.setAttribute(attribute, translate(key));
  });

  document.documentElement.lang = language;

  document.querySelectorAll(".lang-switch__btn").forEach(function (button) {
    button.setAttribute("aria-pressed", button.dataset.lang === language);
  });

  // Labels made by this script also need the new language
  updateMenuLabel();
  updateCopyLabel();
}

function setupLanguage() {
  saveEnglishText();

  document.querySelectorAll(".lang-switch__btn").forEach(function (button) {
    button.addEventListener("click", function () {
      setLanguage(button.dataset.lang);
      try {
        localStorage.setItem("portfolio-language", language);
      } catch (error) {
        // Storage blocked
      }
    });
  });

  // Use the language from the last visit
  let savedLanguage = "en";
  try {
    savedLanguage = localStorage.getItem("portfolio-language") || "en";
  } catch (error) {
    // Storage blocked
  }
  setLanguage(savedLanguage === "nl" ? "nl" : "en");
}


/* Header & menu ------------------------------------------------------------ */

// The header gets a background once the page is scrolled
function updateHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 12);
}

function isMenuOpen() {
  return navToggle.getAttribute("aria-expanded") === "true";
}

function updateMenuLabel() {
  navToggle.setAttribute("aria-label", isMenuOpen() ? t("menu.close") : t("menu.open"));
}

function setMenuOpen(open) {
  navToggle.setAttribute("aria-expanded", open);
  navMenu.classList.toggle("is-open", open);
  document.body.classList.toggle("nav-open", open);

  // Page behind the open menu can't be reached with Tab
  document.querySelector("main").inert = open;
  document.querySelector("footer").inert = open;

  updateMenuLabel();
}

function setupMenu() {
  navToggle.addEventListener("click", function () {
    setMenuOpen(!isMenuOpen());
  });

  // Clicking a link closes the menu
  header.addEventListener("click", function (event) {
    if (event.target.closest("a")) {
      setMenuOpen(false);
    }
  });

  // Escape closes the menu
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && isMenuOpen()) {
      setMenuOpen(false);
      navToggle.focus();
    }
  });

  // Close the menu on a wider screen
  window.matchMedia("(max-width: 768px)").addEventListener("change", function (event) {
    if (!event.matches) {
      setMenuOpen(false);
    }
  });

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
}

// Highlight the menu link of the current section
function setupActiveLinks() {
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;

      navLinks.forEach(function (link) {
        const isCurrent = link.getAttribute("href") === "#" + entry.target.id;
        link.classList.toggle("is-active", isCurrent);
        if (isCurrent) {
          link.setAttribute("aria-current", "location");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    });
  }, { rootMargin: "-45% 0px -50% 0px" });

  document.querySelectorAll("main section[id]").forEach(function (section) {
    observer.observe(section);
  });
}


/* Scroll animations --------------------------------------------------------- */

// Fade elements in when they scroll into view
function setupReveal() {
  const items = document.querySelectorAll(".reveal, .reveal-stagger");

  // Small delay between cards next to each other
  items.forEach(function (item) {
    if (item.classList.contains("reveal")) {
      const siblings = Array.from(item.parentElement.querySelectorAll(":scope > .reveal"));
      const position = Math.min(siblings.indexOf(item), 5);
      item.style.setProperty("--reveal-delay", position * 0.08 + "s");
    }

    if (item.classList.contains("reveal-stagger")) {
      Array.from(item.children).forEach(function (child, index) {
        child.style.setProperty("--stagger-index", index);
      });
    }
  });

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

  items.forEach(function (item) {
    observer.observe(item);
  });
}


/* Projects ------------------------------------------------------------------ */

// Click a small project card to show it as the big (featured) project
function setupProjects() {
  const grid = document.querySelector(".projects-grid");
  const badge = document.querySelector(".project-card__badge");

  grid.querySelectorAll(".project-card").forEach(function (card) {
    card.querySelector(".project-card__select").addEventListener("click", function () {
      const featured = grid.querySelector(".project-card--featured");
      if (card === featured) return;

      // Clicked card goes to the top, the old big card takes its place
      const next = card.nextElementSibling;
      featured.before(card);
      if (next) {
        next.before(featured);
      } else {
        grid.append(featured);
      }

      // Stop the scroll animation from playing again after moving
      featured.classList.remove("project-card--featured", "reveal");
      card.classList.remove("reveal");
      card.classList.add("project-card--featured");

      // The "Featured" label and the disabled button belong to the big card
      card.querySelector(".project-card__type").prepend(badge);
      featured.querySelector(".project-card__select").disabled = false;
      card.querySelector(".project-card__select").disabled = true;

      // Short fade
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        card.animate([{ opacity: 0 }, { opacity: 1 }], 350);
        featured.animate([{ opacity: 0 }, { opacity: 1 }], 350);
      }

      // Go to the new big card (also for keyboard users)
      card.tabIndex = -1;
      card.focus({ preventScroll: true });
      card.scrollIntoView();
    });
  });
}


/* Copy email ---------------------------------------------------------------- */

function updateCopyLabel() {
  const copied = copyButton.classList.contains("is-copied");
  copyButton.querySelector(".contact__copy-label").textContent =
    copied ? t("contact.copied") : t("contact.copy");
}

async function copyEmail() {
  const announcer = document.getElementById("copy-announcer");

  try {
    await navigator.clipboard.writeText(emailAddress.textContent.trim());
  } catch (error) {
    // Copy not allowed: select the address instead
    window.getSelection().selectAllChildren(emailAddress);
    return;
  }

  // Show "Copied!" for 2 seconds
  copyButton.classList.add("is-copied");
  updateCopyLabel();
  announcer.textContent = t("contact.copiedAnnounce");

  setTimeout(function () {
    copyButton.classList.remove("is-copied");
    updateCopyLabel();
    announcer.textContent = "";
  }, 2000);
}

function setupCopyEmail() {
  copyButton.addEventListener("click", copyEmail);
  copyButton.hidden = false;
}


/* Start ---------------------------------------------------------------------- */

setupReveal();
setupLanguage();
setupMenu();
setupActiveLinks();
setupProjects();
setupCopyEmail();
document.getElementById("year").textContent = new Date().getFullYear();

// Script ran without errors (see index.html)
document.documentElement.classList.add("js-ready");
