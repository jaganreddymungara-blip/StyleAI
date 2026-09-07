import {
  LayoutDashboard,
  Shirt,
  Sparkles,
  Heart,
  User,
  Settings,
  History,
  LogOut,
  ChevronRight,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const API_URL = "http://127.0.0.1:8000";

const menu = [
  {
    icon: LayoutDashboard,
    title: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: Shirt,
    title: "Wardrobe",
    path: "/wardrobe",
  },
  {
    icon: Sparkles,
    title: "AI Stylist",
    path: "/recommendations",
    highlight: true,
  },
  {
    icon: Heart,
    title: "Favorites",
    path: "/favorites",
  },
  {
    icon: History,
    title: "History",
    path: "/history",
  },
];

const accountMenu = [
  {
    icon: User,
    title: "Profile",
    path: "/profile",
  },
  {
    icon: Settings,
    title: "Settings",
    path: "/settings",
  },
];

export default function Sidebar() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "User",
    email: "",
    profile_photo: "",
  });

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);

        setUser((previous) => ({
          ...previous,
          name:
            parsedUser.name ||
            parsedUser.full_name ||
            parsedUser.email?.split("@")[0] ||
            "User",
          email: parsedUser.email || "",
        }));
      } else {
        const email = localStorage.getItem("userEmail");

        if (email) {
          setUser((previous) => ({
            ...previous,
            name: email.split("@")[0],
            email,
          }));
        }
      }

      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      const response = await fetch(`${API_URL}/api/profile/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        return;
      }

      const profile = await response.json();

      setUser((previous) => ({
        ...previous,
        profile_photo: profile.profile_photo || "",
      }));
    } catch (error) {
      console.error("Sidebar user error:", error);
    }
  };

  const getInitials = (name) => {
    if (!name) {
      return "U";
    }

    return name
      .split(" ")
      .filter(Boolean)
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const profileImage = user.profile_photo
    ? `${API_URL}/uploads/${user.profile_photo}`
    : null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userEmail");

    navigate("/");
  };

  const renderMenuItem = (item) => {
    const Icon = item.icon;

    return (
      <NavLink
        key={item.path}
        to={item.path}
        className={({ isActive }) =>
          `
          group relative flex items-center gap-3.5
          px-4 py-3.5
          rounded-xl
          mb-1
          text-sm font-medium
          transition-all duration-200
          ${
            isActive
              ? "bg-white text-black shadow-sm"
              : item.highlight
              ? "text-yellow-400 hover:bg-yellow-500/10 hover:text-yellow-300"
              : "text-gray-400 hover:bg-white/[0.06] hover:text-white"
          }
          `
        }
      >
        {({ isActive }) => (
          <>
            {isActive && (
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-yellow-500 rounded-r-full" />
            )}

            <Icon
              size={19}
              strokeWidth={isActive ? 2.4 : 2}
              className={`
                transition-transform duration-200
                group-hover:scale-105
                ${
                  isActive
                    ? "text-yellow-600"
                    : item.highlight
                    ? "text-yellow-400"
                    : ""
                }
              `}
            />

            <span className="flex-1">
              {item.title}
            </span>

            {item.highlight && !isActive && (
              <span className="text-[9px] uppercase tracking-wider font-bold bg-yellow-500/10 text-yellow-400 px-2 py-1 rounded-full">
                AI
              </span>
            )}

            {isActive && (
              <ChevronRight
                size={16}
                className="text-gray-400"
              />
            )}
          </>
        )}
      </NavLink>
    );
  };

  return (
    <aside className="fixed left-0 top-0 w-64 h-screen bg-[#0d0d0d] text-white border-r border-white/[0.07] flex flex-col z-50">

      {/* LOGO */}

      <div className="px-6 pt-7 pb-6 border-b border-white/[0.07]">

        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-3 group"
        >
          <div
            className="
              w-10 h-10
              rounded-xl
              bg-yellow-500
              flex items-center justify-center
              group-hover:bg-yellow-400
              group-hover:scale-105
              transition-all duration-200
            "
          >
            <Shirt
              size={22}
              className="text-black"
            />
          </div>

          <div className="text-left">
            <h1 className="text-2xl font-black tracking-tight">
              Style<span className="text-yellow-500">AI</span>
            </h1>

            <p className="text-[11px] text-gray-500 mt-0.5">
              Personal AI Stylist
            </p>
          </div>
        </button>

      </div>


      {/* NAVIGATION */}

      <nav className="flex-1 px-4 py-7 overflow-y-auto">

        <p className="px-3 mb-3 text-[10px] uppercase tracking-[0.18em] font-bold text-gray-600">
          Workspace
        </p>

        {menu.map(renderMenuItem)}


        <div className="my-7 mx-3 border-t border-white/[0.06]" />


        <p className="px-3 mb-3 text-[10px] uppercase tracking-[0.18em] font-bold text-gray-600">
          Account
        </p>

        {accountMenu.map(renderMenuItem)}

      </nav>


      {/* USER CARD */}

      <div className="px-4 pb-3">

        <div
          className="
            rounded-2xl
            bg-white/[0.045]
            border border-white/[0.07]
            p-3
            flex items-center gap-3
            hover:bg-white/[0.07]
            transition-colors duration-200
          "
        >

          {profileImage ? (
            <img
              src={profileImage}
              alt="Profile"
              className="
                w-10 h-10
                rounded-full
                object-cover
                border border-white/10
                shrink-0
              "
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <div
              className="
                w-10 h-10
                rounded-full
                bg-yellow-500
                text-black
                flex items-center justify-center
                font-bold text-sm
                shrink-0
              "
            >
              {getInitials(user.name)}
            </div>
          )}

          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-sm text-white truncate">
              {user.name}
            </h3>

            <p className="text-xs text-gray-500 truncate mt-0.5">
              {user.email || "StyleAI Member"}
            </p>
          </div>

        </div>

      </div>


      {/* LOGOUT */}

      <div className="px-4 pb-5">

        <button
          onClick={handleLogout}
          className="
            w-full
            flex items-center gap-3
            px-4 py-3
            rounded-xl
            text-sm font-medium
            text-gray-500
            hover:bg-red-500/10
            hover:text-red-400
            transition-all duration-200
          "
        >
          <LogOut size={19} />

          <span>
            Logout
          </span>
        </button>

      </div>

    </aside>
  );
}