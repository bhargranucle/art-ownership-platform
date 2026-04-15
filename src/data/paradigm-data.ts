// Hardcoded data for ParadigmShift prototype

export const ARTWORKS = [
  { id: 1, title: "Rothko No. 61 (Rust and Blue)", artist: "Mark Rothko", museum: "MoMA", year: 1953, shares: 12, avgCost: 580, price: 720, pnl: 24.1, tokens: 120 },
  { id: 2, title: "Picasso Demoiselles", artist: "Pablo Picasso", museum: "MoMA", year: 1907, shares: 5, avgCost: 1100, price: 1340, pnl: 21.8, tokens: 50 },
  { id: 3, title: "de Kooning Excavation", artist: "Willem de Kooning", museum: "MoMA", year: 1950, shares: 8, avgCost: 290, price: 310, pnl: 6.9, tokens: 80 },
  { id: 4, title: "Van Gogh Starry Night", artist: "Vincent van Gogh", museum: "MoMA", year: 1889, shares: 3, avgCost: 1050, price: 1200, pnl: 14.3, tokens: 0 },
  { id: 5, title: "Kandinsky Comp. 8", artist: "Wassily Kandinsky", museum: "Guggenheim", year: 1923, shares: 4, avgCost: 410, price: 395, pnl: -3.7, tokens: 200 },
];

export const PROPOSALS_INIT = [
  { id: 1, title: "Loan Rothko No. 61 to Tate Modern", desc: "6-month loan. Tate Modern covers insurance & transport.", art: "Rothko No. 61", closes: "Apr 15", daysLeft: 2, forPct: 58, againstPct: 22, abstainPct: 20, voted: null as string | null },
  { id: 2, title: "Conservation treatment — Picasso", desc: "UV-protective glazing for long-term preservation.", art: "Picasso Demoiselles", closes: "Apr 18", daysLeft: 5, forPct: 74, againstPct: 10, abstainPct: 16, voted: "For" as string | null },
  { id: 3, title: "Digital reproduction licensing — Kandinsky", desc: "Authorize licensed digital prints via museum shop.", art: "Kandinsky Comp. 8", closes: "Apr 22", daysLeft: 9, forPct: 41, againstPct: 35, abstainPct: 24, voted: null as string | null },
];

export const TOKEN_MARKETS = [
  { art: "Rothko No. 61", price: 4.80, change: 5.2, vol: "$21K", bal: 120 },
  { art: "Picasso Demoiselles", price: 6.20, change: 1.8, vol: "$38K", bal: 50 },
  { art: "de Kooning Excavation", price: 3.10, change: -0.9, vol: "$12K", bal: 80 },
  { art: "Van Gogh Starry Night", price: 9.40, change: 7.1, vol: "$13K", bal: 0 },
  { art: "Kandinsky Comp. 8", price: 2.60, change: -2.1, vol: "$8K", bal: 200 },
];

export const MARKET_ITEMS = [
  { id: 10, artist: "Banksy", title: "Mona Lisa", museum: "Christie's", price: 250, funded: 72, irr: "12.37%", tag: "New" },
  { id: 11, artist: "Gerhard Richter", title: "Abstract Painting", museum: "Tate Modern", price: 180, funded: 45, irr: "9.8%", tag: "" },
  { id: 12, artist: "Louise Bourgeois", title: "Spider", museum: "Guggenheim Bilbao", price: 320, funded: 88, irr: "11.2%", tag: "Hot" },
  { id: 13, artist: "Cy Twombly", title: "Untitled", museum: "MoMA", price: 140, funded: 31, irr: "8.5%", tag: "" },
  { id: 14, artist: "Jean-Michel Basquiat", title: "Untitled", museum: "Whitney", price: 410, funded: 91, irr: "14.1%", tag: "Almost full" },
  { id: 15, artist: "Agnes Martin", title: "Untitled", museum: "LACMA", price: 95, funded: 55, irr: "7.9%", tag: "" },
];

