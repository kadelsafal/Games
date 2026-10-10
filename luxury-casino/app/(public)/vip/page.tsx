
import Link from "next/link";
import {
  Crown,
  Gem,
  Headset,
  ShieldCheck,
  ArrowRight,
  Star,
} from "lucide-react";

const benefits = [
  {
    icon: Gem,
    title: "Curated experiences",
    description:
      "Discover selected games and featured experiences in one place.",
  },
  {
    icon: Headset,
    title: "Dedicated support concept",
    description:
      "A clear place for support information and future member assistance.",
  },
  {
    icon: ShieldCheck,
    title: "Transparent membership",
    description:
      "Understand the available features, rules, and eligibility up front.",
  },
];

const tiers = [
  {
    name: "Gold",
    description: "An introduction to the premium experience.",
    icon: Star,
  },
  {
    name: "Platinum",
    description: "A refined collection of featured experiences.",
    icon: Gem,
  },
  {
    name: "Black",
    description: "The highest tier in the proposed membership design.",
    icon: Crown,
  },
];

export default function VipPage() {
  return (
    <main className="min-h-screen bg-[#070707] text-white">
      <section className="relative overflow-hidden border-b border-[#D9B44A]/20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_35%,rgba(181,138,42,0.2),transparent_50%)]" />

        <div className="relative mx-auto max-w-7xl px-5 py-20 text-center sm:px-8 sm:py-28">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-[#D9B44A]/40 bg-[#D9B44A]/10">
            <Crown size={32} className="text-[#E5BD55]" />
          </div>

          <p className="mt-7 text-xs font-semibold uppercase tracking-[0.35em] text-[#E5BD55]">
            The premium collection
          </p>

          <h1 className="mx-auto mt-5 max-w-4xl font-serif text-5xl font-bold leading-tight sm:text-7xl">
            A more refined
            <span className="block bg-gradient-to-r from-[#FFF0B0] to-[#B58A2A] bg-clip-text text-transparent">
              way to explore.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-stone-400 sm:text-base">
            Discover the proposed VIP experience, curated highlights, and
            membership features in our black-and-gold gaming environment.
          </p>

          <Link
            href="#vip-benefits"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#E5BD55] px-6 py-4 text-sm font-bold text-black transition hover:brightness-110"
          >
            Discover the benefits <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <section
        id="vip-benefits"
        className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20"
      >
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#E5BD55]">
            Membership concept
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold sm:text-4xl">
            The details make the difference.
          </h2>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <article
                key={benefit.title}
                className="rounded-2xl border border-white/10 bg-white/[0.025] p-6 sm:p-7"
              >
                <Icon size={28} className="text-[#E5BD55]" />
                <h3 className="mt-5 text-lg font-semibold">{benefit.title}</h3>
                <p className="mt-3 text-sm leading-6 text-stone-400">
                  {benefit.description}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#0B0B0B]">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#E5BD55]">
              Proposed tiers
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold sm:text-4xl">
              Choose your style.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-stone-400">
              These are visual membership concepts. No tier, reward, or
              eligibility rules are active until you define and implement them.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {tiers.map((tier, index) => {
              const Icon = tier.icon;

              return (
                <article
                  key={tier.name}
                  className={`rounded-2xl border p-6 sm:p-8 ${
                    index === 1
                      ? "border-[#D9B44A]/60 bg-gradient-to-b from-[#211A0D] to-[#0D0D0D]"
                      : "border-white/10 bg-black/20"
                  }`}
                >
                  <Icon size={30} className="text-[#E5BD55]" />
                  <h3 className="mt-5 font-serif text-2xl font-semibold">
                    {tier.name}
                  </h3>
                  <p className="mt-3 min-h-12 text-sm leading-6 text-stone-400">
                    {tier.description}
                  </p>
                  <div className="mt-6 border-t border-white/10 pt-5 text-xs text-stone-500">
                    Membership details to be announced
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-5 rounded-2xl border border-[#D9B44A]/30 bg-gradient-to-r from-[#211A0D] to-[#0B0B0B] p-6 sm:flex-row sm:items-center sm:p-8">
          <div>
            <h2 className="font-serif text-2xl font-bold">
              Ready to explore?
            </h2>
            <p className="mt-2 text-sm text-stone-400">
              Start with the games available in the current experience.
            </p>
          </div>
          <Link
            href="/table-games"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#E5BD55] px-5 py-3 text-sm font-bold text-black hover:brightness-110"
          >
            Browse games <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </main>
  );
}
