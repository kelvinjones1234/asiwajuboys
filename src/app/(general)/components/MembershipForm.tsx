// import React from "react";

// const MembershipForm = () => {
//   return (
//     <section
//       className="relative pt-[2rem] pb-24 px-4 overflow-hidden bg-[var(--color-bg-secondary)]"
//       id="membership"
//     >
//       <div className="max-w-7xl mx-auto w-full">
//         {/* 1. Visual Graphic Area with SVG Mask */}
//         {/* The SVG fill uses the CSS variable to seamlessly blend with the section background */}
//         <div className="relative w-full max-w-[600px] h-[300px] sm:h-[400px] mx-auto flex justify-center items-center">
//           {/* The Background Image (Visible through the slits) */}
//           <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px]">
//             <img
//               src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=200&auto=format&fit=crop"
//               alt="Faces of unity"
//               className="w-full h-full object-cover grayscale-[20%] rounded-full sm:rounded-none"
//             />
//           </div>

//           {/* The Overlay with Punched-Out Ellipses */}
//           <svg
//             viewBox="0 0 600 400"
//             className="absolute inset-0 w-full h-full pointer-events-none z-10"
//             preserveAspectRatio="xMidYMid slice"
//           >
//             <defs>
//               <mask id="slit-mask">
//                 <rect width="100%" height="100%" fill="white" />
//                 <ellipse cx="300" cy="200" rx="16" ry="170" fill="black" />
//                 <ellipse cx="255" cy="200" rx="14" ry="150" fill="black" />
//                 <ellipse cx="345" cy="200" rx="14" ry="150" fill="black" />
//                 <ellipse cx="215" cy="200" rx="11" ry="120" fill="black" />
//                 <ellipse cx="385" cy="200" rx="11" ry="120" fill="black" />
//                 <ellipse cx="180" cy="200" rx="8" ry="85" fill="black" />
//                 <ellipse cx="420" cy="200" rx="8" ry="85" fill="black" />
//                 <ellipse cx="152" cy="200" rx="4" ry="45" fill="black" />
//                 <ellipse cx="448" cy="200" rx="4" ry="45" fill="black" />
//               </mask>
//             </defs>
//             <rect
//               width="100%"
//               height="100%"
//               fill="var(--color-bg-secondary)"
//               mask="url(#slit-mask)"
//             />
//           </svg>
//         </div>

//         {/* 2. Typography */}
//         <div className="relative z-20 text-center mt-8 mb-12 px-2">
//           <h2 className="font-antonio font-black uppercase tracking-widest text-[clamp(2.5rem,8vw,4.5rem)] leading-none inline-block text-[var(--color-brand-primary)]">
//             Join Voices United
//           </h2>
//           <p className="mt-4 text-[var(--color-text-secondary)] font-medium max-w-lg mx-auto text-sm sm:text-base">
//             Step forward and become part of a movement dedicated to renewed hope
//             and collective progress.
//           </p>
//         </div>

//         {/* 3. Membership Form */}
//         <div className="relative z-20 w-full max-w-lg mx-auto">
//           <form className="flex flex-col gap-5 bg-[var(--color-bg-primary)] p-6 sm:p-8 rounded-[2rem] shadow-[var(--color-shadow-default)] border border-[var(--color-border-default)]">
//             {/* Name Field */}
//             <div>
//               <input
//                 type="text"
//                 placeholder="Full Name"
//                 className="w-full bg-[var(--color-bg-surface)] border border-[var(--color-border-default)] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] px-6 py-4 rounded-full outline-none focus:border-[var(--color-brand-primary)] focus:ring-1 focus:ring-[var(--color-brand-primary)] transition-all"
//                 required
//               />
//             </div>