export const MUS_ARTWORKS = [
  { title: "Rothko No. 61", shares: 10000, float: 3200, price: 720, stakeholders: 847 },
  { title: "Picasso Demoiselles", shares: 5000, float: 1100, price: 1340, stakeholders: 412 },
  { title: "de Kooning Excavation", shares: 8000, float: 2800, price: 310, stakeholders: 634 },
  { title: "Van Gogh Starry Night", shares: 2000, float: 400, price: 1200, stakeholders: 289 },
  { title: "Kandinsky Comp. 8", shares: 6000, float: 3400, price: 395, stakeholders: 521 },
];

export const MUS_PROPOSALS_INIT = [
  { id: 1, title: "Loan Rothko No. 61 to Tate Modern", art: "Rothko", forPct: 58, decision: null as string | null },
  { id: 2, title: "Conservation treatment — Picasso", art: "Picasso", forPct: 74, decision: null as string | null },
  { id: 3, title: "Digital reproduction — Kandinsky", art: "Kandinsky", forPct: 41, decision: null as string | null },
];

export const PORT_CHART = [22300, 22800, 23100, 22900, 23400, 23800, 24200, 24500, 24850];
export const MUS_CHART = [41000, 43000, 44500, 46000, 47200, 48200];
export const TOKEN_CHART = [3.8, 3.9, 4.0, 3.85, 4.1, 4.3, 4.5, 4.6, 4.8];

export const BANKSY_PAIRS = [
  { ret: "9.53×", irr: "41.12%" },
  { ret: "7.36×", irr: "33.02%" },
  { ret: "4.48×", irr: "25.34%" },
  { ret: "3.36×", irr: "28.10%" },
  { ret: "2.54×", irr: "23.86%" },
  { ret: "1.38×", irr: "16.82%" },
];

export const COMPLIANCE_ITEMS = [
  "SEC", "ESMA", "MiFID II", "GDPR", "IRS 501(c)(3)", "AMLD", "EU Cultural Heritage"
];

// ─── Secondary Market Data (Masterworks-style) ───
export const SECONDARY_MARKET_ITEMS = [
  { id: 's1', artist: "Barkley L. Hendricks", title: "Selina/Star", series: "Masterworks 02...", price: 35.29, chartData: [36.53, 36.20, 35.91, 35.80, 35.50, 35.29], levels: [36.53, 35.91, 35.29], change: -3.4 },
  { id: 's2', artist: "Banksy", title: "Monkey Poison", series: "Masterwork...", price: 32.45, chartData: [33.00, 32.80, 28.70, 27.50, 30.20, 32.45], levels: [33.00, 28.70, 24.41], change: -1.7 },
  { id: 's3', artist: "Cecily Brown", title: "Girl Trouble", series: "Masterworks 00...", price: 28.52, chartData: [30.71, 30.20, 29.61, 29.80, 29.10, 28.52], levels: [30.71, 29.61, 28.52], change: -7.1 },
  { id: 's4', artist: "Cecily Brown", title: "There is a Land of Pure D...", series: "Masterworks", price: 25.69, chartData: [27.49, 27.00, 26.55, 26.30, 25.90, 25.69], levels: [27.49, 26.55, 25.61], change: -6.5 },
  { id: 's5', artist: "Yayoi Kusama", title: "Infinity Nets T.I.T.", series: "Masterwo...", price: 24.40, chartData: [27.76, 27.00, 26.08, 25.50, 24.80, 24.40], levels: [27.76, 26.08, 24.40], change: -12.1 },
  { id: 's6', artist: "George Condo", title: "Mary Magdalene", series: "Masterwo...", price: 23.94, chartData: [34.17, 32.00, 29.05, 27.00, 25.00, 23.94], levels: [34.17, 29.05, 23.94], change: -29.9 },
  { id: 's7', artist: "David Hockney", title: "Iris with Evian Bottle", series: "Mast...", price: 23.64, chartData: [24.15, 23.80, 23.50, 23.00, 22.50, 23.64], levels: [24.15, 23.00, 21.85], change: -2.1 },
  { id: 's8', artist: "Joan Mitchell", title: "Untitled (Buissonnière)", series: "M...", price: 22.70, chartData: [23.10, 22.00, 19.95, 18.50, 19.00, 22.70], levels: [23.10, 19.95, 16.80], change: -1.7 },
  { id: 's9', artist: "Pierre Soulages", title: "Peinture 181 × 91 cm, 7 av...", series: "M...", price: 22.50, chartData: [33.50, 30.00, 27.00, 25.00, 23.00, 22.50], levels: [33.50, 22.50, 22.50], change: -32.8 },
];

