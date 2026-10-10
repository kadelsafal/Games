
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, CirclePlay } from "lucide-react";
import type { CasinoGame } from "../../data/game";

export default function GameCard({ game }: { game: CasinoGame }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-white/[0.08] bg-[#101010] transition duration-300 hover:-translate-y-1 hover:border-[#D9B44A]/60 hover:shadow-xl hover:shadow-black/30">
      <Link href={game.href} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-[#252016] via-[#141414] to-black">
          <Image
            src={game.image}
            alt={game.title}
            fill
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 25vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />

          {game.badge && (
            <span className="absolute left-3 top-3 rounded-full border border-[#D9B44A]/30 bg-black/80 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#F2D98B]">
              {game.badge}
            </span>
          )}

          <div className="absolute inset-0 flex items-center justify-center bg-black/35 opacity-0 transition group-hover:opacity-100">
            <span className="flex items-center gap-2 rounded-full bg-[#E5BD55] px-5 py-3 text-sm font-bold text-black">
              <CirclePlay size={18} />
              Explore game
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 p-4">
          <div className="min-w-0">
            <p className="truncate font-semibold text-[#F8F0DE]">
              {game.title}
            </p>
            <p className="mt-1 text-xs text-stone-500">{game.category}</p>
          </div>

          <ArrowUpRight
            size={19}
            className="shrink-0 text-[#D9B44A] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </div>
      </Link>
    </article>
  );
}
