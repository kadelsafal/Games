
import Link from "next/link";
import {
  ArrowRight,
  CircleDot,
  Grid2X2,
  ShieldCheck,
  Zap,
  Headset,
} from "lucide-react";

const highlights = [
  {
    icon: ShieldCheck,
    title: "Safe & Secure",
    description: "Your play, our priority",
  },
  {
    icon: Zap,
    title: "Fast Experience",
    description: "Smooth and responsive",
  },
  {
    icon: Headset,
    title: "Player Support",
    description: "We're here to help",
  },
];

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-[#B58A2A]/50 bg-[#050505] text-white">
      {/* Atmospheric gold lighting */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_75%_45%,rgba(181,138,42,0.16),transparent_48%)]" />
      <div className="pointer-events-none absolute -left-40 top-20 -z-10 h-96 w-96 rounded-full bg-[#B58A2A]/10 blur-[120px]" />

      <div className="mx-auto grid min-h-[610px] max-w-[1600px] items-center lg:min-h-[690px] lg:grid-cols-[0.9fr_1.1fr]">
        {/* Left: headline and actions */}
        <div className="relative z-10 px-5 pb-10 pt-14 sm:px-8 sm:pt-20 lg:px-10 lg:py-20 xl:px-16">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-[#D9B44A]" />
            <p className="text-[10px] font-semibold tracking-[0.35em] text-[#F2D98B] sm:text-xs">
              THE PREMIUM GAMING EXPERIENCE
            </p>
            <span className="h-px w-8 bg-[#D9B44A]" />
          </div>

          <h1 className="max-w-3xl font-serif text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl md:text-7xl xl:text-[88px]">
            <span className="block text-[#F8F0DE]">Your Game.</span>
            <span className="mt-2 block bg-gradient-to-r from-[#FFF0B0] via-[#D9B44A] to-[#A87920] bg-clip-text pb-2 text-transparent">
              Your Fortune.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-sm leading-7 text-stone-300 sm:text-base sm:leading-8">
            Discover classic casino games, explore the thrill of the roulette
            wheel, and enjoy an immersive interactive gaming experience.
          </p>

          {/* Primary and secondary CTA */}
          <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
            <Link
              href="/roulette"
              className="group inline-flex min-h-14 items-center gap-3 rounded-full bg-gradient-to-r from-[#FFE7A0] via-[#E5BD55] to-[#B58A2A] px-5 py-3 text-sm font-bold text-[#171006] shadow-lg shadow-[#B58A2A]/15 transition hover:-translate-y-0.5 hover:brightness-110 sm:px-7"
            >
              <CircleDot size={21} />
              Play Roulette
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="#featured-games"
              className="inline-flex min-h-14 items-center gap-3 rounded-full border border-[#B58A2A] px-5 py-3 text-sm font-semibold text-[#F2D98B] transition hover:bg-[#B58A2A]/10 sm:px-7"
            >
              <Grid2X2 size={19} />
              Explore Games
            </Link>
          </div>

          {/* Trust and experience highlights */}
          <div className="mt-10 grid max-w-xl grid-cols-1 gap-4 border-t border-white/10 pt-6 sm:grid-cols-3 sm:gap-3">
            {highlights.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex items-center gap-3 sm:items-start">
                <Icon
                  size={25}
                  strokeWidth={1.6}
                  className="shrink-0 text-[#D9B44A]"
                />
                <div>
                  <p className="text-xs font-semibold text-stone-200">
                    {title}
                  </p>
                  <p className="mt-1 text-[10px] leading-4 text-stone-500">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: full-bleed cinematic roulette artwork */}
        <div className="relative min-h-[340px] overflow-hidden sm:min-h-[450px] lg:absolute lg:inset-y-0 lg:right-0 lg:w-[57%]">
          <div className="absolute inset-0">
            <img
              src="/images/casino-hero.jpg"
              alt="A luxurious roulette wheel with gold detailing"
              className="h-full w-auto object-cover object-center"
              fetchPriority="high"
            />
          </div>

          {/* Blend the artwork naturally into the black background */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/35 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/70 via-transparent to-[#050505]/10" />
          <div className="absolute inset-0 bg-[#B58A2A]/5 mix-blend-color" />

          {/* Gold edge lighting */}
          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-px bg-gradient-to-b from-transparent via-[#D9B44A]/50 to-transparent lg:block" />
        </div>
      </div>

      {/* Bottom feature strip */}
      <div className="relative border-t border-[#B58A2A]/40 bg-black/80">
        <div className="mx-auto grid max-w-[1600px] grid-cols-1 divide-y divide-white/10 px-5 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-8 lg:px-10">
          {[
            {
              symbol: "♠",
              title: "CLASSIC GAMES",
              description: "Explore casino favorites",
            },
            {
              symbol: "♛",
              title: "PREMIUM DESIGN",
              description: "A refined gaming atmosphere",
            },
            {
              symbol: "◇",
              title: "MORE TO DISCOVER",
              description: "Find your next game",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="flex items-center gap-4 py-4 sm:px-5 sm:py-5 lg:px-8"
            >
              <span className="font-serif text-3xl text-[#D9B44A]">
                {item.symbol}
              </span>
              <div>
                <p className="text-[10px] font-semibold tracking-[0.15em] text-stone-200">
                  {item.title}
                </p>
                <p className="mt-1 text-xs text-stone-500">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
