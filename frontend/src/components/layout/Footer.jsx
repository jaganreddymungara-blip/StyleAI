import {
  Shirt,
  ArrowUpRight,
  Mail,
  Sparkles,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToSection = (id) => {
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <footer className="relative bg-black text-white overflow-hidden">

      {/* Background glow */}

      <div
        className="
          absolute
          -top-32
          left-1/2
          -translate-x-1/2
          w-[500px]
          h-[300px]
          bg-yellow-500/10
          blur-[120px]
          rounded-full
          pointer-events-none
        "
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-10">

        {/* ================================================= */}
        {/* CTA */}
        {/* ================================================= */}

        <div
          className="
            bg-white/[0.06]
            border
            border-white/10
            rounded-[32px]
            p-8
            lg:p-10
            flex
            flex-col
            lg:flex-row
            items-start
            lg:items-center
            justify-between
            gap-8
            mb-20
          "
        >

          <div>

            <div
              className="
                inline-flex
                items-center
                gap-2
                text-yellow-400
                text-sm
                font-semibold
                mb-3
              "
            >
              <Sparkles size={16} />

              Your wardrobe, upgraded
            </div>

            <h2 className="text-3xl lg:text-4xl font-black">
              Ready to dress smarter?
            </h2>

            <p className="text-gray-400 mt-3 max-w-xl leading-7">
              Build your digital wardrobe and let StyleAI
              help you create outfits you'll actually want to wear.
            </p>

          </div>

          <button
            onClick={() => navigate("/login")}
            className="
              shrink-0
              bg-yellow-500
              text-black
              px-7
              py-4
              rounded-full
              font-bold
              flex
              items-center
              gap-2
              hover:bg-yellow-400
              hover:scale-[1.02]
              transition-all
              duration-300
              shadow-lg
            "
          >
            Get Started

            <ArrowUpRight size={18} />
          </button>

        </div>


        {/* ================================================= */}
        {/* MAIN FOOTER */}
        {/* ================================================= */}

        <div
          className="
            grid
            sm:grid-cols-2
            lg:grid-cols-4
            gap-12
            lg:gap-16
          "
        >

          {/* ================================================= */}
          {/* BRAND */}
          {/* ================================================= */}

          <div>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-3 group"
            >

              <div
                className="
                  bg-yellow-500
                  p-3
                  rounded-2xl
                  group-hover:bg-yellow-400
                  group-hover:scale-105
                  transition-all
                  duration-300
                "
              >
                <Shirt
                  className="text-black"
                  size={26}
                />
              </div>

              <div className="text-left">

                <h2 className="text-3xl font-black">
                  Style<span className="text-yellow-500">AI</span>
                </h2>

                <p className="text-gray-500 text-sm">
                  Your AI Stylist
                </p>

              </div>

            </button>

            <p className="text-gray-400 mt-7 leading-7 max-w-sm">
              Build a smarter wardrobe with AI-powered outfit
              recommendations based on your personal style,
              colors, seasons, and occasions.
            </p>

            <button
              onClick={() => navigate("/register")}
              className="
                mt-6
                text-sm
                font-semibold
                text-yellow-400
                hover:text-yellow-300
                flex
                items-center
                gap-2
                transition
              "
            >
              Start styling

              <ArrowUpRight size={15} />
            </button>

          </div>


          {/* ================================================= */}
          {/* PRODUCT */}
          {/* ================================================= */}

          <div>

            <h3 className="font-bold text-lg mb-6">
              Product
            </h3>

            <ul className="space-y-4 text-gray-400 text-sm">

              <li>
                <button
                  onClick={() => scrollToSection("features")}
                  className="hover:text-yellow-400 transition"
                >
                  Features
                </button>
              </li>

              <li>
                <button
                  onClick={() => scrollToSection("how-it-works")}
                  className="hover:text-yellow-400 transition"
                >
                  How It Works
                </button>
              </li>

              <li>
                <button
                  onClick={() => scrollToSection("demo")}
                  className="hover:text-yellow-400 transition"
                >
                  AI Demo
                </button>
              </li>

              <li>
                <button
                  onClick={() => scrollToSection("testimonials")}
                  className="hover:text-yellow-400 transition"
                >
                  Testimonials
                </button>
              </li>

              <li>
                <button
                  onClick={() => scrollToSection("faq")}
                  className="hover:text-yellow-400 transition"
                >
                  FAQ
                </button>
              </li>

            </ul>

          </div>


          {/* ================================================= */}
          {/* RESOURCES */}
          {/* ================================================= */}

          <div>

            <h3 className="font-bold text-lg mb-6">
              Resources
            </h3>

            <ul className="space-y-4 text-gray-400 text-sm">

              <li>
                <button
                  disabled
                  className="
                    flex
                    items-center
                    gap-2
                    text-gray-600
                    cursor-not-allowed
                  "
                >
                  Documentation

                  <span
                    className="
                      text-[10px]
                      bg-white/10
                      px-2
                      py-0.5
                      rounded-full
                    "
                  >
                    Soon
                  </span>

                </button>
              </li>

              <li>
                <button
                  disabled
                  className="
                    flex
                    items-center
                    gap-2
                    text-gray-600
                    cursor-not-allowed
                  "
                >
                  Privacy Policy

                  <span
                    className="
                      text-[10px]
                      bg-white/10
                      px-2
                      py-0.5
                      rounded-full
                    "
                  >
                    Soon
                  </span>

                </button>
              </li>

              <li>
                <button
                  disabled
                  className="
                    flex
                    items-center
                    gap-2
                    text-gray-600
                    cursor-not-allowed
                  "
                >
                  Terms of Service

                  <span
                    className="
                      text-[10px]
                      bg-white/10
                      px-2
                      py-0.5
                      rounded-full
                    "
                  >
                    Soon
                  </span>

                </button>
              </li>

              <li>
                <button
                  onClick={() => scrollToSection("faq")}
                  className="hover:text-yellow-400 transition"
                >
                  Frequently Asked Questions
                </button>
              </li>

            </ul>

          </div>


          {/* ================================================= */}
          {/* CONNECT */}
          {/* ================================================= */}

          <div>

            <h3 className="font-bold text-lg mb-6">
              Connect
            </h3>

            <div className="flex gap-3">

              <a
                href="#"
                aria-label="GitHub"
                className="
                  w-11
                  h-11
                  rounded-xl
                  bg-white/10
                  flex
                  items-center
                  justify-center
                  font-bold
                  text-sm
                  hover:bg-yellow-500
                  hover:text-black
                  hover:-translate-y-1
                  transition-all
                  duration-300
                "
              >
                GH
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className="
                  w-11
                  h-11
                  rounded-xl
                  bg-white/10
                  flex
                  items-center
                  justify-center
                  font-bold
                  text-sm
                  hover:bg-yellow-500
                  hover:text-black
                  hover:-translate-y-1
                  transition-all
                  duration-300
                "
              >
                in
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="
                  w-11
                  h-11
                  rounded-xl
                  bg-white/10
                  flex
                  items-center
                  justify-center
                  font-bold
                  text-sm
                  hover:bg-yellow-500
                  hover:text-black
                  hover:-translate-y-1
                  transition-all
                  duration-300
                "
              >
                IG
              </a>

            </div>


            {/* Email */}

            <div className="mt-8">

              <p className="text-gray-500 text-sm mb-2">
                Get in touch
              </p>

              <a
                href="mailto:hello@styleai.com"
                className="
                  flex
                  items-center
                  gap-2
                  text-gray-300
                  hover:text-yellow-400
                  transition
                  text-sm
                "
              >
                <Mail size={16} />

                hello@styleai.com
              </a>

            </div>

          </div>

        </div>


        {/* ================================================= */}
        {/* BOTTOM */}
        {/* ================================================= */}

        <div
          className="
            border-t
            border-white/10
            mt-16
            pt-8
          "
        >

          <div
            className="
              flex
              flex-col
              lg:flex-row
              justify-between
              items-center
              gap-4
            "
          >

            <p className="text-gray-500 text-sm text-center lg:text-left">
              © 2026 StyleAI. All rights reserved.
            </p>

            <div className="flex items-center gap-2 text-gray-600 text-sm">

              <span>Built with</span>

              <span className="text-gray-400">
                React
              </span>

              <span>+</span>

              <span className="text-gray-400">
                FastAPI
              </span>

            </div>

            <button
              onClick={scrollToTop}
              className="
                flex
                items-center
                gap-2
                text-sm
                text-gray-500
                hover:text-yellow-400
                transition
              "
            >
              Back to top

              <ArrowUpRight
                size={15}
                className="-rotate-45"
              />

            </button>

          </div>

        </div>

      </div>

    </footer>
  );
}