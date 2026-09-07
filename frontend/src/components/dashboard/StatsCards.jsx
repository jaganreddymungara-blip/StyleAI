import {
  Shirt,
  Heart,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

export default function StatsCards({
  wardrobeCount = 0,
  favoriteCount = 0,
  loading = false,
}) {
  const stats = [
    {
      label: "Wardrobe",
      value: wardrobeCount,
      description: "Pieces in your closet",
      icon: Shirt,
      accent: "gold",
    },
    {
      label: "Favorites",
      value: favoriteCount,
      description: "Pieces you love",
      icon: Heart,
      accent: "rose",
    },
    {
      label: "Style Potential",
      value: "∞",
      description: "Possible combinations",
      icon: Sparkles,
      accent: "dark",
    },
  ];

  return (
    <section className="mt-8">
      {/* Section heading */}
      <div className="mb-5 flex items-end justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gray-400">
            Your wardrobe
          </p>

          <h2 className="mt-1 text-xl font-black tracking-tight text-gray-900">
            Style at a glance
          </h2>
        </div>

        <span className="hidden text-xs font-medium text-gray-400 sm:block">
          Updated from your wardrobe
        </span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;

          const iconStyle =
            stat.accent === "gold"
              ? "bg-yellow-100 text-yellow-700 group-hover:bg-yellow-500 group-hover:text-black"
              : stat.accent === "rose"
              ? "bg-rose-50 text-rose-500 group-hover:bg-rose-500 group-hover:text-white"
              : "bg-gray-100 text-gray-900 group-hover:bg-black group-hover:text-yellow-400";

          return (
            <div
              key={stat.label}
              className="
                group
                relative
                overflow-hidden
                rounded-[26px]
                border
                border-gray-200/80
                bg-white
                p-6
                shadow-[0_12px_40px_rgba(0,0,0,0.05)]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]
              "
            >
              {/* Subtle hover glow */}
              <div
                className="
                  pointer-events-none
                  absolute
                  -right-12
                  -top-12
                  h-32
                  w-32
                  rounded-full
                  bg-yellow-400/10
                  blur-3xl
                  opacity-0
                  transition-opacity
                  duration-500
                  group-hover:opacity-100
                "
              />

              <div className="relative">
                {/* Top row */}
                <div className="flex items-start justify-between">
                  <div
                    className={`
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-2xl
                      transition-all
                      duration-300
                      ${iconStyle}
                    `}
                  >
                    <Icon size={21} strokeWidth={2} />
                  </div>

                  <div
                    className="
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-full
                      bg-gray-50
                      text-gray-300
                      transition-all
                      duration-300
                      group-hover:bg-gray-900
                      group-hover:text-yellow-400
                    "
                  >
                    <ArrowUpRight size={15} />
                  </div>
                </div>

                {/* Value */}
                <div className="mt-7">
                  {loading ? (
                    <div className="h-10 w-20 animate-pulse rounded-lg bg-gray-100" />
                  ) : (
                    <p className="text-4xl font-black tracking-tight text-gray-900">
                      {stat.value}
                    </p>
                  )}

                  <h3 className="mt-2 text-sm font-bold text-gray-900">
                    {stat.label}
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-gray-400">
                    {stat.description}
                  </p>
                </div>

                {/* Bottom accent */}
                <div className="mt-6 h-px w-full bg-gray-100">
                  <div
                    className="
                      h-px
                      w-0
                      bg-yellow-500
                      transition-all
                      duration-500
                      group-hover:w-1/3
                    "
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

