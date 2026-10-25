/* Nowframe site. Vanilla JS, no dependencies. */

/* ---------------------------------------------------------------------------------------------
   SITE CONFIG: the only place to change these.
   - APP_STORE_LIVE: set to true on launch day. Every "Coming soon" button becomes a download link.
   - SUPPORT_EMAIL: kept in two parts so the full address never appears in the HTML source.
     The no-JS fallback text in support.html, privacy.html and terms.html reads "mustafayev.t (at) outlook.com";
     change it there too if the address changes (search the site for data-email).
   --------------------------------------------------------------------------------------------- */
var SITE = {
  APP_STORE_LIVE: false,
  APP_STORE_URL: "https://apps.apple.com/app/id6826813297",
  SUPPORT_EMAIL: ["mustafayev.t", "outlook.com"]
};

(function () {
  "use strict";
  var doc = document.documentElement;
  doc.classList.add("js");
  if (SITE.APP_STORE_LIVE) doc.classList.add("app-live");

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* App Store buttons: a link only once the app is live. */
  function wireStore() {
    var els = document.querySelectorAll("[data-store-cta], [data-store-link]");
    els.forEach(function (el) {
      if (SITE.APP_STORE_LIVE) {
        el.setAttribute("href", SITE.APP_STORE_URL);
        el.removeAttribute("aria-disabled");
      } else {
        el.removeAttribute("href");
        if (el.hasAttribute("data-store-cta")) el.setAttribute("aria-disabled", "true");
      }
    });
  }

  /* Support email, assembled here so scrapers reading the HTML don't get it. */
  function wireEmail() {
    var address = SITE.SUPPORT_EMAIL.join("@");
    document.querySelectorAll("[data-email]").forEach(function (el) {
      var a = document.createElement("a");
      a.href = "mailto:" + address + (el.dataset.subject ? "?subject=" + encodeURIComponent(el.dataset.subject) : "");
      a.textContent = address;
      el.textContent = "";
      el.appendChild(a);
    });
  }

  /* Hero: the preview video with its own clip strip and playhead. */
  function wireReel() {
    var video = document.querySelector("[data-reel]");
    var scrubber = document.querySelector("[data-scrubber]");
    if (!video || !scrubber) return;
    var strip = scrubber.querySelector("[data-strip]");
    var head = scrubber.querySelector("[data-strip-playhead]");
    var playBtn = scrubber.querySelector("[data-reel-play]");
    var soundBtn = scrubber.querySelector("[data-reel-sound]");
    var tcSec = scrubber.querySelector("[data-tc-sec]");
    var tcFr = scrubber.querySelector("[data-tc-fr]");
    var duration = 23.2;
    var raf = 0;
    var userPaused = false;

    function pad(n) { return (n < 10 ? "0" : "") + n; }
    var intro = null;   // the first time the strip is seen, the playhead sweeps across and splits it at each cut
    function render() {
      if (intro) return;
      var t = video.currentTime || 0;
      var d = video.duration || duration;
      var w = strip.clientWidth;
      head.style.transform = "translateX(" + (Math.min(t / d, 1) * w).toFixed(1) + "px)";
      var s = Math.floor(t);
      tcSec.textContent = pad(Math.floor(s / 60)) + ":" + pad(s % 60);
      tcFr.textContent = "." + pad(Math.floor((t - s) * 30));
      strip.setAttribute("aria-valuenow", s);
      strip.setAttribute("aria-valuetext", s + " seconds");
    }
    function loop() { render(); raf = video.paused ? 0 : requestAnimationFrame(loop); }
    function start() { if (!raf) raf = requestAnimationFrame(loop); }

    function setPausedUI(paused) {
      scrubber.classList.toggle("is-paused", paused);
      playBtn.setAttribute("aria-label", paused ? "Play the preview" : "Pause the preview");
    }
    video.addEventListener("play", function () { setPausedUI(false); start(); });
    video.addEventListener("pause", function () { setPausedUI(true); render(); });
    video.addEventListener("seeked", render);
    video.addEventListener("loadedmetadata", function () { duration = video.duration || duration; render(); });
    window.addEventListener("resize", render);

    function tryPlay() {
      var p = video.play();
      if (p && p.catch) p.catch(function () { setPausedUI(true); });
    }
    if (reduceMotion.matches) {
      video.removeAttribute("autoplay");
      video.pause();
      setPausedUI(true);
    } else if (video.paused) {
      setPausedUI(true);
      tryPlay();
    } else {
      start();
    }

    playBtn.addEventListener("click", function () {
      if (video.paused) { userPaused = false; tryPlay(); } else { userPaused = true; video.pause(); }
    });
    soundBtn.addEventListener("click", function () {
      video.muted = !video.muted;
      soundBtn.setAttribute("aria-pressed", String(!video.muted));
      soundBtn.setAttribute("aria-label", video.muted ? "Turn sound on" : "Turn sound off");
      if (!video.muted && video.paused) { userPaused = false; tryPlay(); }
    });

    function seekToClientX(x) {
      var r = strip.getBoundingClientRect();
      var f = Math.max(0, Math.min(1, (x - r.left) / r.width));
      video.currentTime = f * (video.duration || duration);
      render();
    }
    var dragging = false;
    strip.addEventListener("pointerdown", function (e) {
      dragging = true; strip.setPointerCapture(e.pointerId); seekToClientX(e.clientX);
    });
    strip.addEventListener("pointermove", function (e) { if (dragging) seekToClientX(e.clientX); });
    strip.addEventListener("pointerup", function () { dragging = false; });
    strip.addEventListener("pointercancel", function () { dragging = false; });
    strip.addEventListener("keydown", function (e) {
      var step = { ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1 }[e.key];
      if (e.key === "Home") { video.currentTime = 0; e.preventDefault(); }
      else if (e.key === "End") { video.currentTime = (video.duration || duration) - 0.1; e.preventDefault(); }
      else if (step) { video.currentTime = Math.max(0, video.currentTime + step); e.preventDefault(); }
      render();
    });

    function runIntro() {
      var clips = Array.prototype.slice.call(strip.querySelectorAll(".strip__clip"));
      var w = strip.clientWidth, t0 = performance.now(), dur = 640;
      intro = true;
      function step(now) {
        var k = Math.min(1, (now - t0) / dur);
        var e = 1 - Math.pow(1 - k, 3);
        var x = e * w;
        head.style.transform = "translateX(" + x.toFixed(1) + "px)";
        clips.forEach(function (c) { if (c.offsetLeft <= x + 1) c.classList.add("is-split"); });
        if (k < 1) requestAnimationFrame(step);
        else { intro = null; strip.classList.remove("strip--intro"); render(); }
      }
      requestAnimationFrame(step);
    }
    if (!reduceMotion.matches && "IntersectionObserver" in window) {
      strip.classList.add("strip--intro");
      var introObs = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) { introObs.disconnect(); setTimeout(runIntro, 250); }
      }, { threshold: 0.9 });
      introObs.observe(strip);
    }

    /* Save battery: pause while the hero is off screen, unless the visitor paused it. */
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { if (!userPaused && !reduceMotion.matches && video.paused) tryPlay(); }
          else if (!video.paused) video.pause();
        });
      }, { threshold: 0.05 }).observe(video);
    }
    render();
  }

  /* Header: the page as a timeline. Each section is a clip sized by its height; the playhead follows the scroll
     and snaps onto a cut when it's close, like the editor does. */
  function wireEditbar() {
    var bar = document.querySelector("[data-editbar]");
    if (!bar) return;
    var track = bar.querySelector(".editbar__track");
    var head = bar.querySelector(".editbar__playhead");
    var clips = Array.prototype.slice.call(bar.querySelectorAll(".editbar__clip"));
    var sections = clips.map(function (c) { return document.getElementById(c.dataset.target); });
    var bounds = [];   // [start, end] of each section in document px
    var cuts = [];     // x of each clip edge in track px
    var ticking = false;

    function measure() {
      var y = window.scrollY;
      bounds = sections.map(function (s, i) {
        var top = s ? s.getBoundingClientRect().top + y : 0;
        return top;
      });
      var docEnd = document.documentElement.scrollHeight;
      var lens = bounds.map(function (top, i) {
        var next = i + 1 < bounds.length ? bounds[i + 1] : docEnd;
        return Math.max(1, next - top);
      });
      clips.forEach(function (c, i) { c.style.flexGrow = lens[i].toFixed(0); });
      update();
    }
    function update() {
      ticking = false;
      var y = window.scrollY;
      var max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      var p = Math.min(1, Math.max(0, y / max));
      var w = track.clientWidth;
      cuts = [0];
      clips.forEach(function (c) { cuts.push(c.offsetLeft + c.offsetWidth); });
      var x = p * w;
      for (var i = 0; i < cuts.length; i++) {
        if (Math.abs(cuts[i] - x) < 5) { x = cuts[i]; break; }   // snap
      }
      head.style.transform = "translateX(" + x.toFixed(1) + "px)";
      clips.forEach(function (c) {
        c.classList.toggle("is-played", c.offsetLeft + c.offsetWidth <= x + 1);
      });
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    window.addEventListener("resize", measure);
    window.addEventListener("load", measure);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
    measure();
  }

  /* Feature clips: load only when near, play only while in view. On wide screens all clips play in one sticky
     monitor and switch with a hard cut as each feature reaches the middle of the screen. */
  function wireTour() {
    var tour = document.querySelector(".tour");
    if (!tour) return;
    var monitor = tour.querySelector("[data-monitor-screen]");
    var cutsEls = Array.prototype.slice.call(tour.querySelectorAll("[data-cut]"));
    var figures = cutsEls.map(function (c) { return c.querySelector("[data-figure]"); });
    var wide = window.matchMedia("(min-width: 960px)");
    var active = -1;

    function load(fig) {
      var v = fig && fig.querySelector("video[data-src]");
      if (v) { v.src = v.dataset.src; v.removeAttribute("data-src"); }
    }
    function play(fig) {
      var v = fig && fig.querySelector("video");
      if (!v) return;
      load(fig);
      if (reduceMotion.matches) return;
      var p = v.play(); if (p && p.catch) p.catch(function () {});
    }
    function stop(fig) {
      var v = fig && fig.querySelector("video");
      if (v && !v.paused) v.pause();
    }

    /* Reduced motion: clips wait for a tap. */
    figures.forEach(function (fig) {
      var v = fig.querySelector("video");
      if (!v) return;
      fig.addEventListener("click", function () {
        load(fig);
        if (v.paused) { var p = v.play(); if (p && p.catch) p.catch(function () {}); } else v.pause();
      });
      if (reduceMotion.matches) { fig.classList.add("screen--hint"); fig.title = "Tap to play"; }
    });

    function layout() {
      if (wide.matches) {
        tour.classList.add("has-monitor");
        figures.forEach(function (f) { monitor.appendChild(f); });
        setActive(active < 0 ? 0 : active, true);
      } else {
        tour.classList.remove("has-monitor");
        figures.forEach(function (f, i) { cutsEls[i].appendChild(f); f.classList.remove("is-on"); });
      }
    }
    function setActive(i, force) {
      if (i === active && !force) return;
      figures.forEach(function (f, j) {
        var on = j === i;
        f.classList.toggle("is-on", on);
        if (on) play(f); else stop(f);
      });
      active = i;
      if (figures[i + 1]) load(figures[i + 1]);   // warm the next clip
    }

    if (!("IntersectionObserver" in window)) {
      figures.forEach(load);
      return;
    }

    /* Wide: the feature crossing the middle of the viewport wins. */
    var middle = new IntersectionObserver(function (entries) {
      if (!wide.matches) return;
      entries.forEach(function (en) {
        if (en.isIntersecting) setActive(cutsEls.indexOf(en.target));
      });
    }, { rootMargin: "-50% 0px -50% 0px", threshold: 0 });
    cutsEls.forEach(function (c) { middle.observe(c); });

    /* Wide: pause the monitor when the whole tour is off screen. */
    new IntersectionObserver(function (entries) {
      if (!wide.matches) return;
      entries.forEach(function (en) {
        if (!en.isIntersecting) figures.forEach(stop);
        else if (active >= 0) play(figures[active]);
      });
    }).observe(tour);

    /* Narrow: each inline clip loads when near and plays while visible. */
    var near = new IntersectionObserver(function (entries) {
      if (wide.matches) return;
      entries.forEach(function (en) { if (en.isIntersecting) load(en.target); });
    }, { rootMargin: "600px 0px" });
    var seen = new IntersectionObserver(function (entries) {
      if (wide.matches) return;
      entries.forEach(function (en) { if (en.isIntersecting) play(en.target); else stop(en.target); });
    }, { threshold: 0.35 });
    figures.forEach(function (f) { near.observe(f); seen.observe(f); });

    if (wide.addEventListener) wide.addEventListener("change", layout); else wide.addListener(layout);
    layout();
  }

  function init() {
    wireStore();
    wireEmail();
    wireReel();
    wireEditbar();
    wireTour();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
