/* Client & Market Opportunities — view renderer. Reads window.MARKET. */
(function () {
  var M = window.MARKET || {};
  function esc(s){return String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");}
  function el(id){return document.getElementById(id);}

  var VIEWS = [
    ["overview","Overview"], ["clients","Existing Clients"], ["matrix","Client Fit Matrix"],
    ["targets","Target Accounts"], ["solution-prospects","Solution → Prospects"],
    ["personas","Buyer Personas"], ["opportunities","Sales Opportunities"], ["plan","90-Day Action Plan"],
    ["landscape","Market Landscape"],
    ["directory","Agent Market Directory"]
  ];

  function fitBadge(level){
    var f=M.fitLevels[level]; if(!f) return "";
    return '<span class="fit-badge '+f.cls+'">'+esc(f.label)+'</span>';
  }
  function tierBadge(t){
    var x=M.tiers[t]; if(!x) return "";
    return '<span class="tier-badge '+x.cls+'">'+esc(x.label)+'</span>';
  }
  function fidelityTag(f){
    if(!f) return "";
    var cls = f.indexOf("FACT")>-1 ? "fid-fact" : (f.indexOf("NEEDS")>-1 ? "fid-validate" : "fid-assess");
    return '<span class="fid '+cls+'">'+esc(f)+'</span>';
  }

  /* ---------- Overview ---------- */
  function renderOverview(){
    var m=M.meta;
    var kpis=[
      [m.prioritizedSolutions,"Prioritized AI solutions"],
      [m.existingClients,"Existing clients analyzed"],
      [m.tierAProspects,"Tier A priority targets"],
      [m.totalProspects,"Target accounts researched"]
    ];
    var focus=[
      ["Top existing-client opportunity",m.topExistingOpportunity],
      ["Top AI Agent opportunity",m.topAgentOpportunity],
      ["Top new-logo opportunity",m.topNewLogo],
      ["Recommended first pilot",m.recommendedFirstPilot],
      ["Recommended flagship",m.recommendedFlagship]
    ];
    var h='<div class="section-head"><div class="kicker">Overview</div><h2>Where should ideyaLabs focus its sales effort?</h2>'
      +'<p>'+esc(m.subtitle)+'</p></div>';
    h+='<div class="stat-row">'+kpis.map(function(k){return '<div class="stat"><div class="num">'+esc(k[0])+'</div><div class="lbl">'+esc(k[1])+'</div></div>';}).join("")+'</div>';
    h+='<div class="grid grid-2" style="margin-top:18px">'+focus.map(function(f){
      return '<div class="card"><div class="kicker" style="margin-bottom:4px">'+esc(f[0])+'</div><div style="font-weight:600">'+esc(f[1])+'</div></div>';
    }).join("")+'</div>';
    // final recommendations preview
    h+='<div class="section-head" style="margin-top:36px"><div class="kicker">Final Recommendations</div><h2>Eleven questions, answered</h2></div>';
    h+='<div class="qa-list">'+M.finalRecommendations.map(function(r){
      return '<div class="qa-item"><div class="q">'+esc(r[0])+'</div><div class="a">'+esc(r[1])+'</div></div>';
    }).join("")+'</div>';
    h+='<div class="callout" style="margin-top:18px">'+esc(M.disclaimer)+'</div>';
    return h;
  }

  /* ---------- Existing Clients ---------- */
  function renderClients(){
    var h='<div class="section-head"><div class="kicker">Existing Clients</div><h2>Bison, Daylight & Hödlmayr — fit at a glance</h2>'
      +'<p>Click a client for the full deep dive: best opportunities, recommended first engagement, and expansion path.</p></div>';
    h+='<div class="grid grid-3">'+M.clients.map(function(c){
      return '<a class="card client-card" href="client.html?id='+c.id+'">'
        +'<div class="client-top">'+fitBadge(c.fit)+'</div>'
        +'<h3>'+esc(c.name)+'</h3>'
        +'<div class="client-meta">'+esc(c.type)+' · '+esc(c.location)+'</div>'
        +'<ul class="detail-list">'
        +'<li><span class="k">Best opp.</span><span class="v">'+esc(c.bestOpportunity)+'</span></li>'
        +'<li><span class="k">Problem</span><span class="v">'+esc(c.keyProblem)+'</span></li>'
        +'<li><span class="k">Buyer</span><span class="v">'+esc(c.buyer)+'</span></li>'
        +'<li><span class="k">Pilot</span><span class="v">'+esc(c.recommendedPilot)+'</span></li>'
        +'<li><span class="k">KPI/ROI</span><span class="v">'+esc(c.kpiRoi)+'</span></li>'
        +'</ul>'
        +'<span class="detail-cta">View client detail →</span>'
        +'</a>';
    }).join("")+'</div>';
    return h;
  }

  /* ---------- Client Fit Matrix ---------- */
  function solName(key){var s=M.solutions.filter(function(x){return x.key===key;})[0];return s?s.name:key;}
  var matrixState={client:"all",fit:"all"};
  function renderMatrix(){
    var h='<div class="section-head"><div class="kicker">Client Fit Matrix</div><h2>Every solution × every existing client</h2>'
      +'<p>Hover a cell for the rationale. Filter by client or fit level. Classifications are Assessment/Inference built from each client\u2019s sourced operating model against each solution\u2019s ICP — deliberately not force-fit.</p></div>';
    // filters
    h+='<div class="filters">';
    h+='<label>Client <select id="mx-client"><option value="all">All clients</option><option value="bison">Bison</option><option value="daylight">Daylight</option><option value="hodlmayr">Hödlmayr</option></select></label>';
    h+='<label>Fit level <select id="mx-fit"><option value="all">All levels</option><option value="A">High Fit</option><option value="B">Strong Potential</option><option value="C">Validate</option><option value="D">Low Fit</option><option value="E">Not a Fit</option></select></label>';
    h+='</div>';
    h+='<div class="table-wrap"><table class="score"><thead><tr>'
      +'<th class="name-col">Solution</th>'
      +(matrixState.client==="all"||matrixState.client==="bison"?'<th>Bison</th>':'')
      +(matrixState.client==="all"||matrixState.client==="daylight"?'<th>Daylight</th>':'')
      +(matrixState.client==="all"||matrixState.client==="hodlmayr"?'<th>Hödlmayr</th>':'')
      +'</tr></thead><tbody>';
    M.fitMatrix.forEach(function(row){
      var cells=[["bison",row.bison],["daylight",row.daylight],["hodlmayr",row.hodlmayr]];
      // fit filter: show row only if at least one visible cell matches
      var visibleCells=cells.filter(function(c){return matrixState.client==="all"||matrixState.client===c[0];});
      if(matrixState.fit!=="all"){
        var anyMatch=visibleCells.some(function(c){return c[1][0]===matrixState.fit;});
        if(!anyMatch) return;
      }
      h+='<tr><td class="name-col">'+esc(solName(row.key))+'</td>';
      visibleCells.forEach(function(c){
        h+='<td title="'+esc(c[1][1])+'">'+fitBadge(c[1][0])+'</td>';
      });
      h+='</tr>';
    });
    h+='</tbody></table></div>';
    h+='<div class="legend" style="margin-top:14px">'
      +Object.keys(M.fitLevels).map(function(k){return fitBadge(k);}).join(" ")+'</div>';
    return h;
  }
  function wireMatrix(){
    var c=el("mx-client"), f=el("mx-fit");
    if(c){c.value=matrixState.client;c.addEventListener("change",function(){matrixState.client=c.value;el("mv").innerHTML=renderMatrix();wireMatrix();});}
    if(f){f.value=matrixState.fit;f.addEventListener("change",function(){matrixState.fit=f.value;el("mv").innerHTML=renderMatrix();wireMatrix();});}
  }

  /* ---------- Target Accounts ---------- */
  var tgtState={region:"all",tier:"all",industry:"all",q:""};
  function renderTargets(){
    var h='<div class="section-head"><div class="kicker">Target Accounts</div><h2>35 sourced prospects across NA, Europe/UK & automotive</h2>'
      +'<p>Every company has at least one dated, sourced trigger. Scores are Assessment/Inference on an eight-criterion framework (Solution Fit 25%, Pain 15%, Scale 15%, AI-Suitability 10%, ROI 10%, Tech Readiness 10%, Similarity 10%, Strategic 5%). Tier A ≥ 7.5, B 6.5–7.49, C 5.0–6.49, D < 5.0.</p></div>';
    h+='<div class="filters">';
    h+='<label>Geography <select id="tg-region"><option value="all">All regions</option><option value="na">North America</option><option value="eu">Europe / UK</option><option value="auto">Automotive / Vehicle</option></select></label>';
    h+='<label>Priority <select id="tg-tier"><option value="all">All tiers</option><option value="A">Tier A</option><option value="B">Tier B</option><option value="C">Tier C</option><option value="D">Tier D</option></select></label>';
    h+='<label>Industry <select id="tg-ind"><option value="all">All industries</option></select></label>';
    h+='<input id="tg-q" class="search" type="search" placeholder="Search company / solution…" />';
    h+='</div>';
    h+='<div id="tg-cards" class="grid grid-3"></div>';
    return h;
  }
  function targetMatches(p){
    if(tgtState.region!=="all"&&p.region!==tgtState.region) return false;
    if(tgtState.tier!=="all"&&p.tier!==tgtState.tier) return false;
    if(tgtState.industry!=="all"&&p.industry!==tgtState.industry) return false;
    if(tgtState.q){
      var hay=(p.name+" "+p.solution+" "+p.industry+" "+p.geo+" "+p.why).toLowerCase();
      if(hay.indexOf(tgtState.q.toLowerCase())<0) return false;
    }
    return true;
  }
  function targetCard(p){
    return '<div class="card target-card '+(p.tier==="A"?"tier-a-card":"")+'">'
      +'<div class="target-top">'+tierBadge(p.tier)+'<span class="score-chip">'+esc(p.score)+'</span></div>'
      +'<h3>'+esc(p.name)+(p.adapted?' <span class="adapted-tag">adapted</span>':'')+'</h3>'
      +'<div class="client-meta">'+esc(p.industry)+' · '+esc(p.geo)+' · '+esc(p.hq)+'</div>'
      +'<div class="target-sol">'+esc(p.solution)+'</div>'
      +(p.note?'<p class="target-note">'+esc(p.note)+'</p>':'')
      +'<p class="target-why">'+esc(p.why)+'</p>'
      +'<ul class="detail-list">'
      +'<li><span class="k">Pain</span><span class="v">'+esc(p.pain)+'</span></li>'
      +'<li><span class="k">Buyer</span><span class="v">'+esc(p.buyer)+'</span></li>'
      +'<li><span class="k">Strategic</span><span class="v">'+esc(p.strategic)+'</span></li>'
      +'<li><span class="k">Action</span><span class="v">'+esc(p.action)+'</span></li>'
      +'</ul></div>';
  }
  function refreshTargets(){
    var box=el("tg-cards"); if(!box) return;
    var rows=M.prospects.filter(targetMatches).sort(function(a,b){return parseFloat(b.score)-parseFloat(a.score);});
    box.innerHTML = rows.length ? rows.map(targetCard).join("") : '<div class="callout">No accounts match these filters.</div>';
  }
  function wireTargets(){
    // populate industry options
    var inds={}; M.prospects.forEach(function(p){inds[p.industry]=1;});
    var sel=el("tg-ind");
    if(sel){Object.keys(inds).sort().forEach(function(i){var o=document.createElement("option");o.value=i;o.textContent=i;sel.appendChild(o);});sel.value=tgtState.industry;}
    var r=el("tg-region"),t=el("tg-tier"),q=el("tg-q");
    if(r){r.value=tgtState.region;r.addEventListener("change",function(){tgtState.region=r.value;refreshTargets();});}
    if(t){t.value=tgtState.tier;t.addEventListener("change",function(){tgtState.tier=t.value;refreshTargets();});}
    if(sel){sel.addEventListener("change",function(){tgtState.industry=sel.value;refreshTargets();});}
    if(q){q.value=tgtState.q;q.addEventListener("input",function(){tgtState.q=q.value;refreshTargets();});}
    refreshTargets();
  }

  /* ---------- Solution -> Prospects ---------- */
  var spState={sol:"invoice-audit"};
  function renderSolutionProspects(){
    var solsWithLists=M.solutions.filter(function(s){return M.solutionProspects[s.key];});
    var h='<div class="section-head"><div class="kicker">Solution → Prospects</div><h2>“Who should we sell this to?”</h2>'
      +'<p>Pick an AI agent to see its ranked target accounts (existing clients and new prospects mixed, ranked by the same fit logic used throughout).</p></div>';
    h+='<div class="filters"><label>AI Agent <select id="sp-sel">'
      +solsWithLists.map(function(s){return '<option value="'+s.key+'">'+esc(s.name)+'</option>';}).join("")
      +'</select></label></div>';
    h+='<div id="sp-list"></div>';
    return h;
  }
  function refreshSolProspects(){
    var box=el("sp-list"); if(!box) return;
    var list=M.solutionProspects[spState.sol]||[];
    var sol=M.solutions.filter(function(s){return s.key===spState.sol;})[0];
    var h='';
    if(sol&&sol.detailId){h+='<p style="margin:0 0 12px"><a class="product-link" href="detail.html?id='+sol.detailId+'">View the '+esc(sol.name)+' product detail →</a></p>';}
    h+='<div class="table-wrap"><table class="score"><thead><tr><th style="width:48px">#</th><th class="name-col">Company</th><th class="name-col">Why</th></tr></thead><tbody>';
    list.forEach(function(row,i){
      h+='<tr><td class="rank-col">'+(i+1)+'</td><td class="name-col">'+esc(row[0])+'</td><td class="name-col">'+esc(row[1])+'</td></tr>';
    });
    h+='</tbody></table></div>';
    box.innerHTML=h;
  }
  function wireSolProspects(){
    var s=el("sp-sel"); if(s){s.value=spState.sol;s.addEventListener("change",function(){spState.sol=s.value;refreshSolProspects();});}
    refreshSolProspects();
  }

  /* ---------- Buyer Personas ---------- */
  function renderPersonas(){
    var h='<div class="section-head"><div class="kicker">Buyer Personas</div><h2>Who buys each solution — and who signs</h2>'
      +'<p>The functional buyer and the economic (budget-holding) buyer are frequently different people; the sales motion needs both.</p></div>';
    h+='<div class="table-wrap"><table class="score"><thead><tr>'
      +'<th class="name-col">Solution</th><th class="name-col">Buyer</th><th class="name-col">Economic buyer</th>'
      +'<th class="name-col">Pain</th><th class="name-col">Value proposition</th><th class="name-col">KPI</th></tr></thead><tbody>';
    M.personas.forEach(function(p){
      h+='<tr><td class="name-col">'+esc(p.solution)+'</td><td class="name-col">'+esc(p.buyer)+'</td>'
        +'<td class="name-col">'+esc(p.econ)+'</td><td class="name-col">'+esc(p.pain)+'</td>'
        +'<td class="name-col">'+esc(p.value)+'</td><td class="name-col">'+esc(p.kpi)+'</td></tr>';
    });
    h+='</tbody></table></div>';
    h+='<div class="callout" style="margin-top:14px">'+esc(M.personasNote)+'</div>';
    return h;
  }

  /* ---------- Sales Opportunities ---------- */
  var oppSort={key:"priority",dir:1};
  var priorityOrder={"Approach first":0,"Validate first":1,"Outbound now":2};
  function renderOpportunities(){
    var h='<div class="section-head"><div class="kicker">Sales Opportunities</div><h2>Highest-priority opportunities for business development</h2>'
      +'<p>Click a column header to sort. Each opportunity carries its why-now trigger, buyer, value proposition, pilot idea, and expected KPI.</p></div>';
    h+='<div id="opp-cards"></div>';
    return h;
  }
  function refreshOpps(){
    var box=el("opp-cards"); if(!box) return;
    var rows=M.opportunities.slice().sort(function(a,b){
      var av,bv;
      if(oppSort.key==="priority"){av=priorityOrder[a.priority]==null?9:priorityOrder[a.priority];bv=priorityOrder[b.priority]==null?9:priorityOrder[b.priority];}
      else if(oppSort.key==="fit"){av=a.fit;bv=b.fit;}
      else {av=(a[oppSort.key]||"").toLowerCase();bv=(b[oppSort.key]||"").toLowerCase();}
      if(av<bv) return -1*oppSort.dir; if(av>bv) return 1*oppSort.dir; return 0;
    });
    var sorters=[["priority","Priority"],["fit","Fit"],["solution","Solution"],["geo","Geography"],["customerType","Customer type"]];
    var h='<div class="sort-bar">Sort: '+sorters.map(function(s){
      var active=oppSort.key===s[0]?' active':'';
      return '<button class="sort-btn'+active+'" data-k="'+s[0]+'">'+esc(s[1])+(oppSort.key===s[0]?(oppSort.dir===1?" ▲":" ▼"):"")+'</button>';
    }).join("")+'</div>';
    h+='<div class="grid grid-2">'+rows.map(function(o){
      return '<div class="card opp-card">'
        +'<div class="opp-top">'+fitBadge(o.fit)+'<span class="opp-priority">'+esc(o.priority)+'</span></div>'
        +'<h3>'+esc(o.client)+'</h3>'
        +'<div class="client-meta">'+esc(o.type)+' · '+esc(o.geo)+' · '+esc(o.customerType)+'</div>'
        +'<div class="target-sol">'+esc(o.solution)+'</div>'
        +'<ul class="detail-list">'
        +'<li><span class="k">Why now</span><span class="v">'+esc(o.whyNow)+'</span></li>'
        +'<li><span class="k">Problem</span><span class="v">'+esc(o.problem)+'</span></li>'
        +'<li><span class="k">Buyer</span><span class="v">'+esc(o.buyer)+'</span></li>'
        +'<li><span class="k">Value</span><span class="v">'+esc(o.value)+'</span></li>'
        +'<li><span class="k">Pilot</span><span class="v">'+esc(o.pilot)+'</span></li>'
        +'<li><span class="k">KPI</span><span class="v">'+esc(o.kpi)+'</span></li>'
        +'</ul></div>';
    }).join("")+'</div>';
    box.innerHTML=h;
    Array.prototype.forEach.call(box.querySelectorAll(".sort-btn"),function(btn){
      btn.addEventListener("click",function(){
        var k=btn.getAttribute("data-k");
        if(oppSort.key===k) oppSort.dir*=-1; else {oppSort.key=k;oppSort.dir=1;}
        refreshOpps();
      });
    });
  }

  /* ---------- 90-Day Action Plan ---------- */
  function renderPlan(){
    var windows=["Days 1–30","Days 31–60","Days 61–90"];
    var h='<div class="section-head"><div class="kicker">90-Day Action Plan</div><h2>From strategy to action</h2>'
      +'<p>Existing clients first (Bison and Daylight in parallel; Hödlmayr after a validation conversation), Tier A outbound in parallel, pilots live by day 90. Owners are shown only where the source specifies one.</p></div>';
    h+='<div class="timeline">';
    windows.forEach(function(w){
      var items=M.actionPlan.filter(function(a){return a.window===w;});
      h+='<div class="phase"><div class="phase-head"><span class="phase-num">'+esc(w)+'</span></div>';
      items.forEach(function(a){
        h+='<div class="plan-item">'
          +'<div class="plan-acct">'+esc(a.account)+' <span class="plan-sol">'+esc(a.solution)+'</span></div>'
          +'<div class="plan-action">'+esc(a.action)+'</div>'
          +'<div class="rowlist"><div class="k">Expected outcome</div><div class="v">'+esc(a.outcome)+'</div>'
          +'<div class="k">Success KPI</div><div class="v">'+esc(a.kpi)+'</div></div>'
          +'</div>';
      });
      h+='</div>';
    });
    h+='</div>';
    return h;
  }

  /* ---------- Market Landscape (external research) ---------- */
  var lsState = { cat: "all" };
  function renderLandscape(){
    var L = window.LANDSCAPE;
    var h='<div class="section-head"><div class="kicker">Market Landscape</div><h2>Similar agents in the market — and who uses them</h2>'
      +'<p>Competing / adjacent vendors for each of the ten solution categories, with publicly-stated customers and how ideyaLabs differs.</p></div>';
    if(!L){ h+='<div class="callout warn">Landscape data not loaded.</div>'; return h; }
    h+='<div class="callout warn" style="margin-bottom:18px">'+esc(L.disclaimer)+'</div>';
    // filter
    h+='<div class="filters"><label>Solution category <select id="ls-sel"><option value="all">All categories</option>'
      + L.categories.map(function(c){return '<option value="'+c.solutionKey+'">'+esc(c.solution)+'</option>';}).join("")
      + '</select></label></div>';
    h+='<div id="ls-body"></div>';
    return h;
  }
  function renderLandscapeBody(){
    var L=window.LANDSCAPE; if(!L) return;
    var box=el("ls-body"); if(!box) return;
    var cats=L.categories.filter(function(c){return lsState.cat==="all"||c.solutionKey===lsState.cat;});
    box.innerHTML = cats.map(function(c){
      var head='<div class="ls-cat-head"><h3>'+esc(c.solution)+'</h3>'
        +(c.detailId?'<a class="product-link" href="detail.html?id='+c.detailId+'">product detail →</a>':'')+'</div>'
        +'<div class="ls-market">Market: '+esc(c.market)+'</div>';
      var diff='<div class="ls-diff"><span class="ls-diff-label">How ideyaLabs differs</span>'+esc(c.differentiation)+'</div>';
      var vendors='<div class="ls-vendors">'+c.vendors.map(function(v){
        return '<div class="ls-vendor">'
          +'<div class="ls-vendor-name">'+esc(v.name)+'</div>'
          +'<div class="ls-vendor-what">'+esc(v.what)+'</div>'
          +'<div class="ls-vendor-cust"><span class="k">Customers</span> '+esc(v.customers)+'</div>'
          +'<div class="ls-vendor-src">Source: '+esc(v.source)+'</div>'
          +'</div>';
      }).join("")+'</div>';
      return '<div class="ls-category card">'+head+diff+vendors+'</div>';
    }).join("");
  }
  function wireLandscape(){
    var sel=el("ls-sel");
    if(sel){ sel.value=lsState.cat; sel.addEventListener("change",function(){lsState.cat=sel.value;renderLandscapeBody();}); }
    renderLandscapeBody();
  }

  /* ---------- Agent Market Directory (broad, external research) ---------- */
  var dirState = { cat:"all", tag:"all", q:"" };
  function renderDirectory(){
    var D=window.DIRECTORY;
    var h='<div class="section-head"><div class="kicker">Agent Market Directory</div><h2>The broader logistics &amp; transportation AI-agent market</h2>'
      +'<p>A market-wide directory (not limited to ideyaLabs\' ten solutions) with vendors, publicly-stated customers, pricing model, and approximate spend. Freight-tech pricing is mostly non-public, so each spend figure is tagged by confidence.</p></div>';
    if(!D){ h+='<div class="callout warn">Directory data not loaded.</div>'; return h; }
    h+='<div class="callout warn" style="margin-bottom:16px">'+esc(D.disclaimer)+'</div>';
    // spend tag legend
    h+='<div class="legend" style="margin-bottom:14px"><span class="spend-legend-label">Spend confidence:</span>'
      + Object.keys(D.spendTags).map(function(k){var t=D.spendTags[k];return '<span class="spend-tag '+t.cls+'">'+esc(t.label)+'</span>';}).join(" ")
      + '</div>';
    // filters
    var cats={}; D.vendors.forEach(function(v){cats[v.cat]=1;});
    h+='<div class="filters">';
    h+='<label>Category <select id="dir-cat"><option value="all">All categories</option>'
      + Object.keys(cats).sort().map(function(c){return '<option value="'+esc(c)+'">'+esc(c)+'</option>';}).join("") + '</select></label>';
    h+='<label>Spend confidence <select id="dir-tag"><option value="all">All</option>'
      + Object.keys(D.spendTags).map(function(k){return '<option value="'+k+'">'+esc(D.spendTags[k].label)+'</option>';}).join("") + '</select></label>';
    h+='<input id="dir-q" class="search" type="search" placeholder="Search vendor / customer / model…" />';
    h+='</div>';
    h+='<div id="dir-body"></div>';
    return h;
  }
  function dirMatches(v){
    var D=window.DIRECTORY;
    if(dirState.cat!=="all"&&v.cat!==dirState.cat) return false;
    if(dirState.tag!=="all"&&v.tag!==dirState.tag) return false;
    if(dirState.q){ var hay=(v.name+" "+v.cat+" "+v.what+" "+v.customers+" "+v.model+" "+v.spend).toLowerCase(); if(hay.indexOf(dirState.q.toLowerCase())<0) return false; }
    return true;
  }
  function renderDirBody(){
    var D=window.DIRECTORY; if(!D) return;
    var box=el("dir-body"); if(!box) return;
    var rows=D.vendors.filter(dirMatches);
    if(!rows.length){ box.innerHTML='<div class="callout">No vendors match these filters.</div>'; return; }
    // group by category
    var byCat={}; rows.forEach(function(v){(byCat[v.cat]=byCat[v.cat]||[]).push(v);});
    var h='';
    Object.keys(byCat).forEach(function(cat){
      h+='<h3 class="dir-cat-title">'+esc(cat)+' <span class="dir-count">'+byCat[cat].length+'</span></h3>';
      h+='<div class="table-wrap"><table class="score dir-table"><thead><tr>'
        +'<th class="name-col">Vendor</th><th class="name-col">What it does</th><th class="name-col">Customers</th>'
        +'<th class="name-col">Pricing model</th><th class="name-col">Approx. spend</th></tr></thead><tbody>';
      byCat[cat].forEach(function(v){
        var t=D.spendTags[v.tag]||{label:v.tag,cls:""};
        h+='<tr>'
          +'<td class="name-col"><strong>'+esc(v.name)+'</strong></td>'
          +'<td class="name-col">'+esc(v.what)+'</td>'
          +'<td class="name-col">'+esc(v.customers)+'</td>'
          +'<td class="name-col">'+esc(v.model)+'</td>'
          +'<td class="name-col"><span class="spend-tag '+t.cls+'">'+esc(t.label)+'</span> '+esc(v.spend)+'<div class="dir-src">'+esc(v.source)+'</div></td>'
          +'</tr>';
      });
      h+='</tbody></table></div>';
    });
    box.innerHTML=h;
  }
  function wireDirectory(){
    var c=el("dir-cat"),t=el("dir-tag"),q=el("dir-q");
    if(c){c.value=dirState.cat;c.addEventListener("change",function(){dirState.cat=c.value;renderDirBody();});}
    if(t){t.value=dirState.tag;t.addEventListener("change",function(){dirState.tag=t.value;renderDirBody();});}
    if(q){q.value=dirState.q;q.addEventListener("input",function(){dirState.q=q.value;renderDirBody();});}
    renderDirBody();
  }

  /* ---------- Router ---------- */
  function currentView(){
    var m=new RegExp("[?&]view=([^&]+)").exec(location.search);
    var v=m?decodeURIComponent(m[1]):"overview";
    return VIEWS.some(function(x){return x[0]===v;})?v:"overview";
  }
  function renderNavTabs(active){
    return VIEWS.map(function(v){
      return '<a class="mtab'+(v[0]===active?" active":"")+'" href="market.html?view='+v[0]+'">'+esc(v[1])+'</a>';
    }).join("");
  }
  var RENDER={overview:renderOverview,clients:renderClients,matrix:renderMatrix,targets:renderTargets,
    "solution-prospects":renderSolutionProspects,personas:renderPersonas,opportunities:renderOpportunities,plan:renderPlan,
    landscape:renderLandscape,directory:renderDirectory};

  window.addEventListener("DOMContentLoaded",function(){
    var v=currentView();
    var tabs=el("mtabs"); if(tabs) tabs.innerHTML=renderNavTabs(v);
    var body=el("mv"); if(body) body.innerHTML=(RENDER[v]||renderOverview)();
    // wire interactive views
    if(v==="matrix") wireMatrix();
    if(v==="targets") wireTargets();
    if(v==="solution-prospects") wireSolProspects();
    if(v==="opportunities") refreshOpps();
    if(v==="landscape") wireLandscape();
    if(v==="directory") wireDirectory();
  });
})();
