"use client";

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/app/context/ToastContext";
import { createMembership } from "@/app/action/membership";

const MembershipForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, setIsPending] = useState(false);
  const [fileName, setFileName] = useState("Upload Profile Picture...");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    } else { 
      setFileName("Upload Profile Picture...");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);

    const formData = new FormData(e.currentTarget);
    const result = await createMembership(formData);

    if (result.success) {
      toast(result.message || "Registration successful!", "success");

      // Save the returned member data to local storage
      if (result.member) {
        localStorage.setItem(
          "asiwajuMemberProfile",
          JSON.stringify(result.member),
        );
      }

      // Redirect to the profile/ID card page
      // NOTE: Change "/profile" to whatever the actual route of your ID card page is
      router.push("/profile");
    } else {
      toast(result.error || "Submission failed", "error");
      setIsPending(false); // Only stop loading if there's an error, otherwise let it redirect
    }
  };

  return (
    <section
      className="relative pt-[1rem] pb-24 px-4 overflow-hidden bg-[var(--color-bg-secondary)]"
      id="membership"
    >
      <div className="max-w-7xl mx-auto w-full">

        {/* 1. Visual Graphic Area with SVG Mask */}
        <div className="relative w-full max-w-[600px] h-[300px] sm:h-[400px] mx-auto flex justify-center items-center">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px]">
            <img
              src="/tinubu1.jpg"
              alt="Faces of unity"
              className="w-full h-full object-cover grayscale-[20%] rounded-full sm:rounded-none"
            />
          </div>
          <svg
            viewBox="0 0 600 400"
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <mask id="slit-mask">
                {/* The white background that covers the image */}
                <rect width="100%" height="100%" fill="white" />

                {/* A single perfect circle punching a hole in the center */}
                <circle cx="300" cy="200" r="180" fill="black" />
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
            Join Asiwajuboys Movement
          </h2>
          <p className="mt-4 text-[var(--color-text-secondary)] font-medium max-w-lg mx-auto text-sm sm:text-base">
            Step forward and become part of a movement dedicated to renewed hope
            and collective progress.
          </p>
        </div>

        {/* 3. Membership Form */}
        <div className="relative z-20 w-full max-w-lg mx-auto">
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 bg-[var(--color-bg-primary)] p-6 sm:p-8 rounded-[2rem] shadow-[var(--color-shadow-default)] border border-[var(--color-border-default)]"
          >
            {/* Name Field */}
            <div>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                className="w-full text-sm bg-[var(--color-bg-surface)] border border-[var(--color-border-default)] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] px-6 py-4 rounded-full outline-none focus:border-[var(--color-brand-primary)] focus:ring-1 focus:ring-[var(--color-brand-primary)] transition-all"
                required
                disabled={isPending}
              />
            </div>

            {/* Phone & Ward Row */}
            <div className="flex flex-col sm:flex-row gap-5">
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Phone Number"
                className="w-full sm:w-1/2 text-sm bg-[var(--color-bg-surface)] border border-[var(--color-border-default)] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] px-6 py-4 rounded-full outline-none focus:border-[var(--color-brand-primary)] focus:ring-1 focus:ring-[var(--color-brand-primary)] transition-all"
                required
                disabled={isPending}
              />
              <input
                type="text"
                name="ward"
                placeholder="Ward / District"
                className="w-full sm:w-1/2 text-sm bg-[var(--color-bg-surface)] border border-[var(--color-border-default)] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] px-6 py-4 rounded-full outline-none focus:border-[var(--color-brand-primary)] focus:ring-1 focus:ring-[var(--color-brand-primary)] transition-all"
                required
                disabled={isPending}
              />
            </div>

            {/* Address Field */}
            <div>
              <input
                type="text"
                name="address"
                placeholder="Full Address"
                className="w-full text-sm bg-[var(--color-bg-surface)] border border-[var(--color-border-default)] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] px-6 py-4 rounded-full outline-none focus:border-[var(--color-brand-primary)] focus:ring-1 focus:ring-[var(--color-brand-primary)] transition-all"
                required
                disabled={isPending}
              />
            </div>

            {/* Picture Upload Field */}
            <div
              className={`relative w-full text-sm bg-[var(--color-bg-surface)] border border-[var(--color-border-default)] text-[var(--color-text-secondary)] px-6 py-4 rounded-full outline-none focus-within:border-[var(--color-brand-primary)] focus-within:ring-1 focus-within:ring-[var(--color-brand-primary)] transition-all flex items-center justify-between group ${isPending ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:bg-[var(--color-border-default)]"}`}
            >
              <span className="truncate pr-4 font-medium">{fileName}</span>
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
                name="picture"
                accept="image/*"
                onChange={handleFileChange}
                className={`absolute inset-0 w-full h-full opacity-0 ${isPending ? "cursor-not-allowed" : "cursor-pointer"}`}
                required
                disabled={isPending}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-[var(--color-brand-primary)] text-[var(--color-on-brand)] text-sm font-bold uppercase tracking-wider px-6 py-4 rounded-full mt-2 hover:bg-[var(--color-brand-hover)] transition-colors shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
            >
              {isPending ? "Processing..." : "Become a Member"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default MembershipForm;
