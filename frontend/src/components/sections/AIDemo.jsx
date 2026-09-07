import { motion } from "framer-motion";
import {
  Sparkles,
  Shirt,
  Footprints,
  Watch,
  BrainCircuit,
  CheckCircle2,
  ArrowRight,
  Wand2,
} from "lucide-react";

const outfitItems = [
  {
    icon: Shirt,
    name: "Black Oversized Tee",
    category: "Top",
    color: "text-yellow-500",
  },
  {
    icon: Shirt,
    name: "Blue Slim Jeans",
    category: "Bottom",
    color: "text-blue-500",
  },
  {
    icon: Footprints,
    name: "White Sneakers",
    category: "Footwear",
    color: "text-gray-600",
  },
  {
    icon: Watch,
    name: "Silver Watch",
    category: "Accessory",
    color: "text-gray-500",
  },
];

const reasons = [
  "Excellent color harmony",
  "Perfect for summer weather",
  "Comfortable for college",
  "Smart casual appearance",
];

export default function AIDemo() {
  return (
    <section
      id="demo"
      className="relative overflow-hidden py-32 bg-gradient-to-b from-gray-50 via-white to-gray-50"
    >
      {/* Background decoration */}

      <div className="absolute -top-40 -left-40 w-96 h-96 bg-yellow-200/30 rounded-full blur-[120px]" />

      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-yellow-300/20 rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-8">

        {/* Section heading */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 px-5 py-2 rounded-full font-semibold">
            <Sparkles size={17} />
            AI Demo
          </div>

          <h2 className="text-5xl lg:text-6xl font-black mt-8 leading-tight">
            See Your AI Stylist
            <br />
            <span className="text-yellow-500">In Action</span>
          </h2>

          <p className="mt-6 text-lg text-gray-500 leading-8 max-w-2xl mx-auto">
            StyleAI analyzes the clothes you already own and combines them
            into complete outfits based on color, season, occasion and your
            personal style.
          </p>
        </motion.div>

        {/* Main demo */}

        <div className="grid lg:grid-cols-2 gap-20 items-center mt-20">

          {/* LEFT */}

          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {/* AI badge */}

            <div className="inline-flex items-center gap-3 text-sm font-semibold text-gray-500 mb-8">
              <div className="w-9 h-9 rounded-xl bg-black text-white flex items-center justify-center">
                <BrainCircuit size={18} />
              </div>

              <span>
                Your wardrobe.{" "}
                <span className="text-black">
                  Smarter combinations.
                </span>
              </span>
            </div>

            <h3 className="text-4xl lg:text-5xl font-black leading-tight">
              Stop wondering
              <br />
              <span className="text-yellow-500">
                what to wear.
              </span>
            </h3>

            <p className="mt-7 text-gray-600 text-lg leading-8 max-w-xl">
              Instead of searching through your wardrobe every morning,
              StyleAI finds combinations that actually work together.
            </p>

            {/* Benefits */}

            <div className="space-y-6 mt-10">

              <div className="flex gap-4 items-start">

                <div className="w-11 h-11 rounded-xl bg-yellow-100 text-yellow-600 flex items-center justify-center shrink-0">
                  <BrainCircuit size={21} />
                </div>

                <div>
                  <h4 className="font-bold text-lg">
                    Understands your wardrobe
                  </h4>

                  <p className="text-gray-500 mt-1 leading-7">
                    AI analyzes clothing categories, colors, seasons and
                    your personal style preferences.
                  </p>
                </div>

              </div>

              <div className="flex gap-4 items-start">

                <div className="w-11 h-11 rounded-xl bg-yellow-100 text-yellow-600 flex items-center justify-center shrink-0">
                  <Wand2 size={21} />
                </div>

                <div>
                  <h4 className="font-bold text-lg">
                    Creates complete outfits
                  </h4>

                  <p className="text-gray-500 mt-1 leading-7">
                    Get ready-to-wear combinations for college, work,
                    parties, travel and everyday life.
                  </p>
                </div>

              </div>

            </div>

            {/* CTA */}

            <button
              onClick={() => {
                window.location.href = "/register";
              }}
              className="
                mt-10
                inline-flex
                items-center
                gap-3
                bg-black
                text-white
                px-7
                py-4
                rounded-full
                font-semibold
                hover:bg-yellow-500
                hover:text-black
                transition-all
                duration-300
                shadow-lg
                hover:shadow-xl
              "
            >
              Try StyleAI
              <ArrowRight size={19} />
            </button>

          </motion.div>

          {/* RIGHT — AI CARD */}

          <motion.div
            initial={{ opacity: 0, x: 60, scale: 0.96 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >

            {/* Glow */}

            <div className="absolute inset-0 bg-yellow-300/20 blur-[100px] rounded-full" />

            {/* Card */}

            <motion.div
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="
                relative
                bg-white
                rounded-[36px]
                shadow-2xl
                border
                border-gray-100
                p-7
                lg:p-9
              "
            >

              {/* Top bar */}

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-4">

                  <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center">
                    <Sparkles size={22} />
                  </div>

                  <div>

                    <h3 className="text-xl font-bold">
                      AI Recommendation
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      Casual • Summer • College
                    </p>

                  </div>

                </div>

                <div className="flex flex-col items-end">

                  <span className="text-xs text-gray-400 font-medium">
                    MATCH
                  </span>

                  <span className="text-2xl font-black text-green-600">
                    98%
                  </span>

                </div>

              </div>

              {/* Divider */}

              <div className="h-px bg-gray-100 my-7" />

              {/* Outfit */}

              <div>

                <div className="flex items-center justify-between mb-5">

                  <h4 className="font-bold text-lg">
                    Recommended outfit
                  </h4>

                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    4 items
                  </span>

                </div>

                <div className="space-y-3">

                  {outfitItems.map((item, index) => {
                    const Icon = item.icon;

                    return (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.4,
                          delay: index * 0.08,
                        }}
                        className="
                          group
                          flex
                          items-center
                          justify-between
                          p-4
                          rounded-2xl
                          bg-gray-50
                          border
                          border-transparent
                          hover:border-yellow-200
                          hover:bg-yellow-50/40
                          transition-all
                        "
                      >

                        <div className="flex items-center gap-4">

                          <div
                            className={`w-11 h-11 rounded-xl bg-white shadow-sm flex items-center justify-center ${item.color}`}
                          >
                            <Icon size={21} />
                          </div>

                          <div>

                            <p className="font-semibold">
                              {item.name}
                            </p>

                            <p className="text-xs text-gray-400 mt-0.5">
                              {item.category}
                            </p>

                          </div>

                        </div>

                        <CheckCircle2
                          size={21}
                          className="text-green-500"
                        />

                      </motion.div>
                    );
                  })}

                </div>

              </div>

              {/* Why this works */}

              <div className="mt-7 rounded-3xl bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-100 p-6">

                <div className="flex items-center gap-3">

                  <div className="w-9 h-9 rounded-xl bg-yellow-500 text-black flex items-center justify-center">
                    <Sparkles size={18} />
                  </div>

                  <h4 className="font-bold">
                    Why this works
                  </h4>

                </div>

                <div className="grid sm:grid-cols-2 gap-3 mt-5">

                  {reasons.map((reason) => (
                    <div
                      key={reason}
                      className="flex items-center gap-2 text-sm text-gray-600"
                    >
                      <CheckCircle2
                        size={16}
                        className="text-yellow-600 shrink-0"
                      />

                      {reason}
                    </div>
                  ))}

                </div>

              </div>

              {/* AI status */}

              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400">

                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />

                AI stylist analysis complete

              </div>

            </motion.div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
