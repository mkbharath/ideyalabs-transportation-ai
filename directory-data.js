/* Agent Market Directory — a BROAD, market-wide directory of AI/automation vendors serving
   logistics & transportation (not limited to ideyaLabs' 10 solutions).
   EXTERNALLY RESEARCHED from public vendor sites, G2, and trade press (sources per row).
   Pricing in freight-tech is largely non-public: the 'spend' field shows the pricing MODEL
   plus any figure, each tagged by confidence. NOTHING is invented. Researched 2026. */

window.DIRECTORY = {
  disclaimer: "Externally researched market directory — NOT part of the ideyaLabs source analysis. Most freight-tech pricing is not published; figures below are tagged Published (on vendor site), Reported (third-party/press estimate), Estimate (inferred range), or Not disclosed (custom quote only). Treat all spend figures as directional and confirm with a written quote. Customer names are only those publicly stated. Content paraphrased for licensing compliance; point-in-time snapshot (2026).",

  spendTags: {
    published:   { label: "Published",     cls: "spend-pub" },
    reported:    { label: "Reported",      cls: "spend-rep" },
    estimate:    { label: "Estimate",      cls: "spend-est" },
    "not-disc":  { label: "Not disclosed", cls: "spend-nd" }
  },

  vendors: [
    /* --- Freight audit & payment --- */
    { name:"Cass Information Systems", cat:"Freight audit & payment", what:"Established freight audit & payment outsourcer at enterprise scale.",
      customers:"Enterprise shippers ($10M–$1B+ annual freight; not individually named).", model:"Contingency / gain-share on audit savings (+ per-transaction fees).",
      spend:"~6–12% of audit savings (industry FAP contingency norm)", tag:"reported", source:"cassinfo.com; lastrev.com" },
    { name:"Trax Technologies (Prizma)", cat:"Freight audit & payment", what:"AI-powered freight audit & spend management; 'Prizma' AI (2025).",
      customers:"Global enterprise shippers (not individually named).", model:"Platform + contingency; targets 5–7% freight-spend savings.",
      spend:"~6–12% of savings (FAP norm); custom", tag:"reported", source:"traxtech.com; lastrev.com" },
    { name:"nVision Global", cat:"Freight audit & payment", what:"Global FAP + loss & damage claims; 23 ops centers, 15 countries.",
      customers:"Global multi-mode shippers (not individually named).", model:"Contingency / per-transaction.",
      spend:"~6–12% of savings (FAP norm); custom", tag:"reported", source:"nvisionglobal.com; lastrev.com" },
    { name:"AFS Logistics", cat:"Freight audit & payment", what:"Freight audit & payment plus parcel/LTL cost management.",
      customers:"Mid-market to enterprise shippers.", model:"Contingency / gain-share.",
      spend:"~6–12% of savings (FAP norm)", tag:"reported", source:"lastrev.com" },
    { name:"U.S. Bank Freight Payment", cat:"Freight audit & payment", what:"Bank-backed freight audit & payment at enterprise scale.",
      customers:"Large enterprise shippers.", model:"Per-transaction / banking fees.",
      spend:"Custom / not disclosed", tag:"not-disc", source:"lastrev.com" },
    { name:"Loop", cat:"Freight audit & payment", what:"AI-native audit-and-pay; 'DUX AI' structures docs before audit.",
      customers:"Shippers & brokers (public case studies).", model:"SaaS platform (custom).",
      spend:"Custom / not disclosed", tag:"not-disc", source:"loop.com" },
    { name:"Navix", cat:"Freight audit & payment", what:"AI freight-audit & financial-workflow automation for 3PLs/brokers.",
      customers:"Bison Transport (source analysis) + broad 3PL/brokerage base.", model:"SaaS / workflow automation (custom).",
      spend:"Custom / not disclosed", tag:"not-disc", source:"navix.io" },

    /* --- Real-time visibility & exception --- */
    { name:"project44 (Movement)", cat:"Visibility & exception", what:"Enterprise real-time visibility + 'Decision Intelligence' agent orchestration; 240,000+ carriers.",
      customers:"Amazon, Unilever, Nestlé (third-party profile); MasterBrand.", model:"Annual enterprise SaaS by volume/modules; free for carriers to join.",
      spend:"Custom enterprise (not published)", tag:"not-disc", source:"project44.com; canvasbusinessmodel.com" },
    { name:"FourKites", cat:"Visibility & exception", what:"Real-time visibility with at-risk alerts + recommended actions.",
      customers:"Large CPG/F&B shippers (Golden Kite awards).", model:"Quote-based annual SaaS; no free tier.",
      spend:"~$100–$500 / user / month (3rd-party estimate; varies by volume/modules)", tag:"reported", source:"fareye.com; locus.sh" },
    { name:"Tive", cat:"Visibility & exception", what:"Real-time location + condition (IoT sensor) tracking.",
      customers:"Shippers needing condition/location monitoring.", model:"SaaS + sensor hardware.",
      spend:"Custom; sensor + subscription (not published)", tag:"not-disc", source:"tive.com" },
    { name:"Descartes MacroPoint", cat:"Visibility & exception", what:"Freight tracking/visibility, often bundled with carrier vetting.",
      customers:"Brokers/3PLs (e.g. Flat World Global).", model:"SaaS (part of Descartes suite).",
      spend:"Custom / not disclosed", tag:"not-disc", source:"descartes.com" },

    /* --- Carrier vetting & fraud --- */
    { name:"Descartes MyCarrierPortal", cat:"Carrier vetting & fraud", what:"Carrier identity, insurance monitoring, onboarding, fraud/double-brokering prevention.",
      customers:"Flat World Global, SIMS Global, Bridgeway.", model:"Tiered SaaS (Standard + higher tiers).",
      spend:"Published tiers on site (figures via quote)", tag:"published", source:"mycarrierportal.com" },
    { name:"Highway", cat:"Carrier vetting & fraud", what:"Carrier identity & freight-fraud prevention with rigorous verification.",
      customers:"NFI (case study).", model:"SaaS (custom).",
      spend:"Custom / not disclosed", tag:"not-disc", source:"highway.com" },
    { name:"Carrier411", cat:"Carrier vetting & fraud", what:"Carrier monitoring (authority, insurance, safety, FreightGuard).",
      customers:"Brokers/3PLs broadly.", model:"Low-cost monthly subscription.",
      spend:"~$40–$100 / month (typical broker tools; confirm)", tag:"estimate", source:"carrier411.com" },
    { name:"RMIS (Truckstop)", cat:"Carrier vetting & fraud", what:"Carrier onboarding, monitoring, compliance (part of Truckstop).",
      customers:"Brokers/3PLs broadly.", model:"SaaS (custom).",
      spend:"Custom / not disclosed", tag:"not-disc", source:"truckstop.com" },

    /* --- Procurement & quoting --- */
    { name:"Emerge", cat:"Procurement & quoting", what:"Freight procurement (spot + contract) + 45,000-carrier marketplace; 'Emerge AI'.",
      customers:"Shippers buying capacity.", model:"Marketplace / SaaS (custom).",
      spend:"Custom / not disclosed", tag:"not-disc", source:"emergemarket.com" },
    { name:"Greenscreens.ai", cat:"Procurement & quoting", what:"Dynamic rate prediction/pricing for brokers & shippers (acq. Triumph 2025).",
      customers:"Freight brokers (not individually named).", model:"SaaS subscription.",
      spend:"Custom / not disclosed", tag:"not-disc", source:"greenscreens.ai; cbinsights.com" },
    { name:"Wisor.ai", cat:"Procurement & quoting", what:"AI agent turning a forwarder's inbox into a quoting/booking engine; Freightos integration.",
      customers:"Freight forwarders (G2-reviewed).", model:"Subscription by team size / shipment volume / features.",
      spend:"Tiered subscription (figures via quote)", tag:"reported", source:"wisor.ai; g2.com" },
    { name:"Freightos (WebCargo)", cat:"Procurement & quoting", what:"Global air/ocean rate management + instant quoting marketplace.",
      customers:"Forwarders & airlines globally.", model:"Marketplace + SaaS.",
      spend:"Custom / not disclosed", tag:"not-disc", source:"freightos.com" },

    /* --- Dock & detention --- */
    { name:"Opendock (Loadsmart)", cat:"Dock & detention", what:"Largest dock-scheduling network; carrier self-service booking; 4,500+ warehouses.",
      customers:"Warehouses/DCs/plants (network model).", model:"SaaS by facility.",
      spend:"Custom by facility count (not published)", tag:"not-disc", source:"opendock.com" },
    { name:"C3 Solutions", cat:"Dock & detention", what:"Dock-scheduling (C3 Reservations) with self-serve portal + scorecarding.",
      customers:"Shippers/receivers with high appointment volume.", model:"SaaS (custom).",
      spend:"Custom / not disclosed", tag:"not-disc", source:"c3solutions.com" },

    /* --- Load matching / empty-mile --- */
    { name:"DAT", cat:"Load matching & capacity", what:"Largest load board + rate intelligence (DAT iQ).",
      customers:"Carriers/brokers broadly (325k+ pros).", model:"Flat monthly subscription tiers.",
      spend:"From ~$49/mo (carriers) to ~$145/mo (brokers); DAT One from $59/mo", tag:"published", source:"dat.com; g2.com" },
    { name:"Truckstop", cat:"Load matching & capacity", what:"Load board + carrier compliance tools (incl. RMIS).",
      customers:"Carriers/brokers broadly (80M annual loads).", model:"Monthly subscription tiers.",
      spend:"From ~$39/mo (carriers); broker plans higher", tag:"published", source:"truckstop.com; oiengine.com" },
    { name:"Uber Freight", cat:"Load matching & capacity", what:"AI load matching + network optimization; cited ~4M empty miles removed since 2023.",
      customers:"Shippers & carriers on the network.", model:"Marketplace / managed transportation.",
      spend:"Transaction / managed (not published)", tag:"not-disc", source:"uberfreight.com" },

    /* --- AI-native TMS / logistics platform --- */
    { name:"Loadsmart", cat:"AI-native TMS / platform", what:"AI-native TMS + Opendock; agents auto-resolve 80%+ of routine work across the freight lifecycle.",
      customers:"Shippers/carriers on the platform.", model:"Platform SaaS (custom).",
      spend:"Custom / not disclosed", tag:"not-disc", source:"loadsmart.com" },
    { name:"MercuryGate / McLeod / Trimble (TMW)", cat:"AI-native TMS / platform", what:"Established TMS platforms adding AI; the systems Bridge-style middleware connects to.",
      customers:"Carriers, brokers, 3PLs.", model:"Enterprise license + implementation.",
      spend:"Enterprise license (custom)", tag:"not-disc", source:"(TMS vendor sites)" },

    /* --- Integration / EDI middleware --- */
    { name:"Cleo (Integration Cloud)", cat:"Integration & EDI", what:"B2B EDI/API/MFT integration with pre-built ERP/TMS/WMS connectors.",
      customers:"Manufacturers, 3PLs, supply-chain enterprises.", model:"Platform subscription (custom).",
      spend:"Custom / not disclosed", tag:"not-disc", source:"cleo.com" },
    { name:"SPS Commerce", cat:"Integration & EDI", what:"Large retail-focused EDI network & integration platform.",
      customers:"Retail suppliers & logistics partners.", model:"SaaS subscription.",
      spend:"Custom / not disclosed", tag:"not-disc", source:"spscommerce.com" },

    /* --- Driver safety & telematics (adjacent) --- */
    { name:"Samsara", cat:"Fleet safety & telematics", what:"Unified AI safety cameras + ELD + telematics; cited ~8x ROI.",
      customers:"Large mixed fleets across industries.", model:"Per-vehicle/month SaaS + hardware; multi-year contract.",
      spend:"~$27–$60 / vehicle / month + $99–$548 hardware (3rd-party)", tag:"reported", source:"airpinpoint.com; tech.co" },
    { name:"Motive", cat:"Fleet safety & telematics", what:"ELD + AI dashcam + fleet management, flexible for smaller fleets.",
      customers:"Trucking fleets (ELD/HOS focus).", model:"Per-vehicle/month SaaS; 12-month min.",
      spend:"~$25 / vehicle / month (3rd-party)", tag:"reported", source:"tech.co" },
    { name:"Netradyne (Driver·i)", cat:"Fleet safety & telematics", what:"360° AI safety cameras + in-cab coaching; cited 99% AI accuracy.",
      customers:"Fleets (used by Knight-Swift per source analysis).", model:"Per-vehicle SaaS + hardware.",
      spend:"~$80–$500+ per unit + recurring (category range)", tag:"reported", source:"netradyne.com; freightwaves.com" },
    { name:"Lytx", cat:"Fleet safety & telematics", what:"Video telematics + driver safety analytics.",
      customers:"Commercial fleets broadly.", model:"Per-vehicle SaaS + hardware.",
      spend:"Per-vehicle (not published; quote)", tag:"not-disc", source:"techbullion.com" },

    /* --- Last-mile & route optimization (adjacent) --- */
    { name:"Onfleet", cat:"Last-mile & routing", what:"Last-mile delivery management + route optimization + customer notifications.",
      customers:"Retailers, couriers, local delivery ops.", model:"Tiered SaaS (published plans).",
      spend:"Published plans on site (per task/route tiers)", tag:"published", source:"onfleet.com" },
    { name:"Bringg", cat:"Last-mile & routing", what:"Delivery orchestration + last-mile exception handling across carriers.",
      customers:"Retailers & large delivery networks.", model:"Enterprise SaaS (custom).",
      spend:"Custom / not disclosed", tag:"not-disc", source:"bringg.com" },
    { name:"Route4Me", cat:"Last-mile & routing", what:"Route optimization for fleets and field teams.",
      customers:"SMB–mid fleets & field services.", model:"Per-user/vehicle SaaS (published).",
      spend:"Published subscription tiers", tag:"published", source:"route4me.com" },

    /* --- Warehouse robotics & orchestration (adjacent) --- */
    { name:"Symbotic", cat:"Warehouse robotics & AI", what:"End-to-end autonomous warehouse automation (AI-orchestrated robots).",
      customers:"Large retailers/distributors (e.g. Walmart, publicly known).", model:"Capital system + software (large capex).",
      spend:"Multi-million capex per site (project-based)", tag:"estimate", source:"symbotic.com" },
    { name:"GreyOrange", cat:"Warehouse robotics & AI", what:"Robotics-led warehouse orchestration software (GreyMatter; DeepNav w/ Google Cloud).",
      customers:"Fulfillment operators/retailers.", model:"Robotics + software (RaaS or capex).",
      spend:"Project / RaaS (not published)", tag:"not-disc", source:"greyorange.com" },
    { name:"Blue Yonder", cat:"Warehouse robotics & AI", what:"AI supply-chain planning + warehouse/demand solutions; ~12% forecast-accuracy gains cited.",
      customers:"Enterprise manufacturers/retailers.", model:"Enterprise SaaS license.",
      spend:"Enterprise license (custom)", tag:"not-disc", source:"blueyonder.com" },

    /* --- Demand & supply planning (adjacent) --- */
    { name:"o9 Solutions", cat:"Planning & forecasting", what:"AI-driven integrated business planning & demand forecasting ('digital brain').",
      customers:"Large global enterprises.", model:"Enterprise SaaS license.",
      spend:"Enterprise license (custom)", tag:"not-disc", source:"o9solutions.com" }
  ]
};
