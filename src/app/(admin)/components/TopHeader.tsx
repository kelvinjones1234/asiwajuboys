"use client";

import React from "react";
import { Menu } from "lucide-react";
import Link from "next/link";

interface TopHeaderProps {
  setSidebarOpen: (isOpen: boolean) => void;
}

export default function TopHeader({ setSidebarOpen }: TopHeaderProps) {
  return (
    <header className="h-16 bg-[var(--color-bg-surface)] border-b border-[var(--color-border-strong)] sticky top-0 z-30 overflow-hidden">
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

      {/* Content Container */}
      <div className="relative z-10 w-full h-full flex items-center justify-between px-6">
        {/* Left side: Hamburger (Mobile) & Greeting */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden w-10 h-10 rounded-full border border-[var(--color-border-strong)] flex items-center justify-center shrink-0 hover:bg-[var(--color-bg-primary)] transition-colors bg-white/50 text-[var(--color-text-primary)]"
          >
            <Menu className="w-5 h-5" strokeWidth={1.5} />
          </button>

          <div className="hidden sm:block">
            {/* Typography matching Hero header (Antonio font, uppercase, tight tracking) */}
            <h2 className="font-black text-xl md:text-2xl uppercase text-[var(--color-text-primary)]">
              Welcome to Admin Dashboard
            </h2>
          </div>
        </div>

        {/* Right side: Actions & Profile */}
        <div className="flex items-center gap-4 sm:gap-6 shrink-0">
          <div className="flex items-center">
            {/* Notification Button - Styled like Hero Arrow Button */}
            <Link href="/" className="px-3 py-2 border rounded-xl text-sm">
              View Site
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