// ─── Legal & Compliance Data ───
export const SPV_DETAILS = {
  name: "ParadigmShift Museum Trust SPV I, LLC",
  type: "501(c)(3) Special Purpose Vehicle",
  controlledBy: "Museum of Modern Art",
  jurisdiction: "Delaware, USA",
  established: "2024-01-15",
  status: "Active",
};

export const LEGAL_PROTECTIONS = [
  { title: "Perpetual Museum Control", desc: "Legal structures ensuring permanent museum majority ownership (≥51%)", status: "Active", icon: "🏛" },
  { title: "Donor Intent Safeguards", desc: "Systems to respect and record historical donor restrictions", status: "Active", icon: "📜" },
  { title: "Reversion Clauses", desc: "Automatic return of full ownership under specific conditions", status: "Active", icon: "↩" },
  { title: "Ethics Framework", desc: "Embedded guidelines from AAMD, AAM, and ICOM", status: "Active", icon: "⚖" },
];

export const REGULATORY_REPORTS = [
  { entity: "SEC", type: "Securities Compliance", lastFiled: "Mar 2026", status: "Current", next: "Jun 2026" },
  { entity: "IRS", type: "501(c)(3) Annual Report", lastFiled: "Jan 2026", status: "Current", next: "Jan 2027" },
  { entity: "NY AG", type: "Charitable Org Report", lastFiled: "Feb 2026", status: "Current", next: "Feb 2027" },
  { entity: "ESMA", type: "MiFID II Compliance", lastFiled: "Mar 2026", status: "Current", next: "Sep 2026" },
  { entity: "GDPR DPA", type: "Data Protection Audit", lastFiled: "Jan 2026", status: "Current", next: "Jan 2027" },
];

// ─── Museum Management Data ───
export const APPROVAL_WORKFLOWS = [
  { id: 'w1', title: "Deaccession: Warhol Campbell's Soup", stage: "Board Review", stages: ["Curator Review", "Committee Vote", "Board Review", "Legal Clearance", "Public Notice"], currentStage: 2, initiator: "Dr. Martinez", date: "Apr 10, 2026" },
  { id: 'w2', title: "Tokenization: Monet Water Lilies", stage: "Legal Clearance", stages: ["Curator Review", "Committee Vote", "Board Review", "Legal Clearance", "Public Notice"], currentStage: 3, initiator: "Sarah Chen", date: "Apr 8, 2026" },
  { id: 'w3', title: "Loan Extension: Rothko to Tate", stage: "Committee Vote", stages: ["Curator Review", "Committee Vote", "Board Review"], currentStage: 1, initiator: "Dr. Martinez", date: "Apr 12, 2026" },
];

export const STAFF_ROLES = [
  { name: "Dr. Elena Martinez", role: "Director", permissions: ["Full Access", "Override Authority", "Financial Approval"], status: "Active" },
  { name: "Sarah Chen", role: "Chief Curator", permissions: ["Collection Management", "Loan Approval", "Exhibition Planning"], status: "Active" },
  { name: "James Liu", role: "Board Chair", permissions: ["Governance Voting", "Financial Review", "Policy Override"], status: "Active" },
  { name: "Maria Santos", role: "Registrar", permissions: ["Artwork Records", "Condition Reports", "Provenance Data"], status: "Active" },
  { name: "David Kim", role: "Development Officer", permissions: ["Donor Relations", "Revenue Reports", "Investor Comms"], status: "Active" },
];

