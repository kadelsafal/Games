
import Link from "next/link";
import {
  ArrowUpRight,
  CircleDot,
  Club,
  Gem,
  Spade,
  Sparkles,
} from "lucide-react";

const categories = [
  {
    title: "Roulette",
    description: "Classic wheel action",
    href: "/roulette",
    icon: CircleDot,
    number: "01",
  },
  {
    title: "Card Games",
    description: "Cards, skill and strategy",
    href: "/table-games",
    icon: Spade,
    number: "02",
  },
  {
    title: "Slots",
    description: "Explore themed machines",
    href: "/slots",
    icon: Sparkles,
    number: "03",
  },
  {
    title: "Table Games",
    description: "Discover casino classics",
    href: "/table-games",
    icon: Club,
    number: "04",
  },
  {
    title: "VIP Lounge",
    description: "Discover premium features",
    href: "/vip",
    icon: Gem,
    number: "05",
  },
];

export default function GameCategories() {
  return (
    <section className="bg-[#080808] px-5 py-16 text-white sm:px-8 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-9 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.25em] text-[#D9B44A]">
              FIND YOUR GAME
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-[#F2D98B] sm:text-4xl">
              Explore Categories
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-stone-400 sm:text-base">
              From the roulette wheel to classic table games, find an
              experience that matches your style.
            </p>
          </div>

          <Gem className="hidden text-[#B58A2A]/70 sm:block" size={36} />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map(({ title, description, href, icon: Icon, number }) => (
            <Link
              key={title}
              href={href}
              className="group flex min-h-36 items-center gap-5 rounded-2xl border border-white/10 bg-gradient-to-br from-[#15130F] to-[#0B0B0B] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#B58A2A]/60 hover:shadow-xl hover:shadow-[#B58A2A]/5 sm:p-6"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-[#B58A2A]/30 bg-[#B58A2A]/10 text-[#D9B44A] transition group-hover:bg-[#B58A2A] group-hover:text-black">
                <Icon size={26} strokeWidth={1.6} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-[10px] tracking-[0.2em] text-stone-500">
                  CATEGORY {number}
                </p>
                <h3 className="mt-1 font-serif text-xl font-semibold text-[#F2D98B]">
                  {title}
                </h3>
                <p className="mt-1 text-sm text-stone-400">{description}</p>
              </div>

              <ArrowUpRight
                size={20}
                className="shrink-0 text-stone-500 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#D9B44A]"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
