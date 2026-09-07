import { motion } from "framer-motion";
import {
  Shirt,
  Sparkles,
  Palette,
  Footprints,
  Watch,
  Layers3,
} from "lucide-react";

const brands = [
  {
    name: "ZARA",
    icon: Shirt,
  },
  {
    name: "NIKE",
    icon: Footprints,
  },
  {
    name: "UNIQLO",
    icon: Shirt,
  },
  {
    name: "GUCCI",
    icon: Sparkles,
  },
  {
    name: "LEVI'S",
    icon: Layers3,
  },
  {
    name: "H&M",
    icon: Palette,
  },
];

export default function Brands() {
  return (
    <section className="relative py-24 bg-white overflow-hidden">

      {/* ================================================= */}
      {/* SUBTLE BACKGROUND */}
      {/* ================================================= */}

      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-96 h-40 bg-yellow-100/40 blur-[100px] rounded-full" />


      <div className="relative max-w-7xl mx-auto px-8">

        {/* ================================================= */}
        {/* HEADING */}
        {/* ================================================= */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >

          <div className="
            inline-flex
            items-center
            gap-2
            bg-gray-100
            text-gray-600
            px-4
            py-2
            rounded-full
            text-sm
            font-semibold
          ">
            <Sparkles size={15} className="text-yellow-500" />
            Your wardrobe, your style
          </div>


          <h2 className="
            text-3xl
            lg:text-4xl
            font-black
            mt-6
          ">
            Style Starts With
            <span className="text-yellow-500">
              {" "}What You Wear
            </span>
          </h2>


          <p className="
            mt-4
            text-gray-500
            max-w-2xl
            mx-auto
            leading-7
          ">
            Whether your wardrobe is filled with everyday essentials,
            streetwear, sportswear, or premium pieces, StyleAI helps
            you turn what you already own into better outfits.
          </p>

        </motion.div>


        {/* ================================================= */}
        {/* BRAND CARDS */}
        {/* ================================================= */}

        <div className="
          grid
          grid-cols-2
          md:grid-cols-3
          lg:grid-cols-6
          gap-4
          lg:gap-5
          mt-14
        ">

          {brands.map((brand, index) => {

            const Icon = brand.icon;

            return (
              <motion.div
                key={brand.name}
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.07,
                }}
                whileHover={{
                  y: -6,
                }}
                className="
                  group
                  relative
                  bg-gray-50
                  border
                  border-gray-100
                  rounded-2xl
                  p-6
                  flex
                  flex-col
                  items-center
                  justify-center
                  gap-4
                  min-h-[130px]
                  overflow-hidden
                  transition-all
                  duration-300
                  hover:bg-black
                  hover:border-black
                  hover:shadow-xl
                "
              >

                {/* Hover glow */}

                <div className="
                  absolute
                  -top-10
                  -right-10
                  w-24
                  h-24
                  rounded-full
                  bg-yellow-500/0
                  group-hover:bg-yellow-500/10
                  blur-2xl
                  transition
                " />


                {/* Icon */}

                <div className="
                  w-11
                  h-11
                  rounded-xl
                  bg-white
                  text-gray-500
                  flex
                  items-center
                  justify-center
                  shadow-sm
                  group-hover:bg-yellow-500
                  group-hover:text-black
                  transition-all
                  duration-300
                ">
                  <Icon size={21} />
                </div>


                {/* Brand */}

                <span className="
                  relative
                  text-sm
                  font-black
                  tracking-[2px]
                  text-gray-700
                  group-hover:text-white
                  transition-colors
                ">
                  {brand.name}
                </span>

              </motion.div>
            );
          })}

        </div>


        {/* ================================================= */}
        {/* BOTTOM MESSAGE */}
        {/* ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.7,
            delay: 0.3,
          }}
          className="
            mt-12
            flex
            items-center
            justify-center
            gap-3
            text-sm
            text-gray-400
          "
        >

          <div className="w-8 h-px bg-gray-200" />

          <span>
            From everyday basics to statement pieces
          </span>

          <div className="w-8 h-px bg-gray-200" />

        </motion.div>

      </div>

    </section>
  );
}