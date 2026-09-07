import { Shirt, Sparkles } from "lucide-react";

export default function WardrobeHeader() {
  return (
    <section className="relative overflow-hidden bg-black rounded-[30px] px-8 py-9 lg:px-10 lg:py-10 shadow-sm">

      {/* Subtle background glow */}

      <div
        className="
          absolute
          -top-24
          right-10
          w-64
          h-64
          rounded-full
          bg-yellow-500/10
          blur-3xl
          pointer-events-none
        "
      />

      <div
        className="
          absolute
          -bottom-32
          left-1/3
          w-72
          h-72
          rounded-full
          bg-white/[0.03]
          blur-3xl
          pointer-events-none
        "
      />


      <div className="relative flex flex-col sm:flex-row sm:items-center gap-6">

        {/* ================================================= */}
        {/* ICON */}
        {/* ================================================= */}

        <div
          className="
            w-16
            h-16
            lg:w-18
            lg:h-18
            rounded-[22px]
            bg-yellow-500
            flex
            items-center
            justify-center
            shrink-0
            shadow-lg
            shadow-yellow-500/10
          "
        >
          <Shirt
            size={32}
            className="text-black"
            strokeWidth={2}
          />
        </div>


        {/* ================================================= */}
        {/* TEXT */}
        {/* ================================================= */}

        <div>

          <div
            className="
              flex
              items-center
              gap-2
              text-yellow-400
              text-xs
              font-bold
              uppercase
              tracking-[0.18em]
            "
          >

            <Sparkles size={14} />

            Your wardrobe

          </div>


          <h1
            className="
              text-3xl
              lg:text-4xl
              font-black
              text-white
              tracking-tight
              mt-2
            "
          >
            My Wardrobe
          </h1>


          <p
            className="
              text-gray-400
              mt-2
              text-sm
              lg:text-base
              leading-6
              max-w-xl
            "
          >
            Everything you wear, organized in one place and
            ready for your next look.
          </p>

        </div>

      </div>

    </section>
  );
}