/* Foodport.my — interactions */
(function () {
  "use strict";

  var nav = document.querySelector(".nav");
  var burger = document.getElementById("burger");
  var links = document.getElementById("navLinks");

  /* ---------- sticky nav shadow ---------- */
  function onScroll() {
    nav.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- mobile menu ---------- */
  function closeMenu() {
    nav.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
  }
  burger.addEventListener("click", function () {
    var open = nav.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", String(open));
  });
  links.addEventListener("click", function (e) {
    if (e.target.closest("a")) closeMenu();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMenu();
  });

  /* ---------- menu tabs ---------- */
  var tabs = Array.prototype.slice.call(document.querySelectorAll(".tab"));
  function activate(tab, focus) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.classList.toggle("is-active", on);
      t.setAttribute("aria-selected", String(on));
      t.tabIndex = on ? 0 : -1;
      var panel = document.getElementById(t.getAttribute("aria-controls"));
      panel.hidden = !on;
      panel.classList.toggle("is-active", on);
    });
    if (focus) tab.focus();
  }
  tabs.forEach(function (tab, i) {
    tab.tabIndex = i === 0 ? 0 : -1;
    tab.addEventListener("click", function () { activate(tab); });
    tab.addEventListener("keydown", function (e) {
      var idx = null;
      if (e.key === "ArrowRight") idx = (i + 1) % tabs.length;
      if (e.key === "ArrowLeft") idx = (i - 1 + tabs.length) % tabs.length;
      if (e.key === "Home") idx = 0;
      if (e.key === "End") idx = tabs.length - 1;
      if (idx !== null) { e.preventDefault(); activate(tabs[idx], true); }
    });
  });

  /* ---------- reveal on scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ---------- active nav link ---------- */
  var navLinks = Array.prototype.slice.call(links.querySelectorAll("a"));
  if ("IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = "#" + entry.target.id;
        navLinks.forEach(function (a) {
          a.classList.toggle("is-current", a.getAttribute("href") === id);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    navLinks.forEach(function (a) {
      var sec = document.querySelector(a.getAttribute("href"));
      if (sec) spy.observe(sec);
    });
  }

  /* ---------- language toggle (BM <-> EN) ---------- */
  var langBtn = document.getElementById("langToggle");
  var translatable = document.querySelectorAll("[data-en]");
  translatable.forEach(function (el) { el.setAttribute("data-ms", el.innerHTML.trim()); });

  function setLang(lang) {
    translatable.forEach(function (el) {
      if (lang === "en") el.textContent = el.getAttribute("data-en");
      else el.innerHTML = el.getAttribute("data-ms");
    });
    document.documentElement.lang = lang === "en" ? "en" : "ms";
    langBtn.textContent = lang === "en" ? "BM" : "EN";
    try { localStorage.setItem("fp-lang", lang); } catch (e) { /* ignore */ }
  }
  langBtn.addEventListener("click", function () {
    setLang(document.documentElement.lang === "en" ? "ms" : "en");
  });
  try {
    if (localStorage.getItem("fp-lang") === "en") setLang("en");
  } catch (e) { /* ignore */ }

  /* ---------- footer year ---------- */
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
