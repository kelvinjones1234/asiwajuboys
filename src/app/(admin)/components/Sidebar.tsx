"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react"; // 1. Import signOut
import { LayoutDashboard, Users, Settings, LogOut } from "lucide-react";
import Image from "next/image";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Members", href: "/dashboard/members", icon: Users },
  ];

  const handleLinkClick = () => {
    if (isOpen) {
      setIsOpen(false);
    }
  };

  // 2. Create the logout handler
  const handleLogout = async () => {
    // You can specify where to redirect after logout, e.g., the login page
    await signOut({ callbackUrl: "/auth/login" });
  };

  return (
    <>
      {/* Mobile Backdrop overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 h-screen w-[260px] bg-[var(--color-bg-surface)] border-r border-[var(--color-border-strong)] z-50 flex flex-col transition-transform duration-300 ease-in-out transform overflow-hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Subtle grain texture (Matching Hero) */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            opacity: 0.5,
            zIndex: 0,
            pointerEvents: "none",
          }}
        />

        {/* Content Wrapper (Above background texture) */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Brand Logo Header */}
          <div className="flex items-center px-6 pb-6 pt-4 gap-3 text-[var(--color-text-primary)] shrink-0">
            <Image
              src="/logo2.jpeg"
              alt="Voices United Logo"
              width={48}
              height={32}
              className="object-contain"
            />
            <h2 className="text-xl text-center leading-[.6] pt-4 font-semibold uppercase">
              Asiwajuboys <br /> <span className="text-lg">Movement</span>
            </h2>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col gap-2 px-2 py-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={handleLinkClick}
                  className={`flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 group ${
                    isActive
                      ? "bg-[var(--color-brand-primary)] text-[var(--color-on-brand)] shadow-sm"
                      : "text-[var(--color-text-primary)] hover:bg-[var(--color-brand-light)] border border-transparent hover:border-[var(--color-brand-primary)]"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 shrink-0 ${
                      isActive
                        ? "text-[var(--color-on-brand)]"
                        : "text-[var(--color-text-primary)] group-hover:text-[var(--color-brand-primary)]"
                    }`}
                    strokeWidth={isActive ? 2 : 1.5}
                  />
                  <span className="mt-0.5">{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Bottom Actions */}
          <div className="px-2 py-4 border-t border-[var(--color-border-strong)] flex flex-col gap-2 bg-white/30 backdrop-blur-sm shrink-0">
            {/* 3. Attach handleLogout to onClick */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-wider rounded-full text-[var(--color-text-primary)] hover:bg-red-50 hover:text-red-600 border border-transparent hover:border-red-200 transition-all duration-300 group"
            >
              <LogOut
                className="w-4 h-4 shrink-0 text-[var(--color-text-primary)] group-hover:text-red-600"
                strokeWidth={1.5}
              />
              <span className="mt-0.5">Log Out</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
