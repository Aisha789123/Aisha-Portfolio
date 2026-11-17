/**
 * Aisha — Portfolio
 * Language switch (EN/NL), mobile menu, header on scroll, active menu link,
 * scroll animations, copy email and the footer year. No libraries.
 */

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

// Text that this script creates itself (button labels), in the current language
function t(key) {
  return translations.ui[language][key];
}

// Remember the English text of every element that can be translated
function saveEnglishText() {
  document.querySelectorAll("[data-i18n]").forEach(function (element) {
    english[element.dataset.i18n] = element.innerHTML;
  });

  // data-i18n-attr="alt:farid.alt" translates an attribute instead of the text
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
        // Storage is blocked (e.g. private mode): the choice lasts for this visit
      }
    });
  });

  // Start in the language chosen on an earlier visit
  let savedLanguage = "en";
  try {
    savedLanguage = localStorage.getItem("portfolio-language") || "en";
  } catch (error) {
    // Storage is blocked: stay in English
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

  // While the menu is open, the page behind it can't be reached with Tab
  document.querySelector("main").inert = open;
  document.querySelector("footer").inert = open;

  updateMenuLabel();
}

function setupMenu() {
  navToggle.addEventListener("click", function () {
    setMenuOpen(!isMenuOpen());
  });

  // Clicking a link in the header (menu links and the logo) closes the menu
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

  // Close the menu when the window becomes wider than a phone
  window.matchMedia("(max-width: 768px)").addEventListener("change", function (event) {
    if (!event.matches) {
      setMenuOpen(false);
    }
  });

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
}

// Highlight the menu link of the section in the middle of the screen
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

// Elements with "reveal" fade in when they scroll into view.
// The children of a "reveal-stagger" element fade in one after another.
function setupReveal() {
  const items = document.querySelectorAll(".reveal, .reveal-stagger");

  // Visitors who prefer less motion see everything straight away
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    items.forEach(function (item) {
      item.classList.add("is-visible");
    });
    return;
  }

  // Small delay between cards that sit next to each other
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
    // Copying is not allowed: select the address so it can be copied by hand
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
  copyButton.hidden = false; // The button only works with JavaScript
}


/* Start ---------------------------------------------------------------------- */

setupReveal();
setupLanguage();
setupMenu();
setupActiveLinks();
setupCopyEmail();
document.getElementById("year").textContent = new Date().getFullYear();

// Tells the page that this script ran without errors (see the <head> of index.html)
document.documentElement.classList.add("js-ready");
