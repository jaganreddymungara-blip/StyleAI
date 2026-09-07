import { Heart, Shirt } from "lucide-react";

export default function CategoryTabs({
  selectedCategory,
  setSelectedCategory,
}) {
  const categories = [
    "All",
    "Favorites",
    "Shirt",
    "Pant",
    "TShirt",
    "Jeans",
    "Jacket",
    "Hoodie",
    "Shoe",
    "Accessory",
  ];

  return (
    <div className="flex flex-wrap gap-2.5">

      {categories.map((category) => {
        const isActive = selectedCategory === category;
        const isFavorites = category === "Favorites";

        return (
          <button
            key={category}
            type="button"
            onClick={() => setSelectedCategory(category)}
            className={`
              group
              inline-flex
              items-center
              gap-2
              px-4
              py-2.5
              rounded-xl
              text-sm
              font-semibold
              border
              transition-all
              duration-200
              ${
                isActive
                  ? isFavorites
                    ? "bg-red-500 text-white border-red-500 shadow-md shadow-red-500/20"
                    : "bg-black text-white border-black shadow-md shadow-black/10"
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900"
              }
            `}
          >

            {isFavorites && (
              <Heart
                size={15}
                strokeWidth={2}
                className={`
                  transition-transform duration-200
                  ${
                    isActive
                      ? "fill-white"
                      : "group-hover:scale-110 group-hover:text-red-500"
                  }
                `}
              />
            )}

            {!isFavorites && category === "All" && (
              <Shirt
                size={15}
                strokeWidth={2}
              />
            )}

            <span>{category}</span>

          </button>
        );
      })}

    </div>
  );
}