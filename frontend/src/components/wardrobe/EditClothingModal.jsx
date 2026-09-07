import { useEffect, useState } from "react";
import { X, Pencil, Save } from "lucide-react";
import { updateClothing } from "../../services/wardrobeService";
import toast from "react-hot-toast";

export default function EditClothingModal({
open,
onClose,
clothing,
refreshWardrobe,
}) {
const [formData, setFormData] = useState({
category: "",
brand: "",
color: "",
season: "",
occasion: "",
});

const [loading, setLoading] = useState(false);

useEffect(() => {
if (clothing) {
setFormData({
category: clothing.category || "",
brand: clothing.brand || "",
color: clothing.color || "",
season: clothing.season || "",
occasion: clothing.occasion || "",
});
}
}, [clothing]);

if (!open) return null;

const handleChange = (e) => {
setFormData((previous) => ({
...previous,
[e.target.name]: e.target.value,
}));
};

const handleSave = async () => {
if (loading || !clothing?._id) return;


setLoading(true);

try {
  await updateClothing(clothing._id, formData);

  await refreshWardrobe();

  toast.success("Your clothing item was updated.");

  onClose();
} catch (err) {
  console.error("Update clothing error:", err);

  const message =
    err.response?.data?.detail ||
    err.response?.data?.message ||
    "Failed to update clothing.";

  toast.error(message);
} finally {
  setLoading(false);
}


};

const fieldStyles = `     w-full
    h-12
    rounded-xl
    border
    border-gray-200
    bg-white
    px-4
    text-sm
    text-gray-900
    outline-none
    transition-all
    duration-200
    focus:border-yellow-500
    focus:ring-4
    focus:ring-yellow-500/10
  `;

const labelStyles = `     block
    text-sm
    font-semibold
    text-gray-900
    mb-2
  `;

return ( <div
   className="
     fixed
     inset-0
     z-50
     bg-black/50
     backdrop-blur-sm
     flex
     items-center
     justify-center
     p-4
     sm:p-6
   "
 >


  {/* Modal */}

  <div
    className="
      relative
      w-full
      max-w-2xl
      max-h-[90vh]
      overflow-y-auto
      bg-white
      rounded-[28px]
      shadow-2xl
      border
      border-white/50
    "
  >

    {/* ================================================= */}
    {/* HEADER */}
    {/* ================================================= */}

    <div
      className="
        sticky
        top-0
        z-10
        bg-white/95
        backdrop-blur-md
        border-b
        border-gray-100
        px-6
        sm:px-8
        py-6
      "
    >

      <div className="flex items-start gap-4 pr-12">

        {/* Icon */}

        <div
          className="
            w-12
            h-12
            rounded-2xl
            bg-yellow-100
            text-yellow-700
            flex
            items-center
            justify-center
            shrink-0
          "
        >
          <Pencil size={21} />
        </div>


        {/* Title */}

        <div>

          <p
            className="
              text-[11px]
              uppercase
              tracking-[0.18em]
              text-gray-400
              font-bold
            "
          >
            Wardrobe Editor
          </p>

          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mt-1">
            Edit Clothing
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Update the details of this wardrobe item.
          </p>

        </div>

      </div>


      {/* Close */}

      <button
        type="button"
        onClick={onClose}
        disabled={loading}
        aria-label="Close edit clothing modal"
        className="
          absolute
          top-5
          right-5
          w-10
          h-10
          rounded-full
          flex
          items-center
          justify-center
          text-gray-400
          hover:text-gray-900
          hover:bg-gray-100
          transition-all
          duration-200
          disabled:opacity-40
          disabled:cursor-not-allowed
        "
      >
        <X size={21} />
      </button>

    </div>


    {/* ================================================= */}
    {/* FORM */}
    {/* ================================================= */}

    <div className="px-6 sm:px-8 py-7">

      <div className="space-y-6">

        {/* Category + Brand */}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          {/* Category */}

          <div>

            <label
              htmlFor="edit-category"
              className={labelStyles}
            >
              Category
            </label>

            <select
              id="edit-category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              disabled={loading}
              className={fieldStyles}
            >
              <option value="shirt">Shirt</option>
              <option value="pant">Pant</option>
              <option value="tshirt">T-Shirt</option>
              <option value="jeans">Jeans</option>
              <option value="jacket">Jacket</option>
              <option value="hoodie">Hoodie</option>
              <option value="shoe">Shoes</option>
              <option value="accessory">Accessory</option>
            </select>

          </div>


          {/* Brand */}

          <div>

            <label
              htmlFor="edit-brand"
              className={labelStyles}
            >
              Brand
              <span className="ml-1 font-normal text-gray-400">
                (optional)
              </span>
            </label>

            <input
              id="edit-brand"
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              placeholder="Nike, Zara, H&M..."
              disabled={loading}
              className={fieldStyles}
            />

          </div>

        </div>


        {/* Color */}

        <div>
          <label
            htmlFor="color"
            className={labelStyles}
          >
            Color
          </label>

          <input
            id="color"
            type="text"
            name="color"
            value={formData.color}
            onChange={handleChange}
            placeholder="e.g. navy blue, olive green, cream..."
            className={fieldStyles}
          />

          <p className="mt-2 text-xs text-gray-500">
            Enter the main color of this clothing item.
          </p>
        </div>

        {/* Season + Occasion */}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          {/* Season */}

          <div>

            <label
              htmlFor="edit-season"
              className={labelStyles}
            >
              Season
            </label>

            <select
              id="edit-season"
              name="season"
              value={formData.season}
              onChange={handleChange}
              disabled={loading}
              className={fieldStyles}
            >
              <option value="summer">Summer</option>
              <option value="winter">Winter</option>
              <option value="spring">Spring</option>
              <option value="autumn">Autumn</option>
              <option value="all season">All Season</option>
            </select>

          </div>


          {/* Occasion */}

          <div>

            <label
              htmlFor="edit-occasion"
              className={labelStyles}
            >
              Occasion
            </label>

            <select
              id="edit-occasion"
              name="occasion"
              value={formData.occasion}
              onChange={handleChange}
              disabled={loading}
              className={fieldStyles}
            >
              <option value="casual">Casual</option>
              <option value="college">College</option>
              <option value="office">Office</option>
              <option value="party">Party</option>
              <option value="travel">Travel</option>
              <option value="wedding">Wedding</option>
            </select>

          </div>

        </div>


        {/* Helpful note */}

        <div
          className="
            rounded-xl
            border
            border-yellow-200
            bg-yellow-50
            px-4
            py-3
          "
        >
          <p className="text-xs leading-5 text-yellow-800">
            Keeping these details accurate helps StyleAI create
            better outfit recommendations for you.
          </p>
        </div>

      </div>


      {/* ================================================= */}
      {/* ACTIONS */}
      {/* ================================================= */}

      <div
        className="
          flex
          flex-col-reverse
          sm:flex-row
          sm:justify-end
          gap-3
          mt-8
          pt-6
          border-t
          border-gray-100
        "
      >

        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          className="
            h-12
            px-6
            rounded-xl
            border
            border-gray-200
            bg-white
            text-gray-700
            font-semibold
            hover:bg-gray-50
            hover:border-gray-300
            transition-all
            duration-200
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        >
          Cancel
        </button>


        <button
          type="button"
          onClick={handleSave}
          disabled={loading}
          className="
            h-12
            px-7
            rounded-xl
            bg-black
            text-white
            font-semibold
            flex
            items-center
            justify-center
            gap-2
            shadow-lg
            shadow-black/10
            hover:bg-yellow-500
            hover:text-black
            hover:-translate-y-0.5
            transition-all
            duration-200
            disabled:opacity-60
            disabled:cursor-not-allowed
            disabled:hover:bg-black
            disabled:hover:text-white
            disabled:hover:translate-y-0
          "
        >

          {loading ? (
            <>
              <span
                className="
                  w-4
                  h-4
                  rounded-full
                  border-2
                  border-white/30
                  border-t-white
                  animate-spin
                "
              />

              Saving...
            </>
          ) : (
            <>
              <Save size={17} />

              Save Changes
            </>
          )}

        </button>

      </div>

    </div>

  </div>

</div>


);
}
