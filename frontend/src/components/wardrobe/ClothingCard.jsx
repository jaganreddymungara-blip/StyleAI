import { useState } from "react";
import {
Heart,
Pencil,
Trash2,
Tag,
} from "lucide-react";
import toast from "react-hot-toast";

import {
deleteClothing,
toggleFavorite,
} from "../../services/wardrobeService";

import EditClothingModal from "./EditClothingModal";

const API_URL = "http://127.0.0.1:8000";

export default function ClothingCard({
item,
onDelete,
refreshWardrobe,
}) {
const [editOpen, setEditOpen] = useState(false);
const [favorite, setFavorite] = useState(
item.favorite || false
);

const [imageError, setImageError] = useState(false);
const [deleting, setDeleting] = useState(false);

// =====================================================
// FAVORITE
// =====================================================

const handleFavorite = async () => {
try {
const result = await toggleFavorite(item._id);


  setFavorite(result.favorite);

  if (result.favorite) {
    toast.success("Added to favorites ❤️");
  } else {
    toast.success("Removed from favorites");
  }
} catch (error) {
  console.error(error);

  toast.error(
    "Failed to update favorite status."
  );
}


};

// =====================================================
// DELETE
// =====================================================

const handleDelete = async () => {
const confirmed = window.confirm(
"Are you sure you want to delete this clothing item?"
);


if (!confirmed) return;

try {
  setDeleting(true);

  await deleteClothing(item._id);

  toast.success(
    "Clothing item deleted successfully."
  );

  onDelete(item._id);
} catch (error) {
  console.error(error);

  toast.error(
    "Failed to delete clothing."
  );

  setDeleting(false);
}

};

// =====================================================
// IMAGE
// =====================================================

const imageUrl = item.image
? `${API_URL}/uploads/${item.image}`
: null;

return (
<> <article
     className="
       group
       bg-white
       rounded-[28px]
       overflow-hidden
       border
       border-gray-200/80
       shadow-sm
       hover:shadow-2xl
       hover:-translate-y-1
       transition-all
       duration-300
     "
   >


    {/* ================================================= */}
    {/* IMAGE */}
    {/* ================================================= */}

    <div
      className="
        relative
        h-72
        bg-gray-100
        overflow-hidden
      "
    >

      {imageUrl && !imageError ? (

        <img
          src={imageUrl}
          alt={
            item.brand ||
            item.category ||
            "Clothing item"
          }
          onError={() => setImageError(true)}
          className="
            w-full
            h-full
            object-cover
            transition-transform
            duration-700
            ease-out
            group-hover:scale-[1.04]
          "
        />

      ) : (

        <div
          className="
            w-full
            h-full
            flex
            flex-col
            items-center
            justify-center
            text-gray-400
            bg-gray-50
          "
        >

          <Tag size={32} />

          <p className="text-sm mt-3">
            Image unavailable
          </p>

        </div>

      )}


      {/* Image gradient */}

      <div
        className="
          absolute
          inset-x-0
          bottom-0
          h-28
          bg-gradient-to-t
          from-black/35
          via-black/5
          to-transparent
          pointer-events-none
        "
      />


      {/* ================================================= */}
      {/* FAVORITE BUTTON */}
      {/* ================================================= */}

      <button
        type="button"
        onClick={handleFavorite}
        aria-label={
          favorite
            ? "Remove from favorites"
            : "Add to favorites"
        }
        className="
          absolute
          top-4
          right-4
          w-11
          h-11
          rounded-full
          bg-white/90
          backdrop-blur-md
          flex
          items-center
          justify-center
          shadow-lg
          hover:scale-110
          active:scale-95
          transition-all
          duration-200
        "
      >

        <Heart
          size={20}
          strokeWidth={2}
          className={`
            transition-all
            duration-200
            ${
              favorite
                ? "fill-red-500 text-red-500 scale-105"
                : "text-gray-600 group-hover:text-red-500"
            }
          `}
        />

      </button>


      {/* Favorite badge */}

      {favorite && (

        <div
          className="
            absolute
            bottom-4
            left-4
            px-3
            py-1.5
            rounded-full
            bg-white/90
            backdrop-blur-md
            text-xs
            font-bold
            text-red-500
            shadow-sm
          "
        >
          ♥ Favorite
        </div>

      )}

    </div>


    {/* ================================================= */}
    {/* CONTENT */}
    {/* ================================================= */}

    <div className="p-6">

      {/* Brand + category */}

      <div className="min-w-0">

        <h2
          className="
            text-xl
            font-black
            text-gray-900
            capitalize
            truncate
          "
        >
          {item.brand || "My Clothing"}
        </h2>

        <p className="text-sm text-gray-500 capitalize mt-1">
          {item.category || "Clothing"}
        </p>

      </div>


      {/* ================================================= */}
      {/* METADATA */}
      {/* ================================================= */}

      <div className="flex flex-wrap gap-2 mt-5">

        {item.color && (
          <span
            className="
              px-3
              py-1.5
              rounded-full
              bg-gray-100
              text-gray-700
              text-xs
              font-semibold
              capitalize
            "
          >
            {item.color}
          </span>
        )}

        {item.season && (
          <span
            className="
              px-3
              py-1.5
              rounded-full
              bg-yellow-50
              text-yellow-700
              text-xs
              font-semibold
              capitalize
            "
          >
            {item.season}
          </span>
        )}

        {item.occasion && (
          <span
            className="
              px-3
              py-1.5
              rounded-full
              bg-blue-50
              text-blue-700
              text-xs
              font-semibold
              capitalize
            "
          >
            {item.occasion}
          </span>
        )}

      </div>


      {/* ================================================= */}
      {/* ACTIONS */}
      {/* ================================================= */}

      <div
        className="
          flex
          items-center
          justify-between
          mt-6
          pt-5
          border-t
          border-gray-100
        "
      >

        <button
          type="button"
          onClick={() => setEditOpen(true)}
          className="
            inline-flex
            items-center
            gap-2
            px-4
            py-2.5
            rounded-xl
            bg-gray-100
            text-gray-700
            text-sm
            font-semibold
            hover:bg-black
            hover:text-white
            hover:shadow-md
            transition-all
            duration-200
          "
        >

          <Pencil size={16} />

          Edit

        </button>


        <button
          type="button"
          onClick={handleDelete}
          disabled={deleting}
          aria-label="Delete clothing item"
          className="
            w-10
            h-10
            rounded-xl
            flex
            items-center
            justify-center
            text-gray-400
            hover:bg-red-50
            hover:text-red-500
            hover:scale-105
            transition-all
            duration-200
            disabled:opacity-40
            disabled:cursor-not-allowed
          "
        >

          <Trash2 size={18} />

        </button>

      </div>

    </div>

  </article>


  {/* ================================================= */}
  {/* EDIT MODAL */}
  {/* ================================================= */}

  <EditClothingModal
    open={editOpen}
    onClose={() => setEditOpen(false)}
    clothing={item}
    refreshWardrobe={refreshWardrobe}
  />

</>

);
}
