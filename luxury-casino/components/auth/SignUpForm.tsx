
"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import {
  Eye,
  EyeOff,
  UserRound,
  Mail,
  Lock,
  CheckCircle2,
} from "lucide-react";
import AuthLayout from "@/components/auth/AuthLayout";

export default function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState("");

  const inputClass =
    "w-full bg-transparent py-3 text-sm text-white outline-none placeholder:text-stone-600";

  const passwordChecks = [
    { label: "At least 8 characters", valid: password.length >= 8 },
    { label: "An uppercase letter", valid: /[A-Z]/.test(password) },
    { label: "A number", valid: /\d/.test(password) },
  ];

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      setError("Please complete all required fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 8 || !/[A-Z]/.test(password) || !/\d/.test(password)) {
      setError(
        "Choose a password with at least 8 characters, one uppercase letter, and one number."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Your passwords do not match.");
      return;
    }

    if (!acceptedTerms) {
      setError("Please accept the terms to create an account.");
      return;
    }

    // Connect your Django registration API here.
    // The backend must validate all fields again.
    setError("Connect your registration API to create your account.");
  }

  return (
    <AuthLayout
      title="Create your account."
      subtitle="Join the experience. It only takes a moment to get started."
      footerText="Already have an account?"
      footerLinkText="Sign in"
      footerHref="/login"
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div>
          <label
            htmlFor="signup-name"
            className="mb-2 block text-xs font-semibold text-stone-300"
          >
            Full name
          </label>
          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.035] px-4 transition focus-within:border-[#D9B44A]/70">
            <UserRound size={18} className="shrink-0 text-stone-500" />
            <input
              id="signup-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Your full name"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="signup-email"
            className="mb-2 block text-xs font-semibold text-stone-300"
          >
            Email address
          </label>
          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.035] px-4 transition focus-within:border-[#D9B44A]/70">
            <Mail size={18} className="shrink-0 text-stone-500" />
            <input
              id="signup-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="signup-password"
            className="mb-2 block text-xs font-semibold text-stone-300"
          >
            Password
          </label>
          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.035] px-4 transition focus-within:border-[#D9B44A]/70">
            <Lock size={18} className="shrink-0 text-stone-500" />
            <input
              id="signup-password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Create a password"
              className={inputClass}
            />
            <button
              type="button"
              onClick={() => setShowPassword((visible) => !visible)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="shrink-0 text-stone-500 hover:text-[#E5BD55]"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
            {passwordChecks.map((check) => (
              <span
                key={check.label}
                className={`flex items-center gap-1.5 text-[10px] ${
                  check.valid ? "text-emerald-400" : "text-stone-500"
                }`}
              >
                <CheckCircle2 size={13} />
                {check.label}
              </span>
            ))}
          </div>
        </div>

        <div>
          <label
            htmlFor="signup-confirm-password"
            className="mb-2 block text-xs font-semibold text-stone-300"
          >
            Confirm password
          </label>
          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.035] px-4 transition focus-within:border-[#D9B44A]/70">
            <Lock size={18} className="shrink-0 text-stone-500" />
            <input
              id="signup-confirm-password"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              autoComplete="new-password"
              required
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="Enter password again"
              className={inputClass}
            />
            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword((visible) => !visible)
              }
              aria-label={
                showConfirmPassword ? "Hide password" : "Show password"
              }
              className="shrink-0 text-stone-500 hover:text-[#E5BD55]"
            >
              {showConfirmPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>
        </div>

        <label className="flex cursor-pointer items-start gap-3 text-xs leading-5 text-stone-400">
          <input
            type="checkbox"
            checked={acceptedTerms}
            onChange={(event) => setAcceptedTerms(event.target.checked)}
            className="mt-1 h-4 w-4 shrink-0 accent-[#D9B44A]"
          />
          <span>
            I agree to the{" "}
            <Link
              href="/terms"
              className="text-[#E5BD55] underline underline-offset-2"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="text-[#E5BD55] underline underline-offset-2"
            >
              Privacy Policy
            </Link>
            .
          </span>
        </label>

        {error && (
          <p
            role="alert"
            className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300"
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          className="flex min-h-12 w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#FFE7A0] via-[#E5BD55] to-[#B58A2A] px-5 py-3 text-sm font-bold text-[#171006] shadow-lg shadow-[#B58A2A]/10 transition hover:brightness-110"
        >
          Create account
        </button>

        <p className="text-center text-[11px] leading-5 text-stone-600">
          Never share your password with anyone. Use a unique password for
          your account.
        </p>
      </form>
    </AuthLayout>
  );
}
