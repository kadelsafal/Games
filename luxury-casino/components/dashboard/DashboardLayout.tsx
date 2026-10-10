
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Crown,
  LayoutDashboard,
  UserRound,
  History,
  Heart,
  ShieldCheck,
  Menu,
  X,
  LogOut,
  Gamepad2,
  ChevronRight,
} from "lucide-react";

const navigation = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "My Profile", href: "/dashboard/profile", icon: UserRound },
  { label: "Game Activity", href: "/dashboard/activity", icon: History },
  { label: "Favorites", href: "/dashboard/favorites", icon: Heart },
  { label: "Security", href: "/dashboard/security", icon: ShieldCheck },
];

type Props = {
  children: React.ReactNode;
  userName?: string;
  onLogout?: () => void;
};

export default function DashboardLayout({
  children,
  userName = "Player",
  onLogout,
}: Props) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function isActive(href: string) {
    if (href === "/dashboard") return pathname === href;
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  function SidebarContent({ mobile = false }: { mobile?: boolean }) {
    return (
      <>
        <Link
          href="/"
          onClick={() => setMobileMenuOpen(false)}
          className="flex items-center gap-3 px-6 py-6"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#D9B44A]/40 bg-[#D9B44A]/10">
            <Crown size={22} className="text-[#E5BD55]" />
          </span>
          <span>
            <span className="block font-serif text-lg font-bold">
              GOLDEN <span className="text-[#E5BD55]">TABLE</span>
            </span>
            <span className="block text-[9px] uppercase tracking-[0.22em] text-stone-500">
              Player dashboard
            </span>
          </span>
        </Link>

        <div className="mx-5 border-t border-white/[0.07]" />

        <div className="px-5 pt-7">
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.25em] text-stone-600">
            Account
          </p>

          <nav aria-label="Dashboard navigation" className="space-y-1">
            {navigation.map(({ label, href, icon: Icon }) => {
              const active = isActive(href);

              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${
                    active
                      ? "border border-[#D9B44A]/20 bg-[#D9B44A]/10 font-semibold text-[#F2D98B]"
                      : "text-stone-400 hover:bg-white/[0.04] hover:text-white"
                  }`}
                >
                  <Icon
                    size={18}
                    className={active ? "text-[#E5BD55]" : "text-stone-500"}
                  />
                  <span>{label}</span>
                  {active && (
                    <ChevronRight size={16} className="ml-auto" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto px-5 pb-6 pt-8">
          <Link
            href="/table-games"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 rounded-xl border border-[#D9B44A]/20 bg-gradient-to-br from-[#211A0D] to-[#0D0D0D] p-4 transition hover:border-[#D9B44A]/50"
          >
            <Gamepad2 className="shrink-0 text-[#E5BD55]" size={22} />
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-semibold text-stone-200">
                Explore games
              </span>
              <span className="mt-1 block text-xs text-stone-500">
                Return to the lobby
              </span>
            </span>
            <ChevronRight size={16} className="text-stone-500" />
          </Link>

          {onLogout && (
            <button
              type="button"
              onClick={onLogout}
              className="mt-4 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-stone-500 transition hover:bg-red-500/10 hover:text-red-300"
            >
              <LogOut size={18} />
              Sign out
            </button>
          )}

          {mobile && (
            <p className="mt-5 text-center text-[10px] text-stone-600">
              Play responsibly.
            </p>
          )}
        </div>
      </>
    );
  }

  return (
    <div className="min-h-dvh bg-[#070707] text-white">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[260px] flex-col border-r border-white/[0.07] bg-[#0B0B0B] lg:flex">
        <SidebarContent />
      </aside>

      {/* Mobile header */}
      <header className="sticky top-0 z-40 flex h-[68px] items-center justify-between border-b border-white/10 bg-[#090909]/95 px-5 backdrop-blur-xl lg:hidden">
        <Link href="/" className="flex items-center gap-2">
          <Crown size={22} className="text-[#E5BD55]" />
          <span className="font-serif font-bold">
            GOLDEN <span className="text-[#E5BD55]">TABLE</span>
          </span>
        </Link>

        <button
          type="button"
          aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((open) => !open)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-stone-300 hover:border-[#D9B44A]/50"
        >
          {mobileMenuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </header>

      {/* Mobile navigation overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 lg:hidden">
          <button
            type="button"
            aria-label="Close navigation overlay"
            onClick={() => setMobileMenuOpen(false)}
            className="absolute inset-0 bg-black/70"
          />
          <aside className="absolute bottom-0 left-0 top-[68px] flex w-[min(300px,85vw)] flex-col overflow-y-auto border-r border-white/10 bg-[#0B0B0B] shadow-2xl">
            <SidebarContent mobile />
          </aside>
        </div>
      )}

      {/* Main dashboard content */}
      <div className="min-w-0 lg:pl-[260px]">
        <header className="hidden h-[68px] items-center justify-between border-b border-white/[0.07] px-8 lg:flex xl:px-10">
          <div>
            <p className="text-xs text-stone-500">Your space</p>
            <p className="mt-1 text-sm font-medium text-stone-200">
              Player dashboard
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D9B44A]/40 bg-[#D9B44A]/10 font-serif font-bold text-[#E5BD55]">
              {userName.trim().charAt(0).toUpperCase() || "P"}
            </div>
            <div>
              <p className="text-sm font-semibold text-stone-200">
                {userName}
              </p>
              <p className="text-[11px] text-stone-500">Player account</p>
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-[1600px] px-5 py-7 sm:px-8 sm:py-9 xl:px-10">
          {children}
        </main>
      </div>
    </div>
  );
}
