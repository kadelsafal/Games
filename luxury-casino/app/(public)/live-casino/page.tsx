
import GameLobby from "@/components/games/GameLobby";
import { games } from "../../../data/game";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function LiveCasinoPage() {
  const liveGames = games.filter((game) =>
    ["Roulette", "Blackjack", "Baccarat"].includes(game.category)
  );

  return (
    <>
    
    <div className="bg-[#070707] px-5 pt-8 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#D9B44A]/30 bg-gradient-to-r from-[#20190B] to-[#0D0D0D] p-5 sm:p-7">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E5BD55]">
              Featured experience
            </p>
            <h2 className="mt-2 font-serif text-2xl text-white">
              Try European Roulette
            </h2>
            <p className="mt-2 text-sm text-stone-400">
              Explore your interactive virtual-chip roulette table.
            </p>
          </div>
          <Link
            href="/roulette"
            className="inline-flex items-center gap-2 rounded-full bg-[#E5BD55] px-5 py-3 text-sm font-bold text-black transition hover:brightness-110"
          >
            Open Roulette <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    <GameLobby
      eyebrow="The live experience"
      title="Step into the action."
      description="Explore classic casino-style tables in a refined, immersive lobby. Discover roulette, blackjack, and baccarat experiences."
      games={liveGames}
      categories={["Roulette", "Blackjack", "Baccarat"]}
    />
    </>
  );
}
