import { Shirt, Sparkles, ArrowRight } from "lucide-react";

export default function EmptyWardrobe({ onUpload }) {
return ( <div
   className="
     relative
     overflow-hidden
     bg-white
     rounded-[32px]
     border
     border-gray-200/80
     shadow-sm
     px-8
     py-20
     sm:px-12
     text-center
   "
 >


  {/* Decorative background */}

  <div
    className="
      absolute
      -top-24
      -right-24
      w-64
      h-64
      rounded-full
      bg-yellow-100/60
      blur-3xl
      pointer-events-none
    "
  />

  <div
    className="
      absolute
      -bottom-24
      -left-24
      w-64
      h-64
      rounded-full
      bg-gray-100
      blur-3xl
      pointer-events-none
    "
  />


  {/* Main content */}

  <div className="relative z-10 max-w-xl mx-auto">

    {/* Icon */}

    <div
      className="
        relative
        w-24
        h-24
        mx-auto
        rounded-[28px]
        bg-yellow-100
        flex
        items-center
        justify-center
        shadow-sm
      "
    >

      <Shirt
        size={44}
        strokeWidth={1.8}
        className="text-yellow-600"
      />

      <div
        className="
          absolute
          -right-2
          -bottom-2
          w-9
          h-9
          rounded-full
          bg-black
          text-yellow-400
          flex
          items-center
          justify-center
          border-4
          border-white
        "
      >
        <Sparkles size={16} />
      </div>

    </div>


    {/* Heading */}

    <p
      className="
        text-xs
        uppercase
        tracking-[0.2em]
        font-bold
        text-yellow-600
        mt-8
      "
    >
      Your Style Starts Here
    </p>

    <h2
      className="
        text-3xl
        sm:text-4xl
        font-black
        text-gray-900
        mt-3
      "
    >
      Your wardrobe is empty
    </h2>


    {/* Description */}

    <p
      className="
        text-gray-500
        text-base
        sm:text-lg
        leading-7
        mt-4
        max-w-lg
        mx-auto
      "
    >
      Add your clothes and let StyleAI turn your wardrobe
      into personalized outfit combinations.
    </p>


    {/* CTA */}

    <button
      type="button"
      onClick={onUpload}
      className="
        inline-flex
        items-center
        justify-center
        gap-2
        mt-8
        bg-black
        text-white
        px-7
        py-3.5
        rounded-xl
        font-semibold
        shadow-lg
        shadow-black/10
        hover:bg-yellow-500
        hover:text-black
        hover:shadow-xl
        transition-all
        duration-300
        hover:-translate-y-0.5
      "
    >

      Upload First Item

      <ArrowRight size={18} />

    </button>


    {/* Supporting text */}

    <p className="text-xs text-gray-400 mt-4">
      Shirts, pants, shoes, jackets, accessories and more.
    </p>

  </div>

</div>

);
}
