/* Customer × Solution Intersection Analysis
   Synthesized from the ideyaLabs source documents already loaded in this app:
   - NA Transportation Solutions Portfolio (Source A)
   - Top 10 Logistics AI Agents (Source B)
   - Priority Roadmap + Client Fit & Target Account Strategy
   Every fit/rationale below traces to the client-fit analysis (market-data.js).
   All SCORES here are "Calculated assessment based on source information" — computed by this
   app from the grounded fit levels, reusability, ROI and roadmap tiers; none is stated in a
   source document. Fidelity flags (FACT / ASSESSMENT / NEEDS VALIDATION) are preserved. */

window.INTERSECTION = {
  methodology: {
    note: "Scores on this page are calculated by the application from source-grounded inputs (client fit levels, roadmap reusability/ROI/whitespace scores, and the shared-platform reuse map). They are Assessment/Inference, not figures any source document states. Percentages of reuse are labelled estimates. Customer relationships and problems are only those evidenced in the source analysis; nothing is invented.",
    intersectionScore: [
      ["Number of relevant customers", "25%"],
      ["Similarity of underlying problem", "20%"],
      ["Solution reusability", "20%"],
      ["Revenue scalability", "15%"],
      ["ROI strength", "10%"],
      ["AI-agent differentiation", "10%"]
    ],
    investmentScore: [
      ["Customer intersection", "20%"], ["Business ROI", "15%"], ["Revenue potential", "15%"],
      ["AI-agent differentiation", "10%"], ["Market demand", "10%"], ["Reusability", "10%"],
      ["Speed to MVP", "5%"], ["Implementation feasibility", "5%"], ["Competitive whitespace", "5%"], ["Cross-sell / expansion", "5%"]
    ],
    intersectionStrength: [
      [5,"Very strong — same problem, highly reusable, multiple customers"],
      [4,"Strong — same core problem, moderate customization"],
      [3,"Moderate — similar problem, meaningful customer-specific differences"],
      [2,"Weak — some overlap, substantial customization"],
      [1,"Customer-specific — primarily useful for one customer"],
      [0,"Not relevant / insufficient evidence"]
    ]
  },

  /* Customers: 3 existing clients + representative sourced look-alike prospects.
     'evidence' is FACT where the client-fit doc cites a sourced fact, else ASSESSMENT. */
  customers: [
    { id:"bison", name:"Bison Transport", existing:true, country:"Canada", geo:"Canada/US/Mexico", segment:"Carrier + Brokerage", mode:"FTL/LTL/Intermodal + non-asset brokerage",
      note:"Existing client (warm — active OIA proposal). Multi-division asset + brokerage; tens-of-thousands-truck partner network." },
    { id:"daylight", name:"Daylight Transport", existing:true, country:"USA", geo:"United States", segment:"Expedited LTL", mode:"Expedited LTL (team-driver linehaul) + offshore transload",
      note:"Existing client. ~2,500 invoices/day through an EDI-210-integrated TruckMate TMS; mature tech stack." },
    { id:"hodlmayr", name:"Hödlmayr International", existing:true, country:"Austria", geo:"Europe", segment:"Automotive / Vehicle Logistics", mode:"Finished-vehicle rail + road + VLCs",
      note:"Existing client — automotive/vehicle logistics, NOT freight. Solutions apply only when adapted." },
    { id:"estes", name:"Estes Express Lines", existing:false, country:"USA", geo:"United States", segment:"LTL", mode:"National LTL, 300+ terminals",
      note:"Tier A prospect (not a customer) — large national LTL carrier." },
    { id:"schneider", name:"Schneider National", existing:false, country:"USA", geo:"United States", segment:"FTL/Intermodal", mode:"Truckload + intermodal + logistics",
      note:"Tier A prospect. Proven appetite: EXL AI partnership cut appointment cycle time 50%." },
    { id:"tforce", name:"TForce Freight (TFI)", existing:false, country:"USA/Canada", geo:"North America", segment:"LTL", mode:"19 acquired LTL operating companies",
      note:"Tier A prospect. Fragmented legacy TMS across 19 operating companies — textbook Bridge/consolidation case." },
    { id:"jbhunt", name:"J.B. Hunt", existing:false, country:"USA", geo:"United States", segment:"FTL/Brokerage", mode:"Intermodal + Dedicated + ICS brokerage",
      note:"Tier A prospect. ICS volume -7% YoY + new Google Cloud AI alliance." },
    { id:"dsv", name:"DSV (post-DB Schenker)", existing:false, country:"Denmark", geo:"Europe", segment:"Freight Forwarder / 3PL", mode:"Air/sea/road forwarding + contract logistics",
      note:"Tier A prospect. ~€14.3bn merger; two IT stacks mid-integration — strongest Bridge case." },
    { id:"groupecat", name:"Groupe CAT / STVA", existing:false, country:"France", geo:"Europe", segment:"Automotive Logistics", mode:"Bimodal finished-vehicle (rail+road), 105 compounds",
      note:"Tier A prospect. Largest automotive-logistics scale-peer to Hödlmayr; real-time truck geolocation already in place." }
  ],

  /* Normalized COMMON PROBLEM THEMES. customers[] lists which of the above share the theme,
     each with a fidelity flag from the source fit analysis. */
  problems: [
    { id:"invoice-leakage", name:"Freight invoice errors & accessorial leakage", category:"Financial",
      description:"Billing errors, invented/inflated accessorials, wrong fuel-surcharge dates, duplicate invoices leak 3–8% of freight spend; manual audit catches only a fraction.",
      customers:[ ["bison","FACT — Navix selected 2026 to standardize invoice review across divisions"], ["daylight","FACT — ~2,500 invoices/day through EDI-210 TMS"], ["hodlmayr","NEEDS VALIDATION — two-sided OEM + subcontractor billing, no documented accuracy problem (adapted)"], ["estes","ASSESSMENT — 300+ terminal LTL interline/accessorial billing volume"], ["tforce","ASSESSMENT — 19 operating companies' fragmented billing"], ["dsv","ASSESSMENT — merged-forwarder billing complexity"] ] },
    { id:"exceptions", name:"Shipment visibility, exceptions & disruption response", category:"Operational",
      description:"Deviations (delays, missed milestones, HOS, weather) cascade into detention, expedite cost and churn if not caught and resolved within hours; status data is scattered.",
      customers:[ ["bison","ASSESSMENT — multi-division intermodal network; 'Advanced Warning' already exists"], ["daylight","ASSESSMENT — time-critical 2–3 day model makes exceptions costly; EDI 214 flows"], ["hodlmayr","ASSESSMENT — complex rail-truck handoff network (adapted to vehicle movement)"], ["estes","ASSESSMENT — 2025 network expansion strains exception handling"], ["jbhunt","ASSESSMENT — Google Cloud AI alliance; seeking a technology edge"], ["schneider","ASSESSMENT — large truckload/intermodal control-tower surface"], ["groupecat","ASSESSMENT — real-time truck geolocation across 105 compounds (adapted)"] ] },
    { id:"claims", name:"Freight / vehicle-damage claims under-filing", category:"Financial",
      description:"Fewer than half of eligible claims are ever filed; manual filing costs ~$50/claim. Recovery roughly doubles when automated. (Adapted to vehicle-damage claims for automotive.)",
      customers:[ ["bison","ASSESSMENT — meaningful claims volume despite low loss ratio"], ["daylight","FACT — MyDaylight claims-intake portal already exists"], ["hodlmayr","FACT — existing 360° vehicle-photography workflow (adapted, strongest evidence)"], ["estes","ASSESSMENT — claims volume implied by 300+ terminal scale"] ] },
    { id:"carrier-fraud", name:"Carrier identity, onboarding & fraud risk", category:"Risk",
      description:"Double-brokering / identity fraud up 60% YoY; verification-only incumbents don't monitor continuously. Relevant to businesses that broker to a third-party carrier panel.",
      customers:[ ["bison","ASSESSMENT — tens-of-thousands-truck brokerage carrier network"], ["jbhunt","ASSESSMENT — ICS brokerage carrier network"], ["dsv","ASSESSMENT — combined carrier network from two merged forwarders"], ["tforce","ASSESSMENT — large cross-border US/Canada carrier network"] ] },
    { id:"visibility-gap", name:"Fragmented multi-carrier visibility (no unified feed)", category:"Operational",
      description:"No single normalized tracking feed across fragmented carriers; customer service spends hours/day calling for status. (FreightLink-class enabling layer.)",
      customers:[ ["bison","ASSESSMENT — only Bison lacks an already-built equivalent visibility tool"], ["estes","ASSESSMENT — 300+ terminal interline network"], ["dsv","ASSESSMENT — merged multi-carrier network"] ] },
    { id:"legacy-tms", name:"Legacy / fragmented TMS integration (M&A-driven)", category:"Technology",
      description:"Legacy TMS speaks only EDI/flat files; M&A creates multiple stacks. New trading-partner onboarding takes 4–6 weeks. (Bridge-class integration.)",
      customers:[ ["bison","ASSESSMENT — 2025 MasterMind TMS consolidation maturing"], ["hodlmayr","FACT — Gartner KG acquisition closing summer 2026 (adapted)"], ["tforce","ASSESSMENT — 19 operating companies on fragmented legacy TMS"], ["dsv","FACT — two full IT stacks mid-integration"] ] },
    { id:"procurement", name:"Dynamic freight procurement & tender rejection", category:"Financial",
      description:"Static contracts diverge from the spot market; high tender-rejection rates force expensive spot fallback. Relevant to capacity procurers, not capacity sellers.",
      customers:[ ["bison","NEEDS VALIDATION — only the brokerage arm is a plausible angle"], ["jbhunt","ASSESSMENT — brokerage procurement exposure"] ] },
    { id:"detention", name:"Dock scheduling & detention leakage", category:"Operational",
      description:"94.5% of fleets bill detention, fewer than half get paid; dock appointments hard to renegotiate in real time. (Hödlmayr's Syncrotess already solves the scheduling side.)",
      customers:[ ["bison","NEEDS VALIDATION — LCV/dedicated freight plausibly involves appointments"], ["daylight","NEEDS VALIDATION — national LTL terminal network plausibly has appointment complexity"], ["schneider","ASSESSMENT — proven appetite (EXL appointment-automation partnership)"] ] },
    { id:"quoting", name:"Slow RFQ / freight quoting response", category:"Commercial",
      description:"Quote turnaround measured in hours where competitors respond in minutes; deals lost on speed. Relevant to quote-driven businesses.",
      customers:[ ["daylight","FACT — live public Rate Quote API to extend"] ] },
    { id:"empty-mile", name:"Empty miles / return-leg utilization", category:"Financial",
      description:"Empty miles are direct cost with no revenue. FTL/specialized fleets have return-leg gaps; LTL consolidation solves most of this structurally.",
      customers:[ ["hodlmayr","ASSESSMENT — specialized car-carrier/rail-wagon fleet, most plausible empty-leg case (adapted)"], ["groupecat","ASSESSMENT — bimodal finished-vehicle fleet with geolocation data foundation (adapted)"] ] }
  ]
};

