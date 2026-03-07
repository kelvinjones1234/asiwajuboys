"use client";

import { useState, useEffect } from "react";
import {
  Users,
  ShieldCheck,
  ShieldOff,
  UserCog,
  UserCheck,
  CalendarPlus,
  Crown,
  Briefcase,
  TrendingUp,
  RefreshCw,
} from "lucide-react";
import {
  getDashboardStats,
  type DashboardStats,
} from "@/app/action/adminDashboard";
import { useToast } from "@/app/context/ToastContext";

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────

type StatCardProps = {
  label: string;
  value: number | string;
  icon: React.ElementType;
  accent?: "default" | "green" | "amber" | "blue" | "red";
  sub?: string;
};

// ─────────────────────────────────────────────
// STAT CARD
// ─────────────────────────────────────────────

const accentMap: Record<NonNullable<StatCardProps["accent"]>, string> = {
  default: "text-[var(--color-brand-primary)] bg-[var(--color-bg-secondary)]",
  green: "text-emerald-600 bg-emerald-50",
  amber: "text-amber-600 bg-amber-50",
  blue: "text-blue-600 bg-blue-50",
  red: "text-red-500 bg-red-50",
};

function StatCard({
  label,
  value,
  icon: Icon,
  accent = "default",
  sub,
}: StatCardProps) {
  return (
    <div className="flex items-center gap-3 bg-[var(--color-bg-primary)] border border-[var(--color-border-default)] rounded-2xl px-4 py-3.5 shadow-xs hover:shadow-sm transition-shadow">
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${accentMap[accent]}`}
      >
        <Icon size={18} strokeWidth={2} />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-muted)] truncate">
          {label}
        </p>
        <p className="text-xl font-black text-[var(--color-text-primary)] leading-tight">
          {value}
        </p>
        {sub && (
          <p className="text-[10px] font-medium text-[var(--color-text-muted)] mt-0.5">
            {sub}
          </p>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// SECTION HEADER
// ─────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-3">
      {children}
    </h3>
  );
}

// ─────────────────────────────────────────────
// AVATAR
// ─────────────────────────────────────────────

function Avatar({ name, picture }: { name: string; picture?: string }) {
  return (
    <div className="w-9 h-9 rounded-full border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)] flex-shrink-0 overflow-hidden">
      {picture ? (
        <img src={picture} alt={name} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-[var(--color-brand-primary)] font-black text-sm uppercase">
          {name.charAt(0)}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// VERIFIED BADGE
// ─────────────────────────────────────────────

function VerifiedBadge({ verified }: { verified: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
        verified
          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
          : "bg-[var(--color-bg-secondary)] text-[var(--color-text-muted)] border-[var(--color-border-default)]"
      }`}
    >
      {verified ? (
        <ShieldCheck size={9} strokeWidth={2.5} />
      ) : (
        <ShieldOff size={9} strokeWidth={2.5} />
      )}
      {verified ? "Verified" : "Pending"}
    </span>
  );
}

// ─────────────────────────────────────────────
// SKELETON HELPERS
// ─────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="bg-[var(--color-bg-primary)] border border-[var(--color-border-default)] rounded-2xl px-4 py-3.5 animate-pulse flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-[var(--color-bg-secondary)]" />
      <div className="space-y-2 flex-1">
        <div className="h-2.5 bg-[var(--color-bg-secondary)] rounded w-1/2" />
        <div className="h-5 bg-[var(--color-bg-secondary)] rounded w-1/3" />
      </div>
    </div>
  );
}

function SkeletonRow() {
  return (
    <div className="flex items-center gap-3 py-3 animate-pulse border-b border-[var(--color-border-default)] last:border-0">
      <div className="w-9 h-9 rounded-full bg-[var(--color-bg-secondary)]" />
      <div className="flex-1 space-y-1.5">
        <div className="h-3 bg-[var(--color-bg-secondary)] rounded w-2/3" />
        <div className="h-2.5 bg-[var(--color-bg-secondary)] rounded w-1/3" />
      </div>
      <div className="h-4 w-14 bg-[var(--color-bg-secondary)] rounded-full" />
    </div>
  );
}

// ─────────────────────────────────────────────
// WARD BAR CHART ROW
// ─────────────────────────────────────────────

