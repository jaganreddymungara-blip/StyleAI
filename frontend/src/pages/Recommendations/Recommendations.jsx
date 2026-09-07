import { useState } from "react";
import {
  Sparkles,
  RefreshCw,
  Shirt,
  CalendarDays,
  Palette,
  Briefcase,
  AlertCircle,
  WandSparkles,
  Check,
} from "lucide-react";
import toast from "react-hot-toast";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";

const API_URL = "http://127.0.0.1:8000";

const occasions = [
  "college",
  "casual",
  "office",
  "party",
  "travel",
  "wedding",
  "date",
  "gym",
];

const seasons = [
  "summer",
  "winter",
  "spring",
  "autumn",
  "all season",
];

const styles = [
  "smart casual",
  "casual",
  "formal",
  "streetwear",
  "minimal",
  "classic",
  "sporty",
  "trendy",
];

const colors = [
  "Any",
  "black",
  "white",
  "blue",
  "grey",
  "brown",
  "green",
  "red",
  "yellow",
];

const preferenceConfig = [
  {
    key: "occasion",
    label: "Occasion",
    icon: Briefcase,
    options: occasions,
  },
  {
    key: "season",
    label: "Season",
    icon: CalendarDays,
    options: seasons,
  },
  {
    key: "style",
    label: "Style",
    icon: Shirt,
    options: styles,
  },
  {
    key: "color",
    label: "Preferred Color",
    icon: Palette,
    options: colors,
  },
];

