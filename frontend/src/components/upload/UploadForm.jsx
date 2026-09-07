import { useUpload } from "./uploadContext";

const fieldStyles = `  w-full
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
  focus:ring-yellow-500/10`;

const labelStyles = `  block
  text-sm
  font-semibold
  text-gray-900
  mb-2`;

export default function UploadForm() {
const { formData, setFormData } = useUpload();

const handleChange = (e) => {
setFormData({
...formData,
[e.target.name]: e.target.value,
});
};

return ( <div className="space-y-6">
  

  {/* ================================================= */}
  {/* CATEGORY + BRAND */}
  {/* ================================================= */}

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

    {/* Category */}

    <div>

      <label
        htmlFor="category"
        className={labelStyles}
      >
        Category
      </label>

      <select
        id="category"
        name="category"
        value={formData.category}
        onChange={handleChange}
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
        htmlFor="brand"
        className={labelStyles}
      >
        Brand
        <span className="text-gray-400 font-normal ml-1">
          (optional)
        </span>
      </label>

      <input
        id="brand"
        type="text"
        name="brand"
        value={formData.brand}
        onChange={handleChange}
        placeholder="Nike, Zara, H&M..."
        className={fieldStyles}
      />

    </div>

  </div>


  {/* ================================================= */}
  {/* COLOR + DESCRIPTION */}
  {/* ================================================= */}

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

  <div>
    <label
      htmlFor="description"
      className={labelStyles}
    >
      Clothing Description
      <span className="text-gray-400 font-normal ml-1">
        (optional)
      </span>
    </label>

    <textarea
      id="description"
      name="description"
      value={formData.description}
      onChange={handleChange}
      rows={3}
      placeholder="Describe the fit, material, pattern, texture, or other details..."
      className="
        w-full
        rounded-xl
        border
        border-gray-200
        bg-white
        px-4
        py-3
        text-sm
        text-gray-900
        placeholder:text-gray-400
        outline-none
        resize-none
        transition-all
        duration-200
        focus:border-yellow-500
        focus:ring-4
        focus:ring-yellow-500/10
      "
    />

    <p className="mt-2 text-xs text-gray-500">
      More detail helps StyleAI make better outfit recommendations.
    </p>
  </div>
  {/* ================================================= */}
  {/* SEASON + OCCASION */}
  {/* ================================================= */}

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

    {/* Season */}

    <div>

      <label
        htmlFor="season"
        className={labelStyles}
      >
        Season
      </label>

      <select
        id="season"
        name="season"
        value={formData.season}
        onChange={handleChange}
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
        htmlFor="occasion"
        className={labelStyles}
      >
        Occasion
      </label>

      <select
        id="occasion"
        name="occasion"
        value={formData.occasion}
        onChange={handleChange}
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
      These details help StyleAI choose better outfit combinations
      for your wardrobe.
    </p>
  </div>

</div>

);
}
