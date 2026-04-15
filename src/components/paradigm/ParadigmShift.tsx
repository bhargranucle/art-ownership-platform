import React, { useState, useEffect } from 'react';
import { MiniChart } from './MiniChart';
import { getArtworkSVG, getMarketArtSVG } from './ArtworkSVGs';
import {
  ARTWORKS, PROPOSALS_INIT, TOKEN_MARKETS, MARKET_ITEMS,
  MUS_ARTWORKS, MUS_PROPOSALS_INIT, PORT_CHART, MUS_CHART,
  TOKEN_CHART, BANKSY_PAIRS, COMPLIANCE_ITEMS,
  SECONDARY_MARKET_ITEMS, SPV_DETAILS, LEGAL_PROTECTIONS,
  REGULATORY_REPORTS, APPROVAL_WORKFLOWS, STAFF_ROLES,
  DONOR_RECORDS, SYSTEM_INTEGRATIONS, PROVENANCE_RECORDS,
  CULTURAL_METRICS, SECURITY_CONTROLS
} from '@/data/paradigm-data';

type Screen = 'role-select' | 'inv-login' | 'inv-dash' | 'inv-holdings' | 'artwork-detail' |
  'marketplace' | 'mkt-detail' | 'inv-gov' | 'token-market' | 'inv-chain' | 'inv-secondary' | 'inv-analytics' |
  'mus-login' | 'mus-dash' | 'mus-engagement' | 'mus-gov' | 'mus-chain' | 'mus-legal' | 'mus-management' | 'mus-security';

type Modal = null | 'trade' | 'token' | 'new-proposal';

// ─── Shared UI ───────────────────────────────────────────

const Btn = ({ children, variant = 'primary', portal = 'inv', onClick, disabled, className = '', style }: any) => {
  const base = "px-4 py-2.5 rounded-[10px] font-semibold text-sm transition-all duration-300 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed";
  const variants: Record<string, string> = {
    primary: portal === 'inv'
      ? "bg-[#7C5CFC] text-[#F8F8FC] hover:opacity-90 hover:-translate-y-[1px]"
      : "bg-[#10B981] text-[#F8F8FC] hover:opacity-90 hover:-translate-y-[1px]",
    secondary: "bg-[#F0F0F5] text-[#1A1A2E] border border-[rgba(0,0,0,0.08)] hover:border-[rgba(0,0,0,0.12)] hover:-translate-y-[1px]",
    ghost: "bg-transparent text-[#6B6B8A] hover:text-[#1A1A2E]",
    danger: "bg-[rgba(220,38,38,0.1)] text-[#DC2626] border border-[rgba(220,38,38,0.15)] hover:bg-[rgba(220,38,38,0.15)]",
    success: "bg-[rgba(5,150,105,0.1)] text-[#059669] border border-[rgba(5,150,105,0.15)] hover:bg-[rgba(5,150,105,0.15)]",
    warning: "bg-[rgba(217,119,6,0.1)] text-[#D97706] border border-[rgba(217,119,6,0.15)] hover:bg-[rgba(217,119,6,0.15)]",
  };
  return <button className={`${base} ${variants[variant] || variants.primary} ${className}`} onClick={onClick} disabled={disabled} style={style}>{children}</button>;
};