window.INTERSECTION.solutions = [
  { key:"invoice-audit", name:"Invoice Audit & Payment Agent", problem:"invoice-leakage", cls:"True AI Agent", tier:"Tier 1", level:1,
    reusePct:85, custRisk:"Low", customers:6, existingCustomers:3, problemSimilarity:4.2,
    intersectionScore:8.5, buildOnceScore:8.5, investmentScore:8.5,
    roi:9, aiDiff:8, revenue:9, reuse:8, whitespace:7, speed:8, feas:8,
    fits:{bison:5, daylight:5, hodlmayr:3, estes:4, tforce:4, dsv:4} },
  { key:"exception-mgmt", name:"Shipment Exception Mgmt Agent", problem:"exceptions", cls:"True AI Agent", tier:"Tier 1", level:1,
    reusePct:80, custRisk:"Medium", customers:7, existingCustomers:3, problemSimilarity:4.0,
    intersectionScore:9.0, buildOnceScore:8.1, investmentScore:8.5,
    roi:8, aiDiff:9, revenue:8, reuse:10, whitespace:7, speed:6, feas:6,
    fits:{bison:4, daylight:4, hodlmayr:4, estes:4, jbhunt:4, schneider:4, groupecat:4} },
  { key:"claims", name:"Freight Claims Mgmt & Recovery Agent", problem:"claims", cls:"True AI Agent", tier:"Tier 1", level:1,
    reusePct:75, custRisk:"Medium", customers:4, existingCustomers:3, problemSimilarity:4.0,
    intersectionScore:7.1, buildOnceScore:5.5, investmentScore:7.5,
    roi:8, aiDiff:8, revenue:7, reuse:7, whitespace:9, speed:8, feas:8,
    fits:{bison:4, daylight:4, hodlmayr:4, estes:4} },
  { key:"carrier-fraud", name:"Carrier Fraud & Onboarding Agent", problem:"carrier-fraud", cls:"True AI Agent", tier:"Tier 2", level:2,
    reusePct:70, custRisk:"Low", customers:4, existingCustomers:1, problemSimilarity:4.2,
    intersectionScore:7.2, buildOnceScore:6.8, investmentScore:7.5,
    roi:8, aiDiff:8, revenue:7, reuse:7, whitespace:8, speed:7, feas:7,
    fits:{bison:5, jbhunt:4, dsv:4, tforce:4} },
  { key:"freightlink", name:"FreightLink — Visibility Hub", problem:"visibility-gap", cls:"AI-Assisted", tier:"Tier 2", level:1,
    reusePct:90, custRisk:"Low", customers:3, existingCustomers:1, problemSimilarity:3.7,
    intersectionScore:6.7, buildOnceScore:7.0, investmentScore:7.0,
    roi:7, aiDiff:4, revenue:7, reuse:10, whitespace:5, speed:7, feas:7,
    fits:{bison:3, estes:4, dsv:4} },
  { key:"procurement", name:"Dynamic Freight Procurement Agent", problem:"procurement", cls:"True AI Agent", tier:"Tier 2", level:2,
    reusePct:55, custRisk:"Medium", customers:2, existingCustomers:1, problemSimilarity:3.5,
    intersectionScore:6.0, buildOnceScore:4.2, investmentScore:7.0,
    roi:8, aiDiff:7, revenue:8, reuse:6, whitespace:7, speed:6, feas:6,
    fits:{bison:3, jbhunt:4} },
  { key:"bridge", name:"Bridge — TMS Integration Gateway", problem:"legacy-tms", cls:"Traditional / Integration", tier:"Tier 2", level:1,
    reusePct:60, custRisk:"High", customers:4, existingCustomers:2, problemSimilarity:4.0,
    intersectionScore:7.0, buildOnceScore:5.0, investmentScore:6.7,
    roi:6, aiDiff:2, revenue:8, reuse:10, whitespace:6, speed:5, feas:6,
    fits:{bison:3, hodlmayr:3, tforce:5, dsv:5} },
  { key:"detention", name:"Detention & Dock Coordination Agent", problem:"detention", cls:"True AI Agent", tier:"Tier 2", level:2,
    reusePct:55, custRisk:"High", customers:3, existingCustomers:2, problemSimilarity:3.3,
    intersectionScore:6.2, buildOnceScore:2.9, investmentScore:6.7,
    roi:8, aiDiff:7, revenue:7, reuse:6, whitespace:7, speed:6, feas:6,
    fits:{bison:3, daylight:3, schneider:4} },
  { key:"empty-mile", name:"Empty-Mile / Backhaul Agent", problem:"empty-mile", cls:"True AI Agent", tier:"Tier 3", level:2,
    reusePct:50, custRisk:"Medium", customers:2, existingCustomers:1, problemSimilarity:4.0,
    intersectionScore:6.0, buildOnceScore:4.2, investmentScore:6.4,
    roi:7, aiDiff:7, revenue:7, reuse:6, whitespace:5, speed:6, feas:6,
    fits:{hodlmayr:4, groupecat:4} },
  { key:"quoting", name:"Freight Quoting & RFQ Agent", problem:"quoting", cls:"True AI Agent", tier:"Tier 3", level:3,
    reusePct:50, custRisk:"Medium", customers:1, existingCustomers:1, problemSimilarity:4.0,
    intersectionScore:5.2, buildOnceScore:3.2, investmentScore:6.1,
    roi:7, aiDiff:6, revenue:6, reuse:5, whitespace:4, speed:8, feas:8,
    fits:{daylight:4} },
];
/* White-space: common problems shared by multiple customers where the portfolio's fit is
   weak/absent or only adapted — potential new/underserved product opportunities. */
