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
