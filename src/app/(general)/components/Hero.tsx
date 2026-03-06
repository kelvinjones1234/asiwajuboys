// import React from "react";

// const updatesData = [
//   {
//     id: 1,
//     category: "INFRASTRUCTURE",
//     text: "The Lagos-Calabar Coastal Highway: Connecting 8 states and boosting regional trade.",
//     image:
//       "/bridge.jpg", // Modern bridge/road imagery
//   },
//   {
//     id: 2,
//     category: "ECONOMIC EMPOWERMENT",
//     text: "Renewed Hope SME Grants: Empowering 1 million entrepreneurs with seed capital nationwide.",
//     image:
//       "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=200&auto=format&fit=crop", // Market/Business imagery
//   },
//   {
//     id: 3,
//     category: "FOOD SECURITY",
//     text: "Dry-season farming initiative yields 500,000 tonnes of wheat in the first harvest cycle.",
//     image:
//       "/food.jpg", // Agriculture/Wheat field imagery
//   },
// ];

// export default function Hero() {
//   return (
//     <section
//       className="relative pt-[8rem] px-4 overflow-hidden text-[var(--color-text-primary)]"
//       id="hero"
//       style={{ background: "var(--color-bg-surface)" }}
//     >
//       {/* ── Background layers ── */}

//       {/* 1. Full-bleed photo */}
//       <div
//         aria-hidden="true"
//         style={{
//           position: "absolute",
//           inset: 0,
//           backgroundImage: "url('/bg2.jpg')",
//           backgroundSize: "cover",
//           backgroundPosition: "center 30%",
//           backgroundRepeat: "no-repeat",
//           opacity: 0.4,
//           zIndex: 0,
//         }}
//       />

//       {/* 2. Radial vignette — dark edges, open centre */}
//       <div
//         aria-hidden="true"
//         style={{
//           position: "absolute",
//           inset: 0,
//           background:
//             "radial-gradient(ellipse 80% 70% at 50% 30%, transparent 10%, var(--color-bg-surface, #F8F9F5) 80%)",
//           zIndex: 1,
//         }}
//       />

//       {/* 3. Soft bottom fade so cards sit cleanly */}
//       <div
//         aria-hidden="true"
//         style={{
//           position: "absolute",
//           bottom: 0,
//           left: 0,
//           right: 0,
//           height: "40%",
//           background:
//             "linear-gradient(to bottom, transparent, var(--color-bg-surface, #F8F9F5) 85%)",
//           zIndex: 2,
//         }}
//       />

//       {/* 4. Subtle grain texture */}
//       <div
//         aria-hidden="true"
//         style={{
//           position: "absolute",
//           inset: 0,
//           backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
//           backgroundRepeat: "repeat",
//           opacity: 0.5,
//           zIndex: 3,
//           pointerEvents: "none",
//         }}
//       />

//       {/* ── Content (above all bg layers) ── */}
//       <div
//         className="relative max-w-7xl mx-auto text-center w-full"
//         style={{ zIndex: 4 }}
//       >
//         {/* Image Masked Header */}
//         <div className="mb-10 lg:mb-16">
//           <h1
//             className="font-antonio font-black leading-[1] md:leading-[.95] py-[1rem] tracking-wide lg:tracking-tight uppercase inline-block text-[clamp(5rem,18vw,220px)]"
//             style={{
//               backgroundImage: "url('heroimg.jpg')",
//               backgroundPosition: "center",
//               backgroundSize: "cover",
//               backgroundRepeat: "no-repeat",
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//               display: "inline-block",
//               transform: "scaleX(1.3) scaleY(1.1)",
//               transformOrigin: "center",
//               WebkitTextStroke: "6px transparent",
//               paintOrder: "stroke fill",
//             }}
//           >
//             ASIWAJU
//             <br />
//             BOYS
//           </h1>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex flex-col py-12 sm:flex-row items-center justify-center gap-4 max-w-md mx-auto sm:max-w-none">
//           <a
//             href="#membership"
//             className="w-full sm:w-auto px-10 py-4 bg-[var(--color-brand-primary)] text-[var(--color-on-brand)] text-sm font-bold rounded-full hover:bg-[var(--color-brand-hover)] transition-colors uppercase tracking-wider"
//           >
//             Join Now
//           </a>
//           <a
//             href="#story"
//             className="w-full sm:w-auto px-10 py-4 border-2 border-[var(--color-brand-primary)] text-[var(--color-brand-primary)] text-sm font-bold rounded-full hover:bg-[var(--color-brand-light)] transition-colors uppercase tracking-wider"
//           >
//             Event Highlights
//           </a>
//         </div>

//         {/* Updates Section */}
//         <div className="mb-10 text-left">
//           <div className="flex overflow-x-auto md:grid md:grid-cols-3 gap-6 md:gap-8 py-4 snap-x snap-mandatory no-scrollbar">
//             {updatesData.map((update, index) => {
//               const cardThemeIndex = (index % 5) + 1;

