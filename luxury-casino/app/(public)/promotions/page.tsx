
import Link from "next/link";
import { ArrowRight, Gift, Sparkles, CalendarDays } from "lucide-react";

const offers = [
  {
    icon: Sparkles,
    label: "EXPLORE",
    title: "Discover the game collection",
    description:
      "Explore different game styles and find the experience that suits you.",
    action: "Browse games",
    href: "/table-games",
  },
  {
    icon: CalendarDays,
    label: "WHAT'S NEW",
    title: "Your next favorite awaits",
    description:
      "Visit the lobby to discover newly added titles and featured experiences.",
    action: "Explore slots",
    href: "/slots",
  },
];

export default function PromotionsPage() {
  return (
    <main className="min-h-screen bg-[#070707] text-white">
      <section className="relative overflow-hidden border-b border-[#D9B44A]/20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_30%,rgba(181,138,42,0.19),transparent_50%)]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-2">
          <div>
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#E5BD55]">
              <Gift size={17} /> The offers collection
            </p>

            <h1 className="mt-6 font-serif text-5xl font-bold leading-tight sm:text-7xl">
              Something special
              <span className="block bg-gradient-to-r from-[#FFF0B0] to-[#B58A2A] bg-clip-text text-transparent">
                awaits you.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-sm leading-7 text-stone-400 sm:text-base">
              Discover featured experiences, new games, and updates from
              the casino-style entertainment collection.
            </p>

            <Link
              href="/table-games"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#E5BD55] px-6 py-4 text-sm font-bold text-black transition hover:brightness-110"
            >
              Explore experiences <ArrowRight size={18} />
            </Link>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-[#D9B44A]/30 bg-gradient-to-br from-[#30230B] via-[#17130C] to-[#0B0B0B] p-8 sm:p-12">
            <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full border border-[#D9B44A]/20" />
            <div className="absolute -right-6 -top-6 h-36 w-36 rounded-full border border-[#D9B44A]/20" />

            <Gift size={54} strokeWidth={1.2} className="text-[#E5BD55]" />

            <p className="mt-10 text-xs font-semibold uppercase tracking-[0.25em] text-[#E5BD55]">
              Featured collection
            </p>
            <h2 className="mt-3 max-w-sm font-serif text-3xl font-semibold sm:text-4xl">
              More to discover. More to enjoy.
            </h2>
            <p className="mt-4 text-sm leading-6 text-stone-400">
              Browse the latest highlights and learn about any available
              offers before participating.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#E5BD55]">
          Explore more
        </p>
        <h2 className="mt-3 font-serif text-3xl font-bold sm:text-4xl">
          Featured highlights
        </h2>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {offers.map((offer) => {
            const Icon = offer.icon;

            return (
              <article
                key={offer.title}
                className="rounded-2xl border border-white/10 bg-white/[0.025] p-6 transition hover:border-[#D9B44A]/40 sm:p-8"
              >
                <Icon size={28} className="text-[#E5BD55]" />
                <p className="mt-6 text-[10px] font-bold tracking-[0.25em] text-stone-500">
                  {offer.label}
                </p>
                <h3 className="mt-2 font-serif text-2xl font-semibold">
                  {offer.title}
                </h3>
                <p className="mt-3 max-w-md text-sm leading-6 text-stone-400">
                  {offer.description}
                </p>
                <Link
                  href={offer.href}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#E5BD55] hover:text-white"
                >
                  {offer.action} <ArrowRight size={16} />
                </Link>
              </article>
            );
          })}
        </div>

        <div className="mt-10 rounded-2xl border border-white/10 p-5 sm:p-7">
          <h3 className="font-semibold">About offers and eligibility</h3>
          <p className="mt-2 text-sm leading-6 text-stone-400">
            This page currently showcases game discovery rather than active
            cash or deposit bonuses. If offers are introduced later, publish
            their eligibility, expiry, restrictions, and full terms here.
          </p>
        </div>
      </section>
    </main>
  );
}
