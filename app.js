/* ideyaLabs Transportation AI Roadmap — interactivity
   All figures below are transcribed from the source roadmap document
   (ideyaLabs_Transportation_AI_Priority_Roadmap). No values are invented. */

/* ---------- Theme toggle (default OS, manual override persisted) ---------- */
(function () {
  var root = document.documentElement;
  function apply(t) {
    root.setAttribute("data-theme", t);
    var btn = document.getElementById("themeToggle");
    if (btn) {
      btn.textContent = t === "dark" ? "\u2600\uFE0F" : "\uD83C\uDF19";
      btn.setAttribute("aria-label", t === "dark" ? "Switch to light theme" : "Switch to dark theme");
    }
  }
  var saved = null;
  try { saved = localStorage.getItem("theme"); } catch (e) {}
  var prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  apply(saved || (prefersDark ? "dark" : "light"));
  window.addEventListener("DOMContentLoaded", function () {
    var btn = document.getElementById("themeToggle");
    apply(root.getAttribute("data-theme")); // set icon
    if (btn) btn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      apply(next);
      try { localStorage.setItem("theme", next); } catch (e) {}
    });
  });
})();

/* ---------- Scorecard data (18 consolidated products) ---------- */
/* Weights: Impact 20, AI-Diff 15, Revenue 15, Market 10, Whitespace 10,
   Speed 10, Feasibility 10, Reusability 5, Cross-sell 5 (Section 8). */
var SCORECARD = [
  { rank:1,  name:"Invoice Audit & Payment Agent",        cls:"agent",    impact:9, ai:8, rev:9, market:9, white:7, speed:8, feas:8, reuse:8, cross:9, score:8.40, tier:1 },
  { rank:2,  name:"Shipment Exception Mgmt Agent",         cls:"agent",    impact:9, ai:9, rev:8, market:10,white:7, speed:6, feas:6, reuse:10,cross:9, score:8.20, tier:1 },
  { rank:3,  name:"Freight Claims Mgmt & Recovery Agent",  cls:"agent",    impact:8, ai:8, rev:7, market:7, white:9, speed:8, feas:8, reuse:7, cross:8, score:7.80, tier:1 },
  { rank:4,  name:"Carrier Fraud & Onboarding Agent",      cls:"agent",    impact:8, ai:8, rev:7, market:8, white:8, speed:7, feas:7, reuse:7, cross:8, score:7.60, tier:2 },
  { rank:5,  name:"Dynamic Freight Procurement Agent",     cls:"agent",    impact:8, ai:7, rev:8, market:8, white:7, speed:6, feas:6, reuse:6, cross:6, score:7.15, tier:2 },
  { rank:6,  name:"Detention & Dock Coordination Agent",   cls:"agent",    impact:8, ai:7, rev:7, market:7, white:7, speed:6, feas:6, reuse:6, cross:6, score:6.90, tier:2 },
  { rank:7,  name:"FreightLink \u2014 Visibility Hub",     cls:"assisted", impact:7, ai:4, rev:7, market:8, white:5, speed:7, feas:7, reuse:10,cross:9, score:6.70, tier:2 },
  { rank:8,  name:"Freight Quoting & RFQ Agent",           cls:"agent",    impact:7, ai:6, rev:6, market:7, white:4, speed:8, feas:8, reuse:5, cross:6, score:6.45, tier:3 },
  { rank:8,  name:"Empty-Mile / Backhaul Agent",           cls:"agent",    impact:7, ai:7, rev:7, market:7, white:5, speed:6, feas:6, reuse:6, cross:5, score:6.45, tier:3 },
  { rank:10, name:"Bridge \u2014 TMS Integration Gateway", cls:"saas",     impact:6, ai:2, rev:8, market:7, white:6, speed:5, feas:6, reuse:10,cross:8, score:6.00, tier:2, promoted:true },
  { rank:11, name:"Cross-Border Customs Agent",            cls:"agent",    impact:7, ai:7, rev:6, market:7, white:6, speed:4, feas:4, reuse:5, cross:5, score:5.95, tier:3 },
  { rank:12, name:"DispatchCopilot",                       cls:"assisted", impact:6, ai:5, rev:6, market:6, white:6, speed:5, feas:5, reuse:6, cross:6, score:5.65, tier:3 },
  { rank:13, name:"CapacityMatch",                         cls:"saas",     impact:6, ai:4, rev:6, market:7, white:4, speed:6, feas:6, reuse:5, cross:5, score:5.50, tier:3 },
  { rank:13, name:"Last-Mile Delivery Exception Agent",    cls:"agent",    impact:6, ai:6, rev:6, market:7, white:2, speed:6, feas:6, reuse:4, cross:4, score:5.50, tier:4, override:true },
  { rank:15, name:"CubeOptimizer",                         cls:"saas",     impact:6, ai:3, rev:6, market:6, white:6, speed:6, feas:6, reuse:4, cross:5, score:5.40, tier:4 },
  { rank:16, name:"ShipperConnect",                        cls:"saas",     impact:5, ai:2, rev:7, market:6, white:5, speed:6, feas:6, reuse:6, cross:7, score:5.30, tier:4 },
  { rank:17, name:"ComplyCore",                            cls:"saas",     impact:5, ai:3, rev:6, market:6, white:5, speed:5, feas:5, reuse:4, cross:4, score:4.85, tier:4 },
  { rank:18, name:"GreenMetrics",                          cls:"saas",     impact:3, ai:2, rev:3, market:4, white:5, speed:6, feas:6, reuse:3, cross:3, score:3.75, tier:4 }
];


