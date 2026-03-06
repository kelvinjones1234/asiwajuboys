"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
} from "lucide-react";
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
    // { name: "Categories", href: "/dashboard/categories", icon: Layers },
    // { name: "Products", href: "/dashboard/products", icon: Package },
    // { name: "Payments", href: "/dashboard/payments", icon: CreditCard },
    // { name: "Orders", href: "/dashboard/orders", icon: ShoppingCart },
  ];

  const handleLinkClick = () => {
    if (isOpen) {
      setIsOpen(false);
    }
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
          <div className="hidden md:flex items-center p-4 gap-2 text-[var(--color-text-primary)]">
            <Image
              src="/logo.png"
              alt="Voices United Logo"
              width={60}
              height={40}
            />
            <h2 className="font-antonio text-[1.5rem]"> Asiwajuboys</h2>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 overflow-y-auto no-scrollbar py-6 flex flex-col gap-2 px-4">
            <div className="flex items-center pb-4 gap-2 text-[var(--color-text-primary)]">
              <Image
                src="/logo.png"
                alt="Voices United Logo"
                width={60}
                height={40}
              />
              <h2 className="font-antonio text-[1.5rem]"> Asiwajuboys</h2>
            </div>

            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={handleLinkClick}
                  className={`flex items-center gap-4 px-5 py-3.5 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 group ${
                    isActive
                      ? "bg-[var(--color-brand-primary)] text-[var(--color-on-brand)] shadow-sm"
                      : "text-[var(--color-text-primary)] hover:bg-[var(--color-brand-light)] border border-transparent hover:border-[var(--color-brand-primary)]"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 ${
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
          <div className="p-4 border-t border-[var(--color-border-strong)] space-y-2 bg-white/30 backdrop-blur-sm shrink-0">
            <Link
              href="/settings"
              onClick={handleLinkClick}
              className="flex items-center gap-4 px-5 py-3.5 text-xs font-bold uppercase tracking-wider rounded-full text-[var(--color-text-primary)] hover:bg-[var(--color-brand-light)] border border-transparent hover:border-[var(--color-brand-primary)] transition-all duration-300 group"
            >
              <Settings
                className="w-4 h-4 text-[var(--color-text-primary)] group-hover:text-[var(--color-brand-primary)]"
                strokeWidth={1.5}
              />
              <span className="mt-0.5">Settings</span>
            </Link>
            <button className="w-full flex items-center gap-4 px-5 py-3.5 text-xs font-bold uppercase tracking-wider rounded-full text-[var(--color-text-primary)] hover:bg-red-50 hover:text-red-600 border border-transparent hover:border-red-200 transition-all duration-300 group">
              <LogOut
                className="w-4 h-4 text-[var(--color-text-primary)] group-hover:text-red-600"
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
