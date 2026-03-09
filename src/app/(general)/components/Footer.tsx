"use client";

import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--color-brand-dark)] text-white pt-16 pb-8 px-4 font-dm-sans border-t border-[var(--color-brand-primary)]">
      <div className="max-w-7xl mx-auto w-full">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-16">
          {/* Brand & Mission */}
          <div className="md:w-1/2 max-w-sm">
            <h2 className="font-syne font-bold uppercase tracking-widest text-3xl mb-4 text-white">
              Frontlines
            </h2>
            <p className="text-white/80 leading-relaxed text-sm">
              Empowering local leaders and sharing the real stories of
              community-driven change. Join us in building a more equitable,
              sustainable future for everyone.
            </p>
          </div>

          {/* Contact Information */}
          <div className="md:w-1/2 max-w-md md:text-right flex flex-col md:items-end">
            <h3 className="font-syne font-bold text-lg mb-3 text-white">
              Get in Touch
            </h3>
            <div className="space-y-2 text-white/80 text-sm">
              <p>
                <a
                  href="mailto:hello@frontlines.org"
                  className="hover:text-white transition-colors duration-200"
                >
                  hello@asiwajuboys.org
                </a>
              </p>
              <p>
                <a
                  href="tel:+1234567890"
                  className="hover:text-white transition-colors duration-200"
                >
                  +2349074433333
                </a>
              </p>
            </div>
          </div> 
        </div>

        {/* Bottom Bar: Legal & Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <p>
            &copy; {currentYear} asiwajuboys movement. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="hover:text-white transition-colors duration-200"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="hover:text-white transition-colors duration-200"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