/* Map product names → detail page IDs (only products with detail pages) */
var DETAIL_IDS = {
  "Invoice Audit & Payment Agent": "invoice-audit",
  "Shipment Exception Mgmt Agent": "exception-mgmt",
  "Freight Claims Mgmt & Recovery Agent": "claims",
  "Carrier Fraud & Onboarding Agent": "carrier-fraud",
  "Dynamic Freight Procurement Agent": "procurement",
  "Detention & Dock Coordination Agent": "detention",
  "FreightLink \u2014 Visibility Hub": "freightlink",
  "Freight Quoting & RFQ Agent": "quoting",
  "Empty-Mile / Backhaul Agent": "empty-mile",
  "Bridge \u2014 TMS Integration Gateway": "bridge",
  "Cross-Border Customs Agent": "customs",
  "Last-Mile Delivery Exception Agent": "last-mile"
};

var COLS = [
  { key:"rank",   label:"#",            kind:"rank" },
  { key:"name",   label:"Consolidated Product", kind:"name" },
  { key:"cls",    label:"Class",        kind:"class", def:"Classification: True AI Agent (observes, reasons, acts autonomously), AI-Assisted Automation (predicts/recommends but a human acts), or Traditional SaaS / Integration (no meaningful agentic AI)." },
  { key:"impact", label:"Impact 20%",   kind:"cell", def:"Business Impact / Customer ROI (weight 20%) — how much measurable financial value the product delivers to the customer (cost recovered, losses avoided, time saved). The single most heavily weighted criterion." },
  { key:"ai",     label:"AI-Diff 15%",  kind:"cell", def:"AI-Agent Differentiation (weight 15%) — how genuinely agentic it is: does it close the loop and act autonomously, or just alert/predict? A true observe-reason-act-verify agent scores higher than a dashboard or rules engine." },
  { key:"rev",    label:"Revenue 15%",  kind:"cell", def:"Revenue Potential / Willingness to Pay (weight 15%) — how much a customer will pay and how easily (e.g. self-funding %-of-savings pricing scores high because the budget fight is easier)." },
  { key:"market", label:"Market 10%",   kind:"cell", def:"Market Demand / Problem Urgency (weight 10%) — how large the addressable market is and how urgently customers feel the pain today." },
  { key:"white",  label:"White 10%",    kind:"cell", def:"Competitive Whitespace (weight 10%) — how crowded the competitive field is. Higher = less competition. Rated from 'White Space' (almost no competitors, best) through 'Emerging' and 'Competitive' down to 'Red Ocean' (extremely crowded, worst)." },
  { key:"speed",  label:"Speed 10%",    kind:"cell", def:"Speed to MVP / Speed to Market (weight 10%) — how quickly a first working pilot can be built and shipped to a customer. Faster = higher score." },
  { key:"feas",   label:"Feas 10%",     kind:"cell", def:"Implementation Feasibility (weight 10%) — how technically hard it is to build and integrate. Fewer/simpler integrations and lower risk score higher." },
  { key:"reuse",  label:"Reuse 5%",     kind:"cell", def:"Reusability / Platform Potential (weight 5%) — how much of what you build for this product can be reused by other products. A shared foundation (e.g. FreightLink, Bridge) scores 10/10 even if its own AI-differentiation is low." },
  { key:"cross",  label:"Cross 5%",     kind:"cell", def:"Cross-sell / Expansion Potential (weight 5%) — how naturally the product opens the door to selling additional products to the same customer later." },
  { key:"score",  label:"Score",        kind:"score", def:"Overall weighted score out of 10 — the nine criteria combined by their weights. A starting point, not the final answer: sequencing logic can still override it (e.g. Bridge promoted, Last-Mile held)." },
  { key:"tier",   label:"Tier",         kind:"tier", def:"Build tier: Tier 1 (Build Now), Tier 2 (Build Next), Tier 3 (Defer), Tier 4 (Do not build first). Mostly follows the Score, with two deliberate overrides marked in the table notes." }
];

