"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll handler
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute("href");
    if (!href || !href.startsWith("#")) return;

    const targetId = href.replace("#", "");
    const elem = document.getElementById(targetId);

    if (elem) {
      elem.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      // Close mobile menu if it's open after clicking a link
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-40 transition-all duration-300 ${
          isScrolled ? "bg-white/90" : "bg-transparent"
        }`}
      >
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* MOBILE VIEW */}
            <div className="flex md:hidden w-full justify-between items-center">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className={`w-11 h-11 rounded-full border flex items-center justify-center transition-colors ${
                  isScrolled
                    ? "border-[var(--color-border-strong)] hover:bg-[var(--color-bg-secondary)]"
                    : "border-gray-800 hover:bg-white/20"
                }`}
                aria-label="Open menu"
              >
                <svg
                  className="w-5 h-5 text-[var(--color-text-primary)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>

              <a
                href="#membership"
                onClick={handleSmoothScroll}
                className={`px-6 py-2 rounded-full border text-sm font-bold transition-colors tracking-wide ${
                  isScrolled
                    ? "border-[var(--color-border-strong)] text-[var(--color-text-primary)] hover:bg-[var(--color-bg-secondary)]"
                    : "border-gray-800 text-[var(--color-text-primary)] hover:bg-white/20"
                }`}
              >
                Join Now
              </a>
            </div>

            {/* DESKTOP VIEW */}
            <div className="hidden md:flex items-center gap-2 text-[var(--color-text-primary)]">
              <Image src="/logo2.jpeg" alt="Voices United Logo" width={60} height={40} />
            </div>

            <div className="hidden md:flex items-center space-x-8 text-xs font-bold uppercase tracking-widest text-[var(--color-text-secondary)]">
              <a
                className="hover:text-[var(--color-brand-primary)] transition-colors"
                href="#hero"
                onClick={handleSmoothScroll}
              >
                Home
              </a>
              <a
                className="hover:text-[var(--color-brand-primary)] transition-colors"
                href="#highlights"
                onClick={handleSmoothScroll}
              >
                Event Highlights
              </a>
              <a
                className="bg-[var(--color-text-primary)] text-[var(--color-bg-primary)] px-6 py-2.5 rounded-full hover:bg-[var(--color-brand-primary)] hover:text-[var(--color-on-brand)] transition-all shadow-sm"
                href="#membership"
                onClick={handleSmoothScroll}
              >
                Join Movement
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE SLIDE-OUT MENU */}
      <div
        className={`fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 backdrop-blur-sm md:hidden ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      ></div>

      <div
        className={`fixed top-0 left-0 w-[80%] max-w-sm h-full bg-[var(--color-bg-surface)] z-50 transform transition-transform duration-300 shadow-2xl flex flex-col md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-[var(--color-border-default)]">
          <div className="flex items-center gap-2 text-[var(--color-text-primary)]">
            <Image src="/logo2.jpeg" alt="Voices United Logo" width={40} height={40} />
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-10 h-10 rounded-full bg-[var(--color-bg-secondary)] flex items-center justify-center hover:bg-[var(--color-border-default)] transition-colors border border-[var(--color-border-default)]"
          >
            <svg className="w-5 h-5 text-[var(--color-text-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div className="flex flex-col p-6 space-y-6 text-sm font-bold uppercase tracking-widest text-[var(--color-text-secondary)]">
          <a
            href="#hero"
            onClick={handleSmoothScroll}
            className="hover:text-[var(--color-brand-primary)] transition-colors"
          >
            Home
          </a>
          <a
            href="#highlights"
            onClick={handleSmoothScroll}
            className="hover:text-[var(--color-brand-primary)] transition-colors"
          >
            Events Highlights
          </a>
        </div>

        <div className="mt-auto p-6 border-t border-[var(--color-border-default)]">
          <a
            href="#membership"
            onClick={handleSmoothScroll}
            className="block w-full text-center bg-[var(--color-text-primary)] text-[var(--color-bg-primary)] px-6 py-4 rounded-full hover:bg-[var(--color-brand-primary)] hover:text-[var(--color-on-brand)] transition-all font-bold uppercase tracking-widest text-sm"
          >
            Join Movement
          </a>
        </div>
      </div>
    </>
  );
}