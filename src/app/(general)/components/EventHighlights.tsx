"use client";

import React, { useState, useRef, useEffect } from "react";

const storiesData = [
  {
    id: 1,

    image: "/h6.jpeg",
  },
  {
    id: 2,

    image: "/h7.jpeg",
  },
  {
    id: 3,

    image: "/h8.jpeg",
  },
  {
    id: 4,

    image: "h9.jpeg",
  },
  {
    id: 5,

    image: "h10.jpeg",
  },
  {
    id: 6,

    image: "/h1.jpeg",
  },
  {
    id: 7,
    image: "/h2.jpeg",
  },
  {
    id: 8,

    image: "/h4.jpeg",
  },
];

const ArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="w-4 h-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
    />
  </svg>
);

export default function EventHighlights() {
  const [expandedId, setExpandedId] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // 1. ADDED: A ref to track if the user has interacted with the component yet
  const hasInteracted = useRef(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // On mobile, auto-scroll to expanded card
  useEffect(() => {
    // 2. UPDATED: Abort the scroll if the user hasn't clicked a card yet
    if (!isMobile || !scrollRef.current || !hasInteracted.current) return;

    const container = scrollRef.current;
    const activeEl = container.querySelector("[data-expanded='true']");
    if (activeEl) {
      activeEl.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [expandedId, isMobile]);

  return (
    <section
      id="highlights"
      className="eh-root pb-12 px-4 bg-[var(--color-bg-surface)] overflow-hidden flex justify-center"
    >
      {" "}
      <div className="max-w-7xl w-full">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="font-antonio font-black uppercase tracking-widest text-[clamp(2.5rem,8vw,4.5rem)] leading-none inline-block text-[var(--color-brand-primary)]">
            Event Highlights
          </h2>
          <p className="mt-4 font-medium leading-relaxed text-[var(--color-text-secondary)] text-[clamp(0.85rem,2vw,1rem)] mx-auto max-w-2xl">
            Real voices from the front lines of change. These are the people
            shaping their communities — and the future.
          </p>
        </div>

        {/* Gallery */}
        <div className="no-scrollbar overflow-x-auto pb-6 w-full">
          <div
            ref={scrollRef}
            className="flex gap-3 snap-x snap-mandatory touch-pan-x md:w-max md:mx-auto"
          >
            {storiesData.map((story) => {
              const isExpanded = expandedId === story.id;
              const expandedW = isMobile
                ? "min(78vw, 320px)"
                : "clamp(280px, 28vw, 420px)";
              const collapsedW = isMobile ? "64px" : "80px";

              return (
                <div
                  key={story.id}
                  data-expanded={isExpanded ? "true" : "false"}
                  className="story-card relative overflow-hidden cursor-pointer shrink-0 snap-center h-[clamp(320px,45vw,460px)]"
                  style={{
                    width: isExpanded ? expandedW : collapsedW,
                    minWidth: isExpanded ? expandedW : collapsedW,
                    borderRadius: "1.25rem",
                    boxShadow: isExpanded
                      ? "0 20px 50px rgba(0,0,0,0.28)"
                      : "0 4px 12px rgba(0,0,0,0.12)",
                  }}
                  onMouseEnter={() => !isMobile && setExpandedId(story.id)}
                  // 3. UPDATED: Set interaction to true before expanding the card
                  onClick={() => {
                    hasInteracted.current = true;
                    setExpandedId(story.id);
                  }}
                >
                  {/* Image */}
                  <img
                    src={story.image}
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Gradient overlay */}
                  <div
                    className="absolute inset-0 transition-all duration-700 ease-in-out"
                    style={{
                      background: isExpanded
                        ? "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.18) 50%, transparent 100%)"
                        : "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%)",
                    }}
                  />

                  {/* Collapsed: rotated label */}
                  <div className="pill-label text-white/85 text-[11px] font-bold uppercase whitespace-nowrap pointer-events-none"></div>

                  {/* Arrow button */}

                  {/* Expanded content */}
                  <div className="card-content absolute bottom-0 left-0 right-0 p-6 text-white z-10">
                    <div className="inline-flex items-center px-3 py-[3px] rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-[11px] font-semibold tracking-wider uppercase mb-2.5"></div>
                    <h3 className="font-bold leading-tight mb-2 text-[clamp(1rem,2.5vw,1.25rem)]"></h3>
                    <p className="text-[0.82rem] leading-relaxed text-white/80 line-clamp-3 overflow-hidden"></p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
