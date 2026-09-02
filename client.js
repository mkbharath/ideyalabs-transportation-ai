/* Existing client deep-dive renderer. Reads window.MARKET, keyed by ?id= */
(function(){
  var M=window.MARKET||{};
  function esc(s){return String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");}
  function qs(n){var m=new RegExp("[?&]"+n+"=([^&]+)").exec(location.search);return m?decodeURIComponent(m[1]):null;}
  function fitBadge(level){var f=M.fitLevels[level];return f?'<span class="fit-badge '+f.cls+'">'+esc(f.label)+'</span>':"";}
  var FID_DEFS = {
    "fid-fact": ["FACT — documented & sourced", "Confirmed by real evidence: the client's own public disclosures, a vendor announcement, or ideyaLabs' project materials. Not an assumption."],
    "fid-assess": ["Assessment / Inference", "A reasoned judgment built by matching the client's known operating model against the solution's ideal-customer profile. Credible, but should be pressure-tested with the client — not something they have confirmed."],
    "fid-validate": ["Needs client validation", "A plausible hypothesis with no evidence yet. Included for completeness, but the next step is a discovery conversation to confirm it before acting — not a pitch."]
  };
  function fidelityTag(f){
    if(!f)return"";
    var c=f.indexOf("FACT")>-1?"fid-fact":(f.indexOf("NEEDS")>-1?"fid-validate":"fid-assess");
    var d=FID_DEFS[c];
    var attr=d?' data-tip-title="'+d[0]+'" data-tip-body="'+d[1].replace(/"/g,"&quot;")+'"':'';
    return '<span class="fid '+c+'"'+attr+'>'+esc(f)+'</span>';
  }
  function fidelityLegend(){
    return '<div class="fid-legend">'
      +'<span class="fid-legend-label">Evidence level:</span>'
      +'<span class="fid fid-fact" data-tip-title="'+FID_DEFS["fid-fact"][0]+'" data-tip-body="'+FID_DEFS["fid-fact"][1].replace(/"/g,"&quot;")+'">FACT</span> documented &amp; sourced'
      +'<span class="fid fid-assess" data-tip-title="'+FID_DEFS["fid-assess"][0]+'" data-tip-body="'+FID_DEFS["fid-assess"][1].replace(/"/g,"&quot;")+'">Assessment</span> reasoned inference'
      +'<span class="fid fid-validate" data-tip-title="'+FID_DEFS["fid-validate"][0]+'" data-tip-body="'+FID_DEFS["fid-validate"][1].replace(/"/g,"&quot;")+'">Needs validation</span> confirm with client first'
      +'</div>';
  }
  function panel(t,inner){return '<div class="card detail-card"><h2 class="detail-h">'+esc(t)+'</h2>'+inner+'</div>';}

  window.addEventListener("DOMContentLoaded",function(){
    var id=qs("id"); var c=(M.clients||[]).filter(function(x){return x.id===id;})[0];
    if(!c){document.getElementById("c-title").textContent="Client not found";
      document.getElementById("c-body").innerHTML='<div class="callout warn">Client not found. <a href="market.html?view=clients">Back to Existing Clients</a>.</div>';return;}

    document.title=c.name+" — Client Fit — ideyaLabs Transportation AI";
    document.getElementById("c-title").textContent=c.name;
    document.getElementById("c-tagline").textContent=c.model;
    document.getElementById("c-badges").innerHTML=fitBadge(c.fit)+' <span class="badge saas">'+esc(c.type)+'</span>';
    document.getElementById("c-meta").innerHTML="<span><strong>"+esc(c.location)+"</strong></span><span>Best opportunity: <strong>"+esc(c.bestOpportunity)+"</strong></span>";

    var left="";
    left+=fidelityLegend();
    if(c.autoNote) left+='<div class="callout warn">'+esc(c.autoNote)+'</div><br/>';
    // facts
    left+=panel("What we know", '<ul class="fact-list">'+c.facts.map(function(f){
      return '<li>'+fidelityTag(f[0])+' '+esc(f[1])+'</li>';}).join("")+'</ul>');
    // opportunities
    var opps=c.opportunities.map(function(o){
      var head='<div class="opp-head"><span class="rank-badge sm">'+o.rank+'</span><h3>'+esc(o.solution)+'</h3>'+fidelityTag(o.fidelity)+'</div>';
      var rows='';
      if(o.base) rows+='<li><span class="k">Adapted from</span><span class="v">'+esc(o.base)+'</span></li>';
      if(o.adaptation) rows+='<li><span class="k">Adaptation</span><span class="v">'+esc(o.adaptation)+'</span></li>';
      rows+='<li><span class="k">Why it fits</span><span class="v">'+esc(o.why)+'</span></li>';
      rows+='<li><span class="k">Problem</span><span class="v">'+esc(o.problem)+'</span></li>';
      rows+='<li><span class="k">Buyer</span><span class="v">'+esc(o.buyer)+'</span></li>';
      rows+='<li><span class="k">KPI</span><span class="v">'+esc(o.kpi)+'</span></li>';
      rows+='<li><span class="k">Pilot</span><span class="v">'+esc(o.pilot)+'</span></li>';
      var link=o.detailId?'<a class="detail-cta" href="detail.html?id='+o.detailId+'">View base product detail →</a>':'';
      return '<div class="opp-block">'+head+'<ul class="detail-list">'+rows+'</ul>'+link+'</div>';
    }).join("");
    left+=panel("Best opportunities", opps);

    var right="";
    var fe=c.firstEngagement;
    right+=panel("Recommended first engagement",
      '<ul class="detail-list">'
      +'<li><span class="k">Solution</span><span class="v">'+esc(fe.solution)+'</span></li>'
      +'<li><span class="k">Pilot</span><span class="v">'+esc(fe.pilot)+'</span></li>'
      +'<li><span class="k">Success</span><span class="v">'+esc(fe.success)+'</span></li>'
      +'</ul>');
    right+=panel("Expansion path (land & expand)", '<p class="expansion">'+esc(fe.expansion)+'</p>');
    right+=panel("At a glance",
      '<div class="kv">'
      +'<div class="kv-k">Fit</div><div class="kv-v">'+esc(c.fitNote)+'</div>'
      +'<div class="kv-k">Buyer</div><div class="kv-v">'+esc(c.buyer)+'</div>'
      +'<div class="kv-k">Key problem</div><div class="kv-v">'+esc(c.keyProblem)+'</div>'
      +'<div class="kv-k">KPI / ROI</div><div class="kv-v">'+esc(c.kpiRoi)+'</div>'
      +'<div class="kv-k">Validation</div><div class="kv-v">'+esc(c.validation)+'</div>'
      +'</div>');

    document.getElementById("c-body").innerHTML='<div class="detail-col-main">'+left+'</div><div class="detail-col-side">'+right+'</div>';
  });
})();
