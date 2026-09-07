import { motion } from "framer-motion";
import {
  Sparkles,
  Shirt,
  Palette,
  ArrowUpRight,
} from "lucide-react";

import fashionImage from "../../assets/images/login-fashion.jpg";

const highlights = [
  {
    icon: Sparkles,
    text: "Personalized AI outfit recommendations",
  },
  {
    icon: Shirt,
    text: "50,000+ possible outfit combinations",
  },
  {
    icon: Palette,
    text: "Color and style analysis made for you",
  },
];

export default function AuthImage() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.03 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      className="
        hidden
        lg:block
        relative
        min-h-screen
        overflow-hidden
        bg-black
      "
    >

      {/* ================================================= */}
      {/* BACKGROUND IMAGE */}
      {/* ================================================= */}

      <img
        src={fashionImage}
        alt="StyleAI fashion"
        className="
          absolute
          inset-0
          w-full
          h-full
          object-cover
          scale-[1.02]
        "
      />


      {/* Dark overlay */}

      <div className="absolute inset-0 bg-black/35" />


      {/* Editorial gradient */}

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-br
          from-black/75
          via-black/20
          to-black/80
        "
      />


      {/* Bottom fade */}

      <div
        className="
          absolute
          inset-x-0
          bottom-0
          h-1/2
          bg-gradient-to-t
          from-black/80
          to-transparent
        "
      />


      {/* ================================================= */}
      {/* DECORATIVE GLOW */}
      {/* ================================================= */}

      <div
        className="
          absolute
          -top-32
          -right-32
          w-96
          h-96
          bg-yellow-400/20
          blur-[120px]
          rounded-full
        "
      />


      {/* ================================================= */}
      {/* CONTENT */}
      {/* ================================================= */}

      <div
        className="
          relative
          z-10
          min-h-screen
          flex
          flex-col
          justify-between
          px-12
          xl:px-16
          py-12
        "
      >

        {/* ================================================= */}
        {/* TOP BRAND */}
        {/* ================================================= */}

        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex items-center justify-between"
        >

          <div className="flex items-center gap-3">

            <div
              className="
                w-11
                h-11
                rounded-2xl
                bg-yellow-500
                flex
                items-center
                justify-center
              "
            >
              <Sparkles
                size={21}
                className="text-black"
              />
            </div>

            <div>

              <h2 className="text-2xl font-black text-white">
                Style<span className="text-yellow-400">AI</span>
              </h2>

              <p className="text-white/50 text-xs">
                Your AI Stylist
              </p>

            </div>

          </div>


          <div
            className="
              hidden
              xl:flex
              items-center
              gap-2
              px-4
              py-2
              rounded-full
              bg-white/10
              border
              border-white/10
              backdrop-blur-md
              text-white/80
              text-xs
              font-semibold
            "
          >
            <Sparkles
              size={13}
              className="text-yellow-400"
            />

            AI Powered
          </div>

        </motion.div>


        {/* ================================================= */}
        {/* CENTER CONTENT */}
        {/* ================================================= */}

        <div className="max-w-2xl">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.35,
              duration: 0.7,
            }}
            className="
              inline-flex
              items-center
              gap-2
              px-4
              py-2
              rounded-full
              bg-white/10
              border
              border-white/15
              backdrop-blur-xl
              text-white
              text-sm
              font-semibold
            "
          >

            <Sparkles
              size={15}
              className="text-yellow-400"
            />

            Your wardrobe, intelligently styled

          </motion.div>


          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.45,
              duration: 0.7,
            }}
            className="
              text-5xl
              xl:text-7xl
              font-black
              text-white
              leading-[1.05]
              tracking-tight
              mt-7
            "
          >

            Dress smarter.

            <br />

            <span className="text-yellow-400">
              Look better.
            </span>

          </motion.h1>


          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.55,
              duration: 0.7,
            }}
            className="
              text-white/75
              text-lg
              xl:text-xl
              mt-7
              max-w-xl
              leading-8
            "
          >
            StyleAI turns the clothes you already own into
            personalized outfits based on your style,
            colors, body shape, season, and occasion.
          </motion.p>


          {/* ================================================= */}
          {/* HIGHLIGHTS */}
          {/* ================================================= */}

          <div className="mt-10 space-y-3">

            {highlights.map((item, index) => {

              const Icon = item.icon;

              return (
                <motion.div
                  key={item.text}
                  initial={{
                    opacity: 0,
                    x: -20,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    delay: 0.7 + index * 0.12,
                    duration: 0.5,
                  }}
                  className="
                    group
                    flex
                    items-center
                    gap-4
                    w-fit
                    min-w-[320px]
                    px-5
                    py-4
                    rounded-2xl
                    bg-white/10
                    border
                    border-white/10
                    backdrop-blur-xl
                    text-white
                    hover:bg-white/15
                    hover:border-yellow-400/30
                    transition-all
                    duration-300
                  "
                >

                  <div
                    className="
                      w-10
                      h-10
                      rounded-xl
                      bg-yellow-500/15
                      flex
                      items-center
                      justify-center
                      shrink-0
                    "
                  >
                    <Icon
                      size={19}
                      className="text-yellow-400"
                    />
                  </div>


                  <span className="text-sm xl:text-base font-medium">
                    {item.text}
                  </span>

                </motion.div>
              );
            })}

          </div>

        </div>


        {/* ================================================= */}
        {/* BOTTOM */}
        {/* ================================================= */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 1,
            duration: 0.7,
          }}
          className="
            flex
            items-center
            justify-between
            gap-6
          "
        >

          <div>

            <p className="text-white/40 text-xs uppercase tracking-[3px]">
              Personal styling
            </p>

            <p className="text-white/70 text-sm mt-2">
              Powered by your wardrobe
            </p>

          </div>


          <div
            className="
              w-11
              h-11
              rounded-full
              border
              border-white/20
              bg-white/10
              backdrop-blur-md
              flex
              items-center
              justify-center
              text-white/70
            "
          >
            <ArrowUpRight size={18} />
          </div>

        </motion.div>

      </div>

    </motion.div>
  );
}