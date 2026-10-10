
import Link from "next/link";
import {
  ArrowRight,
  Crown,
  Gem,
  Sparkles,
  Star,
} from "lucide-react";

export default function VipPromotions() {
  return (
    <section className="bg-[#080808] px-5 py-16 text-white sm:px-8 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-9 text-center">
          <p className="text-xs font-semibold tracking-[0.25em] text-[#D9B44A]">
            BEYOND THE ORDINARY
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-[#F2D98B] sm:text-4xl">
            Discover the Experience
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-stone-400 sm:text-base">
            Explore the world of casino entertainment in a setting designed
            around a premium black-and-gold aesthetic.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {/* VIP card */}
          <article className="group relative overflow-hidden rounded-3xl border border-[#B58A2A]/35 bg-gradient-to-br from-[#211908] via-[#100E09] to-[#080808] p-7 sm:p-10">
            <div className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full bg-[#B58A2A]/10 blur-3xl transition group-hover:bg-[#B58A2A]/20" />

            <div className="relative">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#D9B44A]/40 bg-[#B58A2A]/10 text-[#F2D98B]">
                <Crown size={29} />
              </div>

              <p className="mt-7 text-xs font-semibold tracking-[0.22em] text-[#D9B44A]">
                THE VIP LOUNGE
              </p>

              <h3 className="mt-3 max-w-md font-serif text-3xl font-bold text-[#F2D98B] sm:text-4xl">
                A More Exclusive Experience
              </h3>

              <p className="mt-4 max-w-md text-sm leading-7 text-stone-400">
                Discover our premium gaming area and explore the features
                available to members.
              </p>

              <Link
                href="/vip"
                className="mt-7 inline-flex items-center gap-2 rounded-full border border-[#B58A2A]/60 px-5 py-3 text-sm font-semibold text-[#F2D98B] transition hover:bg-[#B58A2A]/15"
              >
                Explore VIP
                <ArrowRight size={17} />
              </Link>

              <Star className="absolute bottom-0 right-0 hidden h-20 w-20 text-[#D9B44A]/10 sm:block" />
            </div>
          </article>

          {/* Discover games card */}
          <article className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#171717] to-[#090909] p-7 sm:p-10">
            <div className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full bg-white/5 blur-3xl" />

            <div className="relative">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/5 text-[#D9B44A]">
                <Gem size={29} />
              </div>

              <p className="mt-7 text-xs font-semibold tracking-[0.22em] text-[#D9B44A]">
                THE GAME COLLECTION
              </p>

              <h3 className="mt-3 max-w-md font-serif text-3xl font-bold text-white sm:text-4xl">
                Find Your Next Favorite
              </h3>

              <p className="mt-4 max-w-md text-sm leading-7 text-stone-400">
                Browse the collection and discover the table games and
                experiences available on our platform.
              </p>

              <Link
                href="/table-games"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#F5D987] to-[#B58A2A] px-5 py-3 text-sm font-bold text-black transition hover:brightness-110"
              >
                Browse Games
                <Sparkles size={17} />
              </Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
