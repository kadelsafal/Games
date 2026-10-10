import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CirclePlay,
  Clock3,
  Gamepad2,
  Heart,
  Sparkles,
  Trophy,
} from "lucide-react";

const recentGames = [
  {
    title: "European Roulette",
    category: "Table game",
    image: "/images/games/roulette.jpg",
    href: "/roulette",
    lastPlayed: "Try it now",
  },
  {
    title: "Classic Blackjack",
    category: "Table game",
    image: "/images/games/blackjack.jpg",
    href: "/table-games",
    lastPlayed: "Explore game",
  },
  {
    title: "Golden Fortune",
    category: "Slot-style game",
    image: "/images/games/golden-slots.jpg",
    href: "/slots",
    lastPlayed: "Explore game",
  },
];

const quickLinks = [
  {
    title: "Explore games",
    description: "Find your next favorite",
    href: "/table-games",
    icon: Gamepad2,
  },
  {
    title: "My favorites",
    description: "View saved games",
    href: "/dashboard/favorites",
    icon: Heart,
  },
  {
    title: "Account settings",
    description: "Manage your profile",
    href: "/dashboard/profile",
    icon: Sparkles,
  },
];

export default function DashboardPage() {
  const userName = "Player";

  return (
    <div className="space-y-9">
      {/* Welcome banner */}
      <section className="relative overflow-hidden rounded-2xl border border-[#D9B44A]/25 bg-gradient-to-br from-[#241B0A] via-[#15120C] to-[#0C0C0C] p-6 sm:p-9 lg:p-10">
        <div className="pointer-events-none absolute -right-10 -top-20 h-64 w-64 rounded-full border border-[#D9B44A]/10 sm:h-80 sm:w-80" />
        <div className="pointer-events-none absolute -right-2 -top-12 h-48 w-48 rounded-full border border-[#D9B44A]/10 sm:h-64 sm:w-64" />

        <div className="relative max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D9B44A]/25 bg-black/20 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#E5BD55]">
            <Sparkles size={13} />
            Your personal space
          </div>

          <h1 className="mt-5 font-serif text-3xl font-bold leading-tight sm:text-5xl">
            Welcome back,{" "}
            <span className="text-[#E5BD55]">{userName}.</span>
          </h1>

          <p className="mt-4 max-w-lg text-sm leading-7 text-stone-400">
            Pick up where you left off, explore the collection, and personalize
            your gaming experience.
          </p>

          <Link
            href="/table-games"
            className="mt-6 inline-flex min-h-12 items-center gap-3 rounded-xl bg-gradient-to-r from-[#FFE7A0] to-[#B58A2A] px-5 py-3 text-sm font-bold text-black transition hover:brightness-110"
          >
            Explore games <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Summary cards */}
      <section>
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#E5BD55]">
              Your overview
            </p>
            <h2 className="mt-2 font-serif text-2xl font-semibold">
              Your activity at a glance
            </h2>
          </div>
          <span className="rounded-full border border-white/10 px-3 py-1.5 text-[10px] text-stone-500">
            Demo preview
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <SummaryCard
            icon={Gamepad2}
            label="Games available"
            value="6"
            note="Sample game catalogue"
          />
          <SummaryCard
            icon={Heart}
            label="Saved favorites"
            value="0"
            note="Connect saved games to your account"
          />
          <SummaryCard
            icon={Clock3}
            label="Recent sessions"
            value="—"
            note="Activity will appear here"
          />
        </div>
      </section>

      {/* Recent games */}
      <section>
        <div className="mb-5 flex items-end justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#E5BD55]">
              Discover
            </p>
            <h2 className="mt-2 font-serif text-2xl font-semibold">
              Games to explore
            </h2>
          </div>
          <Link
            href="/table-games"
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#E5BD55] hover:text-white"
          >
            View all <ArrowRight size={15} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {recentGames.map((game) => (
            <Link
              href={game.href}
              key={game.title}
              className="group overflow-hidden rounded-2xl border border-white/[0.08] bg-[#101010] transition hover:-translate-y-1 hover:border-[#D9B44A]/50"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-[#2A210F] to-black">
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-60 transition duration-500 group-hover:scale-105 group-hover:opacity-80"
                  style={{
                    backgroundImage: `url("${game.image}")`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
                <div className="absolute bottom-3 left-4 flex items-center gap-2">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D9B44A]/40 bg-black/70 text-[#E5BD55]">
                    <CirclePlay size={18} />
                  </span>
                  <span className="text-xs font-semibold text-white">
                    {game.lastPlayed}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 p-4">
                <div>
                  <h3 className="font-semibold text-stone-100">
                    {game.title}
                  </h3>
                  <p className="mt-1 text-xs text-stone-500">
                    {game.category}
                  </p>
                </div>
                <ArrowUpRight
                  size={18}
                  className="text-[#D9B44A] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick links */}
      <section>
        <h2 className="font-serif text-2xl font-semibold">Quick access</h2>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {quickLinks.map(({ title, description, href, icon: Icon }) => (
            <Link
              key={title}
              href={href}
              className="flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 transition hover:border-[#D9B44A]/40 hover:bg-white/[0.04]"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#D9B44A]/20 bg-[#D9B44A]/10 text-[#E5BD55]">
                <Icon size={20} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold">{title}</span>
                <span className="mt-1 block text-xs text-stone-500">
                  {description}
                </span>
              </span>
              <ArrowRight size={16} className="text-stone-600" />
            </Link>
          ))}
        </div>
      </section>

      {/* Responsible entertainment note */}
      <section className="flex items-start gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
        <Trophy size={19} className="mt-0.5 shrink-0 text-[#D9B44A]" />
        <div>
          <p className="text-sm font-semibold text-stone-300">
            Enjoy the experience
          </p>
          <p className="mt-1 text-xs leading-5 text-stone-500">
            This dashboard uses sample information. Game availability, account
            activity, and any virtual-chip data should be supplied by the
            application when those features are implemented.
          </p>
        </div>
      </section>
    </div>
  );
}

function SummaryCard({
  icon: Icon,
  label,
  value,
  note,
}: {
  icon: typeof Gamepad2;
  label: string;
  value: string;
  note: string;
}) {
  return (
    <article className="rounded-2xl border border-white/[0.08] bg-[#101010] p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-stone-400">{label}</p>
        <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#D9B44A]/20 bg-[#D9B44A]/10 text-[#E5BD55]">
          <Icon size={19} />
        </span>
      </div>
      <p className="mt-5 font-serif text-3xl font-bold">{value}</p>
      <p className="mt-2 text-xs leading-5 text-stone-500">{note}</p>
    </article>
  );
}