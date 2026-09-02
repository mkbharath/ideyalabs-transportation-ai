/* Renders a single product's detail from window.PRODUCT_DETAIL based on ?id= */
(function () {
  function qs(name) {
    var m = new RegExp("[?&]" + name + "=([^&]+)").exec(location.search);
    return m ? decodeURIComponent(m[1]) : null;
  }
  var clsLabel = { agent: "True AI Agent", assisted: "AI-Assisted Automation", saas: "Traditional SaaS / Integration" };

  function esc(s) { return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }

  function panel(title, inner) {
    return '<div class="card detail-card"><h2 class="detail-h">' + esc(title) + '</h2>' + inner + '</div>';
  }
  function chips(arr) {
    return '<div class="chips">' + arr.map(function (x) { return '<span class="chip">' + esc(x) + '</span>'; }).join("") + '</div>';
  }
  function bullets(arr) {
    return '<ul class="detail-list-full">' + arr.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join("") + '</ul>';
  }
  function kv(rows) {
    return '<div class="kv">' + rows.map(function (r) {
      return '<div class="kv-k">' + esc(r[0]) + '</div><div class="kv-v">' + esc(r[1]) + '</div>';
    }).join("") + '</div>';
  }

  window.addEventListener("DOMContentLoaded", function () {
    var data = window.PRODUCT_DETAIL || {};
    var id = qs("id");
    var d = id && data[id];

    if (!d) {
      document.getElementById("d-title").textContent = "Product not found";
      document.getElementById("d-tagline").textContent = "";
      document.getElementById("d-notfound").style.display = "block";
      return;
    }

    document.title = d.name + " — ideyaLabs Transportation AI Roadmap";
    document.getElementById("d-title").textContent = d.name;
    document.getElementById("d-tagline").textContent = d.tagline || "";

    var badges = [];
    badges.push('<span class="badge tier' + d.tier + '">Tier ' + d.tier + '</span>');
    badges.push('<span class="badge ' + d.cls + '">' + clsLabel[d.cls] + '</span>');
    if (d.score) badges.push('<span class="badge" style="background:var(--brand-soft);color:var(--brand-text)">Score ' + d.score + '</span>');
    if (d.competition && d.competition.rating) badges.push('<span class="badge saas">' + esc(d.competition.rating) + '</span>');
    document.getElementById("d-badges").innerHTML = badges.join("");

    var meta = [];
    if (d.source) meta.push("<span><strong>" + esc(d.source) + "</strong></span>");
    if (d.rank) meta.push("<span>Overall rank <strong>#" + d.rank + "</strong> of 18</span>");
    if (d.difficulty) meta.push("<span>Difficulty: <strong>" + esc(d.difficulty) + "</strong></span>");
    document.getElementById("d-source").innerHTML = meta.join("");
    document.getElementById("d-provenance").textContent =
      "Detail grounded in " + (d.source || "the source documents") + ". Illustrative figures are labelled as the document labels them.";

    var html = "";

    // Left column (narrative)
    var left = "";
    left += panel("The problem", "<p>" + esc(d.problem) + "</p>");
    if (d.who) left += panel("Who experiences it", "<p>" + esc(d.who) + "</p>");
    if (d.traditional) left += panel("Why traditional software falls short", "<p>" + esc(d.traditional) + "</p>");
    left += panel("The AI agent solution", "<p>" + esc(d.solution) + "</p>");
    if (d.actions) left += panel("What it does (autonomously, within guardrails)", bullets(d.actions));
    if (d.hitl) left += panel("Human-in-the-loop", "<p>" + esc(d.hitl) + "</p>");
    if (d.competition) left += panel("Competitive landscape — " + esc(d.competition.rating), "<p>" + esc(d.competition.note) + "</p>");

    // Right column (facts)
    var right = "";
    if (d.impact) right += panel("Business impact", kv(d.impact));
    if (d.roi) {
      right += panel("Example ROI (illustrative)",
        '<p class="roi-title">' + esc(d.roi.title) + '</p>' + bullets(d.roi.steps));
    }
    var facts = [];
    if (d.customers) facts.push(["Target customers", d.customers.join("; ")]);
    if (d.kpi) facts.push(["Primary KPI", d.kpi]);
    if (d.commercial) facts.push(["Commercial model", d.commercial]);
    if (d.mvp) facts.push(["Time to MVP", d.mvp]);
    if (d.geography) facts.push(["Geographic relevance", d.geography]);
    if (facts.length) right += panel("At a glance", kv(facts));
    if (d.systems) right += panel("Systems & data it integrates with", chips(d.systems));

    // ---- Client & Market fit cross-link (from market-data.js, if present) ----
    var MK = window.MARKET;
    if (MK && id) {
      var solName = (MK.solutions || []).filter(function (x) { return x.detailId === id; })[0];
      var solKey = solName ? solName.key : id;
      var prospects = (MK.solutionProspects && MK.solutionProspects[solKey]) || null;
      var persona = (MK.personas || []).filter(function (p) { return p.key === solKey; })[0];
      var msg = (MK.messaging || []).filter(function (m2) { return m2.key === solKey; })[0];
      var mkInner = "";
      if (prospects && prospects.length) {
        mkInner += '<div class="cap-name">Best-fit customers</div><ul class="detail-list-full">'
          + prospects.slice(0, 5).map(function (r) { return '<li>' + esc(r[0]) + ' — ' + esc(r[1]) + '</li>'; }).join("")
          + '</ul>';
      }
      if (persona) {
        mkInner += '<div class="cap-name" style="margin-top:10px">Primary buyer</div><p>' + esc(persona.buyer) + ' <span style="color:var(--text-faint)">(economic: ' + esc(persona.econ) + ')</span></p>';
      }
      if (msg && msg.pilot) {
        mkInner += '<div class="cap-name" style="margin-top:10px">Suggested pilot</div><p>' + esc(msg.pilot) + '</p>';
      }
      if (mkInner) {
        mkInner += '<a class="detail-cta" href="market.html?view=solution-prospects">See all target accounts for this agent →</a>';
        right += panel("Client & market fit", mkInner);
      }
    }

    html = '<div class="detail-col-main">' + left + '</div><div class="detail-col-side">' + right + '</div>';
    document.getElementById("d-body").innerHTML = html;
  });
})();
