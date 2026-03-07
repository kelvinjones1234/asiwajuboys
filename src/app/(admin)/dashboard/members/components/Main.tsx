"use client";

import { useState, useEffect } from "react";
import { Edit2, Trash2, Plus, Search, Users, ShieldCheck, ShieldOff, ChevronDown } from "lucide-react";
import { updateMember, getMembers, deleteMember } from "@/app/action/adminMember";
import AddMemberModal from "./AddMemberModal";
import EditMemberModal from "./EditMemberModal";
import { useToast } from "@/app/context/ToastContext";

// --- TYPES ---
export type Member = {
  id: string;
  membershipId: string;
  fullName: string;
  ward: string;
  phoneNumber: string;
  address: string;
  picture: string;
  verified: boolean;
};

// --- STAT CARD ---
function StatCard({ label, value, icon: Icon }: { label: string; value: number; icon: React.ElementType }) {
  return (
    <div className="flex items-center gap-3 bg-[var(--color-bg-primary)] border border-[var(--color-border-default)] rounded-2xl px-4 py-3 shadow-sm">
      <div className="w-9 h-9 rounded-xl bg-[var(--color-bg-secondary)] flex items-center justify-center flex-shrink-0">
        <Icon size={16} className="text-[var(--color-brand-primary)]" strokeWidth={2} />
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">{label}</p>
        <p className="text-lg font-black text-[var(--color-text-primary)] leading-tight">{value}</p>
      </div>
    </div>
  );
}

// --- AVATAR ---
function Avatar({ member }: { member: Member }) {
  return (
    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)] flex-shrink-0 overflow-hidden">
      {member.picture ? (
        <img src={member.picture} alt={member.fullName} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-[var(--color-brand-primary)] font-black text-base uppercase">
          {member.fullName.charAt(0)}
        </div>
      )}
    </div>
  );
}

