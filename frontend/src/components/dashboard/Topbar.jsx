import { useEffect, useState } from "react";
import {
  Bell,
  User,
  ChevronDown,
  Sparkles,
} from "lucide-react";

const API_URL = "http://127.0.0.1:8000";

export default function Topbar() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Topbar: authentication token not found.");
        return;
      }

      const response = await fetch(`${API_URL}/api/profile/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.error(
          "Topbar profile request failed:",
          response.status
        );
        return;
      }

      const data = await response.json();

      setProfile(data);
    } catch (error) {
      console.error("Topbar profile error:", error);
    }
  };

  // =====================================================
  // PROFILE PHOTO
  // =====================================================

  const profileImage = profile?.profile_photo
    ? `${API_URL}/uploads/${profile.profile_photo}`
    : null;


  // =====================================================
  // USER NAME
  // =====================================================

  const getUserName = () => {
    if (profile?.name) {
      return profile.name;
    }

    try {
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);

        return (
          parsedUser.name ||
          parsedUser.full_name ||
          parsedUser.email?.split("@")[0] ||
          "StyleAI User"
        );
      }
    } catch (error) {
      console.error("Unable to read stored user:", error);
    }

    const email = localStorage.getItem("userEmail");

    if (email) {
      return email.split("@")[0];
    }

    return "StyleAI User";
  };

  const userName = getUserName();


  return (
    <header
      className="
        h-[78px]
        bg-white
        border-b
        border-gray-200
        flex
        items-center
        justify-between
        px-6
        lg:px-8
        sticky
        top-0
        z-40
      "
    >

      {/* ================================================= */}
      {/* LEFT */}
      {/* ================================================= */}

      <div className="min-w-0">

        <div className="flex items-center gap-2">

          <Sparkles
            size={14}
            className="text-yellow-500"
          />

          <p
            className="
              text-[10px]
              uppercase
              tracking-[0.2em]
              text-gray-400
              font-bold
            "
          >
            Personal Stylist
          </p>

        </div>


        <h2
          className="
            text-lg
            sm:text-xl
            font-black
            text-gray-900
            mt-1
            truncate
          "
        >
          Welcome back,

          <span className="text-yellow-500">
            {" "}{userName}
          </span>
        </h2>

      </div>


      {/* ================================================= */}
      {/* RIGHT */}
      {/* ================================================= */}

      <div className="flex items-center gap-3 sm:gap-5">


        {/* ================================================= */}
        {/* NOTIFICATIONS */}
        {/* ================================================= */}

        <button
          type="button"
          aria-label="Notifications"
          className="
            relative
            w-10
            h-10
            rounded-xl
            border
            border-gray-200
            bg-white
            flex
            items-center
            justify-center
            text-gray-500
            hover:text-gray-900
            hover:border-gray-300
            hover:bg-gray-50
            transition-all
            duration-200
          "
        >

          <Bell
            size={19}
            strokeWidth={2}
          />


          {/* Notification indicator */}

          <span
            className="
              absolute
              top-[8px]
              right-[8px]
              w-[7px]
              h-[7px]
              rounded-full
              bg-yellow-500
              ring-2
              ring-white
            "
          />

        </button>


        {/* Divider */}

        <div className="hidden sm:block h-9 w-px bg-gray-200" />


        {/* ================================================= */}
        {/* PROFILE */}
        {/* ================================================= */}

        <button
          type="button"
          className="
            group
            flex
            items-center
            gap-3
            rounded-2xl
            px-2
            py-1.5
            hover:bg-gray-50
            transition-all
            duration-200
          "
        >

          {/* Avatar */}

          {profileImage ? (

            <img
              src={profileImage}
              alt="Profile"
              className="
                w-10
                h-10
                rounded-full
                object-cover
                border-2
                border-gray-100
                group-hover:border-yellow-300
                transition-colors
              "
              onError={(event) => {
                console.error(
                  "Topbar profile image failed:",
                  profileImage
                );

                event.currentTarget.style.display = "none";
              }}
            />

          ) : (

            <div
              className="
                w-10
                h-10
                rounded-full
                bg-yellow-100
                border
                border-yellow-200
                flex
                items-center
                justify-center
                group-hover:bg-yellow-200
                transition-colors
              "
            >

              <User
                size={18}
                className="text-yellow-700"
              />

            </div>

          )}


          {/* User details */}

          <div className="hidden sm:block text-left">

            <p
              className="
                font-bold
                text-sm
                text-gray-900
                leading-tight
                max-w-[130px]
                truncate
              "
            >
              {userName}
            </p>

            <p className="text-[11px] text-gray-400 mt-1">
              StyleAI Member
            </p>

          </div>


          <ChevronDown
            size={16}
            className="
              hidden
              sm:block
              text-gray-400
              ml-1
              group-hover:text-gray-700
              transition-colors
            "
          />

        </button>

      </div>

    </header>
  );
}