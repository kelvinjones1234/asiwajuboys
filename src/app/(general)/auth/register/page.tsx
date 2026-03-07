"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/app/context/ToastContext";

export default function RegisterPage() {
  const router = useRouter();
  const { toast } = useToast();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Location removed from payload
        body: JSON.stringify({ fullName, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast(data.message || "Something went wrong.", "error");
        setIsLoading(false);
        return;
      }

      toast("Account created successfully.", "success");
      router.push("/auth/login");
    } catch (err) {
      toast("An unexpected error occurred. Please try again.", "error");
      setIsLoading(false);
    }
  };

  return (
    <section
      className="relative pt-[1rem] pb-24 px-4 overflow-hidden bg-[var(--color-bg-secondary)] min-h-screen flex flex-col justify-center"
      id="register"
    >
      <div className="max-w-7xl mx-auto w-full mt-16">
        {/* Typography */}
        <div className="relative z-20 text-center mt-8 mb-12 px-2">
          <h2 className="font-antonio font-black uppercase tracking-widest text-[clamp(2.5rem,8vw,4.5rem)] leading-none inline-block text-[var(--color-brand-primary)]">
            Create Account
          </h2>
          <p className="mt-4 text-[var(--color-text-secondary)] font-medium max-w-lg mx-auto text-sm sm:text-base">
            Register a user to help manage membership and other activities.
          </p>
        </div>

        {/* Form Container */}
        <div className="relative z-20 w-full max-w-lg mx-auto">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 bg-[var(--color-bg-primary)] p-6 sm:p-8 rounded-[2rem] shadow-[var(--color-shadow-default)] border border-[var(--color-border-default)]"
          >
            {/* Full Name Field */}
            <div>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full Name"
                className="w-full text-sm bg-[var(--color-bg-surface)] border border-[var(--color-border-default)] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] px-6 py-4 rounded-full outline-none focus:border-[var(--color-brand-primary)] focus:ring-1 focus:ring-[var(--color-brand-primary)] transition-all"
                required
                disabled={isLoading}
              />
            </div>

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
                minLength={6}
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

            {/* Terms and Privacy */}
            <div className="text-center mt-2">
              <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                By creating an account, you agree to our{" "}
                <br className="hidden sm:block" />
                <Link
                  href="/terms"
                  className="font-semibold text-[var(--color-text-primary)] hover:text-[var(--color-brand-primary)] transition-colors underline underline-offset-4"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="font-semibold text-[var(--color-text-primary)] hover:text-[var(--color-brand-primary)] transition-colors underline underline-offset-4"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[var(--color-brand-primary)] text-[var(--color-on-brand)] text-sm font-bold uppercase tracking-wider px-6 py-4 rounded-full mt-2 hover:bg-[var(--color-brand-hover)] transition-colors shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
            >
              {isLoading ? "Creating..." : "Create Account"}
            </button>

            {/* Sign In Link */}
            <div className="mt-6 pt-6 border-t border-[var(--color-border-default)] text-center flex flex-col items-center gap-3">
              <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
                Already have an account?
              </p>
              <Link
                href="/auth/login"
                className="text-sm font-bold uppercase tracking-wider text-[var(--color-brand-primary)] hover:text-[var(--color-brand-hover)] transition-colors underline underline-offset-4"
              >
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
