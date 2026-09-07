import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";

import WardrobeHeader from "../../components/wardrobe/WardrobeHeader";
import SearchBar from "../../components/wardrobe/SearchBar";
import CategoryTabs from "../../components/wardrobe/CategoryTabs";
import ColorFilter from "../../components/wardrobe/ColorFilter";
import UploadButton from "../../components/wardrobe/UploadButton";
import WardrobeGrid from "../../components/wardrobe/WardrobeGrid";

import UploadModal from "../../components/upload/UploadModal";

import { getWardrobe } from "../../services/wardrobeService";

export default function Wardrobe() {
  const [clothes, setClothes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const [search, setSearch] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("All");

  const [selectedColor, setSelectedColor] = useState("All");

  useEffect(() => {
    loadWardrobe();
  }, []);

  const loadWardrobe = async () => {
    try {
      setLoading(true);

      const data = await getWardrobe();

      setClothes(data);
    } catch (err) {
      console.error("Failed to load wardrobe:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    setClothes((prev) =>
      prev.filter((item) => item._id !== id)
    );
  };

  // Search + Category + Favorites + Color Filter
  const filteredClothes = clothes.filter((item) => {
    const query = search.toLowerCase().trim();

    // Search
    const matchesSearch =
      item.brand?.toLowerCase().includes(query) ||
      item.category?.toLowerCase().includes(query) ||
      item.color?.toLowerCase().includes(query);

    // Category / Favorites
    const matchesCategory =
      selectedCategory === "All"
        ? true
        : selectedCategory === "Favorites"
        ? item.favorite === true
        : item.category?.toLowerCase() ===
          selectedCategory.toLowerCase();

    // Color
    const matchesColor =
      selectedColor === "All" ||
      item.color?.toLowerCase() ===
        selectedColor.toLowerCase();

    return (
      matchesSearch &&
      matchesCategory &&
      matchesColor
    );
  });

  return (
    <div className="flex min-h-screen">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="ml-72 flex-1">

        {/* Topbar */}
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

          {/* Wardrobe Header */}
          <WardrobeHeader />

          {/* Search + Upload */}
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mt-8">

            <SearchBar
              search={search}
              setSearch={setSearch}
            />

            <UploadButton
              onClick={() => setIsUploadOpen(true)}
            />

          </div>

          {/* Filters */}
          <div className="mt-6">

            <CategoryTabs
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />

            <ColorFilter
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
            />

          </div>

          {/* Wardrobe Grid */}
          <div className="mt-8">

            <WardrobeGrid
              clothes={filteredClothes}
              loading={loading}
              onDelete={handleDelete}
              refreshWardrobe={loadWardrobe}
            />

          </div>

        </motion.main>

      </div>

      {/* Upload Modal */}
      <UploadModal
        open={isUploadOpen}
        onClose={() => {
          setIsUploadOpen(false);
          loadWardrobe();
        }}
      />

    </div>
  );
}