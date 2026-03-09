"use client";

import React, { useState, useRef, useEffect } from "react";
import html2canvas from "html2canvas";
import { getMemberById } from "@/app/action/getMemeber";

interface Member {
  membershipId: string;
  fullName: string;
  ward: string;
  phoneNumber: string;
  picture: string;
  createdAt: Date;
  verified: boolean;
}

const Main = () => {
  const [searchId, setSearchId] = useState("");
  const [member, setMember] = useState<Member | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false); // New state for flipping

  const [isMounted, setIsMounted] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
    const savedMember = localStorage.getItem("asiwajuMemberProfile");
    if (savedMember) {
      try {
        setMember(JSON.parse(savedMember));
      } catch (err) {
        console.error("Failed to parse saved member data", err);
      }
    }
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMember(null);
    setIsLoading(true);
    setIsFlipped(false); // Reset flip state on new search

    try {
      const result = await getMemberById(searchId.trim().toUpperCase());

      if (result.success && result.data) {
        const memberData = result.data as unknown as Member;
        setMember(memberData);
        localStorage.setItem(
          "asiwajuMemberProfile",
          JSON.stringify(memberData),
        );
      } else {
        setError(result.error || "Membership ID not found. Please try again.");
      }
    } catch (err) {
      setError("A network error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setMember(null);
    setSearchId("");
    setError("");
    setIsFlipped(false);
    localStorage.removeItem("asiwajuMemberProfile");
  };

  const downloadCard = async () => {
    if (!cardRef.current || !member) return;

    setIsDownloading(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 3,
        useCORS: true,
        backgroundColor: null,
      });

      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      // Dynamically name the file based on the side being downloaded
      const side = isFlipped ? "Back" : "Front";
      link.download = `Asiwajuboys_ID_${member.membershipId}_${side}.png`;
      link.click();
    } catch (err) {
      console.error("Failed to download image:", err);
      setError("Failed to download card. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  if (!isMounted) return null;

  return (
    <section className="min-h-screen bg-[var(--color-bg-secondary,#f3f4f6)] py-12 px-4 sm:px-6 flex flex-col items-center justify-center font-sans">
      {!member && (
        <div className="w-full max-w-lg text-center mb-12 animate-fade-in-up">
          <h1 className="font-antonio font-black uppercase tracking-widest text-3xl sm:text-4xl text-[var(--color-brand-primary,#111827)] mb-3">
            Access Your Profile
          </h1>
          <p className="text-[var(--color-text-secondary,#4b5563)] text-sm sm:text-base mb-8 px-2">
            Enter your unique 8-character Membership ID to retrieve and download
            your official digital ID card.
          </p>

          <form
            onSubmit={handleSearch}
            className="flex flex-col sm:flex-row gap-3 w-full"
          >
            <input
              type="text"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder="e.g. A1B2C3D4"
              className="flex-1 px-6 py-3.5 rounded-full border border-[var(--color-border-default,#d1d5db)] bg-[var(--color-bg-surface,#ffffff)] text-[var(--color-text-primary,#111827)] uppercase placeholder:normal-case placeholder:text-gray-400 outline-none focus:border-[var(--color-brand-primary,#111827)] focus:ring-2 focus:ring-[var(--color-brand-primary,#111827)] focus:ring-opacity-20 transition-all shadow-sm"
              required
              maxLength={8}
            />
            <button
              type="submit"
              disabled={isLoading || !searchId}
              className="w-full sm:w-auto px-8 py-3.5 bg-[var(--color-brand-primary,#111827)] text-white rounded-full font-bold uppercase tracking-wide hover:bg-opacity-90 active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100 flex items-center justify-center min-w-[140px] shadow-md"
            >
              {isLoading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                "Retrieve"
              )}
            </button>
          </form>

          {error && (
            <div className="mt-5 flex items-center gap-2 p-3.5 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm text-left animate-fade-in-up">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 flex-shrink-0"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-medium">{error}</span>
            </div>
          )}
        </div>
      )}

      {member && (
        <div className="w-full max-w-md mt-[3rem] flex flex-col items-center animate-fade-in-up">
          <p className="text-center py-2 max-w-[320px]">
            Please retain your Membership ID for future access to your digital
            card.
          </p>
          <div className="w-full overflow-x-auto pb-4 flex justify-center no-scrollbar">
            {/* ID Card Wrapper */}
            <div
              ref={cardRef}
              className="relative shrink-0 w-[300px] h-[480px] bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col border border-gray-100 transition-opacity duration-300"
            >
              {!isFlipped ? (
                /* --- FRONT OF CARD --- */
                <div className="flex flex-col h-full w-full animate-fade-in">
                  <div className="h-32 bg-gradient-to-br from-[var(--color-brand-primary,#111827)] to-gray-800 relative flex justify-center items-start pt-7">
                    <div
                      className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                        backgroundSize: "12px 12px",
                      }}
                    ></div>
                    <h2 className="text-white font-antonio font-bold tracking-[0.2em] text-xl z-10 uppercase drop-shadow-md">
                      ASIWAJU BOYS
                    </h2>
                  </div>

                  <div className="absolute top-16 left-1/2 -translate-x-1/2 z-20">
                    <div className="w-28 h-28 rounded-full border-[5px] border-white shadow-md overflow-hidden bg-gray-50 flex items-center justify-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={member.picture}
                        alt={member.fullName}
                        crossOrigin="anonymous"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="%23ccc"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>';
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col items-center justify-start pt-14 pb-5 px-6 text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-1 leading-normal break-words w-full px-2 uppercase">
                      {member.fullName}
                    </h3>

                    {member.verified ? (
                      <div className="flex items-center text-emerald-700 font-bold uppercase tracking-[0.1em] text-[10px] mb-3 0 px-3 py-1 rounded-full">
                        Verified Member
                      </div>
                    ) : (
                      <div className="flex items-center text-amber-600 font-bold uppercase tracking-[0.1em] text-[10px] mb-3  px-3 py-1 rounded-full">
                        Pending Verification
                      </div>
                    )}

                    <div className="w-full bg-gray-50 rounded-xl p-4 mb-auto border border-gray-100 shadow-inner">
                      <div className="flex flex-col mb-3">
                        <span className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">
                          Membership ID
                        </span>
                        <span className="font-mono font-bold text-lg tracking-widest text-gray-800">
                          {member.membershipId}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">
                          Ward / District
                        </span>
                        <span className="font-semibold text-sm text-gray-700">
                          {member.ward}
                        </span>
                      </div>
                    </div>

                    <div className="w-full mt-4 flex flex-col items-center justify-center gap-2">
                      <div className="w-3/4 h-6 opacity-30 flex gap-[2px] justify-center items-center">
                        {[...Array(24)].map((_, i) => (
                          <div
                            key={i}
                            className="bg-gray-800 h-full"
                            style={{
                              width: `${Math.max(1, Math.random() * 4)}px`,
                            }}
                          ></div>
                        ))}
                      </div>
                      <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">
                        Issued:{" "}
                        {new Date(member.createdAt).toLocaleDateString(
                          undefined,
                          { year: "numeric", month: "short", day: "numeric" },
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                /* --- BACK OF CARD --- */
                <div className="flex flex-col h-full w-full bg-white p-6 relative animate-fade-in text-gray-800">
                  <div className="w-full border-b-2 border-gray-200 pb-3 mb-5 mt-4 text-center">
                    <h2 className="font-antonio font-bold tracking-[0.15em] text-lg uppercase text-[var(--color-brand-primary,#111827)]">
                      Asiwaju Boys
                    </h2>
                    <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mt-1">
                      Official Property
                    </p>
                  </div>

                  <div className="flex-1 flex flex-col gap-3 text-xs leading-relaxed text-gray-600 px-1 text-justify">
                    <p>
                      <strong>1.</strong> This identity card is strictly
                      non-transferable and remains the absolute property of the
                      Asiwaju Boys organization.
                    </p>
                    <p>
                      <strong>2.</strong> The bearer whose details appear on the
                      reverse side is an officially registered member and is
                      subject to the organization's code of conduct.
                    </p>
                    <p>
                      <strong>3.</strong> If this card is found, please drop it
                      at the nearest police station or return it to the
                      organization's national headquarters.
                    </p>
                  </div>

                  <div className="w-full mt-auto pt-6 pb-2 flex flex-col items-center border-t border-gray-100">
                    {/* Dummy Signature Area */}
                    <div
                      className="font-[cursive] text-xl text-gray-800 mb-1 opacity-80"
                      style={{
                        fontFamily: "'Brush Script MT', cursive, sans-serif",
                      }}
                    >
                      Dr. Freeman Ezeiriaku
                    </div>
                    <div className="w-40 h-[1px] bg-gray-400 mb-2"></div>
                    <span className="text-[9px] uppercase tracking-widest text-gray-500 font-bold">
                      Authorized Signature
                    </span>
                  </div>

                  {/* Aesthetic barcode at bottom back */}
                  <div className="w-full mt-4 flex justify-center h-8 opacity-40 gap-[2px]">
                    {[...Array(30)].map((_, i) => (
                      <div
                        key={i}
                        className="bg-gray-800 h-full"
                        style={{ width: `${Math.max(1, Math.random() * 5)}px` }}
                      ></div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 flex flex-col items-center justify-center gap-3 w-full max-w-[300px]">
            {/* Flip Controls */}
            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className="flex items-center justify-center gap-2 w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-6 rounded-full font-bold uppercase text-xs tracking-wide hover:bg-gray-200 hover:text-gray-900 active:scale-95 transition-all shadow-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className={`w-4 h-4 transition-transform duration-300 ${isFlipped ? "rotate-180" : ""}`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
              {isFlipped ? "View Front" : "View Back"}
            </button>

            {/* Download */}
            <button
              onClick={downloadCard}
              disabled={isDownloading}
              className="flex items-center justify-center gap-3 w-full bg-[var(--color-brand-primary,#111827)] text-white py-4 px-6 rounded-full font-bold uppercase text-sm tracking-wide hover:bg-opacity-90 active:scale-95 transition-all disabled:opacity-70 disabled:active:scale-100 shadow-[0_10px_20px_rgba(0,0,0,0.1)]"
            >
              {isDownloading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                  />
                </svg>
              )}
              {isDownloading
                ? "Generating..."
                : `Download ${isFlipped ? "Back" : "Front"}`}
            </button>

            <button
              onClick={handleBack}
              disabled={isDownloading}
              className="flex items-center justify-center gap-2 w-full bg-white border-2 border-gray-200 text-[var(--color-text-secondary,#4b5563)] py-3 px-6 mt-2 rounded-full font-bold uppercase text-xs tracking-wide hover:border-[var(--color-brand-primary,#111827)] hover:text-[var(--color-brand-primary,#111827)] active:scale-95 transition-all disabled:opacity-70 disabled:active:scale-100 group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
              Search Again
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Main;
