import {
  Sparkles,
  Shirt,
  Palette,
  CloudSun,
  ScanSearch,
  Wand2,
  ArrowUpRight,
} from "lucide-react";

import { motion } from "framer-motion";

const features = [
  {
    number: "01",
    icon: Sparkles,
    title: "AI Outfit Recommendations",
    description:
      "Receive complete outfit suggestions tailored to your wardrobe, occasion, personal style, and preferences.",
    tag: "Smart styling",
  },
  {
    number: "02",
    icon: Shirt,
    title: "Smart Wardrobe",
    description:
      "Upload and organize your shirts, pants, shoes, jackets, and accessories in one beautiful digital wardrobe.",
    tag: "Your closet",
  },
  {
    number: "03",
    icon: Palette,
    title: "Color Matching",
    description:
      "Discover combinations with balanced colors, complementary tones, and outfits that work naturally together.",
    tag: "Better combinations",
  },
  {
    number: "04",
    icon: CloudSun,
    title: "Season Aware",
    description:
      "Get recommendations that adapt to different seasons, weather conditions, and the type of occasion.",
    tag: "Weather ready",
  },
  {
    number: "05",
    icon: ScanSearch,
    title: "Style Analysis",
    description:
      "Understand your wardrobe, favorite colors, clothing patterns, and evolving fashion preferences.",
    tag: "Know your style",
  },
  {
    number: "06",
    icon: Wand2,
    title: "Personal AI Stylist",
    description:
      "Get everyday styling guidance that helps you decide what to wear with less effort and more confidence.",
    tag: "Your stylist",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="relative py-32 bg-gray-50 overflow-hidden"
    >
      {/* ================================================= */}
      {/* BACKGROUND DECORATION */}
      {/* ================================================= */}

      <div className="absolute top-0 right-0 w-80 h-80 bg-yellow-200/30 rounded-full blur-[130px]" />

      <div className="absolute bottom-0 left-0 w-72 h-72 bg-orange-200/20 rounded-full blur-[130px]" />

      <div className="relative max-w-7xl mx-auto px-8">
        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 px-5 py-2 rounded-full font-semibold">
            <Sparkles size={16} />
            Features
          </span>

          <h2 className="text-5xl lg:text-6xl font-black mt-8 leading-tight">
            Everything You Need
            <br />
            <span className="text-yellow-500">To Dress Better</span>
          </h2>

          <p className="text-gray-500 mt-7 max-w-2xl mx-auto text-lg leading-8">
            StyleAI combines intelligent outfit recommendations, wardrobe
            organization, and personalized styling into one simple experience.
          </p>
        </motion.div>

        {/* ================================================= */}
        {/* FEATURE GRID */}
        {/* ================================================= */}

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-7 mt-20">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.number}
                initial={{
                  opacity: 0,
                  y: 45,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  margin: "-80px",
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                }}
                whileHover={{
                  y: -8,
                }}
                className="
                  group
                  relative
                  bg-white
                  rounded-[30px]
                  p-8
                  border
                  border-gray-100
                  shadow-lg
                  hover:shadow-2xl
                  transition-shadow
                  duration-300
                  overflow-hidden
                "
              >
                {/* Gold accent */}

                <div
                  className="
                    absolute
                    top-0
                    left-0
                    w-full
                    h-1
                    bg-gradient-to-r
                    from-yellow-400
                    to-yellow-200
                  "
                />

                {/* ================================================= */}
                {/* TOP ROW */}
                {/* ================================================= */}

                <div className="flex items-start justify-between">
                  <div
                    className="
                      w-16
                      h-16
                      rounded-2xl
                      bg-yellow-100
                      text-yellow-600
                      flex
                      items-center
                      justify-center
                      transition-all
                      duration-300
                      group-hover:bg-yellow-500
                      group-hover:text-black
                      group-hover:scale-105
                    "
                  >
                    <Icon size={30} />
                  </div>

                  <span
                    className="
                    text-5xl
                    font-black
                    text-gray-100
                    group-hover:text-yellow-100
                    transition-colors
                    duration-300
                  "
                  >
                    {feature.number}
                  </span>
                </div>

                {/* ================================================= */}
                {/* TAG */}
                {/* ================================================= */}

                <span
                  className="
                  inline-block
                  mt-7
                  px-3
                  py-1.5
                  rounded-full
                  bg-gray-100
                  text-gray-500
                  text-xs
                  font-bold
                  uppercase
                  tracking-widest
                  group-hover:bg-yellow-50
                  group-hover:text-yellow-700
                  transition
                "
                >
                  {feature.tag}
                </span>

                {/* ================================================= */}
                {/* TITLE */}
                {/* ================================================= */}

                <h3
                  className="
                  text-2xl
                  font-black
                  mt-5
                  leading-tight
                "
                >
                  {feature.title}
                </h3>

                {/* ================================================= */}
                {/* DESCRIPTION */}
                {/* ================================================= */}

                <p
                  className="
                  text-gray-500
                  mt-4
                  leading-7
                "
                >
                  {feature.description}
                </p>

                {/* ================================================= */}
                {/* BOTTOM */}
                {/* ================================================= */}

                <div
                  className="
                  flex
                  items-center
                  justify-between
                  mt-8
                  pt-6
                  border-t
                  border-gray-100
                "
                >
                  <span
                    className="
                    text-sm
                    font-semibold
                    text-gray-400
                    group-hover:text-black
                    transition
                  "
                  >
                    StyleAI feature
                  </span>

                  <div
                    className="
                    w-9
                    h-9
                    rounded-full
                    bg-gray-100
                    flex
                    items-center
                    justify-center
                    group-hover:bg-black
                    group-hover:text-yellow-400
                    transition-all
                    duration-300
                  "
                  >
                    <ArrowUpRight
                      size={17}
                      className="
                        group-hover:translate-x-0.5
                        group-hover:-translate-y-0.5
                        transition-transform
                      "
                    />
                  </div>
                </div>

                {/* Hover glow */}
                {/* FIXED: Added the closing double quote at the end of pointer-events-none */}
                <div
                  className="
                  absolute
                  -bottom-20
                  -right-20
                  w-44
                  h-44
                  rounded-full
                  bg-yellow-200/20
                  blur-3xl
                  opacity-0
                  group-hover:opacity-100
                  transition-opacity
                  duration-500
                  pointer-events-none"
                />
              </motion.div>
            );
          })}
        </div>

        {/* ================================================= */}
        {/* BOTTOM MESSAGE */}
        {/* ================================================= */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 text-center"
        >
          <p className="text-gray-500">
            One wardrobe. Smarter combinations. Less guesswork.
          </p>

          <div className="flex justify-center items-center gap-2 mt-3 font-bold">
            <span>That’s the StyleAI difference.</span>

            <Sparkles size={18} className="text-yellow-500" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}