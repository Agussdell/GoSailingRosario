/**
 * main.js — GoSailingRosario
 * Vanilla JS, sin dependencias externas. Lee los datos comerciales
 * desde lib/content.js (window.__BRAND__).
 */
(function () {
  "use strict";

  var $ = function (sel, scope) { return (scope || document).querySelector(sel); };
  var $$ = function (sel, scope) { return Array.prototype.slice.call((scope || document).querySelectorAll(sel)); };

  function safe(fn, name) {
    try { fn(); } catch (e) { console.warn("[" + name + "] failed:", e); }
  }

  var BRAND = window.__BRAND__ || null;

  // ---------------------------------------------------------------
  // Header: sólido al scrollear
  // ---------------------------------------------------------------
  function initHeader() {
    var header = $("#site-header");
    if (!header) return;
    var onScroll = function () {
      if (window.scrollY > 40) header.classList.add("is-scrolled");
      else header.classList.remove("is-scrolled");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // ---------------------------------------------------------------
  // Menú móvil
  // ---------------------------------------------------------------
  function initMobileMenu() {
    var toggle = $("#menu-toggle");
    var menu = $("#mobile-menu");
    var backdrop = $("#mobile-menu-backdrop");
    if (!toggle || !menu || !backdrop) return;

    // Estado inicial: cerrado y oculto para lectores de pantalla.
    // Se define acá (no en el HTML) para que, si JS no corre, el
    // menú quede visible y anunciado en vez de marcado como oculto.
    menu.setAttribute("aria-hidden", "true");

    function open() {
      menu.classList.add("is-open");
      backdrop.hidden = false;
      requestAnimationFrame(function () { backdrop.classList.add("is-visible"); });
      toggle.setAttribute("aria-expanded", "true");
      menu.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }
    function close() {
      menu.classList.remove("is-open");
      backdrop.classList.remove("is-visible");
      toggle.setAttribute("aria-expanded", "false");
      menu.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      setTimeout(function () { backdrop.hidden = true; }, 350);
    }

    toggle.addEventListener("click", function () {
      var isOpen = menu.classList.contains("is-open");
      if (isOpen) close(); else open();
    });
    backdrop.addEventListener("click", close);
    $$("a", menu).forEach(function (a) { a.addEventListener("click", close); });
    window.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });
  }

  // ---------------------------------------------------------------
  // Enlaces de WhatsApp (todos los .js-wa-link)
  // ---------------------------------------------------------------
  function initWhatsappLinks() {
    if (!BRAND) return;
    var link = BRAND.contact.waLink();
    $$(".js-wa-link").forEach(function (a) {
      if (!a.id || a.id !== "calc-wa-btn") a.href = link;
    });
  }

  // ---------------------------------------------------------------
  // Calculadora de precio
  // ---------------------------------------------------------------
  function initPriceCalc() {
    if (!BRAND) return;
    var root = $("#price-calc");
    if (!root) return;

    var minus = $("#calc-minus", root);
    var plus = $("#calc-plus", root);
    var countEl = $("#calc-count", root);
    var countLabelEl = $("#calc-count-label", root);
    var totalEl = $("#calc-total", root);
    var noteEl = $("#calc-note", root);
    var waBtn = $("#calc-wa-btn", root);

    var MIN = 1;
    var MAX = BRAND.trip.maxCapacity;
    var count = 2;

    function render() {
      countEl.textContent = count;
      countLabelEl.textContent = count === 1 ? "persona" : "personas";
      var total = BRAND.trip.priceForGroup(count);
      totalEl.textContent = BRAND.trip.formatARS(total);
      noteEl.textContent = count < BRAND.trip.minBillablePax
        ? "Equivale a " + BRAND.trip.minBillablePax + " pasajeros (mínimo facturable)"
        : "Total del paseo privado (3 horas)";

      minus.disabled = count <= MIN;
      plus.disabled = count >= MAX;

      var msg = "Hola, quiero consultar por un paseo en velero para " +
        count + (count === 1 ? " persona" : " personas") +
        " (aprox. " + BRAND.trip.formatARS(total) + ").";
      waBtn.href = BRAND.contact.waLink(msg);
    }

    minus.addEventListener("click", function () {
      if (count > MIN) { count--; render(); }
    });
    plus.addEventListener("click", function () {
      if (count < MAX) { count++; render(); }
    });

    render();
  }

  // ---------------------------------------------------------------
  // Reveal on scroll
  // ---------------------------------------------------------------
  function initReveals() {
    var els = $$("[data-reveal]");
    if (!els.length) return;

    if (!window.IntersectionObserver) {
      els.forEach(function (el) { el.classList.add("is-revealed"); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: "0px 0px -2% 0px" });

    els.forEach(function (el) { io.observe(el); });

    // Red de seguridad: si algo quedó oculto, se muestra igual.
    setTimeout(function () {
      $$("[data-reveal]:not(.is-revealed)").forEach(function (el) {
        if (el.getBoundingClientRect().top < window.innerHeight) {
          el.classList.add("is-revealed");
        }
      });
    }, 6000);
  }

  // ---------------------------------------------------------------
  // Galería + lightbox
  // ---------------------------------------------------------------
  function initGalleryLightbox() {
    var items = $$(".gallery-item");
    var lightbox = $("#lightbox");
    if (!items.length || !lightbox) return;

    var imgEl = $("#lightbox-img", lightbox);
    var closeBtn = $("#lightbox-close", lightbox);
    var prevBtn = $("#lightbox-prev", lightbox);
    var nextBtn = $("#lightbox-next", lightbox);
    var current = 0;

    function show(index) {
      current = (index + items.length) % items.length;
      var img = items[current].querySelector("img");
      imgEl.src = img.src;
      imgEl.alt = img.alt || "";
    }
    function open(index) {
      show(index);
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }
    function close() {
      lightbox.classList.remove("is-open");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }

    items.forEach(function (item, index) {
      item.addEventListener("click", function () { open(index); });
    });
    closeBtn.addEventListener("click", close);
    prevBtn.addEventListener("click", function () { show(current - 1); });
    nextBtn.addEventListener("click", function () { show(current + 1); });
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) close();
    });
    window.addEventListener("keydown", function (e) {
      if (!lightbox.classList.contains("is-open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(current - 1);
      if (e.key === "ArrowRight") show(current + 1);
    });
  }

  // ---------------------------------------------------------------
  // Footer: año actual
  // ---------------------------------------------------------------
  function initFooterYear() {
    var el = $("#footer-year");
    if (el) el.textContent = new Date().getFullYear();
  }

  function boot() {
    safe(initHeader, "initHeader");
    safe(initMobileMenu, "initMobileMenu");
    safe(initWhatsappLinks, "initWhatsappLinks");
    safe(initPriceCalc, "initPriceCalc");
    safe(initReveals, "initReveals");
    safe(initGalleryLightbox, "initGalleryLightbox");
    safe(initFooterYear, "initFooterYear");
    document.documentElement.classList.add("is-ready");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
