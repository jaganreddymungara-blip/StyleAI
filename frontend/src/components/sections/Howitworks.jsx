import { motion } from "framer-motion";
import {
  Upload,
  BrainCircuit,
  Sparkles,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Upload Your Wardrobe",
    description:
      "Add your shirts, pants, shoes, jackets, and accessories to build your digital wardrobe.",
    tag: "Your wardrobe",
  },
  {
    number: "02",
    icon: BrainCircuit,
    title: "AI Understands Your Style",
    description:
      "StyleAI analyzes your colors, categories, seasons, occasions, and personal style preferences.",
    tag: "Smart analysis",
  },
  {
    number: "03",
    icon: Sparkles,
    title: "Get Smart Outfit Suggestions",
    description:
      "Receive complete outfit combinations tailored for college, work, parties, travel, and everyday life.",
    tag: "Personalized outfits",
  },
  {
    number: "04",
    icon: CheckCircle,
    title: "Dress With Confidence",
    description:
      "Choose an outfit that fits your personality, occasion, weather, and style — without the guesswork.",
    tag: "Ready to wear",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative py-32 bg-white overflow-hidden"
    >
      {/* Background decoration */}

      <div className="absolute top-20 left-0 w-72 h-72 bg-yellow-200/30 rounded-full blur-[120px]" />

      <div className="absolute bottom-20 right-0 w-80 h-80 bg-orange-200/20 rounded-full blur-[140px]" />

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
            How It Works
          </span>

          <h2 className="text-5xl lg:text-6xl font-black mt-8 leading-tight">
            From Wardrobe
            <br />
            <span className="text-yellow-500">
              To Perfect Outfit
            </span>
          </h2>

          <p className="text-gray-500 mt-7 text-lg leading-8 max-w-2xl mx-auto">
            StyleAI turns the clothes you already own into personalized
            outfit ideas in four simple steps.
          </p>
        </motion.div>


        {/* ================================================= */}
        {/* TIMELINE */}
        {/* ================================================= */}

        <div className="relative mt-24">

          {/* Desktop timeline */}

          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-yellow-300 to-transparent -translate-x-1/2" />

          <div className="space-y-20 lg:space-y-28">

            {steps.map((step, index) => {

              const Icon = step.icon;
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={step.number}
                  initial={{
                    opacity: 0,
                    x: isLeft ? -60 : 60,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{
                    duration: 0.7,
                    ease: "easeOut",
                  }}
                  className="relative"
                >

                  <div
                    className={`flex flex-col lg:flex-row items-center gap-10 ${
                      !isLeft ? "lg:flex-row-reverse" : ""
                    }`}
                  >

                    {/* ================================================= */}
                    {/* CARD */}
                    {/* ================================================= */}

                    <div className="lg:w-[44%] w-full">

                      <motion.div
                        whileHover={{
                          y: -8,
                          boxShadow:
                            "0 25px 60px rgba(0,0,0,0.10)",
                        }}
                        transition={{ duration: 0.25 }}
                        className="
                          group
                          bg-white
                          rounded-[32px]
                          p-8
                          lg:p-9
                          border
                          border-gray-100
                          shadow-lg
                          relative
                          overflow-hidden
                        "
                      >

                        {/* Yellow accent */}

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

                        {/* Top row */}

                        <div className="flex items-center justify-between">

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
                              transition
                              group-hover:bg-yellow-500
                              group-hover:text-black
                            "
                          >
                            <Icon size={30} />
                          </div>

                          <span className="text-5xl font-black text-gray-100">
                            {step.number}
                          </span>

                        </div>


                        {/* Tag */}

                        <span className="inline-block mt-7 text-xs font-bold uppercase tracking-widest text-yellow-600 bg-yellow-50 px-3 py-1.5 rounded-full">
                          {step.tag}
                        </span>


                        {/* Title */}

                        <h3 className="text-3xl font-black mt-4">
                          {step.title}
                        </h3>


                        {/* Description */}

                        <p className="text-gray-500 mt-4 leading-8 text-base">
                          {step.description}
                        </p>


                        {/* Learn more visual */}

                        <div className="flex items-center gap-2 mt-7 text-sm font-semibold text-gray-400 group-hover:text-black transition">

                          <span>
                            Step {step.number}
                          </span>

                          <ArrowRight
                            size={16}
                            className="group-hover:translate-x-1 transition-transform"
                          />

                        </div>

                      </motion.div>

                    </div>


                    {/* ================================================= */}
                    {/* CENTER STEP MARKER */}
                    {/* ================================================= */}

                    <div className="hidden lg:flex w-[12%] justify-center relative z-10">

                      <motion.div
                        whileHover={{
                          scale: 1.12,
                        }}
                        className="
                          w-16
                          h-16
                          rounded-full
                          bg-black
                          text-yellow-400
                          border-4
                          border-white
                          shadow-xl
                          flex
                          items-center
                          justify-center
                          font-black
                          text-sm
                        "
                      >
                        {step.number}
                      </motion.div>

                    </div>


                    {/* ================================================= */}
                    {/* EMPTY SIDE */}
                    {/* ================================================= */}

                    <div className="hidden lg:block lg:w-[44%]" />

                  </div>

                </motion.div>
              );
            })}

          </div>

        </div>


        {/* ================================================= */}
        {/* BOTTOM CTA */}
        {/* ================================================= */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-24 text-center"
        >

          <p className="text-gray-500">
            Your wardrobe is already waiting.
          </p>

          <div className="flex justify-center mt-4">

            <div className="inline-flex items-center gap-2 text-black font-bold">
              Let AI style it for you
              <Sparkles
                size={18}
                className="text-yellow-500"
              />
            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
}