//             {/* Phone & Ward Row */}
//             <div className="flex flex-col sm:flex-row gap-5">
//               <input
//                 type="tel"
//                 placeholder="Phone Number"
//                 className="w-full sm:w-1/2 bg-[var(--color-bg-surface)] border border-[var(--color-border-default)] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] px-6 py-4 rounded-full outline-none focus:border-[var(--color-brand-primary)] focus:ring-1 focus:ring-[var(--color-brand-primary)] transition-all"
//                 required
//               />
//               <input
//                 type="text"
//                 placeholder="Ward / District"
//                 className="w-full sm:w-1/2 bg-[var(--color-bg-surface)] border border-[var(--color-border-default)] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] px-6 py-4 rounded-full outline-none focus:border-[var(--color-brand-primary)] focus:ring-1 focus:ring-[var(--color-brand-primary)] transition-all"
//                 required
//               />
//             </div>

//             {/* Address Field */}
//             <div>
//               <input
//                 type="text"
//                 placeholder="Full Address"
//                 className="w-full bg-[var(--color-bg-surface)] border border-[var(--color-border-default)] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] px-6 py-4 rounded-full outline-none focus:border-[var(--color-brand-primary)] focus:ring-1 focus:ring-[var(--color-brand-primary)] transition-all"
//                 required
//               />
//             </div>

//             {/* Picture Upload Field */}
//             <div className="relative w-full bg-[var(--color-bg-surface)] border border-[var(--color-border-default)] text-[var(--color-text-secondary)] px-6 py-4 rounded-full outline-none focus-within:border-[var(--color-brand-primary)] focus-within:ring-1 focus-within:ring-[var(--color-brand-primary)] transition-all flex items-center justify-between cursor-pointer hover:bg-[var(--color-border-default)] group">
//               <span className="truncate pr-4 text-sm font-medium">
//                 Upload Profile Picture...
//               </span>
//               <div className="flex items-center justify-center shrink-0 bg-[var(--color-bg-primary)] group-hover:bg-[var(--color-brand-light)] group-hover:text-[var(--color-brand-primary)] text-[var(--color-text-muted)] rounded-full p-2 h-8 w-8 transition-colors shadow-sm">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   strokeWidth={2}
//                   stroke="currentColor"
//                   className="w-4 h-4"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
//                   />
//                 </svg>
//               </div>
//               <input
//                 type="file"
//                 accept="image/*"
//                 className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//                 required
//               />
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               className="w-full bg-[var(--color-brand-primary)] text-[var(--color-on-brand)] text-sm font-bold uppercase tracking-wider px-6 py-4 rounded-full mt-2 hover:bg-[var(--color-brand-hover)] transition-colors shadow-md hover:shadow-lg"
//             >
//               Become a Member
//             </button>
//           </form>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default MembershipForm;






import React from "react";

