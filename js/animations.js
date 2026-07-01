/* APP Merchant Services — Homepage scroll & load animations
   Vanilla JS only. No dependencies.
   All initial/hidden states live in CSS behind html.anim-ready,
   which is added below. If this script never runs (or the user
   prefers reduced motion), that class is never added and every
   element stays in its natural, fully visible state. */

(function () {
  'use strict';

  var reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Honor reduced-motion: leave the page static and fully visible.
  if (reduceMotion) return;

  var docEl = document.documentElement;
  // Gate every hidden state. Added synchronously (this script sits at the
  // bottom of <body>) so below-fold content is hidden before it paints.
  docEl.classList.add('anim-ready');

  function onReady(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  // ---- ANIMATION 1: Hero headline / copy load stagger ----
  function revealHero() {
    var items = document.querySelectorAll('.phHero .heroAnim');
    // Double rAF guarantees the hidden state is committed before we flip
    // to .is-visible, so the transition actually plays.
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        items.forEach(function (el) { el.classList.add('is-visible'); });
      });
    });
  }

  // ---- ANIMATION 5 helper: two-digit count up ----
  function animateCounter(element, target, duration, delay) {
    setTimeout(function () {
      var start = 0;
      var increment = target / (duration / 16);
      var timer = setInterval(function () {
        start += increment;
        if (start >= target) {
          element.textContent = target.toString().padStart(2, '0');
          clearInterval(timer);
        } else {
          element.textContent = Math.floor(start).toString().padStart(2, '0');
        }
      }, 16);
    }, delay);
  }

  // ---- ANIMATION 4: "Sound Familiar?" quote stagger ----
  function staggerQuotes(section) {
    var quotes = section.querySelectorAll('.quoteAnim');
    var delays = [0, 150, 300];
    quotes.forEach(function (q, i) {
      q.style.transitionDelay = (delays[i] != null ? delays[i] : i * 150) + 'ms';
      q.classList.add('is-visible');
    });
  }

  // ---- ANIMATION 6: "Who We Serve" list stagger ----
  function staggerServe(section) {
    var items = section.querySelectorAll('.serveAnim');
    var delays = [100, 250, 400];
    items.forEach(function (el, i) {
      el.style.transitionDelay = (delays[i] != null ? delays[i] : i * 150) + 'ms';
      el.classList.add('is-visible');
    });
  }

  // ---- ANIMATION 5: "How It Works" step number count up ----
  function runStepCounters(section) {
    var nums = section.querySelectorAll('.phStepNum');
    nums.forEach(function (el, i) {
      var target = parseInt(el.getAttribute('data-count'), 10) || 0;
      animateCounter(el, target, 800, i * 100);
    });
  }

  // ---- CONCEPT B: "Live Transaction" card (DESIGN_BRIEF §5) ----
  // A pharmacy order toast slides in, processes, then settles, looping
  // through realistic orders. Runs only while the card is in view.
  function initLiveTransactionCard() {
    var host = document.querySelector('.hpCardVisual--live');
    if (!host) return;
    var row = host.querySelector('.ltxRow');
    var nameEl = host.querySelector('[data-ltx-name]');
    var amtEl = host.querySelector('[data-ltx-amt]');
    var stateEl = host.querySelector('[data-ltx-state]');
    if (!row || !nameEl || !amtEl || !stateEl) return;

    var orders = [
      { name: 'Semaglutide Rx',   amt: '$84.50'  },
      { name: 'Tirzepatide Rx',   amt: '$129.00' },
      { name: 'Tadalafil Rx',     amt: '$42.75'  },
      { name: 'Compounded NAD+',  amt: '$96.20'  },
      { name: 'Metformin refill', amt: '$58.00'  }
    ];
    var PROCESSING = '<span class="ltxDots"><span></span><span></span><span></span></span><span class="ltxStateTxt">Processing</span>';
    var PROCESSED = '<svg class="ltxCheck" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg><span class="ltxStateTxt">Processed</span>';

    var i = 0, running = false, timers = [];
    function later(fn, ms) { timers.push(setTimeout(fn, ms)); }
    function clearTimers() { timers.forEach(clearTimeout); timers = []; }

    function paintOrder() {
      var o = orders[i % orders.length];
      i++;
      nameEl.textContent = o.name;
      amtEl.textContent = o.amt;
      stateEl.className = 'ltxState is-processing';
      stateEl.innerHTML = PROCESSING;
    }
    function settle() {
      if (!running) return;
      stateEl.className = 'ltxState is-processed';
      stateEl.innerHTML = PROCESSED;
    }
    // Advance to the next order: dip the tile, swap its content at the faint
    // low point, then let it settle back. The row is never emptied or removed.
    function swap() {
      if (!running) return;
      row.classList.add('is-swap');
      later(function () {
        if (!running) return;
        paintOrder();
        row.classList.remove('is-swap');
        later(settle, 950);
        later(swap, 2600);
      }, 180);
    }
    function start() {
      if (!running) return;
      paintOrder();
      later(settle, 950);
      later(swap, 2600);
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          if (!running) { running = true; start(); }
        } else if (running) {
          running = false;
          clearTimers();
        }
      });
    }, { threshold: 0.3 });
    io.observe(host);
  }

  // ---- CONCEPT A: "Payment Journey" card (DESIGN_BRIEF §5) ----
  // A payment travels from a patient to the pharmacy and settles. The origin
  // rotates through six cities so the loop stays visually fresh; the pharmacy
  // destination is fixed. Each journey is one .pj-go cycle (CSS handles the
  // 4s draw/travel/settle); JS repositions the origin + rebuilds the arc, then
  // restarts the cycle. Runs only while the card is on screen.
  function initPaymentJourneyCard() {
    var host = document.querySelector('.hpCardVisual--map');
    if (!host) return;
    var arc = host.querySelector('.pjArc');
    var pulse = host.querySelector('.pjPulse');
    var glow = host.querySelector('.pjPulseGlow');
    var nodeA = host.querySelector('.pjNodeA');
    var labelA = host.querySelector('.pjLabelA');
    if (!arc || !pulse || !glow || !nodeA || !labelA) return;

    var DEST = { x: 880, y: 505 };
    // Coordinates are in the inlined map's viewBox (0..1024). cx/cy = the arc's
    // control point (bow); ly = the "Patient" label's y (below or above node).
    var origins = [
      { x: 155, y: 588, cx: 520, cy: 405, ly: 648 }, // Los Angeles
      { x: 150, y: 340, cx: 520, cy: 285, ly: 318 }, // Seattle
      { x: 902, y: 378, cx: 965, cy: 420, ly: 350 }, // Boston
      { x: 858, y: 772, cx: 970, cy: 655, ly: 812 }, // Miami
      { x: 705, y: 432, cx: 800, cy: 352, ly: 404 }, // Detroit
      { x: 468, y: 700, cx: 675, cy: 560, ly: 748 }  // Houston
    ];

    var idx = 0, running = false, timer = null;

    function place(o) {
      nodeA.setAttribute('transform', 'translate(' + o.x + ' ' + o.y + ')');
      labelA.setAttribute('x', o.x);
      labelA.setAttribute('y', o.ly);
      var d = 'M' + o.x + ' ' + o.y + ' Q' + o.cx + ' ' + o.cy + ' ' + DEST.x + ' ' + DEST.y;
      arc.setAttribute('d', d);
      var p = "path('" + d + "')";
      pulse.style.offsetPath = p;
      glow.style.offsetPath = p;
    }

    function step() {
      if (!running) return;
      place(origins[idx % origins.length]);
      idx++;
      // Restart the CSS cycle from 0.
      host.classList.remove('pj-go');
      void host.offsetWidth;
      host.classList.add('pj-go');
      timer = setTimeout(step, 4100);
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          if (!running) { running = true; idx = 0; step(); }
        } else if (running) {
          running = false;
          clearTimeout(timer);
          host.classList.remove('pj-go');
        }
      });
    }, { threshold: 0.35 });
    io.observe(host);
  }

  // ---- Compliance checklist reveal (Phase 4 revision) ----
  // The four credentials appear one at a time and each checkbox lights up
  // green, then it holds, resets, and replays while the card is in view.
  function initComplianceChecklist() {
    var host = document.querySelector('.hpCardVisual--checklist');
    if (!host) return;
    var items = host.querySelectorAll('.ckItem');
    if (!items.length) return;
    var running = false, timers = [];
    function later(fn, ms) { timers.push(setTimeout(fn, ms)); }
    function clearTimers() { timers.forEach(clearTimeout); timers = []; }

    function run() {
      if (!running) return;
      items.forEach(function (el) { el.classList.remove('is-in', 'is-lit'); });
      items.forEach(function (el, i) {
        var t = 350 + i * 520;
        later(function () { if (running) el.classList.add('is-in'); }, t);        // line appears
        later(function () { if (running) el.classList.add('is-lit'); }, t + 300); // check lights up
      });
      later(run, 350 + items.length * 520 + 300 + 2600); // reveal + hold, then replay
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          if (!running) { running = true; run(); }
        } else if (running) {
          running = false;
          clearTimers();
        }
      });
    }, { threshold: 0.4 });
    io.observe(host);
  }

  // ---- CONCEPT D: accepted-networks trust bar stagger (DESIGN_BRIEF §5) ----
  function initTrustBar() {
    var bar = document.querySelector('.netBar');
    if (!bar) return;
    var logos = bar.querySelectorAll('.network-logo');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        logos.forEach(function (logo, idx) {
          logo.style.transitionDelay = (idx * 100) + 'ms';
          logo.classList.add('is-in');
        });
        io.disconnect();
      });
    }, { threshold: 0.4 });
    io.observe(bar);
  }

  // ---- ANIMATION 3: section reveal on scroll ----
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      el.classList.add('section-visible');

      // Section-specific sub-animations, fired the moment the section reveals.
      if (el.classList.contains('phPain'))  staggerQuotes(el);
      if (el.classList.contains('phServe')) staggerServe(el);
      if (el.classList.contains('phSteps')) runStepCounters(el);

      observer.unobserve(el); // animate once
    });
  }, { threshold: 0.12 });

  onReady(function () {
    revealHero();
    initLiveTransactionCard();
    initPaymentJourneyCard();
    initComplianceChecklist();
    initTrustBar();

    // Seed the step numbers at "00" so the count-up has a visible start.
    document.querySelectorAll('.phSteps .phStepNum').forEach(function (el) {
      el.textContent = '00';
    });

    document.querySelectorAll('[data-animate]').forEach(function (el) {
      observer.observe(el);
    });

    // ---- ANIMATION 2: hero parallax (vertical only) ----
    // X position stays at 65% (set in CSS); we only nudge Y, so this never
    // introduces horizontal scroll.
    var heroBg = document.querySelector('.phHeroBg');
    if (heroBg) {
      var ticking = false;
      window.addEventListener('scroll', function () {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(function () {
          var scrolled = window.scrollY || window.pageYOffset || 0;
          heroBg.style.backgroundPositionY = 'calc(50% + ' + (scrolled * 0.4) + 'px)';
          ticking = false;
        });
      }, { passive: true });
    }
  });
})();