window.INTERSECTION.whitespace = [
  { problem:"Vehicle-logistics-native agents (automotive vertical)", customers:["Hödlmayr","Groupe CAT / STVA"],
    gap:"The freight-first portfolio only fits automotive logistics when adapted; no purpose-built vehicle-logistics agent exists (damage/claims, rail-truck movement, car-carrier backhaul).",
    potential:"A verticalized Vehicle Logistics agent suite — strongest differentiation, no freight-focused competitor positioned to build it.", fidelity:"ASSESSMENT" },
  { problem:"Cross-border customs & trade documentation", customers:["DSV","(cross-border shippers/3PLs broadly)"],
    gap:"Deferred (Tier 3/4) in the roadmap; broker-gated and high-difficulty, but recurring across European/forwarder prospects.",
    potential:"A broker-authorized Customs & Trade-Documentation agent — real demand, held back on difficulty rather than lack of need.", fidelity:"ASSESSMENT" },
  { problem:"Dispatch / ops copilot (advisory)", customers:["(dispatch-heavy carriers broadly)"],
    gap:"DispatchCopilot is classified advisory-only and deferred; no prioritized agentic product, but a recurring operational pain.",
    potential:"An advisory ops-copilot surfacing exception/backhaul suggestions to a human dispatcher — a UI layer, not a standalone agent.", fidelity:"ASSESSMENT" }
];

