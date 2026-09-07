import { motion } from "framer-motion";

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-[#faf8f5]">

      {/* LEFT SIDE */}

      <div className="flex items-center justify-center px-8 py-16">

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          {children}
        </motion.div>

      </div>

      {/* RIGHT SIDE */}

      <div className="hidden lg:flex relative overflow-hidden">

        <img
          src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1200"
          alt="Fashion"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10 flex flex-col justify-end p-16 text-white">

          <span className="bg-white/20 backdrop-blur-md w-fit px-4 py-2 rounded-full text-sm">
            StyleAI Premium
          </span>

          <h2 className="text-5xl font-black mt-6 leading-tight">
            Your Personal
            <br />
            AI Stylist
          </h2>

          <p className="mt-6 text-lg text-gray-200 max-w-md">
            Discover outfit combinations tailored to your wardrobe,
            body shape and skin tone using intelligent fashion analysis.
          </p>

          {/* Floating Cards */}

          <div className="mt-10 space-y-4">

            <div className="bg-white/15 backdrop-blur-xl rounded-2xl p-5">
              ⭐ Outfit Match Accuracy
              <div className="text-3xl font-bold mt-2">
                98%
              </div>
            </div>

            <div className="bg-white/15 backdrop-blur-xl rounded-2xl p-5">
              👕 50,000+ Outfit Pairings
            </div>

            <div className="bg-white/15 backdrop-blur-xl rounded-2xl p-5">
              🎨 Personalized Color Analysis
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}