import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

export default function WelcomeCard() {
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        const user = JSON.parse(storedUser);

        const name =
          user.full_name ||
          user.name ||
          "User";

        setUserName(name);
        return;
      }

      const email = localStorage.getItem("userEmail");

      if (email) {
        setUserName(email.split("@")[0]);
      }
    } catch (error) {
      console.error("Unable to load user name:", error);
    }
  }, []);

  return (
    <section
      className="
        group
        relative
        overflow-hidden
        rounded-[32px]
        bg-[#111111]
        px-8
        py-9
        sm:px-10
        sm:py-10
        lg:px-12
        lg:py-11
        text-white
        shadow-[0_24px_70px_rgba(0,0,0,0.12)]
      "
    >
      {/* Ambient gold glow */}
      <div
        className="
          pointer-events-none
          absolute
          -right-24
          -top-32
          h-80
          w-80
          rounded-full
          bg-yellow-500/15
          blur-[90px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-32
          right-20
          h-64
          w-64
          rounded-full
          bg-amber-300/10
          blur-[80px]
        "
      />

      {/* Decorative circles */}
      <div
        className="
          pointer-events-none
          absolute
          -right-16
          top-1/2
          hidden
          h-64
          w-64
          -translate-y-1/2
          rounded-full
          border
          border-yellow-500/10
          lg:block
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -right-5
          top-1/2
          hidden
          h-40
          w-40
          -translate-y-1/2
          rounded-full
          border
          border-yellow-500/10
          lg:block
        "
      />

      <div className="relative z-10 max-w-3xl">

        {/* Eyebrow */}
        <div className="flex items-center gap-3">

          <div
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-xl
              bg-yellow-500
              text-black
              shadow-lg
              shadow-yellow-500/10
            "
          >
            <Sparkles
              size={17}
              strokeWidth={2.5}
            />
          </div>

          <div>

            <p
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.24em]
                text-yellow-400
              "
            >
              StyleAI
            </p>

            <p className="mt-0.5 text-xs text-gray-500">
              Your personal styling studio
            </p>

          </div>

        </div>

        {/* Heading */}
        <h1
          className="
            mt-8
            text-4xl
            font-black
            leading-[1.08]
            tracking-[-0.03em]
            sm:text-5xl
            lg:text-[52px]
          "
        >
          Welcome back,{" "}

          <span className="text-yellow-400">
            {userName}
          </span>
          .
        </h1>

        {/* Description */}
        <p
          className="
            mt-5
            max-w-2xl
            text-base
            leading-7
            text-gray-400
            sm:text-lg
          "
        >
          Your wardrobe is ready. Discover combinations that
          match your style, occasion, and the way you want to feel today.
        </p>

      </div>

      {/* Bottom accent */}
      <div
        className="
          pointer-events-none
          absolute
          bottom-0
          left-10
          h-px
          w-40
          bg-gradient-to-r
          from-yellow-500/60
          to-transparent
        "
      />
    </section>
  );
}
