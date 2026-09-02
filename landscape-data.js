/* Market Landscape — EXTERNALLY RESEARCHED competitive set for each solution category.
   NOT from the ideyaLabs source documents. Compiled from public vendor sites / trade press
   (see sources per row). Customer names are only those a vendor or credible source publicly
   states. Content paraphrased for licensing compliance. Last researched: 2026. */

window.LANDSCAPE = {
  disclaimer: "This section is externally researched from public vendor websites and trade press — it is NOT part of the ideyaLabs source analysis. Vendor capabilities and customer names reflect public claims at the time of research and should be independently verified before use in a sales or competitive context. Content is paraphrased for licensing compliance.",

  categories: [
    {
      solutionKey: "invoice-audit", detailId: "invoice-audit",
      solution: "Invoice Audit, Discrepancy Resolution & Payment Agent",
      market: "Freight audit & payment (FAP) / transportation spend management",
      differentiation: "Incumbents (Cass, Trax, nVision) are largely rules-engine + BPO — human auditors review exceptions. AI-native entrants (Trax Prizma, Loop, Navix) are moving toward document-intelligence and exception automation. ideyaLabs' wedge is a full negotiate-and-pay agent that drafts disputes, negotiates within a threshold, and releases payment — closing the loop rather than flagging for a human.",
      vendors: [
        { name:"Cass Information Systems", what:"Long-established freight audit & payment outsourcer; audits invoices against contracts at scale for very large shippers.", customers:"Enterprise shippers with annual freight cost from tens of millions to $1B+ (Cass, not individually named).", source:"cassinfo.com" },
        { name:"Trax Technologies (Prizma)", what:"AI-powered freight audit & spend management; launched 'Prizma' AI (Aug 2025), AI Extractor + Audit Optimizer; claims to audit 100% of invoices across modes for 5–7% savings.", customers:"Global enterprise shippers (not individually named publicly).", source:"traxtech.com" },
        { name:"nVision Global", what:"Global freight audit & payment plus loss & damage claims; 30+ years of freight data, 23 operations centers across 15 countries; added AI-driven audit.", customers:"Global multi-mode shippers (not individually named publicly).", source:"nvisionglobal.com" },
        { name:"Loop (DUX AI)", what:"AI-native audit-and-pay; its 'DUX AI' ingests logistics documents in any format, connects invoices to contracts/BOLs/tracking before audit, never approves an incorrect rate/accessorial.", customers:"Shippers & brokers (public case studies; not individually named here).", source:"loop.com" },
        { name:"Navix", what:"AI-powered freight-audit & financial-workflow automation aimed at 3PLs/brokers (pre-bill, invoice approval, order-to-cash).", customers:"Bison Transport (named in the source analysis) and a broad 3PL/brokerage base per your own research.", source:"navix.io" }
      ]
    },
    {
      solutionKey: "exception-mgmt", detailId: "exception-mgmt",
      solution: "Shipment Exception Management & Disruption Response Agent",
      market: "Real-time visibility + agentic exception handling / decision intelligence",
      differentiation: "The big visibility platforms own the data and are now adding agentic action (project44's 'Decision Intelligence' orchestrates AI agents to detect-decide-act; FourKites 'recommended actions'). Whitespace remains for mid-market shippers priced out of enterprise platforms and for deeper carrier/driver-contact automation (the phone-call/negotiation layer) beyond alerting.",
      vendors: [
        { name:"project44", what:"Enterprise real-time visibility across modes; 'Decision Intelligence' platform orchestrates AI agents to detect, decide, and act; 240,000+ carriers.", customers:"Publicly associated with Amazon, Unilever, and Nestlé (third-party profile); MasterBrand cited raising carrier completion 58%→93.6% in two months.", source:"project44.com" },
        { name:"FourKites", what:"Real-time visibility with at-risk-shipment alerts and recommended actions; Intelligent Network across road/ocean.", customers:"Large CPG/food & beverage shippers (Golden Kite customer awards; specific names in case studies).", source:"fourkites.com" },
        { name:"Descartes MacroPoint", what:"Freight tracking/visibility widely bundled with carrier vetting; used alongside MyCarrierPortal.", customers:"Brokers/3PLs such as Flat World Global (Descartes case study).", source:"descartes.com" },
        { name:"Tive", what:"Real-time shipment + IoT sensor tracking (location and condition), often cited as a visibility peer.", customers:"Shippers needing condition/location monitoring (not individually named here).", source:"tive.com" }
      ]
    },
    {
      solutionKey: "claims", detailId: "claims",
      solution: "Freight Claims Management & Recovery Agent",
      market: "Freight loss & damage claims automation",
      differentiation: "The source analysis rated this White Space — the least crowded category. Most tools help see/analyze damage (or bundle claims into FAP), few autonomously detect, document, file, and chase claims to resolution. That gap is the opportunity; Loop's DUX and nVision's L&D module are the nearest adjacencies.",
      vendors: [
        { name:"nVision Global", what:"Freight audit & payment plus a dedicated Loss & Damage Claims service line.", customers:"Global shippers (not individually named publicly).", source:"nvisionglobal.com" },
        { name:"Loop", what:"Document-intelligence audit-and-pay platform whose DUX AI structures BOLs/POD/invoices — adjacent to claims detection.", customers:"Shippers & brokers (public case studies).", source:"loop.com" },
        { name:"Trax Technologies", what:"AI freight-audit platform that surfaces billing/compliance issues; claims-adjacent exception management.", customers:"Global enterprise shippers (not individually named publicly).", source:"traxtech.com" },
        { name:"TMS-embedded claims modules", what:"Most large TMS platforms include a claims module — largely record-keeping/tracking, not proactive autonomous filing.", customers:"TMS customers broadly.", source:"(various TMS vendors)" }
      ]
    },
    {
      solutionKey: "carrier-fraud", detailId: "carrier-fraud",
      solution: "Carrier Identity, Onboarding & Fraud-Prevention Agent",
      market: "Carrier vetting, onboarding & fraud / double-brokering prevention",
      differentiation: "Established vendors are strong at verification databases + onboarding workflow and shared incident networks. The source analysis noted the whitespace is the agentic layer that continuously monitors, scores tenders in real time, and takes first-line action (holding a tender, contacting a carrier) — not just surfacing a report.",
      vendors: [
        { name:"Descartes MyCarrierPortal", what:"Carrier identity, insurance monitoring, onboarding, and fraud/double-brokering prevention with a shared incident-reporting network; integrates with TMS.", customers:"Flat World Global, SIMS Global, and Bridgeway (Descartes case studies).", source:"descartes.com / mycarrierportal.com" },
        { name:"Highway", what:"Carrier identity & freight-fraud prevention; rigorous verification to minimize fraud and double-brokering.", customers:"NFI (Highway case study: streamlined onboarding and reduced fraud).", source:"highway.com" },
        { name:"Carrier411", what:"Carrier monitoring service (authority, insurance, safety, freight-guard reports) widely used by brokers.", customers:"Brokers/3PLs broadly (not individually named here).", source:"carrier411.com" },
        { name:"RMIS (Truckstop)", what:"Carrier onboarding, monitoring, and compliance management, part of Truckstop.", customers:"Brokers/3PLs broadly.", source:"truckstop.com" }
      ]
    },
    {
      solutionKey: "procurement", detailId: "procurement",
      solution: "Dynamic Freight Procurement & Carrier-Sourcing Agent",
      market: "Freight procurement, rate benchmarking & dynamic sourcing",
      differentiation: "Rate benchmarking and marketplaces are relatively mature; autonomous, negotiated re-tendering and routing-guide execution at the moment of tender rejection — without a human working the phone — is still nascent, and is where project44's 2026 procurement agent signals the market is heading.",
      vendors: [
        { name:"Emerge", what:"Freight procurement platform (spot + contract) with a 45,000+ pre-vetted carrier marketplace and rate benchmarking; 'Emerge AI' load-matches carriers to lanes.", customers:"Shippers buying freight capacity (marketplace model).", source:"emergemarket.com" },
        { name:"Greenscreens.ai", what:"Dynamic pricing / rate prediction for brokers and shippers; often paired with quoting/booking layers.", customers:"Freight brokers (not individually named here).", source:"greenscreens.ai" },
        { name:"project44 Freight Procurement Agent", what:"2026-launched agent extending the visibility platform toward autonomous procurement/re-tendering.", customers:"Enterprise shippers on the project44 platform.", source:"project44.com" },
        { name:"DAT RateView", what:"Benchmark rate intelligence widely used to price and validate lanes.", customers:"Brokers/shippers broadly.", source:"dat.com" }
      ]
    },
    {
      solutionKey: "detention", detailId: "detention",
      solution: "Detention & Dock Appointment Coordination Agent",
      market: "Dock appointment scheduling & detention management",
      differentiation: "Incumbents manage the appointment calendar and self-service booking well. The differentiated agentic opportunity is true two-way real-time renegotiation plus automated, geofenced detention-fee generation and collection — Loadsmart's 'Scheduling & Rescheduling agent' is the clearest sign the market is moving this way.",
      vendors: [
        { name:"Opendock (Loadsmart)", what:"Largest dock-scheduling network in freight; carrier self-service booking + warehouse visibility; cited cutting detention/turnaround 25–30%. Spans 4,500+ warehouses, 230,000+ carriers.", customers:"Warehouses/DCs/manufacturing plants broadly (network model).", source:"opendock.com / loadsmart.com" },
        { name:"Loadsmart AI (Scheduling & Rescheduling agent)", what:"Agent that books against live availability, detects slipped pickups, reschedules, and notifies parties — handling no-shows without a person babysitting the calendar.", customers:"Shippers/warehouses on the Loadsmart platform.", source:"loadsmart.com" },
        { name:"C3 Solutions (C3 Reservations)", what:"Dock-scheduling with carrier self-serve portal, compliance and scorecarding.", customers:"Shippers/receivers with high appointment volume.", source:"c3solutions.com" },
        { name:"Gatehouse / RMIS / TMS-native dock modules", what:"Various yard/dock scheduling modules embedded in WMS/TMS suites (Descartes, Manhattan, Blue Yonder).", customers:"WMS/TMS customers broadly.", source:"(various WMS/TMS vendors)" }
      ]
    },
    {
      solutionKey: "freightlink", detailId: "freightlink",
      solution: "FreightLink — Unified Visibility Hub",
      market: "Multi-carrier visibility / tracking normalization (mid-market)",
      differentiation: "Enterprise visibility is vendor-dominated (project44, FourKites, Trimble/Transporeon). FreightLink deliberately targets the underserved mid-market (50–2,000 loads/mo) with pre-built connectors, rather than competing head-on at the enterprise tier. It is positioned honestly as AI-assisted automation (predictive ETA + alerts), the data foundation for the Exception agent.",
      vendors: [
        { name:"project44", what:"Enterprise visibility across 240,000+ carriers and 98%+ of global ocean freight.", customers:"Amazon, Unilever, Nestlé (third-party profile).", source:"project44.com" },
        { name:"FourKites", what:"Enterprise real-time visibility with proactive alerts and recommended actions.", customers:"Large CPG/F&B shippers.", source:"fourkites.com" },
        { name:"Trimble / Transporeon", what:"Visibility modules within a large transportation-technology suite, strong in Europe.", customers:"Enterprise shippers/carriers.", source:"transporeon.com" },
        { name:"Tive", what:"Real-time location + condition tracking via IoT sensors.", customers:"Shippers needing condition monitoring.", source:"tive.com" }
      ]
    },
    {
      solutionKey: "quoting", detailId: "quoting",
      solution: "Freight Quoting & RFQ Response Agent",
      market: "AI freight quoting / RFQ automation (forwarding & brokerage)",
      differentiation: "Competitive/crowded field: several point solutions already target this exact use case. The source analysis is clear that differentiation must come from integration depth (TMS/CRM, free-text RFQ parsing), not pricing logic, which is increasingly commoditized.",
      vendors: [
        { name:"Wisor.ai", what:"AI agent that turns a forwarder's inbox into a quoting/booking engine (Outlook/Gmail); integrates with Freightos WebCargo for live rates; claims 80%+ time savings and 20%+ win-rate lift.", customers:"Freight forwarders (G2-reviewed; integrates with Freightos network).", source:"wisor.ai / freightos.com" },
        { name:"Emerge", what:"Spot + contract quoting for shippers with a large carrier marketplace and award-time benchmarking.", customers:"Shippers buying capacity.", source:"emergemarket.com" },
        { name:"Freightos (WebCargo)", what:"Global air/ocean rate management and instant quoting marketplace for forwarders.", customers:"Freight forwarders and airlines globally.", source:"freightos.com" },
        { name:"FreightMango / Debales AI / 41 Labs", what:"Various forwarder-quoting automation entrants competing on speed and channel coverage.", customers:"Forwarders/brokers (not individually named here).", source:"(various vendor sites)" }
      ]
    },
    {
      solutionKey: "empty-mile", detailId: "empty-mile",
      solution: "Empty-Mile / Dynamic Backhaul Agent",
      market: "Load matching / deadhead & empty-mile reduction",
      differentiation: "Load boards and digital freight matching (DAT, Truckstop, Uber Freight) own capacity discovery; most stop at 'here's a match'. The differentiated agent opportunity is closing the loop to autonomous, negotiated booking — from match to 'booked, confirmed, and on the driver's app' — without dispatcher intervention for routine cases.",
      vendors: [
        { name:"DAT", what:"Largest load board + rate intelligence; the default for broad matching workflows.", customers:"Carriers/brokers broadly.", source:"dat.com" },
        { name:"Truckstop", what:"Load board + carrier tools (includes RMIS compliance).", customers:"Carriers/brokers broadly.", source:"truckstop.com" },
        { name:"Uber Freight", what:"AI load matching + network optimization; states it removed ~4M empty miles from its network since 2023 and models up to 64% industry empty-mile reduction via optimization.", customers:"Shippers and carriers on the Uber Freight network.", source:"uberfreight.com" },
        { name:"Loadsmart", what:"AI-native TMS + matching; flatbed/backhaul filling to cut carriers' empty miles.", customers:"Shippers/carriers on the Loadsmart platform.", source:"loadsmart.com" }
      ]
    },
    {
      solutionKey: "bridge", detailId: "bridge",
      solution: "Bridge — TMS Integration Gateway",
      market: "EDI/API integration & TMS connectivity middleware",
      differentiation: "Legacy-TMS integration is a systems-integrator-led services category dominated by general B2B integration platforms. Bridge productizes the 'legacy TMS → modern API' pattern for the underserved mid-market with pre-built EDI transaction-set templates, cutting trading-partner onboarding from 4–6 weeks to 3–5 days.",
      vendors: [
        { name:"Cleo (Integration Cloud)", what:"B2B EDI/API/MFT integration platform with pre-built ERP/TMS/WMS connectors; documented TMW/Trimble and MercuryGate connectivity.", customers:"Manufacturers, 3PLs, and supply-chain enterprises broadly.", source:"cleo.com" },
        { name:"SPS Commerce", what:"Large retail-focused EDI network and integration platform.", customers:"Retail suppliers and logistics partners.", source:"spscommerce.com" },
        { name:"MercuryGate / McLeod / Trimble (TMW)", what:"The legacy/modern TMS platforms themselves — the systems Bridge connects to (integration is typically custom or SI-led).", customers:"Carriers, brokers, 3PLs.", source:"(TMS vendor sites)" },
        { name:"Systems integrators (custom)", what:"The status quo for many mid-market carriers: multi-week custom EDI mapping projects per trading partner.", customers:"Legacy-TMS operators.", source:"(services market)" }
      ]
    }
  ]
};