/* Full glossary for the criteria explainer below the scorecard */
var CRITERIA = [
  ["Business Impact / Customer ROI","20%","How much measurable financial value the product delivers to the customer — cost recovered, losses avoided, labor/time saved. The most heavily weighted criterion."],
  ["AI-Agent Differentiation","15%","How genuinely agentic it is. A true observe → reason → act → verify agent that closes the loop scores higher than a tool that only alerts, predicts, or summarizes for a human to act on."],
  ["Revenue Potential / Willingness to Pay","15%","How much a customer will pay, and how easily. Self-funding models (paid from the savings the agent finds) score high because they remove the usual budget-approval friction."],
  ["Market Demand / Problem Urgency","10%","How large the addressable market is and how urgently customers feel the pain right now."],
  ["Competitive Whitespace","10%","How crowded the competitive field is — higher means less competition. Rated White Space (almost no competitors, best) → Emerging → Competitive → Red Ocean (extremely crowded, worst)."],
  ["Speed to MVP / Speed to Market","10%","How fast a first working pilot can be built and put in front of a customer. Faster is better."],
  ["Implementation Feasibility","10%","How hard it is to build and integrate — number and complexity of integrations, technical risk. Easier is better."],
  ["Reusability / Platform Potential","5%","How much of what you build here can be reused by other products. Shared infrastructure (e.g. FreightLink, Bridge) scores 10/10 even when its own AI-differentiation is low."],
  ["Cross-sell / Expansion Potential","5%","How naturally landing this product opens the door to selling more products to the same customer afterward."]
];

/* Tier definitions for tooltips */
var TIER_DEFS = {
  "1": ["Tier 1 — Build Now", "The three highest-priority products to fund immediately: fastest to prove, most self-funding, strongest platform bets. This is the 'build now' wave."],
  "2": ["Tier 2 — Build Next", "The next wave to build, in a tightly sequenced 'Build Next' phase that reuses infrastructure the Tier 1 products already require. (Bridge is promoted into Tier 2 above its raw score for its 10/10 reusability.)"],
  "3": ["Tier 3 — Defer", "Real opportunities, but deferred — held back pending a clearer demand signal or a less crowded competitive field. Not part of the first waves."],
  "4": ["Tier 4 — Do not build first", "Lowest priority: do not build these first. Either a very crowded market (e.g. Last-Mile, held here despite a mid-pack score for its 2/10 Red Ocean whitespace) or weak economics relative to the rest."]
};

