
import Link from "next/link";
import { Crown, ShieldCheck, Sparkles } from "lucide-react";
import type { ReactNode } from "react";

type AuthLayoutProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
  footerText: string;
  footerLinkText: string;
  footerHref: string;
};

export default function AuthLayout({
  title,
  subtitle,
  children,
  footerText,
  footerLinkText,
  footerHref,
}: AuthLayoutProps) {
  return (
    <main className="min-h-dvh bg-[#070707] text-white">
      <div className="mx-auto flex min-h-dvh w-full max-w-[1440px] flex-col lg:flex-row">
        {/* Branding and artwork */}
        <aside className="relative hidden overflow-hidden border-r border-[#D9B44A]/15 bg-[#0C0B08] lg:flex lg:w-[46%] lg:flex-col lg:justify-between lg:p-10 xl:p-14">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_55%_45%,rgba(181,138,42,0.17),transparent_55%)]" />

          <Link href="/" className="relative z-10 flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#D9B44A]/50 bg-[#D9B44A]/10">
              <Crown className="text-[#E5BD55]" size={23} />
            </span>
            <span>
              <span className="block font-serif text-xl font-bold tracking-wide">
                GOLDEN <span className="text-[#E5BD55]">TABLE</span>
              </span>
              <span className="mt-0.5 block text-[9px] uppercase tracking-[0.25em] text-stone-500">
                A world of games
              </span>
            </span>
          </Link>

          <div className="relative z-10 my-12">
            <div className="relative mx-auto flex aspect-square w-full max-w-[430px] items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-[#D9B44A]/15" />
              <div className="absolute inset-[7%] rounded-full border border-[#D9B44A]/20" />
              <div className="absolute inset-[15%] rounded-full border border-[#D9B44A]/30" />
              <div className="absolute inset-[24%] rounded-full border border-dashed border-[#D9B44A]/30" />

              <div className="relative flex h-[48%] w-[48%] items-center justify-center rounded-full border border-[#D9B44A]/50 bg-gradient-to-br from-[#3B2B0E] via-[#17130B] to-black shadow-[0_0_90px_rgba(181,138,42,0.12)]">
                <div className="flex h-[82%] w-[82%] items-center justify-center rounded-full border border-[#D9B44A]/30">
                  <Crown size={76} strokeWidth={1} className="text-[#E5BD55]" />
                </div>
              </div>

              {["♠", "♦", "♣", "♥"].map((symbol, index) => (
                <span
                  key={symbol}
                  className={`absolute font-serif text-3xl ${
                    index === 1 || index === 3
                      ? "text-[#C94D43]"
                      : "text-[#E5BD55]"
                  }`}
                  style={[
                    { top: "5%", left: "47%" },
                    { top: "47%", right: "4%" },
                    { bottom: "5%", left: "47%" },
                    { top: "47%", left: "4%" },
                  ][index]}
                >
                  {symbol}
                </span>
              ))}
            </div>

            <p className="mt-8 text-center text-xs font-semibold uppercase tracking-[0.35em] text-[#E5BD55]">
              Your game. Your moment.
            </p>
            <h2 className="mx-auto mt-4 max-w-md text-center font-serif text-4xl font-semibold leading-tight xl:text-5xl">
              Step into a world of{" "}
              <span className="text-[#E5BD55]">possibilities.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-sm text-center text-sm leading-7 text-stone-400">
              Explore classic games in a refined, immersive entertainment
              experience.
            </p>
          </div>

          <div className="relative z-10 flex items-center justify-center gap-2 text-xs text-stone-500">
            <ShieldCheck size={16} className="text-[#D9B44A]" />
            <span>Play responsibly. Enjoy the experience.</span>
          </div>
        </aside>

        {/* Form area */}
        <section className="flex flex-1 flex-col px-5 py-5 sm:px-8 sm:py-8 lg:px-10 xl:px-16">
          <header className="flex items-center justify-between lg:justify-end">
            <Link href="/" className="flex items-center gap-2 lg:hidden">
              <Crown className="text-[#E5BD55]" size={24} />
              <span className="font-serif text-lg font-bold">
                GOLDEN <span className="text-[#E5BD55]">TABLE</span>
              </span>
            </Link>

            <Link
              href="/"
              className="text-xs text-stone-500 transition hover:text-[#E5BD55]"
            >
              Back to home
            </Link>
          </header>

          {/* Compact mobile brand treatment */}
          <div className="relative mt-8 overflow-hidden rounded-2xl border border-[#D9B44A]/20 bg-gradient-to-r from-[#241B0A] to-[#0D0D0D] p-5 sm:p-6 lg:hidden">
            <Sparkles size={20} className="text-[#E5BD55]" />
            <p className="mt-3 font-serif text-2xl font-semibold">
              Your game. Your moment.
            </p>
            <p className="mt-2 text-xs leading-5 text-stone-400">
              A refined home for classic gaming experiences.
            </p>
          </div>

          <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-8 sm:py-12 lg:py-10">
            <div className="mb-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#E5BD55]">
                Welcome to Golden Table
              </p>
              <h1 className="mt-3 font-serif text-3xl font-bold sm:text-4xl">
                {title}
              </h1>
              <p className="mt-3 text-sm leading-6 text-stone-400">
                {subtitle}
              </p>
            </div>

            {children}

            <p className="mt-8 text-center text-sm text-stone-500">
              {footerText}{" "}
              <Link
                href={footerHref}
                className="font-semibold text-[#E5BD55] transition hover:text-[#FFF0B0]"
              >
                {footerLinkText}
              </Link>
            </p>
          </div>

          <footer className="pb-2 text-center text-[10px] leading-5 text-stone-600">
            Entertainment experience · Please play responsibly
          </footer>
        </section>
      </div>
    </main>
  );
}
