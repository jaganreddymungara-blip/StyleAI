const colors = [
  "All",
  "Black",
  "White",
  "Blue",
  "Grey",
  "Brown",
  "Green",
  "Red",
  "Yellow",
];

const colorStyles = {
  Black: "bg-gray-900",
  White: "bg-white border border-gray-300",
  Blue: "bg-blue-500",
  Grey: "bg-gray-400",
  Brown: "bg-amber-700",
  Green: "bg-green-500",
  Red: "bg-red-500",
  Yellow: "bg-yellow-400",
};

export default function ColorFilter({
  selectedColor,
  setSelectedColor,
}) {
  return (
    <div className="flex flex-wrap items-center gap-2.5">

      {colors.map((color) => {
        const isActive = selectedColor === color;

        return (
          <button
            key={color}
            type="button"
            onClick={() => setSelectedColor(color)}
            aria-pressed={isActive}
            className={`
              group
              inline-flex
              items-center
              gap-2
              px-3.5
              py-2
              rounded-xl
              text-sm
              font-medium
              border
              transition-all
              duration-200
              ${
                isActive
                  ? "bg-gray-900 text-white border-gray-900 shadow-sm"
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900"
              }
            `}
          >

            {color === "All" ? (
              <span
                className={`
                  w-3.5
                  h-3.5
                  rounded-full
                  border
                  ${
                    isActive
                      ? "border-white/40 bg-white/20"
                      : "border-gray-300 bg-gradient-to-br from-black via-gray-300 to-white"
                  }
                `}
              />
            ) : (
              <span
                className={`
                  w-3.5
                  h-3.5
                  rounded-full
                  shrink-0
                  ${colorStyles[color]}
                  ${
                    isActive
                      ? "ring-2 ring-white/50 ring-offset-1 ring-offset-gray-900"
                      : "group-hover:scale-110"
                  }
                  transition-transform
                  duration-200
                `}
              />
            )}

            <span>{color}</span>

          </button>
        );
      })}

    </div>
  );
}