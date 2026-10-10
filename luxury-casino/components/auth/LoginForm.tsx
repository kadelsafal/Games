
"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Eye, EyeOff, Mail, Lock, LoaderCircle } from "lucide-react";
import AuthLayout from "@/components/auth/AuthLayout";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    // Connect your Django login API here.
    // Do not store the user's password in localStorage.
    setError("Connect your login API to continue.");
  }

  const inputClass =
    "w-full bg-transparent py-3 text-sm text-white outline-none placeholder:text-stone-600";

  return (
    <AuthLayout
      title="Welcome back."
      subtitle="Sign in to continue exploring your favorite experiences."
      footerText="New to Golden Table?"
      footerLinkText="Create an account"
      footerHref="/signup"
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <div>
          <label
            htmlFor="login-email"
            className="mb-2 block text-xs font-semibold text-stone-300"
          >
            Email address
          </label>

          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.035] px-4 transition focus-within:border-[#D9B44A]/70">
            <Mail size={18} className="shrink-0 text-stone-500" />
            <input
              id="login-email"
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
          <div className="mb-2 flex items-center justify-between gap-3">
            <label
              htmlFor="login-password"
              className="text-xs font-semibold text-stone-300"
            >
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-xs text-[#E5BD55] hover:text-[#FFF0B0]"
            >
              Forgot password?
            </Link>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.035] px-4 transition focus-within:border-[#D9B44A]/70">
            <Lock size={18} className="shrink-0 text-stone-500" />
            <input
              id="login-password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
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
        </div>

        <label className="flex cursor-pointer items-center gap-3 text-sm text-stone-400">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(event) => setRememberMe(event.target.checked)}
            className="h-4 w-4 accent-[#D9B44A]"
          />
          Remember me on this device
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
          disabled={loading}
          className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#FFE7A0] via-[#E5BD55] to-[#B58A2A] px-5 py-3 text-sm font-bold text-[#171006] shadow-lg shadow-[#B58A2A]/10 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading && <LoaderCircle size={18} className="animate-spin" />}
          Sign in
        </button>

        <p className="text-center text-[11px] leading-5 text-stone-600">
          By continuing, you agree to follow the site's applicable terms and
          responsible entertainment guidelines.
        </p>
      </form>
    </AuthLayout>
  );
}
