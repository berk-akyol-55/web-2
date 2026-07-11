/* =========================================
   Akyol Yapı & Dekorasyon — Etkileşimler
   ========================================= */
(function () {
  "use strict";

  /* --- Yıl (footer) --- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* --- Header scroll efekti --- */
  var header = document.getElementById("header");
  function onScroll() {
    if (window.scrollY > 40) header.classList.add("is-scrolled");
    else header.classList.remove("is-scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* --- Mobil menü --- */
  var navToggle = document.getElementById("navToggle");
  var nav = document.getElementById("nav");
  function closeNav() {
    nav.classList.remove("is-open");
    navToggle.classList.remove("is-open");
  }
  navToggle.addEventListener("click", function () {
    nav.classList.toggle("is-open");
    navToggle.classList.toggle("is-open");
  });
  nav.querySelectorAll(".nav__link").forEach(function (link) {
    link.addEventListener("click", closeNav);
  });

  /* --- Aktif menü vurgusu (scroll-spy) --- */
  var sections = document.querySelectorAll("section[id]");
  var navLinks = document.querySelectorAll(".nav__link");
  function spy() {
    var pos = window.scrollY + 120;
    sections.forEach(function (sec) {
      var top = sec.offsetTop;
      var bottom = top + sec.offsetHeight;
      var id = sec.getAttribute("id");
      var link = document.querySelector('.nav__link[href="#' + id + '"]');
      if (!link) return;
      if (pos >= top && pos < bottom) {
        navLinks.forEach(function (l) { l.classList.remove("is-active"); });
        link.classList.add("is-active");
      }
    });
  }
  window.addEventListener("scroll", spy, { passive: true });
  spy();

  /* --- Reveal on scroll (IntersectionObserver) --- */
  var revealEls = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el, i) {
      el.style.transitionDelay = (i % 4) * 80 + "ms";
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* --- İstatistik sayaç animasyonu --- */
  var counters = document.querySelectorAll(".stat__num");
  var counted = false;
  function runCounters() {
    if (counted) return;
    var hero = document.querySelector(".hero__stats");
    if (!hero) return;
    var rect = hero.getBoundingClientRect();
    if (rect.top > window.innerHeight) return;
    counted = true;
    counters.forEach(function (el) {
      var target = parseInt(el.getAttribute("data-count"), 10) || 0;
      var start = 0;
      var duration = 1600;
      var startTime = null;
      function step(ts) {
        if (!startTime) startTime = ts;
        var progress = Math.min((ts - startTime) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * (target - start) + start);
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target;
      }
      requestAnimationFrame(step);
    });
  }
  window.addEventListener("scroll", runCounters, { passive: true });
  runCounters();

  /* --- Proje filtreleme --- */
  var filterBtns = document.querySelectorAll(".filter__btn");
  var projects = document.querySelectorAll(".project");
  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filterBtns.forEach(function (b) { b.classList.remove("is-active"); });
      btn.classList.add("is-active");
      var filter = btn.getAttribute("data-filter");
      projects.forEach(function (p) {
        var cat = p.getAttribute("data-category");
        var show = filter === "all" || cat === filter;
        p.classList.toggle("is-hidden", !show);
      });
    });
  });

  /* --- İletişim formu --- */
  var form = document.getElementById("contactForm");
  var status = document.getElementById("formStatus");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var message = form.message.value.trim();
      var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!name || !emailOk || !message) {
        status.textContent = "Lütfen ad, geçerli e-posta ve mesaj alanlarını doldurun.";
        status.className = "form__status is-err";
        return;
      }
      status.textContent = "Teşekkürler " + name + "! Talebiniz alındı, en kısa sürede dönüş yapacağız.";
      status.className = "form__status is-ok";
      form.reset();
    });
  }
})();