var classLabel = { agent:"True Agent", assisted:"AI-Assisted", saas:"Traditional" };

function cellColor(v) {
  // 1-10 -> red..amber..green ramp
  if (v >= 8) return "var(--tier1-soft)";
  if (v >= 6) return "var(--tier3-soft)";
  return "var(--tier4-soft)";
}
function cellText(v) {
  if (v >= 8) return "var(--tier1)";
  if (v >= 6) return "var(--tier3)";
  return "var(--tier4)";
}

var sortState = { key:"score", dir:-1 };

function renderScorecard() {
  var tbody = document.getElementById("scoreBody");
  var thead = document.getElementById("scoreHead");
  if (!tbody || !thead) return;

  // header
  thead.innerHTML = "";
  var tr = document.createElement("tr");
  COLS.forEach(function (c) {
    var th = document.createElement("th");
    if (c.kind === "name") th.className = "name-col";
    if (sortState.key === c.key) th.classList.add("sorted");
    var arrow = sortState.key === c.key ? (sortState.dir === 1 ? "\u25B2" : "\u25BC") : "\u25BE";
    th.innerHTML = c.label + ' <span class="arrow">' + arrow + "</span>";
    if (c.def) {
      var label = c.label.replace(/\s*\d+%$/, "");
      th.setAttribute("data-tip-title", label);
      th.setAttribute("data-tip-body", c.def);
    }
    th.addEventListener("click", function () {
      if (sortState.key === c.key) sortState.dir *= -1;
      else { sortState.key = c.key; sortState.dir = (c.key === "name") ? 1 : -1; }
      renderScorecard();
    });
    tr.appendChild(th);
  });
  thead.appendChild(tr);

  // sort
  var rows = SCORECARD.slice().sort(function (a, b) {
    var av = a[sortState.key], bv = b[sortState.key];
    if (typeof av === "string") return av.localeCompare(bv) * sortState.dir;
    return (av - bv) * sortState.dir;
  });

  // body
  tbody.innerHTML = "";
  rows.forEach(function (r) {
    var tr = document.createElement("tr");
    COLS.forEach(function (c) {
      var td = document.createElement("td");
      var v = r[c.key];
      if (c.kind === "rank") { td.className = "rank-col"; td.textContent = v; }
      else if (c.kind === "name") {
        td.className = "name-col";
        var did = DETAIL_IDS[r.name];
        if (did) { td.innerHTML = '<a class="name-detail-link" href="detail.html?id=' + did + '">' + r.name + '</a>'; }
        else { td.textContent = r.name; }
        if (r.promoted) td.innerHTML += ' <span class="badge tier2" title="Promoted above raw score for 10/10 Reusability">\u2191 promoted</span>';
        if (r.override)  td.innerHTML += ' <span class="badge tier4" title="Held at Tier 4 despite a mid-pack score: 2/10 Red Ocean whitespace">held</span>';
      }
      else if (c.kind === "class") {
        td.innerHTML = '<span class="badge ' + r.cls + '">' + classLabel[r.cls] + "</span>";
      }
      else if (c.kind === "cell") {
        td.innerHTML = '<span class="cellscore" style="background:' + cellColor(v) + ';color:' + cellText(v) + '">' + v + "</span>";
      }
      else if (c.kind === "score") { td.className = "score-col"; td.textContent = v.toFixed(2); }
      else if (c.kind === "tier") {
        var td_def = TIER_DEFS[String(r.tier)];
        var tierAttr = td_def ? ' data-tip-title="' + td_def[0] + '" data-tip-body="' + td_def[1].replace(/"/g,"&quot;") + '"' : '';
        td.innerHTML = '<span class="badge tier' + r.tier + '"' + tierAttr + '>Tier ' + r.tier + "</span>";
      }
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
}

function renderCriteria() {
  var box = document.getElementById("criteria-glossary");
  if (!box || typeof CRITERIA === "undefined") return;
  box.innerHTML = CRITERIA.map(function (c) {
    return '<div class="crit-item"><div class="crit-head"><span class="crit-name">' + c[0] +
      '</span><span class="crit-weight">' + c[1] + '</span></div><div class="crit-desc">' + c[2] + '</div></div>';
  }).join("");
}

window.addEventListener("DOMContentLoaded", function () {
  renderScorecard();
  renderCriteria();
});

/* ---------- Nav scroll-spy (highlights the current section) ---------- */
(function () {
  window.addEventListener("DOMContentLoaded", function () {
    var links = Array.prototype.slice.call(document.querySelectorAll('.nav a[href^="#"]'));
    if (!links.length || !("IntersectionObserver" in window)) return;
    var byId = {};
    var sections = [];
    links.forEach(function (a) {
      var id = a.getAttribute("href").slice(1);
      var el = document.getElementById(id);
      if (el) { byId[id] = a; sections.push(el); }
    });
    var current = null;
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          if (current) current.classList.remove("active");
          current = byId[e.target.id];
          if (current) current.classList.add("active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    sections.forEach(function (s) { obs.observe(s); });
  });
})();


/* ---------- Custom styled tooltip (bold bright title + body) ---------- */
(function () {
  var tip;
  function ensure() {
    if (tip) return tip;
    tip = document.createElement("div");
    tip.className = "tooltip-pop";
    tip.setAttribute("role", "tooltip");
    document.body.appendChild(tip);
    return tip;
  }
  function show(target) {
    var title = target.getAttribute("data-tip-title");
    var body = target.getAttribute("data-tip-body");
    if (!title && !body) return;
    var t = ensure();
    t.innerHTML = (title ? '<div class="tt-title">' + title + '</div>' : '') +
                  (body ? '<div class="tt-body">' + body + '</div>' : '');
    t.style.display = "block";
    var r = target.getBoundingClientRect();
    var tw = t.offsetWidth, th = t.offsetHeight;
    var top = r.bottom + 8 + window.scrollY;
    var left = r.left + window.scrollX + (r.width / 2) - (tw / 2);
    // keep within viewport horizontally
    var minL = 8 + window.scrollX, maxL = window.scrollX + document.documentElement.clientWidth - tw - 8;
    if (left < minL) left = minL; if (left > maxL) left = maxL;
    // flip above if not enough room below
    if (r.bottom + 8 + th > window.innerHeight && r.top - 8 - th > 0) top = r.top + window.scrollY - th - 8;
    t.style.top = top + "px";
    t.style.left = left + "px";
  }
  function hide() { if (tip) tip.style.display = "none"; }
  function bind() {
    document.addEventListener("mouseover", function (e) {
      var el = e.target.closest("[data-tip-title],[data-tip-body]");
      if (el) show(el);
    });
    document.addEventListener("mouseout", function (e) {
      var el = e.target.closest("[data-tip-title],[data-tip-body]");
      if (el) hide();
    });
    document.addEventListener("focusin", function (e) {
      var el = e.target.closest && e.target.closest("[data-tip-title],[data-tip-body]");
      if (el) show(el);
    });
    document.addEventListener("focusout", hide);
    window.addEventListener("scroll", hide, true);
  }
  if (document.readyState !== "loading") bind();
  else window.addEventListener("DOMContentLoaded", bind);
})();

/* ---------- Nav "Sections" dropdown ---------- */
(function () {
  function bind() {
    var more = document.querySelector(".nav-more");
    if (!more) return;
    var btn = more.querySelector(".nav-more-btn");
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = more.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.addEventListener("click", function (e) {
      if (!more.contains(e.target)) { more.classList.remove("open"); btn.setAttribute("aria-expanded","false"); }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { more.classList.remove("open"); btn.setAttribute("aria-expanded","false"); }
    });
  }
  if (document.readyState !== "loading") bind();
  else window.addEventListener("DOMContentLoaded", bind);
})();
