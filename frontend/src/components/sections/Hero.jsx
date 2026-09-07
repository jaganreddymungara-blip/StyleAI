import {
  ArrowRight,
  Sparkles,
  Check,
  Shirt,
  Footprints,
  Watch,
  BrainCircuit,
  Palette,
  CloudSun,
  Wand2,
} from "lucide-react";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import heroBg from "../../assets/images/herobg.png";

const fadeLeft = {
  hidden: {
    opacity: 0,
    x: -25,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const fadeRight = {
  hidden: {
    opacity: 0,
    x: 25,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      delay: 0.1,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const itemAnimation = {
  hidden: {
    opacity: 0,
    y: 8,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.28,
      ease: "easeOut",
    },
  },
};

export default function Hero() {
  const navigate = useNavigate();

  const scrollToDemo = () => {
    document.getElementById("demo")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const outfitItems = [
    {
      icon: Shirt,
      name: "Black Oversized Tee",
      category: "Top",
    },
    {
      icon: Shirt,
      name: "Blue Slim Jeans",
      category: "Bottom",
    },
    {
      icon: Footprints,
      name: "White Sneakers",
      category: "Shoes",
    },
    {
      icon: Watch,
      name: "Silver Watch",
      category: "Accessory",
    },
  ];

  const insights = [
    {
      icon: Palette,
      title: "Color harmony",
      description: "Balanced neutral tones",
    },
    {
      icon: CloudSun,
      title: "Season ready",
      description: "Perfect for summer",
    },
    {
      icon: Wand2,
      title: "Style match",
      description: "Smart casual",
    },
  ];

  return (
    <section
      id="home"
      className="
        relative
        min-h-screen
        overflow-hidden
        flex
        items-center
        bg-[#faf9f6]
        pt-24
      "
    >
      {/* ========================================================= */}
      {/* BACKGROUND */}
      {/* ========================================================= */}

      <div
        className="
          absolute
          inset-0
          bg-cover
          bg-center
          bg-no-repeat
          scale-[1.02]
        "
        style={{
          backgroundImage: `url(${heroBg})`,
        }}
      />

      <div className="absolute inset-0 bg-white/82" />

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-r
          from-white
          via-white/90
          to-white/65
        "
      />

      <div
        className="
          absolute
          inset-x-0
          bottom-0
          h-40
          bg-gradient-to-t
          from-[#faf9f6]
          to-transparent
        "
      />

      {/* ========================================================= */}
      {/* LIGHT — CHEAPER THAN LARGE BLURRING */}
      {/* ========================================================= */}

      <div
        className="
          absolute
          top-[-180px]
          left-[15%]
          w-[420px]
          h-[420px]
          rounded-full
          bg-yellow-200/20
          blur-[80px]
          pointer-events-none
        "
      />

      <div
        className="
          absolute
          bottom-[-180px]
          right-[10%]
          w-[400px]
          h-[400px]
          rounded-full
          bg-orange-200/15
          blur-[90px]
          pointer-events-none
        "
      />

      {/* ========================================================= */}
      {/* CONTENT */}
      {/* ========================================================= */}

      <div
        className="
          relative
          z-10
          w-full
          max-w-7xl
          mx-auto
          px-6
          lg:px-8
          py-16
          lg:py-20
        "
      >
        <div
          className="
            grid
            lg:grid-cols-[1.02fr_0.98fr]
            gap-14
            xl:gap-20
            items-center
          "
        >
          {/* ===================================================== */}
          {/* LEFT */}
          {/* ===================================================== */}

          <motion.div
            variants={fadeLeft}
            initial="hidden"
            animate="visible"
            className="max-w-2xl"
          >
            {/* Badge */}

            <motion.div
              initial={{
                opacity: 0,
                y: 8,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.4,
                delay: 0.1,
                ease: "easeOut",
              }}
              className="
                inline-flex
                items-center
                gap-2.5
                px-4
                py-2
                rounded-full
                bg-white/90
                border
                border-yellow-200
                shadow-sm
                text-yellow-700
                text-sm
                font-semibold
              "
            >
              <span
                className="
                  flex
                  items-center
                  justify-center
                  w-6
                  h-6
                  rounded-full
                  bg-yellow-100
                "
              >
                <Sparkles size={13} />
              </span>

              AI-Powered Personal Stylist

              <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
            </motion.div>

            {/* Heading */}

            <motion.h1
              initial={{
                opacity: 0,
                y: 18,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.55,
                delay: 0.18,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                mt-8
                text-5xl
                sm:text-6xl
                lg:text-6xl
                xl:text-[74px]
                font-black
                tracking-[-0.04em]
                leading-[0.98]
                text-gray-950
              "
            >
              Dress Smarter.

              <br />

              <span className="relative inline-block text-yellow-500">
                Look Better.

                <span
                  className="
                    absolute
                    -bottom-1
                    left-0
                    w-16
                    h-1
                    rounded-full
                    bg-yellow-400/60
                  "
                />
              </span>
            </motion.h1>

            {/* Description */}

            <motion.p
              initial={{
                opacity: 0,
                y: 12,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.5,
                delay: 0.28,
                ease: "easeOut",
              }}
              className="
                mt-7
                text-lg
                sm:text-xl
                text-gray-600
                max-w-xl
                leading-8
              "
            >
              Your clothes already have more potential than you think.
              StyleAI uses your wardrobe, personal style, and context to
              create outfits that feel made for you.
            </motion.p>

            {/* Buttons */}

            <motion.div
              initial={{
                opacity: 0,
                y: 12,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.5,
                delay: 0.38,
                ease: "easeOut",
              }}
              className="flex flex-col sm:flex-row gap-4 mt-9"
            >
              <motion.button
                whileHover={{
                  y: -2,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                onClick={() => navigate("/register")}
                className="
                  group
                  bg-black
                  text-white
                  px-7
                  py-4
                  rounded-full
                  text-base
                  font-bold
                  flex
                  items-center
                  justify-center
                  gap-3
                  shadow-[0_12px_30px_rgba(0,0,0,0.16)]
                  hover:bg-yellow-500
                  hover:text-black
                  transition-colors
                  duration-300
                  will-change-transform
                "
              >
                Build My Style

                <ArrowRight
                  size={19}
                  className="
                    group-hover:translate-x-1
                    transition-transform
                    duration-200
                  "
                />
              </motion.button>

              <motion.button
                whileHover={{
                  y: -2,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                onClick={scrollToDemo}
                className="
                  group
                  px-7
                  py-4
                  rounded-full
                  text-base
                  font-bold
                  border
                  border-gray-300
                  bg-white/80
                  hover:bg-white
                  hover:border-gray-500
                  transition-colors
                  duration-300
                  will-change-transform
                "
              >
                <span className="flex items-center gap-2">
                  See AI Demo

                  <span
                    className="
                      w-1.5
                      h-1.5
                      rounded-full
                      bg-yellow-500
                    "
                  />
                </span>
              </motion.button>
            </motion.div>

            {/* Trust */}

            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 0.5,
                delay: 0.48,
              }}
              className="
                flex
                items-center
                gap-3
                mt-7
                text-sm
                text-gray-500
              "
            >
              <div
                className="
                  flex
                  items-center
                  justify-center
                  w-8
                  h-8
                  rounded-full
                  bg-black
                  text-yellow-400
                "
              >
                <Sparkles size={14} />
              </div>

              <span>
                Personalized from the clothes you already own.
              </span>
            </motion.div>

            {/* Feature line */}

            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 0.5,
                delay: 0.55,
              }}
              className="
                flex
                flex-wrap
                items-center
                gap-x-6
                gap-y-3
                mt-9
                pt-7
                border-t
                border-gray-200/80
              "
            >
              {[
                "Body shape",
                "Skin tone",
                "Occasion",
                "Weather",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2"
                >
                  <Check
                    size={14}
                    className="text-yellow-600"
                  />

                  <span className="text-sm font-semibold text-gray-600">
                    {item}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ===================================================== */}
          {/* RIGHT */}
          {/* ===================================================== */}

          <motion.div
            variants={fadeRight}
            initial="hidden"
            animate="visible"
            className="relative"
          >
            {/* Ambient light */}

            <div
              className="
                absolute
                -top-12
                -left-10
                w-56
                h-56
                rounded-full
                bg-yellow-200/25
                blur-[70px]
                pointer-events-none
              "
            />

            {/* Floating AI badge */}

            <motion.div
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                absolute
                -top-5
                right-2
                sm:-right-6
                z-30
                flex
                items-center
                gap-2
                px-4
                py-2.5
                rounded-full
                bg-black
                text-white
                shadow-xl
                text-sm
                font-bold
                will-change-transform
              "
            >
              <span className="w-2 h-2 rounded-full bg-yellow-400" />

              <BrainCircuit
                size={16}
                className="text-yellow-400"
              />

              AI Matched
            </motion.div>

            {/* =================================================== */}
            {/* MAIN CARD */}
            {/* =================================================== */}

            <div
              className="
                relative
                bg-white
                rounded-[32px]
                border
                border-gray-100
                shadow-[0_25px_70px_rgba(0,0,0,0.12)]
                p-5
                sm:p-7
              "
            >
              {/* Inner border */}

              <div
                className="
                  absolute
                  inset-2
                  rounded-[28px]
                  border
                  border-gray-100/80
                  pointer-events-none
                "
              />

              <div className="relative">
                {/* Header */}

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <div
                        className="
                          w-10
                          h-10
                          rounded-2xl
                          bg-yellow-100
                          text-yellow-600
                          flex
                          items-center
                          justify-center
                        "
                      >
                        <Sparkles size={19} />
                      </div>

                      <div>
                        <p
                          className="
                            text-[10px]
                            uppercase
                            tracking-[0.18em]
                            text-gray-400
                            font-black
                          "
                        >
                          StyleAI
                        </p>

                        <p className="text-sm font-bold">
                          Personal Stylist
                        </p>
                      </div>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-black mt-5 tracking-tight">
                      Today&apos;s recommendation
                    </h2>

                    <p className="text-sm text-gray-400 mt-1">
                      Casual · Summer · College
                    </p>
                  </div>

                  {/* Match */}

                  <div className="shrink-0">
                    <div
                      className="
                        w-16
                        h-16
                        rounded-2xl
                        bg-gray-950
                        flex
                        items-center
                        justify-center
                        shadow-lg
                      "
                    >
                      <div className="text-center">
                        <p className="text-yellow-400 text-lg font-black leading-none">
                          98%
                        </p>

                        <p className="text-[8px] text-gray-400 font-bold mt-1 tracking-widest">
                          MATCH
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Context */}

                <div className="flex flex-wrap gap-2 mt-6">
                  {[
                    "Your wardrobe",
                    "Summer",
                    "Smart casual",
                  ].map((item) => (
                    <span
                      key={item}
                      className="
                        px-3
                        py-1.5
                        rounded-full
                        bg-gray-50
                        border
                        border-gray-100
                        text-xs
                        text-gray-500
                        font-semibold
                      "
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="h-px bg-gray-100 mt-6" />

                {/* Outfit heading */}

                <div className="flex items-center justify-between mt-6 mb-3">
                  <div>
                    <p
                      className="
                        text-[10px]
                        uppercase
                        tracking-[0.16em]
                        text-gray-400
                        font-black
                      "
                    >
                      Selected from your closet
                    </p>

                    <p className="text-lg font-black mt-1">
                      Complete outfit
                    </p>
                  </div>

                  <div
                    className="
                      w-9
                      h-9
                      rounded-xl
                      bg-yellow-50
                      text-yellow-600
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <Wand2 size={17} />
                  </div>
                </div>

                {/* Outfit */}

                <motion.div
                  initial="hidden"
                  animate="visible"
                  className="space-y-2"
                >
                  {outfitItems.map((item, index) => {
                    const Icon = item.icon;

                    return (
                      <motion.div
                        key={item.name}
                        variants={itemAnimation}
                        transition={{
                          delay: 0.45 + index * 0.055,
                        }}
                        className="
                          group
                          flex
                          items-center
                          gap-3
                          p-3
                          rounded-2xl
                          bg-gray-50
                          border
                          border-gray-100
                          hover:bg-yellow-50/50
                          hover:border-yellow-200
                          transition-colors
                          duration-200
                        "
                      >
                        <div
                          className="
                            w-10
                            h-10
                            rounded-xl
                            bg-white
                            border
                            border-gray-100
                            flex
                            items-center
                            justify-center
                            shrink-0
                          "
                        >
                          <Icon
                            size={18}
                            className="text-gray-700"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold truncate">
                            {item.name}
                          </p>

                          <p className="text-[11px] text-gray-400 mt-0.5">
                            {item.category}
                          </p>
                        </div>

                        <div
                          className="
                            w-7
                            h-7
                            rounded-full
                            bg-green-50
                            border
                            border-green-100
                            flex
                            items-center
                            justify-center
                            shrink-0
                          "
                        >
                          <Check
                            size={14}
                            className="text-green-600"
                          />
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>

                {/* AI reasoning */}

                <div
                  className="
                    mt-5
                    rounded-2xl
                    bg-gradient-to-br
                    from-yellow-50
                    to-orange-50
                    border
                    border-yellow-100
                    p-5
                  "
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <BrainCircuit
                        size={17}
                        className="text-yellow-600"
                      />

                      <p className="text-sm font-black">
                        Why this outfit works
                      </p>
                    </div>

                    <span
                      className="
                        text-[9px]
                        uppercase
                        tracking-widest
                        font-black
                        text-yellow-700
                        bg-yellow-100
                        px-2.5
                        py-1
                        rounded-full
                      "
                    >
                      AI Insight
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2.5 mt-4">
                    {insights.map((insight) => {
                      const Icon = insight.icon;

                      return (
                        <div
                          key={insight.title}
                          className="
                            bg-white/80
                            rounded-xl
                            p-3
                            border
                            border-yellow-100
                          "
                        >
                          <Icon
                            size={15}
                            className="text-yellow-600"
                          />

                          <p className="text-[11px] font-bold mt-2">
                            {insight.title}
                          </p>

                          <p className="text-[9px] text-gray-400 mt-1 leading-4">
                            {insight.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Footer */}

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    mt-5
                    pt-4
                    border-t
                    border-gray-100
                  "
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500" />

                    <p className="text-[11px] text-gray-400">
                      Ready to wear
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Sparkles
                      size={12}
                      className="text-yellow-500"
                    />

                    <span className="text-[11px] font-bold text-gray-600">
                      Styled by AI
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* =================================================== */}
            {/* FLOATING STATUS CARD */}
            {/* =================================================== */}

            <motion.div
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.45,
                delay: 0.8,
                ease: "easeOut",
              }}
              className="
                absolute
                -bottom-6
                -left-3
                sm:-left-8
                z-20
                bg-white
                rounded-2xl
                border
                border-gray-100
                shadow-[0_12px_35px_rgba(0,0,0,0.10)]
                px-4
                py-3
                flex
                items-center
                gap-3
              "
            >
              <div
                className="
                  w-9
                  h-9
                  rounded-xl
                  bg-green-50
                  flex
                  items-center
                  justify-center
                "
              >
                <Check
                  size={17}
                  className="text-green-600"
                />
              </div>

              <div>
                <p className="text-[10px] text-gray-400">
                  AI recommendation
                </p>

                <p className="text-sm font-black">
                  Outfit ready
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}