import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CTA() {
  const navigate = useNavigate();

  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-8">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="
            bg-black
            rounded-[40px]
            px-12
            py-20
            text-center
            relative
            overflow-hidden
          "
        >
          {/* Background Glow */}

          <div className="absolute -top-20 -right-20 w-72 h-72 bg-yellow-500 opacity-20 rounded-full blur-[120px]" />

          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-yellow-400 opacity-20 rounded-full blur-[120px]" />

          <div className="relative z-10">

            <span className="inline-block bg-yellow-500 text-black px-5 py-2 rounded-full font-semibold">
              Join StyleAI Today
            </span>

            <h2 className="text-5xl lg:text-6xl font-black text-white mt-8 leading-tight">
              Ready to Upgrade
              <br />
              Your Style?
            </h2>

            <p className="text-gray-300 text-lg mt-8 max-w-2xl mx-auto leading-8">
              Build your smart wardrobe, receive AI-powered outfit
              recommendations, and never wonder what to wear again.
            </p>

            <div className="flex flex-wrap justify-center gap-5 mt-12">

              <button
                onClick={() => navigate("/register")}
                className="
                  bg-yellow-500
                  text-black
                  px-8
                  py-4
                  rounded-full
                  font-bold
                  text-lg
                  flex
                  items-center
                  gap-3
                  hover:bg-yellow-400
                  transition
                "
              >
                Get Started Free
                <ArrowRight size={20} />
              </button>

              <button
                onClick={() => navigate("/login")}
                className="
                  border
                  border-gray-500
                  text-white
                  px-8
                  py-4
                  rounded-full
                  font-semibold
                  hover:bg-white
                  hover:text-black
                  transition
                "
              >
                Login
              </button>

            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
}