const MembershipForm = () => {
  return (
    <section
      className="relative pt-[2rem] pb-24 px-4 overflow-hidden bg-[var(--color-bg-secondary)]"
      id="membership"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* 1. Visual Graphic Area with SVG Mask */}
        <div className="relative w-full max-w-[600px] h-[300px] sm:h-[400px] mx-auto flex justify-center items-center">
          {/* The Background Image */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px]">
            <img
              src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=200&auto=format&fit=crop"
              alt="Faces of unity"
              className="w-full h-full object-cover grayscale-[20%] rounded-full sm:rounded-none"
            />
          </div>

          {/* The Overlay with Punched-Out Ellipses */}
          <svg
            viewBox="0 0 600 400"
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <mask id="slit-mask">
                <rect width="100%" height="100%" fill="white" />
                <ellipse cx="300" cy="200" rx="16" ry="170" fill="black" />
                <ellipse cx="255" cy="200" rx="14" ry="150" fill="black" />
                <ellipse cx="345" cy="200" rx="14" ry="150" fill="black" />
                <ellipse cx="215" cy="200" rx="11" ry="120" fill="black" />
                <ellipse cx="385" cy="200" rx="11" ry="120" fill="black" />
                <ellipse cx="180" cy="200" rx="8" ry="85" fill="black" />
                <ellipse cx="420" cy="200" rx="8" ry="85" fill="black" />
                <ellipse cx="152" cy="200" rx="4" ry="45" fill="black" />
                <ellipse cx="448" cy="200" rx="4" ry="45" fill="black" />
              </mask>
            </defs>
            <rect
              width="100%"
              height="100%"
              fill="var(--color-bg-secondary)"
              mask="url(#slit-mask)"
            />
          </svg>
        </div>

        {/* 2. Typography */}
        <div className="relative z-20 text-center mt-8 mb-12 px-2">
          <h2 className="font-antonio font-black uppercase tracking-widest text-[clamp(2.5rem,8vw,4.5rem)] leading-none inline-block text-[var(--color-brand-primary)]">
            Join Voices United
          </h2>
          <p className="mt-4 text-[var(--color-text-secondary)] font-medium max-w-lg mx-auto text-sm sm:text-base">
            Step forward and become part of a movement dedicated to renewed hope
            and collective progress.
          </p>
        </div>

        {/* 3. Membership Form */}
        <div className="relative z-20 w-full max-w-lg mx-auto">
          <form className="flex flex-col gap-5 bg-[var(--color-bg-primary)] p-6 sm:p-8 rounded-[2rem] shadow-[var(--color-shadow-default)] border border-[var(--color-border-default)]">
            {/* Name Field */}
            <div>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full text-sm bg-[var(--color-bg-surface)] border border-[var(--color-border-default)] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] px-6 py-4 rounded-full outline-none focus:border-[var(--color-brand-primary)] focus:ring-1 focus:ring-[var(--color-brand-primary)] transition-all"
                required
              />
            </div>

            {/* Phone & Ward Row */}
            <div className="flex flex-col sm:flex-row gap-5">
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full sm:w-1/2 text-sm bg-[var(--color-bg-surface)] border border-[var(--color-border-default)] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] px-6 py-4 rounded-full outline-none focus:border-[var(--color-brand-primary)] focus:ring-1 focus:ring-[var(--color-brand-primary)] transition-all"
                required
              />
              <input
                type="text"
                placeholder="Ward / District"
                className="w-full sm:w-1/2 text-sm bg-[var(--color-bg-surface)] border border-[var(--color-border-default)] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] px-6 py-4 rounded-full outline-none focus:border-[var(--color-brand-primary)] focus:ring-1 focus:ring-[var(--color-brand-primary)] transition-all"
                required
              />
            </div>

            {/* Address Field */}
            <div>
              <input
                type="text"
                placeholder="Full Address"
                className="w-full text-sm bg-[var(--color-bg-surface)] border border-[var(--color-border-default)] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] px-6 py-4 rounded-full outline-none focus:border-[var(--color-brand-primary)] focus:ring-1 focus:ring-[var(--color-brand-primary)] transition-all"
                required
              />
            </div>

            {/* Picture Upload Field */}
            <div className="relative w-full text-sm bg-[var(--color-bg-surface)] border border-[var(--color-border-default)] text-[var(--color-text-secondary)] px-6 py-4 rounded-full outline-none focus-within:border-[var(--color-brand-primary)] focus-within:ring-1 focus-within:ring-[var(--color-brand-primary)] transition-all flex items-center justify-between cursor-pointer hover:bg-[var(--color-border-default)] group">
              <span className="truncate pr-4 font-medium">
                Upload Profile Picture...
              </span>
              <div className="flex items-center justify-center shrink-0 bg-[var(--color-bg-primary)] group-hover:bg-[var(--color-brand-light)] group-hover:text-[var(--color-brand-primary)] text-[var(--color-text-muted)] rounded-full p-2 h-8 w-8 transition-colors shadow-sm">
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
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                  />
                </svg>
              </div>
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[var(--color-brand-primary)] text-[var(--color-on-brand)] text-sm font-bold uppercase tracking-wider px-6 py-4 rounded-full mt-2 hover:bg-[var(--color-brand-hover)] transition-colors shadow-md hover:shadow-lg"
            >
              Become a Member
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default MembershipForm;