//               return (
//                 <div
//                   key={update.id}
//                   className="flex items-center gap-4 p-4 rounded-2xl min-w-[300px] sm:min-w-[350px] md:min-w-0 snap-start shrink-0 cursor-pointer group transition-transform hover:-translate-y-1"
//                   style={{
//                     backgroundColor: `var(--card-bg-${cardThemeIndex})`,
//                   }}
//                 >
//                   <img
//                     src={update.image}
//                     alt={update.category}
//                     className="w-16 h-16 rounded-full object-cover shrink-0 shadow-sm"
//                   />

//                   <div className="flex-1">
//                     <h4
//                       className="text-xs font-bold uppercase tracking-wider mb-1"
//                       style={{ color: `var(--card-text-${cardThemeIndex})` }}
//                     >
//                       {update.category}
//                     </h4>
//                     <p className="text-[var(--color-text-primary)] font-bold text-sm leading-snug">
//                       {update.text}
//                     </p>
//                   </div>

//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client"; // Added this because we are now using an onClick event handler

import React from "react";

const updatesData = [
  {
    id: 1,
    category: "INFRASTRUCTURE",
    text: "The Lagos-Calabar Coastal Highway: Connecting 8 states and boosting regional trade.",
    image: "/bridge.jpg",
  },
  {
    id: 2,
    category: "ECONOMIC EMPOWERMENT",
    text: "Renewed Hope SME Grants: Empowering 1 million entrepreneurs with seed capital nationwide.",
    image:
      "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 3,
    category: "FOOD SECURITY",
    text: "Dry-season farming initiative yields 500,000 tonnes of wheat in the first harvest cycle.",
    image: "/food.jpg",
  },
];

export default function Hero() {
  // 1. Added the smooth scroll handler
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
    }
  };

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
          backgroundImage: "url('/bg2.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
          backgroundRepeat: "no-repeat",
          opacity: 0.4,
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
      <div
        className="relative max-w-7xl mx-auto text-center w-full"
        style={{ zIndex: 4 }}
      >
        {/* Image Masked Header */}
        {/* <div className="mb-10 lg:mb-16">
          <h1
            className="font-antonio font-black leading-[1] md:leading-[.95] py-[1rem] tracking-wide lg:tracking-tight uppercase inline-block text-[clamp(5rem,18vw,220px)]"
            style={{
              backgroundImage: "url('heroimg.jpg')",
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
            ASIWAJU
            <span className="text-[clamp(3rem,18vw,220px)]">BOYS MOVEMENT</span>
          </h1>
        </div> */}

        <div className="mb-10 lg:mb-16">
          <h1
            className="font-antonio font-black leading-[1] md:leading-[.95] py-[1rem] tracking-wide lg:tracking-tight uppercase inline-block text-[clamp(5rem,18vw,220px)]"
            style={{
  backgroundImage: "url('heroimg4.jpg')",
  // OLD: backgroundPosition: "center",
  // NEW: Keep horizontal center, push vertical down (e.g., to the 80% mark)
  backgroundPosition: "center 40%", 
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  display: "inline-block",
  transform: "scaleX(1.3) scaleY(1.1)", 
  transformOrigin: "center",
  WebkitTextStroke: "4px transparent",
  paintOrder: "stroke fill",
}}
          >
            ASIWAJU
            <span
              // ADDED: tracking-[0.15em] for letter spacing
              className="block mt-1 lg:mt-3 text-[clamp(2rem,10vw,90px)] tracking-[0.1em]"
              style={{
                display: "block",
              }}
            >
              BOYS MOVEMENT
            </span>
          </h1>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col py-12 sm:flex-row items-center justify-center gap-4 max-w-md mx-auto sm:max-w-none">
          {/* 2. Added onClick={handleSmoothScroll} */}
          <a
            href="#membership"
            onClick={handleSmoothScroll}
            className="w-full sm:w-auto px-10 py-4 bg-[var(--color-brand-primary)] text-[var(--color-on-brand)] text-sm font-bold rounded-full hover:bg-[var(--color-brand-hover)] transition-colors uppercase tracking-wider"
          >
            Join Now
          </a>

          {/* 3. Changed href to #highlights and added onClick */}
          <a
            href="#highlights"
            onClick={handleSmoothScroll}
            className="w-full sm:w-auto px-10 py-4 border-2 border-[var(--color-brand-primary)] text-[var(--color-brand-primary)] text-sm font-bold rounded-full hover:bg-[var(--color-brand-light)] transition-colors uppercase tracking-wider"
          >
            Event Highlights
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
                  style={{
                    backgroundColor: `var(--card-bg-${cardThemeIndex})`,
                  }}
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
                    <p className="text-[var(--color-text-primary)] font-bold text-sm leading-snug">
                      {update.text}
                    </p>
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