// --- VERIFIED BADGE ---
function VerifiedBadge({ verified }: { verified: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
        verified
          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
          : "bg-[var(--color-bg-secondary)] text-[var(--color-text-muted)] border-[var(--color-border-default)]"
      }`}
    >
      {verified ? <ShieldCheck size={10} strokeWidth={2.5} /> : <ShieldOff size={10} strokeWidth={2.5} />}
      {verified ? "Verified" : "Pending"}
    </span>
  );
}

// --- TOGGLE ---
function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" className="sr-only peer" checked={checked} onChange={onChange} />
      <div className="w-11 h-6 bg-[var(--color-bg-secondary)] border border-[var(--color-border-default)] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[var(--color-border-default)] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--color-brand-primary)] peer-checked:border-[var(--color-brand-primary)]" />
    </label>
  );
}

// --- SKELETON ROW ---
function SkeletonRow() {
  return (
    <tr className="animate-pulse border-b border-[var(--color-border-default)]">
      {[...Array(5)].map((_, i) => (
        <td key={i} className="p-4">
          <div className="h-4 bg-[var(--color-bg-secondary)] rounded-lg" style={{ width: `${[60, 40, 50, 30, 20][i]}%` }} />
        </td>
      ))}
    </tr>
  );
}

// --- MOBILE MEMBER CARD ---
function MemberCard({
  member,
  onEdit,
  onDelete,
  onToggleVerify,
}: {
  member: Member;
  onEdit: (m: Member) => void;
  onDelete: (id: string) => void;
  onToggleVerify: (id: string, current: boolean) => void;
}) {
  return (
    <div className="bg-[var(--color-bg-primary)] border border-[var(--color-border-default)] rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3">
        <Avatar member={member} />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="font-bold text-sm text-[var(--color-text-primary)] truncate">{member.fullName}</p>
              <p className="text-xs text-[var(--color-text-muted)] font-medium mt-0.5">{member.membershipId}</p>
            </div>
            <VerifiedBadge verified={member.verified} />
          </div>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
            <p className="text-xs text-[var(--color-text-secondary)]">
              <span className="text-[var(--color-text-muted)] font-semibold">Ward: </span>
              {member.ward}
            </p>
            <p className="text-xs text-[var(--color-text-secondary)]">
              <span className="text-[var(--color-text-muted)] font-semibold">Phone: </span>
              {member.phoneNumber}
            </p>
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="mt-3 pt-3 border-t border-[var(--color-border-default)] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-[var(--color-text-muted)]">Verified</span>
          <Toggle checked={member.verified} onChange={() => onToggleVerify(member.id, member.verified)} />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(member)}
            className="w-9 h-9 rounded-xl border border-[var(--color-border-default)] flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-brand-primary)] hover:border-[var(--color-brand-primary)] hover:bg-[var(--color-bg-surface)] transition-all"
            title="Edit"
          >
            <Edit2 size={15} strokeWidth={2} />
          </button>
          <button
            onClick={() => onDelete(member.id)}
            className="w-9 h-9 rounded-xl border border-[var(--color-border-default)] flex items-center justify-center text-[var(--color-text-muted)] hover:text-red-500 hover:border-red-400 hover:bg-red-50 transition-all"
            title="Delete"
          >
            <Trash2 size={15} strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
}

// --- MAIN COMPONENT ---
export default function MembersMain() {
  const { toast } = useToast();
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterVerified, setFilterVerified] = useState<"all" | "verified" | "pending">("all");

  // Modal States
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  // --- LOAD DATA ---
  const loadMembers = async () => {
    setIsLoading(true);
    const result = await getMembers();
    if (result.success && result.data) {
      setMembers(result.data);
    } else {
      toast(result.error || "Failed to load members", "error");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadMembers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- FILTERED MEMBERS ---
  const filteredMembers = members.filter((m) => {
    const matchesSearch =
      m.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.membershipId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.ward.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterVerified === "all" ||
      (filterVerified === "verified" && m.verified) ||
      (filterVerified === "pending" && !m.verified);
    return matchesSearch && matchesFilter;
  });

  const verifiedCount = members.filter((m) => m.verified).length;

  // --- HANDLERS ---
  const handleToggleVerify = async (id: string, currentStatus: boolean) => {
    setMembers((prev) => prev.map((m) => (m.id === id ? { ...m, verified: !currentStatus } : m)));
    const result = await updateMember(id, { verified: !currentStatus });
    if (!result.success) {
      setMembers((prev) => prev.map((m) => (m.id === id ? { ...m, verified: currentStatus } : m)));
      toast(result.error || "Failed to update status", "error");
    } else {
      toast(`Member ${!currentStatus ? "verified" : "unverified"}`, "success");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this member?")) return;
    const previousMembers = [...members];
    setMembers((prev) => prev.filter((m) => m.id !== id));
    const result = await deleteMember(id);
    if (!result.success) {
      setMembers(previousMembers);
      toast(result.error || "Failed to delete member", "error");
    } else {
      toast("Member deleted successfully", "success");
    }
  };

  const openEditModal = (member: Member) => {
    setSelectedMember(member);
    setIsEditOpen(true);
  };

  return (
    <section className="relative pb-24 min-h-screen flex flex-col">
      <div className="w-full flex flex-col flex-1 gap-5">

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 pt-2">
          <div>
            <h2 className=" font-black uppercase text-[clamp(2rem,3vw,3rem)] leading-none text-[var(--color-brand-primary)]">
              Members
            </h2>
            <p className="mt-2 text-[var(--color-text-secondary)] font-medium text-sm max-w-md">
              Manage registered members, verify profiles, and update details.
            </p>
          </div>
          <button
            onClick={() => setIsAddOpen(true)}
            className="w-full sm:w-auto flex-shrink-0 bg-[var(--color-brand-primary)] text-[var(--color-on-brand)] text-sm font-bold uppercase tracking-wider px-5 py-3.5 rounded-2xl hover:bg-[var(--color-brand-hover)] active:scale-95 transition-all shadow-md hover:shadow-lg flex justify-center items-center gap-2"
          >
            <Plus size={17} strokeWidth={2.5} />
            Add Member
          </button>
        </div>

      
        {/* ── Search + Filter Bar ── */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] pointer-events-none"
              strokeWidth={2}
            />
            <input
              type="text"
              placeholder="Search by name, ID or ward…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)] focus:border-transparent transition-all"
            />
          </div>
          <div className="relative sm:w-44 flex-shrink-0">
            <select
              value={filterVerified}
              onChange={(e) => setFilterVerified(e.target.value as typeof filterVerified)}
              className="w-full appearance-none pl-4 pr-10 py-3 text-sm rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)] focus:border-transparent transition-all cursor-pointer"
            >
              <option value="all">All Members</option>
              <option value="verified">Verified</option>
              <option value="pending">Pending</option>
            </select>
            <ChevronDown
              size={14}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] pointer-events-none"
              strokeWidth={2}
            />
          </div>
        </div>

        {/* ── Results count ── */}
        {!isLoading && (
          <p className="text-xs font-semibold text-[var(--color-text-muted)] -mt-2">
            {filteredMembers.length === members.length
              ? `${members.length} member${members.length !== 1 ? "s" : ""}`
              : `${filteredMembers.length} of ${members.length} members`}
          </p>
        )}

        {/* ── Desktop Table ── */}
        <div className="hidden md:block bg-[var(--color-bg-primary)] rounded-2xl border border-[var(--color-border-default)] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="border-b border-[var(--color-border-default)] bg-[var(--color-bg-secondary)]">
                  <th className="px-5 py-3.5 text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-muted)]">Member</th>
                  <th className="px-5 py-3.5 text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-muted)]">Ward</th>
                  <th className="px-5 py-3.5 text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-muted)]">Contact</th>
                  <th className="px-5 py-3.5 text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-muted)]">Status</th>
                  <th className="px-5 py-3.5 text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-muted)]">Verify</th>
                  <th className="px-5 py-3.5 text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-muted)] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border-default)]">
                {isLoading ? (
                  [...Array(5)].map((_, i) => <SkeletonRow key={i} />)
                ) : filteredMembers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-14 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <Users size={32} className="text-[var(--color-text-muted)] opacity-40" strokeWidth={1.5} />
                        <p className="text-sm font-semibold text-[var(--color-text-muted)]">
                          {searchQuery || filterVerified !== "all" ? "No members match your filters." : "No members found."}
                        </p>
                        {(searchQuery || filterVerified !== "all") && (
                          <button
                            onClick={() => { setSearchQuery(""); setFilterVerified("all"); }}
                            className="text-xs text-[var(--color-brand-primary)] font-semibold hover:underline mt-1"
                          >
                            Clear filters
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredMembers.map((member) => (
                    <tr key={member.id} className="hover:bg-[var(--color-bg-surface)] transition-colors group">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <Avatar member={member} />
                          <div>
                            <p className="font-bold text-sm text-[var(--color-text-primary)]">{member.fullName}</p>
                            <p className="text-xs font-medium text-[var(--color-text-muted)] mt-0.5">{member.membershipId}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-sm font-medium text-[var(--color-text-primary)]">{member.ward}</td>
                      <td className="px-5 py-4 text-sm font-medium text-[var(--color-text-primary)]">{member.phoneNumber}</td>
                      <td className="px-5 py-4">
                        <VerifiedBadge verified={member.verified} />
                      </td>
                      <td className="px-5 py-4">
                        <Toggle checked={member.verified} onChange={() => handleToggleVerify(member.id, member.verified)} />
                      </td>
                      <td className="px-5 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => openEditModal(member)}
                            className="w-9 h-9 rounded-xl border border-[var(--color-border-default)] flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-brand-primary)] hover:border-[var(--color-brand-primary)] hover:bg-[var(--color-bg-surface)] transition-all"
                            title="Edit"
                          >
                            <Edit2 size={14} strokeWidth={2} />
                          </button>
                          <button
                            onClick={() => handleDelete(member.id)}
                            className="w-9 h-9 rounded-xl border border-[var(--color-border-default)] flex items-center justify-center text-[var(--color-text-muted)] hover:text-red-500 hover:border-red-400 hover:bg-red-50 transition-all"
                            title="Delete"
                          >
                            <Trash2 size={14} strokeWidth={2} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Mobile Card List ── */}
        <div className="md:hidden flex flex-col gap-3">
          {isLoading ? (
            [...Array(4)].map((_, i) => (
              <div key={i} className="bg-[var(--color-bg-primary)] border border-[var(--color-border-default)] rounded-2xl p-4 animate-pulse">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-bg-secondary)]" />
                  <div className="flex-1 space-y-2 pt-1">
                    <div className="h-3 bg-[var(--color-bg-secondary)] rounded w-2/3" />
                    <div className="h-3 bg-[var(--color-bg-secondary)] rounded w-1/3" />
                  </div>
                </div>
              </div>
            ))
          ) : filteredMembers.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-16 text-center">
              <Users size={36} className="text-[var(--color-text-muted)] opacity-40" strokeWidth={1.5} />
              <p className="text-sm font-semibold text-[var(--color-text-muted)]">
                {searchQuery || filterVerified !== "all" ? "No members match your filters." : "No members found."}
              </p>
              {(searchQuery || filterVerified !== "all") && (
                <button
                  onClick={() => { setSearchQuery(""); setFilterVerified("all"); }}
                  className="text-xs text-[var(--color-brand-primary)] font-semibold hover:underline"
                >
                  Clear filters
                </button>
              )}
            </div>
          ) : (
            filteredMembers.map((member) => (
              <MemberCard
                key={member.id}
                member={member}
                onEdit={openEditModal}
                onDelete={handleDelete}
                onToggleVerify={handleToggleVerify}
              />
            ))
          )}
        </div>

      </div>

      {/* ── Modals ── */}
      <AddMemberModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} onSuccess={loadMembers} />
      <EditMemberModal
        isOpen={isEditOpen}
        onClose={() => { setIsEditOpen(false); setSelectedMember(null); }}
        onSuccess={loadMembers}
        member={selectedMember}
      />
    </section>
  );
}