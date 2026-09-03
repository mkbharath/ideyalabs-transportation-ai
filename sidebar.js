/* Shared left-sidebar navigation, injected on every page for consistency.
   Groups: brand, roadmap sections, strategy pages. Marks the active item
   (with scroll-spy on the roadmap page), handles mobile drawer + theme toggle. */
(function () {
  var path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  var isIndex = (path === "" || path === "index.html");

  function ix(hash){ return isIndex ? ("#"+hash) : ("index.html#"+hash); }

  // [sectionId, href, label, activeOnLoad]
  var GROUPS = [
    { title: "Roadmap", items: [
      ["top",            ix("top"),            "Overview"],
      ["summary",        ix("summary"),        "Executive Summary"],
      ["glance",         ix("glance"),         "Decision at a Glance"],
      ["recommendations",ix("recommendations"),"Top 3 / 5 / 7"],
      ["scorecard",      ix("scorecard"),      "18-Product Scorecard"],
      ["consolidation",  ix("consolidation"),  "Consolidation"],
      ["revenue",        ix("revenue"),        "Revenue & ROI"],
      ["whitespace",     ix("whitespace"),     "Competitive Whitespace"],
      ["platform",       ix("platform"),       "Shared Platform"],
      ["sequence",       ix("sequence"),       "Implementation Sequence"]
    ]},
    { title: "Strategy", items: [
      ["__market",       "market.html",        "Client & Market", path==="market.html"||path==="client.html"],
      ["__intersection", "intersection.html",  "Intersection Analysis", path==="intersection.html"]
    ]}
  ];

  function esc(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;");}

  var links = GROUPS.map(function (g) {
    var items = g.items.map(function (it) {
      var active = it[3] ? " active" : "";
      var dt = (isIndex && it[0].charAt(0) !== "_") ? ' data-target="'+it[0]+'"' : "";
      return '<a class="sb-link'+active+'"'+dt+' href="'+it[1]+'">'+esc(it[2])+'</a>';
    }).join("");
    return '<div class="sb-group"><div class="sb-group-title">'+esc(g.title)+'</div>'+items+'</div>';
  }).join("");

  var sidebar =
    '<aside class="sidebar" id="sidebar" aria-label="Primary">'
    + '<a class="sb-brand" href="index.html#top" aria-label="ideyaLabs home">'
    +   '<img src="assets/ideyalabs-logo.png" alt="ideyaLabs" class="sb-logo" />'
    +   '<span class="sb-brand-sub">Transportation AI</span>'
    + '</a>'
    + '<nav class="sb-nav">' + links + '</nav>'
    + '<div class="sb-footer">'
    +   '<button id="themeToggle" class="sb-theme" type="button" aria-label="Toggle theme"><span class="sb-theme-ico">🌙</span><span class="sb-theme-lbl">Theme</span></button>'
    +   '<div class="sb-conf">Confidential · Internal</div>'
    + '</div>'
    + '</aside>';

  var topbar =
    '<div class="mobilebar">'
    + '<button class="mb-toggle" id="mbToggle" aria-label="Open menu" aria-expanded="false"><span></span><span></span><span></span></button>'
    + '<a class="mb-brand" href="index.html#top"><img src="assets/ideyalabs-logo.png" alt="ideyaLabs" /></a>'
    + '</div>';

  var scrim = '<div class="sb-scrim" id="sbScrim"></div>';

  function setupScrollSpy(sb){
    if (!isIndex) return;
    var linkFor = {};
    var targets = [];
    sb.querySelectorAll(".sb-link[data-target]").forEach(function(a){
      var id = a.getAttribute("data-target");
      linkFor[id] = a;
      var el = document.getElementById(id);
      if (el) targets.push(el);
    });
    if (!targets.length) return;

    function activate(id){
      sb.querySelectorAll(".sb-link.active").forEach(function(a){ a.classList.remove("active"); });
      var a = linkFor[id];
      if (a) a.classList.add("active");
    }

    var visible = {};
    var obs = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if (e.isIntersecting) visible[e.target.id] = true;
        else delete visible[e.target.id];
      });
      var best = null, bestTop = Infinity;
      targets.forEach(function(t){
        if (visible[t.id]) {
          var top = t.getBoundingClientRect().top;
          if (top < bestTop) { bestTop = top; best = t.id; }
        }
      });
      if (best) activate(best);
    }, { rootMargin: "-12% 0px -70% 0px", threshold: 0 });

    targets.forEach(function(t){ obs.observe(t); });

    function edgeCheck(){
      if (window.scrollY < 40) activate("top");
      else if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) activate(targets[targets.length-1].id);
    }
    window.addEventListener("scroll", edgeCheck, { passive: true });
    activate((location.hash || "#top").slice(1) || "top");
    edgeCheck();
  }

  function init(){
    document.body.classList.add("has-sidebar");
    var oldHeader = document.querySelector(".site-header");
    if (oldHeader) oldHeader.parentNode.removeChild(oldHeader);
    document.body.insertAdjacentHTML("afterbegin", sidebar + topbar + scrim);

    var sb = document.getElementById("sidebar");
    var toggle = document.getElementById("mbToggle");
    var scrimEl = document.getElementById("sbScrim");
    function open(o){ document.body.classList.toggle("sb-open", o); if(toggle) toggle.setAttribute("aria-expanded", o?"true":"false"); }
    if (toggle) toggle.addEventListener("click", function(){ open(!document.body.classList.contains("sb-open")); });
    if (scrimEl) scrimEl.addEventListener("click", function(){ open(false); });
    sb.addEventListener("click", function(e){
      var link = e.target.closest(".sb-link");
      if (!link) return;
      open(false);
      if (link.hasAttribute("data-target")) {
        sb.querySelectorAll(".sb-link.active").forEach(function(a){ a.classList.remove("active"); });
        link.classList.add("active");
      }
    });

    var btn = document.getElementById("themeToggle");
    if (btn) {
      var root = document.documentElement;
      function apply(t){ root.setAttribute("data-theme", t); var ico=btn.querySelector(".sb-theme-ico"); if(ico) ico.textContent = t==="dark"?"☀️":"🌙"; }
      apply(root.getAttribute("data-theme")||"light");
      btn.addEventListener("click", function(){
        var next = root.getAttribute("data-theme")==="dark"?"light":"dark";
        apply(next); try{ localStorage.setItem("theme", next); }catch(e){}
      });
    }

    setupScrollSpy(sb);
  }
  if (document.readyState !== "loading") init();
  else window.addEventListener("DOMContentLoaded", init);
})();
