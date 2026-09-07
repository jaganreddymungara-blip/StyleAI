import {
  Menu,
  X,
  ArrowRight,
} from "lucide-react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const scrollToSection = (id) => {
    closeMobileMenu();

    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const goToPage = (path) => {
    closeMobileMenu();
    navigate(path);
  };

  return (
    <>
      {/* ================================================= */}
      {/* NAVBAR */}
      {/* ================================================= */}

      <nav className="
        fixed
        top-0
        left-0
        right-0
        z-50
        bg-white/90
        backdrop-blur-xl
        border-b
        border-gray-200/80
      ">

        <div className="
          max-w-7xl
          mx-auto
          px-6
          lg:px-8
          h-20
          flex
          items-center
          justify-between
        ">

          {/* ================================================= */}
          {/* LOGO */}
          {/* ================================================= */}

          <button
            onClick={() => {
              closeMobileMenu();

              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
            className="
              flex
              items-center
              gap-3
              group
            "
          >

            <div className="
              w-11
              h-11
              rounded-2xl
              bg-black
              text-white
              flex
              items-center
              justify-center
              font-black
              text-xl
              shadow-lg
              group-hover:bg-yellow-500
              group-hover:text-black
              transition-all
              duration-300
            ">
              S
            </div>

            <h1 className="
              text-3xl
              lg:text-4xl
              font-black
              tracking-tight
            ">
              Style
              <span className="text-yellow-500">
                AI
              </span>
            </h1>

          </button>


          {/* ================================================= */}
          {/* DESKTOP NAVIGATION */}
          {/* ================================================= */}

          <div className="
            hidden
            lg:flex
            items-center
            gap-10
            text-sm
            font-semibold
            text-gray-600
          ">

            <button
              onClick={() => scrollToSection("features")}
              className="
                hover:text-black
                transition
              "
            >
              Features
            </button>

            <button
              onClick={() => scrollToSection("how-it-works")}
              className="
                hover:text-black
                transition
              "
            >
              How It Works
            </button>

            <button
              onClick={() => scrollToSection("demo")}
              className="
                hover:text-black
                transition
              "
            >
              AI Demo
            </button>

            <button
              onClick={() => scrollToSection("testimonials")}
              className="
                hover:text-black
                transition
              "
            >
              Testimonials
            </button>

            <button
              onClick={() => scrollToSection("faq")}
              className="
                hover:text-black
                transition
              "
            >
              FAQ
            </button>

          </div>


          {/* ================================================= */}
          {/* DESKTOP ACTIONS */}
          {/* ================================================= */}

          <div className="
            hidden
            lg:flex
            items-center
            gap-3
          ">

            <button
              onClick={() => goToPage("/login")}
              className="
                px-5
                py-2.5
                rounded-xl
                text-sm
                font-semibold
                text-gray-700
                hover:text-black
                hover:bg-gray-100
                transition
              "
            >
              Login
            </button>


            <button
              onClick={() => goToPage("/register")}
              className="
                px-6
                py-3
                rounded-full
                bg-black
                text-white
                text-sm
                font-bold
                flex
                items-center
                gap-2
                hover:bg-yellow-500
                hover:text-black
                transition-all
                duration-300
                shadow-md
              "
            >

              Get Started

              <ArrowRight size={17} />

            </button>

          </div>


          {/* ================================================= */}
          {/* MOBILE MENU BUTTON */}
          {/* ================================================= */}

          <button
            onClick={() =>
              setMobileMenuOpen(!mobileMenuOpen)
            }
            className="
              lg:hidden
              w-11
              h-11
              rounded-xl
              bg-gray-100
              flex
              items-center
              justify-center
              hover:bg-yellow-100
              transition
            "
            aria-label="Toggle navigation menu"
          >

            {mobileMenuOpen ? (
              <X size={24} />
            ) : (
              <Menu size={24} />
            )}

          </button>

        </div>


        {/* ================================================= */}
        {/* MOBILE MENU */}
        {/* ================================================= */}

        {mobileMenuOpen && (

          <div className="
            lg:hidden
            border-t
            border-gray-100
            bg-white/95
            backdrop-blur-xl
            shadow-xl
          ">

            <div className="
              px-6
              py-6
              space-y-2
            ">

              {/* Features */}

              <button
                onClick={() => scrollToSection("features")}
                className="
                  w-full
                  text-left
                  px-4
                  py-3.5
                  rounded-xl
                  font-semibold
                  text-gray-700
                  hover:bg-gray-100
                  hover:text-black
                  transition
                "
              >
                Features
              </button>


              {/* How It Works */}

              <button
                onClick={() =>
                  scrollToSection("how-it-works")
                }
                className="
                  w-full
                  text-left
                  px-4
                  py-3.5
                  rounded-xl
                  font-semibold
                  text-gray-700
                  hover:bg-gray-100
                  hover:text-black
                  transition
                "
              >
                How It Works
              </button>


              {/* AI Demo */}

              <button
                onClick={() => scrollToSection("demo")}
                className="
                  w-full
                  text-left
                  px-4
                  py-3.5
                  rounded-xl
                  font-semibold
                  text-gray-700
                  hover:bg-gray-100
                  hover:text-black
                  transition
                "
              >
                AI Demo
              </button>


              {/* Testimonials */}

              <button
                onClick={() =>
                  scrollToSection("testimonials")
                }
                className="
                  w-full
                  text-left
                  px-4
                  py-3.5
                  rounded-xl
                  font-semibold
                  text-gray-700
                  hover:bg-gray-100
                  hover:text-black
                  transition
                "
              >
                Testimonials
              </button>


              {/* FAQ */}

              <button
                onClick={() => scrollToSection("faq")}
                className="
                  w-full
                  text-left
                  px-4
                  py-3.5
                  rounded-xl
                  font-semibold
                  text-gray-700
                  hover:bg-gray-100
                  hover:text-black
                  transition
                "
              >
                FAQ
              </button>


              {/* Divider */}

              <div className="
                border-t
                border-gray-100
                my-4
              " />


              {/* Login */}

              <button
                onClick={() => goToPage("/login")}
                className="
                  w-full
                  px-4
                  py-3.5
                  rounded-xl
                  font-semibold
                  text-gray-700
                  hover:bg-gray-100
                  transition
                "
              >
                Login
              </button>


              {/* Get Started */}

              <button
                onClick={() => goToPage("/register")}
                className="
                  w-full
                  px-5
                  py-3.5
                  rounded-xl
                  bg-black
                  text-white
                  font-bold
                  flex
                  items-center
                  justify-center
                  gap-2
                  hover:bg-yellow-500
                  hover:text-black
                  transition
                "
              >

                Get Started

                <ArrowRight size={18} />

              </button>

            </div>

          </div>

        )}

      </nav>
    </>
  );
}