/* Roadmap phases keyed to intersection strength (customers + reuse + speed). */
window.INTERSECTION.roadmap = [
  { phase:"Phase 1 — 0–3 months", theme:"Highest intersection + fast MVP + self-funding",
    build:["Invoice Audit & Payment Agent (3 existing clients + look-alikes; 85% reuse; Low customization)"],
    scale:"Bison (warm) & Daylight (cleanest data) in parallel → Estes/TForce/DSV look-alikes → every carrier/broker with third-party freight spend." },
  { phase:"Phase 2 — 3–6 months", theme:"Fast-follow reusing Phase-1 infrastructure",
    build:["Freight Claims Mgmt & Recovery Agent (reuses document-intelligence + dispute engine)","Begin FreightLink visibility layer"],
    scale:"Daylight (MyDaylight intake) & Hödlmayr (360° photography, adapted) → Estes → LTL/parcel-heavy look-alikes." },
  { phase:"Phase 3 — 6–12 months", theme:"Scale the platform + widest intersection",
    build:["Shipment Exception Mgmt Agent (7-customer intersection; built on FreightLink)","Carrier Fraud & Onboarding Agent","Sell Bridge to legacy-TMS accounts"],
    scale:"J.B. Hunt, Schneider, Estes → brokerage networks (Bison, DSV, TForce) for fraud → automotive (Groupe CAT) for exceptions (adapted)." },
  { phase:"Phase 4 — 12–24 months", theme:"Verticalize + expand segments",
    build:["Vehicle-logistics agent suite (Hödlmayr, Groupe CAT — Level 2 vertical)","Detention & Dock, Procurement, Empty-Mile/Backhaul as demand accrues"],
    scale:"Automotive-vertical look-alikes (ARS Altmann, CEVA, BLG) → European forwarders → new segments." }
];

/* Product-level definitions for the three-tier product-opportunity classification. */
window.INTERSECTION.levels = {
  1: { label:"Level 1 — Horizontal product", note:"Applies across multiple transportation/logistics customers with high reuse. Strongest strategic priority." },
  2: { label:"Level 2 — Vertical product", note:"Reusable across multiple customers within one vertical (LTL, FTL, brokerage, automotive) but not fully horizontal." },
  3: { label:"Level 3 — Customer-specific", note:"Primarily solves one customer's problem today; lower reuse, prioritize only if exceptional value." }
};
