import { useEffect, useState } from "react";
import {
  History as HistoryIcon,
  Trash2,
  Sparkles,
  Calendar,
  Sun,
  Palette,
  ArrowRight,
  Shirt,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";

const API_URL = "http://127.0.0.1:8000";

export default function History() {
  const navigate = useNavigate();

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [clearing, setClearing] = useState(false);

  useEffect(() => {
    loadHistory();
  }, []);

  const getToken = () => {
    return localStorage.getItem("token");
  };

  const loadHistory = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/api/history/`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to load history");
      }

      const data = await response.json();

      setHistory(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("History error:", error);
      toast.error("Unable to load history.");
    } finally {
      setLoading(false);
    }
  };

  const deleteHistory = async (historyId) => {
    try {
      setDeleting(historyId);

      const response = await fetch(
        `${API_URL}/api/history/${historyId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete history");
      }

      setHistory((current) =>
        current.filter((item) => item._id !== historyId)
      );

      toast.success("Outfit removed from history.");
    } catch (error) {
      console.error("Delete history error:", error);
      toast.error("Unable to delete history.");
    } finally {
      setDeleting(null);
    }
  };

  const clearHistory = async () => {
    if (history.length === 0 || clearing) return;

    const confirmed = window.confirm(
      "Are you sure you want to clear your entire outfit history?"
    );

    if (!confirmed) return;

    try {
      setClearing(true);

      const response = await fetch(`${API_URL}/api/history/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to clear history");
      }

      setHistory([]);

      toast.success("Outfit history cleared.");
    } catch (error) {
      console.error("Clear history error:", error);
      toast.error("Unable to clear history.");
    } finally {
      setClearing(false);
    }
  };

  const getImageUrl = (image) => {
    if (!image) return "";

    if (image.startsWith("http")) {
      return image;
    }

    return `${API_URL}/uploads/${image}`;
  };

  const formatDate = (date) => {
    if (!date) return "";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "";
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatText = (value) => {
    if (!value) return "";

    return value
      .toString()
      .replace(/[-_]/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <div className="min-h-screen bg-[#f8f7f4]">
      <Sidebar />

      <div className="ml-72 min-h-screen">
        <Topbar />

        <main className="p-10">
          {/* ================================================= */}
          {/* HEADER */}
          {/* ================================================= */}

          <section className="mb-10">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-black text-white flex items-center justify-center shadow-lg">
                    <HistoryIcon size={27} />
                  </div>

                  <div>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-gray-400 font-bold">
                      Your Style Archive
                    </p>

                    <h1 className="text-4xl font-black text-gray-900 mt-1">
                      Outfit History
                    </h1>
                  </div>
                </div>

                <p className="text-gray-500 mt-4 max-w-2xl">
                  Revisit the outfits StyleAI created for you and discover
                  looks worth wearing again.
                </p>
              </div>

              {history.length > 0 && (
                <button
                  type="button"
                  onClick={clearHistory}
                  disabled={clearing}
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    px-5
                    py-3
                    rounded-xl
                    border
                    border-red-200
                    bg-white
                    text-red-500
                    font-semibold
                    hover:bg-red-50
                    hover:border-red-300
                    transition
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                  "
                >
                  <Trash2 size={17} />

                  {clearing ? "Clearing..." : "Clear History"}
                </button>
              )}
            </div>

            {/* Stats */}

            {!loading && history.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-7">
                <div className="bg-white border border-gray-100 rounded-xl px-4 py-2.5 shadow-sm">
                  <span className="text-sm text-gray-400">
                    Saved outfits
                  </span>

                  <span className="ml-2 font-bold text-gray-900">
                    {history.length}
                  </span>
                </div>

                <div className="bg-white border border-gray-100 rounded-xl px-4 py-2.5 shadow-sm flex items-center gap-2">
                  <Sparkles size={15} className="text-yellow-500" />

                  <span className="text-sm font-medium text-gray-600">
                    AI Styled
                  </span>
                </div>
              </div>
            )}
          </section>

          {/* ================================================= */}
          {/* LOADING */}
          {/* ================================================= */}

          {loading && (
            <div className="space-y-8">
              {[1, 2].map((item) => (
                <div
                  key={item}
                  className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden animate-pulse"
                >
                  <div className="p-8">
                    <div className="flex justify-between gap-5">
                      <div className="space-y-3 flex-1">
                        <div className="h-7 bg-gray-200 rounded-lg w-56" />
                        <div className="h-4 bg-gray-200 rounded-lg w-full max-w-xl" />
                        <div className="h-4 bg-gray-200 rounded-lg w-3/4" />
                      </div>

                      <div className="w-11 h-11 bg-gray-200 rounded-xl" />
                    </div>

                    <div className="flex gap-3 mt-6">
                      <div className="h-9 w-28 bg-gray-200 rounded-full" />
                      <div className="h-9 w-28 bg-gray-200 rounded-full" />
                      <div className="h-9 w-24 bg-gray-200 rounded-full" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
                      {[1, 2, 3].map((card) => (
                        <div
                          key={card}
                          className="rounded-2xl overflow-hidden border border-gray-100"
                        >
                          <div className="h-56 bg-gray-200" />

                          <div className="p-4 space-y-3">
                            <div className="h-5 bg-gray-200 rounded w-1/2" />
                            <div className="h-4 bg-gray-200 rounded w-1/3" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ================================================= */}
          {/* EMPTY STATE */}
          {/* ================================================= */}

          {!loading && history.length === 0 && (
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-16 text-center">
              <div className="w-24 h-24 mx-auto rounded-3xl bg-yellow-100 text-yellow-600 flex items-center justify-center">
                <Sparkles size={42} />
              </div>

              <p className="text-[11px] uppercase tracking-[0.2em] text-gray-400 font-bold mt-8">
                Your style archive is waiting
              </p>

              <h2 className="text-3xl font-black text-gray-900 mt-2">
                No outfit history yet
              </h2>

              <p className="text-gray-500 mt-3 max-w-md mx-auto leading-7">
                Generate your first personalized outfit with the AI Stylist.
                Every recommendation will be saved here for you to revisit.
              </p>

              <button
                type="button"
                onClick={() => navigate("/recommendations")}
                className="
                  mt-8
                  inline-flex
                  items-center
                  gap-2
                  bg-black
                  text-white
                  px-7
                  py-3.5
                  rounded-xl
                  font-semibold
                  hover:bg-yellow-500
                  hover:text-black
                  transition
                "
              >
                <Sparkles size={18} />
                Create Your First Outfit
                <ArrowRight size={17} />
              </button>
            </div>
          )}

          {/* ================================================= */}
          {/* HISTORY */}
          {/* ================================================= */}

          {!loading && history.length > 0 && (
            <div className="space-y-8">
              {history.map((item, index) => (
                <article
                  key={item._id}
                  className="
                    bg-white
                    rounded-3xl
                    border
                    border-gray-100
                    shadow-sm
                    overflow-hidden
                    hover:shadow-lg
                    transition-shadow
                    duration-300
                  "
                >
                  <div className="p-8">
                    {/* Outfit header */}

                    <div className="flex items-start justify-between gap-5">
                      <div className="min-w-0">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-yellow-100 text-yellow-600 flex items-center justify-center shrink-0">
                            <Sparkles size={18} />
                          </div>

                          <div>
                            <p className="text-[10px] uppercase tracking-[0.18em] text-gray-400 font-bold">
                              Look {history.length - index}
                            </p>

                            <h2 className="text-2xl font-black text-gray-900 capitalize">
                              {formatText(
                                item.style || "Personalized Outfit"
                              )}
                            </h2>
                          </div>
                        </div>

                        {item.reason && (
                          <p className="text-gray-500 mt-4 leading-7 max-w-4xl">
                            {item.reason}
                          </p>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => deleteHistory(item._id)}
                        disabled={deleting === item._id}
                        className="
                          shrink-0
                          w-11
                          h-11
                          rounded-xl
                          border
                          border-gray-200
                          bg-white
                          flex
                          items-center
                          justify-center
                          text-gray-400
                          hover:text-red-500
                          hover:bg-red-50
                          hover:border-red-200
                          transition
                          disabled:opacity-50
                        "
                        title="Delete outfit"
                        aria-label="Delete outfit"
                      >
                        {deleting === item._id ? (
                          <div className="w-5 h-5 border-2 border-gray-200 border-t-red-500 rounded-full animate-spin" />
                        ) : (
                          <Trash2 size={18} />
                        )}
                      </button>
                    </div>

                    {/* Metadata */}

                    <div className="flex flex-wrap gap-2.5 mt-6">
                      {item.occasion && (
                        <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 border border-blue-100 px-3.5 py-2 rounded-full text-xs font-semibold capitalize">
                          <Calendar size={14} />
                          {formatText(item.occasion)}
                        </span>
                      )}

                      {item.season && (
                        <span className="inline-flex items-center gap-2 bg-yellow-50 text-yellow-700 border border-yellow-100 px-3.5 py-2 rounded-full text-xs font-semibold capitalize">
                          <Sun size={14} />
                          {formatText(item.season)}
                        </span>
                      )}

                      {item.color && (
                        <span className="inline-flex items-center gap-2 bg-purple-50 text-purple-700 border border-purple-100 px-3.5 py-2 rounded-full text-xs font-semibold capitalize">
                          <Palette size={14} />
                          {formatText(item.color)}
                        </span>
                      )}

                      {item.created_at && (
                        <span className="inline-flex items-center bg-gray-50 text-gray-500 border border-gray-100 px-3.5 py-2 rounded-full text-xs font-medium">
                          {formatDate(item.created_at)}
                        </span>
                      )}
                    </div>

                    {/* Divider */}

                    <div className="h-px bg-gray-100 my-8" />

                    {/* Outfit */}

                    {item.outfit?.length > 0 ? (
                      <div>
                        <div className="flex items-center justify-between mb-5">
                          <div>
                            <p className="text-[10px] uppercase tracking-[0.18em] text-gray-400 font-bold">
                              Complete look
                            </p>

                            <h3 className="text-lg font-black text-gray-900 mt-1">
                              Pieces in this outfit
                            </h3>
                          </div>

                          <span className="text-sm text-gray-400">
                            {item.outfit.length}{" "}
                            {item.outfit.length === 1 ? "piece" : "pieces"}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                          {item.outfit.map((clothing) => (
                            <div
                              key={clothing._id}
                              className="
                                group
                                border
                                border-gray-100
                                rounded-2xl
                                overflow-hidden
                                bg-white
                                hover:shadow-md
                                transition-all
                                duration-300
                              "
                            >
                              <div className="h-64 bg-gray-100 overflow-hidden">
                                {clothing.image ? (
                                  <img
                                    src={getImageUrl(clothing.image)}
                                    alt={
                                      clothing.category || "Clothing item"
                                    }
                                    className="
                                      w-full
                                      h-full
                                      object-cover
                                      group-hover:scale-105
                                      transition-transform
                                      duration-500
                                    "
                                  />
                                ) : (
                                  <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-2">
                                    <Shirt size={38} />
                                    <span className="text-sm">
                                      No image
                                    </span>
                                  </div>
                                )}
                              </div>

                              <div className="p-5">
                                <div className="flex items-start justify-between gap-3">
                                  <div className="min-w-0">
                                    <h4 className="font-bold text-gray-900 capitalize truncate">
                                      {formatText(
                                        clothing.category || "Clothing"
                                      )}
                                    </h4>

                                    {clothing.brand && (
                                      <p className="text-sm text-gray-500 mt-1 truncate">
                                        {clothing.brand}
                                      </p>
                                    )}
                                  </div>

                                  {clothing.role && (
                                    <span className="shrink-0 text-[10px] uppercase tracking-wider font-bold bg-black text-white px-2.5 py-1.5 rounded-full">
                                      {formatText(clothing.role)}
                                    </span>
                                  )}
                                </div>

                                {clothing.color && (
                                  <div className="flex items-center gap-2 mt-4">
                                    <span className="w-2.5 h-2.5 rounded-full bg-gray-400" />

                                    <span className="text-xs text-gray-500 capitalize">
                                      {formatText(clothing.color)}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="py-10 text-center text-gray-400">
                        <Shirt size={32} className="mx-auto mb-3" />

                        <p className="text-sm">
                          No clothing items found for this outfit.
                        </p>
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}