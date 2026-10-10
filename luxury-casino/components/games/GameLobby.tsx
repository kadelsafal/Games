
"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, Gamepad2 } from "lucide-react";
import type { CasinoGame } from "../../data/game";
import GameCard from "@/components/games/GameCard";

type Props = {
  eyebrow: string;
  title: string;
  description: string;
  games: CasinoGame[];
  categories: string[];
};

export default function GameLobby({
  eyebrow,
  title,
  description,
  games,
  categories,
}: Props) {
  const [activeCategory, setActiveCategory] = useState("All Games");
  const [search, setSearch] = useState("");

  const filteredGames = useMemo(() => {
    const term = search.trim().toLowerCase();

    return games.filter((game) => {
      const matchesCategory =
        activeCategory === "All Games" ||
        game.category === activeCategory;

      const matchesSearch =
        game.title.toLowerCase().includes(term) ||
        game.category.toLowerCase().includes(term);

      return matchesCategory && matchesSearch;
    });
  }, [games, activeCategory, search]);

  return (
    <main className="min-h-screen bg-[#070707] text-white">
      <section className="relative overflow-hidden border-b border-[#D9B44A]/20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_75%_20%,rgba(181,138,42,0.15),transparent_45%)]" />

        <div className="relative mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#D9B44A]" />
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#E5BD55]">
              {eyebrow}
            </p>
          </div>

          <h1 className="mt-5 max-w-3xl font-serif text-4xl font-bold leading-tight sm:text-6xl">
            {title}
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-stone-400 sm:text-base">
            {description}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <label className="flex min-h-12 flex-1 items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 focus-within:border-[#D9B44A]/60">
              <Search size={19} className="shrink-0 text-[#D9B44A]" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search games..."
                aria-label="Search games"
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-stone-600"
              />
            </label>

            <div className="flex min-h-12 items-center gap-2 rounded-xl border border-white/10 px-4 text-xs text-stone-400">
              <SlidersHorizontal size={16} className="text-[#D9B44A]" />
              {filteredGames.length} games available
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
        <div className="mb-8 flex flex-wrap gap-2">
          {["All Games", ...categories].map((category) => {
            const active = activeCategory === category;

            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                aria-pressed={active}
                className={`rounded-full border px-4 py-2.5 text-xs font-semibold transition ${
                  active
                    ? "border-[#D9B44A] bg-[#D9B44A] text-black"
                    : "border-white/10 bg-white/[0.03] text-stone-400 hover:border-[#D9B44A]/50 hover:text-white"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {filteredGames.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-white/10 px-5 py-16 text-center">
            <Gamepad2 className="mx-auto text-[#D9B44A]" size={36} />
            <h2 className="mt-4 text-lg font-semibold">No games found</h2>
            <p className="mt-2 text-sm text-stone-500">
              Try another search or select a different category.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setActiveCategory("All Games");
              }}
              className="mt-5 text-sm font-semibold text-[#E5BD55] hover:text-white"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
