"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import FeaturedGames from "@/components/home/FeaturedGames";
import Hero from "@/components/home/Hero";
import RouletteShowcase from "@/components/home/RouletteShowcase";

import GameCategories from "@/components/home/GameCategories";
import VipPromotions from "@/components/home/VipPromotions";


// three.js needs the browser, so skip server rendering for the table
// const RouletteTable = dynamic(() => import("@/components/casino/RouletteTable"), {
//   ssr: false,
//   loading: () => (
//     <div className="grid h-[clamp(430px,118vw,780px)] place-items-center rounded-2xl border border-amber-500/20 text-sm text-stone-500 md:h-[clamp(580px,82vh,980px)]">
//       Setting the table...
//     </div>
//   ),
// });

export default function Home() {
  const [spinKey, setSpinKey] = useState(0);

  return (
    <main className="min-h-screen bg-[#080A09] text-white">
        <Hero/>
        <FeaturedGames />
        <GameCategories/>
      <RouletteShowcase/>
     
      <VipPromotions/>
    </main>
  );
}