export default function Recommendations() {
  const [occasion, setOccasion] = useState("college");
  const [season, setSeason] = useState("summer");
  const [style, setStyle] = useState("smart casual");
  const [color, setColor] = useState("Any");

  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const preferences = {
    occasion,
    season,
    style,
    color,
  };

  const setPreference = (key, value) => {
    const setters = {
      occasion: setOccasion,
      season: setSeason,
      style: setStyle,
      color: setColor,
    };

    setters[key](value);
  };

  const generateOutfit = async () => {
    setErrorMessage("");

    const userEmail = localStorage.getItem("userEmail");

    if (!userEmail) {
      const message = "Your session has expired. Please log in again.";
      setErrorMessage(message);
      toast.error(message);
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/api/stylist/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_email: userEmail,
          occasion,
          season,
          style,
          color,
        }),
      });

      let data;

      try {
        data = await response.json();
      } catch {
        throw new Error("The stylist server returned an invalid response.");
      }

      if (!response.ok) {
        throw new Error(
          data?.detail || "Failed to generate your outfit."
        );
      }

      if (!data?.recommendation) {
        throw new Error(
          "The AI stylist did not return a usable recommendation."
        );
      }

      setRecommendation(data.recommendation);

      toast.success("Your AI outfit is ready!");
    } catch (error) {
      console.error("Stylist error:", error);

      const message =
        error?.message ||
        "Something went wrong while creating your outfit.";

      setErrorMessage(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f7f4]">
      <Sidebar />

      <div className="ml-72 min-h-screen">
        <Topbar />

        <main className="p-6 lg:p-10 max-w-[1600px]">

          {/* ================================================= */}
          {/* PAGE HEADER */}
          {/* ================================================= */}

          <section className="mb-10">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">

              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-100 text-yellow-800 text-xs font-bold uppercase tracking-wider">
                  <Sparkles size={14} />
                  AI Powered Styling
                </div>

                <h1 className="text-4xl lg:text-5xl font-black tracking-tight text-gray-900 mt-4">
                  AI Stylist
                </h1>

                <p className="text-gray-500 text-lg mt-3 max-w-2xl leading-7">
                  Tell StyleAI what you're dressing for and we'll create
                  a complete look using the clothes already in your wardrobe.
                </p>
              </div>

              <div className="hidden lg:flex items-center gap-3 text-sm text-gray-400">
                <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center">
                  <WandSparkles size={18} className="text-yellow-600" />
                </div>

                <div>
                  <p className="font-semibold text-gray-700">
                    Your wardrobe
                  </p>
                  <p>Styled intelligently</p>
                </div>
              </div>

            </div>
          </section>


          {/* ================================================= */}
          {/* PREFERENCES */}
          {/* ================================================= */}

          <section className="bg-white rounded-[28px] border border-gray-100 shadow-sm overflow-hidden">

            <div className="p-6 lg:p-8 border-b border-gray-100">

              <div className="flex items-start gap-4">

                <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center shrink-0">
                  <Sparkles size={22} />
                </div>

                <div>
                  <h2 className="text-2xl font-black text-gray-900">
                    Create your look
                  </h2>

                  <p className="text-gray-500 mt-1">
                    Choose your preferences and let StyleAI handle the
                    outfit combination.
                  </p>
                </div>

              </div>

            </div>


            <div className="p-6 lg:p-8">

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {preferenceConfig.map((preference) => {
                  const Icon = preference.icon;
                  const selectedValue = preferences[preference.key];

                  return (
                    <div
                      key={preference.key}
                      className="rounded-2xl border border-gray-200 p-5 hover:border-gray-300 transition"
                    >

                      <div className="flex items-center gap-3 mb-4">

                        <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center">
                          <Icon size={17} className="text-gray-700" />
                        </div>

                        <div>
                          <p className="font-bold text-gray-900">
                            {preference.label}
                          </p>

                          <p className="text-xs text-gray-400 mt-0.5">
                            Choose one
                          </p>
                        </div>

                      </div>


                      <div className="flex flex-wrap gap-2">

                        {preference.options.map((option) => {
                          const active =
                            selectedValue === option;

                          return (
                            <button
                              key={option}
                              type="button"
                              onClick={() =>
                                setPreference(
                                  preference.key,
                                  option
                                )
                              }
                              className={`
                                inline-flex
                                items-center
                                gap-2
                                px-4
                                py-2.5
                                rounded-xl
                                text-sm
                                font-semibold
                                capitalize
                                border
                                transition-all
                                duration-200
                                ${
                                  active
                                    ? "bg-black text-white border-black shadow-md"
                                    : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                                }
                              `}
                            >
                              {active && (
                                <Check size={14} />
                              )}

                              {option}
                            </button>
                          );
                        })}

                      </div>

                    </div>
                  );
                })}

              </div>


              {/* ================================================= */}
              {/* ERROR */}
              {/* ================================================= */}

              {errorMessage && (
                <div className="mt-6 p-5 rounded-2xl bg-red-50 border border-red-100 flex items-start gap-3 text-red-700">

                  <div className="w-9 h-9 rounded-xl bg-red-100 flex items-center justify-center shrink-0">
                    <AlertCircle size={18} />
                  </div>

                  <div>
                    <p className="font-bold">
                      Couldn't create your outfit
                    </p>

                    <p className="text-sm mt-1 leading-6">
                      {errorMessage}
                    </p>
                  </div>

                </div>
              )}


              {/* ================================================= */}
              {/* GENERATE */}
              {/* ================================================= */}

              <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

                <div>
                  <p className="font-bold text-gray-900">
                    Ready to get styled?
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    StyleAI will select suitable pieces from your wardrobe.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={generateOutfit}
                  disabled={loading}
                  className="
                    w-full
                    sm:w-auto
                    min-w-[210px]
                    px-7
                    py-4
                    rounded-2xl
                    bg-black
                    text-white
                    font-bold
                    flex
                    items-center
                    justify-center
                    gap-3
                    hover:bg-yellow-500
                    hover:text-black
                    transition-all
                    duration-200
                    disabled:opacity-60
                    disabled:cursor-not-allowed
                  "
                >
                  {loading ? (
                    <>
                      <RefreshCw
                        size={19}
                        className="animate-spin"
                      />
                      Styling your wardrobe...
                    </>
                  ) : (
                    <>
                      <Sparkles size={19} />
                      Generate My Outfit
                    </>
                  )}
                </button>

              </div>

            </div>

          </section>


          {/* ================================================= */}
          {/* LOADING STATE */}
          {/* ================================================= */}

          {loading && (
            <section className="mt-8 bg-black rounded-[28px] p-10 text-white text-center">

              <div className="w-16 h-16 mx-auto rounded-2xl bg-yellow-500 text-black flex items-center justify-center">
                <Sparkles
                  size={30}
                  className="animate-pulse"
                />
              </div>

              <h2 className="text-2xl font-black mt-5">
                Creating your look
              </h2>

              <p className="text-gray-400 mt-2">
                StyleAI is finding the best combination in your wardrobe...
              </p>

              <div className="mt-6 flex justify-center gap-1.5">
                <span className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" />
                <span
                  className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce"
                  style={{ animationDelay: "120ms" }}
                />
                <span
                  className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce"
                  style={{ animationDelay: "240ms" }}
                />
              </div>

            </section>
          )}


          {/* ================================================= */}
          {/* RECOMMENDATION */}
          {/* ================================================= */}

          {recommendation && !loading && (
            <section className="mt-8 bg-white rounded-[28px] border border-gray-100 shadow-sm overflow-hidden">

              {/* Recommendation header */}

              <div className="p-6 lg:p-8 border-b border-gray-100">

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                  <div>

                    <p className="text-xs uppercase tracking-[0.2em] text-gray-400 font-bold">
                      Your Personalized Look
                    </p>

                    <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mt-2 capitalize">
                      {recommendation.style || "Personalized Outfit"}
                    </h2>

                    <p className="text-gray-500 mt-2">
                      Built from pieces in your wardrobe
                    </p>

                  </div>


                  <div className="flex items-center gap-3">

                    <div className="px-4 py-2.5 rounded-full bg-yellow-100 text-yellow-800 font-bold text-sm flex items-center gap-2">
                      <Sparkles size={15} />
                      Gemini Styled
                    </div>

                    {recommendation.outfit?.length > 0 && (
                      <div className="px-4 py-2.5 rounded-full bg-gray-100 text-gray-700 font-semibold text-sm">
                        {recommendation.outfit.length}{" "}
                        {recommendation.outfit.length === 1
                          ? "piece"
                          : "pieces"}
                      </div>
                    )}

                  </div>

                </div>

              </div>


              {/* Clothing items */}

              {recommendation.outfit?.length > 0 ? (
                <div className="p-6 lg:p-8">

                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

                    {recommendation.outfit.map((item, index) => {

                      const imageUrl = item.image
                        ? `${API_URL}/uploads/${item.image}`
                        : null;

                      return (
                        <div
                          key={item._id || index}
                          className="
                            group
                            overflow-hidden
                            rounded-2xl
                            border
                            border-gray-100
                            bg-white
                            hover:shadow-xl
                            hover:-translate-y-1
                            transition-all
                            duration-300
                          "
                        >

                          <div className="relative h-80 bg-gray-100 overflow-hidden">

                            {imageUrl ? (
                              <img
                                src={imageUrl}
                                alt={
                                  item.category ||
                                  "Clothing item"
                                }
                                className="
                                  w-full
                                  h-full
                                  object-cover
                                  group-hover:scale-105
                                  transition-transform
                                  duration-500
                                "
                                onError={(event) => {
                                  event.currentTarget.style.display =
                                    "none";
                                }}
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Shirt
                                  size={42}
                                  className="text-gray-300"
                                />
                              </div>
                            )}

                            {item.role && (
                              <span className="
                                absolute
                                top-4
                                left-4
                                px-3
                                py-1.5
                                rounded-full
                                bg-white/95
                                backdrop-blur
                                text-gray-800
                                text-xs
                                font-bold
                                capitalize
                                shadow-sm
                              ">
                                {item.role}
                              </span>
                            )}

                          </div>


                          <div className="p-5">

                            <div className="flex items-start justify-between gap-3">

                              <div className="min-w-0">

                                <h3 className="text-lg font-black text-gray-900 capitalize truncate">
                                  {item.brand || "No brand"}
                                </h3>

                                <p className="text-gray-500 text-sm capitalize mt-1">
                                  {item.category || "Clothing"}
                                </p>

                              </div>

                            </div>


                            <div className="flex flex-wrap gap-2 mt-4">

                              {item.color && (
                                <span className="px-3 py-1.5 rounded-full bg-gray-100 text-gray-600 text-xs font-semibold capitalize">
                                  {item.color}
                                </span>
                              )}

                              {item.season && (
                                <span className="px-3 py-1.5 rounded-full bg-yellow-100 text-yellow-800 text-xs font-semibold capitalize">
                                  {item.season}
                                </span>
                              )}

                              {item.occasion && (
                                <span className="px-3 py-1.5 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold capitalize">
                                  {item.occasion}
                                </span>
                              )}

                            </div>

                          </div>

                        </div>
                      );
                    })}

                  </div>


                  {/* ================================================= */}
                  {/* AI EXPLANATION */}
                  {/* ================================================= */}

                  {recommendation.reason && (
                    <div className="mt-8 rounded-2xl bg-[#f8f7f4] border border-gray-100 p-6 lg:p-7">

                      <div className="flex items-center gap-3">

                        <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center">
                          <Sparkles size={18} />
                        </div>

                        <div>
                          <p className="text-xs uppercase tracking-widest text-gray-400 font-bold">
                            Style insight
                          </p>

                          <h3 className="font-black text-lg text-gray-900">
                            Why this outfit works
                          </h3>
                        </div>

                      </div>

                      <p className="text-gray-600 mt-4 leading-7">
                        {recommendation.reason}
                      </p>

                    </div>
                  )}


                  {/* ================================================= */}
                  {/* GENERATE AGAIN */}
                  {/* ================================================= */}

                  <div className="mt-8 flex justify-center">

                    <button
                      type="button"
                      onClick={generateOutfit}
                      disabled={loading}
                      className="
                        px-6
                        py-3
                        rounded-xl
                        border
                        border-gray-200
                        text-gray-700
                        font-semibold
                        flex
                        items-center
                        gap-2
                        hover:bg-black
                        hover:text-white
                        hover:border-black
                        transition-all
                        duration-200
                      "
                    >
                      <RefreshCw size={17} />
                      Generate Another Look
                    </button>

                  </div>

                </div>
              ) : (
                <div className="p-12 text-center">

                  <div className="w-16 h-16 mx-auto rounded-2xl bg-yellow-100 flex items-center justify-center">
                    <Shirt
                      size={30}
                      className="text-yellow-600"
                    />
                  </div>

                  <h3 className="text-xl font-black mt-5">
                    We couldn't build this look
                  </h3>

                  <p className="text-gray-500 mt-2 max-w-md mx-auto">
                    There aren't enough suitable pieces in your wardrobe
                    for these preferences. Try changing your occasion,
                    style, season, or color.
                  </p>

                </div>
              )}

            </section>
          )}


          {/* ================================================= */}
          {/* EMPTY STATE */}
          {/* ================================================= */}

          {!recommendation && !loading && (
            <section className="mt-8 bg-black rounded-[28px] overflow-hidden relative">

              <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-yellow-500/10 blur-3xl" />
              <div className="absolute -bottom-32 -left-20 w-72 h-72 rounded-full bg-yellow-500/5 blur-3xl" />

              <div className="relative p-10 lg:p-14 text-center text-white">

                <div className="w-20 h-20 mx-auto rounded-3xl bg-yellow-500 text-black flex items-center justify-center shadow-xl">
                  <Sparkles size={34} />
                </div>

                <p className="text-yellow-400 text-xs uppercase tracking-[0.2em] font-bold mt-7">
                  Your personal stylist
                </p>

                <h2 className="text-3xl lg:text-4xl font-black mt-3">
                  Your next outfit is one click away.
                </h2>

                <p className="text-gray-400 mt-4 max-w-xl mx-auto leading-7">
                  Choose your preferences above and StyleAI will combine
                  pieces from your own wardrobe into a look designed for
                  the occasion.
                </p>

              </div>

            </section>
          )}

        </main>
      </div>
    </div>
  );
}

