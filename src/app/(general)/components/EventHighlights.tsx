"use client";

import React, { useState, useRef, useEffect } from "react";

const storiesData = [
  {
    id: 1,
    title: "Amina and Leila, (17 and 19 y.o.)",
    description:
      "Sisters in Uganda brought more than meals — they brought dignity, hope, and daily food to dozens of families living in poverty.",
    image:
      "https://images.unsplash.com/photo-1531123897727-8f129e1bf98c?q=80&w=800&auto=format&fit=crop",
    tag: "Community",
  },
  {
    id: 2,
    title: "David's Community Garden",
    description:
      "Turning abandoned lots into thriving food sources for the neighborhood.",
    image:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=400&auto=format&fit=crop",
    tag: "Food",
  },
  {
    id: 3,
    title: "Elena's Mobile Clinic",
    description: "Bringing vital healthcare directly to rural communities.",
    image:
      "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=400&auto=format&fit=crop",
    tag: "Health",
  },
  {
    id: 4,
    title: "Marcus and The Tech Bus",
    description: "Bridging the digital divide for thousands of rural students.",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop",
    tag: "Education",
  },
  {
    id: 5,
    title: "Sarah's Clean Water Initiative",
    description: "Building sustainable wells that power entire villages.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
    tag: "Water",
  },
  {
    id: 6,
    title: "The Youth Council",
    description: "Empowering the next generation of local policymakers.",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
    tag: "Leadership",
  },
  {
    id: 7,
    title: "Maria's Art Therapy",
    description: "Healing trauma through community mural projects.",
    image:
      "https://images.unsplash.com/photo-1506863530036-1ef04634ca31?q=80&w=400&auto=format&fit=crop",
    tag: "Arts",
  },
  {
    id: 8,
    title: "James & Solar Solutions",
    description: "Providing affordable, renewable energy to off-grid homes.",
    image:
      "https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=400&auto=format&fit=crop",
    tag: "Energy",
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
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // On mobile, auto-scroll to expanded card
  useEffect(() => {
    if (!isMobile || !scrollRef.current) return;
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
    <section className="eh-root pb-12 px-4 bg-[var(--color-bg-surface)] overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="font-antonio font-black uppercase tracking-widest text-[clamp(2.5rem,8vw,4.5rem)] leading-none inline-block text-[var(--color-brand-primary)]">
            Event Highlights
          </h2>
          <p className="mt-4 font-medium leading-relaxed text-[var(--color-text-secondary)] text-[clamp(0.85rem,2vw,1rem)]">
            Real voices from the front lines of change. These are the people
            shaping their communities — and the future.
          </p>
        </div>

        {/* Gallery */}
        <div
          ref={scrollRef}
          className="no-scrollbar flex gap-3 overflow-x-auto pb-3 snap-x snap-mandatory touch-pan-x"
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
                className="story-card relative overflow-hidden cursor-pointer shrink-0 snap-start h-[clamp(320px,45vw,460px)]"
                style={{
                  width: isExpanded ? expandedW : collapsedW,
                  borderRadius: "1.25rem" /* Fixed border radius here */,
                  boxShadow: isExpanded
                    ? "0 20px 50px rgba(0,0,0,0.28)"
                    : "0 4px 12px rgba(0,0,0,0.12)",
                }}
                onMouseEnter={() => !isMobile && setExpandedId(story.id)}
                onClick={() => setExpandedId(story.id)}
              >
                {/* Image */}
                <img
                  src={story.image}
                  alt={story.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Gradient overlay */}
                <div
                  className="absolute inset-0 transition-all duration-550 ease-in-out"
                  style={{
                    background: isExpanded
                      ? "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.18) 50%, transparent 100%)"
                      : "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%)",
                  }}
                />

                {/* Collapsed: rotated label */}
                <div className="pill-label text-white/85 text-[11px] font-bold uppercase whitespace-nowrap pointer-events-none">
                  {story.tag}
                </div>

                {/* Arrow button */}
                <button
                  className="arrow-btn absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center text-white z-10 border border-white/30"
                  aria-label="View story"
                >
                  <ArrowIcon />
                </button>

                {/* Expanded content */}
                <div className="card-content absolute bottom-0 left-0 right-0 p-6 text-white z-10">
                  <div className="inline-flex items-center px-3 py-[3px] rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-[11px] font-semibold tracking-wider uppercase mb-2.5">
                    {story.tag}
                  </div>
                  <h3 className="font-bold leading-tight mb-2 text-[clamp(1rem,2.5vw,1.25rem)]">
                    {story.title}
                  </h3>
                  <p className="text-[0.82rem] leading-relaxed text-white/80 line-clamp-3 overflow-hidden">
                    {story.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
