/* Customer × Solution Intersection Analysis — renderer. Reads window.INTERSECTION. */
(function () {
  var X = window.INTERSECTION || {};
  function esc(s){return String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");}
  function el(id){return document.getElementById(id);}
  function cust(id){return (X.customers||[]).filter(function(c){return c.id===id;})[0]||{name:id};}
  function prob(id){return (X.problems||[]).filter(function(p){return p.id===id;})[0]||{name:id};}
  function sol(key){return (X.solutions||[]).filter(function(s){return s.key===key;})[0];}
  function detailFor(key){ /* map to existing product detail ids (same keys) */ return key; }

  var VIEWS = [
    ["ceo","CEO View"], ["heatmap","Customer × Solution"], ["solution","By Solution"],
    ["customer","By Customer"], ["network","Intersection Network"], ["bosm","Build Once → Sell Many"],
    ["whitespace","White Space"], ["quadrant","Strategic Quadrant"], ["cto","CTO View"],
    ["priorities","Product Priorities"], ["roadmap","Roadmap"], ["decision","Decision Table"]
  ];

  function fidTag(f){ if(!f) return ""; var c=f.indexOf("FACT")>-1?"fid-fact":(f.indexOf("NEEDS")>-1?"fid-validate":"fid-assess"); return '<span class="fid '+c+'">'+esc(f.split(" —")[0])+'</span>'; }
  function bar(pct){ return '<span class="ix-bar"><span class="ix-bar-fill" style="width:'+pct+'%"></span></span>'; }
  function strengthCls(v){ return "strength-"+v; }
  function calcNote(){ return '<div class="calc-note">Calculated assessment based on source information — not a figure stated in any source document.</div>'; }

  /* ---------- CEO View ---------- */
  function renderCEO(){
    var sols = X.solutions.slice().sort(function(a,b){return b.investmentScore-a.investmentScore;});
    var top3 = sols.slice(0,3);
    var h='<div class="section-head"><div class="kicker">CEO View</div><h2>Where should ideyaLabs invest first?</h2>'
      +'<p>The strategic story in one screen: common customer problems → reusable AI agents → build once, deploy to many. Scores are calculated by this app from the source-grounded fit analysis.</p></div>';
    // the story strip
    h+='<div class="ceo-story">'
      +['Our customers','Common problems','Customer intersections','Reusable AI agents','Build once','Deploy to many','Repeatable revenue']
        .map(function(t,i,a){return '<span class="ceo-step">'+esc(t)+'</span>'+(i<a.length-1?'<span class="ceo-arrow">→</span>':'');}).join("")
      +'</div>';
    // Build-first cards
    h+='<h3 class="tier-heading">Build first</h3><div class="grid grid-3">'
      + top3.map(function(s,i){
        return '<div class="card ceo-card">'
          +'<div class="ceo-rank">#'+(i+1)+'</div>'
          +'<h3>'+esc(s.name)+'</h3>'
          +'<div class="ceo-metrics">'
          +'<div class="ceo-metric"><span class="ceo-num">'+s.customers+'</span><span class="ceo-lbl">potential customers</span></div>'
          +'<div class="ceo-metric"><span class="ceo-num">'+s.reusePct+'%</span><span class="ceo-lbl">reusable core</span></div>'
          +'<div class="ceo-metric"><span class="ceo-num">'+s.investmentScore+'</span><span class="ceo-lbl">invest. score</span></div>'
          +'</div>'
          +'<div class="ceo-tags"><span class="badge tier1">'+esc(s.tier)+'</span> <span class="badge '+(s.custRisk==="Low"?"tier1":s.custRisk==="Medium"?"tier3":"tier4")+'">'+esc(s.custRisk)+' customization</span></div>'
          +'<div class="ceo-common">Common problem: <strong>'+esc(prob(s.problem).name)+'</strong></div>'
          +'<a class="detail-cta" href="intersection.html?view=solution&sol='+s.key+'">See the intersection →</a>'
          +'</div>';
      }).join("") + '</div>';
    // quick answers
    var best={ horizontal:null, vertical:null, roi:null, platform:null, pilot:null, missing:"Vehicle-logistics-native agents (automotive vertical)" };
    X.solutions.forEach(function(s){
      if(s.level===1 && (!best.horizontal||s.investmentScore>best.horizontal.investmentScore)) best.horizontal=s;
      if(s.level===2 && (!best.vertical||s.investmentScore>best.vertical.investmentScore)) best.vertical=s;
      if(!best.roi||s.roi>best.roi.roi) best.roi=s;
      if(!best.platform||s.reuse>best.platform.reuse) best.platform=s;
    });
    var maxInter=X.solutions.slice().sort(function(a,b){return b.intersectionScore-a.intersectionScore;})[0];
    h+='<h3 class="tier-heading">Quick answers</h3><div class="qa-list">'
      +[['Best horizontal AI agent',best.horizontal.name],
        ['Best vertical AI agent',best.vertical.name],
        ['Best ROI opportunity',best.roi.name],
        ['Best reusable platform opportunity',best.platform.name+' (reusability '+best.platform.reuse+'/10)'],
        ['Widest multi-customer intersection',maxInter.name+' ('+maxInter.customers+' customers, score '+maxInter.intersectionScore+')'],
        ['Best existing-client pilot','Daylight Transport — Invoice Audit (cleanest data); Bison in parallel (warm)'],
        ['Biggest gap missing from the portfolio',best.missing]
      ].map(function(r){return '<div class="qa-item"><div class="q">'+esc(r[0])+'</div><div class="a">'+esc(r[1])+'</div></div>';}).join("")+'</div>';
    h+=calcNote();
    return h;
  }

  /* ---------- Heatmap (customer × solution) ---------- */
  var hmState={geo:"all",seg:"all"};
  function renderHeatmap(){
    var h='<div class="section-head"><div class="kicker">Customer × Solution</div><h2>Intersection heatmap</h2>'
      +'<p>Rows = AI solutions, columns = customers. Cell = intersection strength (5 very strong → 0 not relevant). Click a cell for the rationale. Existing clients are marked ●.</p></div>';
    h+='<div class="filters">';
    h+='<label>Geography <select id="hm-geo"><option value="all">All</option><option value="United States">United States</option><option value="Canada/US/Mexico">Canada/US</option><option value="Europe">Europe</option></select></label>';
    h+='<label>Segment <select id="hm-seg"><option value="all">All</option><option value="LTL">LTL</option><option value="FTL">FTL</option><option value="Brokerage">Brokerage</option><option value="Automotive">Automotive</option></select></label>';
    h+='</div>';
    h+='<div class="table-wrap"><table class="score ix-heat"><thead id="hm-head"></thead><tbody id="hm-body"></tbody></table></div>';
    h+='<div class="legend" style="margin-top:12px">'
      +[5,4,3,2,1,0].map(function(v){return '<span><span class="hm-cell '+strengthCls(v)+'" style="display:inline-block;width:18px;height:18px;border-radius:4px;vertical-align:middle"></span> '+v+'</span>';}).join(" ")+'</div>';
    h+='<div id="hm-rationale"></div>';
    h+=calcNote();
    return h;
  }
  function visibleCustomers(){
    return X.customers.filter(function(c){
      if(hmState.geo!=="all" && c.geo!==hmState.geo) return false;
      if(hmState.seg!=="all" && (c.segment||"").indexOf(hmState.seg)<0) return false;
      return true;
    });
  }
  function refreshHeatmap(){
    var head=el("hm-head"), body=el("hm-body"); if(!head||!body) return;
    var custs=visibleCustomers();
    head.innerHTML='<tr><th class="name-col">Solution</th>'+custs.map(function(c){return '<th title="'+esc(c.note)+'">'+esc(c.name)+(c.existing?' ●':'')+'</th>';}).join("")+'<th>Intersection</th></tr>';
    body.innerHTML=X.solutions.slice().sort(function(a,b){return b.intersectionScore-a.intersectionScore;}).map(function(s){
      var cells=custs.map(function(c){
        var v=s.fits[c.id]||0;
        return '<td class="hm-cell '+strengthCls(v)+'" data-sol="'+s.key+'" data-cust="'+c.id+'" style="cursor:'+(v?'pointer':'default')+'">'+(v||'')+'</td>';
      }).join("");
      return '<tr><td class="name-col"><a class="name-detail-link" href="intersection.html?view=solution&sol='+s.key+'">'+esc(s.name)+'</a></td>'+cells+'<td class="score-col">'+s.intersectionScore+'</td></tr>';
    }).join("");
    Array.prototype.forEach.call(body.querySelectorAll(".hm-cell"),function(td){
      td.addEventListener("click",function(){
        var sk=td.getAttribute("data-sol"), ck=td.getAttribute("data-cust");
        var v=sol(sk).fits[ck]||0; if(!v) return;
        var p=prob(sol(sk).problem);
        var rat=(p.customers||[]).filter(function(x){return x[0]===ck;})[0];
        el("hm-rationale").innerHTML='<div class="card ix-rationale"><h3>'+esc(sol(sk).name)+' × '+esc(cust(ck).name)+'</h3>'
          +'<div class="ix-rat-strength">Intersection strength: <strong>'+v+'/5</strong> · common problem: <strong>'+esc(p.name)+'</strong></div>'
          +'<p>'+(rat?fidTag(rat[1])+' '+esc(rat[1].split(" — ").slice(1).join(" — ")||rat[1]):"Insufficient evidence in source documents.")+'</p></div>';
        el("hm-rationale").scrollIntoView({behavior:"smooth",block:"nearest"});
      });
    });
  }
  function wireHeatmap(){
    var g=el("hm-geo"),s=el("hm-seg");
    if(g){g.addEventListener("change",function(){hmState.geo=g.value;refreshHeatmap();});}
    if(s){s.addEventListener("change",function(){hmState.seg=s.value;refreshHeatmap();});}
    refreshHeatmap();
  }

  /* ---------- Solution-centric ---------- */
  function qp(n){var m=new RegExp("[?&]"+n+"=([^&]+)").exec(location.search);return m?decodeURIComponent(m[1]):null;}
  function renderSolution(){
    var sols=X.solutions.slice().sort(function(a,b){return b.intersectionScore-a.intersectionScore;});
    var cur=qp("sol")||sols[0].key;
    var h='<div class="section-head"><div class="kicker">By Solution</div><h2>Solution-centric intersection</h2></div>';
    h+='<div class="filters"><label>Solution <select id="sv-sel">'+sols.map(function(s){return '<option value="'+s.key+'"'+(s.key===cur?' selected':'')+'>'+esc(s.name)+'</option>';}).join("")+'</select></label></div>';
    h+='<div id="sv-body"></div>';
    return h;
  }
  function refreshSolution(){
    var box=el("sv-body"); if(!box) return;
    var cur=(el("sv-sel")&&el("sv-sel").value)||qp("sol")||X.solutions[0].key;
    var s=sol(cur); var p=prob(s.problem);
    var fitCusts=Object.keys(s.fits).sort(function(a,b){return s.fits[b]-s.fits[a];});
    var lvl=X.levels[s.level];
    box.innerHTML='<div class="card detail-card">'
      +'<div class="opp-head"><h3 style="margin:0">'+esc(s.name)+'</h3><span class="badge '+(s.cls==="True AI Agent"?"agent":s.cls==="AI-Assisted"?"assisted":"saas")+'">'+esc(s.cls)+'</span> <span class="badge tier1">'+esc(s.tier)+'</span></div>'
      +'<div class="ix-common">Common problem: <strong>'+esc(p.name)+'</strong> — '+esc(p.description)+'</div>'
      +'<div class="ix-scorebar"><div class="ix-scoreitem"><span>Customer intersection</span>'+bar(s.intersectionScore*10)+'<b>'+s.intersectionScore+'/10</b></div>'
      +'<div class="ix-scoreitem"><span>Build once → sell many</span>'+bar(s.buildOnceScore*10)+'<b>'+s.buildOnceScore+'/10</b></div>'
      +'<div class="ix-scoreitem"><span>Investment score</span>'+bar(s.investmentScore*10)+'<b>'+s.investmentScore+'/10</b></div></div>'
      +'<div class="ix-2col">'
      +'<div><h4 class="detail-h">Customers with potential fit ('+s.customers+')</h4><ul class="ix-fitlist">'
        + fitCusts.map(function(cid){var rat=(p.customers||[]).filter(function(x){return x[0]===cid;})[0];
            return '<li><span class="fit-badge '+ (s.fits[cid]>=4?'fit-a':s.fits[cid]===3?'fit-c':'fit-d') +'">'+s.fits[cid]+'/5</span> <strong>'+esc(cust(cid).name)+'</strong>'+(cust(cid).existing?' <span class="ix-existing">existing</span>':'')+(rat?'<div class="ix-why">'+fidTag(rat[1])+' '+esc((rat[1].split(" — ").slice(1).join(" — "))||"")+'</div>':'')+'</li>';}).join("")
      +'</ul></div>'
      +'<div><h4 class="detail-h">Reuse profile</h4>'
        +'<div class="ix-reuse"><div class="ix-reuse-bar"><span class="ix-reuse-core" style="width:'+s.reusePct+'%">Reusable core '+s.reusePct+'%</span><span class="ix-reuse-cust" style="width:'+(100-s.reusePct)+'%">Custom '+(100-s.reusePct)+'%</span></div><div class="ix-reuse-note">Estimate — customization risk: <strong>'+esc(s.custRisk)+'</strong></div></div>'
        +'<div class="kv" style="margin-top:12px"><div class="kv-k">Product level</div><div class="kv-v">'+esc(lvl.label)+'</div>'
        +'<div class="kv-k">Existing clients</div><div class="kv-v">'+s.existingCustomers+' of 3</div>'
        +'<div class="kv-k">Problem similarity</div><div class="kv-v">'+s.problemSimilarity+'/5 (avg fit strength)</div>'
        +'<div class="kv-k">ROI / Reusability</div><div class="kv-v">'+s.roi+'/10 · '+s.reuse+'/10</div></div>'
        +'<a class="detail-cta" href="detail.html?id='+detailFor(s.key)+'">Full product detail →</a>'
      +'</div></div>'
      +calcNote()+'</div>';
  }
  function wireSolution(){ var sel=el("sv-sel"); if(sel) sel.addEventListener("change",refreshSolution); refreshSolution(); }

  /* ---------- Customer-centric ---------- */
  function renderCustomer(){
    var custs=X.customers;
    var cur=qp("cust")|| "bison";
    var h='<div class="section-head"><div class="kicker">By Customer</div><h2>Customer-centric view</h2>'
      +'<p>For a customer: its problems → the solutions that fit → and the OTHER customers who share each problem (i.e. build once → deploy across all of them).</p></div>';
    h+='<div class="filters"><label>Customer <select id="cv-sel">'+custs.map(function(c){return '<option value="'+c.id+'"'+(c.id===cur?' selected':'')+'>'+esc(c.name)+(c.existing?' (existing)':'')+'</option>';}).join("")+'</select></label></div>';
    h+='<div id="cv-body"></div>';
    return h;
  }
  function refreshCustomer(){
    var box=el("cv-body"); if(!box) return;
    var cur=(el("cv-sel")&&el("cv-sel").value)||"bison"; var c=cust(cur);
    // solutions that fit this customer, strongest first
    var rows=X.solutions.filter(function(s){return s.fits[cur];}).sort(function(a,b){return b.fits[cur]-a.fits[cur];});
    var html='<div class="card"><div class="client-meta" style="margin-bottom:6px">'+esc(c.segment)+' · '+esc(c.geo)+' · '+esc(c.mode)+'</div><p style="margin:0;color:var(--text-muted)">'+esc(c.note)+'</p></div>';
    html+=rows.map(function(s){
      var p=prob(s.problem);
      var others=Object.keys(s.fits).filter(function(x){return x!==cur;}).sort(function(a,b){return s.fits[b]-s.fits[a];});
      return '<div class="card ix-cust-row">'
        +'<div class="opp-head"><span class="fit-badge '+(s.fits[cur]>=4?'fit-a':s.fits[cur]===3?'fit-c':'fit-d')+'">'+s.fits[cur]+'/5</span><h3 style="margin:0">'+esc(s.name)+'</h3></div>'
        +'<div class="ix-common">Problem: <strong>'+esc(p.name)+'</strong></div>'
        +'<div class="ix-alsofor"><span class="k">Also relevant to</span> '
          + (others.length? others.map(function(o){return '<span class="ix-chip">'+esc(cust(o).name)+' <b>'+s.fits[o]+'</b></span>';}).join("") : '<em>no other customer in this set</em>')+'</div>'
        +'<div class="ix-deploy">Build once → potentially deploy across <strong>'+(others.length+1)+' account'+(others.length?'s':'')+'</strong> ('+s.reusePct+'% reusable core, '+esc(s.custRisk)+' customization)</div>'
        +'</div>';
    }).join("");
    box.innerHTML=html+calcNote();
  }
  function wireCustomer(){ var sel=el("cv-sel"); if(sel) sel.addEventListener("change",refreshCustomer); refreshCustomer(); }

  /* expose partials for part 2 to attach */
  window.__IX = { X:X, esc:esc, el:el, cust:cust, prob:prob, sol:sol, fidTag:fidTag, bar:bar, strengthCls:strengthCls, calcNote:calcNote, qp:qp, VIEWS:VIEWS,
    renderCEO:renderCEO, renderHeatmap:renderHeatmap, wireHeatmap:wireHeatmap,
    renderSolution:renderSolution, wireSolution:wireSolution, renderCustomer:renderCustomer, wireCustomer:wireCustomer };
})();

/* ---------- Part 2: network, bosm, whitespace, quadrant, cto, priorities, roadmap, decision, router ---------- */
(function(){
  var IX=window.__IX; if(!IX) return;
  var X=IX.X, esc=IX.esc, el=IX.el, cust=IX.cust, prob=IX.prob, sol=IX.sol, calcNote=IX.calcNote, qp=IX.qp;

  /* ---------- Intersection Network (SVG) ---------- */
  function renderNetwork(){
    return '<div class="section-head"><div class="kicker">Intersection Network</div><h2>Customers ←→ common problems ←→ AI solutions</h2>'
      +'<p>Click a node to highlight its connections. Blue = customers, amber = common problems, green = AI solutions. A problem linking multiple customers to one solution is a build-once opportunity.</p></div>'
      +'<div class="filters"><span id="nw-hint" class="ix-nw-hint">Tip: click a problem node to see every customer + solution it connects.</span></div>'
      +'<div class="ix-network-wrap"><svg id="nw-svg" viewBox="0 0 1200 640" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Intersection network"></svg></div>'+calcNote();
  }
  function buildNetwork(){
    var svg=el("nw-svg"); if(!svg) return;
    var W=1200,H=640;
    var custs=X.customers.filter(function(c){ return X.solutions.some(function(s){return s.fits[c.id];}); });
    var probs=X.problems.filter(function(p){ return (p.customers||[]).length; });
    var sols=X.solutions;
    function col(i,n,x){ return {x:x, y: 60 + i*( (H-120)/Math.max(1,n-1||1) ) }; }
    var pos={};
    custs.forEach(function(c,i){ pos["c:"+c.id]=col(i,custs.length,210); });
    probs.forEach(function(p,i){ pos["p:"+p.id]=col(i,probs.length,600); });
    sols.forEach(function(s,i){ pos["s:"+s.key]=col(i,sols.length,880); });
    // edges: customer-problem (from problem.customers), problem-solution (solution.problem)
    var edges=[];
    probs.forEach(function(p){ (p.customers||[]).forEach(function(cc){ if(pos["c:"+cc[0]]) edges.push(["c:"+cc[0],"p:"+p.id]); }); });
    sols.forEach(function(s){ if(pos["p:"+s.problem]) edges.push(["p:"+s.problem,"s:"+s.key]); });
    // adjacency for highlight
    var adj={}; edges.forEach(function(e){ (adj[e[0]]=adj[e[0]]||[]).push(e[1]); (adj[e[1]]=adj[e[1]]||[]).push(e[0]); });
    function nodeLabel(id){ var t=id.slice(0,1), k=id.slice(2); return t==="c"?cust(k).name : t==="p"?prob(k).name : sol(k).name; }
    var svgns="http://www.w3.org/2000/svg";
    function mk(tag,attrs){ var e=document.createElementNS(svgns,tag); for(var k in attrs) e.setAttribute(k,attrs[k]); return e; }
    svg.innerHTML="";
    // edges
    var edgeEls=[];
    edges.forEach(function(e){ var a=pos[e[0]],b=pos[e[1]];
      var ln=mk("line",{x1:a.x,y1:a.y,x2:b.x,y2:b.y,class:"nw-edge","data-a":e[0],"data-b":e[1]}); svg.appendChild(ln); edgeEls.push(ln); });
    // nodes
    var nodeEls={};
    function addNode(id){ var p=pos[id]; var t=id.slice(0,1);
      var g=mk("g",{class:"nw-node nw-"+t,"data-id":id, tabindex:"0"});
      var r=mk("circle",{cx:p.x,cy:p.y,r:(t==="p"?9:7)});
      var lblX = t==="c"? p.x-14 : p.x+14; var anchor= t==="c"?"end":"start";
      var txt=mk("text",{x:lblX,y:p.y+4,"text-anchor":anchor,class:"nw-label"}); txt.textContent=nodeLabel(id);
      g.appendChild(r); g.appendChild(txt); svg.appendChild(g); nodeEls[id]=g;
      g.addEventListener("click",function(){highlight(id);});
      g.addEventListener("keydown",function(ev){ if(ev.key==="Enter"||ev.key===" "){highlight(id);} });
    }
    Object.keys(pos).forEach(addNode);
    // column headers
    [["Customers",210,"end"],["Common problems",600,"middle"],["AI solutions",880,"start"]].forEach(function(hh){
      var t=mk("text",{x:hh[1],y:30,"text-anchor":hh[2]==="end"?"start":hh[2]==="start"?"end":"middle",class:"nw-colhead"}); t.textContent=hh[0]; svg.appendChild(t);
    });
    var active=null;
    function neighborhood(id){ var set={}; set[id]=1; (adj[id]||[]).forEach(function(n){ set[n]=1; (adj[n]||[]).forEach(function(m){ set[m]=1; }); }); return set; }
    function highlight(id){
      if(active===id){ active=null; clear(); return; }
      active=id; var set=neighborhood(id);
      Object.keys(nodeEls).forEach(function(nid){ nodeEls[nid].classList.toggle("dim", !set[nid]); nodeEls[nid].classList.toggle("hot", nid===id); });
      edgeEls.forEach(function(ln){ var a=ln.getAttribute("data-a"),b=ln.getAttribute("data-b"); ln.classList.toggle("hot", set[a]&&set[b]&&(a===id||b===id||(set[a]&&set[b]))); ln.classList.toggle("dim", !(set[a]&&set[b])); });
      var hint=el("nw-hint"); if(hint){ var cnt=Object.keys(set).length-1; hint.textContent=nodeLabel(id)+' connects to '+cnt+' node'+(cnt!==1?'s':'')+' — click again to reset.'; }
    }
    function clear(){ Object.keys(nodeEls).forEach(function(nid){nodeEls[nid].classList.remove("dim","hot");}); edgeEls.forEach(function(ln){ln.classList.remove("dim","hot");}); var hint=el("nw-hint"); if(hint) hint.textContent="Tip: click a problem node to see every customer + solution it connects."; }
  }

  /* ---------- Build Once → Sell Many ---------- */
  function renderBOSM(){
    var sols=X.solutions.slice().sort(function(a,b){return b.buildOnceScore-a.buildOnceScore;});
    var h='<div class="section-head"><div class="kicker">Build Once → Sell Many</div><h2>Which agents scale from one build to many deployments</h2>'
      +'<p>Ranked by the build-once score (customer count + reusability + revenue scalability, minus customization penalty). A wider fan with a low customization tag is the strongest product bet.</p></div>';
    h+=sols.map(function(s){
      var custs=Object.keys(s.fits).sort(function(a,b){return s.fits[b]-s.fits[a];});
      return '<div class="card bosm-card">'
        +'<div class="bosm-top"><h3>'+esc(s.name)+'</h3><span class="bosm-score">'+s.buildOnceScore+'/10</span></div>'
        +'<div class="bosm-fan">'
          +'<div class="bosm-core">BUILD ONCE<br><span>'+s.reusePct+'% reusable</span></div>'
          +'<div class="bosm-arrow">→</div>'
          +'<div class="bosm-accounts">'+custs.map(function(c){return '<span class="bosm-acct '+(cust(c).existing?'existing':'')+'">'+esc(cust(c).name)+'</span>';}).join("")+'</div>'
          +'<div class="bosm-arrow">→</div>'
          +'<div class="bosm-rev">'+custs.length+' revenue streams</div>'
        +'</div>'
        +'<div class="bosm-meta"><span class="badge '+(s.custRisk==="Low"?"tier1":s.custRisk==="Medium"?"tier3":"tier4")+'">'+esc(s.custRisk)+' customization</span> <span class="badge tier2">'+esc(X.levels[s.level].label)+'</span></div>'
        +'</div>';
    }).join("");
    return h+calcNote();
  }

  /* ---------- White Space ---------- */
  function renderWhitespace(){
    var h='<div class="section-head"><div class="kicker">White Space</div><h2>Common problems, no strong prioritized solution</h2>'
      +'<p>Where multiple customers share a problem the current portfolio only serves weakly or by adaptation — potential new product opportunities.</p></div>';
    h+='<div class="grid grid-2">'+X.whitespace.map(function(w){
      return '<div class="card"><h3 style="margin:0 0 6px">'+esc(w.problem)+'</h3>'
        +'<div class="ix-alsofor"><span class="k">Affected</span> '+w.customers.map(function(c){return '<span class="ix-chip">'+esc(c)+'</span>';}).join("")+'</div>'
        +'<div class="ix-gap"><span class="k">Current gap</span> '+esc(w.gap)+'</div>'
        +'<div class="ix-pot"><span class="k">Potential</span> '+esc(w.potential)+'</div>'
        +'<div style="margin-top:8px">'+IX.fidTag(w.fidelity)+'</div></div>';
    }).join("")+'</div>';
    return h+calcNote();
  }

  /* ---------- Strategic Quadrant (SVG scatter) ---------- */
  function renderQuadrant(){
    return '<div class="section-head"><div class="kicker">Strategic Quadrant</div><h2>Customer intersection vs. business value</h2>'
      +'<p>Y = customer intersection score, X = ROI. Top-right = build first. Bubble size = reusable core %.</p></div>'
      +'<div class="ix-quad-wrap"><svg id="q-svg" viewBox="0 0 720 560" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Strategic quadrant"></svg></div>'
      +'<div class="legend" style="margin-top:8px"><span>Bubble size = reusable core %. Hover a bubble for the solution.</span></div>'+calcNote();
  }
  function buildQuadrant(){
    var svg=el("q-svg"); if(!svg) return; var svgns="http://www.w3.org/2000/svg";
    function mk(t,a){var e=document.createElementNS(svgns,t);for(var k in a)e.setAttribute(k,a[k]);return e;}
    var W=720,H=560, m={l:70,r:30,t:30,b:60};
    var x0=m.l,x1=W-m.r,y0=H-m.b,y1=m.t;
    function sx(roi){ return x0 + (roi/10)*(x1-x0); }
    function sy(inter){ return y0 - (inter/10)*(y0-y1); }
    svg.innerHTML="";
    // quadrant backgrounds (split at ROI 7, intersection 7)
    var mx=sx(7), my=sy(7);
    svg.appendChild(mk("rect",{x:mx,y:y1,width:x1-mx,height:my-y1,class:"q-bg q-build"}));
    svg.appendChild(mk("rect",{x:x0,y:y1,width:mx-x0,height:my-y1,class:"q-bg q-strategic"}));
    svg.appendChild(mk("rect",{x:mx,y:my,width:x1-mx,height:y0-my,class:"q-bg q-selective"}));
    svg.appendChild(mk("rect",{x:x0,y:my,width:mx-x0,height:y0-my,class:"q-bg q-defer"}));
    // quadrant labels
    [["BUILD FIRST",(mx+x1)/2,y1+18],["STRATEGIC / BUILD NEXT",(x0+mx)/2,y1+18],["SELECTIVE / CUSTOMER-SPECIFIC",(mx+x1)/2,y0-10],["DEFER",(x0+mx)/2,y0-10]].forEach(function(l){
      var t=mk("text",{x:l[1],y:l[2],"text-anchor":"middle",class:"q-quadlabel"}); t.textContent=l[0]; svg.appendChild(t);
    });
    // axes
    svg.appendChild(mk("line",{x1:x0,y1:y0,x2:x1,y2:y0,class:"q-axis"}));
    svg.appendChild(mk("line",{x1:x0,y1:y0,x2:x0,y2:y1,class:"q-axis"}));
    var xl=mk("text",{x:(x0+x1)/2,y:H-18,"text-anchor":"middle",class:"q-axislabel"}); xl.textContent="Business ROI →"; svg.appendChild(xl);
    var yl=mk("text",{x:18,y:(y0+y1)/2,"text-anchor":"middle",class:"q-axislabel",transform:"rotate(-90 18 "+((y0+y1)/2)+")"}); yl.textContent="Customer intersection →"; svg.appendChild(yl);
    // bubbles
    X.solutions.forEach(function(s){
      var cx=sx(s.roi), cy=sy(s.intersectionScore), r=8+ (s.reusePct/100)*14;
      var g=mk("g",{class:"q-bubble"});
      var c=mk("circle",{cx:cx,cy:cy,r:r,class:"q-dot"});
      var ti=mk("title",{}); ti.textContent=s.name+" — intersection "+s.intersectionScore+", ROI "+s.roi+", reuse "+s.reusePct+"%";
      c.appendChild(ti);
      var lab=mk("text",{x:cx,y:cy-r-4,"text-anchor":"middle",class:"q-dotlabel"}); lab.textContent=s.name.replace(/ Agent$/,"").replace(/ &.*/,"").slice(0,16);
      g.appendChild(c); g.appendChild(lab); svg.appendChild(g);
    });
  }

  /* ---------- CTO View ---------- */
  function renderCTO(){
    var shared=[
      ["Document intelligence (OCR/LLM)","Invoice Audit, Claims, Quoting, Customs","Parse invoices/BOL/POD/RFQ/customs docs into structured data"],
      ["Dispute / negotiation & correspondence engine","Invoice Audit, Claims, Detention","Draft, send, negotiate, and track disputes within policy"],
      ["Visibility & event ingestion","FreightLink → Exception Mgmt, Detention, Last-Mile","Normalize carrier tracking (API/EDI 214/telematics) into one feed"],
      ["Carrier data / identity registry","Carrier Fraud → Invoice Audit, Procurement","FMCSA/insurance/vetting APIs + behavioral risk"],
      ["Workflow / agent orchestration","Exception Mgmt → every later agent","Route rules vs ML vs LLM decisions; tool-calling into systems of record"],
      ["TMS / EDI-API integration gateway (Bridge)","Every agent reaching a legacy TMS","EDI 204/210/214/990 ↔ REST/JSON adapters"],
      ["Human-approval / escalation gate","All true agents","Non-negotiable gate above a defined risk/dollar threshold"],
      ["Audit trail & compliance logging","Invoice Audit, Fraud, Customs","Auditable log for finance/SOX/insurance"]
    ];
    var h='<div class="section-head"><div class="kicker">CTO View</div><h2>One core platform → many customer deployments</h2>'
      +'<p>Build the shared capabilities once; each customer is a thin configuration/adapter layer on top. This is what makes "build once, deploy repeatedly" real technically.</p></div>';
    h+='<div class="cto-stack">'
      +'<div class="cto-layer cto-core">ONE CORE PLATFORM<br><span>shared AI-agent capabilities</span></div>'
      +'<div class="cto-arrow">↓</div>'
      +'<div class="cto-caps">'+shared.map(function(c){return '<div class="cto-cap"><div class="cto-cap-name">'+esc(c[0])+'</div><div class="cto-cap-reuse">Reused by: '+esc(c[1])+'</div><div class="cto-cap-what">'+esc(c[2])+'</div></div>';}).join("")+'</div>'
      +'<div class="cto-arrow">↓</div>'
      +'<div class="cto-adapters">'+X.customers.filter(function(c){return c.existing;}).concat(X.customers.filter(function(c){return !c.existing;}).slice(0,3)).map(function(c){return '<span class="cto-adapter">'+esc(c.name)+'<br><small>customer-specific config/adapter</small></span>';}).join("")+'</div>'
      +'</div>';
    return h+calcNote();
  }

  /* ---------- Product Priorities ---------- */
  function actionFor(s){
    if(s.tier==="Tier 1") return "BUILD NOW";
    if(s.key==="freightlink"||s.key==="bridge") return "BUILD AS PLATFORM CAPABILITY";
    if(s.level===2) return "VERTICALIZE / BUILD NEXT";
    if(s.tier==="Tier 2") return "BUILD NEXT";
    if(s.customers<=1) return "CUSTOMER-SPECIFIC";
    return "DEFER";
  }
  function renderPriorities(){
    var sols=X.solutions.slice().sort(function(a,b){return b.investmentScore-a.investmentScore;});
    var h='<div class="section-head"><div class="kicker">Product Investment Priorities</div><h2>Recommended action per solution</h2></div>';
    h+='<div class="table-wrap"><table class="score"><thead><tr>'
      +'<th class="name-col">Solution</th><th>Intersection</th><th>ROI</th><th>Revenue</th><th>Reuse</th><th>Cust. risk</th><th>Level</th><th>Invest.</th><th class="name-col">Action</th></tr></thead><tbody>'
      + sols.map(function(s){ var a=actionFor(s);
        var acls=a==="BUILD NOW"?"tier1":a.indexOf("PLATFORM")>-1?"tier2":a.indexOf("VERTICAL")>-1?"tier2":a==="BUILD NEXT"?"tier2":a==="DEFER"?"tier4":"tier3";
        return '<tr><td class="name-col"><a class="name-detail-link" href="intersection.html?view=solution&sol='+s.key+'">'+esc(s.name)+'</a></td>'
          +'<td class="score-col">'+s.intersectionScore+'</td><td>'+s.roi+'</td><td>'+s.revenue+'</td><td>'+s.reuse+'</td>'
          +'<td><span class="badge '+(s.custRisk==="Low"?"tier1":s.custRisk==="Medium"?"tier3":"tier4")+'">'+esc(s.custRisk)+'</span></td>'
          +'<td>L'+s.level+'</td><td class="score-col">'+s.investmentScore+'</td>'
          +'<td class="name-col"><span class="badge '+acls+'">'+a+'</span></td></tr>';
      }).join("")+'</tbody></table></div>';
    return h+calcNote();
  }

  /* ---------- Roadmap ---------- */
  function renderRoadmap(){
    var h='<div class="section-head"><div class="kicker">Roadmap</div><h2>Sequenced by intersection strength</h2>'
      +'<p>Build the widest, most reusable, fastest-to-prove intersections first, then expand each product across look-alike customers.</p></div>';
    h+='<div class="timeline">'+X.roadmap.map(function(ph){
      return '<div class="phase"><div class="phase-head"><span class="phase-num">'+esc(ph.phase)+'</span><span class="phase-months">'+esc(ph.theme)+'</span></div>'
        +'<p class="build">'+ph.build.map(esc).join(" · ")+'</p>'
        +'<div class="rowlist"><div class="k">Scale path</div><div class="v">'+esc(ph.scale)+'</div></div></div>';
    }).join("")+'</div>';
    return h+calcNote();
  }

  /* ---------- Decision Table ---------- */
  function renderDecision(){
    var sols=X.solutions.slice().sort(function(a,b){return b.investmentScore-a.investmentScore;});
    var h='<div class="section-head"><div class="kicker">Decision Table</div><h2>Final strategic prioritization</h2></div>';
    h+='<div class="table-wrap"><table class="score"><thead><tr>'
      +'<th>#</th><th class="name-col">Solution</th><th class="name-col">Common problem</th><th>Existing</th><th>Potential</th><th>Intersect.</th><th>ROI</th><th>Reuse%</th><th>Cust. risk</th><th>Build-once</th><th>Invest.</th><th class="name-col">Decision</th></tr></thead><tbody>'
      + sols.map(function(s,i){ var a=actionFor(s); var acls=a==="BUILD NOW"?"tier1":a==="DEFER"?"tier4":a.indexOf("CUSTOMER")>-1?"tier3":"tier2";
        return '<tr><td class="rank-col">'+(i+1)+'</td><td class="name-col">'+esc(s.name)+'</td><td class="name-col">'+esc(prob(s.problem).name)+'</td>'
          +'<td>'+s.existingCustomers+'</td><td>'+s.customers+'</td><td class="score-col">'+s.intersectionScore+'</td><td>'+s.roi+'</td><td>'+s.reusePct+'%</td>'
          +'<td><span class="badge '+(s.custRisk==="Low"?"tier1":s.custRisk==="Medium"?"tier3":"tier4")+'">'+esc(s.custRisk)+'</span></td>'
          +'<td class="score-col">'+s.buildOnceScore+'</td><td class="score-col">'+s.investmentScore+'</td>'
          +'<td class="name-col"><span class="badge '+acls+'">'+a+'</span></td></tr>';
      }).join("")+'</tbody></table></div>';
    // executive recommendation
    var top=sols.slice(0,7);
    h+='<div class="section-head" style="margin-top:28px"><div class="kicker">Executive recommendation</div><h2>If resources are limited, invest here</h2></div>';
    h+='<div class="grid grid-3">'
      +'<div class="card"><h3 style="margin:0 0 8px">Top 3 — Build now</h3><ol class="ix-ol">'+top.slice(0,3).map(function(s){return '<li>'+esc(s.name)+' <span class="ix-ol-score">'+s.investmentScore+'</span></li>';}).join("")+'</ol></div>'
      +'<div class="card"><h3 style="margin:0 0 8px">Top 5 — Build next</h3><ol class="ix-ol">'+top.slice(0,5).map(function(s){return '<li>'+esc(s.name)+'</li>';}).join("")+'</ol></div>'
      +'<div class="card"><h3 style="margin:0 0 8px">Top 7 — Strategic portfolio</h3><ol class="ix-ol">'+top.map(function(s){return '<li>'+esc(s.name)+'</li>';}).join("")+'</ol></div>'
      +'</div>';
    return h+calcNote();
  }

  /* ---------- Router ---------- */
  var RENDER={ ceo:IX.renderCEO, heatmap:IX.renderHeatmap, solution:IX.renderSolution, customer:IX.renderCustomer,
    network:renderNetwork, bosm:renderBOSM, whitespace:renderWhitespace, quadrant:renderQuadrant,
    cto:renderCTO, priorities:renderPriorities, roadmap:renderRoadmap, decision:renderDecision };
  function currentView(){ var v=qp("view")||"ceo"; return IX.VIEWS.some(function(x){return x[0]===v;})?v:"ceo"; }
  function tabs(active){ return IX.VIEWS.map(function(v){return '<a class="mtab'+(v[0]===active?' active':'')+'" href="intersection.html?view='+v[0]+'">'+esc(v[1])+'</a>';}).join(""); }

  window.addEventListener("DOMContentLoaded",function(){
    var v=currentView();
    var t=el("ixtabs"); if(t) t.innerHTML=tabs(v);
    var body=el("ixv"); if(body) body.innerHTML=(RENDER[v]||IX.renderCEO)();
    if(v==="heatmap") IX.wireHeatmap();
    if(v==="solution") IX.wireSolution();
    if(v==="customer") IX.wireCustomer();
    if(v==="network") buildNetwork();
    if(v==="quadrant") buildQuadrant();
  });
})();
