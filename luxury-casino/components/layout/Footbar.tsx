
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Crown,
  
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import CurrentYear from "./CurrentYear";

const footerGroups = [
  {
    title: "Explore",
    links: [
      { label: "Home", href: "/" },
      { label: "Live Casino", href: "/live-casino" },
      
    ],
  },
  {
    title: "Discover",
    links: [
      { label: "Promotions", href: "/promotions" },
      { label: "VIP Lounge", href: "/vip" },
      { label: "About Us", href: "/about" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "Information",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Responsible Gaming", href: "/responsible-gaming" },
      { label: "FAQs", href: "/faq" },
    ],
  },
];


function FacebookIcon({ size = 19 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M13.5 21v-8.2h2.8l.4-3.2h-3.2V7.5c0-.9.3-1.6 1.6-1.6h1.7V3.1c-.3 0-1.4-.1-2.6-.1-2.6 0-4.4 1.6-4.4 4.5v2.1H7v3.2h2.8V21h3.7Z" />
    </svg>
  );
}


export default function Footer() {
  return (
    <footer className="relative isolate overflow-hidden border-t border-[#B58A2A]/50 bg-[#050505] text-white">
      {/* Ambient gold lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-72 w-[650px] -translate-x-1/2 rounded-full bg-[#B58A2A]/10 blur-[120px]"
      />

      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-10">
        {/* Premium call-to-action */}
        <div className="border-b border-[#B58A2A]/25 py-10 sm:py-14">
          <div className="group relative overflow-hidden rounded-3xl border border-[#B58A2A]/40 bg-gradient-to-br from-[#211908] via-[#100E09] to-[#080808] p-7 sm:p-10 lg:flex lg:items-center lg:justify-between lg:gap-8">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-12 -top-20 h-64 w-64 rounded-full bg-[#D9B44A]/10 blur-3xl transition duration-500 group-hover:bg-[#D9B44A]/20"
            />

            <div className="relative flex items-start gap-4">
              <div className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#D9B44A]/40 bg-[#B58A2A]/10 text-[#F2D98B] sm:flex">
                <Crown size={28} strokeWidth={1.7} />
              </div>

              <div>
                <p className="text-[10px] font-semibold tracking-[0.28em] text-[#D9B44A] sm:text-xs">
                  BEYOND THE ORDINARY
                </p>

                <h2 className="mt-3 font-serif text-2xl font-bold text-[#F2D98B] sm:text-3xl lg:text-4xl">
                  Discover the Experience
                </h2>

                <p className="mt-3 max-w-xl text-sm leading-7 text-stone-400">
                  Explore live casino entertainment, discover your favorite
                  games, and step into our exclusive VIP experience.
                </p>
              </div>
            </div>

            <Link
              href="/table-games"
              className="relative mt-6 inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#F5D987] via-[#D9B44A] to-[#B58A2A] px-6 py-3.5 text-sm font-bold text-[#171006] shadow-lg shadow-[#B58A2A]/10 transition duration-300 hover:-translate-y-0.5 hover:brightness-110 lg:mt-0"
            >
              Explore Games
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>

        {/* Main footer */}
        <div className="grid gap-12 py-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10 lg:py-16">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-5">
            <Link
              href="/"
              aria-label="Casino home"
              className="group inline-flex items-center gap-3"
            >
              <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-[#D9B44A]/60 bg-gradient-to-br from-[#F5D987] via-[#B58A2A] to-[#745016] text-black shadow-md shadow-[#B58A2A]/10 transition duration-300 group-hover:shadow-lg group-hover:shadow-[#B58A2A]/20">
                <Crown size={26} strokeWidth={1.8} />
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

            <p className="mt-6 max-w-sm text-sm leading-7 text-stone-400">
              Experience casino entertainment in a premium black-and-gold
              setting, designed for players who appreciate style, atmosphere,
              and an elegant gaming experience.
            </p>

            {/* Facebook only */}
            <div className="mt-7">
              <p className="mb-3 text-[10px] font-semibold tracking-[0.22em] text-[#D9B44A]">
                FOLLOW OUR JOURNEY
              </p>

              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit our Facebook page"
                className="group/facebook inline-flex items-center gap-3 rounded-xl border border-[#B58A2A]/30 bg-white/[0.03] px-4 py-3 transition duration-300 hover:border-[#D9B44A]/70 hover:bg-[#B58A2A]/10"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#F5D987] to-[#B58A2A] text-black">
                  <FacebookIcon size={19} />
                </span>

                <span>
                  <span className="block text-sm font-semibold text-[#F2D98B]">
                    Facebook
                  </span>
                  <span className="mt-0.5 block text-xs text-stone-500">
                    Follow our official page
                  </span>
                </span>

                <ArrowUpRight
                  size={16}
                  className="ml-3 text-stone-500 transition group-hover/facebook:-translate-y-0.5 group-hover/facebook:translate-x-0.5 group-hover/facebook:text-[#F2D98B]"
                />
              </a>
            </div>

            {/* Responsible gaming */}
            <div className="mt-6 flex max-w-sm items-start gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
              <ShieldCheck
                size={19}
                className="mt-0.5 shrink-0 text-[#D9B44A]"
              />

              <div>
                <p className="text-sm font-semibold text-stone-200">
                  Play responsibly
                </p>
                <p className="mt-1 text-xs leading-5 text-stone-500">
                  Set limits, understand the risks, and keep entertainment in
                  balance.
                </p>
              </div>
            </div>
          </div>

          {/* Navigation columns */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:col-span-2 sm:grid-cols-3 lg:col-span-7 lg:gap-8">
            {footerGroups.map((group) => (
              <div key={group.title}>
                <h3 className="text-xs font-bold tracking-[0.18em] text-[#F2D98B]">
                  {group.title.toUpperCase()}
                </h3>

                <div className="mt-6 h-px w-9 bg-gradient-to-r from-[#F5D987] to-[#B58A2A]/20" />

                <ul className="mt-5 flex flex-col items-start gap-4">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="group/link inline-flex items-center gap-1.5 text-sm text-stone-400 transition duration-200 hover:text-[#F2D98B]"
                      >
                        {link.label}
                        <ArrowUpRight
                          size={13}
                          className="opacity-0 transition duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:opacity-100"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Gold divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#B58A2A]/50 to-transparent" />

        {/* Bottom bar */}
        <div className="flex flex-col gap-4 py-6 text-xs text-stone-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
  © <CurrentYear /> CASINO. All rights reserved.
</p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <span className="inline-flex items-center gap-2">
              <Sparkles size={14} className="text-[#D9B44A]" />
              <span>PLAY IN STYLE</span>
            </span>

            <Link
              href="/privacy"
              className="transition hover:text-[#F2D98B]"
            >
              Privacy
            </Link>

            <Link
              href="/terms"
              className="transition hover:text-[#F2D98B]"
            >
              Terms
            </Link>

            <Link
              href="/responsible-gaming"
              className="transition hover:text-[#F2D98B]"
            >
              Responsible Gaming
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
