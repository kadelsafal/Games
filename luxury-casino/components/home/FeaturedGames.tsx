"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  CirclePlay,
  Sparkles,
} from "lucide-react";

const games = [
  {
    id: "roulette",
    title: "European Roulette",
    category: "TABLE GAME",
    description: "Take your seat and test your luck.",
    image:
      "https://images.unsplash.com/photo-1606167668584-78701c57f13d?auto=format&fit=crop&w=900&q=85",
    href: "/roulette",
    featured: true,
  },
  {
    id: "blackjack",
    title: "Blackjack",
    category: "CARD GAME",
    description: "Play your cards with confidence.",
    image:
      "https://images.unsplash.com/photo-1606167668584-78701c57f13d?auto=format&fit=crop&w=900&q=85",
    href: "/blackjack",
    featured: false,
  },
  {
    id: "slots",
    title: "Golden Slots",
    category: "SLOTS",
    description: "Discover a world of golden rewards.",
    image:
      "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?auto=format&fit=crop&w=900&q=85",
    href: "/slots",
    featured: false,
  },
  {
    id: "poker",
    title: "Poker Room",
    category: "CARD GAME",
    description: "Bring your strategy to the table.",
    image:
      "https://images.unsplash.com/photo-1511193311914-0346f16efe90?auto=format&fit=crop&w=900&q=85",
    href: "/poker",
    featured: false,
  },
];

const AUTO_SLIDE_MS = 4000;

export default function FeaturedGames() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Responsive visible-card count.
  const [visible, setVisible] = useState(3);

  useEffect(() => {
    const updateVisible = () => {
      if (window.innerWidth < 640) setVisible(1);
      else if (window.innerWidth < 1024) setVisible(2);
      else setVisible(3);
    };

    updateVisible();
    window.addEventListener("resize", updateVisible);

    return () => window.removeEventListener("resize", updateVisible);
  }, []);

  const maxIndex = Math.max(0, games.length - visible);

  useEffect(() => {
    setIndex((current) => Math.min(current, maxIndex));
  }, [maxIndex]);

  useEffect(() => {
    if (paused || maxIndex === 0) return;

    const timer = window.setInterval(() => {
      setIndex((current) => (current >= maxIndex ? 0 : current + 1));
    }, AUTO_SLIDE_MS);

    return () => window.clearInterval(timer);
  }, [paused, maxIndex]);

  const previous = () => {
    setIndex((current) => (current <= 0 ? maxIndex : current - 1));
  };

  const next = () => {
    setIndex((current) => (current >= maxIndex ? 0 : current + 1));
  };

  return (
    <section
      aria-label="Featured casino games"
      className="bg-[#050505] px-4 py-14 text-white sm:px-6 lg:px-10 lg:py-20"
    >
      <div className="mx-auto max-w-[1400px]">
        {/* Section heading */}
        <div className="mb-8 flex items-end justify-between gap-4 sm:mb-10">
          <div>
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold tracking-[0.25em] text-[#D9B44A]">
              <Sparkles size={15} />
              DISCOVER THE EXPERIENCE
            </div>

            <h2 className="font-serif text-3xl font-bold text-[#F2D98B] sm:text-4xl lg:text-5xl">
              Featured Games
            </h2>

            <p className="mt-2 max-w-lg text-sm text-stone-400 sm:text-base">
              Discover your next favorite game in our collection.
            </p>
          </div>

          {/* Gold navigation buttons */}
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={previous}
              aria-label="Previous games"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#B58A2A] text-[#F2D98B] transition cursor-pointer hover:bg-[#db9f1c]  hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F2D98B] sm:h-12 sm:w-12"
            >
              <ChevronLeft size={23} />
            </button>

            <button
              type="button"
              onClick={next}
              aria-label="Next games"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#B58A2A] text-[#F2D98B] transition cursor-pointer hover:bg-[#db9f1c] hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F2D98B] sm:h-12 sm:w-12"
            >
              <ChevronRight size={23} />
            </button>
          </div>
        </div>

        {/* Slider viewport */}
        <div
          className="overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
              setPaused(false);
            }
          }}
          onTouchStart={(event) => {
            touchStartX.current = event.touches[0].clientX;
          }}
          onTouchEnd={(event) => {
            if (touchStartX.current === null) return;

            const difference =
              touchStartX.current - event.changedTouches[0].clientX;

            if (Math.abs(difference) > 50) {
              difference > 0 ? next() : previous();
            }

            touchStartX.current = null;
          }}
        >
          <div
            className="flex gap-4 transition-transform duration-700 ease-in-out sm:gap-5"
            style={{
              transform: `translateX(calc(-${index} * (100% / ${visible} + ${visible === 1 ? 0 : visible === 2 ? 8 : 10.66}px)))`,
            }}
          >
            {games.map((game) => (
              <article
                key={game.id}
                className="group relative min-w-0 shrink-0 basis-full overflow-hidden rounded-2xl border border-[#B58A2A]/20 bg-[#101010] sm:basis-[calc(50%-10px)] lg:basis-[calc(33.333%-14px)]"
              >
                {/* Game artwork */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={game.image}
                    alt=""
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                    loading="lazy"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                  <span className="absolute left-4 top-4 rounded-full border border-[#D9B44A]/50 bg-black/70 px-3 py-1.5 text-[10px] font-semibold tracking-[0.15em] text-[#F2D98B] backdrop-blur-sm">
                    {game.category}
                  </span>

                  {game.featured && (
                    <span className="absolute right-4 top-4 rounded-full bg-gradient-to-r from-[#F5D987] to-[#B58A2A] px-3 py-1.5 text-[10px] font-bold tracking-wider text-black">
                      FEATURED
                    </span>
                  )}

                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                    <div>
                      <h3 className="font-serif text-xl font-bold text-white sm:text-2xl">
                        {game.title}
                      </h3>
                      <p className="mt-1 text-xs text-stone-300 sm:text-sm">
                        {game.description}
                      </p>
                    </div>

                    <Link
                      href={game.href}
                      aria-label={`Play ${game.title}`}
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#F5D987] to-[#B58A2A] text-black transition hover:scale-110 hover:brightness-110"
                    >
                      <CirclePlay size={23} />
                    </Link>
                  </div>
                </div>

                <div className="h-1 bg-gradient-to-r from-transparent via-[#B58A2A]/70 to-transparent opacity-50 transition group-hover:opacity-100" />
              </article>
            ))}
          </div>
        </div>

        {/* Slide indicators */}
        <div className="mt-6 flex justify-center gap-2">
          {Array.from({ length: maxIndex + 1 }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={index === i ? "true" : undefined}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === i
                  ? "w-8 bg-[#D9B44A]"
                  : "w-2 bg-stone-700 hover:bg-stone-500"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}