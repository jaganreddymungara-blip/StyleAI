import { useState } from "react";
import {
  ChevronDown,
  Sparkles,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const faqs = [
  {
    question: "Is StyleAI free to use?",
    answer:
      "Yes. You can create an account and build your wardrobe for free. StyleAI is designed to make smart personal styling accessible, with premium AI capabilities that can be introduced later.",
  },
  {
    question: "How does StyleAI recommend outfits?",
    answer:
      "StyleAI looks at the clothes in your digital wardrobe along with colors, clothing categories, seasons, occasions, and your personal style preferences to create outfit combinations that make sense together.",
  },
  {
    question: "Can I upload my entire wardrobe?",
    answer:
      "Yes. You can build your digital wardrobe with shirts, pants, shoes, jackets, accessories, and other clothing items. The more complete your wardrobe is, the more useful your outfit suggestions can become.",
  },
  {
    question: "Will my wardrobe remain private?",
    answer:
      "Your wardrobe is associated with your StyleAI account and is intended to remain private. Your uploaded clothing items are used to provide your personalized styling experience.",
  },
  {
    question: "Does StyleAI work on mobile devices?",
    answer:
      "Yes. StyleAI is designed to work across phones, tablets, and desktop screens, so you can access your wardrobe and styling experience wherever you are.",
  },
  {
    question: "Can StyleAI suggest outfits for different occasions?",
    answer:
      "Yes. StyleAI can help you think through outfits for situations such as college, work, parties, casual days, travel, and other occasions based on the clothes available in your wardrobe.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(0);
  const navigate = useNavigate();

  const toggleFAQ = (index) => {
    setOpen((current) => (current === index ? -1 : index));
  };

  return (
    <section
      id="faq"
      className="relative py-32 bg-white overflow-hidden scroll-mt-24"
    >
      {/* ================================================= */}
      {/* BACKGROUND DECORATION */}
      {/* ================================================= */}

      <div className="absolute top-20 right-0 w-80 h-80 bg-yellow-200/20 rounded-full blur-[130px]" />

      <div className="absolute bottom-0 left-0 w-72 h-72 bg-orange-200/15 rounded-full blur-[130px]" />

      <div className="relative max-w-5xl mx-auto px-8">

        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 px-5 py-2 rounded-full font-semibold">
            <MessageCircle size={16} />
            FAQ
          </span>

          <h2 className="text-5xl lg:text-6xl font-black mt-8 leading-tight">
            Questions?
            <br />
            <span className="text-yellow-500">
              We’ve Got Answers.
            </span>
          </h2>

          <p className="text-gray-500 mt-7 text-lg leading-8 max-w-2xl mx-auto">
            Everything you need to know about StyleAI, your digital wardrobe,
            and how your personal AI stylist works.
          </p>
        </motion.div>

        {/* ================================================= */}
        {/* FAQ LIST */}
        {/* ================================================= */}

        <div className="mt-16 space-y-4">

          {faqs.map((faq, index) => {
            const isOpen = open === index;

            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.06,
                }}
                className={`
                  group
                  overflow-hidden
                  rounded-3xl
                  border
                  transition-all
                  duration-300
                  ${
                    isOpen
                      ? "border-yellow-300 bg-yellow-50/40 shadow-lg"
                      : "border-gray-100 bg-gray-50 hover:border-gray-200 hover:bg-white hover:shadow-md"
                  }
                `}
              >

                {/* Question */}

                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-6 p-6 lg:p-7 text-left"
                >

                  <div className="flex items-center gap-5">

                    <span
                      className={`
                        hidden sm:flex
                        w-10
                        h-10
                        rounded-xl
                        items-center
                        justify-center
                        text-sm
                        font-black
                        shrink-0
                        transition
                        ${
                          isOpen
                            ? "bg-yellow-500 text-black"
                            : "bg-white text-gray-400 group-hover:bg-yellow-100 group-hover:text-yellow-700"
                        }
                      `}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="text-lg lg:text-xl font-bold">
                      {faq.question}
                    </span>

                  </div>

                  <span
                    className={`
                      w-10
                      h-10
                      rounded-full
                      flex
                      items-center
                      justify-center
                      shrink-0
                      transition-all
                      duration-300
                      ${
                        isOpen
                          ? "bg-black text-yellow-400"
                          : "bg-white text-gray-500 group-hover:bg-yellow-100 group-hover:text-yellow-700"
                      }
                    `}
                  >
                    <ChevronDown
                      size={20}
                      className={`transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </span>

                </button>

                {/* Answer */}

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{
                        height: 0,
                        opacity: 0,
                      }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                      }}
                      transition={{
                        duration: 0.3,
                        ease: "easeInOut",
                      }}
                    >
                      <div className="px-6 lg:px-7 pb-7 sm:pl-[5.5rem] lg:pl-[5.5rem]">

                        <div className="h-px bg-yellow-200/60 mb-6" />

                        <p className="text-gray-600 leading-8 max-w-3xl">
                          {faq.answer}
                        </p>

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.div>
            );
          })}

        </div>

        {/* ================================================= */}
        {/* BOTTOM CTA */}
        {/* ================================================= */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="
            mt-20
            rounded-[32px]
            bg-black
            text-white
            p-8
            lg:p-10
            flex
            flex-col
            md:flex-row
            items-center
            justify-between
            gap-8
          "
        >

          <div className="flex items-start gap-5">

            <div className="w-12 h-12 rounded-2xl bg-yellow-500 text-black flex items-center justify-center shrink-0">
              <Sparkles size={22} />
            </div>

            <div>

              <h3 className="text-2xl font-black">
                Ready to dress smarter?
              </h3>

              <p className="text-gray-400 mt-2">
                Build your wardrobe and let StyleAI handle the outfit ideas.
              </p>

            </div>

          </div>

          <button
            onClick={() => navigate("/register")}
            className="
              shrink-0
              flex
              items-center
              gap-3
              bg-yellow-500
              text-black
              px-7
              py-4
              rounded-full
              font-bold
              hover:bg-yellow-400
              hover:gap-4
              transition-all
            "
          >
            Get Started
            <ArrowRight size={19} />
          </button>

        </motion.div>

      </div>
    </section>
  );
}
