/* Per-product detail data for the ideyaLabs Transportation AI Roadmap site.
   Grounded in the source documents in the project folder:
   - Source B: ideyaLabs_Top10_Logistics_AI_Agents.docx (the 10 agents)
   - Source A: ideyaLabs_NA_Transportation_Solutions_Portfolio.docx (FreightLink, Bridge)
   Illustrative figures are labelled as the documents label them; nothing is invented. */

window.PRODUCT_DETAIL = {

  "invoice-audit": {
    name: "Freight Invoice Audit, Discrepancy Resolution & Payment Agent",
    cls: "agent", tier: 1, score: "8.40", rank: 1,
    source: "Source B · Agent #1",
    tagline: "Audits every freight invoice, disputes discrepancies, and releases clean payments autonomously.",
    problem: "Freight bills routinely do not match what was quoted, tendered, or contracted. Accessorials are invented or inflated, fuel surcharges use the wrong index date, weight and class are re-rated, and duplicate invoices are submitted across modes. Practitioners estimate 5–10% of freight and parcel invoices carry an error (Tompkins Ventures, 2026); recoveries through dedicated freight audit typically land at 2–8% of total audited freight spend. For a mid-market shipper, that is a seven-figure annual leak that is functionally invisible line by line.",
    who: "Shippers of all sizes, 3PLs managing freight for clients, and freight brokers who both bill customers and get billed by carriers — anyone party to a freight payment, in either direction.",
    traditional: "Rules-based freight audit software requires every rate rule, accessorial, and contract term to be pre-coded and kept current; it breaks silently when a carrier changes a surcharge schedule or sends a slightly different layout. It also cannot read a scanned PDF, cross-reference a POD exception, or draft a persuasive, contract-citing dispute email.",
    solution: "The agent ingests every inbound invoice (EDI, PDF, portal, email) the moment it arrives, reconstructs the expected charge from the contracted rate, accessorials, and the shipment's actual BOL/POD/TMS record, and reasons about any variance the way an experienced auditor would. Where it finds a discrepancy it drafts and sends a dispute citing the specific contract clause, negotiates with the carrier's billing team up to a defined threshold, and escalates only when a human decision is required. Approved invoices are coded and routed into the ERP/TMS for payment automatically.",
    actions: [
      "Match every invoice line against contract, tariff, and shipment records; approve clean matches without human touch",
      "Flag, quantify, and prioritize discrepancies by dollar value and dispute-win probability",
      "Draft and send carrier disputes citing the specific contract clause and attaching BOL/POD evidence",
      "Negotiate resolution with carrier billing within a pre-approved dollar/percentage threshold",
      "Re-code and release approved invoices into the ERP/TMS; hold or short-pay disputed lines per policy",
      "Track every dispute to close and maintain an auditable log for finance and carrier scorecards",
      "Surface recurring overcharge patterns by carrier/lane to inform the next procurement cycle"
    ],
    systems: ["TMS", "ERP / AP", "EDI (210/810)", "Carrier portals", "Email", "Document store (contracts, BOL/POD)"],
    hitl: "A human approves disputes above a configured dollar threshold, any short-pay that could affect a strategic carrier relationship, and the initial rule set mapping contract clauses to accessorial codes; the agent operates independently within those guardrails.",
    customers: ["Mid-market and enterprise shippers ($10M+ annual freight spend)", "3PLs auditing freight on behalf of clients", "Freight brokers reconciling carrier settlements against customer billing"],
    kpi: "Dollars recovered as a % of audited freight spend; days from invoice receipt to resolved payment.",
    impact: [
      ["Cost savings", "2–8% of audited freight spend recovered annually (illustrative, informed by GingerControl, 2026)"],
      ["Labor / time", "Manual review largely eliminated for clean invoices; audit staff redeployed to exceptions and negotiation"],
      ["Error reduction", "Coverage moves from partial (triage-only) sampling toward near-100% invoice review"],
      ["Cycle-time", "Manual dispute cycles of 30–45+ days compressed materially by removing queueing and re-keying"]
    ],
    roi: {
      title: "≈ $4.2M/yr recovered for a $200M-freight-spend shipper (illustrative)",
      steps: [
        "Shipper freight spend: $200M/year",
        "Average billing error rate: 5% of spend (Tompkins Ventures, 2026) → $10M in erroneous charges",
        "Manual process catches ~30%; agent reviews ~90% → 60-point coverage improvement",
        "$10M × 60% = $6M newly-identified discrepancies",
        "$6M × 70% dispute-win/correction rate = ≈ $4.2M annual net savings"
      ]
    },
    commercial: "Percentage-of-savings (freight-audit norm, e.g. 20–35% of dollars recovered) is the easiest, self-funding sell; a flat per-invoice fee suits high-volume, low-dispute customers; enterprise SaaS with an ROI guarantee suits large shippers. A hybrid (small platform fee + smaller % of savings) is common.",
    difficulty: "Low–Medium", mvp: "8–14 weeks for a single-carrier, single-mode pilot; 6–9 months to production breadth.",
    geography: "All markets. NA complexity comes from accessorial diversity and fuel-surcharge index variation; UK/EU adds VAT, multi-currency, and customs-related charges. Freight audit is more mature in NA (Cass, Trax, nVision) than continental Europe.",
    competition: { rating: "Competitive but beatable", note: "Incumbents (Cass, Trax, nVision, Trimble/Data2Logistics) are largely rules-engine plus BPO; few operate as an autonomous agent that drafts disputes, negotiates, and closes the loop. Audit-as-a-service that acts, not just flags, is the wedge. AI-native entrants: Senvo.ai and others." }
  },

  "exception-mgmt": {
    name: "Shipment Exception Management & Disruption Response Agent",
    cls: "agent", tier: 1, score: "8.20", rank: 2,
    source: "Source B · Agent #2",
    tagline: "Observes shipment status, decides what to do about material deviations, and acts to resolve them.",
    problem: "Shipments deviate from plan constantly — a truck delayed at a dock, a container missing a vessel, a driver out of hours, weather closing a lane. Each deviation, if not caught within a narrow window, cascades into a missed appointment, detention charge, expedite fee, or service failure. Exception rates of a few percent, at scale (hundreds of thousands of shipments/yr), mean tens of thousands of exceptions someone must notice, triage, and resolve — often within hours.",
    who: "Shippers, 3PLs, freight brokers, and carriers all run exception-management desks; the pain is most acute for anyone accountable for on-time performance to an end customer.",
    traditional: "A rules-based alerting system can flag that a shipment is late but cannot decide what to do about it — reroute, expedite, notify, or accept the delay — because that decision depends on context (customer tier, penalty exposure, capacity, root cause) that changes shipment to shipment. Traditional TMS alerting floods staff and leaves the judgment and follow-through to a person.",
    solution: "The agent continuously observes shipment status across telematics, EDI, and carrier communications, reasons about which deviations are material, and determines the best available action — reschedule the appointment, source a relay driver, expedite via an alternate carrier, or notify the customer with a revised ETA. It contacts the carrier or driver (voice, EDI, portal), updates the TMS and customer tracking, and verifies the outcome before closing the loop — escalating only when a commercial decision is outside its authority.",
    actions: [
      "Continuously monitor shipment status against the planned itinerary and flag material deviations",
      "Determine root cause and likely downstream impact (missed appointment, detention, SLA breach)",
      "Contact carrier/driver by phone, EDI, or portal to confirm status or arrange a resolution",
      "Rebook or adjust delivery appointments directly with the receiving facility where authorized",
      "Notify the customer proactively with a revised ETA and reason code",
      "Update the TMS/visibility platform and close the exception once the outcome is verified",
      "Escalate to a human when resolution requires a commercial decision above its authority"
    ],
    systems: ["TMS", "GPS/telematics", "EDI/API", "Carrier portals", "Email", "Customer portals/CRM"],
    hitl: "A human sets escalation thresholds (expedite cost, penalty-waiver authority, customer-tier rules) and handles any exception requiring a commercial trade-off or relationship-sensitive conversation; the agent handles the observe-triage-contact-update loop autonomously.",
    customers: ["Mid-market to enterprise shippers with control towers", "3PLs and freight brokers running exception desks", "Carriers managing driver/equipment disruptions at scale"],
    kpi: "OTIF %; average time from exception detection to resolution.",
    impact: [
      ["Cost savings", "Reduced detention, expedite, and chargeback costs from earlier intervention"],
      ["Labor / time", "project44 reports agent interactions rising ~500/wk → 30,000+/wk, resolution time cut 75%, carrier data quality up to 30% better (project44, 2026)"],
      ["Revenue / margin", "Indirect, via improved on-time performance and customer retention"],
      ["Cycle-time", "Exception resolution reduced from hours to minutes for routine cases"]
    ],
    roi: {
      title: "≈ $3.6M/yr direct cost avoidance for a 500,000-shipment/yr shipper (illustrative)",
      steps: [
        "500,000 shipments/year; 12% experience a material exception → 60,000 exceptions",
        "Average avoidable cost per late-caught exception: $150 → $9M exposure",
        "Agent-driven earlier detection avoids 40% → ≈ $3.6M/year in direct savings",
        "Plus a harder-to-quantify OTIF and customer-retention benefit"
      ]
    },
    commercial: "Enterprise SaaS (per-shipment or per-seat tiering) is standard for control-tower platforms; a per-managed-exception fee suits usage-based buyers; premium tiers bundle response-time SLAs. Often sold as an add-on to an existing visibility/TMS relationship.",
    difficulty: "Medium–High", mvp: "3–4 months for a single-mode, single-region pilot on one TMS + one telematics feed; 9–12 months for multi-modal breadth.",
    geography: "All markets. NA exceptions concentrate around Hours-of-Service, weather, and cross-border delays; UK/EU around motorway congestion, port strikes, and customs holds, with EU driving-and-rest-time rules adding a compliance dimension to rerouting.",
    competition: { rating: "Emerging", note: "project44, FourKites, Overhaul, Trimble/Transporeon, Descartes MacroPoint have the data; most have only recently moved from alerting to autonomous action (project44's 2026 agent portfolio is the clearest signal). Whitespace remains in the mid-market and in the carrier/driver-contact automation layer." }
  },

  "carrier-fraud": {
    name: "Carrier Identity, Onboarding & Fraud-Prevention Agent",
    cls: "agent", tier: 2, score: "7.60", rank: 4,
    source: "Source B · Agent #3",
    tagline: "Continuously verifies carriers, scores tender-time fraud risk, and can pause loads on active fraud signals.",
    problem: "Freight fraud — double-brokering, carrier identity theft, fictitious pickups, forged authority/insurance — has surged. Verisk CargoNet recorded ≈$725M in U.S./Canada cargo-theft losses in 2025, up 60% YoY, with average loss per incident up 36% to $273,990 (2026). Cumulative freight-fraud losses since 2021 are estimated as high as $35B, with truckload freight named by 97% of surveyed professionals as the most fraud-prone segment.",
    who: "Freight brokers and 3PLs who tender loads to third-party carriers bear the most direct exposure; shippers who contract carriers directly and cargo insurers also absorb losses and rising premiums.",
    traditional: "Static rules (e.g. 'reject if insurance expired') catch only the crudest fraud. Sophisticated fraud (a recently-transferred MC number, banking details changed days before a load, a phone number that doesn't match FMCSA) requires cross-referencing multiple data sources in real time and reasoning about a pattern of anomalies — analyst judgment, not a single rule.",
    solution: "The agent continuously monitors every carrier in the network — not just at onboarding — cross-referencing FMCSA authority, insurance validity, banking-detail changes, and behavioral signals against known fraud patterns. At onboarding it verifies identity, places new/transferred carriers under temporary monitoring, and calls to confirm inconsistencies. At tender time it scores risk in real time, auto-approving low-risk carriers and holding high-risk tenders. On an active fraud signal it can pause the load and alert operations immediately.",
    actions: [
      "Verify FMCSA authority, insurance validity, and identity documents at onboarding",
      "Continuously re-check carrier status, insurance, and banking details against source-of-truth registries",
      "Score tender-time fraud risk using behavioral and identity signals; auto-approve low-risk carriers",
      "Flag or hold high-risk tenders (e.g. unverified new MC number underbidding market) for human review",
      "Contact the carrier directly to confirm anomalous changes (banking, contact information)",
      "Pause a load and alert operations when active fraud indicators are detected in real time",
      "Maintain an auditable risk history per carrier for compliance and insurance purposes"
    ],
    systems: ["TMS", "FMCSA SAFER/QC data", "Carrier-vetting APIs (Highway, Carrier411, FreightValidate)", "Insurance databases", "Email/phone", "Carrier portals"],
    hitl: "A human reviews and approves any high-risk tender the agent flags, sets risk-scoring thresholds, and makes the final call on offboarding; continuous monitoring and low-risk auto-approval run without per-transaction involvement.",
    customers: ["Freight brokers and 3PLs (highest direct exposure)", "Large shippers who broker their own overflow freight", "Cargo insurers seeking to underwrite lower-risk books"],
    kpi: "Fraud loss avoided per $ of freight under management; carrier onboarding cycle time.",
    impact: [
      ["Cost savings", "Avoided fraud losses against a 2025 U.S./Canada base of ≈$725M reported cargo theft (Verisk CargoNet 2026)"],
      ["Labor / time", "Reduces manual onboarding review and post-incident investigation burden"],
      ["Revenue / margin", "Indirect — lower loss ratios support better cargo-insurance terms and preserve broker margin"],
      ["Cycle-time", "Onboarding for legitimate carriers can shorten even as scrutiny increases, because verification is automated"]
    ],
    roi: {
      title: "≈ $11M/yr avoided fraud loss for a 100,000-load/yr broker (illustrative)",
      steps: [
        "100,000 loads/year; 0.5% of tenders show a meaningful fraud-risk signal → 500 flagged tenders",
        "Absent controls, ~10% of flagged tenders would result in a loss → 50 loss events",
        "Average loss per incident: $273,990 (Verisk CargoNet 2025) → ≈ $13.7M exposure",
        "Continuous monitoring prevents 80% → ≈ $11.0M/year avoided (order-of-magnitude, not a guarantee)"
      ]
    },
    commercial: "Per-carrier or per-load monitoring fee (usage-based) suits brokers of all sizes; enterprise unlimited-monitoring license suits large brokers/3PLs; a percentage-of-avoided-loss or insurance-linked model (co-developed with a cargo insurer) is an attractive expansion path.",
    difficulty: "Medium", mvp: "10–14 weeks for an onboarding-verification MVP on FMCSA + 1–2 vetting APIs; 6–9 months to add continuous behavioral monitoring and tender-time scoring at scale.",
    geography: "U.S., Canada. FMCSA-authority fraud and double-brokering are a North American phenomenon tied to the U.S. motor-carrier authority system. Europe's fragmented, SME-based haulage market has an analogous but distinct profile (subcontracting fraud, forged CMR documents) needing a separate compliance model.",
    competition: { rating: "Emerging", note: "Highway, Carrier411, FreightValidate, RMIS are largely verification databases/APIs a human still has to query and act on. The whitespace is the agentic layer that continuously monitors, scores tenders in real time, and takes first-line action (holding a tender, contacting a carrier)." }
  }
  ,
  "claims": {
    name: "Freight Claims Management & Recovery Agent",
    cls: "agent", tier: 1, score: "7.80", rank: 3,
    source: "Source B · Agent #8",
    tagline: "Proactively detects claim-eligible exceptions, files every one, and chases recovery autonomously.",
    problem: "U.S. shippers face $50B+/yr in freight-claims exposure, average claim ≈$1,200 (CorePiper 2026). The bigger issue is process failure: fewer than half of claim-eligible exceptions are ever filed, manual filing costs ≈$50/claim (so low-value claims are skipped), manual processing averages 47 days vs. 14–21 automated, and manual recovery rates of 35–45% roughly double to 70–85% once automated.",
    who: "Shippers and 3PLs filing claims against carriers for damaged, lost, or short-shipped freight, and carriers processing and adjudicating claims filed against them.",
    traditional: "A claims-management system can store and track a claim once opened, but cannot detect that a claimable exception occurred (by cross-referencing POD exception notes, inspection photos, and shipment value), assemble the documentation, or write the claim narrative — all of which require reading and synthesizing unstructured evidence.",
    solution: "The agent monitors delivery data for damage/shortage exceptions (POD exception codes, inspection-photo flags, customer complaints), automatically assembles the required documentation package, files the claim through the carrier's portal or EDI, and tracks it to resolution — following up on stalled claims and appealing denials with additional evidence. Because the biggest lost value is claims never filed, its default is to file every eligible exception rather than triaging by dollar value.",
    actions: [
      "Detect claim-eligible exceptions from POD/BOL exception codes, inspection photos, and shipment data",
      "Assemble the required documentation package automatically (BOL, POD, photos, invoice value)",
      "File the claim through the carrier's portal, EDI, or email, formatted to that carrier's requirements",
      "Follow up on stalled claims on a defined cadence and escalate or appeal denials with evidence",
      "Track every claim from detection to resolution with a full audit trail",
      "Report recovery-rate and root-cause trends (carriers/lanes/commodities) back to procurement and packaging"
    ],
    systems: ["TMS", "Document management (BOL/POD/photos)", "Carrier claims portals", "EDI", "Email"],
    hitl: "A human reviews and approves claims above a dollar threshold before submission, makes the final call on appealing a high-value denial, and defines which exception types are auto-eligible; routine low-value filing and follow-up run autonomously.",
    customers: ["Shippers and 3PLs with meaningful claims volume (LTL and parcel especially)", "Carriers seeking to automate inbound claims adjudication"],
    kpi: "Claim filing rate (% of eligible exceptions filed); claim recovery rate.",
    impact: [
      ["Cost savings", "Recovery improvement from a 35–45% manual baseline toward 70–85% automated (CorePiper 2026), against a $50B+/yr exposure base"],
      ["Labor / time", "Removes ~$50/claim in manual admin cost, especially valuable for low-value claims otherwise skipped"],
      ["Cycle-time", "Resolution compressed from an average 47 days to 14–21 days (CorePiper 2026)"],
      ["Other", "Root-cause data (lanes/carriers/packaging driving damage) supports upstream prevention"]
    ],
    roi: {
      title: "≈ $8.9M/yr incremental recovery for a 500,000-shipment/yr shipper (illustrative)",
      steps: [
        "500,000 shipments/year; 3% exception rate; average claim value $1,200 → $18M exposure",
        "Baseline: 45% filed × 40% recovery = ≈ $3.24M recovered today",
        "Agent-driven: 90% filed × 75% recovery = ≈ $12.15M recovered",
        "Incremental ≈ $8.9M/year"
      ]
    },
    commercial: "Percentage-of-recovered-claims is the natural, self-funding model (mirrors freight-audit norms); flat SaaS for carriers automating inbound adjudication; hybrid (small platform fee + % of incremental recovery) for shippers with an existing process.",
    difficulty: "Low–Medium", mvp: "8–12 weeks for an LTL-focused MVP on 1–2 carriers' claims portals; 6–9 months for multi-mode breadth.",
    geography: "U.S., Canada, Europe, UK. Structurally similar across regions, though liability regimes differ — NA references the Carmack Amendment, Europe the CMR Convention (with notice-of-damage limits as short as 7 days), making prompt automated detection especially valuable in the EU/UK.",
    competition: { rating: "White Space", note: "One of the least crowded opportunities on the list. Existing tools (TMS claims modules, Traxtech, Warp) largely help see or analyze damage; almost none autonomously detect, document, file, and chase claims to resolution — a clear whitespace for a vertically focused agent." }
  },

  "empty-mile": {
    name: "Empty-Mile Reduction & Dynamic Backhaul / Network Optimization Agent",
    cls: "agent", tier: 3, score: "6.45", rank: 8,
    source: "Source B · Agent #4",
    tagline: "Continuously sources, negotiates, and books backhauls to cut empty miles — without dispatcher intervention.",
    problem: "A meaningful share of every truck's miles are driven empty. Industry-wide empty miles run 15–20% in recent years, ~32–35% for dry-van/reefer interstate, up to 40% for heavy Class 7–8 trucks; private fleets and owner-operators run higher (30–35%+) than large asset-based carriers (~10%). Every empty mile is fuel, driver time, tolls, and equipment wear with zero revenue.",
    who: "Carriers and fleet operators most directly (it is their cost); brokers and 3PLs indirectly, since empty-mile-driven capacity constraints raise the rates shippers pay.",
    traditional: "Static route-optimization can plan a path for known loads, but sourcing the right backhaul requires continuously scanning multiple live load boards and broker networks, negotiating a rate in real time, and deciding whether a backhaul is worth taking against remaining hours-of-service, home-time, and equipment type — a continuous multi-constraint decision a periodic optimizer cannot do.",
    solution: "The agent continuously observes each truck's location, remaining hours-of-service, and upcoming delivery, and scans load boards, broker networks, and the carrier's private freight network for fitting backhauls. It reasons about which are worth pursuing (rate vs. deadhead vs. home-time impact), negotiates within a pre-set floor, books the load, and updates the TMS and driver app automatically — re-optimizing as new loads post and learning which lanes and brokers offer the best economics.",
    actions: [
      "Continuously scan load boards and broker networks for backhauls matching each truck's position and equipment",
      "Score opportunities against deadhead distance, rate, and driver hours-of-service/home-time constraints",
      "Negotiate rate with the broker/shipper within a pre-approved floor",
      "Book the load and update the TMS and driver-facing app automatically",
      "Re-optimize continuously as new freight posts or truck status changes",
      "Track realized empty-mile % and revenue-per-truck by lane, feeding results into future sourcing"
    ],
    systems: ["TMS/dispatch", "ELD/telematics", "Load boards (DAT, Truckstop)", "Broker portals/APIs", "Driver mobile app"],
    hitl: "Dispatchers set the rate floor, preferred-lane and driver-preference rules, and review any backhaul flagged as marginal; the agent books within those bounds without per-load approval.",
    customers: ["Mid-size to large asset-based carriers", "Fleet operators (private fleets seeking better backhaul utilization)", "Freight brokers optimizing capacity across their carrier network"],
    kpi: "Empty-mile %; revenue per truck per week.",
    impact: [
      ["Cost savings", "Direct fuel, toll, and equipment-wear savings proportional to empty miles avoided"],
      ["Revenue / margin", "Higher revenue per truck and improved driver earnings support retention in a tight market"],
      ["Cycle-time", "Backhaul sourced in near real time vs. hours of manual search"],
      ["Other", "Lower carbon intensity per loaded mile, relevant to shipper ESG scoring and EU/UK emissions reporting"]
    ],
    roi: {
      title: "≈ $4.3M/yr savings for a 1,000-tractor fleet (illustrative)",
      steps: [
        "1,000 tractors × ~100,000 miles = 100M miles; 18% empty (FreightWaves/FHWA midpoint)",
        "All-in operating cost per mile: $1.60 → 18M empty miles × $1.60 = $28.8M exposure",
        "Agent reduces empty-mile rate 15% relative → ≈ $4.3M/year avoided cost"
      ]
    },
    commercial: "Per-truck/per-month SaaS for fleets; percentage-of-incremental-revenue on booked backhauls for usage-based pricing; brokers may license the matching engine for their carrier network.",
    difficulty: "Medium", mvp: "3–4 months for a single-fleet pilot on one TMS and 1–2 load boards; 6–9 months for multi-load-board breadth.",
    geography: "U.S., Canada, Europe, UK. U.S. long-haul has dense load-board liquidity; Canada's lower density makes matching harder outside corridors; Europe's fragmented market and cross-border empty running make it high-value and tied to EU CO2 targets (15% by 2025, 43% by 2030, 90% by 2040).",
    competition: { rating: "Competitive", note: "DAT, Truckstop, Uber Freight, Trucker Path, Loadsmart solve discovery; most stop short of autonomous negotiation and booking. The differentiated opportunity is closing the loop from 'here's a match' to 'booked, confirmed, on the driver's app'." }
  },

  "procurement": {
    name: "Dynamic Freight Procurement & Carrier-Sourcing Agent",
    cls: "agent", tier: 2, score: "7.15", rank: 5,
    source: "Source B · Agent #5",
    tagline: "Benchmarks contract rates against the live market and autonomously works the routing guide on tender rejection.",
    problem: "Shippers set contract rates annually/quarterly, then watch market rates diverge within weeks. The result is overpaying vs. the live market or, in tight capacity, high tender-rejection rates forcing expensive spot-market fallback at the worst time. Tender-rejection rates have swung double digits over the past two years; static once-a-year contracts are poorly suited to that volatility.",
    who: "Shippers negotiating and managing carrier contracts, and 3PLs/brokers sourcing capacity on shippers' behalf.",
    traditional: "Rate-benchmarking dashboards can show a shipper its contract rate is out of step, but cannot re-tender to backup carriers, blend spot and contract capacity dynamically, or renegotiate a lane rate — that still requires a human to interpret and act, load by load, which does not scale across thousands of lanes.",
    solution: "The agent continuously benchmarks contracted lane rates against live market data, flags lanes likely to trigger rejections before they happen, and automatically works the routing guide when a tender is rejected — offering the load to the next carrier, then the next, then blending in vetted spot capacity, within seconds. For recurring high-rejection lanes it initiates a mini-RFP within an approved rate band and recommends routing-guide changes, learning which carriers perform on which lanes.",
    actions: [
      "Continuously benchmark contract rates against live market data by lane",
      "Automatically work the routing guide when a primary carrier rejects a tender",
      "Blend in vetted spot-market capacity when the routing guide is exhausted",
      "Negotiate rate within a pre-approved band with backup carriers or the spot market",
      "Initiate mini-RFPs for chronically underperforming lanes and recommend routing-guide changes",
      "Track tender-acceptance rate and cost-per-mile by lane/carrier and surface trends to procurement"
    ],
    systems: ["TMS", "EDI (990/204)", "Market-rate data feeds", "Load boards", "Carrier contracts/CRM"],
    hitl: "A human approves rate changes above a set band, any new carrier added to a routing guide, and mini-RFP outcomes before they become the new contract; day-to-day routing-guide execution and spot-blend decisions run autonomously.",
    customers: ["Enterprise and mid-market shippers with meaningful freight spend ($20M+)", "3PLs managing procurement on behalf of shipper clients"],
    kpi: "Freight cost per mile versus market; tender-acceptance rate.",
    impact: [
      ["Cost savings", "3–6% reduction in total freight spend from tighter rate/market alignment and less last-minute spot exposure (illustrative)"],
      ["Cycle-time", "Tender-rejection fallback resolved in seconds/minutes vs. hours"],
      ["Error reduction", "Fewer uncovered loads and last-minute service failures"],
      ["Other", "Improved carrier relationships through consistent, data-driven engagement"]
    ],
    roi: {
      title: "≈ $12M/yr freight-spend savings for a $300M-spend shipper (illustrative)",
      steps: [
        "Shipper freight spend: $300M/year",
        "4% average reduction in effective cost per mile from continuous market alignment",
        "$300M × 4% = ≈ $12M/year (highly dependent on market conditions and baseline sophistication)"
      ]
    },
    commercial: "Percentage-of-savings against a market-rate benchmark is self-justifying; enterprise SaaS with tiered lane/volume limits suits predictable budgets; 3PLs may license the engine to run procurement for multiple shipper clients.",
    difficulty: "Medium", mvp: "3–4 months for a routing-guide-automation MVP on a defined lane set; 6–9 months to add mini-RFP negotiation and benchmarking breadth.",
    geography: "U.S., Canada, Europe, UK. U.S. brokerage dynamics (deep spot market, SONAR/DAT transparency) make it easiest to stand up in NA first; Europe's fragmented base means 'the market' is less transparent and procurement often runs through forwarders.",
    competition: { rating: "Emerging", note: "Greenscreens.ai, DAT RateView, project44's new Freight Procurement Agent, Emerge/Loadsmart tools. Benchmarking and marketplaces are relatively mature; autonomous, negotiated re-tendering at the moment of rejection is still nascent — where project44's 2026 launch signals the market is heading." }
  },

  "quoting": {
    name: "Freight Quoting & RFQ Response Agent",
    cls: "agent", tier: 3, score: "6.45", rank: 8,
    source: "Source B · Agent #6 (consolidates RateIQ)",
    tagline: "Reads inbound RFQs from any channel and returns a priced quote within minutes.",
    problem: "Brokers, 3PLs, and forwarders lose business simply because a competitor quotes faster. An RFQ often goes to five or more providers at once, and the first credible, correctly-priced quote frequently wins. Manually pricing a quote can take minutes to hours depending on complexity and queue depth, during which the opportunity can be lost.",
    who: "Freight brokers, 3PLs, and forwarders responding to shipper RFQs, particularly in the small-to-midsize account segment where quote-request volume is high relative to sales staff.",
    traditional: "A static rate calculator can price a simple, well-known lane quickly, but most RFQs involve a new lane, special accessorials, or a customer-specific margin rule a calculator cannot handle — and a rules engine cannot read a free-text RFQ email and extract the shipment requirements the way an LLM-based agent can.",
    solution: "The agent reads inbound RFQs from any channel (email, portal, EDI), extracts requirements, looks up lane history and live market rate, applies the customer's margin rules, and returns a priced quote within minutes — flagging only unusual requests (new lane, non-standard equipment, unusually large volume) for a human analyst. It tracks win/loss and refines pricing and prioritization over time.",
    actions: [
      "Parse inbound RFQs from email, portal, and EDI into structured shipment requirements",
      "Retrieve lane history, live market rate, and applicable accessorials",
      "Apply customer-specific margin rules and generate a priced quote",
      "Send the quote back through the originating channel within minutes",
      "Flag non-standard or high-risk requests (new lane, unusual equipment/volume) for human review",
      "Track win/loss outcomes by account and feed results back into pricing strategy"
    ],
    systems: ["TMS", "CRM", "Market-rate data feeds", "Email", "Customer/EDI portals"],
    hitl: "A human sets margin-rule guardrails and reviews any quote for a new lane, unusual accessorial, or strategically sensitive account; routine well-understood lanes are quoted without review.",
    customers: ["Small-to-midsize freight brokers and 3PLs handling high RFQ volume", "Freight forwarders quoting international/multimodal moves"],
    kpi: "Quote turnaround time; RFQ-to-win conversion rate.",
    impact: [
      ["Revenue / margin", "Primary value driver: incremental won business from faster, more consistent response"],
      ["Labor / time", "Significant reduction in manual quote preparation; some vendors report tens-of-percent turnaround improvements (illustrative)"],
      ["Cycle-time", "Quote turnaround compressed from hours to minutes for standard lanes"],
      ["Error reduction", "Fewer mispriced quotes from manual lookup errors"]
    ],
    roi: {
      title: "≈ $4.3M/yr incremental gross margin for a brokerage handling 600,000 quotes/yr (illustrative)",
      steps: [
        "600,000 quotes/year; baseline win rate 18%",
        "Faster response lifts win rate +4 points to 22% → 24,000 incremental won loads",
        "Average gross margin per won load $180 → ≈ $4.3M/year (win-rate lift is the least certain input)"
      ]
    },
    commercial: "Per-seat SaaS or per-quote usage fee for high-volume brokerages; enterprise licensing for forwarders wanting a white-labeled customer-facing quoting experience.",
    difficulty: "Low–Medium", mvp: "6–10 weeks for a single-mode, defined-lane MVP; 4–6 months for multi-mode and robust free-text RFQ parsing.",
    geography: "All markets. Europe/UK add multimodal and multi-currency complexity; U.S. domestic trucking quoting (single mode, single currency) is the easiest starting market.",
    competition: { rating: "Competitive / crowded", note: "Wisor.ai, Debales AI, Freightos, and TMS-native modules already target this use case — more crowded than most on the list. Differentiation must come from deeper TMS/CRM integration and better free-text RFQ parsing, not the pricing logic, which is increasingly commoditized." }
  },

  "detention": {
    name: "Detention & Dock Appointment Coordination Agent",
    cls: "agent", tier: 2, score: "6.90", rank: 6,
    source: "Source B · Agent #7 (consolidates DockFlow)",
    tagline: "Renegotiates dock appointments in real time and auto-generates and pursues detention invoices.",
    problem: "Drivers are held beyond their window at a high rate. A 2024 study found detention in 39.3% of stops (56.2% for reefer, 49.1% for women drivers); 2023 industry impact ≈$15.1B ($3.6B direct fees, $11.5B lost productivity). Detained trucks then drove 14.6% faster on average — a safety consequence. On billing, 94.5% of fleets charge detention but are paid on fewer than half of those invoices.",
    who: "Carriers and drivers bear the direct cost; shippers and warehouses bear the scheduling and dock-congestion side; fleet operators manage both.",
    traditional: "Dock-scheduling software can manage a calendar of slots, but cannot renegotiate a slot in real time when a truck is late, notify the next truck in queue, or decide when a detention fee should be invoiced and to whom — all of which need live location data, contract-specific fee rules, and two-way communication with driver/carrier and dock staff.",
    solution: "The agent tracks each truck's real-time location against its scheduled appointment, proactively renegotiates the window with the receiving facility when running early/late, and automatically starts a geofenced detention clock when free time expires. When detention accrues it generates a documented, contract-referenced invoice and pursues payment the same way the Invoice Audit Agent does for carrier bills, and identifies chronically slow facilities for future scheduling and lane decisions.",
    actions: [
      "Track real-time truck location against scheduled dock appointments",
      "Proactively renegotiate appointment windows with the receiving facility as ETAs shift",
      "Start and stop a geofenced detention clock automatically based on actual check-in/check-out",
      "Generate and submit contract-referenced detention invoices without manual paperwork",
      "Pursue and track detention-invoice disputes to resolution",
      "Identify chronically slow facilities/lanes and surface them for commercial and routing decisions"
    ],
    systems: ["Dock-scheduling/appointment systems", "GPS/ELD telematics", "WMS", "TMS", "Carrier contracts", "Email/portal"],
    hitl: "A human approves detention-fee disputes above a threshold and any decision to stop serving a chronically slow facility; routine renegotiation, clock-tracking, and standard invoicing run autonomously.",
    customers: ["Carriers and fleet operators (direct beneficiaries of recovered detention pay)", "Shippers and warehouses reducing dock congestion and detention exposure", "3PLs managing detention disputes on shippers' behalf"],
    kpi: "Detention hours per stop; % of legitimate detention invoices collected.",
    impact: [
      ["Cost savings", "Recovery against the $3.6B direct detention-fee cost, by closing the gap between the 94.5% who charge and the <50% paid (DAT/ATRI 2024)"],
      ["Labor / time", "Eliminates manual detention-clock tracking and invoice preparation"],
      ["Error reduction", "Geofenced, timestamped records reduce disputes over how long the truck was there"],
      ["Other", "Reduced driver frustration and the documented 14.6% post-detention speeding effect — a safety benefit"]
    ],
    roi: {
      title: "≈ $1.1M/yr detention-time savings for a 50,000-stop/yr fleet, plus collection recovery (illustrative)",
      steps: [
        "50,000 stops/year; 39.3% detained (DAT/ATRI 2024) → 19,650 detained stops",
        "Average detention beyond free time 2.5 hrs; cost per detained hour $75",
        "19,650 × 2.5 × $75 = ≈ $3.68M exposure; 30% reduction = ≈ $1.1M/year",
        "Plus fleet-specific recovery from improved detention-fee collection"
      ]
    },
    commercial: "Per-truck/per-month SaaS for carriers; percentage-of-recovered-detention-fees for the billing/collection function; a facility-side module for shippers/warehouses on a per-facility license.",
    difficulty: "Medium–High", mvp: "3–4 months for a detention-tracking-and-invoicing MVP on one fleet/facility pair; 6–9 months to add proactive renegotiation at scale.",
    geography: "U.S., Canada. The detention/free-time contractual structure and cited research are U.S.-centric; Canada shares a similar model. UK/EU have an analogous problem (loading/unloading delay charges) but need local detention/demurrage contract logic.",
    competition: { rating: "Competitive but beatable", note: "OpenDock (Loadsmart), C3 Solutions, and WMS-embedded modules (Descartes, Manhattan, Blue Yonder) manage the calendar; true two-way real-time renegotiation plus automated geofenced detention-fee generation and collection is not standard — that combination is the differentiated opportunity. AI-native: Cargofy, DataDocks." }
  },

  "customs": {
    name: "Cross-Border Customs & Trade-Documentation Agent",
    cls: "agent", tier: 3, score: "5.95", rank: 11,
    source: "Source B · Agent #9",
    tagline: "Classifies, assembles, and files cross-border documentation, and responds to customs holds — under broker authorization.",
    problem: "Cross-border freight requires accurate, timely documentation (commercial invoices, certificates of origin, HS/tariff classification, customs entries) that, if wrong or late, causes delays, penalties, and demurrage. Post-Brexit UK-EU trade added a new customs border; Mexico's 2025–2026 customs-compliance overhaul has forced U.S.-Mexico carriers and brokers to adapt quickly.",
    who: "Cross-border shippers, customs brokers, freight forwarders, and 3PLs moving freight across the US-Canada, US-Mexico, and UK-EU borders.",
    traditional: "HS/tariff classification is not a simple lookup — it requires interpreting product descriptions against rules that involve judgment, and a rules engine not updated for the latest change (e.g. Mexico's 2025–2026 overhaul) will confidently produce a wrong answer. Traditional software also cannot gather missing information by asking clarifying questions the way a compliance analyst — or an LLM-based agent — can.",
    solution: "The agent reviews shipment and product data ahead of departure, determines the correct HS classification and required documentation for the specific origin-destination pair, assembles and validates the package, and files the entry electronically where permitted. When an authority raises a query or hold, it gathers the requested information and responds within the required window, tracking customs status continuously and feeding into the Exception Management Agent where applicable.",
    actions: [
      "Determine HS/tariff classification and required documentation for a given shipment and trade lane",
      "Assemble, validate, and file the customs entry and supporting documentation ahead of arrival",
      "Detect missing or inconsistent information and request it from the shipper/supplier proactively",
      "Monitor customs status continuously and respond to holds or info requests within required windows",
      "Escalate to a licensed customs broker for classification calls above a defined risk/value threshold",
      "Maintain a compliance audit trail of every classification and filing decision"
    ],
    systems: ["Customs broker/agency systems (CBSA, CBP, HMRC)", "TMS", "ERP (product/BOM data)", "Document management", "Email"],
    hitl: "A licensed customs broker reviews and signs off on classification decisions above a defined value/risk threshold and on any novel product classification, as required by law; routine, well-precedented classifications run under the broker's standing authorization.",
    customers: ["Cross-border shippers and importers/exporters", "Customs brokers and freight forwarders scaling compliance capacity", "3PLs offering cross-border services"],
    kpi: "Border dwell time / hold rate; documentation error rate.",
    impact: [
      ["Cost savings", "Reduced demurrage, expedite, and penalty costs from fewer documentation-caused delays"],
      ["Labor / time", "Significant reduction in manual classification and documentation-assembly time per shipment"],
      ["Revenue / margin", "Enables brokers/forwarders to scale volume without proportional headcount"],
      ["Other", "Stronger compliance audit trail reduces regulatory/penalty risk"]
    ],
    roi: {
      title: "≈ $1.6M/yr avoided delay cost for a 20,000-cross-border-shipment/yr operation (illustrative)",
      steps: [
        "20,000 cross-border shipments/year; 8% experience a documentation-caused delay → 1,600",
        "Average cost per delay (demurrage, expedite, penalty): $2,000 → $3.2M exposure",
        "Automated classification and pre-clearance reduces incidence 50% → ≈ $1.6M/year"
      ]
    },
    commercial: "Per-shipment or per-entry usage fee (mirrors customs brokerage billing); enterprise licensing for large cross-border shippers/3PLs; hybrid bundling a compliance-risk guarantee for brokers differentiating on service level.",
    difficulty: "High", mvp: "4–6 months for a single-border-pair (e.g. US-Canada) MVP with a licensed broker in the loop; 9–15 months to add US-Mexico, UK-EU given differing regimes.",
    geography: "U.S., Canada, Europe, UK. Inherently border-specific — must be built separately (on shared architecture) per corridor: USMCA, and UK-EU post-Brexit. UK/EU is especially acute; Mexico's 2025–2026 changes create fresh urgency on US-Mexico.",
    competition: { rating: "Competitive", note: "Nuvocargo, traditional brokers with proprietary software, Descartes/Livingston tools. Classification-assistance is increasingly common; fewer combine classification with autonomous filing, proactive missing-info requests, and continuous status monitoring tied to delivery risk — the fuller agentic workflow remains differentiated, especially UK-EU. AI-native: Nuvocargo, Fr8Tech." }
  },

  "last-mile": {
    name: "Last-Mile Delivery Exception & Customer-Communication Agent",
    cls: "agent", tier: 4, score: "5.50", rank: 13,
    source: "Source B · Agent #10",
    tagline: "Predicts at-risk deliveries and proactively contacts the recipient before an attempt fails.",
    problem: "Last-mile delivery is now ~53% of total shipping cost, up from 41% in 2018. A meaningful share of attempts fail on the first try — nobody home, wrong access instructions, address issues — each failure triggering an expensive re-delivery and a customer-experience hit.",
    who: "Retailers and e-commerce brands, parcel and last-mile carriers, and the 3PLs/last-mile operators who execute final-mile delivery on their behalf.",
    traditional: "A route-optimization engine can plan an efficient sequence but cannot decide, in the moment, that a specific delivery is likely to fail (no response to an ETA notification, a history of failed attempts, a driver report of no access) and take corrective action — rerouting, contacting the customer, or rescheduling — which requires judgment about a specific, dynamic situation.",
    solution: "The agent monitors delivery progress in real time, identifies deliveries at elevated risk of failure, and proactively contacts the customer (text, app, voice) to confirm access instructions, offer a narrower window, or arrange an alternate location before the attempt. Where a delivery fails it automatically reschedules, updates the customer, and adjusts the driver's route in real time — verifying outcomes and feeding failure patterns back into routing and communication strategy.",
    actions: [
      "Monitor delivery progress and identify stops at elevated risk of a failed attempt",
      "Proactively contact the recipient to confirm access instructions or offer an alternate location/window",
      "Automatically reschedule and update the customer when a delivery attempt fails",
      "Adjust the driver's route in real time to reflect confirmed instructions or rescheduled stops",
      "Verify successful delivery and close the loop with the customer",
      "Feed failure patterns back into routing, scheduling, and communication strategy"
    ],
    systems: ["Route/delivery management system", "Driver mobile app", "GPS", "CRM/customer contact data", "SMS/voice/app notifications"],
    hitl: "Customer service is looped in for any recipient complaint or dispute the agent cannot resolve, and sets policy for return-to-depot vs. reattempt; routine risk-detection, outreach, and rescheduling run autonomously.",
    customers: ["Retailers and e-commerce brands with significant last-mile volume", "Parcel and last-mile delivery carriers", "3PLs/last-mile operators executing final-mile delivery"],
    kpi: "First-attempt delivery success rate; failed-delivery cost per stop.",
    impact: [
      ["Cost savings", "Reduced re-delivery attempts against a last-mile cost base now ~53% of total shipping cost"],
      ["Labor / time", "Reduces reactive customer-service load from failed-delivery complaints"],
      ["Revenue / margin", "Indirect, through retention and reduced refund/goodwill-credit exposure"],
      ["Other", "Improved customer satisfaction/NPS from proactive rather than reactive communication"]
    ],
    roi: {
      title: "≈ $1.68M/yr avoided re-delivery cost for a 5M-stop/yr last-mile operation (illustrative)",
      steps: [
        "5,000,000 stops/year; 8% first-attempt failure → 400,000 failures",
        "Average re-delivery cost $12 → $4.8M exposure",
        "Proactive risk detection and contact reduces failures 35% → ≈ $1.68M/year, plus a CX benefit"
      ]
    },
    commercial: "Per-stop or per-delivery usage fee fits thin-margin, high-volume last-mile; SaaS licensing for retailers wanting a branded customer-communication layer across carriers; enterprise license for large parcel carriers.",
    difficulty: "Medium", mvp: "3–4 months for a single-region pilot on one delivery-management system and one channel; 6–9 months for multi-channel breadth.",
    geography: "U.S., Canada, Europe, UK. Dense European/UK urban cores make window precision and locker/pickup alternatives especially valuable; Canada's lower density shifts failure drivers toward distance and access-instruction issues.",
    competition: { rating: "Red Ocean", note: "The most crowded opportunity on the list — Onfleet, Bringg, Gobolt, Route4Me, and carrier-native platforms (Amazon, UPS, national postal operators). Most optimize routing or provide passive tracking rather than an agent that proactively intervenes on at-risk deliveries. Differentiation requires being meaningfully better at predictive risk-detection and two-way contact." }
  },

  "freightlink": {
    name: "FreightLink — Unified Visibility Hub",
    cls: "assisted", tier: 2, score: "6.70", rank: 7,
    source: "Source A · Solution 1",
    tagline: "Real-time shipment visibility across every carrier, one integration — the data foundation Exception Management depends on.",
    problem: "Shippers and 3PLs lose visibility between terminal scans on LTL hub-and-spoke moves and across fragmented FTL telematics providers. Customer-service teams spend hours a day manually calling carriers for status.",
    who: "Mid-size 3PLs and brokerages (50–2,000 loads/month) whose current visibility is manual or single-carrier-only.",
    traditional: "Enterprise visibility platforms (project44, FourKites, Trimble/Transporeon) are vendor-dominated and priced for large accounts; FreightLink explicitly targets the underserved mid-market segment rather than competing head-on with incumbents. Classified as AI-Assisted Automation, not a True Agent — its predictive-ETA model surfaces information but does not autonomously resolve anything.",
    solution: "A middleware layer that normalizes carrier tracking feeds (API, EDI 214, telematics webhooks, and PDF/email scraping as a fallback) into one event stream, with a predictive-ETA model and automated exception alerts (missed scan, dwell-time breach) pushed to the customer's existing TMS or a lightweight dashboard. Ships as pre-built connectors for the top 40 NA carriers (~85% of NA freight volume) plus a generic EDI/API onboarding kit. Installs as a read-only integration — no data migration, no workflow change.",
    actions: [
      "Normalize carrier tracking feeds (API, EDI 214, telematics webhooks, PDF/email fallback) into one event stream",
      "Run a predictive-ETA model across the normalized feed",
      "Fire automated exception alerts (missed scan, dwell-time breach) into the customer's TMS or a dashboard",
      "Provide pre-built connectors for the top 40 NA carriers plus a generic EDI/API onboarding kit"
    ],
    systems: ["Customer TMS (read-only)", "Carrier APIs", "EDI 214", "Telematics webhooks", "PDF/email (fallback)"],
    hitl: "As an AI-assisted product, FreightLink surfaces predicted ETAs and exception alerts for a person (or a downstream agent like Exception Management) to act on; it does not itself take autonomous resolving action.",
    customers: ["Mid-size 3PLs and brokerages (50–2,000 loads/month)", "Shippers whose visibility is currently manual or single-carrier-only"],
    kpi: "% of shipments with real-time visibility; exception-alert accuracy.",
    impact: [
      ["Strategic", "Maximum Reusability score (10/10) — the visibility/event-ingestion capability every downstream agent needs"],
      ["Cost savings", "Reduces hours/day of manual carrier status calls by customer service"],
      ["Enabling", "Direct data dependency for the Shipment Exception Management Agent; also feeds Detention & Dock and Last-Mile"],
      ["Speed", "Fastest MVP in the portfolio — 2–3 weeks to first live tracking feed"]
    ],
    roi: {
      title: "$1.2M ARR validated at 100 customers (Source A)",
      steps: [
        "Target: 100 paying customers at maturity (Year 2–3)",
        "Blended ACV: $12,000/customer/year ($1,000/mo average)",
        "ARR at target: 100 × $12,000 = $1.2M",
        "Value is mostly indirect/enabling — it unlocks the ROI of the agents built on top of it"
      ]
    },
    commercial: "Tiered SaaS subscription by monthly shipment volume: $500/mo (starter, <500 shipments) to $2,500/mo (enterprise, 5,000+ shipments); blended average $1,000/mo. Natural upsell into Exception Management.",
    difficulty: "Low (fastest MVP)", mvp: "2–3 weeks to first live tracking feed — fastest in the entire portfolio; pre-built connectors cover ~85% of NA freight volume out of the box.",
    geography: "North America first (connector library covers top 40 NA carriers). Extensible to other regions via the generic EDI/API onboarding kit.",
    competition: { rating: "Dominated by established vendors (mid-market whitespace)", note: "Enterprise visibility (project44, FourKites, Trimble/Transporeon) is vendor-dominated; FreightLink targets the underserved mid-market rather than competing head-on. Key risk: carrier API access can be revoked or rate-limited unilaterally; connector maintenance is an ongoing cost center." }
  },

  "bridge": {
    name: "Bridge — TMS Integration Gateway",
    cls: "saas", tier: 2, score: "6.00", rank: 10,
    source: "Source A · Solution 2",
    tagline: "A modern API layer in front of any legacy TMS, without ripping it out — the enabler for every agent selling into legacy accounts.",
    problem: "Legacy TMS platforms (many 15–20 years old) speak only EDI or proprietary flat files. Every new trading-partner integration is a multi-week custom mapping project, usually outsourced to a systems integrator.",
    who: "Carriers, brokers, and 3PLs running legacy TMS (McLeod, TMW, MercuryGate, or in-house systems) who are turning away or delaying new customer/carrier integrations.",
    traditional: "Legacy-TMS integration is a systems-integrator-led services category. Bridge is a 'strangler-fig' adapter — pure EDI/API integration infrastructure with no AI component — retained as a standalone product (the largest ARR line in Source A) and simultaneously treated as shared platform infrastructure, since several agents need it to reach a legacy TMS. Classified as Traditional SaaS / Integration.",
    solution: "A strangler-fig adapter deployed alongside the existing TMS: it intercepts and translates EDI 204/210/214/990 and flat-file exports into REST/JSON APIs and webhooks, and translates inbound API/JSON requests back into whatever the legacy system expects. The legacy TMS keeps running unchanged underneath. A business analyst maps a new field or partner requirement through a spec, not custom code — cutting new trading-partner onboarding from 4–6 weeks to 3–5 days.",
    actions: [
      "Intercept and translate EDI 204/210/214/990 and flat-file exports into REST/JSON APIs and webhooks",
      "Translate inbound API/JSON requests back into the legacy system's expected format",
      "Provide pre-built EDI transaction-set templates mapped via spec, not custom code",
      "Deploy as a hosted or on-prem adapter alongside the existing TMS, unchanged"
    ],
    systems: ["Legacy TMS (McLeod, TMW, MercuryGate, in-house)", "EDI 204/210/214/990", "REST/JSON APIs", "Webhooks"],
    hitl: "A business analyst maps new fields/partner requirements through configuration; no AI decisioning is involved — it is deterministic integration middleware.",
    customers: ["Carriers, brokers, and 3PLs on legacy TMS turning away or delaying integrations"],
    kpi: "Trading-partner onboarding time (target: 4–6 weeks → 3–5 days).",
    impact: [
      ["Strategic", "Maximum Reusability score (10/10) — unlocks every agent's legacy-TMS addressable market"],
      ["Cycle-time", "Cuts new trading-partner onboarding from 4–6 weeks to 3–5 days (Source A)"],
      ["Revenue", "Largest single ARR line identified in either source document ($1.5M)"],
      ["Class", "Traditional SaaS / Integration — no AI/agent component"]
    ],
    roi: {
      title: "$1.5M ARR at 63 customers (Source A) — largest single ARR line identified",
      steps: [
        "Target: 63 subscription customers at maturity",
        "Subscription ARR: 63 × $24,000/yr = $1.51M",
        "Implementation fees ($15K–$40K, avg $22K) are non-recurring and not counted in ARR"
      ]
    },
    commercial: "One-time implementation fee ($15,000–$40,000, average $22,000) + $2,000/mo subscription for hosting, monitoring, and template updates.",
    difficulty: "Services-heavy", mvp: "3–5 flagship implementations expected in Year 1; scale is capped by integration-labor intensity relative to pure-SaaS products.",
    geography: "North America legacy-TMS estate (McLeod, TMW, MercuryGate, in-house). Applicable anywhere a legacy TMS speaks only EDI/flat files.",
    competition: { rating: "Dominated by established vendors (mid-market whitespace)", note: "Legacy-TMS integration is a systems-integrator-led services category; Bridge productizes it for the underserved mid-market. Key risk: the most services-heavy solution in the portfolio — implementation labor per customer caps how fast it scales." }
  }

};
