
import Link from "next/link";
import { ArrowRight, CircleDot, Sparkles } from "lucide-react";

import dynamic from "next/dynamic";
import { useState } from "react";

const RouletteTable = dynamic(() => import("@/components/casino/RouletteTable"), {
  ssr: false,
  loading: () => (
    <div className="grid h-[clamp(430px,118vw,780px)] place-items-center rounded-2xl border border-amber-500/20 text-sm text-stone-500 md:h-[clamp(580px,82vh,980px)]">
      Setting the table...
    </div>
  ),
});
export default function RouletteShowcase() {
    const [spinKey, setSpinKey] = useState(0);
  return (
    <section
      id="roulette-experience"
      className="overflow-hidden bg-[#050505] px-4 py-16 text-white sm:px-6 lg:px-10 lg:py-24"
    >
      <div className="mx-auto max-w-[1500px]">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] text-[#D9B44A]">
            <Sparkles size={16} />
            THE SIGNATURE EXPERIENCE
          </div>

          <h2 className="font-serif text-3xl font-bold text-[#F2D98B] sm:text-5xl">
            Step Up to the Roulette Table
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-stone-400 sm:text-base">
            Experience our interactive European roulette table, place your
            chips, and watch the wheel spin in a detailed 3D environment.
          </p>

          <Link
            href="/roulette"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#D9B44A] transition hover:text-[#F5D987]"
          >
            Open dedicated roulette page
            <ArrowRight size={17} />
          </Link>
        </div>

        <div className="rounded-2xl border border-[#B58A2A]/30 bg-gradient-to-b from-[#17130B] to-[#080808] p-2 shadow-2xl shadow-black/30 sm:p-4 lg:p-6">
          <div className="mb-3 flex items-center gap-2 px-2 py-2 sm:px-3">
            <CircleDot size={18} className="text-[#D9B44A]" />
            <span className="text-xs font-semibold tracking-[0.18em] text-[#F2D98B]">
              EUROPEAN ROULETTE
            </span>
            <span className="ml-auto text-[10px] tracking-wider text-stone-500">
              DEMO GAME
            </span>
          </div>

          <RouletteTable spinKey={spinKey} />
        </div>

        <div className="mx-auto mt-8 max-w-md px-5 text-center">
          <p className="text-xs tracking-[0.25em] text-stone-500">DEMO TABLE</p>
          <p className="mt-2 text-sm text-stone-300">No real-money bets or prizes</p>
          <button
            onClick={() => setSpinKey((k) => k + 1)}
            className="mt-6 w-full rounded-xl bg-gradient-to-r from-[#B58A2A] to-[#F2D98B] px-8 py-4 font-bold tracking-[0.15em] text-[#17130A] transition hover:brightness-110 active:scale-[0.99]"
          >
            SPIN THE WHEEL
          </button>
        </div>
        <p className="mt-4 text-center text-xs leading-5 text-stone-500">
          Demo experience using virtual chips. No real-money wagering.
        </p>
      </div>
    </section>
  );
}