const Tag = ({ children, variant = 'inv' }: any) => {
  const variants: Record<string, string> = {
    success: "bg-[rgba(5,150,105,0.1)] text-[#059669] border-[rgba(5,150,105,0.15)]",
    warning: "bg-[rgba(217,119,6,0.1)] text-[#D97706] border-[rgba(217,119,6,0.15)]",
    danger: "bg-[rgba(220,38,38,0.1)] text-[#DC2626] border-[rgba(220,38,38,0.15)]",
    inv: "bg-[rgba(124,92,252,0.1)] text-[#7C5CFC] border-[rgba(124,92,252,0.15)]",
    mus: "bg-[rgba(16,185,129,0.1)] text-[#10B981] border-[rgba(16,185,129,0.15)]",
    muted: "bg-[rgba(0,0,0,0.04)] text-[#6B6B8A] border-[rgba(0,0,0,0.08)]",
  };
  return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${variants[variant] || variants.inv}`}>{children}</span>;
};

const VoteBar = ({ forPct, againstPct, abstainPct }: { forPct: number; againstPct: number; abstainPct: number }) => (
  <div className="w-full h-1.5 rounded-full overflow-hidden flex bg-[rgba(0,0,0,0.06)]">
    <div className="h-full bg-[#059669] transition-all duration-700" style={{ width: `${forPct}%` }} />
    <div className="h-full bg-[#DC2626] transition-all duration-700" style={{ width: `${againstPct}%` }} />
    <div className="h-full bg-[rgba(0,0,0,0.08)] transition-all duration-700" style={{ width: `${abstainPct}%` }} />
  </div>
);

const MetricTile = ({ label, value, sub, portal = 'inv' }: any) => (
  <div className="bg-[#F0F0F5] border border-[rgba(0,0,0,0.08)] rounded-xl p-5">
    <div className="text-[11px] uppercase tracking-[0.08em] font-semibold text-[#9494B0] mb-2">{label}</div>
    <div className="font-serif-dm text-[28px] text-[#1A1A2E]">{value}</div>
    {sub && <div className="text-[12px] text-[#6B6B8A] mt-1">{sub}</div>}
  </div>
);

const Card = ({ children, className = '', hover = true, portal = 'inv' }: any) => (
  <div className={`bg-[#FFFFFF] border border-[rgba(0,0,0,0.08)] rounded-2xl p-6 transition-all duration-300 ${hover ? `hover:border-[rgba(0,0,0,0.12)] hover:-translate-y-[2px]` : ''} ${className}`}
    style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 4px 24px rgba(0,0,0,0.06)' }}>
    {children}
  </div>
);

const ScreenWrap = ({ children, key: k }: any) => (
  <div className="screen-enter" key={k}>{children}</div>
);

const CompliancePanel = () => (
  <Card>
    <div className="text-[11px] uppercase tracking-[0.08em] font-semibold text-[#9494B0] mb-4">Compliance Status</div>
    <div className="space-y-2">
      {COMPLIANCE_ITEMS.map(c => (
        <div key={c} className="flex items-center justify-between text-sm">
          <span className="text-[#6B6B8A]">{c}</span>
          <span className="text-[#059669] text-xs font-medium">✓ Compliant</span>
        </div>
      ))}
    </div>
  </Card>
);

// ─── Main App ────────────────────────────────────────────

export default function ParadigmShift() {
  const [screen, setScreen] = useState<Screen>('role-select');
  const [portal, setPortal] = useState<'inv' | 'mus'>('inv');
  const [selectedArt, setSelectedArt] = useState(ARTWORKS[0]);
  const [selectedMarket, setSelectedMarket] = useState(MARKET_ITEMS[0]);
  const [artTab, setArtTab] = useState('overview');
  const [holdingsSearch, setHoldingsSearch] = useState('');
  const [mktFilter, setMktFilter] = useState('All');
  const [chartPeriod, setChartPeriod] = useState('6M');

  // Modal
  const [modal, setModal] = useState<Modal>(null);
  const [modalData, setModalData] = useState<any>({});
  const [tradeQty, setTradeQty] = useState(3);
  const [tokenQty, setTokenQty] = useState(50);
  const [tokenTab, setTokenTab] = useState('buy');
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  // New proposal
  const [npTitle, setNpTitle] = useState('');
  const [npDesc, setNpDesc] = useState('');
  const [npArt, setNpArt] = useState(ARTWORKS[0].title);
  const [npWindow, setNpWindow] = useState('14 days');

  // Governance
  const [proposals, setProposals] = useState(PROPOSALS_INIT.map(p => ({ ...p })));
  const [musProposals, setMusProposals] = useState(MUS_PROPOSALS_INIT.map(p => ({ ...p })));

  // Secondary market
  const [showTrending, setShowTrending] = useState(true);

  const accent = portal === 'inv' ? '#7C5CFC' : '#10B981';

  const navigate = (s: Screen) => { setScreen(s); setOrderConfirmed(false); };

  const openTradeModal = (artwork: any, mode: 'buy' | 'sell') => {
    setModalData({ artwork, mode });
    setTradeQty(mode === 'buy' ? 3 : 1);
    setOrderConfirmed(false);
    setModal('trade');
  };

  const openTokenModal = (art: string) => {
    setModalData({ art });
    setTokenQty(50);
    setTokenTab('buy');
    setOrderConfirmed(false);
    setModal('token');
  };

  const confirmOrder = () => {
    setOrderConfirmed(true);
    setTimeout(() => setModal(null), 1800);
  };

  // ─── Sidebar ─────────────────────────────

  const InvSidebar = () => {
    const items = [
      { id: 'inv-dash', label: 'Dashboard', icon: '◈' },
      { id: 'inv-holdings', label: 'My Holdings', icon: '◇' },
      { id: 'marketplace', label: 'Marketplace', icon: '◎' },
      { id: 'inv-secondary', label: 'Secondary Market', icon: '◉' },
      { id: 'inv-gov', label: 'Governance', icon: '◬', badge: proposals.filter(p => !p.voted).length },
      { id: 'token-market', label: 'Token Market', icon: '⬡' },
      { id: 'inv-analytics', label: 'Analytics', icon: '◫' },
      { id: 'inv-chain', label: 'Chain Infrastructure', icon: '⬢' },
    ];
    return (
      <div className="w-[220px] min-h-screen bg-[#FFFFFF] border-r border-[rgba(0,0,0,0.08)] flex flex-col">
        <div className="p-5 mb-2">
          <Logo />
        </div>
        <nav className="flex-1 px-3 space-y-1">
          {items.map((item, i) => {
            const active = screen === item.id || (item.id === 'inv-dash' && screen === 'artwork-detail');
            return (
              <button key={item.id}
                className={`w-full text-left px-4 py-2.5 rounded-r-[10px] text-sm flex items-center gap-3 transition-all duration-300 ${
                  active ? 'bg-[rgba(124,92,252,0.1)] text-[#7C5CFC] border-l-2 border-[#7C5CFC]' : 'text-[#6B6B8A] hover:bg-[#F0F0F5] hover:text-[#1A1A2E] border-l-2 border-transparent'
                }`}
                style={{ animationDelay: `${i * 50}ms` }}
                onClick={() => navigate(item.id as Screen)}
              >
                <span className="text-base">{item.icon}</span>
                <span>{item.label}</span>
                {item.badge ? <span className="ml-auto bg-[rgba(124,92,252,0.15)] text-[#7C5CFC] text-[10px] font-bold px-1.5 py-0.5 rounded-full">{item.badge}</span> : null}
              </button>
            );
          })}
        </nav>
        <div className="px-3 pb-5">
          <div className="border-t border-[rgba(0,0,0,0.08)] pt-3">
            <button className="w-full text-left px-4 py-2.5 text-sm text-[#9494B0] hover:text-[#6B6B8A] transition-colors" onClick={() => navigate('role-select')}>Sign out</button>
          </div>
        </div>
      </div>
    );
  };

  const MusSidebar = () => {
    const items = [
      { id: 'mus-dash', label: 'Overview', icon: '◈' },
      { id: 'mus-management', label: 'Management', icon: '◇' },
      { id: 'mus-legal', label: 'Legal & Compliance', icon: '⚖' },
      { id: 'mus-engagement', label: 'Engagement & Impact', icon: '◎' },
      { id: 'mus-gov', label: 'Stakeholder Governance', icon: '◬' },
      { id: 'mus-security', label: 'Security', icon: '🔒' },
      { id: 'mus-chain', label: 'Chain Infrastructure', icon: '⬡' },
    ];
    return (
      <div className="w-[220px] min-h-screen bg-[#FFFFFF] border-r border-[rgba(0,0,0,0.08)] flex flex-col">
        <div className="p-5 mb-2"><Logo /></div>
        <nav className="flex-1 px-3 space-y-1">
          {items.map((item, i) => {
            const active = screen === item.id;
            return (
              <button key={item.id}
                className={`w-full text-left px-4 py-2.5 rounded-r-[10px] text-sm flex items-center gap-3 transition-all duration-300 ${
                  active ? 'bg-[rgba(16,185,129,0.1)] text-[#10B981] border-l-2 border-[#10B981]' : 'text-[#6B6B8A] hover:bg-[#F0F0F5] hover:text-[#1A1A2E] border-l-2 border-transparent'
                }`}
                onClick={() => navigate(item.id as Screen)}
              >
                <span className="text-base">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
        <div className="px-3 pb-5">
          <div className="border-t border-[rgba(0,0,0,0.08)] pt-3">
            <button className="w-full text-left px-4 py-2.5 text-sm text-[#9494B0] hover:text-[#6B6B8A] transition-colors" onClick={() => navigate('role-select')}>Sign out</button>
          </div>
        </div>
      </div>
    );
  };

  const TopBar = ({ breadcrumb }: { breadcrumb: string }) => (
    <div className="h-14 bg-[#FFFFFF] border-b border-[rgba(0,0,0,0.08)] flex items-center justify-between px-6">
      <Logo />
      <span className="text-[12px] text-[#9494B0] tracking-wide">{breadcrumb}</span>
    </div>
  );

  const Logo = () => (
    <span className="font-serif-dm text-lg text-[#1A1A2E]">Paradigm<em className="italic">Shift</em></span>
  );

  const PortalLayout = ({ breadcrumb, children }: { breadcrumb: string; children: React.ReactNode }) => (
    <div className="flex min-h-screen bg-[#F8F8FC]">
      {portal === 'inv' ? <InvSidebar /> : <MusSidebar />}
      <div className="flex-1 flex flex-col">
        <TopBar breadcrumb={breadcrumb} />
        <main className="flex-1 p-8 overflow-auto">
          <ScreenWrap key={screen}>{children}</ScreenWrap>
        </main>
      </div>
    </div>
  );

  // ─── Screens ─────────────────────────────

  const RoleSelect = () => (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F8FC] relative"
      style={{ background: 'radial-gradient(ellipse at 50% 40%, rgba(124,92,252,0.04) 0%, transparent 65%), #F8F8FC' }}>
      <div className="text-center max-w-[640px] mx-auto px-4">
        <div className="mb-12"><Logo /></div>
        <h1 className="font-serif-dm text-[42px] italic text-[#1A1A2E] mb-4" style={{ lineHeight: 1.1 }}>Where art history meets ownership</h1>
        <p className="text-sm text-[#6B6B8A] mb-12">A blockchain platform for cultural institutions and fractional investors</p>
        <div className="grid grid-cols-2 gap-5 max-w-[560px] mx-auto">
          <div className="bg-[#FFFFFF] border border-[rgba(0,0,0,0.08)] rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:border-[rgba(124,92,252,0.2)] hover:shadow-[0_0_40px_rgba(124,92,252,0.12)] hover:-translate-y-1 text-left"
            onClick={() => { setPortal('inv'); navigate('inv-login'); }}>
            <div className="mb-4">{getArtworkSVG('rothko', 60)}</div>
            <h3 className="font-serif-dm text-xl text-[#1A1A2E] mb-2">Fractional Investor</h3>
            <p className="text-[13px] text-[#6B6B8A] mb-5 leading-relaxed">Own fractions of masterpieces. Participate in governance. Build a cultural portfolio.</p>
            <span className="text-[#7C5CFC] text-sm font-semibold">Enter portal →</span>
          </div>
          <div className="bg-[#FFFFFF] border border-[rgba(0,0,0,0.08)] rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:border-[rgba(16,185,129,0.2)] hover:shadow-[0_0_40px_rgba(16,185,129,0.1)] hover:-translate-y-1 text-left"
            onClick={() => { setPortal('mus'); navigate('mus-login'); }}>
            <div className="mb-4">{getArtworkSVG('kandinsky', 60)}</div>
            <h3 className="font-serif-dm text-xl text-[#1A1A2E] mb-2">Museum Director</h3>
            <p className="text-[13px] text-[#6B6B8A] mb-5 leading-relaxed">Tokenize deaccessioned works. Maintain curatorial control. Fund your mission.</p>
            <span className="text-[#10B981] text-sm font-semibold">Enter portal →</span>
          </div>
        </div>
        <p className="text-[11px] uppercase tracking-[0.08em] text-[#9494B0] mt-16">Non-functional prototype · ParadigmShift v0.4</p>
      </div>
    </div>
  );

  const LoginScreen = ({ isMuseum }: { isMuseum: boolean }) => {
    const ac = isMuseum ? '#10B981' : '#7C5CFC';
    const acGlow = isMuseum ? 'rgba(16,185,129,0.08)' : 'rgba(124,92,252,0.08)';
    return (
      <div className="min-h-screen flex bg-[#F8F8FC]">
        <div className="w-[40%] flex items-center justify-center p-12">
          <div className="w-full max-w-[340px]">
            <div className="mb-8"><Logo /></div>
            <p className="text-sm text-[#6B6B8A] mb-1">{isMuseum ? 'Museum Portal' : 'Investor Portal'}</p>
            <h2 className="font-serif-dm text-2xl text-[#1A1A2E] mb-8">Sign in</h2>
            <div className="space-y-4">
              <div>
                <label className="text-[11px] uppercase tracking-[0.08em] font-semibold text-[#9494B0] block mb-2">Email</label>
                <input className="w-full bg-[#F0F0F5] border border-[rgba(0,0,0,0.08)] rounded-lg px-3.5 py-2.5 text-sm text-[#1A1A2E] focus:outline-none focus:border-[var(--ring-color)]"
                  style={{ '--ring-color': ac } as any}
                  defaultValue={isMuseum ? 'director@moma.org' : 'alex.chen@email.com'} />
              </div>
              <div>
                <label className="text-[11px] uppercase tracking-[0.08em] font-semibold text-[#9494B0] block mb-2">Password</label>
                <input type="password" className="w-full bg-[#F0F0F5] border border-[rgba(0,0,0,0.08)] rounded-lg px-3.5 py-2.5 text-sm text-[#1A1A2E] focus:outline-none"
                  defaultValue="••••••••" />
              </div>
              <button className="w-full py-2.5 rounded-[10px] font-semibold text-sm text-[#F8F8FC] transition-all hover:opacity-90 mt-2"
                style={{ background: ac }}
                onClick={() => navigate(isMuseum ? 'mus-dash' : 'inv-dash')}>
                Sign in
              </button>
            </div>
            <button className="text-sm text-[#9494B0] hover:text-[#6B6B8A] mt-6 transition-colors" onClick={() => navigate('role-select')}>← Back to role selection</button>
          </div>
        </div>
        <div className="w-[60%] flex items-center justify-center p-16 relative" style={{ background: `radial-gradient(ellipse at 30% 50%, ${acGlow}, transparent 70%), #F5F5FA` }}>
          <div className="max-w-[420px]">
            <h2 className="font-serif-dm text-[28px] italic text-[#1A1A2E] mb-8 leading-tight">
              {isMuseum ? "Institutional stewardship reimagined for the digital age" : "Bridging institutional stewardship with fractional ownership"}
            </h2>
            <div className="space-y-4">
              {(isMuseum
                ? ['Tokenize deaccessioned works with full curatorial control', 'Engage a global community of stakeholders', 'Cultural Infusion: measure & grow impact']
                : ['Own fractions of museum-quality masterpieces', 'Participate in advisory governance', 'Trade PSG tokens on the secondary market']
              ).map((t, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: ac }} />
                  <p className="text-sm text-[#6B6B8A]">{t}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ─── Investor Dashboard ──────────────────

  const InvDash = () => (
    <PortalLayout breadcrumb="Investor · Dashboard">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif-dm text-[26px] text-[#1A1A2E]">Good morning, Alex</h1>
          <p className="text-[12px] text-[#9494B0] mt-1">Last updated · Today 9:14 AM</p>
        </div>
        <div className="flex gap-3">
          <Btn variant="secondary" onClick={() => navigate('marketplace')}>Browse marketplace</Btn>
          <Btn onClick={() => navigate('inv-gov')}>{proposals.filter(p => !p.voted).length} pending votes</Btn>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        <MetricTile label="Portfolio Value" value="$24,850" sub={<Tag variant="success">+8.4% YTD</Tag>} />
        <MetricTile label="Holdings" value="7" sub="across 4 museums" />
        <MetricTile label="PSG Tokens" value="1,240" sub={<button className="text-[#7C5CFC] text-xs hover:underline" onClick={() => navigate('token-market')}>View token market →</button>} />
        <MetricTile label="Active Votes" value="3" sub={<span className="text-[#D97706] text-xs">1 closes in 2 days</span>} />
      </div>

      <div className="grid grid-cols-[2fr_1fr] gap-5 mb-8">
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif-dm text-lg text-[#1A1A2E]">Portfolio Performance</h3>
            <div className="flex bg-[#F0F0F5] rounded-lg p-0.5">
              {['6M', '1Y'].map(p => (
                <button key={p} className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${chartPeriod === p ? 'bg-[rgba(124,92,252,0.1)] text-[#7C5CFC]' : 'text-[#9494B0]'}`}
                  onClick={() => setChartPeriod(p)}>{p}</button>
              ))}
            </div>
          </div>
          <MiniChart data={PORT_CHART} color="#7C5CFC" height={120} />
          <div className="flex justify-between mt-2 px-1">
            {['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map(m => (
              <span key={m} className="text-[10px] text-[#9494B0]">{m}</span>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="font-serif-dm text-lg text-[#1A1A2E] mb-4">Upcoming Votes</h3>
          <div className="space-y-3">
            {proposals.filter(p => !p.voted).slice(0, 2).map(p => (
              <div key={p.id} className="bg-[#F0F0F5] rounded-xl p-4 border border-[rgba(0,0,0,0.04)]">
                <div className="text-sm text-[#1A1A2E] font-medium mb-1">{p.title}</div>
                <div className="text-xs text-[#9494B0] mb-2">{p.art} · {p.daysLeft}d left</div>
                <Tag variant={p.daysLeft <= 3 ? 'warning' : 'inv'}>Pending</Tag>
              </div>
            ))}
          </div>
          <button className="text-sm text-[#6B6B8A] hover:text-[#7C5CFC] mt-4 transition-colors" onClick={() => navigate('inv-gov')}>All proposals →</button>
        </Card>
      </div>

      <Card hover={false}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif-dm text-lg text-[#1A1A2E]">Recent Holdings</h3>
          <button className="text-sm text-[#6B6B8A] hover:text-[#7C5CFC] transition-colors" onClick={() => navigate('inv-holdings')}>View all →</button>
        </div>
        <table className="w-full">
          <thead>
            <tr className="text-[11px] uppercase tracking-[0.08em] text-[#9494B0] border-b border-[rgba(0,0,0,0.08)]">
              <th className="text-left pb-3 font-semibold">Artwork</th>
              <th className="text-left pb-3 font-semibold">Museum</th>
              <th className="text-right pb-3 font-semibold">Shares</th>
              <th className="text-right pb-3 font-semibold">Avg Cost</th>
              <th className="text-right pb-3 font-semibold">Current</th>
              <th className="text-right pb-3 font-semibold">P&L</th>
              <th className="text-right pb-3 font-semibold"></th>
            </tr>
          </thead>
          <tbody>
            {ARTWORKS.slice(0, 3).map(a => (
              <tr key={a.id} className="border-b border-[rgba(0,0,0,0.04)] hover:bg-[#F0F0F5] transition-colors cursor-pointer"
                onClick={() => { setSelectedArt(a); setArtTab('overview'); navigate('artwork-detail'); }}>
                <td className="py-3 flex items-center gap-3">
                  {getArtworkSVG(a.title, 36)}
                  <span className="text-sm text-[#1A1A2E]">{a.title.split('(')[0].trim()}</span>
                </td>
                <td className="text-sm text-[#6B6B8A]">{a.museum}</td>
                <td className="text-right font-mono-dm text-sm text-[#1A1A2E]">{a.shares}</td>
                <td className="text-right font-mono-dm text-sm text-[#6B6B8A]">${a.avgCost}</td>
                <td className="text-right font-mono-dm text-sm text-[#1A1A2E]">${a.price}</td>
                <td className={`text-right font-mono-dm text-sm ${a.pnl >= 0 ? 'text-[#059669]' : 'text-[#DC2626]'}`}>
                  {a.pnl >= 0 ? '+' : ''}{a.pnl}%
                </td>
                <td className="text-right">
                  <Btn variant="ghost" className="text-xs">View</Btn>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </PortalLayout>
  );

  // ─── My Holdings ─────────────────────────

  const InvHoldings = () => {
    const filtered = ARTWORKS.filter(a =>
      a.title.toLowerCase().includes(holdingsSearch.toLowerCase()) ||
      a.artist.toLowerCase().includes(holdingsSearch.toLowerCase())
    );
    return (
      <PortalLayout breadcrumb="Investor · My Holdings">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-serif-dm text-[26px] text-[#1A1A2E]">My Holdings</h1>
          <input className="bg-[#F0F0F5] border border-[rgba(0,0,0,0.08)] rounded-lg px-3.5 py-2 text-sm text-[#1A1A2E] w-64 focus:outline-none focus:border-[#7C5CFC]"
            placeholder="Search holdings..." value={holdingsSearch} onChange={e => setHoldingsSearch(e.target.value)} />
        </div>
        <Card hover={false}>
          <table className="w-full">
            <thead>
              <tr className="text-[11px] uppercase tracking-[0.08em] text-[#9494B0] border-b border-[rgba(0,0,0,0.08)]">
                {['Artwork', 'Museum', 'Shares', 'Avg Cost', 'Current', 'P&L', 'PSG', 'Actions'].map(h => (
                  <th key={h} className={`pb-3 font-semibold ${h === 'Artwork' || h === 'Museum' ? 'text-left' : 'text-right'}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(a => (
                <tr key={a.id} className="border-b border-[rgba(0,0,0,0.04)] hover:bg-[#F0F0F5] transition-colors">
                  <td className="py-3 flex items-center gap-3">
                    {getArtworkSVG(a.title, 36)}
                    <div>
                      <div className="text-sm text-[#1A1A2E]">{a.title.split('(')[0].trim()}</div>
                      <div className="text-[11px] text-[#9494B0]">{a.artist}</div>
                    </div>
                  </td>
                  <td className="text-sm text-[#6B6B8A]">{a.museum}</td>
                  <td className="text-right font-mono-dm text-sm text-[#1A1A2E]">{a.shares}</td>
                  <td className="text-right font-mono-dm text-sm text-[#6B6B8A]">${a.avgCost}</td>
                  <td className="text-right font-mono-dm text-sm text-[#1A1A2E]">${a.price}</td>
                  <td className={`text-right font-mono-dm text-sm ${a.pnl >= 0 ? 'text-[#059669]' : 'text-[#DC2626]'}`}>
                    {a.pnl >= 0 ? '+' : ''}{a.pnl}%
                  </td>
                  <td className="text-right font-mono-dm text-sm text-[#7C5CFC]">{a.tokens}</td>
                  <td className="text-right">
                    <div className="flex gap-2 justify-end">
                      <Btn variant="ghost" className="text-xs" onClick={() => { setSelectedArt(a); setArtTab('overview'); navigate('artwork-detail'); }}>View</Btn>
                      <Btn variant="danger" className="text-xs" onClick={() => openTradeModal(a, 'sell')}>Sell</Btn>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </PortalLayout>
    );
  };

  // ─── Artwork Detail ──────────────────────

  const ArtworkDetail = () => {
    const a = selectedArt;
    const tabs = ['overview', 'financials', 'governance', 'benefits'];
    const filteredProposals = proposals.filter(p => p.art === a.title || p.art.includes(a.title.split(' ')[0]));

    return (
      <PortalLayout breadcrumb={`Investor · Holdings · ${a.title.split('(')[0].trim()}`}>
        <button className="text-sm text-[#7C5CFC] hover:underline mb-6 block" onClick={() => navigate('inv-holdings')}>← My Holdings</button>

        <div className="flex items-start gap-6 mb-6">
          <div className="rounded-2xl overflow-hidden" style={{ boxShadow: '0 0 30px rgba(124,92,252,0.08)' }}>
            {getArtworkSVG(a.title, 80)}
          </div>
          <div className="flex-1">
            <h1 className="font-serif-dm text-[28px] text-[#1A1A2E]">{a.title}</h1>
            <p className="text-sm text-[#6B6B8A] mt-1">{a.artist} · {a.museum} · {a.year}</p>
            <div className="flex gap-2 mt-3">
              <Tag variant="inv">Fractional</Tag>
              <Tag variant="success">Verified</Tag>
            </div>
          </div>
          <div className="flex gap-3">
            <Btn variant="secondary" onClick={() => openTradeModal(a, 'sell')}>Sell shares</Btn>
            <Btn onClick={() => openTradeModal(a, 'buy')}>Buy more</Btn>
          </div>
        </div>

        <div className="flex gap-1 border-b border-[rgba(0,0,0,0.08)] mb-6">
          {tabs.map(t => (
            <button key={t} className={`px-4 py-3 text-sm font-medium capitalize transition-all border-b-2 ${
              artTab === t ? 'text-[#7C5CFC] border-[#7C5CFC]' : 'text-[#9494B0] border-transparent hover:text-[#6B6B8A]'
            }`} onClick={() => setArtTab(t)}>{t === 'benefits' ? 'Museum Benefits' : t}</button>
          ))}
        </div>

        {artTab === 'overview' && (
          <div className="grid grid-cols-[2fr_1fr] gap-6">
            <div className="space-y-6">
              <Card>
                <h3 className="font-serif-dm text-lg text-[#1A1A2E] mb-3">About</h3>
                <p className="text-sm text-[#6B6B8A] leading-relaxed">A seminal work from the artist's mature period, this piece exemplifies the emotional depth and chromatic intensity that defined the abstract expressionist movement. Currently on permanent display.</p>
              </Card>
              <div className="grid grid-cols-2 gap-4">
                <MetricTile label="Annual Visitors" value="3.2M" />
                <MetricTile label="Digital Views" value="24M/yr" />
                <MetricTile label="Appraised Value" value="~$100M" />
                <MetricTile label="Provenance" value="Verified" />
              </div>
            </div>
            <Card className="relative" style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(124,92,252,0.06), #FFFFFF 70%)' }}>
              <div className="text-[11px] uppercase tracking-[0.08em] font-semibold text-[#9494B0] mb-3">Your Position</div>
              <div className="font-serif-dm text-[36px] text-[#1A1A2E]">${(a.shares * a.price).toLocaleString()}</div>
              <p className="text-[12px] text-[#6B6B8A] mt-1">{a.shares} shares · ${a.price}/share</p>
              <div className="mt-3"><Tag variant={a.pnl >= 0 ? 'success' : 'danger'}>{a.pnl >= 0 ? '+' : ''}{a.pnl}%</Tag></div>
              {a.tokens > 0 && (
                <div className="mt-4 pt-4 border-t border-[rgba(0,0,0,0.08)]">
                  <Tag variant="inv">{a.tokens} PSG · advisory voting</Tag>
                </div>
              )}
              <div className="flex gap-2 mt-5">
                <Btn className="flex-1" onClick={() => openTradeModal(a, 'buy')}>Buy more</Btn>
                <Btn variant="secondary" className="flex-1" onClick={() => openTradeModal(a, 'sell')}>Sell shares</Btn>
              </div>
              <button className="text-xs text-[#7C5CFC] hover:underline mt-3 block" onClick={() => navigate('token-market')}>View token market →</button>
            </Card>
          </div>
        )}

        {artTab === 'financials' && (
          <div className="space-y-6">
            <Card>
              <h3 className="font-serif-dm text-lg text-[#1A1A2E] mb-4">Price History</h3>
              <MiniChart data={PORT_CHART} color="#7C5CFC" height={100} />
            </Card>
            <Card>
              <h3 className="font-serif-dm text-lg text-[#1A1A2E] mb-4">Offering Details</h3>
              <div className="grid grid-cols-3 gap-4">
                {[
                  ['Total Shares', '10,000'], ['Float', '3,200'], ['Share Price', `$${a.price}`],
                  ['Market Cap', `$${((a.price * 10000) / 1000000).toFixed(1)}M`], ['Min Purchase', '1 share'], ['Settlement', 'T+2']
                ].map(([l, v]) => (
                  <div key={l}>
                    <div className="text-[11px] uppercase tracking-[0.08em] text-[#9494B0] mb-1">{l}</div>
                    <div className="font-mono-dm text-sm text-[#1A1A2E]">{v}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {artTab === 'governance' && (
          <div className="space-y-4">
            <div className="bg-[rgba(124,92,252,0.08)] border border-[rgba(124,92,252,0.12)] rounded-xl p-4 text-sm text-[#7C5CFC]">
              Advisory votes only — museum retains curatorial authority
            </div>
            {filteredProposals.length === 0 && <p className="text-sm text-[#9494B0]">No active proposals for this artwork.</p>}
            {filteredProposals.map(p => (
              <ProposalCard key={p.id} proposal={p} />
            ))}
          </div>
        )}

        {artTab === 'benefits' && (
          <div className="grid grid-cols-2 gap-4">
            {['Private exhibition preview', 'Annual curator talk', 'Digital certificate', 'Priority resale rights', 'Museum newsletter', 'VIP openings'].map((b, i) => (
              <Card key={b}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-lg mb-1">{'🎨🎤📜⚡📧✨'[i]}</div>
                    <div className="text-sm text-[#1A1A2E] font-medium">{b}</div>
                  </div>
                  <Tag variant={i < 4 ? 'success' : 'muted'}>{i < 4 ? 'Active' : 'Pending'}</Tag>
                </div>
              </Card>
            ))}
          </div>
        )}
      </PortalLayout>
    );
  };

  // ─── Marketplace (Primary) ──────────────────────────

  const Marketplace = () => {
    const filtered = MARKET_ITEMS.filter(m => {
      if (mktFilter === 'All') return true;
      if (mktFilter === 'New') return m.tag === 'New';
      if (mktFilter === 'Hot') return m.tag === 'Hot' || m.tag === 'Almost full';
      return true;
    });
    return (
      <PortalLayout breadcrumb="Investor · Marketplace">
        <div className="mb-6">
          <h1 className="font-serif-dm text-[26px] text-[#1A1A2E]">Marketplace</h1>
          <p className="text-sm text-[#6B6B8A] mt-1">Discover fractional offerings from partner museums</p>
        </div>

        <div className="bg-[#F0F0F5] border border-[rgba(0,0,0,0.08)] rounded-2xl p-8 mb-8 relative overflow-hidden"
          style={{ background: 'radial-gradient(ellipse at 80% 20%, rgba(124,92,252,0.06), #F0F0F5 60%)' }}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[11px] uppercase tracking-[0.08em] text-[#9494B0] mb-2">Featured Offering</div>
              <h2 className="font-serif-dm text-[22px] italic text-[#1A1A2E] mb-2">Banksy — Mona Lisa (2000)</h2>
              <p className="text-sm text-[#6B6B8A] mb-4">Christie's acquisition · 4.3× appreciation over 11 years</p>
              <div className="flex gap-2">
                <Tag variant="success">12.37% IRR</Tag>
                <Tag variant="inv">72% funded</Tag>
              </div>
            </div>
            <Btn onClick={() => { setSelectedMarket(MARKET_ITEMS[0]); navigate('mkt-detail'); }}>View offering →</Btn>
          </div>
        </div>

        <div className="flex gap-2 mb-6">
          {['All', 'New', 'Hot'].map(f => (
            <button key={f} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              mktFilter === f ? 'bg-[rgba(124,92,252,0.1)] text-[#7C5CFC]' : 'bg-[#F0F0F5] text-[#9494B0] hover:text-[#6B6B8A]'
            }`} onClick={() => setMktFilter(f)}>{f}</button>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-5">
          {filtered.map(m => (
            <div key={m.id} className="bg-[#FFFFFF] border border-[rgba(0,0,0,0.08)] rounded-2xl overflow-hidden transition-all duration-300 hover:border-[rgba(124,92,252,0.2)] hover:-translate-y-1 cursor-pointer"
              style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 4px 24px rgba(0,0,0,0.06)' }}
              onClick={() => { setSelectedMarket(m); navigate('mkt-detail'); }}>
              <div className="h-[90px] flex items-center justify-center bg-[#FFFFFF]">
                {getMarketArtSVG(m.artist, 60)}
              </div>
              <div className="p-5">
                <div className="text-[11px] uppercase tracking-[0.08em] text-[#9494B0] mb-1">{m.artist}</div>
                <div className="font-serif-dm text-base text-[#1A1A2E] mb-1">{m.title}</div>
                <div className="text-[12px] text-[#9494B0] mb-3">{m.museum}</div>
                <div className="w-full h-1.5 rounded-full bg-[rgba(0,0,0,0.06)] mb-3">
                  <div className="h-full bg-[#059669] rounded-full transition-all" style={{ width: `${m.funded}%` }} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-mono-dm text-sm text-[#1A1A2E]">${m.price}/share</span>
                  <div className="flex gap-2">
                    <Tag variant="success">{m.irr} IRR</Tag>
                    {m.tag && <Tag variant={m.tag === 'New' ? 'inv' : m.tag === 'Hot' ? 'warning' : 'muted'}>{m.tag}</Tag>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </PortalLayout>
    );
  };

  // ─── Secondary Market (Masterworks-style) ──────────────

  const SecondaryMarket = () => {
    const SecondaryMiniChart = ({ data, color = '#10B981' }: { data: number[]; color?: string }) => {
      const min = Math.min(...data);
      const max = Math.max(...data);
      const range = max - min || 1;
      const w = 180;
      const h = 50;
      const points = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`).join(' ');
      return (
        <svg width={w} height={h} className="mt-2">
          <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" />
        </svg>
      );
    };

    return (
      <PortalLayout breadcrumb="Investor · Secondary Market">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <h1 className="font-serif-dm text-[26px] text-[#1A1A2E]">Trending</h1>
            <span className="text-[#9494B0] text-sm cursor-help">ⓘ</span>
            <button className="text-[#7C5CFC] text-sm hover:underline" onClick={() => setShowTrending(!showTrending)}>
              ({showTrending ? 'Hide' : 'Show'})
            </button>
          </div>
          <Btn variant="secondary" className="flex items-center gap-2">
            <span className="text-sm">⚙</span> SETTINGS
          </Btn>
        </div>

        <div className="bg-[rgba(124,92,252,0.06)] border border-[rgba(124,92,252,0.1)] rounded-xl p-4 text-sm text-[#7C5CFC] mb-6">
          SEC-compliant secondary market · Museum-first trading rules · Transfer restriction enforcement · Price stability mechanisms active
        </div>

        {showTrending && (
          <div className="grid grid-cols-3 gap-4">
            {SECONDARY_MARKET_ITEMS.map(item => (
              <div key={item.id}
                className="bg-[#1E1E2A] rounded-xl p-5 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.06)]">
                <div className="flex items-start justify-between mb-1">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[rgba(255,255,255,0.08)] flex items-center justify-center overflow-hidden">
                      {getArtworkSVG(item.artist, 32)}
                    </div>
                    <div>
                      <div className="text-[#F0EDE8] text-sm font-semibold">{item.artist}</div>
                      <div className="text-[#8888A0] text-[11px]">{item.title} <span className="text-[#6B6B8A]">({item.series})</span></div>
                    </div>
                  </div>
                  <div className="font-mono-dm text-[#F0EDE8] text-lg font-bold">${item.price.toFixed(2)}</div>
                </div>

                <div className="flex items-end justify-between mt-2">
                  <SecondaryMiniChart data={item.chartData} color={item.change >= 0 ? '#10B981' : '#10B981'} />
                  <div className="text-right space-y-0.5">
                    {item.levels.map((lvl, i) => (
                      <div key={i} className="font-mono-dm text-[11px] text-[#8888A0]">${lvl.toFixed(2)}</div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Trading rules info */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          <Card>
            <div className="text-[11px] uppercase tracking-[0.08em] text-[#9494B0] mb-3 font-semibold">Trading Rules</div>
            <div className="space-y-2">
              {['Museum-first price stability', 'Transfer restriction checks', 'KYC/AML verification required', 'Cross-platform liquidity'].map(r => (
                <div key={r} className="flex items-center gap-2 text-sm">
                  <span className="text-[#059669] text-xs">✓</span>
                  <span className="text-[#6B6B8A]">{r}</span>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <div className="text-[11px] uppercase tracking-[0.08em] text-[#9494B0] mb-3 font-semibold">Market Stats</div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm"><span className="text-[#6B6B8A]">24h Volume</span><span className="font-mono-dm text-[#1A1A2E]">$2.4M</span></div>
              <div className="flex justify-between text-sm"><span className="text-[#6B6B8A]">Active Listings</span><span className="font-mono-dm text-[#1A1A2E]">1,247</span></div>
              <div className="flex justify-between text-sm"><span className="text-[#6B6B8A]">Avg Spread</span><span className="font-mono-dm text-[#1A1A2E]">0.8%</span></div>
              <div className="flex justify-between text-sm"><span className="text-[#6B6B8A]">Settlement</span><span className="font-mono-dm text-[#1A1A2E]">T+1</span></div>
            </div>
          </Card>
          <Card>
            <div className="text-[11px] uppercase tracking-[0.08em] text-[#9494B0] mb-3 font-semibold">Impact Metrics</div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm"><span className="text-[#6B6B8A]">Cultural Impact</span><span className="font-mono-dm text-[#10B981]">94/100</span></div>
              <div className="flex justify-between text-sm"><span className="text-[#6B6B8A]">Public Access</span><span className="font-mono-dm text-[#059669]">Guaranteed</span></div>
              <div className="flex justify-between text-sm"><span className="text-[#6B6B8A]">Museum Benefit</span><span className="font-mono-dm text-[#1A1A2E]">$1.2M YTD</span></div>
              <div className="flex justify-between text-sm"><span className="text-[#6B6B8A]">Donor-Investor</span><span className="font-mono-dm text-[#1A1A2E]">324 hybrid</span></div>
            </div>
          </Card>
        </div>
      </PortalLayout>
    );
  };

  // ─── Investor Analytics ──────────────────

  const InvAnalytics = () => (
    <PortalLayout breadcrumb="Investor · Analytics">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif-dm text-[26px] text-[#1A1A2E]">Analytics</h1>
          <p className="text-sm text-[#6B6B8A] mt-1">Data architecture · Provenance · Cultural value metrics</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        <MetricTile label="Provenance Records" value="93" sub="100% on-chain verified" />
        <MetricTile label="Cultural Impact" value="94/100" sub={<Tag variant="success">+8 pts YTD</Tag>} />
        <MetricTile label="Market Performance" value="+12.4%" sub="portfolio IRR" />
        <MetricTile label="Governance Score" value="87/100" sub="participation rate" />
      </div>

      <div className="grid grid-cols-[2fr_1fr] gap-6 mb-8">
        {/* Provenance Database */}
        <Card hover={false}>
          <h3 className="font-serif-dm text-lg text-[#1A1A2E] mb-4">Immutable Provenance Database</h3>
          <div className="bg-[rgba(124,92,252,0.06)] border border-[rgba(124,92,252,0.08)] rounded-lg p-3 text-xs text-[#7C5CFC] mb-4">
            On-chain/off-chain hybrid storage · Tamper-proof · Privacy-preserving architecture
          </div>
          <table className="w-full">
            <thead>
              <tr className="text-[11px] uppercase tracking-[0.08em] text-[#9494B0] border-b border-[rgba(0,0,0,0.08)]">
                {['Artwork', 'Events', 'Last Verified', 'Chain', 'Integrity'].map(h => (
                  <th key={h} className={`pb-3 font-semibold ${h === 'Artwork' ? 'text-left' : 'text-right'}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PROVENANCE_RECORDS.map(r => (
                <tr key={r.artwork} className="border-b border-[rgba(0,0,0,0.04)] hover:bg-[#F0F0F5] transition-colors">
                  <td className="py-3 text-sm text-[#1A1A2E]">{r.artwork}</td>
                  <td className="text-right font-mono-dm text-sm text-[#6B6B8A]">{r.events}</td>
                  <td className="text-right text-sm text-[#6B6B8A]">{r.lastVerified}</td>
                  <td className="text-right"><Tag variant="inv">{r.chain}</Tag></td>
                  <td className="text-right"><Tag variant="success">{r.integrity}</Tag></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        {/* Cultural Value Metrics */}
        <div className="space-y-4">
          <Card>
            <div className="text-[11px] uppercase tracking-[0.08em] text-[#9494B0] mb-4 font-semibold">Cultural Value Metrics</div>
            <div className="space-y-3">
              {CULTURAL_METRICS.map(m => (
                <div key={m.metric} className="bg-[#F0F0F5] rounded-lg p-3 border border-[rgba(0,0,0,0.04)]">
                  <div className="text-[10px] text-[#9494B0]">{m.metric}</div>
                  <div className="flex items-center justify-between">
                    <div className="font-serif-dm text-xl text-[#1A1A2E]">{m.value}</div>
                    <Tag variant="success">+{m.trend}</Tag>
                  </div>
                  <div className="text-[10px] text-[#9494B0]">{m.period}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Market Performance + Governance Analytics */}
      <div className="grid grid-cols-2 gap-6">
        <Card>
          <h3 className="font-serif-dm text-lg text-[#1A1A2E] mb-4">Market Performance</h3>
          <MiniChart data={PORT_CHART} color="#7C5CFC" height={100} />
          <div className="grid grid-cols-3 gap-4 mt-4">
            {[['Total Return', '+24.1%'], ['Sharpe Ratio', '1.42'], ['Max Drawdown', '-3.7%']].map(([l, v]) => (
              <div key={l}>
                <div className="text-[10px] text-[#9494B0]">{l}</div>
                <div className="font-mono-dm text-sm text-[#1A1A2E]">{v}</div>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h3 className="font-serif-dm text-lg text-[#1A1A2E] mb-4">Governance Analytics</h3>
          <div className="space-y-3">
            {[
              { label: 'Proposals Voted', value: '18/24', pct: 75 },
              { label: 'Alignment with Outcome', value: '89%', pct: 89 },
              { label: 'Avg Response Time', value: '2.3 days', pct: 60 },
              { label: 'PSG Utilization', value: '78%', pct: 78 },
            ].map(g => (
              <div key={g.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-[#6B6B8A]">{g.label}</span>
                  <span className="font-mono-dm text-[#1A1A2E]">{g.value}</span>
                </div>
                <div className="w-full h-1.5 rounded bg-[rgba(0,0,0,0.06)]">
                  <div className="h-full bg-[#7C5CFC] rounded transition-all" style={{ width: `${g.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </PortalLayout>
  );

  // ─── Marketplace Detail ──────────────────

  const MktDetail = () => {
    const m = selectedMarket;
    return (
      <PortalLayout breadcrumb={`Investor · Marketplace · ${m.title}`}>
        <button className="text-sm text-[#7C5CFC] hover:underline mb-6 block" onClick={() => navigate('marketplace')}>← Marketplace</button>
        <div className="grid grid-cols-[2fr_1fr] gap-6">
          <div className="space-y-6">
            <div className="flex items-start gap-6">
              {getMarketArtSVG(m.artist, 120)}
              <div>
                <h1 className="font-serif-dm text-[28px] text-[#1A1A2E]">{m.title}</h1>
                <p className="text-sm text-[#6B6B8A] mt-1">{m.artist} · {m.museum}</p>
                <div className="flex gap-2 mt-3">
                  {m.tag && <Tag variant="inv">{m.tag}</Tag>}
                  <Tag variant="success">{m.irr} IRR</Tag>
                </div>
              </div>
            </div>

            {m.artist === 'Banksy' && (
              <>
                <h3 className="font-serif-dm text-lg text-[#1A1A2E]">Historical Performance</h3>
                <div className="grid grid-cols-3 gap-3">
                  {BANKSY_PAIRS.map((p, i) => (
                    <div key={i} className="bg-[#F0F0F5] border border-[rgba(0,0,0,0.08)] rounded-xl p-4">
                      <div className="font-serif-dm text-[24px] text-[#1A1A2E]">{p.ret}</div>
                      <div className="text-[#059669] text-sm font-mono-dm">{p.irr}</div>
                      <div className="w-full h-1 rounded bg-[rgba(5,150,105,0.12)] mt-2">
                        <div className="h-full bg-[#059669] rounded" style={{ width: `${parseFloat(p.irr)}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-[rgba(124,92,252,0.06)] border border-[rgba(124,92,252,0.08)] rounded-xl p-4 text-sm text-[#6B6B8A]">
                  12.37% avg annual appreciation · Christie's Jun 2019 · £731,250 acquired · 4.3× over 11 years
                </div>
              </>
            )}

            <Card>
              <h3 className="font-serif-dm text-lg text-[#1A1A2E] mb-4">Offering Details</h3>
              <div className="grid grid-cols-3 gap-4">
                {[['Total Shares', '10,000'], ['Float', '3,200'], ['Share Price', `$${m.price}`],
                  ['Funded', `${m.funded}%`], ['Min Purchase', '1 share'], ['Settlement', 'T+2']].map(([l, v]) => (
                  <div key={l}>
                    <div className="text-[11px] uppercase tracking-[0.08em] text-[#9494B0] mb-1">{l}</div>
                    <div className="font-mono-dm text-sm text-[#1A1A2E]">{v}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="sticky top-8">
            <Card>
              <h3 className="font-serif-dm text-[22px] text-[#1A1A2E] mb-1">Buy shares</h3>
              <p className="text-[12px] text-[#9494B0] mb-5">{m.title} · ${m.price}/share</p>

              <div className="flex items-center gap-4 mb-5">
                <button className="w-8 h-8 rounded-lg bg-[#F0F0F5] text-[#1A1A2E] border border-[rgba(0,0,0,0.08)] flex items-center justify-center hover:bg-[#E5E5EC] transition-colors"
                  onClick={() => setTradeQty(Math.max(1, tradeQty - 1))}>−</button>
                <span className="font-mono-dm text-2xl font-bold text-[#1A1A2E] w-12 text-center">{tradeQty}</span>
                <button className="w-8 h-8 rounded-lg bg-[#F0F0F5] text-[#1A1A2E] border border-[rgba(0,0,0,0.08)] flex items-center justify-center hover:bg-[#E5E5EC] transition-colors"
                  onClick={() => setTradeQty(tradeQty + 1)}>+</button>
              </div>

              <div className="border-t border-[rgba(0,0,0,0.08)] pt-4 space-y-2">
                <div className="flex justify-between text-sm"><span className="text-[#6B6B8A]">Subtotal</span><span className="font-mono-dm text-[#1A1A2E]">${(tradeQty * m.price).toLocaleString()}</span></div>
                <div className="flex justify-between text-sm"><span className="text-[#6B6B8A]">Fee (0.5%)</span><span className="font-mono-dm text-[#6B6B8A]">${(tradeQty * m.price * 0.005).toFixed(2)}</span></div>
                <div className="flex justify-between text-sm font-bold pt-2 border-t border-[rgba(0,0,0,0.08)]">
                  <span className="text-[#1A1A2E]">Total</span>
                  <span className="font-mono-dm text-[#1A1A2E] text-base">${(tradeQty * m.price * 1.005).toFixed(2)}</span>
                </div>
              </div>

              <div className="bg-[rgba(124,92,252,0.08)] rounded-lg p-3 mt-4 text-xs text-[#7C5CFC]">
                You will receive {tradeQty * 10} PSG governance tokens with this purchase.
              </div>
              <div className="flex items-center gap-2 mt-3"><span className="text-[#059669] text-xs">✓</span><span className="text-xs text-[#059669]">KYC verified</span></div>

              <Btn className="w-full mt-5" onClick={confirmOrder}>Confirm purchase →</Btn>
              <p className="text-[10px] text-[#9494B0] mt-3 text-center">For offering circular, visit sec.gov</p>

              {orderConfirmed && (
                <div className="bg-[rgba(5,150,105,0.1)] border border-[rgba(5,150,105,0.15)] rounded-lg p-3 mt-3 text-sm text-[#059669] screen-enter">
                  ✓ Order confirmed · Tokens allocated on settlement
                </div>
              )}
            </Card>
          </div>
        </div>
      </PortalLayout>
    );
  };

  // ─── Proposal Card (shared) ──────────────

  const ProposalCard = ({ proposal: p }: { proposal: typeof proposals[0] }) => {
    const handleVote = (vote: string) => {
      setProposals(prev => prev.map(pr => pr.id === p.id ? { ...pr, voted: vote } : pr));
    };
    return (
      <Card className={!p.voted ? 'border-[rgba(124,92,252,0.12)]' : ''}>
        <div className="flex items-start justify-between mb-2">
          <div>
            <h4 className="font-serif-dm text-base text-[#1A1A2E]">{p.title}</h4>
            <p className="text-[12px] text-[#9494B0] mt-0.5">{p.art} · Closes {p.closes} · {p.daysLeft} days left</p>
          </div>
          <Tag variant={p.voted ? 'success' : p.daysLeft <= 3 ? 'warning' : 'inv'}>{p.voted ? `Voted ${p.voted}` : 'Pending'}</Tag>
        </div>
        <p className="text-sm text-[#6B6B8A] mb-3">{p.desc}</p>
        <VoteBar forPct={p.forPct} againstPct={p.againstPct} abstainPct={p.abstainPct} />
        <div className="flex gap-4 mt-1 text-[11px] text-[#9494B0]">
          <span>{p.forPct}% For</span><span>{p.againstPct}% Against</span><span>{p.abstainPct}% Abstain</span>
        </div>
        {!p.voted ? (
          <div className="flex gap-2 mt-4">
            <Btn variant="success" className="text-xs" onClick={() => handleVote('For')}>Vote for</Btn>
            <Btn variant="danger" className="text-xs" onClick={() => handleVote('Against')}>Vote against</Btn>
            <Btn variant="ghost" className="text-xs" onClick={() => handleVote('Abstain')}>Abstain</Btn>
          </div>
        ) : (
          <div className="bg-[rgba(5,150,105,0.08)] border border-[rgba(5,150,105,0.12)] rounded-lg p-3 mt-4 text-sm text-[#059669] screen-enter">
            ✓ Vote ({p.voted}) recorded on-chain · {selectedArt?.tokens || 120} PSG applied
          </div>
        )}
      </Card>
    );
  };

  // ─── Governance ──────────────────────────

  const InvGov = () => (
    <PortalLayout breadcrumb="Investor · Governance">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif-dm text-[26px] text-[#1A1A2E]">Governance</h1>
          <p className="text-sm text-[#6B6B8A] mt-1">Advisory votes · weighted by PSG balance</p>
        </div>
        <div className="flex items-center gap-4">
          <Tag variant="inv">1,240 PSG</Tag>
          <button className="text-sm text-[#7C5CFC] hover:underline" onClick={() => navigate('token-market')}>Trade tokens →</button>
        </div>
      </div>

      <div className="bg-[rgba(124,92,252,0.06)] border border-[rgba(124,92,252,0.1)] rounded-xl p-4 text-sm text-[#7C5CFC] mb-6">
        Advisory votes only. Museums retain final curatorial authority. Votes are recorded on-chain.
      </div>

      <div className="grid grid-cols-[2fr_1fr] gap-6">
        <div className="space-y-4">
          {proposals.map(p => <ProposalCard key={p.id} proposal={p} />)}
        </div>
        <div className="space-y-4">
          <Card>
            <div className="text-[11px] uppercase tracking-[0.08em] text-[#9494B0] mb-4">Voting Power (PSG)</div>
            <div className="space-y-2">
              {ARTWORKS.filter(a => a.tokens > 0).map(a => (
                <div key={a.id} className="flex justify-between text-sm">
                  <span className="text-[#6B6B8A]">{a.title.split('(')[0].trim()}</span>
                  <span className="font-mono-dm text-[#7C5CFC]">{a.tokens}</span>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <div className="text-[11px] uppercase tracking-[0.08em] text-[#9494B0] mb-4">Past Votes</div>
            <div className="space-y-3">
              <div className="text-sm">
                <div className="text-[#1A1A2E]">Frame restoration — de Kooning</div>
                <div className="text-xs text-[#9494B0]">Voted For · Passed 82%</div>
              </div>
              <div className="text-sm">
                <div className="text-[#1A1A2E]">Exhibition tour — Van Gogh</div>
                <div className="text-xs text-[#9494B0]">Abstained · Passed 67%</div>
              </div>
            </div>
          </Card>
          <Btn variant="secondary" className="w-full" onClick={() => navigate('token-market')}>Manage tokens →</Btn>
        </div>
      </div>
    </PortalLayout>
  );

  // ─── Token Market ────────────────────────

  const TokenMarket = () => (
    <PortalLayout breadcrumb="Investor · Token Market">
      <h1 className="font-serif-dm text-[26px] text-[#1A1A2E] mb-1">PSG Token Market</h1>
      <p className="text-sm text-[#6B6B8A] mb-6">Trade artwork-specific governance tokens</p>

      <div className="bg-[rgba(124,92,252,0.06)] border border-[rgba(124,92,252,0.1)] rounded-xl p-4 text-sm text-[#7C5CFC] mb-6">
        PSG tokens carry artwork-specific advisory voting rights · chain-agnostic · rights transfer to buyer immediately
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        <MetricTile label="Total PSG" value="1,240" />
        <MetricTile label="Index Price" value="$4.20" sub={<Tag variant="success">+3.2%</Tag>} />
        <MetricTile label="24h Volume" value="$84K" />
        <MetricTile label="Active Listings" value="342" />
      </div>

      <div className="grid grid-cols-[3fr_2fr] gap-6">
        <div className="space-y-6">
          <Card hover={false}>
            <h3 className="font-serif-dm text-lg text-[#1A1A2E] mb-4">Token Markets</h3>
            <table className="w-full">
              <thead>
                <tr className="text-[11px] uppercase tracking-[0.08em] text-[#9494B0] border-b border-[rgba(0,0,0,0.08)]">
                  <th className="text-left pb-3 font-semibold">Artwork</th>
                  <th className="text-right pb-3 font-semibold">Price</th>
                  <th className="text-right pb-3 font-semibold">24h</th>
                  <th className="text-right pb-3 font-semibold">Volume</th>
                  <th className="text-right pb-3 font-semibold"></th>
                </tr>
              </thead>
              <tbody>
                {TOKEN_MARKETS.map(t => (
                  <tr key={t.art} className="border-b border-[rgba(0,0,0,0.04)] hover:bg-[#F0F0F5] transition-colors">
                    <td className="py-3 text-sm text-[#1A1A2E]">{t.art}</td>
                    <td className="text-right font-mono-dm text-sm text-[#1A1A2E]">${t.price.toFixed(2)}</td>
                    <td className={`text-right font-mono-dm text-sm ${t.change >= 0 ? 'text-[#059669]' : 'text-[#DC2626]'}`}>
                      {t.change >= 0 ? '+' : ''}{t.change}%
                    </td>
                    <td className="text-right font-mono-dm text-sm text-[#6B6B8A]">{t.vol}</td>
                    <td className="text-right"><Btn className="text-xs" onClick={() => openTokenModal(t.art)}>Trade</Btn></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          <Card>
            <h3 className="font-serif-dm text-lg text-[#1A1A2E] mb-4">Order Book · Rothko No. 61</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-[11px] uppercase tracking-[0.08em] text-[#059669] mb-2 font-semibold">Bids</div>
                {[['$4.80', '240'], ['$4.75', '120'], ['$4.70', '380'], ['$4.65', '90']].map(([p, q]) => (
                  <div key={p} className="flex justify-between text-sm py-1">
                    <span className="font-mono-dm text-[#059669]">{p}</span>
                    <span className="font-mono-dm text-[#6B6B8A]">{q}</span>
                  </div>
                ))}
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-[0.08em] text-[#DC2626] mb-2 font-semibold">Asks</div>
                {[['$4.85', '60'], ['$4.90', '150'], ['$4.95', '200'], ['$5.00', '400']].map(([p, q]) => (
                  <div key={p} className="flex justify-between text-sm py-1">
                    <span className="font-mono-dm text-[#DC2626]">{p}</span>
                    <span className="font-mono-dm text-[#6B6B8A]">{q}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <h3 className="font-serif-dm text-lg text-[#1A1A2E] mb-3">Rothko PSG · 7d</h3>
            <MiniChart data={TOKEN_CHART} color="#7C5CFC" height={80} />
            <div className="flex justify-between mt-2 text-xs text-[#9494B0]">
              <span>7d low: $4.21</span><span>7d high: $4.96</span>
            </div>
          </Card>
          <Card>
            <div className="text-[11px] uppercase tracking-[0.08em] text-[#9494B0] mb-4 font-semibold">Your Token Balances</div>
            {TOKEN_MARKETS.filter(t => t.bal > 0).map(t => (
              <div key={t.art} className="flex justify-between items-center text-sm py-2 border-b border-[rgba(0,0,0,0.04)]">
                <span className="text-[#6B6B8A]">{t.art.split(' ').slice(0, 2).join(' ')}</span>
                <div className="flex items-center gap-3">
                  <span className="font-mono-dm text-[#1A1A2E]">{t.bal}</span>
                  <button className="text-xs text-[#7C5CFC] hover:underline" onClick={() => openTokenModal(t.art)}>Sell</button>
                </div>
              </div>
            ))}
          </Card>
          <Card>
            <div className="text-[11px] uppercase tracking-[0.08em] text-[#9494B0] mb-4 font-semibold">Recent Trades</div>
            {[
              { art: 'Rothko', p: '$4.78', type: 'Buy' },
              { art: 'Picasso', p: '$6.15', type: 'Sell' },
              { art: 'Van Gogh', p: '$9.35', type: 'Buy' },
            ].map((t, i) => (
              <div key={i} className="flex justify-between text-sm py-2 border-b border-[rgba(0,0,0,0.04)]">
                <span className="text-[#6B6B8A]">{t.art}</span>
                <div className="flex items-center gap-3">
                  <span className="font-mono-dm text-[#1A1A2E]">{t.p}</span>
                  <span className={`text-xs font-semibold ${t.type === 'Buy' ? 'text-[#059669]' : 'text-[#DC2626]'}`}>{t.type}</span>
                </div>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </PortalLayout>
  );

  // ─── Museum Dashboard ────────────────────

  const MusDash = () => (
    <PortalLayout breadcrumb="Museum · Overview">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif-dm text-[26px] text-[#1A1A2E]">Good morning, Dr. Martinez</h1>
          <p className="text-[12px] text-[#9494B0] mt-1">MoMA · Museum of Modern Art</p>
        </div>
        <Btn portal="mus" onClick={() => { setModal('new-proposal'); setNpTitle(''); setNpDesc(''); setOrderConfirmed(false); }}>+ New proposal</Btn>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        <MetricTile label="Tokenized Value" value="$48.2M" sub="across 6 works" />
        <MetricTile label="Stakeholders" value="2,847" sub={<Tag variant="success">+124 this month</Tag>} />
        <MetricTile label="Mission Alignment" value="94/100" sub={<Tag variant="mus">Cultural Infusion ✓</Tag>} />
        <MetricTile label="Pending Actions" value="3" sub={<span className="text-[#D97706] text-xs">1 requires decision</span>} />
      </div>

      <div className="grid grid-cols-[2fr_1fr] gap-6">
        <div className="space-y-6">
          <Card hover={false}>
            <h3 className="font-serif-dm text-lg text-[#1A1A2E] mb-4">Tokenized Collection</h3>
            <table className="w-full">
              <thead>
                <tr className="text-[11px] uppercase tracking-[0.08em] text-[#9494B0] border-b border-[rgba(0,0,0,0.08)]">
                  {['Title', 'Shares', 'Float', 'Price', 'Stakeholders', ''].map(h => (
                    <th key={h} className={`pb-3 font-semibold ${h === 'Title' ? 'text-left' : 'text-right'}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MUS_ARTWORKS.map(a => (
                  <tr key={a.title} className="border-b border-[rgba(0,0,0,0.04)] hover:bg-[#F0F0F5] transition-colors">
                    <td className="py-3 flex items-center gap-3">
                      {getArtworkSVG(a.title, 32)}
                      <span className="text-sm text-[#1A1A2E]">{a.title}</span>
                    </td>
                    <td className="text-right font-mono-dm text-sm text-[#6B6B8A]">{a.shares.toLocaleString()}</td>
                    <td className="text-right font-mono-dm text-sm text-[#6B6B8A]">{a.float.toLocaleString()}</td>
                    <td className="text-right font-mono-dm text-sm text-[#1A1A2E]">${a.price}</td>
                    <td className="text-right text-sm text-[#6B6B8A]">{a.stakeholders}</td>
                    <td className="text-right"><Btn variant="ghost" portal="mus" className="text-xs">Manage</Btn></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif-dm text-lg text-[#1A1A2E]">Revenue</h3>
              <span className="font-mono-dm text-sm text-[#10B981]">YTD: $284K</span>
            </div>
            <MiniChart data={MUS_CHART} color="#10B981" height={80} />
            <div className="grid grid-cols-2 gap-4 mt-4">
              <MetricTile label="YTD Revenue" value="$284K" />
              <MetricTile label="Q1 Distributions" value="$41K" />
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <div className="text-[11px] uppercase tracking-[0.08em] text-[#9494B0] mb-4 font-semibold">Pending Decisions</div>
            <div className="space-y-4">
              {musProposals.map(p => (
                <MusProposalMini key={p.id} proposal={p} />
              ))}
            </div>
          </Card>
          <CompliancePanel />
        </div>
      </div>
    </PortalLayout>
  );

  const MusProposalMini = ({ proposal: p }: { proposal: typeof musProposals[0] }) => {
    const handleDecision = (d: string) => {
      setMusProposals(prev => prev.map(pr => pr.id === p.id ? { ...pr, decision: d } : pr));
    };
    return (
      <div className="bg-[#F0F0F5] rounded-xl p-4 border border-[rgba(0,0,0,0.04)]">
        <div className="text-sm text-[#1A1A2E] mb-1">{p.title}</div>
        <div className="text-xs text-[#9494B0] mb-2">Stakeholder consensus: {p.forPct}% For</div>
        <VoteBar forPct={p.forPct} againstPct={100 - p.forPct} abstainPct={0} />
        {!p.decision ? (
          <div className="flex gap-2 mt-3">
            <Btn variant="success" portal="mus" className="text-[10px] px-2 py-1.5" onClick={() => handleDecision('follow')}>Follow</Btn>
            <Btn variant="warning" className="text-[10px] px-2 py-1.5" onClick={() => handleDecision('override')}>Override</Btn>
            <Btn variant="ghost" className="text-[10px] px-2 py-1.5" onClick={() => handleDecision('defer')}>Defer</Btn>
          </div>
        ) : (
          <div className={`rounded-lg p-2.5 mt-3 text-xs screen-enter ${
            p.decision === 'follow' ? 'bg-[rgba(5,150,105,0.08)] text-[#059669] border border-[rgba(5,150,105,0.12)]' :
            p.decision === 'override' ? 'bg-[rgba(217,119,6,0.08)] text-[#D97706] border border-[rgba(217,119,6,0.12)]' :
            'bg-[rgba(0,0,0,0.04)] text-[#6B6B8A] border border-[rgba(0,0,0,0.08)]'
          }`}>
            {p.decision === 'follow' && '✓ Decision recorded: Approved. Published on-chain.'}
            {p.decision === 'override' && '⚠ Override recorded. Submit rationale — published to token holders within 24h.'}
            {p.decision === 'defer' && 'Decision deferred. Voting extended 7 days.'}
          </div>
        )}
      </div>
    );
  };

  // ─── Museum Engagement ───────────────────

  const MusEngagement = () => {
    const engData = [
      { art: 'Rothko', inPerson: 89, digital: 67, edu: 42 },
      { art: 'Van Gogh', inPerson: 120, digital: 95, edu: 58 },
      { art: 'Picasso', inPerson: 75, digital: 51, edu: 33 },
      { art: 'Kandinsky', inPerson: 52, digital: 38, edu: 20 },
    ];
    const maxEng = Math.max(...engData.map(d => d.inPerson + d.digital + d.edu));
    const scores = [
      { art: 'Rothko No. 61', score: 96 },
      { art: 'Picasso', score: 91 },
      { art: 'Van Gogh', score: 88 },
      { art: 'Kandinsky', score: 82 },
      { art: 'de Kooning', score: 79 },
    ];

    return (
      <PortalLayout breadcrumb="Museum · Engagement & Impact">
        <div className="flex items-center gap-3 mb-6">
          <h1 className="font-serif-dm text-[26px] text-[#1A1A2E]">Engagement & Impact</h1>
          <Tag variant="mus">Powered by Cultural Infusion</Tag>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-8">
          <MetricTile label="Public Interactions" value="142K/mo" />
          <MetricTile label="Education Programs" value="38" />
          <MetricTile label="Community Benefit" value="8.7/10" />
          <MetricTile label="Audience Reach" value="2.1M" />
        </div>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif-dm text-lg text-[#1A1A2E]">Community Engagement by Artwork</h3>
              <Tag variant="mus">Cultural Infusion</Tag>
            </div>
            <div className="space-y-4">
              {engData.map(d => (
                <div key={d.art}>
                  <div className="text-sm text-[#6B6B8A] mb-1.5">{d.art}</div>
                  <div className="flex h-5 rounded overflow-hidden bg-[rgba(0,0,0,0.04)]">
                    <div className="bg-[#10B981] h-full transition-all" style={{ width: `${(d.inPerson / maxEng) * 100}%` }} />
                    <div className="bg-[#7C5CFC] h-full transition-all" style={{ width: `${(d.digital / maxEng) * 100}%` }} />
                    <div className="bg-[#D97706] h-full transition-all" style={{ width: `${(d.edu / maxEng) * 100}%` }} />
                  </div>
                  <div className="flex gap-3 mt-1 text-[10px] text-[#9494B0]">
                    <span>{d.inPerson}K in-person</span>
                    <span>{d.digital}K digital</span>
                    <span>{d.edu}K educational</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-4 mt-4 text-xs">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-[#10B981]" />In-person</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-[#7C5CFC]" />Digital</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-[#D97706]" />Educational</span>
            </div>
          </Card>

          <Card>
            <h3 className="font-serif-dm text-lg text-[#1A1A2E] mb-4">Audience Demographics</h3>
            <div className="space-y-4">
              {[
                { label: 'First-time visitors', pct: 34 },
                { label: 'Students', pct: 28 },
                { label: 'International', pct: 19 },
                { label: 'Returning', pct: 19 },
              ].map(d => (
                <div key={d.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-[#6B6B8A]">{d.label}</span>
                    <span className="font-mono-dm text-[#1A1A2E]">{d.pct}%</span>
                  </div>
                  <div className="w-full h-2 rounded bg-[rgba(0,0,0,0.06)]">
                    <div className="h-full bg-[#10B981] rounded transition-all" style={{ width: `${d.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-6">
              <Tag variant="success">ICOM compliance ✓</Tag>
              <Tag variant="mus">Europeana sync active</Tag>
            </div>
          </Card>
        </div>

        <Card hover={false}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif-dm text-lg text-[#1A1A2E]">Mission Alignment Scores</h3>
            <Tag variant="mus">Cultural Infusion verified</Tag>
          </div>
          <div className="grid grid-cols-5 gap-4">
            {scores.map(s => (
              <div key={s.art} className="bg-[#F0F0F5] rounded-xl p-4 text-center border border-[rgba(0,0,0,0.04)]">
                <div className="text-[11px] text-[#9494B0] mb-2">{s.art}</div>
                <div className={`font-serif-dm text-[28px] ${s.score >= 88 ? 'text-[#10B981]' : 'text-[#D97706]'}`}>{s.score}</div>
                <div className="w-full h-1.5 rounded bg-[rgba(0,0,0,0.06)] mt-2">
                  <div className={`h-full rounded transition-all ${s.score >= 88 ? 'bg-[#10B981]' : 'bg-[#D97706]'}`} style={{ width: `${s.score}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </PortalLayout>
    );
  };

  // ─── Museum Governance ───────────────────

  const MusGov = () => (
    <PortalLayout breadcrumb="Museum · Stakeholder Governance">
      <h1 className="font-serif-dm text-[26px] text-[#1A1A2E] mb-1">Stakeholder Governance</h1>
      <p className="text-sm text-[#6B6B8A] mb-6">Curatorial authority remains with MoMA at all times</p>

      <div className="bg-[rgba(16,185,129,0.06)] border border-[rgba(16,185,129,0.1)] rounded-xl p-4 text-sm text-[#10B981] mb-6">
        Museum retains full curatorial control · All overrides are published on-chain to token holders
      </div>

      <div className="grid grid-cols-[2fr_1fr] gap-6">
        <div className="space-y-4">
          {musProposals.map(p => (
            <Card key={p.id}>
              <h4 className="font-serif-dm text-base text-[#1A1A2E] mb-1">{p.title}</h4>
              <div className="text-xs text-[#9494B0] mb-3">Stakeholder consensus: {p.forPct}% For · {100 - p.forPct}% Against/Abstain</div>
              <VoteBar forPct={p.forPct} againstPct={100 - p.forPct} abstainPct={0} />
              {!p.decision ? (
                <div className="flex gap-2 mt-4">
                  <Btn portal="mus" className="text-xs" onClick={() => setMusProposals(prev => prev.map(pr => pr.id === p.id ? { ...pr, decision: 'follow' } : pr))}>Follow stakeholder vote</Btn>
                  <Btn variant="warning" className="text-xs" onClick={() => setMusProposals(prev => prev.map(pr => pr.id === p.id ? { ...pr, decision: 'override' } : pr))}>Override with rationale</Btn>
                  <Btn variant="ghost" className="text-xs" onClick={() => setMusProposals(prev => prev.map(pr => pr.id === p.id ? { ...pr, decision: 'defer' } : pr))}>Defer 7 days</Btn>
                </div>
              ) : (
                <div className={`rounded-lg p-3 mt-4 text-sm screen-enter ${
                  p.decision === 'follow' ? 'bg-[rgba(5,150,105,0.08)] text-[#059669] border border-[rgba(5,150,105,0.12)]' :
                  p.decision === 'override' ? 'bg-[rgba(217,119,6,0.08)] text-[#D97706] border border-[rgba(217,119,6,0.12)]' :
                  'bg-[rgba(0,0,0,0.04)] text-[#6B6B8A] border border-[rgba(0,0,0,0.08)]'
                }`}>
                  {p.decision === 'follow' && '✓ Decision recorded: Loan approved. Tate Modern notified. Published on-chain.'}
                  {p.decision === 'override' && '⚠ Override recorded. Submit written rationale — published to all token holders within 24 hours.'}
                  {p.decision === 'defer' && 'Decision deferred. Voting extended 7 days.'}
                </div>
              )}
            </Card>
          ))}
        </div>
        <div className="space-y-4">
          <Card>
            <div className="text-[11px] uppercase tracking-[0.08em] text-[#9494B0] mb-4 font-semibold">Governance Activity</div>
            <div className="grid grid-cols-2 gap-3">
              <MetricTile label="Total" value="24" />
              <MetricTile label="Followed" value="18" />
              <MetricTile label="Overridden" value="4" />
              <MetricTile label="Deferred" value="2" />
            </div>
          </Card>
          <CompliancePanel />
        </div>
      </div>
    </PortalLayout>
  );

  // ─── Museum Legal & Compliance ──────────────

  const MusLegal = () => (
    <PortalLayout breadcrumb="Museum · Legal & Compliance">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif-dm text-[26px] text-[#1A1A2E]">Legal & Compliance</h1>
          <p className="text-sm text-[#6B6B8A] mt-1">SPV structure · Donor protections · Regulatory reporting</p>
        </div>
        <Tag variant="mus">501(c)(3) Compliant</Tag>
      </div>

      <div className="bg-[rgba(16,185,129,0.06)] border border-[rgba(16,185,129,0.1)] rounded-xl p-4 text-sm text-[#10B981] mb-6">
        Museum-controlled SPV isolates fractionalization from core operations · AAMD/AAM/ICOM guidelines embedded · Automated regulatory reporting
      </div>

      {/* SPV Details */}
      <div className="grid grid-cols-[2fr_1fr] gap-6 mb-8">
        <Card>
          <h3 className="font-serif-dm text-lg text-[#1A1A2E] mb-4">Museum-Controlled SPV</h3>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(SPV_DETAILS).map(([k, v]) => (
              <div key={k}>
                <div className="text-[11px] uppercase tracking-[0.08em] text-[#9494B0] mb-1">{k.replace(/([A-Z])/g, ' $1').trim()}</div>
                <div className="text-sm text-[#1A1A2E] font-medium">{v}</div>
              </div>
            ))}
          </div>
          <div className="bg-[rgba(16,185,129,0.06)] rounded-lg p-3 mt-4 text-xs text-[#10B981]">
            SPV provides legal isolation · Museum retains ≥51% ownership at all times · Delaware jurisdiction for maximum legal flexibility
          </div>
        </Card>

        <div className="space-y-4">
          {LEGAL_PROTECTIONS.map(lp => (
            <div key={lp.title} className="bg-[#F0F0F5] border border-[rgba(0,0,0,0.04)] rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-base">{lp.icon}</span>
                <span className="text-sm text-[#1A1A2E] font-medium">{lp.title}</span>
              </div>
              <p className="text-[11px] text-[#6B6B8A]">{lp.desc}</p>
              <Tag variant="success" >{lp.status}</Tag>
            </div>
          ))}
        </div>
      </div>

      {/* Regulatory Reporting */}
      <Card hover={false} className="mb-8">
        <h3 className="font-serif-dm text-lg text-[#1A1A2E] mb-4">Regulatory Reporting</h3>
        <table className="w-full">
          <thead>
            <tr className="text-[11px] uppercase tracking-[0.08em] text-[#9494B0] border-b border-[rgba(0,0,0,0.08)]">
              {['Entity', 'Report Type', 'Last Filed', 'Status', 'Next Due'].map(h => (
                <th key={h} className={`pb-3 font-semibold ${h === 'Entity' || h === 'Report Type' ? 'text-left' : 'text-right'}`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {REGULATORY_REPORTS.map(r => (
              <tr key={r.entity} className="border-b border-[rgba(0,0,0,0.04)] hover:bg-[#F0F0F5] transition-colors">
                <td className="py-3 text-sm font-medium text-[#1A1A2E]">{r.entity}</td>
                <td className="py-3 text-sm text-[#6B6B8A]">{r.type}</td>
                <td className="text-right text-sm text-[#6B6B8A]">{r.lastFiled}</td>
                <td className="text-right"><Tag variant="success">{r.status}</Tag></td>
                <td className="text-right text-sm text-[#6B6B8A]">{r.next}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Donor Intent Records */}
      <Card hover={false}>
        <h3 className="font-serif-dm text-lg text-[#1A1A2E] mb-4">Donor Intent Safeguards</h3>
        <table className="w-full">
          <thead>
            <tr className="text-[11px] uppercase tracking-[0.08em] text-[#9494B0] border-b border-[rgba(0,0,0,0.08)]">
              {['Donor', 'Artwork', 'Restriction', 'Status', 'Year'].map(h => (
                <th key={h} className={`pb-3 font-semibold ${['Donor', 'Artwork', 'Restriction'].includes(h) ? 'text-left' : 'text-right'}`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DONOR_RECORDS.map(d => (
              <tr key={d.donor} className="border-b border-[rgba(0,0,0,0.04)] hover:bg-[#F0F0F5] transition-colors">
                <td className="py-3 text-sm font-medium text-[#1A1A2E]">{d.donor}</td>
                <td className="py-3 text-sm text-[#6B6B8A]">{d.artwork}</td>
                <td className="py-3 text-sm text-[#6B6B8A] max-w-[240px]">{d.restriction}</td>
                <td className="text-right"><Tag variant="success">{d.status}</Tag></td>
                <td className="text-right text-sm text-[#9494B0]">{d.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </PortalLayout>
  );

  // ─── Museum Management ──────────────────

  const MusManagement = () => (
    <PortalLayout breadcrumb="Museum · Management">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif-dm text-[26px] text-[#1A1A2E]">Museum Management</h1>
          <p className="text-sm text-[#6B6B8A] mt-1">Approval workflows · Staff RBAC · Integrations · Donor management</p>
        </div>
        <Btn portal="mus">+ New Workflow</Btn>
      </div>

      {/* Approval Workflows */}
      <Card hover={false} className="mb-8">
        <h3 className="font-serif-dm text-lg text-[#1A1A2E] mb-4">Institutional Approval Workflows</h3>
        <div className="space-y-4">
          {APPROVAL_WORKFLOWS.map(w => (
            <div key={w.id} className="bg-[#F0F0F5] border border-[rgba(0,0,0,0.04)] rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-sm text-[#1A1A2E] font-medium">{w.title}</div>
                  <div className="text-[11px] text-[#9494B0]">Initiated by {w.initiator} · {w.date}</div>
                </div>
                <Tag variant="mus">{w.stage}</Tag>
              </div>
              <div className="flex items-center gap-1">
                {w.stages.map((s, i) => (
                  <React.Fragment key={s}>
                    <div className={`flex-1 h-2 rounded-full transition-all ${i <= w.currentStage ? 'bg-[#10B981]' : 'bg-[rgba(0,0,0,0.08)]'}`} />
                    {i < w.stages.length - 1 && <div className="w-1" />}
                  </React.Fragment>
                ))}
              </div>
              <div className="flex justify-between mt-2">
                {w.stages.map((s, i) => (
                  <span key={s} className={`text-[9px] ${i <= w.currentStage ? 'text-[#10B981]' : 'text-[#9494B0]'}`}>{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-6 mb-8">
        {/* Role-Based Access Control */}
        <Card hover={false}>
          <h3 className="font-serif-dm text-lg text-[#1A1A2E] mb-4">Role-Based Access Control</h3>
          <div className="space-y-3">
            {STAFF_ROLES.map(s => (
              <div key={s.name} className="bg-[#F0F0F5] border border-[rgba(0,0,0,0.04)] rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <div className="text-sm text-[#1A1A2E] font-medium">{s.name}</div>
                  <Tag variant="mus">{s.role}</Tag>
                </div>
                <div className="flex gap-1.5 flex-wrap mt-1">
                  {s.permissions.map(p => (
                    <span key={p} className="text-[9px] bg-[rgba(16,185,129,0.08)] text-[#10B981] px-2 py-0.5 rounded-full">{p}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* System Integrations */}
        <Card hover={false}>
          <h3 className="font-serif-dm text-lg text-[#1A1A2E] mb-4">System Integrations</h3>
          <div className="space-y-2">
            {SYSTEM_INTEGRATIONS.map(si => (
              <div key={si.system} className="flex items-center justify-between bg-[#F0F0F5] border border-[rgba(0,0,0,0.04)] rounded-lg p-3">
                <div>
                  <div className="text-sm text-[#1A1A2E] font-medium">{si.system}</div>
                  <div className="text-[10px] text-[#9494B0]">{si.type}</div>
                </div>
                <div className="text-right">
                  <Tag variant="success">{si.status}</Tag>
                  <div className="text-[9px] text-[#9494B0] mt-1">Synced {si.lastSync}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Public Access Guarantees */}
      <Card>
        <h3 className="font-serif-dm text-lg text-[#1A1A2E] mb-4">Public Access Guarantees</h3>
        <div className="grid grid-cols-3 gap-4">
          {[
            { title: 'Display Requirement', desc: 'All tokenized works must be on public display ≥6 months/year', status: 'Enforced' },
            { title: 'Digital Access', desc: 'High-resolution digital reproductions available via museum website', status: 'Active' },
            { title: 'Educational Programs', desc: 'Tokenization revenue funds 38 active education programs', status: 'Active' },
          ].map(g => (
            <div key={g.title} className="bg-[#F0F0F5] border border-[rgba(0,0,0,0.04)] rounded-xl p-4">
              <div className="text-sm text-[#1A1A2E] font-medium mb-1">{g.title}</div>
              <p className="text-[11px] text-[#6B6B8A] mb-2">{g.desc}</p>
              <Tag variant="success">{g.status}</Tag>
            </div>
          ))}
        </div>
      </Card>
    </PortalLayout>
  );

  // ─── Museum Security ──────────────────

  const MusSecurity = () => (
    <PortalLayout breadcrumb="Museum · Security">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif-dm text-[26px] text-[#1A1A2E]">Security Architecture</h1>
          <p className="text-sm text-[#6B6B8A] mt-1">Multi-layered security · Artwork protection · Institutional key management</p>
        </div>
        <Tag variant="success">All systems operational</Tag>
      </div>

      <div className="bg-[rgba(16,185,129,0.06)] border border-[rgba(16,185,129,0.1)] rounded-xl p-4 text-sm text-[#10B981] mb-6">
        Museum-specific security priorities · HSM-protected keys · Multi-sig governance · Continuous compliance monitoring
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        <MetricTile label="Security Score" value="98/100" sub={<Tag variant="success">Excellent</Tag>} />
        <MetricTile label="Active Controls" value="8" sub="all operational" />
        <MetricTile label="Threat Level" value="Low" sub="no active threats" />
        <MetricTile label="Last Audit" value="Apr 1" sub="PwC · Passed" />
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <Card hover={false}>
          <h3 className="font-serif-dm text-lg text-[#1A1A2E] mb-4">Security Controls</h3>
          <div className="space-y-2">
            {SECURITY_CONTROLS.map(sc => (
              <div key={sc.control} className="flex items-start justify-between bg-[#F0F0F5] border border-[rgba(0,0,0,0.04)] rounded-lg p-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="text-sm text-[#1A1A2E] font-medium">{sc.control}</div>
                    <Tag variant={sc.level === 'Critical' ? 'danger' : sc.level === 'High' ? 'warning' : 'muted'}>{sc.level}</Tag>
                  </div>
                  <div className="text-[11px] text-[#6B6B8A] mt-0.5">{sc.desc}</div>
                </div>
                <Tag variant="success">{sc.status}</Tag>
              </div>
            ))}
          </div>
        </Card>

        <div className="space-y-4">
          <Card>
            <h3 className="font-serif-dm text-lg text-[#1A1A2E] mb-4">Multi-Signature Governance</h3>
            <div className="bg-[#F0F0F5] rounded-xl p-4 border border-[rgba(0,0,0,0.04)] mb-4">
              <div className="text-[11px] uppercase tracking-[0.08em] text-[#9494B0] mb-2">Signing Policy</div>
              <div className="font-serif-dm text-2xl text-[#1A1A2E]">3 of 5</div>
              <p className="text-[11px] text-[#6B6B8A] mt-1">signatures required for high-value decisions</p>
            </div>
            <div className="space-y-2">
              {['Director (HSM)', 'Board Chair (HSM)', 'Chief Curator (Software)', 'Legal Counsel (Software)', 'CFO (Software)'].map((signer, i) => (
                <div key={signer} className="flex items-center justify-between text-sm">
                  <span className="text-[#6B6B8A]">{signer}</span>
                  <Tag variant={i < 3 ? 'success' : 'muted'}>{i < 3 ? 'Active' : 'Standby'}</Tag>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="font-serif-dm text-lg text-[#1A1A2E] mb-4">Recent Security Events</h3>
            <div className="space-y-3">
              {[
                { event: 'HSM key rotation completed', time: '2h ago', severity: 'Info' },
                { event: 'Compliance scan passed', time: '6h ago', severity: 'Info' },
                { event: 'Failed login attempt blocked', time: '1d ago', severity: 'Warning' },
                { event: 'Insurance policy renewed (AXA XL)', time: '3d ago', severity: 'Info' },
              ].map((e, i) => (
                <div key={i} className="flex items-center justify-between text-sm bg-[#F0F0F5] rounded-lg p-3 border border-[rgba(0,0,0,0.04)]">
                  <div>
                    <div className="text-[#1A1A2E]">{e.event}</div>
                    <div className="text-[10px] text-[#9494B0]">{e.time}</div>
                  </div>
                  <Tag variant={e.severity === 'Warning' ? 'warning' : 'muted'}>{e.severity}</Tag>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </PortalLayout>
  );

  // ─── Blockchain Infrastructure (Investor) ──
  const InvChain = () => {
    const [selectedChain, setSelectedChain] = useState('solana');
    const chains = [
      { id: 'solana', name: 'Solana', color: '#9945FF', role: 'High-Speed Trading', tps: '65,000', cost: '$0.00025', latency: '400ms', status: 'Active', desc: 'Primary chain for secondary market trading, revenue distributions, and high-frequency PSG token transfers.' },
      { id: 'avalanche', name: 'Avalanche', color: '#E84142', role: 'Private Governance', tps: '4,500', cost: '$0.01', latency: '2s', status: 'Active', desc: 'Institutional subnet for private governance operations, compliance validation, and museum-specific tokenomics.' },
      { id: 'ethereum', name: 'Ethereum', color: '#627EEA', role: 'Settlement & Security', tps: '30', cost: '$2.50', latency: '12s', status: 'Active', desc: 'Final settlement layer for high-value transactions, cross-chain bridges, and maximum market acceptance.' },
    ];
    const txRouting = [
      { type: 'Share Trading', chain: 'Solana', reason: 'Lowest cost, highest throughput', icon: '⚡' },
      { type: 'Advisory Voting', chain: 'Avalanche', reason: 'Private subnet, institutional rules', icon: '🔒' },
      { type: 'Token Transfers', chain: 'Solana', reason: 'Sub-second finality, minimal fees', icon: '↔' },
      { type: 'High-Value Settlement', chain: 'Ethereum', reason: 'Maximum security & liquidity', icon: '🏦' },
      { type: 'Cross-Chain Bridge', chain: 'Ethereum ↔ Solana', reason: 'Liquidity access', icon: '🌉' },
      { type: 'Compliance Attestation', chain: 'Avalanche', reason: 'Jurisdiction-aware contracts', icon: '✓' },
    ];
    const recentTx = [
      { action: 'Buy 3 shares · Rothko', chain: 'Solana', cost: '$0.00075', time: '0.4s', status: 'Confirmed' },
      { action: 'Vote · Loan Proposal', chain: 'Avalanche', cost: '$0.01', time: '1.8s', status: 'Confirmed' },
      { action: 'Bridge 50 PSG → ETH', chain: 'Ethereum', cost: '$2.48', time: '12s', status: 'Pending' },
    ];
    const active = chains.find(c => c.id === selectedChain)!;

    return (
      <PortalLayout breadcrumb="Investor · Chain Infrastructure">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-serif-dm text-[26px] text-[#1A1A2E]">Chain Infrastructure</h1>
            <p className="text-sm text-[#6B6B8A] mt-1">Multi-chain architecture · Dynamic routing · Cost optimized</p>
          </div>
          <Tag variant="inv">3 chains active</Tag>
        </div>

        <div className="bg-[rgba(124,92,252,0.06)] border border-[rgba(124,92,252,0.1)] rounded-xl p-4 text-sm text-[#7C5CFC] mb-6">
          Transactions are automatically routed to the optimal blockchain based on cost, speed, privacy, and compliance requirements.
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          {chains.map(c => (
            <div key={c.id}
              className={`bg-[#FFFFFF] border rounded-2xl p-5 cursor-pointer transition-all duration-300 hover:-translate-y-1 ${selectedChain === c.id ? 'border-[rgba(124,92,252,0.3)] shadow-[0_0_30px_rgba(124,92,252,0.1)]' : 'border-[rgba(0,0,0,0.08)]'}`}
              style={{ boxShadow: selectedChain === c.id ? undefined : '0 1px 3px rgba(0,0,0,0.08)' }}
              onClick={() => setSelectedChain(c.id)}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 rounded-full" style={{ background: c.color }} />
                <span className="font-serif-dm text-lg text-[#1A1A2E]">{c.name}</span>
                <Tag variant="success">{c.status}</Tag>
              </div>
              <div className="text-[11px] uppercase tracking-[0.08em] text-[#9494B0] mb-2">{c.role}</div>
              <div className="grid grid-cols-3 gap-2 mt-3">
                <div><div className="text-[10px] text-[#9494B0]">TPS</div><div className="font-mono-dm text-sm text-[#1A1A2E]">{c.tps}</div></div>
                <div><div className="text-[10px] text-[#9494B0]">Avg Cost</div><div className="font-mono-dm text-sm text-[#1A1A2E]">{c.cost}</div></div>
                <div><div className="text-[10px] text-[#9494B0]">Latency</div><div className="font-mono-dm text-sm text-[#1A1A2E]">{c.latency}</div></div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-[2fr_1fr] gap-6 mb-8">
          <Card>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-4 h-4 rounded-full" style={{ background: active.color }} />
              <h3 className="font-serif-dm text-lg text-[#1A1A2E]">{active.name} — {active.role}</h3>
            </div>
            <p className="text-sm text-[#6B6B8A] mb-5">{active.desc}</p>

            <div className="text-[11px] uppercase tracking-[0.08em] text-[#9494B0] mb-3 font-semibold">Smart Contracts Deployed</div>
            <div className="space-y-2">
              {(selectedChain === 'solana' ? [
                { name: 'ShareTrading.sol', status: 'Live', desc: 'Fractional share order matching & settlement' },
                { name: 'RevenueDistributor.sol', status: 'Live', desc: 'Automated revenue splits to shareholders' },
                { name: 'PSGTokenTransfer.sol', status: 'Live', desc: 'High-speed governance token transfers' },
              ] : selectedChain === 'avalanche' ? [
                { name: 'MuseumGovernance.sol', status: 'Live', desc: 'Advisory voting with institutional override' },
                { name: 'ComplianceEngine.sol', status: 'Live', desc: 'Jurisdiction-aware regulatory validation' },
                { name: 'ArtworkRegistry.sol', status: 'Live', desc: 'Primary tokenization & provenance ledger' },
              ] : [
                { name: 'SettlementBridge.sol', status: 'Live', desc: 'Cross-chain settlement finalization' },
                { name: 'LiquidityPool.sol', status: 'Live', desc: 'ETH/SOL liquidity bridge for PSG tokens' },
                { name: 'OwnershipAttestation.sol', status: 'Live', desc: 'Immutable ownership verification layer' },
              ]).map(sc => (
                <div key={sc.name} className="flex items-center justify-between bg-[#F0F0F5] rounded-lg p-3 border border-[rgba(0,0,0,0.04)]">
                  <div>
                    <div className="font-mono-dm text-sm text-[#1A1A2E]">{sc.name}</div>
                    <div className="text-[11px] text-[#9494B0]">{sc.desc}</div>
                  </div>
                  <Tag variant="success">{sc.status}</Tag>
                </div>
              ))}
            </div>
          </Card>

          <div className="space-y-4">
            <Card>
              <div className="text-[11px] uppercase tracking-[0.08em] text-[#9494B0] mb-4 font-semibold">Optimization Engine</div>
              <div className="space-y-3">
                {[
                  { label: 'Cost Savings vs Single-Chain', value: '94%', desc: 'vs Ethereum-only' },
                  { label: 'Avg TX Latency', value: '0.8s', desc: 'weighted across chains' },
                  { label: 'Privacy Score', value: '9.2/10', desc: 'Avalanche subnet isolation' },
                  { label: 'Compliance Coverage', value: '7/7', desc: 'All jurisdictions active' },
                ].map(m => (
                  <div key={m.label} className="bg-[#F0F0F5] rounded-lg p-3 border border-[rgba(0,0,0,0.04)]">
                    <div className="text-[10px] text-[#9494B0]">{m.label}</div>
                    <div className="font-serif-dm text-xl text-[#1A1A2E]">{m.value}</div>
                    <div className="text-[10px] text-[#9494B0]">{m.desc}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        <Card hover={false} className="mb-8">
          <h3 className="font-serif-dm text-lg text-[#1A1A2E] mb-4">Dynamic Chain Routing</h3>
          <table className="w-full">
            <thead>
              <tr className="text-[11px] uppercase tracking-[0.08em] text-[#9494B0] border-b border-[rgba(0,0,0,0.08)]">
                {['', 'Transaction Type', 'Routed To', 'Routing Reason'].map(h => (
                  <th key={h} className="text-left pb-3 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {txRouting.map((r, i) => (
                <tr key={i} className="border-b border-[rgba(0,0,0,0.04)] hover:bg-[#F0F0F5] transition-colors">
                  <td className="py-3 text-base">{r.icon}</td>
                  <td className="py-3 text-sm text-[#1A1A2E] font-medium">{r.type}</td>
                  <td className="py-3"><Tag variant="inv">{r.chain}</Tag></td>
                  <td className="py-3 text-sm text-[#6B6B8A]">{r.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card hover={false}>
          <h3 className="font-serif-dm text-lg text-[#1A1A2E] mb-4">Recent On-Chain Activity</h3>
          <table className="w-full">
            <thead>
              <tr className="text-[11px] uppercase tracking-[0.08em] text-[#9494B0] border-b border-[rgba(0,0,0,0.08)]">
                {['Action', 'Chain', 'Gas Cost', 'Latency', 'Status'].map(h => (
                  <th key={h} className={`pb-3 font-semibold ${h === 'Action' ? 'text-left' : 'text-right'}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentTx.map((tx, i) => (
                <tr key={i} className="border-b border-[rgba(0,0,0,0.04)]">
                  <td className="py-3 text-sm text-[#1A1A2E]">{tx.action}</td>
                  <td className="text-right"><Tag variant="inv">{tx.chain}</Tag></td>
                  <td className="text-right font-mono-dm text-sm text-[#6B6B8A]">{tx.cost}</td>
                  <td className="text-right font-mono-dm text-sm text-[#6B6B8A]">{tx.time}</td>
                  <td className="text-right"><Tag variant={tx.status === 'Confirmed' ? 'success' : 'warning'}>{tx.status}</Tag></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </PortalLayout>
    );
  };

  // ─── Blockchain Infrastructure (Museum) ──
  const MusChain = () => {
    const [selectedChain, setSelectedChain] = useState('avalanche');
    const chains = [
      { id: 'avalanche', name: 'Avalanche Subnet', color: '#E84142', role: 'Institutional Governance', status: 'Primary' },
      { id: 'solana', name: 'Solana', color: '#9945FF', role: 'Public Trading Layer', status: 'Active' },
      { id: 'ethereum', name: 'Ethereum', color: '#627EEA', role: 'Settlement Bridge', status: 'Active' },
    ];
    const subnetConfig = [
      { label: 'Subnet ID', value: 'moma-ps-subnet-001' },
      { label: 'Validators', value: '12 institutional nodes' },
      { label: 'Consensus', value: 'Snowman (PoS)' },
      { label: 'Block Time', value: '2s' },
      { label: 'Privacy Level', value: 'Permissioned' },
      { label: 'Compliance', value: '7/7 frameworks active' },
    ];
    const contractOps = [
      { contract: 'MuseumStewardship', op: 'Override decision published', chain: 'Avalanche', time: '2m ago', status: 'Confirmed' },
      { contract: 'ArtworkRegistry', op: 'Rothko attestation synced', chain: 'Solana', time: '5m ago', status: 'Confirmed' },
      { contract: 'ComplianceEngine', op: 'SEC/ESMA validation', chain: 'Avalanche', time: '12m ago', status: 'Confirmed' },
      { contract: 'RevenueSplit', op: 'Q1 distribution · $41K', chain: 'Solana', time: '1d ago', status: 'Settled' },
      { contract: 'OwnershipBridge', op: 'Cross-chain sync', chain: 'Ethereum', time: '1d ago', status: 'Confirmed' },
    ];

    return (
      <PortalLayout breadcrumb="Museum · Chain Infrastructure">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-serif-dm text-[26px] text-[#1A1A2E]">Chain Infrastructure</h1>
            <p className="text-sm text-[#6B6B8A] mt-1">Institutional-grade multi-chain architecture · Curatorial control preserved on-chain</p>
          </div>
          <Btn portal="mus" onClick={() => {}}>Deploy New Contract</Btn>
        </div>

        <div className="bg-[rgba(16,185,129,0.06)] border border-[rgba(16,185,129,0.1)] rounded-xl p-4 text-sm text-[#10B981] mb-6">
          MoMA operates a dedicated Avalanche Subnet for private governance. Public trading runs on Solana. Ethereum provides settlement finality and cross-chain liquidity.
        </div>

        <div className="grid grid-cols-4 gap-4 mb-8">
          <MetricTile label="Active Chains" value="3" sub="Avalanche · Solana · Ethereum" />
          <MetricTile label="Smart Contracts" value="9" sub="across 3 chains" />
          <MetricTile label="Monthly Gas Saved" value="$12.4K" sub={<Tag variant="success">vs ETH-only: 94% savings</Tag>} />
          <MetricTile label="On-Chain Decisions" value="24" sub="all published & auditable" />
        </div>

        <div className="flex gap-2 mb-6">
          {chains.map(c => (
            <button key={c.id}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedChain === c.id ? 'bg-[rgba(16,185,129,0.1)] text-[#10B981]' : 'bg-[#F0F0F5] text-[#9494B0] hover:text-[#6B6B8A]'}`}
              onClick={() => setSelectedChain(c.id)}>
              <span className="w-2 h-2 rounded-full" style={{ background: c.color }} />
              {c.name}
              <Tag variant={selectedChain === c.id ? 'mus' : 'muted'}>{c.status}</Tag>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-[2fr_1fr] gap-6 mb-8">
          <div className="space-y-6">
            <Card>
              <h3 className="font-serif-dm text-lg text-[#1A1A2E] mb-4">Hybrid Architecture</h3>
              <div className="relative bg-[#F0F0F5] rounded-xl p-6 border border-[rgba(0,0,0,0.04)]">
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-1 bg-[#FFFFFF] rounded-xl p-4 border-2 border-[#E84142] border-opacity-30">
                    <div className="text-[10px] uppercase tracking-[0.08em] text-[#E84142] font-semibold mb-2">Private Layer</div>
                    <div className="font-serif-dm text-sm text-[#1A1A2E] mb-2">Avalanche Subnet</div>
                    <div className="space-y-1.5">
                      {['Governance', 'Compliance', 'Registry'].map(s => (
                        <div key={s} className="bg-[#F0F0F5] rounded px-2 py-1 text-[10px] text-[#6B6B8A]">
                          <span className="text-[#E84142]">●</span> {s}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="col-span-1 flex flex-col items-center justify-center">
                    <div className="text-[10px] uppercase tracking-[0.08em] text-[#9494B0] mb-2">Cross-Chain Bridge</div>
                    <div className="w-full flex items-center gap-1">
                      <div className="flex-1 h-px bg-[#E84142] opacity-40" />
                      <div className="text-xs text-[#9494B0]">⬌</div>
                      <div className="flex-1 h-px bg-[#9945FF] opacity-40" />
                    </div>
                    <div className="w-full flex items-center gap-1 mt-2">
                      <div className="flex-1 h-px bg-[#9945FF] opacity-40" />
                      <div className="text-xs text-[#9494B0]">⬌</div>
                      <div className="flex-1 h-px bg-[#627EEA] opacity-40" />
                    </div>
                    <div className="mt-3 bg-[#FFFFFF] rounded-lg px-3 py-2 border border-[rgba(0,0,0,0.08)] text-center">
                      <div className="font-mono-dm text-xs text-[#1A1A2E]">Router</div>
                      <div className="text-[9px] text-[#9494B0]">Auto-selects optimal chain</div>
                    </div>
                  </div>
                  <div className="col-span-1 space-y-3">
                    <div className="bg-[#FFFFFF] rounded-xl p-4 border-2 border-[#9945FF] border-opacity-30">
                      <div className="text-[10px] uppercase tracking-[0.08em] text-[#9945FF] font-semibold mb-1">Public Trading</div>
                      <div className="font-serif-dm text-sm text-[#1A1A2E] mb-1">Solana</div>
                      <div className="text-[10px] text-[#6B6B8A]">Shares · Tokens · Revenue</div>
                    </div>
                    <div className="bg-[#FFFFFF] rounded-xl p-4 border-2 border-[#627EEA] border-opacity-30">
                      <div className="text-[10px] uppercase tracking-[0.08em] text-[#627EEA] font-semibold mb-1">Settlement</div>
                      <div className="font-serif-dm text-sm text-[#1A1A2E] mb-1">Ethereum</div>
                      <div className="text-[10px] text-[#6B6B8A]">Bridge · Liquidity · Finality</div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card hover={false}>
              <h3 className="font-serif-dm text-lg text-[#1A1A2E] mb-4">Recent Contract Operations</h3>
              <table className="w-full">
                <thead>
                  <tr className="text-[11px] uppercase tracking-[0.08em] text-[#9494B0] border-b border-[rgba(0,0,0,0.08)]">
                    {['Contract', 'Operation', 'Chain', 'Time', 'Status'].map(h => (
                      <th key={h} className={`pb-3 font-semibold ${h === 'Contract' || h === 'Operation' ? 'text-left' : 'text-right'}`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {contractOps.map((op, i) => (
                    <tr key={i} className="border-b border-[rgba(0,0,0,0.04)] hover:bg-[#F0F0F5] transition-colors">
                      <td className="py-3 font-mono-dm text-sm text-[#1A1A2E]">{op.contract}</td>
                      <td className="py-3 text-sm text-[#6B6B8A]">{op.op}</td>
                      <td className="text-right"><Tag variant="mus">{op.chain}</Tag></td>
                      <td className="text-right text-xs text-[#9494B0]">{op.time}</td>
                      <td className="text-right"><Tag variant="success">{op.status}</Tag></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </div>

          <div className="space-y-4">
            <Card>
              <div className="text-[11px] uppercase tracking-[0.08em] text-[#9494B0] mb-4 font-semibold">MoMA Subnet Config</div>
              <div className="space-y-3">
                {subnetConfig.map(s => (
                  <div key={s.label} className="flex justify-between text-sm">
                    <span className="text-[#6B6B8A]">{s.label}</span>
                    <span className="font-mono-dm text-[#1A1A2E] text-right">{s.value}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <div className="text-[11px] uppercase tracking-[0.08em] text-[#9494B0] mb-4 font-semibold">Multi-Chain Advantages</div>
              <div className="space-y-3">
                {[
                  { icon: '⚡', title: 'Lower Costs', desc: '94% savings via Solana routing' },
                  { icon: '🔒', title: 'Better Privacy', desc: 'Avalanche subnet isolation' },
                  { icon: '🌐', title: 'Broader Liquidity', desc: 'Ethereum bridge access' },
                  { icon: '🔄', title: 'Future-Proof', desc: 'Extensible to new chains' },
                ].map(a => (
                  <div key={a.title} className="flex gap-3 items-start">
                    <span className="text-base">{a.icon}</span>
                    <div>
                      <div className="text-sm text-[#1A1A2E] font-medium">{a.title}</div>
                      <div className="text-[11px] text-[#9494B0]">{a.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <CompliancePanel />
          </div>
        </div>
      </PortalLayout>
    );
  };

  const TradeModal = () => {
    if (modal !== 'trade') return null;
    const { artwork, mode } = modalData;
    const price = artwork?.price || 720;
    const maxQty = mode === 'sell' ? (artwork?.shares || 12) : 100;
    const sub = tradeQty * price;
    const fee = sub * 0.005;
    const total = sub + (mode === 'buy' ? fee : -fee);

    return (
      <ModalWrap>
        <h3 className="font-serif-dm text-[22px] text-[#1A1A2E]">{mode === 'buy' ? 'Buy' : 'Sell'} shares</h3>
        <p className="text-[12px] text-[#9494B0] mb-5">{artwork?.title} · ${price}/share</p>

        <div className="flex items-center gap-4 mb-5">
          <button className="w-8 h-8 rounded-lg bg-[#F0F0F5] text-[#1A1A2E] border border-[rgba(0,0,0,0.08)] flex items-center justify-center hover:bg-[#E5E5EC]"
            onClick={() => setTradeQty(Math.max(1, tradeQty - 1))}>−</button>
          <span className="font-mono-dm text-2xl font-bold text-[#1A1A2E] w-12 text-center">{tradeQty}</span>
          <button className="w-8 h-8 rounded-lg bg-[#F0F0F5] text-[#1A1A2E] border border-[rgba(0,0,0,0.08)] flex items-center justify-center hover:bg-[#E5E5EC]"
            onClick={() => setTradeQty(Math.min(maxQty, tradeQty + 1))}>+</button>
        </div>

        <div className="border-t border-[rgba(0,0,0,0.08)] pt-4 space-y-2">
          <div className="flex justify-between text-sm"><span className="text-[#6B6B8A]">Subtotal</span><span className="font-mono-dm text-[#1A1A2E]">${sub.toLocaleString()}</span></div>
          <div className="flex justify-between text-sm"><span className="text-[#6B6B8A]">Fee (0.5%)</span><span className="font-mono-dm text-[#6B6B8A]">${fee.toFixed(2)}</span></div>
          <div className="flex justify-between text-sm font-bold pt-2 border-t border-[rgba(0,0,0,0.08)]">
            <span className="text-[#1A1A2E]">Total</span><span className="font-mono-dm text-[#1A1A2E]">${total.toFixed(2)}</span>
          </div>
        </div>

        {mode === 'buy' && (
          <div className="bg-[rgba(124,92,252,0.08)] rounded-lg p-3 mt-4 text-xs text-[#7C5CFC]">
            You will receive {tradeQty * 10} PSG governance tokens with this purchase.
          </div>
        )}

        {orderConfirmed && (
          <div className="bg-[rgba(5,150,105,0.1)] border border-[rgba(5,150,105,0.15)] rounded-lg p-3 mt-3 text-sm text-[#059669] screen-enter">
            ✓ Order confirmed · Tokens allocated on settlement
          </div>
        )}

        <div className="flex gap-3 mt-5">
          <Btn variant="ghost" className="flex-1" onClick={() => setModal(null)}>Cancel</Btn>
          <Btn className="flex-1" onClick={confirmOrder} disabled={orderConfirmed}>{mode === 'buy' ? 'Confirm purchase' : 'Confirm sale'}</Btn>
        </div>
      </ModalWrap>
    );
  };

  const TokenTradeModal = () => {
    if (modal !== 'token') return null;
    const { art } = modalData;
    const tm = TOKEN_MARKETS.find(t => t.art === art) || TOKEN_MARKETS[0];
    const askPrice = (tm.price + 0.05).toFixed(2);
    const bidPrice = tm.price.toFixed(2);
    const price = tokenTab === 'buy' ? parseFloat(askPrice) : parseFloat(bidPrice);
    const sub = tokenQty * price;
    const fee = sub * 0.005;

    return (
      <ModalWrap width={420}>
        <h3 className="font-serif-dm text-[22px] text-[#1A1A2E]">Trade PSG tokens</h3>
        <p className="text-[12px] text-[#9494B0] mb-4">{art} · Current: ${tm.price.toFixed(2)} · Balance: {tm.bal}</p>

        <div className="flex bg-[#F0F0F5] rounded-lg p-0.5 mb-5">
          {['buy', 'sell'].map(t => (
            <button key={t} className={`flex-1 py-2 rounded-md text-sm font-medium capitalize transition-all ${
              tokenTab === t ? 'bg-[rgba(124,92,252,0.1)] text-[#7C5CFC]' : 'text-[#9494B0]'
            }`} onClick={() => setTokenTab(t)}>{t} tokens</button>
          ))}
        </div>

        <div className="text-xs text-[#9494B0] mb-2">{tokenTab === 'buy' ? 'Ask' : 'Bid'} price: <span className="font-mono-dm text-[#1A1A2E]">${tokenTab === 'buy' ? askPrice : bidPrice}</span></div>

        <div className="flex items-center gap-4 mb-5">
          <button className="w-8 h-8 rounded-lg bg-[#F0F0F5] text-[#1A1A2E] border border-[rgba(0,0,0,0.08)] flex items-center justify-center hover:bg-[#E5E5EC]"
            onClick={() => setTokenQty(Math.max(10, tokenQty - 10))}>−</button>
          <span className="font-mono-dm text-2xl font-bold text-[#1A1A2E] w-12 text-center">{tokenQty}</span>
          <button className="w-8 h-8 rounded-lg bg-[#F0F0F5] text-[#1A1A2E] border border-[rgba(0,0,0,0.08)] flex items-center justify-center hover:bg-[#E5E5EC]"
            onClick={() => setTokenQty(Math.min(tokenTab === 'sell' ? tm.bal : 500, tokenQty + 10))}>+</button>
        </div>

        <div className="border-t border-[rgba(0,0,0,0.08)] pt-4 space-y-2">
          <div className="flex justify-between text-sm"><span className="text-[#6B6B8A]">Subtotal</span><span className="font-mono-dm text-[#1A1A2E]">${sub.toFixed(2)}</span></div>
          <div className="flex justify-between text-sm"><span className="text-[#6B6B8A]">Fee (0.5%)</span><span className="font-mono-dm text-[#6B6B8A]">${fee.toFixed(2)}</span></div>
          <div className="flex justify-between text-sm font-bold pt-2 border-t border-[rgba(0,0,0,0.08)]">
            <span className="text-[#1A1A2E]">{tokenTab === 'buy' ? 'Total' : 'You receive'}</span>
            <span className="font-mono-dm text-[#1A1A2E]">${(tokenTab === 'buy' ? sub + fee : sub - fee).toFixed(2)}</span>
          </div>
        </div>

        <div className={`rounded-lg p-3 mt-4 text-xs ${tokenTab === 'buy' ? 'bg-[rgba(124,92,252,0.08)] text-[#7C5CFC]' : 'bg-[rgba(217,119,6,0.08)] text-[#D97706]'}`}>
          {tokenTab === 'buy' ? "Buying tokens increases your voting weight on this artwork's proposals." : "Selling tokens reduces your voting weight. Rights transfer to buyer immediately."}
        </div>

        {orderConfirmed && (
          <div className="bg-[rgba(5,150,105,0.1)] border border-[rgba(5,150,105,0.15)] rounded-lg p-3 mt-3 text-sm text-[#059669] screen-enter">
            ✓ Order placed · Settlement within 1 business day
          </div>
        )}

        <div className="flex gap-3 mt-5">
          <Btn variant="ghost" className="flex-1" onClick={() => setModal(null)}>Cancel</Btn>
          <Btn className="flex-1" onClick={confirmOrder} disabled={orderConfirmed}>Confirm {tokenTab}</Btn>
        </div>
      </ModalWrap>
    );
  };

  const NewProposalModal = () => {
    if (modal !== 'new-proposal') return null;
    return (
      <ModalWrap width={460}>
        <h3 className="font-serif-dm text-[22px] text-[#1A1A2E] mb-5">Create Stakeholder Proposal</h3>
        <div className="space-y-4">
          <div>
            <label className="text-[11px] uppercase tracking-[0.08em] font-semibold text-[#9494B0] block mb-2">Title</label>
            <input className="w-full bg-[#F0F0F5] border border-[rgba(0,0,0,0.08)] rounded-lg px-3.5 py-2.5 text-sm text-[#1A1A2E] focus:outline-none focus:border-[#10B981]"
              value={npTitle} onChange={e => setNpTitle(e.target.value)} placeholder="Proposal title..." />
          </div>
          <div>
            <label className="text-[11px] uppercase tracking-[0.08em] font-semibold text-[#9494B0] block mb-2">Description</label>
            <textarea className="w-full bg-[#F0F0F5] border border-[rgba(0,0,0,0.08)] rounded-lg px-3.5 py-2.5 text-sm text-[#1A1A2E] focus:outline-none focus:border-[#10B981] resize-none"
              rows={3} value={npDesc} onChange={e => setNpDesc(e.target.value)} placeholder="Describe the proposal..." />
          </div>
          <div>
            <label className="text-[11px] uppercase tracking-[0.08em] font-semibold text-[#9494B0] block mb-2">Artwork</label>
            <select className="w-full bg-[#F0F0F5] border border-[rgba(0,0,0,0.08)] rounded-lg px-3.5 py-2.5 text-sm text-[#1A1A2E] focus:outline-none"
              value={npArt} onChange={e => setNpArt(e.target.value)}>
              {ARTWORKS.map(a => <option key={a.id} value={a.title}>{a.title}</option>)}
            </select>
          </div>
          <div>
            <label className="text-[11px] uppercase tracking-[0.08em] font-semibold text-[#9494B0] block mb-2">Voting Window</label>
            <div className="flex bg-[#F0F0F5] rounded-lg p-0.5">
              {['7 days', '14 days', '30 days'].map(w => (
                <button key={w} className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${npWindow === w ? 'bg-[rgba(16,185,129,0.1)] text-[#10B981]' : 'text-[#9494B0]'}`}
                  onClick={() => setNpWindow(w)}>{w}</button>
              ))}
            </div>
          </div>
        </div>

        {orderConfirmed && (
          <div className="bg-[rgba(5,150,105,0.1)] border border-[rgba(5,150,105,0.15)] rounded-lg p-3 mt-4 text-sm text-[#059669] screen-enter">
            ✓ Proposal published to all token holders
          </div>
        )}

        <div className="flex gap-3 mt-5">
          <Btn variant="ghost" className="flex-1" onClick={() => setModal(null)}>Cancel</Btn>
          <Btn portal="mus" className="flex-1" onClick={confirmOrder} disabled={orderConfirmed}>Publish proposal</Btn>
        </div>
      </ModalWrap>
    );
  };

  const ModalWrap = ({ children, width = 400 }: { children: React.ReactNode; width?: number }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={() => !orderConfirmed && setModal(null)}>
      <div className="absolute inset-0 bg-[rgba(0,0,0,0.3)] backdrop-blur-sm" />
      <div className="relative modal-enter bg-[#FFFFFF] border border-[rgba(0,0,0,0.08)] rounded-2xl p-6"
        style={{ width, maxWidth: '90vw', boxShadow: '0 24px 80px rgba(0,0,0,0.15)' }}
        onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );

  // ─── Render ──────────────────────────────

  const renderScreen = () => {
    switch (screen) {
      case 'role-select': return <ScreenWrap key="role"><RoleSelect /></ScreenWrap>;
      case 'inv-login': return <ScreenWrap key="inv-login"><LoginScreen isMuseum={false} /></ScreenWrap>;
      case 'mus-login': return <ScreenWrap key="mus-login"><LoginScreen isMuseum={true} /></ScreenWrap>;
      case 'inv-dash': return <InvDash />;
      case 'inv-holdings': return <InvHoldings />;
      case 'artwork-detail': return <ArtworkDetail />;
      case 'marketplace': return <Marketplace />;
      case 'mkt-detail': return <MktDetail />;
      case 'inv-secondary': return <SecondaryMarket />;
      case 'inv-analytics': return <InvAnalytics />;
      case 'inv-gov': return <InvGov />;
      case 'token-market': return <TokenMarket />;
      case 'inv-chain': return <InvChain />;
      case 'mus-dash': return <MusDash />;
      case 'mus-management': return <MusManagement />;
      case 'mus-legal': return <MusLegal />;
      case 'mus-engagement': return <MusEngagement />;
      case 'mus-gov': return <MusGov />;
      case 'mus-security': return <MusSecurity />;
      case 'mus-chain': return <MusChain />;
      default: return <RoleSelect />;
    }
  };

  return (
    <div className="noise-bg min-h-screen bg-[#F8F8FC]">
      {renderScreen()}
      <TradeModal />
      <TokenTradeModal />
      <NewProposalModal />
    </div>
  );
}
