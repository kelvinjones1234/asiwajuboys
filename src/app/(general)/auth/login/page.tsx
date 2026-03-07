"use client";

import React, { useState, Suspense } from "react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/app/context/ToastContext";

// 1. We move the actual logic into its own internal component
function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // If no callbackUrl is provided, default to the dashboard
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await signIn("credentials", { 
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        toast("Invalid email or password.", "error");
      } else {
        toast("Signed in successfully.", "success");
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err) {
      toast("An unexpected error occurred. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto w-full mt-16">
      {/* Typography */}
      <div className="relative z-20 text-center mt-8 mb-12 px-2">
        <h2 className="font-antonio font-black uppercase tracking-widest text-[clamp(2.5rem,8vw,4.5rem)] leading-none inline-block text-[var(--color-brand-primary)]">
          Welcome Back
        </h2>
        <p className="mt-4 text-[var(--color-text-secondary)] font-medium max-w-lg mx-auto text-sm sm:text-base">
          Please login to admin dashboard to manage membership activities.
        </p>
      </div>

      {/* Form Container */}
      <div className="relative z-20 w-full max-w-lg mx-auto">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 bg-[var(--color-bg-primary)] p-6 sm:p-8 rounded-[2rem] shadow-[var(--color-shadow-default)] border border-[var(--color-border-default)]"
        >
          {/* Email Field */}
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="w-full text-sm bg-[var(--color-bg-surface)] border border-[var(--color-border-default)] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] px-6 py-4 rounded-full outline-none focus:border-[var(--color-brand-primary)] focus:ring-1 focus:ring-[var(--color-brand-primary)] transition-all"
              required
              disabled={isLoading}
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full text-sm bg-[var(--color-bg-surface)] border border-[var(--color-border-default)] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] pl-6 pr-14 py-4 rounded-full outline-none focus:border-[var(--color-brand-primary)] focus:ring-1 focus:ring-[var(--color-brand-primary)] transition-all"
              required
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-brand-primary)] transition-colors focus:outline-none"
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" strokeWidth={1.5} />
              ) : (
                <Eye className="w-5 h-5" strokeWidth={1.5} />
              )}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[var(--color-brand-primary)] text-[var(--color-on-brand)] text-sm font-bold uppercase tracking-wider px-6 py-4 rounded-full mt-2 hover:bg-[var(--color-brand-hover)] transition-colors shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>

          {/* Create Account Link */}
          <div className="mt-6 pt-6 border-t border-[var(--color-border-default)] text-center flex flex-col items-center gap-3">
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
              Don't have an account?
            </p>
            <Link
              href={`/auth/register${
                callbackUrl !== "/dashboard"
                  ? `?callbackUrl=${encodeURIComponent(callbackUrl)}`
                  : ""
              }`}
              className="text-sm font-bold uppercase tracking-wider text-[var(--color-brand-primary)] hover:text-[var(--color-brand-hover)] transition-colors underline underline-offset-4"
            >
              Create Account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

// 2. Your main export wraps the component in <Suspense>
export default function LoginPage() {
  return (
    <section
      className="relative pt-[1rem] pb-24 px-4 overflow-hidden bg-[var(--color-bg-secondary)] min-h-screen flex flex-col justify-center"
      id="login"
    >
      <Suspense 
        fallback={
          <div className="flex justify-center items-center h-full w-full">
            <p className="text-[var(--color-brand-primary)] font-bold uppercase tracking-widest animate-pulse">
              Loading...
            </p>
          </div>
        }
      >
        <LoginContent />
      </Suspense>
    </section>
  );
}