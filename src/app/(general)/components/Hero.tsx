


// import React from "react";

// const updatesData = [
//   {
//     id: 1,
//     category: "FOUNDATION UPDATES",
//     text: "We amplify the voices of people the world too ofte...",
//     image:
//       "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=200&auto=format&fit=crop",
//   },
//   {
//     id: 2,
//     category: "EDUCATION ACCESS",
//     text: "A mobile classroom reaches its 100th child in post-conf...",
//     image:
//       "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=200&auto=format&fit=crop",
//   },
//   {
//     id: 3,
//     category: "CLIMATE & JUSTICE",
//     text: "Youth activists in Kenya turn drought stories into policy",
//     image:
//       "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=200&auto=format&fit=crop",
//   },
// ];

// export default function Hero() {
//   return (
//     <section
//       className="relative pt-[8rem] px-4 overflow-hidden bg-[var(--color-bg-surface)] text-[var(--color-text-primary)]"
//       id="hero" 
//     >
//       <div className="max-w-7xl mx-auto text-center w-full">
//         {/* Image Masked Header Style */}
//         <div className="mb-10 lg:mb-16">
//           <h1
//             className="font-antonio font-black leading-[1] md:leading-[.95] py-[1rem] tracking-normal lg:tracking-tighter uppercase inline-block text-[clamp(5rem,18vw,220px)]"
//             style={{
//               backgroundImage:
//                 "url('https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop')",
//               backgroundPosition: "center",
//               backgroundSize: "cover",
//               backgroundRepeat: "no-repeat",
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//               display: "inline-block",
//               transform: "scaleX(1.3) scaleY(1.3)",
//               transformOrigin: "center",
//               WebkitTextStroke: "6px transparent",
//               paintOrder: "stroke fill",
//             }}
//           >
//             RENEWED
//             <br />
//             HOPE '27
//           </h1>
//         </div>

//          {/* Action Buttons */}
//         <div className="flex flex-col py-12 sm:flex-row items-center justify-center gap-4 max-w-md mx-auto sm:max-w-none">
//           <a
//             href="#donate"
//             className="w-full sm:w-auto px-10 py-4 bg-[var(--color-brand-primary)] text-[var(--color-on-brand)] text-sm font-bold rounded-full hover:bg-[var(--color-brand-hover)] transition-colors uppercase tracking-wider"
//           >
//             Join Now
//           </a>
//           <a
//             href="#story"
//             className="w-full sm:w-auto px-10 py-4 border-2 border-[var(--color-brand-primary)] text-[var(--color-brand-primary)] text-sm font-bold rounded-full hover:bg-[var(--color-brand-light)] transition-colors uppercase tracking-wider"
//           >
//             The Vision
//           </a>
//         </div>

//         {/* Updates Section (Mobile: Scrollable Row | Desktop: 3-Col Grid) */}
//         <div className="mb-10 text-left">
//           <div className="flex overflow-x-auto md:grid md:grid-cols-3 gap-6 md:gap-8 py-4 snap-x snap-mandatory no-scrollbar">
//             {updatesData.map((update, index) => {
//               // Cycle through the 1-5 card themes defined in your CSS based on the index
//               const cardThemeIndex = (index % 5) + 1; 

//               return (
//                 <div
//                   key={update.id}
//                   className="flex items-center gap-4 p-4 rounded-2xl min-w-[300px] sm:min-w-[350px] md:min-w-0 snap-start shrink-0 cursor-pointer group transition-transform hover:-translate-y-1"
//                   style={{ backgroundColor: `var(--card-bg-${cardThemeIndex})` }}
//                 >
//                   {/* Image */}
//                   <img
//                     src={update.image}
//                     alt={update.category}
//                     className="w-16 h-16 rounded-full object-cover shrink-0 shadow-sm"
//                   />

//                   {/* Text Content */}
//                   <div className="flex-1">
//                     <h4 
//                       className="text-xs font-bold uppercase tracking-wider mb-1"
//                       style={{ color: `var(--card-text-${cardThemeIndex})` }}
//                     >
//                       {update.category}
//                     </h4>
//                     <p className="text-[var(--color-text-primary)] font-bold text-sm leading-snug line-clamp-2">
//                       {update.text}
//                     </p>
//                   </div>

//                   {/* Arrow Button */}
//                   <button className="w-8 h-8 rounded-full border border-[var(--color-border-strong)] flex items-center justify-center shrink-0 group-hover:bg-[var(--color-bg-primary)] transition-colors bg-white/50">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       strokeWidth={1.5}
//                       stroke="currentColor"
//                       className="w-4 h-4 text-[var(--color-text-primary)]"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
//                       />
//                     </svg>
//                   </button>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//       </div>
//     </section>
//   );
// }







