import { motion } from "framer-motion";
import { Star, Quote, Sparkles } from "lucide-react";

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "College Student",
    image: "https://i.pravatar.cc/150?img=12",
    review:
      "StyleAI completely changed how I choose outfits. I no longer waste time deciding what to wear every morning.",
  },
  {
    name: "Priya Reddy",
    role: "Software Engineer",
    image: "https://i.pravatar.cc/150?img=32",
    review:
      "The AI recommendations are surprisingly accurate. The color combinations always look stylish and professional.",
  },
  {
    name: "Arjun Kumar",
    role: "Content Creator",
    image: "https://i.pravatar.cc/150?img=15",
    review:
      "Managing my wardrobe has never been easier. It feels like having a personal stylist available 24/7.",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative py-32 bg-gray-50 overflow-hidden"
    >

      {/* ================================================= */}
      {/* BACKGROUND DECORATION */}
      {/* ================================================= */}

      <div className="absolute top-0 left-1/4 w-72 h-72 bg-yellow-200/30 rounded-full blur-[120px]" />

      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-orange-200/20 rounded-full blur-[140px]" />


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
            Testimonials
          </span>


          <h2 className="text-5xl lg:text-6xl font-black mt-8 leading-tight">
            People Are
            <br />
            <span className="text-yellow-500">
              Dressing Smarter
            </span>
          </h2>


          <p className="mt-7 text-lg text-gray-500 leading-8 max-w-2xl mx-auto">
            From everyday outfits to professional looks, StyleAI helps people
            feel more confident about what they wear.
          </p>


          {/* Rating */}

          <div className="flex justify-center items-center gap-3 mt-7">

            <div className="flex gap-1">

              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  size={18}
                  className="fill-yellow-400 text-yellow-400"
                />
              ))}

            </div>

            <span className="font-bold">
              4.9/5
            </span>

            <span className="text-gray-400">
              from StyleAI users
            </span>

          </div>

        </motion.div>


        {/* ================================================= */}
        {/* TESTIMONIAL CARDS */}
        {/* ================================================= */}

        <div className="grid lg:grid-cols-3 gap-8 mt-20">

          {testimonials.map((user, index) => (

            <motion.div
              key={user.name}
              initial={{
                opacity: 0,
                y: 50,
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
                delay: index * 0.12,
              }}
              whileHover={{
                y: -10,
              }}
              className="
                group
                relative
                bg-white
                rounded-[32px]
                p-8
                lg:p-9
                border
                border-gray-100
                shadow-lg
                hover:shadow-2xl
                transition-shadow
                duration-300
                overflow-hidden
              "
            >

              {/* Top accent */}

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


              {/* Quote icon */}

              <div className="
                w-12
                h-12
                rounded-2xl
                bg-yellow-100
                text-yellow-600
                flex
                items-center
                justify-center
              ">
                <Quote size={22} />
              </div>


              {/* Stars */}

              <div className="flex gap-1 mt-7">

                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={17}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}

              </div>


              {/* Review */}

              <p className="
                text-gray-700
                text-lg
                leading-8
                mt-6
              ">
                “{user.review}”
              </p>


              {/* Divider */}

              <div className="h-px bg-gray-100 my-8" />


              {/* User */}

              <div className="flex items-center gap-4">

                <div className="relative">

                  <img
                    src={user.image}
                    alt={user.name}
                    className="
                      w-14
                      h-14
                      rounded-full
                      object-cover
                      border-2
                      border-white
                      shadow-md
                    "
                  />

                  <div className="
                    absolute
                    -bottom-1
                    -right-1
                    w-6
                    h-6
                    rounded-full
                    bg-yellow-500
                    text-black
                    flex
                    items-center
                    justify-center
                    text-xs
                    font-bold
                    border-2
                    border-white
                  ">
                    ✓
                  </div>

                </div>


                <div>

                  <h4 className="font-bold text-lg">
                    {user.name}
                  </h4>

                  <p className="text-gray-500 text-sm mt-0.5">
                    {user.role}
                  </p>

                </div>

              </div>


              {/* Hover glow */}

              <div className="
                absolute
                -bottom-20
                -right-20
                w-40
                h-40
                bg-yellow-200/20
                rounded-full
                blur-3xl
                opacity-0
                group-hover:opacity-100
                transition-opacity
                duration-500
              " />

            </motion.div>

          ))}

        </div>


        {/* ================================================= */}
        {/* BOTTOM MESSAGE */}
        {/* ================================================= */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-20"
        >

          <p className="text-gray-500">
            Your next favorite outfit could already be in your wardrobe.
          </p>

          <div className="flex justify-center items-center gap-2 mt-3 font-bold">

            <span>
              Let StyleAI find it.
            </span>

            <Sparkles
              size={18}
              className="text-yellow-500"
            />

          </div>

        </motion.div>

      </div>

    </section>
  );
}