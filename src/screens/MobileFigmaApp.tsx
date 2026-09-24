import { useState, useEffect, useRef, type ReactNode } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

export type MobileScreen =
  | "splash"
  | "login"
  | "home"
  | "requests"
  | "request-form"
  | "request-submitted"
  | "blocks"
  | "block-detail"
  | "active-work"
  | "complete-work"
  | "report-issue"
  | "notifications"
  | "profile"
  | "tasks";

export type NavTab = "home" | "requests" | "blocks" | "tasks" | "profile";
export type Role = "supervisor" | "engineer";

interface MobileFigmaAppProps {
  initialRole?: Role;
  initialScreen?: MobileScreen;
  onExitToCentralPortal?: () => void;
  onLogout?: () => void;
}

// ─── Splash Screen ────────────────────────────────────────────────────────────

function SplashScreen({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timings = [0, 900, 1700, 2500, 3200, 4000];
    const timers = timings.map((t, i) => setTimeout(() => setPhase(i + 1), t));
    const done = setTimeout(onDone, 5200);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(done);
    };
  }, [onDone]);

  const vis = (show: boolean) => ({
    opacity: show ? 1 : 0,
    transform: `translateY(${show ? 0 : 14}px)`,
    transition: "opacity 0.65s ease, transform 0.65s ease",
    position: "absolute" as const,
    width: "100%",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
  });

  return (
    <div className="flex flex-col items-center justify-center h-full bg-[#FAFBFC] relative overflow-hidden select-none">
      {/* Top tricolor accent */}
      <div className="absolute top-0 left-0 right-0 flex h-[3px]">
        <div className="flex-1 bg-[#F28C28]" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-[#138A4B]" />
      </div>

      <div
        style={{
          position: "relative",
          width: "100%",
          height: 220,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Phase 1: नमस्ते */}
        <div style={vis(phase === 1 || phase === 2)}>
          <p className="font-devanagari text-6xl font-light text-[#0B2545] tracking-wide">
            नमस्ते
          </p>
          <div
            className="mt-5 flex h-[2px] overflow-hidden rounded-full"
            style={{ width: 120, opacity: phase >= 2 ? 1 : 0, transition: "opacity 0.5s ease 0.3s" }}
          >
            <div className="flex-1 bg-[#F28C28]" />
            <div className="flex-1 bg-white border-y border-[#E2E8F0]" />
            <div className="flex-1 bg-[#138A4B]" />
          </div>
        </div>

        {/* Phase 2: वन्दे मातरम् */}
        <div style={vis(phase === 3)}>
          <p className="font-devanagari text-3xl font-light text-[#0B2545] tracking-widest">
            वन्दे मातरम्
          </p>
        </div>

        {/* Phase 3: TRACKSYNC */}
        <div style={vis(phase === 4)}>
          <div className="flex items-center gap-2.5 mb-2">
            <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill="#123B66" />
              <path d="M6 22 L10 18 L14 20 L18 14 L22 16 L26 10" stroke="#F28C28" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <rect x="8" y="24" width="16" height="2.5" rx="1.25" fill="#138A4B" />
            </svg>
            <span className="text-2xl font-bold tracking-[0.14em] text-[#0B2545]">TRACKSYNC</span>
          </div>
          <p className="text-sm text-[#64748B] font-medium tracking-wide text-center">
            AI-Powered Maintenance Block Planning
          </p>
        </div>

        {/* Phase 4: Tagline */}
        <div style={vis(phase >= 5)}>
          <div className="flex items-center gap-2.5 mb-3">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill="#123B66" />
              <path d="M6 22 L10 18 L14 20 L18 14 L22 16 L26 10" stroke="#F28C28" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <rect x="8" y="24" width="16" height="2.5" rx="1.25" fill="#138A4B" />
            </svg>
            <span className="text-xl font-bold tracking-[0.14em] text-[#0B2545]">TRACKSYNC</span>
          </div>
          <p className="text-base text-[#17202A] font-medium text-center leading-relaxed">
            Plan smarter. Maintain safer.
            <br />
            Keep trains moving.
          </p>
        </div>
      </div>

      {/* Phase 5: Railway track animation leads out */}
      {phase >= 5 && (
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{ height: 60, overflow: "hidden" }}
        >
          <svg
            width="100%"
            height="60"
            viewBox="0 0 390 60"
            preserveAspectRatio="none"
            style={{ opacity: phase >= 5 ? 1 : 0, transition: "opacity 0.5s" }}
          >
            {/* Rails */}
            <line x1="0" y1="20" x2="390" y2="20" stroke="#E2E8F0" strokeWidth="3" />
            <line x1="0" y1="40" x2="390" y2="40" stroke="#E2E8F0" strokeWidth="3" />
            {/* Sleepers */}
            {Array.from({ length: 14 }, (_, i) => (
              <rect
                key={i}
                x={i * 30 - 10}
                y="14"
                width="16"
                height="32"
                rx="2"
                fill="#CBD5E1"
                style={{
                  animation: `slideSleeper 0.8s ease forwards`,
                  animationDelay: `${i * 0.05}s`,
                }}
              />
            ))}
            {/* Saffron train indicator line */}
            <line
              x1="-60"
              y1="30"
              x2="60"
              y2="30"
              stroke="#F28C28"
              strokeWidth="4"
              strokeLinecap="round"
              style={{ animation: "trainSlide 1.2s ease-in forwards" }}
            />
          </svg>
          <style>{`
            @keyframes trainSlide {
              from { transform: translateX(-60px); }
              to   { transform: translateX(450px); }
            }
          `}</style>
        </div>
      )}

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 flex h-[1px] opacity-30">
        <div className="flex-1 bg-[#F28C28]" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-[#138A4B]" />
      </div>
    </div>
  );
}

// ─── Login Screen ─────────────────────────────────────────────────────────────

function LoginScreen({
  onLogin,
}: {
  onLogin: (role: Role) => void;
}) {
  const [role, setRole] = useState<Role>("supervisor");
  const [empId, setEmpId] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex flex-col h-full bg-[#F7F9FC]">
      {/* Top accent */}
      <div className="flex h-[3px]">
        <div className="flex-1 bg-[#F28C28]" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-[#138A4B]" />
      </div>

      <div className="flex-1 flex flex-col px-6 py-8 overflow-y-auto scroll-hide">
        {/* Logo + title */}
        <div className="flex flex-col items-center mb-10 mt-4">
          <div className="flex items-center gap-2.5 mb-3">
            <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill="#123B66" />
              <path d="M6 22 L10 18 L14 20 L18 14 L22 16 L26 10" stroke="#F28C28" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <rect x="8" y="24" width="16" height="2.5" rx="1.25" fill="#138A4B" />
            </svg>
            <span className="text-2xl font-bold tracking-[0.14em] text-[#0B2545]">TRACKSYNC</span>
          </div>
          <p className="text-sm text-[#64748B] text-center">
            Railway maintenance, coordinated.
          </p>
        </div>

        {/* Role selector */}
        <div className="mb-6">
          <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-2">
            Sign in as
          </p>
          <div
            className="flex rounded-xl overflow-hidden border border-[#E2E8F0] p-1 gap-1"
            style={{ background: "#F1F5F9" }}
          >
            {(["supervisor", "engineer"] as Role[]).map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className="flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all"
                style={
                  role === r
                    ? { background: "#123B66", color: "white", boxShadow: "0 2px 6px rgba(18,59,102,0.2)" }
                    : { background: "transparent", color: "#64748B" }
                }
              >
                {r === "supervisor" ? "Supervisor" : "Field Engineer"}
              </button>
            ))}
          </div>
        </div>

        {/* Fields */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-xs font-semibold text-[#64748B] mb-1.5">
              Employee ID
            </label>
            <input
              type="text"
              value={empId}
              onChange={(e) => setEmpId(e.target.value)}
              placeholder="e.g., EMP-2841"
              className="w-full px-4 py-3.5 rounded-xl border border-[#E2E8F0] bg-white text-sm text-[#17202A] outline-none focus:border-[#123B66] transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#64748B] mb-1.5">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-3.5 rounded-xl border border-[#E2E8F0] bg-white text-sm text-[#17202A] outline-none focus:border-[#123B66] transition-colors"
            />
          </div>
        </div>

        {/* Sign In CTA */}
        <button
          onClick={() => onLogin(role)}
          className="w-full py-4 rounded-2xl text-white font-bold text-base mb-4 shadow-md cursor-pointer"
          style={{ background: "linear-gradient(135deg, #123B66, #1769AA)" }}
        >
          Sign In
        </button>

        <button className="w-full py-3 text-sm text-[#1769AA] font-medium cursor-pointer">
          Need help?
        </button>

        {/* Footer */}
        <div className="mt-auto pt-8 text-center">
          <p className="text-[11px] text-[#94A3B8]">Authorized railway personnel only</p>
          <p className="text-[10px] text-[#CBD5E1] mt-1 font-mono-data">
            TRACKSYNC v2.0.1 · Indian Railways
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Bottom Navigation ────────────────────────────────────────────────────────

function BottomNav({
  active,
  onNav,
}: {
  active: NavTab;
  onNav: (t: NavTab) => void;
}) {
  const tabs: { id: NavTab; label: string; icon: ReactNode }[] = [
    {
      id: "home",
      label: "Home",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
    },
    {
      id: "requests",
      label: "Requests",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="12" y1="18" x2="12" y2="12" />
          <line x1="9" y1="15" x2="15" y2="15" />
        </svg>
      ),
    },
    {
      id: "blocks",
      label: "Blocks",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18M9 21V9" />
        </svg>
      ),
    },
    {
      id: "tasks",
      label: "Tasks",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 11 12 14 22 4" />
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
        </svg>
      ),
    },
    {
      id: "profile",
      label: "Profile",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex bg-white border-t border-[#E2E8F0] relative">
      {tabs.map((tab) => {
        const isActive = active === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onNav(tab.id)}
            className="flex-1 flex flex-col items-center justify-center py-2 gap-0.5 min-h-[56px] transition-colors cursor-pointer"
            style={{ color: isActive ? "#123B66" : "#94A3B8" }}
          >
            {tab.icon}
            <span className="text-[10px] font-medium" style={{ color: isActive ? "#123B66" : "#94A3B8" }}>
              {tab.label}
            </span>
            {isActive && (
              <span
                className="absolute bottom-0 w-8 h-0.5 rounded-t-full"
                style={{ background: "#F28C28" }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

// ─── Shared Components ────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { bg: string; text: string; dot: string }> = {
    APPROVED: { bg: "#DCFCE7", text: "#138A4B", dot: "#138A4B" },
    "AI Analysis Pending": { bg: "#FEF3C7", text: "#B45309", dot: "#F28C28" },
    "Planner Review": { bg: "#DBEAFE", text: "#1769AA", dot: "#1769AA" },
    "WORK IN PROGRESS": { bg: "#FFF7ED", text: "#C2410C", dot: "#F28C28" },
    "READY TO START": { bg: "#ECFDF5", text: "#138A4B", dot: "#138A4B" },
    COMPLETED: { bg: "#F1F5F9", text: "#475569", dot: "#94A3B8" },
    REJECTED: { bg: "#FEE2E2", text: "#DC2626", dot: "#DC2626" },
    Pending: { bg: "#FEF3C7", text: "#B45309", dot: "#F28C28" },
  };
  const s = map[status] || { bg: "#F1F5F9", text: "#475569", dot: "#94A3B8" };
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
      style={{ background: s.bg, color: s.text }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.dot }} />
      {status}
    </span>
  );
}

function PageHeader({
  title,
  subtitle,
  onBack,
  action,
}: {
  title: string | ReactNode;
  subtitle?: string;
  onBack?: () => void;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 px-4 py-4 bg-white border-b border-[#E2E8F0]">
      {onBack && (
        <button
          onClick={onBack}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-[#F7F9FC] text-[#123B66] cursor-pointer"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      )}
      <div className="flex-1 min-w-0">
        <div className="text-base font-bold text-[#17202A] truncate">{title}</div>
        {subtitle && <div className="text-xs text-[#64748B] mt-0.5">{subtitle}</div>}
      </div>
      {action}
    </div>
  );
}

// ─── Supervisor Home ──────────────────────────────────────────────────────────

function SupervisorHome({
  onNavigate,
}: {
  onNavigate: (s: MobileScreen) => void;
}) {
  return (
    <div className="flex-1 overflow-y-auto scroll-hide bg-[#F7F9FC]">
      {/* Header */}
      <div
        className="px-5 pt-6 pb-7"
        style={{ background: "linear-gradient(160deg, #0B2545 0%, #123B66 100%)" }}
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="font-devanagari text-2xl font-medium text-white leading-snug">
              नमस्ते, Supervisor
            </p>
            <p className="text-sm text-blue-200 mt-1">
              Good morning. What would you like to do?
            </p>
          </div>
          <button
            onClick={() => onNavigate("notifications")}
            className="relative w-10 h-10 flex items-center justify-center rounded-full bg-white/10 mt-0.5 cursor-pointer"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#F28C28] rounded-full" />
          </button>
        </div>
      </div>

      <div className="px-5 -mt-4 space-y-4 pb-6">
        {/* Primary CTA — Apply for Block */}
        <button
          onClick={() => onNavigate("request-form")}
          className="w-full rounded-2xl overflow-hidden shadow-lg cursor-pointer text-left"
          style={{ background: "linear-gradient(135deg, #F28C28 0%, #E07B1A 100%)" }}
        >
          <div className="px-5 py-5 flex items-center justify-between">
            <div className="text-left">
              <p className="text-white text-xs font-medium opacity-80 mb-0.5">
                PRIMARY ACTION
              </p>
              <p className="text-white text-xl font-bold leading-tight">
                Apply for Maintenance Block
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </div>
          </div>
          {/* subtle rail graphic */}
          <div className="flex h-1 opacity-30">
            <div className="flex-1 bg-white/40" />
            <div className="flex-1 bg-white/20" />
            <div className="flex-1 bg-white/40" />
          </div>
        </button>

        {/* Secondary quick actions */}
        <div className="grid grid-cols-3 gap-3">
          {[
            {
              label: "My Requests",
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1769AA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
              ),
              screen: "requests" as MobileScreen,
            },
            {
              label: "Approved Blocks",
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#138A4B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M3 9h18M9 21V9" />
                </svg>
              ),
              screen: "blocks" as MobileScreen,
            },
            {
              label: "Today's Work",
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F28C28" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 11 12 14 22 4" />
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                </svg>
              ),
              screen: "tasks" as MobileScreen,
            },
          ].map((a) => (
            <button
              key={a.label}
              onClick={() => onNavigate(a.screen)}
              className="flex flex-col items-center gap-2 py-4 px-2 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm cursor-pointer"
            >
              {a.icon}
              <span className="text-[11px] font-semibold text-[#17202A] text-center leading-tight">
                {a.label}
              </span>
            </button>
          ))}
        </div>

        {/* Next Block — compact */}
        <div>
          <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-2">
            Next Block
          </p>
          <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
            <div className="h-1 bg-[#138A4B]" />
            <div className="px-4 py-4 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-mono-data text-xl font-bold text-[#0B2545]">B014</span>
                  <StatusBadge status="APPROVED" />
                </div>
                <p className="text-sm text-[#64748B]">A–B Section</p>
                <div className="flex gap-1.5 mt-2">
                  {["Engineering", "S&T", "Traction"].map((d) => (
                    <span
                      key={d}
                      className="text-[10px] font-medium px-1.5 py-0.5 rounded-md"
                      style={{ background: "#EFF6FF", color: "#1769AA" }}
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-[#64748B]">18 Sep</p>
                <p className="font-mono-data text-base font-bold text-[#17202A] mt-0.5">
                  22:00
                </p>
                <p className="font-mono-data text-xs text-[#64748B]">– 00:30</p>
                <button
                  onClick={() => onNavigate("block-detail")}
                  className="mt-2 text-xs font-semibold text-[#1769AA] cursor-pointer"
                >
                  View →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Attention banner */}
        <div
          className="rounded-2xl px-4 py-3 flex items-center gap-3"
          style={{ background: "#FFF7ED" }}
        >
          <div className="w-8 h-8 rounded-xl bg-[#F28C28]/15 flex items-center justify-center flex-shrink-0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F28C28" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-[#92400E]">Needs Attention</p>
            <p className="text-xs text-[#B45309] mt-0.5">BR-1024 pending planner review</p>
          </div>
          <button
            onClick={() => onNavigate("requests")}
            className="text-xs font-semibold text-[#F28C28] flex-shrink-0 cursor-pointer"
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Field Engineer Home ──────────────────────────────────────────────────────

function EngineerHome({
  onNavigate,
}: {
  onNavigate: (s: MobileScreen) => void;
}) {
  const prioColor: Record<string, string> = {
    High: "#DC2626",
    Medium: "#F28C28",
    Low: "#138A4B",
  };

  const tasks = [
    { id: "T-041", label: "Track Inspection", status: "Pending", priority: "High", time: "22:00–23:30" },
    { id: "T-042", label: "OHE Visual Check", status: "Pending", priority: "Medium", time: "23:30–00:30" },
    { id: "T-043", label: "Signal Inspection", status: "COMPLETED", priority: "Low", time: "01:00–02:00" },
  ];

  return (
    <div className="flex-1 overflow-y-auto scroll-hide bg-[#F7F9FC]">
      {/* Header */}
      <div
        className="px-5 pt-6 pb-5"
        style={{ background: "linear-gradient(160deg, #0B2545 0%, #123B66 100%)" }}
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="font-devanagari text-2xl font-medium text-white leading-snug">
              नमस्ते, Engineer
            </p>
            <p className="text-sm text-blue-200 mt-1">Your field work for today</p>
          </div>
          <button
            onClick={() => onNavigate("notifications")}
            className="relative w-10 h-10 flex items-center justify-center rounded-full bg-white/10 cursor-pointer"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#F28C28] rounded-full" />
          </button>
        </div>
      </div>

      <div className="px-5 -mt-2 space-y-4 pb-6 pt-3">
        {/* Next Task — hero card */}
        <div>
          <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-2">
            Next Task
          </p>
          <div
            className="rounded-2xl overflow-hidden shadow-lg"
            style={{ background: "linear-gradient(135deg, #0B2545 0%, #1769AA 100%)" }}
          >
            <div className="px-5 pt-5 pb-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold mb-2"
                    style={{ background: "#DC262620", color: "#FCA5A5" }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FCA5A5]" />
                    High Priority
                  </span>
                  <p className="text-white text-xl font-bold leading-tight">
                    Track Inspection
                  </p>
                </div>
                <div className="font-mono-data text-right">
                  <p className="text-blue-200 text-xs">22:00</p>
                  <p className="text-blue-300 text-xs">–23:30</p>
                </div>
              </div>
              <div className="flex flex-col gap-1 mb-4">
                <p className="text-sm text-blue-200 flex items-center gap-1.5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  A–B Section
                </p>
                <p className="text-sm text-blue-300 font-mono-data pl-[18px]">
                  KM 42+300
                </p>
              </div>
              <button
                onClick={() => onNavigate("active-work")}
                className="w-full py-3.5 rounded-xl text-sm font-bold text-[#0B2545] cursor-pointer"
                style={{ background: "white" }}
              >
                View Task
              </button>
            </div>
          </div>
        </div>

        {/* Today's task list */}
        <div>
          <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-2">
            Today
          </p>
          <div className="space-y-2">
            {tasks.map((t) => (
              <button
                key={t.id}
                onClick={() => onNavigate("active-work")}
                className="w-full bg-white rounded-xl border border-[#E2E8F0] flex items-center gap-3 px-4 py-3.5 text-left cursor-pointer"
              >
                <div
                  className="w-1 self-stretch rounded-full"
                  style={{ background: prioColor[t.priority] }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#17202A]">{t.label}</p>
                  <p className="text-xs text-[#94A3B8] font-mono-data mt-0.5">{t.time}</p>
                </div>
                <StatusBadge status={t.status} />
              </button>
            ))}
          </div>
        </div>

        {/* Report Issue shortcut */}
        <button
          onClick={() => onNavigate("report-issue")}
          className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 border-[#FEE2E2] text-left cursor-pointer"
          style={{ background: "#FFF5F5" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          <span className="text-sm font-semibold text-[#DC2626]">Report a Field Issue</span>
        </button>
      </div>
    </div>
  );
}

// ─── My Requests Screen ───────────────────────────────────────────────────────

function RequestsScreen({ onNavigate }: { onNavigate: (s: MobileScreen) => void }) {
  const [filter, setFilter] = useState("All");
  const filters = ["All", "Pending", "Approved", "Rejected", "Completed"];

  const requests = [
    { id: "BR-1024", dept: "Engineering", activity: "Track Repair", location: "A–B Section", date: "18 Sep", time: "22:00–00:30", status: "Planner Review" },
    { id: "BR-1021", dept: "S&T", activity: "Signal Inspection", location: "B–C Section", date: "17 Sep", time: "01:00–03:00", status: "APPROVED" },
    { id: "BR-1018", dept: "Traction", activity: "OHE Repair", location: "C–D Section", date: "15 Sep", time: "23:30–02:30", status: "COMPLETED" },
    { id: "BR-1012", dept: "Engineering", activity: "Welding", location: "A Section, KM 38", date: "10 Sep", time: "01:00–04:00", status: "REJECTED" },
  ];

  const statusMap: Record<string, string> = {
    "Planner Review": "Pending",
    "AI Analysis Pending": "Pending",
    APPROVED: "Approved",
    REJECTED: "Rejected",
    COMPLETED: "Completed",
  };

  const filtered =
    filter === "All"
      ? requests
      : requests.filter((r) => statusMap[r.status] === filter);

  return (
    <div className="flex flex-col h-full">
      <div className="bg-white border-b border-[#E2E8F0] px-4 pt-4 pb-0">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-lg font-bold text-[#17202A]">My Requests</p>
            <p className="text-xs text-[#64748B]">{filtered.length} request{filtered.length !== 1 ? "s" : ""}</p>
          </div>
          <button
            onClick={() => onNavigate("request-form")}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-white text-xs font-semibold cursor-pointer"
            style={{ background: "#F28C28" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            New
          </button>
        </div>
        <div className="flex gap-2 overflow-x-auto scroll-hide pb-3">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer"
              style={
                filter === f
                  ? { background: "#123B66", color: "white" }
                  : { background: "#F1F5F9", color: "#64748B" }
              }
            >
              {f}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto scroll-hide px-4 py-3 space-y-3 bg-[#F7F9FC]">
        {filtered.map((r) => (
          <div key={r.id} className="bg-white rounded-2xl p-4 border border-[#E2E8F0] shadow-sm">
            <div className="flex items-start justify-between mb-2">
              <div>
                <span className="font-mono-data text-base font-bold text-[#0B2545]">{r.id}</span>
                <p className="text-xs text-[#64748B] mt-0.5">{r.dept} · {r.activity}</p>
              </div>
              <StatusBadge status={r.status} />
            </div>
            <div className="flex gap-4 text-xs text-[#64748B] font-mono-data">
              <span>📍 {r.location}</span>
            </div>
            <div className="flex gap-4 text-xs text-[#94A3B8] font-mono-data mt-1">
              <span>📅 {r.date}</span>
              <span>⏱ {r.time}</span>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-16 text-[#94A3B8] text-sm">
            No {filter.toLowerCase()} requests
          </div>
        )}
        <div className="h-2" />
      </div>
    </div>
  );
}

// ─── Multi-step Request Form ──────────────────────────────────────────────────

const DEPT_ACTIVITIES: Record<string, string[]> = {
  Engineering: ["Inspection", "Preventive Maintenance", "Track Repair", "Track Replacement", "Welding", "Point & Crossing Maintenance", "Other"],
  "Signal & Telecom": ["Signal Inspection", "Signal Repair", "Track Circuit Maintenance", "Interlocking Maintenance", "Telecom Maintenance", "Cable Work", "Other"],
  Traction: ["OHE Inspection", "OHE Repair", "Electrical Maintenance", "Isolator Maintenance", "Transformer Maintenance", "Other"],
};

function RequestFormScreen({ onBack, onSubmit }: { onBack: () => void; onSubmit: () => void }) {
  const [step, setStep] = useState(1);
  const totalSteps = 12;
  const [form, setForm] = useState({
    dept: "", activity: "", division: "", section: "", fromStation: "", toStation: "", assetId: "",
    reason: "", safetyCritical: "", severity: "", overdue: "", overdueDays: "",
    pref1: "18 Sep", pref2: "19 Sep", pref3: "20 Sep",
    timeFrom: "22:00", timeTo: "00:30", anySuitableTime: false,
    duration: 90, buffer: 15,
    teamSize: "", equipment: "", safetyReq: "",
    coordination: [] as string[],
    description: "",
  });

  const update = (k: string, v: unknown) => setForm((p) => ({ ...p, [k]: v }));
  const activities = form.dept ? DEPT_ACTIVITIES[form.dept] || [] : [];

  const StepHeader = ({ title, hint }: { title: string; hint?: string }) => (
    <div className="mb-5">
      <p className="text-[10px] font-semibold text-[#64748B] uppercase tracking-wider mb-1">
        Step {step} of {totalSteps}
      </p>
      <p className="text-xl font-bold text-[#17202A]">{title}</p>
      {hint && <p className="text-sm text-[#64748B] mt-1">{hint}</p>}
    </div>
  );

  const SelectOption = ({ label, selected, onSelect, accentColor }: { label: string; selected: boolean; onSelect: () => void; accentColor?: string }) => {
    const color = accentColor || "#123B66";
    return (
      <button
        onClick={onSelect}
        className="w-full flex items-center justify-between px-4 py-4 rounded-xl border-2 text-left transition-all cursor-pointer"
        style={
          selected
            ? { borderColor: color, background: `${color}10`, color }
            : { borderColor: "#E2E8F0", background: "white", color: "#17202A" }
        }
      >
        <span className="text-sm font-semibold">{label}</span>
        {selected && (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </button>
    );
  };

  const InputField = ({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) => (
    <div className="mb-3">
      <label className="block text-xs font-semibold text-[#64748B] mb-1.5">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-white text-sm text-[#17202A] outline-none focus:border-[#123B66] transition-colors"
      />
    </div>
  );

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <StepHeader title="Select Department" />
            <div className="space-y-3">
              {Object.keys(DEPT_ACTIVITIES).map((d) => (
                <SelectOption key={d} label={d} selected={form.dept === d} onSelect={() => { update("dept", d); update("activity", ""); }} />
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div>
            <StepHeader title="Select Work Type" hint={form.dept || "Select a department first"} />
            <div className="space-y-2.5">
              {activities.map((a) => (
                <SelectOption key={a} label={a} selected={form.activity === a} onSelect={() => update("activity", a)} />
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div>
            <StepHeader title="Location" />
            <InputField label="Division" value={form.division} onChange={(v) => update("division", v)} placeholder="e.g., Nagpur Division" />
            <InputField label="Section / Corridor" value={form.section} onChange={(v) => update("section", v)} placeholder="e.g., A–B Section" />
            <InputField label="From Station" value={form.fromStation} onChange={(v) => update("fromStation", v)} placeholder="e.g., Station A" />
            <InputField label="To Station" value={form.toStation} onChange={(v) => update("toStation", v)} placeholder="e.g., Station B" />
            <InputField label="Asset ID" value={form.assetId} onChange={(v) => update("assetId", v)} placeholder="e.g., TRK-042-B" />
          </div>
        );

      case 4: {
        const reasons = ["Scheduled Maintenance", "Preventive Maintenance", "Defect Repair", "Emergency Repair", "Inspection", "Safety-related Work", "Overdue Maintenance"];
        return (
          <div>
            <StepHeader title="Why is the block required?" />
            <div className="space-y-2.5">
              {reasons.map((r) => (
                <SelectOption key={r} label={r} selected={form.reason === r} onSelect={() => update("reason", r)} />
              ))}
            </div>
          </div>
        );
      }

      case 5:
        return (
          <div>
            <StepHeader title="Criticality Information" />
            <div className="mb-4">
              <p className="text-xs font-semibold text-[#64748B] mb-2">Safety Critical</p>
              <div className="flex gap-2">
                {["Yes", "No"].map((v) => (
                  <button
                    key={v}
                    onClick={() => update("safetyCritical", v)}
                    className="flex-1 py-3.5 rounded-xl border-2 text-sm font-semibold transition-all cursor-pointer"
                    style={
                      form.safetyCritical === v
                        ? v === "Yes"
                          ? { borderColor: "#DC2626", background: "#FEF2F2", color: "#DC2626" }
                          : { borderColor: "#138A4B", background: "#F0FDF4", color: "#138A4B" }
                        : { borderColor: "#E2E8F0", background: "white", color: "#64748B" }
                    }
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <p className="text-xs font-semibold text-[#64748B] mb-2">Severity</p>
              <div className="grid grid-cols-2 gap-2">
                {[{ label: "Low", color: "#138A4B" }, { label: "Medium", color: "#F28C28" }, { label: "High", color: "#DC2626" }, { label: "Critical", color: "#7C3AED" }].map(({ label, color }) => (
                  <button
                    key={label}
                    onClick={() => update("severity", label)}
                    className="py-3.5 rounded-xl border-2 text-sm font-semibold transition-all cursor-pointer"
                    style={
                      form.severity === label
                        ? { borderColor: color, background: `${color}15`, color }
                        : { borderColor: "#E2E8F0", background: "white", color: "#64748B" }
                    }
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <p className="text-xs font-semibold text-[#64748B] mb-2">Overdue?</p>
              <div className="flex gap-2">
                {["Yes", "No"].map((v) => (
                  <button
                    key={v}
                    onClick={() => update("overdue", v)}
                    className="flex-1 py-3.5 rounded-xl border-2 text-sm font-semibold transition-all cursor-pointer"
                    style={
                      form.overdue === v
                        ? { borderColor: "#F28C28", background: "#FFF7ED", color: "#F28C28" }
                        : { borderColor: "#E2E8F0", background: "white", color: "#64748B" }
                    }
                  >
                    {v}
                  </button>
                ))}
              </div>
              {form.overdue === "Yes" && (
                <div className="mt-3">
                  <InputField label="Overdue Days" value={form.overdueDays} onChange={(v) => update("overdueDays", v)} placeholder="e.g., 14" />
                </div>
              )}
            </div>
            <div className="p-3.5 rounded-xl flex gap-2.5" style={{ background: "#EFF6FF" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1769AA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <p className="text-xs text-[#1769AA] font-medium">
                Final priority will be assessed by TrackSync AI.
              </p>
            </div>
          </div>
        );

      case 6: {
        const dates = ["17 Sep", "18 Sep", "19 Sep", "20 Sep", "21 Sep", "22 Sep", "23 Sep", "24 Sep", "25 Sep", "26 Sep", "27 Sep", "28 Sep"];
        const prefs = [{ key: "pref1", label: "1st Preference" }, { key: "pref2", label: "2nd Preference" }, { key: "pref3", label: "3rd Preference" }];
        return (
          <div>
            <StepHeader title="Preferred Date" hint="Select up to 3 preferences" />
            {prefs.map(({ key, label }) => (
              <div key={key} className="mb-4">
                <p className="text-xs font-semibold text-[#64748B] mb-2">{label}</p>
                <div className="flex gap-2 overflow-x-auto scroll-hide pb-1">
                  {dates.map((d) => (
                    <button
                      key={d}
                      onClick={() => update(key, d)}
                      className="flex-shrink-0 px-3 py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer"
                      style={
                        (form as Record<string, unknown>)[key] === d
                          ? { background: "#123B66", color: "white", borderColor: "#123B66" }
                          : { background: "white", color: "#17202A", borderColor: "#E2E8F0" }
                      }
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
      }

      case 7:
        return (
          <div>
            <StepHeader title="Preferred Time" />
            <div className="grid grid-cols-2 gap-3 mb-4">
              {[{ label: "From", key: "timeFrom" }, { label: "To", key: "timeTo" }].map(({ label, key }) => (
                <div key={key}>
                  <p className="text-xs font-semibold text-[#64748B] mb-1.5">{label}</p>
                  <input
                    type="time"
                    value={(form as Record<string, unknown>)[key] as string}
                    onChange={(e) => update(key, e.target.value)}
                    disabled={form.anySuitableTime}
                    className="w-full px-3 py-3 rounded-xl border border-[#E2E8F0] bg-white text-sm text-[#17202A] outline-none focus:border-[#123B66]"
                    style={form.anySuitableTime ? { opacity: 0.4 } : {}}
                  />
                </div>
              ))}
            </div>
            <button
              onClick={() => update("anySuitableTime", !form.anySuitableTime)}
              className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 transition-all cursor-pointer"
              style={form.anySuitableTime ? { borderColor: "#123B66", background: "#EFF6FF" } : { borderColor: "#E2E8F0", background: "white" }}
            >
              <div
                className="w-5 h-5 rounded border-2 flex items-center justify-center transition-all"
                style={form.anySuitableTime ? { borderColor: "#123B66", background: "#123B66" } : { borderColor: "#CBD5E1", background: "white" }}
              >
                {form.anySuitableTime && (
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="10 3 5 9 2 6" />
                  </svg>
                )}
              </div>
              <span className="text-sm font-medium text-[#17202A]">Any suitable time</span>
            </button>
          </div>
        );

      case 8: {
        const hrs = Math.floor(form.duration / 60);
        const mins = form.duration % 60;
        const durationLabel = hrs > 0 ? `${hrs}h${mins > 0 ? ` ${mins}m` : ""}` : `${mins}m`;
        const totalDuration = form.duration + form.buffer;
        const tHrs = Math.floor(totalDuration / 60);
        const tMins = totalDuration % 60;
        return (
          <div>
            <StepHeader title="Required Duration" />
            <div className="bg-white rounded-2xl p-5 border border-[#E2E8F0] mb-4">
              <p className="text-xs text-[#64748B] font-medium mb-2">Work Duration</p>
              <p className="font-mono-data text-4xl font-bold text-[#0B2545] mb-4">{durationLabel}</p>
              <div className="flex items-center justify-between text-xs text-[#94A3B8] mb-3">
                <span>30 min</span>
                <span>8 hours</span>
              </div>
              <input
                type="range"
                min={30}
                max={480}
                step={15}
                value={form.duration}
                onChange={(e) => update("duration", Number(e.target.value))}
                className="w-full cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #123B66 0%, #123B66 ${((form.duration - 30) / 450) * 100}%, #E2E8F0 ${((form.duration - 30) / 450) * 100}%, #E2E8F0 100%)`,
                }}
              />
            </div>
            <div className="mb-4">
              <p className="text-xs font-semibold text-[#64748B] mb-2">Safety / Setup Buffer</p>
              <div className="grid grid-cols-4 gap-2">
                {[15, 30, 45, 60].map((b) => (
                  <button
                    key={b}
                    onClick={() => update("buffer", b)}
                    className="py-3 rounded-xl border-2 text-xs font-semibold transition-all cursor-pointer"
                    style={form.buffer === b ? { borderColor: "#F28C28", background: "#FFF7ED", color: "#F28C28" } : { borderColor: "#E2E8F0", background: "white", color: "#64748B" }}
                  >
                    {b}m
                  </button>
                ))}
              </div>
            </div>
            <div className="p-4 rounded-2xl" style={{ background: "#0B2545" }}>
              <p className="text-xs text-blue-300 mb-1">Total Required Block Duration</p>
              <p className="font-mono-data text-2xl font-bold text-white">
                {tHrs}h {tMins > 0 ? `${tMins}m` : ""}
              </p>
              <p className="text-xs text-blue-400 mt-0.5">
                {durationLabel} work + {form.buffer} min buffer
              </p>
            </div>
          </div>
        );
      }

      case 9:
        return (
          <div>
            <StepHeader title="Resources" />
            <InputField label="Team Size" value={form.teamSize} onChange={(v) => update("teamSize", v)} placeholder="e.g., 6 engineers" />
            <InputField label="Equipment" value={form.equipment} onChange={(v) => update("equipment", v)} placeholder="e.g., Rail grinder, UT set" />
            <InputField label="Safety Requirements" value={form.safetyReq} onChange={(v) => update("safetyReq", v)} placeholder="e.g., Flagger, Emergency kit" />
          </div>
        );

      case 10:
        return (
          <div>
            <StepHeader title="Department Coordination" hint="Can this work be coordinated with another department?" />
            <div className="space-y-2.5 mb-5">
              {["Engineering", "S&T", "Traction"].map((d) => {
                const sel = form.coordination.includes(d);
                return (
                  <button
                    key={d}
                    onClick={() => {
                      const next = sel ? form.coordination.filter((x) => x !== d) : [...form.coordination, d];
                      update("coordination", next);
                    }}
                    className="w-full flex items-center justify-between px-4 py-4 rounded-xl border-2 text-left transition-all cursor-pointer"
                    style={sel ? { borderColor: "#1769AA", background: "#EFF6FF", color: "#1769AA" } : { borderColor: "#E2E8F0", background: "white", color: "#17202A" }}
                  >
                    <span className="text-sm font-semibold">{d}</span>
                    {sel && (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>
            <div className="p-3.5 rounded-xl flex gap-2.5" style={{ background: "#F0FDF4" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#138A4B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <p className="text-xs text-[#138A4B] font-medium">
                TrackSync AI may identify additional compatible maintenance work.
              </p>
            </div>
          </div>
        );

      case 11:
        return (
          <div>
            <StepHeader title="Description & Evidence" />
            <textarea
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              placeholder="Describe the maintenance work, observed defects, or any relevant details for the planner..."
              rows={5}
              className="w-full px-4 py-3 rounded-2xl border border-[#E2E8F0] bg-white text-sm text-[#17202A] outline-none focus:border-[#123B66] resize-none leading-relaxed mb-4"
            />
            <div className="flex gap-3">
              <button className="flex-1 flex flex-col items-center justify-center gap-2 py-5 rounded-2xl border-2 border-dashed border-[#CBD5E1] bg-white cursor-pointer">
                <span className="text-3xl">📷</span>
                <span className="text-xs font-semibold text-[#64748B]">Add Photo</span>
              </button>
              <button className="flex-1 flex flex-col items-center justify-center gap-2 py-5 rounded-2xl border-2 border-dashed border-[#CBD5E1] bg-white cursor-pointer">
                <span className="text-3xl">📄</span>
                <span className="text-xs font-semibold text-[#64748B]">Add Document</span>
              </button>
            </div>
          </div>
        );

      case 12: {
        const rows = [
          { label: "Department", value: form.dept || "—" },
          { label: "Work Type", value: form.activity || "—" },
          { label: "Section", value: form.section || "—" },
          { label: "From → To", value: `${form.fromStation || "—"} → ${form.toStation || "—"}` },
          { label: "Reason", value: form.reason || "—" },
          { label: "Safety Critical", value: form.safetyCritical || "—" },
          { label: "Severity", value: form.severity || "—" },
          { label: "1st Preference", value: form.pref1 },
          { label: "Time", value: form.anySuitableTime ? "Any suitable time" : `${form.timeFrom} – ${form.timeTo}` },
          { label: "Duration", value: `${Math.floor(form.duration / 60)}h ${form.duration % 60 > 0 ? `${form.duration % 60}m` : ""}`.trim() },
          { label: "Coordination", value: form.coordination.join(", ") || "None" },
        ];
        return (
          <div>
            <StepHeader title="Review Request" />
            <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden mb-4">
              {rows.map((r, i) => (
                <div
                  key={r.label}
                  className="flex items-start justify-between px-4 py-3"
                  style={i < rows.length - 1 ? { borderBottom: "1px solid #F1F5F9" } : {}}
                >
                  <span className="text-xs text-[#64748B] font-medium">{r.label}</span>
                  <span className="text-xs text-[#17202A] font-semibold text-right max-w-[55%]">{r.value}</span>
                </div>
              ))}
            </div>
            <div className="p-3.5 rounded-xl flex gap-2.5 mb-2" style={{ background: "#FFF7ED" }}>
              <span className="text-sm">🤖</span>
              <p className="text-xs text-[#92400E] font-medium">
                Request ID generated after submission. AI analysis begins immediately.
              </p>
            </div>
          </div>
        );
      }

      default:
        return null;
    }
  };

  const canProceed = () => {
    if (step === 1) return !!form.dept;
    if (step === 2) return !!form.activity;
    return true;
  };

  return (
    <div className="flex flex-col h-full">
      <PageHeader title="Apply for Maintenance Block" onBack={onBack} />
      <div className="px-4 pt-3 pb-0 bg-white border-b border-[#E2E8F0]">
        <div className="flex gap-0.5 mb-3">
          {Array.from({ length: totalSteps }, (_, i) => (
            <div
              key={i}
              className="flex-1 h-1 rounded-full transition-all duration-300"
              style={{ background: i + 1 < step ? "#138A4B" : i + 1 === step ? "#123B66" : "#E2E8F0" }}
            />
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto scroll-hide px-4 py-5 bg-[#F7F9FC]">
        {renderStep()}
        <div className="h-4" />
      </div>
      <div className="px-4 py-3 bg-white border-t border-[#E2E8F0] flex gap-3">
        {step > 1 && (
          <button
            onClick={() => setStep((s) => s - 1)}
            className="flex-1 py-3.5 rounded-xl border-2 border-[#E2E8F0] text-sm font-semibold text-[#64748B] cursor-pointer"
          >
            Back
          </button>
        )}
        <button
          onClick={() => { if (step === totalSteps) { onSubmit(); } else { setStep((s) => s + 1); } }}
          disabled={!canProceed()}
          className="flex-1 py-3.5 rounded-xl text-white text-sm font-semibold transition-all cursor-pointer"
          style={{ background: canProceed() ? "#123B66" : "#CBD5E1" }}
        >
          {step === totalSteps ? "Submit Block Request" : "Continue"}
        </button>
      </div>
    </div>
  );
}

// ─── Request Submitted Screen ─────────────────────────────────────────────────

function RequestSubmittedScreen({ onDone }: { onDone: () => void }) {
  const stages = [
    { label: "Submitted", done: true },
    { label: "AI Analysis", done: false, active: true },
    { label: "Planner Review", done: false },
    { label: "Approved", done: false },
    { label: "Scheduled", done: false },
  ];

  return (
    <div className="flex flex-col h-full bg-[#F7F9FC]">
      <div className="flex-1 overflow-y-auto scroll-hide px-5 py-8">
        <div className="flex flex-col items-center text-center mb-8">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mb-4 shadow-lg"
            style={{ background: "linear-gradient(135deg, #138A4B, #0E6B3A)" }}
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-[#17202A] mb-1">Request Submitted</h2>
          <p className="text-sm text-[#64748B]">Your block request has been received</p>
        </div>
        <div className="rounded-2xl p-5 mb-6 text-center" style={{ background: "#0B2545" }}>
          <p className="text-blue-300 text-xs mb-1">Request ID</p>
          <p className="font-mono-data text-3xl font-bold text-white mb-2">BR-1024</p>
          <StatusBadge status="AI Analysis Pending" />
        </div>
        <div className="bg-white rounded-2xl p-4 border border-[#E2E8F0] mb-4">
          <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-4">Progress</p>
          <div className="relative">
            <div className="absolute left-3.5 top-4 bottom-4 w-0.5" style={{ background: "#E2E8F0" }} />
            {stages.map((s) => (
              <div key={s.label} className="flex items-center gap-3 py-3">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 z-10"
                  style={s.done ? { background: "#138A4B" } : s.active ? { background: "#F28C28" } : { background: "#E2E8F0" }}
                >
                  {s.done ? (
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : s.active ? (
                    <div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-white" />
                  )}
                </div>
                <p className="text-sm font-semibold" style={{ color: s.done ? "#138A4B" : s.active ? "#F28C28" : "#94A3B8" }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
        <button onClick={onDone} className="w-full py-4 rounded-2xl text-white font-semibold text-sm cursor-pointer" style={{ background: "#123B66" }}>
          Back to Home
        </button>
      </div>
    </div>
  );
}

// ─── Blocks Screen ────────────────────────────────────────────────────────────

function BlocksScreen({ onNavigate }: { onNavigate: (s: MobileScreen) => void }) {
  const blocks = [
    { id: "B014", section: "A–B Section", date: "18 Sep", time: "22:00–00:30", depts: ["Engineering", "S&T", "Traction"], status: "APPROVED", impact: "Low" },
    { id: "B013", section: "C–D Section", date: "17 Sep", time: "01:00–04:00", depts: ["Traction"], status: "COMPLETED", impact: "Medium" },
    { id: "B012", section: "B Section", date: "15 Sep", time: "23:00–02:00", depts: ["Engineering"], status: "COMPLETED", impact: "Low" },
  ];
  return (
    <div className="flex flex-col h-full">
      <div className="bg-white border-b border-[#E2E8F0] px-4 py-4">
        <p className="text-lg font-bold text-[#17202A]">Blocks</p>
        <p className="text-xs text-[#64748B]">Approved & recent maintenance blocks</p>
      </div>
      <div className="flex-1 overflow-y-auto scroll-hide px-4 py-3 space-y-3 bg-[#F7F9FC]">
        {blocks.map((b) => (
          <button
            key={b.id}
            onClick={() => onNavigate("block-detail")}
            className="w-full bg-white rounded-2xl p-4 border border-[#E2E8F0] shadow-sm text-left cursor-pointer"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <span className="font-mono-data text-lg font-bold text-[#0B2545]">{b.id}</span>
                <p className="text-xs text-[#64748B] mt-0.5">{b.section}</p>
              </div>
              <StatusBadge status={b.status} />
            </div>
            <div className="flex gap-3 text-xs text-[#64748B] font-mono-data mb-2">
              <span>📅 {b.date}</span>
              <span>⏱ {b.time}</span>
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {b.depts.map((d) => (
                <span key={d} className="text-[10px] font-medium px-2 py-0.5 rounded-md" style={{ background: "#EFF6FF", color: "#1769AA" }}>
                  {d}
                </span>
              ))}
              <span
                className="text-[10px] font-medium px-2 py-0.5 rounded-md ml-auto"
                style={{ background: b.impact === "Low" ? "#F0FDF4" : "#FFF7ED", color: b.impact === "Low" ? "#138A4B" : "#F28C28" }}
              >
                {b.impact} Impact
              </span>
            </div>
          </button>
        ))}
        <div className="h-2" />
      </div>
    </div>
  );
}

// ─── Block Detail Screen ──────────────────────────────────────────────────────

function BlockDetailScreen({ onBack, onNavigate }: { onBack: () => void; onNavigate: (s: MobileScreen) => void }) {
  return (
    <div className="flex flex-col h-full">
      <PageHeader title="Block B014" onBack={onBack} />
      <div className="flex-1 overflow-y-auto scroll-hide px-4 py-4 bg-[#F7F9FC] space-y-3">
        <div className="rounded-2xl p-5" style={{ background: "linear-gradient(135deg, #0B2545, #123B66)" }}>
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="font-mono-data text-3xl font-bold text-white">B014</p>
              <p className="text-blue-200 text-sm mt-0.5">A–B Section</p>
            </div>
            <StatusBadge status="APPROVED" />
          </div>
          <p className="text-blue-300 text-sm font-medium mb-3">18 September · 22:00–00:30</p>
          <div className="grid grid-cols-2 gap-3">
            {[{ label: "Duration", value: "150 min" }, { label: "Train Impact", value: "Low" }].map((i) => (
              <div key={i.label}>
                <p className="text-xs text-blue-300">{i.label}</p>
                <p className="text-sm font-semibold text-white font-mono-data">{i.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Departments */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0]">
          <div className="px-4 py-3 border-b border-[#F1F5F9]">
            <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">Departments & Activities</p>
          </div>
          {[
            { dept: "Engineering", activity: "Track Repair", lead: "Sup. R. Sharma" },
            { dept: "Signal & Telecom", activity: "Signal Inspection", lead: "Sup. A. Verma" },
            { dept: "Traction", activity: "OHE Inspection", lead: "Sup. M. Khan" },
          ].map((d, i, arr) => (
            <div key={d.dept} className="px-4 py-3.5 flex items-center gap-3" style={i < arr.length - 1 ? { borderBottom: "1px solid #F1F5F9" } : {}}>
              <div className="w-2 h-2 rounded-full bg-[#1769AA]" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-[#17202A]">{d.dept}</p>
                <p className="text-xs text-[#64748B]">{d.activity} · {d.lead}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Details */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0]">
          <div className="px-4 py-3 border-b border-[#F1F5F9]">
            <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">Block Details</p>
          </div>
          {[
            { label: "Team Size", value: "18 engineers" },
            { label: "Equipment", value: "Rail grinder, UT set, Tower wagon" },
            { label: "Safety Requirements", value: "Flagger, Emergency kit, PPE" },
          ].map((r, i, arr) => (
            <div key={r.label} className="flex items-start justify-between px-4 py-3.5 gap-4" style={i < arr.length - 1 ? { borderBottom: "1px solid #F1F5F9" } : {}}>
              <span className="text-xs text-[#64748B] font-medium">{r.label}</span>
              <span className="text-xs text-[#17202A] font-semibold text-right max-w-[55%]">{r.value}</span>
            </div>
          ))}
        </div>

        <button
          onClick={() => onNavigate("active-work")}
          className="w-full py-4 rounded-2xl text-white font-bold text-sm flex items-center justify-center gap-2 cursor-pointer"
          style={{ background: "#123B66" }}
        >
          View Work Plan
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
        <div className="h-2" />
      </div>
    </div>
  );
}

// ─── Active Work Screen ───────────────────────────────────────────────────────

function ActiveWorkScreen({ onBack, onNavigate }: { onBack: () => void; onNavigate: (s: MobileScreen) => void }) {
  const [started, setStarted] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [paused, setPaused] = useState(false);
  const ref = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (started && !paused) {
      ref.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    } else {
      if (ref.current) clearInterval(ref.current);
    }
    return () => { if (ref.current) clearInterval(ref.current); };
  }, [started, paused]);

  const fmt = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col h-full">
      <PageHeader title="Active Work" onBack={onBack} />
      <div className="flex-1 overflow-y-auto scroll-hide px-4 py-4 bg-[#F7F9FC] space-y-3">
        <div className="rounded-2xl p-5" style={{ background: "linear-gradient(135deg, #0B2545 0%, #123B66 100%)" }}>
          <p className="text-blue-300 text-xs mb-1">Current Task</p>
          <p className="text-2xl font-bold text-white">Track Repair</p>
          <p className="text-blue-200 text-sm mt-0.5">A–B Section · B014</p>
          <p className="text-blue-300 text-xs font-mono-data mt-2">22:00 – 00:30</p>
          <div className="mt-3">
            <StatusBadge status={started ? "WORK IN PROGRESS" : "READY TO START"} />
          </div>
        </div>

        {started && (
          <div className="bg-white rounded-2xl p-5 border border-[#E2E8F0] flex flex-col items-center">
            <p className="text-xs text-[#64748B] mb-1">Elapsed Time</p>
            <p className="font-mono-data text-4xl font-bold text-[#0B2545]">{fmt(seconds)}</p>
            {paused && <p className="text-xs text-[#F28C28] mt-1 font-medium">Paused</p>}
          </div>
        )}
        {!started ? (
          <button
            onClick={() => setStarted(true)}
            className="w-full py-5 rounded-2xl text-white font-bold text-lg shadow-xl cursor-pointer"
            style={{ background: "linear-gradient(135deg, #138A4B, #0E6B3A)", boxShadow: "0 8px 24px rgba(19,138,75,0.3)" }}
          >
            START WORK
          </button>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setPaused((p) => !p)}
              className="py-4 rounded-2xl text-sm font-bold border-2 border-[#E2E8F0] bg-white text-[#64748B] flex items-center justify-center gap-2 cursor-pointer"
            >
              {paused ? <>▶ Resume</> : <>⏸ Pause</>}
            </button>
            <button onClick={() => onNavigate("report-issue")} className="py-4 rounded-2xl text-sm font-bold border-2 border-[#FEE2E2] text-[#DC2626] cursor-pointer" style={{ background: "#FFF5F5" }}>
              Report Issue
            </button>
            <button className="py-4 rounded-2xl text-sm font-bold border-2 border-[#E2E8F0] bg-white text-[#64748B] flex items-center justify-center gap-1.5 cursor-pointer">
              📷 Evidence
            </button>
            <button onClick={() => onNavigate("complete-work")} className="py-4 rounded-2xl text-sm font-bold text-white cursor-pointer" style={{ background: "#138A4B" }}>
              Complete Work
            </button>
          </div>
        )}
        <div className="bg-white rounded-2xl p-4 border border-[#E2E8F0]">
          <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-3">Safety Checks</p>
          {["Section protected with flagmen", "All team briefed", "Equipment ready", "OHE protection obtained"].map((c) => (
            <div key={c} className="flex items-center gap-3 py-2 border-b border-[#F1F5F9] last:border-0">
              <div className="w-5 h-5 rounded border-2 border-[#E2E8F0] bg-[#F7F9FC]" />
              <span className="text-xs text-[#64748B]">{c}</span>
            </div>
          ))}
        </div>
        <div className="h-2" />
      </div>
    </div>
  );
}

// ─── Complete Work Screen ─────────────────────────────────────────────────────

function CompleteWorkScreen({ onBack }: { onBack: () => void }) {
  const [checks, setChecks] = useState<Record<string, boolean>>({});
  const [remarks, setRemarks] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const items = ["Work completed as planned", "Safety checks completed", "Section cleared"];
  const allChecked = items.every((i) => checks[i]);

  if (submitted) {
    return (
      <div className="flex flex-col h-full bg-[#F7F9FC]">
        <PageHeader title="Work Completed" onBack={onBack} />
        <div className="flex-1 flex flex-col items-center justify-center px-5 py-8 text-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mb-5 shadow-lg" style={{ background: "linear-gradient(135deg, #138A4B, #0E6B3A)" }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-[#17202A] mb-1">Work Completed</h2>
          <p className="text-sm text-[#64748B] mb-6">Block B014 closed successfully</p>
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 w-full text-left mb-6 space-y-3">
            {[{ label: "Completion Time", value: "00:18, 19 Sep 2024" }, { label: "Team", value: "Eng. R. Sharma + 5" }, { label: "Evidence", value: "3 photos uploaded" }, { label: "Block B014", value: "Closed" }].map((r) => (
              <div key={r.label} className="flex justify-between text-sm">
                <span className="text-[#64748B]">{r.label}</span>
                <span className="font-semibold text-[#17202A]">{r.value}</span>
              </div>
            ))}
          </div>
          <button onClick={onBack} className="w-full py-4 rounded-2xl text-white font-semibold text-sm cursor-pointer" style={{ background: "#123B66" }}>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <PageHeader title="Complete Work" onBack={onBack} />
      <div className="flex-1 overflow-y-auto scroll-hide px-4 py-4 bg-[#F7F9FC] space-y-4">
        <div className="bg-white rounded-2xl p-4 border border-[#E2E8F0]">
          <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-3">Checklist</p>
          {items.map((item) => (
            <button
              key={item}
              onClick={() => setChecks((c) => ({ ...c, [item]: !c[item] }))}
              className="w-full flex items-center gap-3 py-4 border-b border-[#F1F5F9] last:border-0 text-left cursor-pointer"
            >
              <div
                className="w-6 h-6 rounded-lg flex items-center justify-center border-2 flex-shrink-0 transition-all"
                style={checks[item] ? { borderColor: "#138A4B", background: "#138A4B" } : { borderColor: "#CBD5E1", background: "white" }}
              >
                {checks[item] && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
              <span className="text-sm font-medium" style={{ color: checks[item] ? "#138A4B" : "#17202A" }}>{item}</span>
            </button>
          ))}
        </div>
        <button className="w-full flex items-center gap-4 p-4 rounded-2xl border-2 border-dashed border-[#CBD5E1] bg-white text-left cursor-pointer">
          <span className="text-3xl">📷</span>
          <div>
            <p className="text-sm font-semibold text-[#17202A]">Upload Completion Photo</p>
            <p className="text-xs text-[#64748B] mt-0.5">Capture completed work evidence</p>
          </div>
        </button>
        <div>
          <label className="block text-xs font-semibold text-[#64748B] mb-1.5">Remarks</label>
          <textarea
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            placeholder="Any additional notes..."
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-white text-sm text-[#17202A] outline-none focus:border-[#123B66] resize-none"
          />
        </div>
        <button
          onClick={() => allChecked && setSubmitted(true)}
          className="w-full py-4 rounded-2xl text-white font-bold text-sm transition-all cursor-pointer"
          style={{ background: allChecked ? "#138A4B" : "#CBD5E1" }}
        >
          Complete Work
        </button>
        {!allChecked && <p className="text-center text-xs text-[#94A3B8]">Complete all checklist items to proceed</p>}
        <div className="h-2" />
      </div>
    </div>
  );
}

// ─── Report Issue Screen ──────────────────────────────────────────────────────

function ReportIssueScreen({ onBack }: { onBack: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [issueType, setIssueType] = useState("");
  const [severity, setSeverity] = useState("");

  if (submitted) {
    return (
      <div className="flex flex-col h-full bg-[#F7F9FC]">
        <PageHeader title="Report Issue" onBack={onBack} />
        <div className="flex-1 flex flex-col items-center justify-center px-5 py-8 text-center">
          <div className="w-16 h-16 rounded-full bg-[#FEF3C7] flex items-center justify-center mb-4">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#F28C28" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-[#17202A] mb-1">Issue Reported</h2>
          <p className="text-sm text-[#64748B] mb-6">Planner will be notified immediately.</p>
          <button onClick={onBack} className="w-full py-4 rounded-2xl text-white font-semibold text-sm cursor-pointer" style={{ background: "#123B66" }}>
            Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <PageHeader title="Report Issue" onBack={onBack} />
      <div className="flex-1 overflow-y-auto scroll-hide px-4 py-4 bg-[#F7F9FC] space-y-4">
        <div>
          <p className="text-xs font-semibold text-[#64748B] mb-2">Issue Type</p>
          <div className="space-y-2">
            {["Safety Hazard", "Equipment Failure", "Track Defect", "OHE Fault", "Unauthorized Entry", "Other"].map((t) => (
              <button
                key={t}
                onClick={() => setIssueType(t)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 text-sm font-medium text-left transition-all cursor-pointer"
                style={issueType === t ? { borderColor: "#DC2626", background: "#FEF2F2", color: "#DC2626" } : { borderColor: "#E2E8F0", background: "white", color: "#17202A" }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold text-[#64748B] mb-2">Severity</p>
          <div className="grid grid-cols-2 gap-2">
            {[{ label: "Low", color: "#138A4B" }, { label: "Medium", color: "#F28C28" }, { label: "High", color: "#DC2626" }, { label: "Critical", color: "#7C3AED" }].map(({ label, color }) => (
              <button
                key={label}
                onClick={() => setSeverity(label)}
                className="py-3 rounded-xl border-2 text-sm font-semibold transition-all cursor-pointer"
                style={severity === label ? { borderColor: color, background: `${color}15`, color } : { borderColor: "#E2E8F0", background: "white", color: "#64748B" }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold text-[#64748B] mb-1.5">Location</p>
          <input type="text" placeholder="e.g., A–B Section, KM 42+300" className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-white text-sm text-[#17202A] outline-none focus:border-[#DC2626]" />
        </div>
        <div>
          <p className="text-xs font-semibold text-[#64748B] mb-1.5">Description</p>
          <textarea placeholder="Describe the issue clearly..." rows={4} className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-white text-sm text-[#17202A] outline-none focus:border-[#DC2626] resize-none" />
        </div>
        <div className="flex gap-3">
          <button className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl border-2 border-dashed border-[#CBD5E1] bg-white text-sm text-[#64748B] font-medium cursor-pointer">📷 Photo</button>
          <button className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl border-2 border-dashed border-[#CBD5E1] bg-white text-sm text-[#64748B] font-medium cursor-pointer">🎤 Voice</button>
        </div>
        <button onClick={() => setSubmitted(true)} className="w-full py-4 rounded-2xl text-white font-bold text-sm cursor-pointer" style={{ background: "#DC2626" }}>
          Report Issue
        </button>
        <p className="text-center text-xs text-[#64748B]">Planner will be notified immediately.</p>
        <div className="h-2" />
      </div>
    </div>
  );
}

// ─── Tasks Screen ─────────────────────────────────────────────────────────────

function TasksScreen({ onNavigate }: { onNavigate: (s: MobileScreen) => void }) {
  const tasks = [
    { id: "T-041", activity: "Track Inspection", location: "A–B Section, KM 42+300", time: "22:00–23:30", priority: "High", status: "Pending" },
    { id: "T-042", activity: "OHE Visual Check", location: "C Section, Mast 18", time: "23:30–00:30", priority: "Medium", status: "Pending" },
    { id: "T-043", activity: "Signal Inspection — IBS", location: "B–C Section", time: "01:00–02:00", priority: "Low", status: "COMPLETED" },
    { id: "T-044", activity: "Point Lubrication", location: "A Section, KM 38 Points", time: "02:00–03:00", priority: "Medium", status: "Pending" },
  ];
  const prioColor: Record<string, string> = { High: "#DC2626", Medium: "#F28C28", Low: "#138A4B", Critical: "#7C3AED" };
  return (
    <div className="flex flex-col h-full">
      <div className="bg-white border-b border-[#E2E8F0] px-4 py-4">
        <p className="text-lg font-bold text-[#17202A]">My Tasks</p>
        <p className="text-xs text-[#64748B]">Tonight's maintenance schedule</p>
      </div>
      <div className="flex-1 overflow-y-auto scroll-hide px-4 py-3 space-y-2 bg-[#F7F9FC]">
        {tasks.map((t) => (
          <button
            key={t.id}
            onClick={() => onNavigate("active-work")}
            className="w-full bg-white rounded-xl p-4 border border-[#E2E8F0] flex items-start gap-3 text-left cursor-pointer"
          >
            <div className="w-1 self-stretch rounded-full mt-0.5" style={{ background: prioColor[t.priority] }} />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-0.5">
                <p className="text-sm font-semibold text-[#17202A] leading-tight">{t.activity}</p>
                <StatusBadge status={t.status} />
              </div>
              <p className="text-xs text-[#64748B]">{t.location}</p>
              <div className="flex items-center gap-3 mt-1.5 text-xs text-[#94A3B8] font-mono-data">
                <span>{t.time}</span>
                <span className="font-medium" style={{ color: prioColor[t.priority] }}>{t.priority}</span>
              </div>
            </div>
          </button>
        ))}
        <div className="h-2" />
      </div>
    </div>
  );
}

// ─── Notifications Screen ─────────────────────────────────────────────────────

function NotificationsScreen({ onBack }: { onBack: () => void }) {
  const notes = [
    { icon: "✅", title: "Block B014 approved", body: "Your block request for A–B Section on 18 Sep has been approved.", time: "2 min ago", color: "#138A4B" },
    { icon: "⏰", title: "Block starts in 2 hours", body: "Block B014 begins at 22:00. Please ensure team readiness.", time: "18 min ago", color: "#F28C28" },
    { icon: "✏️", title: "Planner modified your requested time", body: "Block BR-1024 time adjusted from 21:30 to 22:00.", time: "1 hr ago", color: "#1769AA" },
    { icon: "🔗", title: "New coordinated activity added", body: "S&T team added OHE inspection to Block B014.", time: "2 hr ago", color: "#123B66" },
    { icon: "⚠️", title: "Issue reported for A–B Section", body: "Track defect at KM 42+300. Planner notified.", time: "3 hr ago", color: "#DC2626" },
  ];
  return (
    <div className="flex flex-col h-full">
      <PageHeader title="Notifications" onBack={onBack} />
      <div className="flex-1 overflow-y-auto scroll-hide px-4 py-3 space-y-2 bg-[#F7F9FC]">
        {notes.map((n, i) => (
          <div key={i} className="bg-white rounded-2xl p-4 border border-[#E2E8F0] flex gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0" style={{ background: `${n.color}15` }}>
              {n.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#17202A] leading-tight">{n.title}</p>
              <p className="text-xs text-[#64748B] mt-0.5 leading-relaxed">{n.body}</p>
              <p className="text-[10px] text-[#94A3B8] mt-1.5 font-mono-data">{n.time}</p>
            </div>
          </div>
        ))}
        <div className="h-2" />
      </div>
    </div>
  );
}

// ─── Profile Screen ───────────────────────────────────────────────────────────

function ProfileScreen({
  role,
  onLogout,
  onExitToCentralPortal,
}: {
  role: Role;
  onLogout?: () => void;
  onExitToCentralPortal?: () => void;
}) {
  return (
    <div className="flex flex-col h-full">
      <div className="bg-white border-b border-[#E2E8F0] px-4 py-4 flex items-center justify-between">
        <p className="text-lg font-bold text-[#17202A]">Profile & Settings</p>
        <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-blue-50 text-[#123B66] border border-blue-100 uppercase tracking-wider">
          {role} Mode
        </span>
      </div>
      <div className="flex-1 overflow-y-auto scroll-hide px-4 py-4 bg-[#F7F9FC] space-y-3">
        <div className="rounded-2xl p-5 flex items-center gap-4" style={{ background: "linear-gradient(135deg, #0B2545, #123B66)" }}>
          <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center shadow-inner">
            <span className="text-3xl font-bold text-white">RS</span>
          </div>
          <div>
            <p className="text-xl font-bold text-white">R. Sharma</p>
            <p className="text-blue-200 text-sm font-medium">{role === "supervisor" ? "Maintenance Supervisor" : "Field Engineer"}</p>
            <p className="text-blue-300 text-xs mt-0.5">Engineering · Nagpur Division</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
          {[{ label: "Employee ID", value: "EMP-2841" }, { label: "Department", value: "Engineering" }, { label: "Division", value: "Nagpur Division" }, { label: "Zone", value: "Central Railway" }, { label: "Role", value: role === "supervisor" ? "Maintenance Supervisor" : "Field Engineer" }].map((r, i, arr) => (
            <div key={r.label} className="flex items-center justify-between px-4 py-3.5" style={i < arr.length - 1 ? { borderBottom: "1px solid #F1F5F9" } : {}}>
              <span className="text-xs text-[#64748B] font-medium">{r.label}</span>
              <span className="text-sm text-[#17202A] font-semibold">{r.value}</span>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
          {[
            { icon: "⚙️", label: "App Settings" },
            { icon: "🔔", label: "Notification Preferences" },
            { icon: "❓", label: "Help & Support" },
            { icon: "📋", label: "Terms & Privacy" }
          ].map((m, i, arr) => (
            <button
              key={m.label}
              className="w-full flex items-center justify-between px-4 py-4 text-left cursor-pointer hover:bg-slate-50 transition-colors"
              style={i < arr.length - 1 ? { borderBottom: "1px solid #F1F5F9" } : {}}
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{m.icon}</span>
                <span className="text-sm font-medium text-[#17202A]">{m.label}</span>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          ))}
          {onExitToCentralPortal && (
            <button
              onClick={onExitToCentralPortal}
              className="w-full flex items-center justify-between px-4 py-4 text-left cursor-pointer hover:bg-blue-50/50 transition-colors border-t border-[#F1F5F9]"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">🖥️</span>
                <div>
                  <span className="text-sm font-semibold text-[#123B66]">Open Central Web Portal</span>
                  <p className="text-[10px] text-[#64748B]">Switch to desktop planner dashboard</p>
                </div>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#123B66" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </button>
          )}
        </div>
        <div className="pt-2">
          <button
            onClick={onLogout}
            className="w-full py-3.5 rounded-2xl border border-red-200 text-sm font-bold text-red-600 cursor-pointer shadow-xs hover:bg-red-100/50 transition-colors flex flex-col items-center justify-center gap-0.5"
            style={{ background: "#FFF5F5" }}
          >
            <span>Log Out</span>
            <span className="text-[10px] text-red-400 font-normal">Sign out to switch role or account</span>
          </button>
        </div>
        <div className="p-3 text-center">
          <p className="text-[10px] text-[#CBD5E1] font-mono-data">TRACKSYNC v2.0.1 · Indian Railways · Central Zone</p>
        </div>
        <div className="h-2" />
      </div>
    </div>
  );
}

// ─── Main Export Component ───────────────────────────────────────────────────

export default function MobileFigmaApp({
  initialRole = "supervisor",
  initialScreen = "home",
  onExitToCentralPortal,
  onLogout,
}: MobileFigmaAppProps) {
  const [screen, setScreen] = useState<MobileScreen>(initialScreen);
  const [navTab, setNavTab] = useState<NavTab>("home");
  const [role, setRole] = useState<Role>(initialRole);

  useEffect(() => {
    setRole(initialRole);
  }, [initialRole]);

  const navTabScreenMap: Record<NavTab, MobileScreen> = {
    home: "home",
    requests: "requests",
    blocks: "blocks",
    tasks: "tasks",
    profile: "profile",
  };

  const handleNav = (tab: NavTab) => {
    setNavTab(tab);
    setScreen(navTabScreenMap[tab]);
  };

  const navigate = (s: MobileScreen) => {
    setScreen(s);
    if (s === "home") setNavTab("home");
    else if (s === "requests" || s === "request-form" || s === "request-submitted") setNavTab("requests");
    else if (s === "blocks" || s === "block-detail") setNavTab("blocks");
    else if (s === "tasks" || s === "active-work" || s === "complete-work") setNavTab("tasks");
    else if (s === "profile") setNavTab("profile");
  };

  const showBottomNav = !["splash", "login", "request-form", "notifications"].includes(screen);
  const headerDark = screen === "home" || screen === "login" || screen === "splash";

  const renderScreen = () => {
    switch (screen) {
      case "splash":
        return <SplashScreen onDone={() => setScreen("login")} />;
      case "login":
        return (
          <LoginScreen
            onLogin={(r) => {
              setRole(r);
              setScreen("home");
            }}
          />
        );
      case "home":
        return role === "supervisor"
          ? <SupervisorHome onNavigate={navigate} />
          : <EngineerHome onNavigate={navigate} />;
      case "requests":
        return <RequestsScreen onNavigate={navigate} />;
      case "request-form":
        return <RequestFormScreen onBack={() => navigate("requests")} onSubmit={() => navigate("request-submitted")} />;
      case "request-submitted":
        return <RequestSubmittedScreen onDone={() => navigate("home")} />;
      case "blocks":
        return <BlocksScreen onNavigate={navigate} />;
      case "block-detail":
        return <BlockDetailScreen onBack={() => navigate("blocks")} onNavigate={navigate} />;
      case "active-work":
        return <ActiveWorkScreen onBack={() => navigate("tasks")} onNavigate={navigate} />;
      case "complete-work":
        return <CompleteWorkScreen onBack={() => navigate("home")} />;
      case "report-issue":
        return <ReportIssueScreen onBack={() => navigate("active-work")} />;
      case "notifications":
        return <NotificationsScreen onBack={() => navigate("home")} />;
      case "profile":
        return <ProfileScreen role={role} onLogout={onLogout} onExitToCentralPortal={onExitToCentralPortal} />;
      case "tasks":
        return <TasksScreen onNavigate={navigate} />;
      default:
        return <SupervisorHome onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-950 p-0 sm:p-4 relative overflow-hidden select-none">
      {/* Subtle ambient lighting & glow effect behind the device on desktop */}
      <div className="hidden sm:block absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(18,59,102,0.3)_0,transparent_65%)] pointer-events-none" />

      {/* Desktop Header Badge & Web Console Action */}
      {onExitToCentralPortal && (
        <div className="hidden sm:flex items-center gap-3 absolute top-4 right-6 z-50 bg-slate-900/90 border border-slate-800 backdrop-blur-md px-4 py-2 rounded-full shadow-lg">
          <span className="text-xs text-slate-400 font-medium">Desktop View:</span>
          <button
            onClick={onExitToCentralPortal}
            className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors cursor-pointer"
          >
            Central Web Portal ↗
          </button>
        </div>
      )}

      {/* Mobile Device Frame — iPhone 16 Pro Ergonomic Viewport (393px × 852px) */}
      <div
        className="relative flex flex-col w-full h-full sm:w-[393px] sm:h-[852px] sm:max-h-[92vh] sm:rounded-[52px] sm:border-[10px] sm:border-slate-900 sm:shadow-[0_25px_80px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.08)] bg-white overflow-hidden"
      >
        {/* Status bar with Dynamic Island Pill */}
        <div
          className="relative flex items-center justify-between px-6 pt-3 pb-2 flex-shrink-0 transition-colors duration-300 select-none z-30"
          style={{ background: screen === "splash" ? "#FAFBFC" : screen === "home" ? "#0B2545" : "white" }}
        >
          {/* Time */}
          <span className="text-[13px] font-bold tracking-tight font-mono-data" style={{ color: headerDark && screen === "home" ? "white" : "#17202A" }}>
            09:41
          </span>

          {/* Dynamic Island Cutout */}
          <div className="absolute left-1/2 -translate-x-1/2 top-2.5 w-24 h-6 bg-black rounded-full flex items-center justify-end px-2.5 gap-1 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-emerald-500/80 animate-pulse" />
          </div>

          {/* Icons */}
          <div className="flex items-center gap-1.5">
            <svg width="16" height="11" viewBox="0 0 16 11" fill={headerDark && screen === "home" ? "white" : "#17202A"}>
              <rect x="0" y="4" width="3" height="7" rx="0.5" opacity="0.4" />
              <rect x="4.5" y="2.5" width="3" height="8.5" rx="0.5" opacity="0.6" />
              <rect x="9" y="0.5" width="3" height="10.5" rx="0.5" />
              <rect x="13.5" y="3" width="2.5" height="5" rx="0.5" stroke={headerDark && screen === "home" ? "white" : "#17202A"} strokeWidth="0.5" fill="none" />
            </svg>
            <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
              <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke={headerDark && screen === "home" ? "white" : "#17202A"} strokeOpacity="0.35" />
              <rect x="2" y="2" width="17" height="8" rx="2" fill={headerDark && screen === "home" ? "white" : "#17202A"} />
              <path d="M23 4v4a2 2 0 0 0 0-4z" fill={headerDark && screen === "home" ? "white" : "#17202A"} opacity="0.4" />
            </svg>
          </div>
        </div>

        {/* Active Screen Content */}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          {renderScreen()}
        </div>

        {/* Bottom Navigation */}
        {showBottomNav && (
          <div className="flex-shrink-0 z-30 bg-white border-t border-slate-100">
            <BottomNav active={navTab} onNav={handleNav} />
            <div className="flex justify-center pb-2 pt-1 bg-white">
              <div className="w-32 h-1 bg-[#17202A] rounded-full opacity-20" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
