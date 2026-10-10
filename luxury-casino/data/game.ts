
export type CasinoGame = {
  id: string;
  title: string;
  category: string;
  image: string;
  badge?: string;
  href: string;
};

export const games: CasinoGame[] = [
  {
    id: "roulette",
    title: "European Roulette",
    category: "Roulette",
    image: "/images/casino.jpg",
    badge: "Featured",
    href: "/roulette",
  },
  {
    id: "blackjack",
    title: "Classic Blackjack",
    category: "Blackjack",
    image: "/images/casino.jpg",
    badge: "Popular",
    href: "/table-games",
  },
  {
    id: "baccarat",
    title: "Baccarat Royale",
    category: "Baccarat",
    image: "/images/casino.jpg",
    href: "/table-games",
  },
  {
    id: "golden-slots",
    title: "Golden Fortune",
    category: "Slots",
    image: "/images/casino.jpg",
    badge: "New",
    href: "/slots",
  },
  {
    id: "diamond-slots",
    title: "Diamond Reels",
    category: "Slots",
    image: "/images/casino.jpg",
    href: "/slots",
  },
  {
    id: "poker",
    title: "Poker Table",
    category: "Poker",
    image: "/images/casino.jpg",
    href: "/table-games",
  },
];
