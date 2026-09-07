import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Heart, Trash2, Shirt, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";

import {
  getWardrobe,
  toggleFavorite,
} from "../../services/wardrobeService";

const API_URL = "http://127.0.0.1:8000";

export default function Favorites() {
  const navigate = useNavigate();

  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      setLoading(true);

      const wardrobe = await getWardrobe();

      const favoriteItems = Array.isArray(wardrobe)
        ? wardrobe.filter((item) => item.favorite === true)
        : [];

      setFavorites(favoriteItems);
    } catch (error) {
      console.error("Favorites error:", error);

      toast.error("Unable to load favorites.");
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = async (itemId) => {
    try {
      setRemovingId(itemId);

      await toggleFavorite(itemId);

      setFavorites((current) =>
        current.filter((item) => item._id !== itemId)
      );

      toast.success("Removed from favorites");
    } catch (error) {
      console.error("Remove favorite error:", error);

      toast.error("Unable to update favorite.");
    } finally {
      setRemovingId(null);
    }
  };

  const getImageUrl = (image) => {
    if (!image) return "";

    if (image.startsWith("http")) {
      return image;
    }

    return `${API_URL}/uploads/${image}`;
  };

  return (
    <div className="min-h-screen bg-[#FAF9F7]">

      <Sidebar />

      <div className="ml-72 min-h-screen">

        <Topbar />

        <motion.main
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
          }}
          className="p-10"
        >

          {/* Header */}

          <div className="flex items-center justify-between mb-10">

            <div>

              <div className="flex items-center gap-3">

                <div className="w-12 h-12 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center">
                  <Heart size={25} fill="currentColor" />
                </div>

                <h1 className="text-4xl font-black text-gray-900">
                  Favorites
                </h1>

              </div>

              <p className="text-gray-500 mt-3">
                Your favorite pieces, ready to inspire your next outfit.
              </p>

            </div>

            <div className="bg-white px-5 py-3 rounded-2xl shadow-sm">
              <span className="text-gray-500">
                Favorite items
              </span>

              <span className="ml-2 font-bold text-gray-900">
                {loading ? "..." : favorites.length}
              </span>
            </div>

          </div>

          {/* Loading */}

          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="bg-white rounded-3xl overflow-hidden animate-pulse"
                >
                  <div className="h-72 bg-gray-200" />

                  <div className="p-5 space-y-3">

                    <div className="h-5 bg-gray-200 rounded w-2/3" />

                    <div className="h-4 bg-gray-200 rounded w-1/2" />

                    <div className="h-10 bg-gray-200 rounded-xl" />

                  </div>
                </div>
              ))}

            </div>
          )}

          {/* Empty state */}

          {!loading && favorites.length === 0 && (

            <div className="bg-white rounded-3xl p-16 text-center shadow-sm">

              <div className="w-20 h-20 mx-auto rounded-full bg-pink-100 text-pink-500 flex items-center justify-center">
                <Heart size={38} />
              </div>

              <h2 className="text-2xl font-black mt-6">
                No favorites yet
              </h2>

              <p className="text-gray-500 mt-3 max-w-md mx-auto">
                Start adding your favorite clothing pieces from your wardrobe.
                They'll appear here so you can quickly find them later.
              </p>

              <button
                onClick={() => navigate("/wardrobe")}
                className="mt-8 bg-black text-white px-7 py-3 rounded-xl font-semibold hover:bg-yellow-500 hover:text-black transition flex items-center gap-2 mx-auto"
              >
                <Shirt size={19} />
                Go to Wardrobe
              </button>

            </div>

          )}

          {/* Favorites grid */}

          {!loading && favorites.length > 0 && (

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

              {favorites.map((item, index) => (
                <motion.div
                  key={item._id}
                  initial={{
                    opacity: 0,
                    y: 25,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.06,
                    ease: "easeOut",
                  }}
                  className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
                >

                  {/* Image */}

                  <div className="relative h-72 bg-gray-100 overflow-hidden">

                    {item.image ? (
                      <img
                        src={getImageUrl(item.image)}
                        alt={item.category || "Clothing"}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <Shirt size={50} />
                      </div>
                    )}

                    {/* Favorite button */}

                    <button
                      onClick={() => removeFavorite(item._id)}
                      disabled={removingId === item._id}
                      className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/95 backdrop-blur flex items-center justify-center text-pink-500 shadow-lg hover:bg-pink-500 hover:text-white transition"
                      title="Remove from favorites"
                    >
                      {removingId === item._id ? (
                        <div className="w-5 h-5 border-2 border-pink-500 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Heart size={21} fill="currentColor" />
                      )}
                    </button>

                  </div>

                  {/* Information */}

                  <div className="p-5">

                    <div className="flex items-start justify-between gap-3">

                      <div>

                        <h2 className="text-xl font-bold capitalize">
                          {item.category || "Clothing"}
                        </h2>

                        {item.brand && (
                          <p className="text-gray-500 mt-1">
                            {item.brand}
                          </p>
                        )}

                      </div>

                      {item.color && (
                        <span className="text-xs font-semibold bg-gray-100 px-3 py-1.5 rounded-full capitalize">
                          {item.color}
                        </span>
                      )}

                    </div>

                    {/* Details */}

                    <div className="flex flex-wrap gap-2 mt-4">

                      {item.season && (
                        <span className="text-xs bg-yellow-100 text-yellow-700 px-3 py-1.5 rounded-full capitalize">
                          {item.season}
                        </span>
                      )}

                      {item.occasion && (
                        <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full capitalize">
                          {item.occasion}
                        </span>
                      )}

                    </div>

                    {/* Remove */}

                    <button
                      onClick={() => removeFavorite(item._id)}
                      disabled={removingId === item._id}
                      className="w-full mt-5 h-11 rounded-xl border border-gray-200 text-gray-600 font-medium flex items-center justify-center gap-2 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition"
                    >
                      <Trash2 size={17} />

                      {removingId === item._id
                        ? "Removing..."
                        : "Remove Favorite"}
                    </button>

                  </div>

                </motion.div>

              ))}

            </div>

          )}

          {/* Back */}

          <button
            onClick={() => navigate("/wardrobe")}
            className="mt-10 text-gray-500 hover:text-black flex items-center gap-2 transition"
          >
            <ArrowLeft size={18} />
            Back to Wardrobe
          </button>

        </motion.main>

      </div>

    </div>
  );
}