export const DONOR_RECORDS = [
  { donor: "The Rothko Estate", artwork: "Rothko No. 61", restriction: "Must remain on public display ≥6 months/year", status: "Compliant", year: 1987 },
  { donor: "Anonymous Benefactor", artwork: "Picasso Demoiselles", restriction: "No commercial reproduction without written consent", status: "Compliant", year: 1972 },
  { donor: "Kandinsky Society", artwork: "Kandinsky Comp. 8", restriction: "Proceeds must fund education programs", status: "Compliant", year: 1995 },
];

export const SYSTEM_INTEGRATIONS = [
  { system: "The Museum System (TMS)", type: "Collection Management", status: "Connected", lastSync: "2m ago" },
  { system: "Raiser's Edge NXT", type: "Donor Management / CRM", status: "Connected", lastSync: "15m ago" },
  { system: "Workday", type: "Financial Management", status: "Connected", lastSync: "1h ago" },
  { system: "Artnet Price Database", type: "Market Valuation", status: "Connected", lastSync: "30m ago" },
  { system: "MutualArt", type: "Art Market Analytics", status: "Connected", lastSync: "45m ago" },
  { system: "Europeana", type: "EU Cultural Heritage", status: "Connected", lastSync: "2h ago" },
];

// ─── Analytics Data ───
export const PROVENANCE_RECORDS = [
  { artwork: "Rothko No. 61", events: 14, lastVerified: "Apr 14, 2026", chain: "Avalanche", integrity: "100%" },
  { artwork: "Picasso Demoiselles", events: 22, lastVerified: "Apr 13, 2026", chain: "Avalanche", integrity: "100%" },
  { artwork: "de Kooning Excavation", events: 9, lastVerified: "Apr 14, 2026", chain: "Avalanche", integrity: "100%" },
  { artwork: "Van Gogh Starry Night", events: 31, lastVerified: "Apr 12, 2026", chain: "Avalanche", integrity: "100%" },
  { artwork: "Kandinsky Comp. 8", events: 17, lastVerified: "Apr 14, 2026", chain: "Avalanche", integrity: "100%" },
];

export const CULTURAL_METRICS = [
  { metric: "Public Engagement Score", value: "94/100", trend: "+8", period: "vs last quarter" },
  { metric: "Educational Programs Funded", value: "38", trend: "+12", period: "this year" },
  { metric: "Community Benefit Index", value: "8.7/10", trend: "+0.4", period: "vs last quarter" },
  { metric: "Audience Diversity Score", value: "82/100", trend: "+5", period: "vs last year" },
  { metric: "Mission Alignment", value: "96%", trend: "+2%", period: "vs last quarter" },
];

// ─── Security Data ───
export const SECURITY_CONTROLS = [
  { control: "Hardware Security Modules", desc: "HSM-protected institutional keys for critical museum controls", status: "Active", level: "Critical" },
  { control: "Multi-Signature Governance", desc: "3-of-5 signatures required for high-value decisions", status: "Active", level: "Critical" },
  { control: "Regulatory Compliance Monitor", desc: "Automated checks for legal adherence across jurisdictions", status: "Active", level: "High" },
  { control: "Threat Intelligence", desc: "Museum-specific security threat monitoring & alerting", status: "Active", level: "High" },
  { control: "Digital Twin Security", desc: "Protected digital representations of physical artworks", status: "Active", level: "Medium" },
  { control: "Provenance Protection", desc: "Immutable audit trail preventing unauthorized history changes", status: "Active", level: "Critical" },
  { control: "Insurance Integration", desc: "Connected to museum insurance framework (AXA XL)", status: "Active", level: "Medium" },
  { control: "Conservation Record Security", desc: "Encrypted condition and conservation data", status: "Active", level: "High" },
];