function WardBar({
  ward,
  count,
  max,
}: {
  ward: string;
  count: number;
  max: number;
}) {
  const pct = max > 0 ? Math.round((count / max) * 100) : 0;
  return (
    <div className="flex items-center gap-3 py-2">
      <p className="text-xs font-semibold text-[var(--color-text-primary)] w-28 flex-shrink-0 truncate">
        {ward}
      </p>
      <div className="flex-1 h-2 rounded-full bg-[var(--color-bg-secondary)] overflow-hidden">
        <div
          className="h-full rounded-full bg-[var(--color-brand-primary)] transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="text-xs font-bold text-[var(--color-text-muted)] w-6 text-right flex-shrink-0">
        {count}
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────

export default function Main() {
  const { toast } = useToast();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadStats = async (silent = false) => {
    if (!silent) setIsLoading(true);
    else setIsRefreshing(true);

    const result = await getDashboardStats();
    if (result.success && result.data) {
      setStats(result.data);
    } else {
      toast(result.error || "Failed to load dashboard", "error");
    }

    setIsLoading(false);
    setIsRefreshing(false);
  };

  useEffect(() => {
    loadStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const wardMax = stats?.membersByWard?.[0]?.count ?? 1;

  return (
    <section className="relative pb-24 min-h-screen flex flex-col">
      <div className="w-full flex flex-col flex-1 gap-6">
        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h2 className="font-black uppercase text-[clamp(2rem,3vw,3rem)] leading-none text-[var(--color-brand-primary)]">
              Dashboard
            </h2>
            <p className="mt-2 text-[var(--color-text-secondary)] font-medium text-sm max-w-md">
              A live overview of membership activity and system users.
            </p>
          </div>
          <button
            onClick={() => loadStats(true)}
            disabled={isRefreshing}
            className="w-full sm:w-auto flex-shrink-0 border border-[var(--color-border-default)] bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] text-sm font-bold uppercase tracking-wider px-5 py-3.5 rounded-2xl hover:bg-[var(--color-bg-surface)] active:scale-95 transition-all shadow-xs hover:shadow-sm flex justify-center items-center gap-2 disabled:opacity-60"
          >
            <RefreshCw
              size={15}
              strokeWidth={2.5}
              className={isRefreshing ? "animate-spin" : ""}
            />
            Refresh
          </button>
        </div>

        {/* ── Member Stats ── */}
        <div>
          <SectionLabel>Members</SectionLabel>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {isLoading ? (
              [...Array(4)].map((_, i) => <SkeletonCard key={i} />)
            ) : (
              <>
                <StatCard
                  label="Total Members"
                  value={stats?.totalMembers ?? 0}
                  icon={Users}
                  accent="default"
                />
                <StatCard
                  label="Verified"
                  value={stats?.verifiedMembers ?? 0}
                  icon={ShieldCheck}
                  accent="green"
                />
                <StatCard
                  label="Pending"
                  value={stats?.pendingMembers ?? 0}
                  icon={ShieldOff}
                  accent="amber"
                />
                <StatCard
                  label="New This Month"
                  value={stats?.newMembersThisMonth ?? 0}
                  icon={CalendarPlus}
                  accent="blue"
                  sub={new Date().toLocaleString("default", {
                    month: "long",
                    year: "numeric",
                  })}
                />
              </>
            )}
          </div>
        </div>

        {/* ── User Stats ── */}
        <div>
          <SectionLabel>System Users</SectionLabel>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {isLoading ? (
              [...Array(4)].map((_, i) => <SkeletonCard key={i} />)
            ) : (
              <>
                <StatCard
                  label="Total Users"
                  value={stats?.totalUsers ?? 0}
                  icon={UserCog}
                  accent="default"
                />
                <StatCard
                  label="Active Users"
                  value={stats?.activeUsers ?? 0}
                  icon={UserCheck}
                  accent="green"
                />
                <StatCard
                  label="Admins"
                  value={stats?.adminUsers ?? 0}
                  icon={Crown}
                  accent="blue"
                />
                <StatCard
                  label="Staff"
                  value={stats?.staffUsers ?? 0}
                  icon={Briefcase}
                  accent="default"
                />
              </>
            )}
          </div>
        </div>

        {/* ── Bottom Two-Column Grid ── */}
        {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="bg-[var(--color-bg-primary)] border border-[var(--color-border-default)] rounded-2xl shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-[var(--color-border-default)] flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-muted)]">
                  Recent Members
                </p>
                <p className="text-sm font-bold text-[var(--color-text-primary)] mt-0.5">
                  Latest registrations
                </p>
              </div>
              <TrendingUp
                size={16}
                className="text-[var(--color-brand-primary)]"
                strokeWidth={2}
              />
            </div>
            <div className="px-5 divide-y divide-[var(--color-border-default)]">
              {isLoading ? (
                [...Array(5)].map((_, i) => <SkeletonRow key={i} />)
              ) : stats?.recentMembers.length === 0 ? (
                <div className="py-10 flex flex-col items-center gap-2 text-center">
                  <Users
                    size={28}
                    className="text-[var(--color-text-muted)] opacity-40"
                    strokeWidth={1.5}
                  />
                  <p className="text-xs font-semibold text-[var(--color-text-muted)]">
                    No members yet.
                  </p>
                </div>
              ) : (
                stats?.recentMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center gap-3 py-3 group hover:bg-[var(--color-bg-surface)] -mx-5 px-5 transition-colors"
                  >
                    <Avatar name={member.fullName} picture={member.picture} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-[var(--color-text-primary)] truncate">
                        {member.fullName}
                      </p>
                      <p className="text-xs text-[var(--color-text-muted)] font-medium">
                        {member.membershipId} · {member.ward}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                      <VerifiedBadge verified={member.verified} />
                      <p className="text-[10px] text-[var(--color-text-muted)] font-medium">
                        {new Date(member.createdAt).toLocaleDateString(
                          "en-GB",
                          {
                            day: "numeric",
                            month: "short",
                          },
                        )}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="bg-[var(--color-bg-primary)] border border-[var(--color-border-default)] rounded-2xl shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-[var(--color-border-default)] flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-muted)]">
                  Top Wards
                </p>
                <p className="text-sm font-bold text-[var(--color-text-primary)] mt-0.5">
                  Members by ward
                </p>
              </div>
              <Users
                size={16}
                className="text-[var(--color-brand-primary)]"
                strokeWidth={2}
              />
            </div>
            <div className="px-5 py-3">
              {isLoading ? (
                <div className="space-y-4 py-2">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 animate-pulse"
                    >
                      <div className="h-2.5 bg-[var(--color-bg-secondary)] rounded w-24 flex-shrink-0" />
                      <div className="flex-1 h-2 bg-[var(--color-bg-secondary)] rounded-full" />
                      <div className="h-2.5 bg-[var(--color-bg-secondary)] rounded w-4 flex-shrink-0" />
                    </div>
                  ))}
                </div>
              ) : stats?.membersByWard.length === 0 ? (
                <div className="py-10 flex flex-col items-center gap-2 text-center">
                  <Users
                    size={28}
                    className="text-[var(--color-text-muted)] opacity-40"
                    strokeWidth={1.5}
                  />
                  <p className="text-xs font-semibold text-[var(--color-text-muted)]">
                    No ward data yet.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-[var(--color-border-default)]">
                  {stats?.membersByWard.map((w) => (
                    <WardBar
                      key={w.ward}
                      ward={w.ward}
                      count={w.count}
                      max={wardMax}
                    />
                  ))}
                </div>
              )}
            </div>

            {!isLoading && stats && stats.totalMembers > 0 && (
              <div className="px-5 py-4 border-t border-[var(--color-border-default)] bg-[var(--color-bg-secondary)]">
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-muted)]">
                    Verification Rate
                  </p>
                  <p className="text-xs font-black text-[var(--color-brand-primary)]">
                    {Math.round(
                      (stats.verifiedMembers / stats.totalMembers) * 100,
                    )}
                    %
                  </p>
                </div>
                <div className="w-full h-2 rounded-full bg-[var(--color-bg-primary)] overflow-hidden border border-[var(--color-border-default)]">
                  <div
                    className="h-full rounded-full bg-emerald-500 transition-all duration-700"
                    style={{
                      width: `${Math.round((stats.verifiedMembers / stats.totalMembers) * 100)}%`,
                    }}
                  />
                </div>
                <div className="flex justify-between mt-1.5">
                  <p className="text-[10px] text-[var(--color-text-muted)] font-medium">
                    {stats.verifiedMembers} verified
                  </p>
                  <p className="text-[10px] text-[var(--color-text-muted)] font-medium">
                    {stats.pendingMembers} pending
                  </p>
                </div>
              </div>
            )}
          </div>
        </div> */}
      </div>
    </section>
  );
}
