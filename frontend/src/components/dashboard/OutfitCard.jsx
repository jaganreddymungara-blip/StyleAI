import {
  Sparkles,
  Shirt,
  Heart,
  History,
  ArrowRight,
  WandSparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function OutfitCard() {
  const features = [
    {
      icon: Shirt,
      title: "Build Your Wardrobe",
      description:
        "Add your clothes and organize them by category, color, season, occasion, and brand.",
      link: "/wardrobe",
      linkText: "Manage Wardrobe",
    },
    {
      icon: Heart,
      title: "Your Favorites",
      description:
        "Keep your favorite pieces and outfit combinations close so they're easy to revisit.",
      link: "/favorites",
      linkText: "View Favorites",
    },
    {
      icon: History,
      title: "Style History",
      description:
        "Revisit previously generated outfits and keep track of the looks you've discovered.",
      link: "/history",
      linkText: "View History",
    },
  ];

  return (
    <section className="mt-8">

      {/* ================================================= */}
      {/* AI STYLIST HERO */}
      {/* ================================================= */}

      <div
        className="
          relative
          overflow-hidden
          bg-[#111111]
          rounded-[28px]
          text-white
          border
          border-gray-800
          shadow-xl
        "
      >

        {/* Background glow */}

        <div
          className="
            absolute
            -top-32
            right-0
            w-[420px]
            h-[420px]
            bg-yellow-500/10
            rounded-full
            blur-[120px]
            pointer-events-none
          "
        />

        <div
          className="
            absolute
            -bottom-40
            left-1/3
            w-[320px]
            h-[320px]
            bg-yellow-400/5
            rounded-full
            blur-[100px]
            pointer-events-none
          "
        />


        <div
          className="
            relative
            z-10
            p-8
            lg:p-10
            flex
            flex-col
            lg:flex-row
            lg:items-center
            lg:justify-between
            gap-10
          "
        >

          {/* Left */}

          <div className="max-w-3xl">

            <div
              className="
                inline-flex
                items-center
                gap-2
                px-4
                py-2
                rounded-full
                bg-yellow-500/10
                border
                border-yellow-500/20
                text-yellow-400
                text-sm
                font-semibold
              "
            >

              <Sparkles size={16} />

              AI Personal Stylist

            </div>


            <h2
              className="
                text-3xl
                lg:text-4xl
                font-black
                tracking-tight
                mt-6
              "
            >
              Your next great outfit
              <span className="text-yellow-400">
                {" "}starts here.
              </span>
            </h2>


            <p
              className="
                text-gray-400
                mt-4
                text-base
                lg:text-lg
                leading-7
                max-w-2xl
              "
            >
              Tell StyleAI what you're dressing for and let it
              create outfit combinations using the clothes
              already in your wardrobe.
            </p>


            <div className="flex flex-wrap gap-3 mt-7">

              <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs">
                Your wardrobe
              </span>

              <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs">
                Your colors
              </span>

              <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs">
                Your occasion
              </span>

              <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs">
                Your style
              </span>

            </div>

          </div>


          {/* CTA */}

          <div className="shrink-0">

            <Link
              to="/recommendations"
              className="
                group
                inline-flex
                items-center
                justify-center
                gap-3
                bg-yellow-500
                text-black
                px-7
                py-4
                rounded-2xl
                font-bold
                shadow-lg
                hover:bg-yellow-400
                hover:-translate-y-1
                transition-all
                duration-300
              "
            >

              <WandSparkles size={19} />

              Start Styling

              <ArrowRight
                size={18}
                className="
                  group-hover:translate-x-1
                  transition-transform
                "
              />

            </Link>

            <p className="text-gray-600 text-xs text-center mt-3">
              Create a personalized look
            </p>

          </div>

        </div>

      </div>


      {/* ================================================= */}
      {/* QUICK ACCESS */}
      {/* ================================================= */}

      <div className="mt-6">

        <div className="flex items-center justify-between mb-4">

          <div>

            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
              Your Style Space
            </p>

            <h3 className="text-xl font-black text-gray-900 mt-1">
              Quick access
            </h3>

          </div>

        </div>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          {features.map((feature) => {

            const Icon = feature.icon;

            return (
              <Link
                key={feature.title}
                to={feature.link}
                className="
                  group
                  bg-white
                  rounded-[24px]
                  border
                  border-gray-200
                  p-6
                  shadow-sm
                  hover:shadow-xl
                  hover:-translate-y-1
                  transition-all
                  duration-300
                "
              >

                <div className="flex items-start justify-between">

                  <div
                    className="
                      w-11
                      h-11
                      rounded-xl
                      bg-gray-100
                      flex
                      items-center
                      justify-center
                      text-gray-700
                      group-hover:bg-yellow-100
                      group-hover:text-yellow-700
                      transition-all
                      duration-300
                    "
                  >
                    <Icon size={21} />
                  </div>


                  <ArrowRight
                    size={18}
                    className="
                      text-gray-300
                      group-hover:text-yellow-500
                      group-hover:translate-x-1
                      transition-all
                    "
                  />

                </div>


                <h4 className="font-bold text-lg mt-5 text-gray-900">
                  {feature.title}
                </h4>


                <p className="text-sm text-gray-500 leading-6 mt-2">
                  {feature.description}
                </p>


                <div
                  className="
                    inline-flex
                    items-center
                    gap-2
                    mt-5
                    text-sm
                    font-semibold
                    text-gray-700
                    group-hover:text-yellow-600
                    transition
                  "
                >
                  {feature.linkText}

                  <ArrowRight size={15} />

                </div>

              </Link>
            );

          })}

        </div>

      </div>

    </section>
  );
}