import React from "react";

const updatesData = [
  {
    id: 1,
    category: "FOUNDATION UPDATES",
    text: "We amplify the voices of people the world too ofte...",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 2,
    category: "EDUCATION ACCESS",
    text: "A mobile classroom reaches its 100th child in post-conf...",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 3,
    category: "CLIMATE & JUSTICE",
    text: "Youth activists in Kenya turn drought stories into policy",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=200&auto=format&fit=crop",
  },
];

export default function Hero() {
  return (
    <section
      className="relative pt-[8rem] px-4 overflow-hidden text-[var(--color-text-primary)]"
      id="hero"
      style={{ background: "var(--color-bg-surface)" }}
    >
      {/* ── Background layers ── */}

      {/* 1. Full-bleed photo */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
          backgroundRepeat: "no-repeat",
          opacity: 0.18,
          zIndex: 0,
        }}
      />

      {/* 2. Radial vignette — dark edges, open centre */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 80% 70% at 50% 30%, transparent 10%, var(--color-bg-surface, #F8F9F5) 80%)",
          zIndex: 1,
        }}
      />

      {/* 3. Soft bottom fade so cards sit cleanly */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "40%",
          background:
            "linear-gradient(to bottom, transparent, var(--color-bg-surface, #F8F9F5) 85%)",
          zIndex: 2,
        }}
      />

      {/* 4. Subtle grain texture */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          opacity: 0.5,
          zIndex: 3,
          pointerEvents: "none",
        }}
      />

      {/* ── Content (above all bg layers) ── */}
      <div className="relative max-w-7xl mx-auto text-center w-full" style={{ zIndex: 4 }}>

        {/* Image Masked Header */}
        <div className="mb-10 lg:mb-16">
          <h1
            className="font-antonio font-black leading-[1] md:leading-[.95] py-[1rem] tracking-wide lg:tracking-tight uppercase inline-block text-[clamp(5rem,18vw,220px)]"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop')",
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              display: "inline-block",
              transform: "scaleX(1.3) scaleY(1.1)",
              transformOrigin: "center",
              WebkitTextStroke: "6px transparent",
              paintOrder: "stroke fill",
            }}
          >
            RENEWED
            <br />
            HOPE '27
          </h1>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col py-12 sm:flex-row items-center justify-center gap-4 max-w-md mx-auto sm:max-w-none">
          <a
            href="#donate"
            className="w-full sm:w-auto px-10 py-4 bg-[var(--color-brand-primary)] text-[var(--color-on-brand)] text-sm font-bold rounded-full hover:bg-[var(--color-brand-hover)] transition-colors uppercase tracking-wider"
          >
            Join Now
          </a>
          <a
            href="#story"
            className="w-full sm:w-auto px-10 py-4 border-2 border-[var(--color-brand-primary)] text-[var(--color-brand-primary)] text-sm font-bold rounded-full hover:bg-[var(--color-brand-light)] transition-colors uppercase tracking-wider"
          >
            The Vision
          </a>
        </div>

        {/* Updates Section */}
        <div className="mb-10 text-left">
          <div className="flex overflow-x-auto md:grid md:grid-cols-3 gap-6 md:gap-8 py-4 snap-x snap-mandatory no-scrollbar">
            {updatesData.map((update, index) => {
              const cardThemeIndex = (index % 5) + 1;

              return (
                <div
                  key={update.id}
                  className="flex items-center gap-4 p-4 rounded-2xl min-w-[300px] sm:min-w-[350px] md:min-w-0 snap-start shrink-0 cursor-pointer group transition-transform hover:-translate-y-1"
                  style={{ backgroundColor: `var(--card-bg-${cardThemeIndex})` }}
                >
                  <img
                    src={update.image}
                    alt={update.category}
                    className="w-16 h-16 rounded-full object-cover shrink-0 shadow-sm"
                  />

                  <div className="flex-1">
                    <h4
                      className="text-xs font-bold uppercase tracking-wider mb-1"
                      style={{ color: `var(--card-text-${cardThemeIndex})` }}
                    >
                      {update.category}
                    </h4>
                    <p className="text-[var(--color-text-primary)] font-bold text-sm leading-snug line-clamp-2">
                      {update.text}
                    </p>
                  </div>

                  <button className="w-8 h-8 rounded-full border border-[var(--color-border-strong)] flex items-center justify-center shrink-0 group-hover:bg-[var(--color-bg-primary)] transition-colors bg-white/50">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4 text-[var(--color-text-primary)]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                      />
                    </svg>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}