import {
  Settings as SettingsIcon,
  User,
  Bell,
  Shield,
  Palette,
  LogOut,
  Sun,
  Moon,
  Monitor,
  Check,
  Lock,
  Trash2,
  Eye,
  Database,
  AlertTriangle,
  ChevronRight,
  Sparkles,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";

const API_URL = "http://127.0.0.1:8000";

export default function Settings() {
  const navigate = useNavigate();

  const [theme, setTheme] = useState(
    localStorage.getItem("styleai-theme") || "light"
  );

  const [notifications, setNotifications] = useState({
    recommendations:
      localStorage.getItem(
        "styleai-notifications-recommendations"
      ) !== "false",

    tips:
      localStorage.getItem(
        "styleai-notifications-tips"
      ) !== "false",

    reminders:
      localStorage.getItem(
        "styleai-notifications-reminders"
      ) !== "false",
  });

  const [showSecurity, setShowSecurity] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // =====================================================
  // THEME
  // =====================================================

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const applyTheme = (selectedTheme) => {
    const root = document.documentElement;

    if (selectedTheme === "dark") {
      root.classList.add("dark");
    } else if (selectedTheme === "light") {
      root.classList.remove("dark");
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      root.classList.toggle("dark", prefersDark);
    }
  };

  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme);

    localStorage.setItem(
      "styleai-theme",
      selectedTheme
    );

    applyTheme(selectedTheme);

    toast.success("Appearance updated");
  };

  // =====================================================
  // NOTIFICATIONS
  // =====================================================

  const handleNotificationChange = (name) => {
    setNotifications((previous) => {
      const updated = {
        ...previous,
        [name]: !previous[name],
      };

      localStorage.setItem(
        `styleai-notifications-${name}`,
        String(updated[name])
      );

      return updated;
    });

    toast.success("Notification preference updated");
  };

  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userEmail");

    toast.success("Logged out successfully");

    // Return to the public landing page
    navigate("/");
  };

  // =====================================================
  // DELETE ACCOUNT
  // =====================================================

  const handleDeleteAccount = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("You are not authenticated.");
      navigate("/");
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/api/security/account`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || "Unable to delete account."
        );
      }

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("styleai-theme");

      toast.success("Account deleted successfully");

      setShowDeleteConfirm(false);

      // Return to the public landing page
      navigate("/");
    } catch (error) {
      console.error(
        "Delete account error:",
        error
      );

      toast.error(
        error.message ||
          "Unable to delete account."
      );

      setShowDeleteConfirm(false);
    }
  };

  // =====================================================
  // THEME OPTION
  // =====================================================

  const ThemeOption = ({
    value,
    title,
    description,
    icon: Icon,
  }) => {
    const selected = theme === value;

    return (
      <button
        type="button"
        onClick={() =>
          handleThemeChange(value)
        }
        className={`
          group relative w-full text-left
          p-5 rounded-2xl
          border transition-all duration-200
          ${
            selected
              ? "border-yellow-500 bg-yellow-50 shadow-sm"
              : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
          }
        `}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div
              className={`
                w-11 h-11 rounded-xl
                flex items-center justify-center
                transition-all duration-200
                ${
                  selected
                    ? "bg-yellow-500 text-black"
                    : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                }
              `}
            >
              <Icon size={20} />
            </div>

            <div>
              <p className="font-bold text-gray-900">
                {title}
              </p>

              <p className="text-sm text-gray-500 mt-1">
                {description}
              </p>
            </div>
          </div>

          <div
            className={`
              w-6 h-6 rounded-full
              flex items-center justify-center
              border transition-all
              ${
                selected
                  ? "bg-yellow-500 border-yellow-500"
                  : "border-gray-300"
              }
            `}
          >
            {selected && (
              <Check
                size={14}
                className="text-black"
              />
            )}
          </div>
        </div>

        {selected && (
          <div className="absolute left-0 top-5 bottom-5 w-1 rounded-r-full bg-yellow-500" />
        )}
      </button>
    );
  };

  // =====================================================
  // NOTIFICATION TOGGLE
  // =====================================================

  const NotificationToggle = ({
    name,
    title,
    description,
  }) => {
    const enabled = notifications[name];

    return (
      <div className="flex items-center justify-between gap-8 py-5">
        <div className="min-w-0">
          <p className="font-semibold text-gray-900">
            {title}
          </p>

          <p className="text-sm text-gray-500 mt-1">
            {description}
          </p>
        </div>

        <button
          type="button"
          aria-label={`Toggle ${title}`}
          onClick={() =>
            handleNotificationChange(name)
          }
          className={`
            relative shrink-0
            w-12 h-7 rounded-full
            transition-all duration-200
            ${
              enabled
                ? "bg-yellow-500"
                : "bg-gray-300"
            }
          `}
        >
          <span
            className={`
              absolute top-1
              w-5 h-5
              bg-white rounded-full
              shadow-sm
              transition-all duration-200
              ${
                enabled
                  ? "left-6"
                  : "left-1"
              }
            `}
          />
        </button>
      </div>
    );
  };

  // =====================================================
  // SECTION HEADER
  // =====================================================

  const SectionHeader = ({
    icon: Icon,
    title,
    description,
  }) => {
    return (
      <div className="flex items-center gap-4 mb-6">
        <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center">
          <Icon
            size={21}
            className="text-gray-700"
          />
        </div>

        <div>
          <h2 className="font-bold text-lg text-gray-900">
            {title}
          </h2>

          <p className="text-sm text-gray-500 mt-0.5">
            {description}
          </p>
        </div>
      </div>
    );
  };

  // =====================================================
  // MAIN
  // =====================================================

  return (
    <div className="min-h-screen bg-[#FAF9F7]">
      <Sidebar />

      <div className="ml-72 min-h-screen">
        <Topbar />

        <main className="p-10 max-w-[1500px]">
          {/* =====================================================
              HEADER
          ===================================================== */}

          <div className="mb-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-yellow-100 flex items-center justify-center">
                  <SettingsIcon
                    size={27}
                    className="text-yellow-600"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-3">
                    <h1 className="text-4xl font-black tracking-tight text-gray-950">
                      Settings
                    </h1>

                    <span className="px-3 py-1 rounded-full bg-black text-white text-[10px] uppercase tracking-wider font-bold">
                      Preferences
                    </span>
                  </div>

                  <p className="text-gray-500 mt-2">
                    Manage your StyleAI preferences,
                    privacy and account.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* =====================================================
              SETTINGS CONTAINER
          ===================================================== */}

          <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden">
            {/* =====================================================
                ACCOUNT
            ===================================================== */}

            <section className="p-8 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <SectionHeader
                  icon={User}
                  title="Account"
                  description="Manage your account information."
                />

                <button
                  type="button"
                  onClick={() =>
                    navigate("/profile")
                  }
                  className="
                    flex items-center gap-2
                    px-5 py-3
                    rounded-xl
                    bg-black text-white
                    font-semibold text-sm
                    hover:bg-yellow-500
                    hover:text-black
                    transition-all duration-200
                  "
                >
                  View Profile
                  <ChevronRight size={16} />
                </button>
              </div>

              <div className="mt-6 p-5 rounded-2xl bg-gray-50 border border-gray-100 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center">
                  <Sparkles
                    size={21}
                    className="text-black"
                  />
                </div>

                <div>
                  <p className="font-bold text-gray-900">
                    Your style profile powers your AI
                    recommendations.
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    Keep your profile updated so
                    StyleAI can create more relevant
                    outfit suggestions.
                  </p>
                </div>
              </div>
            </section>

            {/* =====================================================
                NOTIFICATIONS
            ===================================================== */}

            <section className="p-8 border-b border-gray-100">
              <SectionHeader
                icon={Bell}
                title="Notifications"
                description="Choose what StyleAI should notify you about."
              />

              <div className="divide-y divide-gray-100">
                <NotificationToggle
                  name="recommendations"
                  title="Outfit recommendations"
                  description="Receive notifications about new outfit recommendations."
                />

                <NotificationToggle
                  name="tips"
                  title="Style tips"
                  description="Get useful fashion and styling tips."
                />

                <NotificationToggle
                  name="reminders"
                  title="Wardrobe reminders"
                  description="Receive reminders about your wardrobe and saved outfits."
                />
              </div>
            </section>

            {/* =====================================================
                APPEARANCE
            ===================================================== */}

            <section className="p-8 border-b border-gray-100">
              <SectionHeader
                icon={Palette}
                title="Appearance"
                description="Customize the visual experience of StyleAI."
              />

              <div className="grid grid-cols-3 gap-5">
                <ThemeOption
                  value="light"
                  title="Light"
                  description="Bright and clean"
                  icon={Sun}
                />

                <ThemeOption
                  value="dark"
                  title="Dark"
                  description="Easy on the eyes"
                  icon={Moon}
                />

                <ThemeOption
                  value="system"
                  title="System"
                  description="Follow your device"
                  icon={Monitor}
                />
              </div>
            </section>

            {/* =====================================================
                PRIVACY & SECURITY
            ===================================================== */}

            <section className="p-8 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <SectionHeader
                  icon={Shield}
                  title="Privacy & Security"
                  description="Manage your privacy and account security."
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowSecurity(
                      !showSecurity
                    )
                  }
                  className="
                    flex items-center gap-2
                    px-5 py-3
                    rounded-xl
                    bg-black text-white
                    font-semibold text-sm
                    hover:bg-yellow-500
                    hover:text-black
                    transition-all duration-200
                  "
                >
                  {showSecurity
                    ? "Hide"
                    : "Manage"}

                  <ChevronRight
                    size={16}
                    className={`
                      transition-transform
                      ${
                        showSecurity
                          ? "rotate-90"
                          : ""
                      }
                    `}
                  />
                </button>
              </div>

              {showSecurity && (
                <div className="mt-7 space-y-4">
                  {/* Security status */}

                  <div className="p-5 rounded-2xl bg-green-50 border border-green-200">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                        <Shield
                          size={20}
                          className="text-green-600"
                        />
                      </div>

                      <div>
                        <h3 className="font-bold text-green-800">
                          Account secured
                        </h3>

                        <p className="text-sm text-green-700 mt-1">
                          Your account uses secure
                          password hashing and JWT
                          authentication.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Change password */}

                  <button
                    type="button"
                    onClick={() =>
                      toast(
                        "Password change requires the security backend endpoint."
                      )
                    }
                    className="
                      w-full
                      flex items-center justify-between
                      p-5
                      rounded-2xl
                      border border-gray-200
                      hover:border-gray-300
                      hover:bg-gray-50
                      transition-all duration-200
                    "
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                        <Lock
                          size={19}
                          className="text-gray-600"
                        />
                      </div>

                      <div className="text-left">
                        <h3 className="font-bold text-gray-900">
                          Change Password
                        </h3>

                        <p className="text-sm text-gray-500 mt-1">
                          Update your account
                          password.
                        </p>
                      </div>
                    </div>

                    <ChevronRight
                      size={18}
                      className="text-gray-400"
                    />
                  </button>

                  {/* Privacy */}

                  <button
                    type="button"
                    onClick={() =>
                      setShowPrivacy(
                        !showPrivacy
                      )
                    }
                    className="
                      w-full
                      flex items-center justify-between
                      p-5
                      rounded-2xl
                      border border-gray-200
                      hover:border-gray-300
                      hover:bg-gray-50
                      transition-all duration-200
                    "
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                        <Eye
                          size={19}
                          className="text-gray-600"
                        />
                      </div>

                      <div className="text-left">
                        <h3 className="font-bold text-gray-900">
                          Your Privacy
                        </h3>

                        <p className="text-sm text-gray-500 mt-1">
                          See what information
                          StyleAI stores.
                        </p>
                      </div>
                    </div>

                    <ChevronRight
                      size={18}
                      className={`
                        text-gray-400
                        transition-transform
                        ${
                          showPrivacy
                            ? "rotate-90"
                            : ""
                        }
                      `}
                    />
                  </button>

                  {showPrivacy && (
                    <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center shrink-0">
                          <Database
                            size={19}
                            className="text-gray-500"
                          />
                        </div>

                        <div>
                          <h3 className="font-bold text-gray-900">
                            Information stored by
                            StyleAI
                          </h3>

                          <ul className="mt-4 space-y-3 text-sm text-gray-600">
                            <li>
                              • Your name and email
                              address
                            </li>

                            <li>
                              • Your style profile
                              information
                            </li>

                            <li>
                              • Your profile photo
                            </li>

                            <li>
                              • Wardrobe items you
                              upload
                            </li>

                            <li>
                              • Favorite outfits
                            </li>

                            <li>
                              • Outfit recommendation
                              history
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Danger zone */}

                  <div className="mt-6 p-6 rounded-2xl border border-red-200 bg-red-50">
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl bg-red-100 flex items-center justify-center shrink-0">
                        <AlertTriangle
                          size={20}
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex-1">
                        <h3 className="font-bold text-red-700">
                          Danger Zone
                        </h3>

                        <p className="text-sm text-red-600 mt-1 max-w-2xl">
                          Permanently delete your
                          StyleAI account and all
                          associated data.
                        </p>

                        <button
                          type="button"
                          onClick={() =>
                            setShowDeleteConfirm(
                              true
                            )
                          }
                          className="
                            mt-5
                            flex items-center gap-2
                            px-5 py-3
                            rounded-xl
                            bg-red-500 text-white
                            font-semibold
                            hover:bg-red-600
                            transition-all duration-200
                          "
                        >
                          <Trash2 size={17} />
                          Delete Account
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* =====================================================
                LOGOUT
            ===================================================== */}

            <section className="p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-bold text-gray-900">
                    Sign out
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Sign out of your current StyleAI
                    session.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="
                    flex items-center gap-2
                    px-5 py-3
                    rounded-xl
                    border border-red-200
                    text-red-500
                    font-semibold
                    hover:bg-red-50
                    hover:border-red-300
                    transition-all duration-200
                  "
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            </section>
          </div>

          {/* =====================================================
              FOOTER
          ===================================================== */}

          <div className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-400">
            <Sparkles size={14} />
            <span>StyleAI · Personal AI Stylist</span>
          </div>
        </main>
      </div>

      {/* =====================================================
          DELETE CONFIRMATION MODAL
      ===================================================== */}

      {showDeleteConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="w-full max-w-md bg-white rounded-[28px] p-8 shadow-2xl">
            <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center">
              <Trash2
                size={25}
                className="text-red-500"
              />
            </div>

            <h2 className="text-2xl font-black text-gray-950 mt-6">
              Delete your account?
            </h2>

            <p className="text-gray-500 mt-3 leading-6">
              This action cannot be undone. Your
              account, wardrobe, profile and
              associated StyleAI data will be
              permanently deleted.
            </p>

            <div className="mt-6 p-4 rounded-2xl bg-red-50 border border-red-100">
              <div className="flex items-start gap-3">
                <AlertTriangle
                  size={18}
                  className="text-red-500 mt-0.5 shrink-0"
                />

                <p className="text-sm text-red-600 leading-5">
                  Once deleted, your account and
                  associated data cannot be
                  recovered.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-7">
              <button
                type="button"
                onClick={() =>
                  setShowDeleteConfirm(false)
                }
                className="
                  px-5 py-3
                  rounded-xl
                  border border-gray-300
                  font-semibold
                  text-gray-700
                  hover:bg-gray-100
                  transition
                "
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDeleteAccount}
                className="
                  px-5 py-3
                  rounded-xl
                  bg-red-500 text-white
                  font-semibold
                  hover:bg-red-600
                  transition
                "
              >
                Yes, Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
