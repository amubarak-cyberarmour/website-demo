export const caseStudies = [
  {
    slug: "support-pilot",
    title: "Support Pilot - Multichannel AI Customer Assistant",
    tags: ["Multichannel Integration", "Knowledge Base Engineering"],
    color: "#323d68",
    icon: "stack",
    imageFirst: true,
    summary:
      "A customer support assistant connected across chat, email, and internal documentation to reduce response delays and keep service available around the clock.",
    metrics: [
      { value: "-64%", label: "Response time" },
      { value: "-40%", label: "Backlog" },
      { value: "24/7", label: "Uptime" },
    ],
  },
  {
    slug: "retail-flow",
    title: "Retail Flow - AI-Driven Demand Forecasting & Inventory Automation",
    tags: ["AI Forecasting", "Process Automation", "Systems Integration"],
    color: "#0e1229",
    icon: "bars",
    imageFirst: false,
    summary:
      "A forecasting and inventory automation workflow that helped store teams anticipate demand, reduce stockouts, and save operational time.",
    metrics: [
      { value: "32%", label: "Stockout reduction" },
      { value: "+18%", label: "Turnover rate" },
      { value: "12h/w", label: "Saved per store" },
    ],
  },
  {
    slug: "leadsense",
    title: "Leadsense - Automated Lead Qualification & Routing Engine",
    tags: ["AI Lead Scoring", "Workflow Automation"],
    color: "#4f5b7f",
    icon: "pie",
    imageFirst: true,
    summary:
      "A qualification and routing engine that scored incoming leads, matched them to the right team, and reduced manual review work.",
    metrics: [
      { value: "+46%", label: "Qualified leads" },
      { value: "-51%", label: "Manual review" },
      { value: "3.2x", label: "Faster routing" },
    ],
  },
] as const;
