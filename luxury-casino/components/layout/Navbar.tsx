
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  Crown,
  House,
  Spade,
  Dices,
  Gift,
  Gem,
  Menu,
  X,
  Search,
  UserRound,
} from "lucide-react";

const navLinks = [
  { label: "Home", href: "/", icon: House },
  { label: "Live Casino", href: "/live-casino", icon: Spade },
  
  { label: "Promotions", href: "/promotions", icon: Gift },
  { label: "VIP", href: "/vip", icon: Crown },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  
  const navbarRef = useRef<HTMLElement>(null);

useEffect(() => {
  function handleOutsideClick(event: PointerEvent) {
    if (
      navbarRef.current &&
      !navbarRef.current.contains(event.target as Node)
    ) {
      setMobileOpen(false);
    }
  }

  document.addEventListener("pointerdown", handleOutsideClick);

  return () => {
    document.removeEventListener("pointerdown", handleOutsideClick);
  };
}, []);

  return (
    <header 
    ref={navbarRef}
    className="sticky top-0 z-50 border-b border-[#B58A2A]/70 bg-[#050505]/95 text-white shadow-lg shadow-black/30 backdrop-blur-xl">
      <nav
        className="mx-auto flex min-h-[76px] max-w-[1600px] items-center justify-between gap-5 px-5 py-3 lg:px-8"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-2"
          aria-label="Casino home"
        >
          <div className="relative flex h-11 w-11 items-center justify-center rounded-full border border-[#D9B44A]/60 bg-gradient-to-br from-[#F5D987] via-[#B58A2A] to-[#745016] text-black shadow-md shadow-[#B58A2A]/10">
            <Crown size={25} strokeWidth={1.8} />
          </div>

          <div className="leading-none">
            <span className="block font-serif text-2xl font-bold tracking-[0.16em] text-[#F2D98B]">
              CASINO
            </span>
            <span className="mt-1 block text-[8px] tracking-[0.28em] text-stone-400">
              PLAY IN STYLE
            </span>
          </div>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-1 xl:flex">
          {navLinks.map(({ label, href, icon: Icon }) => {
            const active =
              pathname === href ||
              (href !== "/" && pathname.startsWith(href));

            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2 rounded-full px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  active
                    ? "border border-[#B58A2A]/50 bg-[#B58A2A]/10 text-[#F2D98B] shadow-[0_0_18px_rgba(181,138,42,0.12)]"
                    : "border border-transparent text-stone-300 hover:border-[#B58A2A]/30 hover:bg-white/5 hover:text-[#F2D98B]"
                }`}
              >
                <Icon size={17} />
                {label}
              </Link>
            );
          })}
        </div>

        {/* Desktop actions */}
        <div className="hidden shrink-0 items-center gap-3 md:flex">
          <button
            type="button"
            aria-label="Toggle game search"
            aria-expanded={searchOpen}
            onClick={() => setSearchOpen((open) => !open)}
            className="rounded-full p-3 text-stone-300 transition hover:bg-white/5 hover:text-[#F2D98B]"
          >
            <Search size={20} />
          </button>

          <Link
            href="/login"
            className="flex items-center gap-2 rounded-full border border-[#B58A2A]/80 px-5 py-2.5 text-sm font-semibold text-[#F2D98B] transition hover:bg-[#B58A2A]/10"
          >
            <UserRound size={17} />
            Login
          </Link>

          <Link
            href="/signup"
            className="rounded-full bg-gradient-to-r from-[#F5D987] via-[#D9B44A] to-[#B58A2A] px-6 py-3 text-sm font-bold text-[#171006] shadow-md shadow-[#B58A2A]/10 transition hover:brightness-110"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
          className="rounded-lg border border-[#B58A2A]/40 p-2.5 text-[#F2D98B] transition hover:bg-white/5 xl:hidden"
        >
          {mobileOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </nav>

      {/* Expandable search */}
      {searchOpen && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (search.trim()) {
              window.location.href = `/search?q=${encodeURIComponent(search.trim())}`;
            }
          }}
          className="border-t border-[#B58A2A]/20 px-5 py-3"
        >
          <div className="mx-auto flex max-w-3xl items-center gap-3 rounded-xl border border-[#B58A2A]/40 bg-[#111] px-4">
            <Search size={18} className="text-[#D9B44A]" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search games..."
              aria-label="Search games"
              className="w-full bg-transparent py-3 text-sm text-white outline-none placeholder:text-stone-500"
            />
            <button
              type="submit"
              className="text-sm font-semibold text-[#F2D98B] hover:text-white"
            >
              Search
            </button>
          </div>
        </form>
      )}

      {/* Mobile navigation */}
      {mobileOpen && (
        <div className="border-t border-[#B58A2A]/30 bg-[#080808] px-5 py-4 xl:hidden">
          <div className="mx-auto flex max-w-2xl flex-col gap-2">
            {navLinks.map(({ label, href, icon: Icon }) => {
              const active =
                pathname === href ||
                (href !== "/" && pathname.startsWith(href));

              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                    active
                      ? "bg-[#B58A2A]/15 text-[#F2D98B]"
                      : "text-stone-300 hover:bg-white/5 hover:text-[#F2D98B]"
                  }`}
                >
                  <Icon size={19} />
                  {label}
                </Link>
              );
            })}

            <div className="mt-2 grid grid-cols-2 gap-3 border-t border-white/10 pt-4">
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="rounded-xl border border-[#B58A2A]/70 px-4 py-3 text-center text-sm font-semibold text-[#F2D98B]"
              >
                Login
              </Link>
              <Link
                href="/signup"
                onClick={() => setMobileOpen(false)}
                className="rounded-xl bg-gradient-to-r from-[#F5D987] to-[#B58A2A] px-4 py-3 text-center text-sm font-bold text-black"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
