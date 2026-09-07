import { Search, X } from "lucide-react";

export default function SearchBar({ search, setSearch }) {
  const clearSearch = () => {
    setSearch("");
  };

  return (
    <div className="relative w-full max-w-xl">

      {/* Search icon */}

      <Search
        size={19}
        strokeWidth={2}
        className="
          absolute
          left-4
          top-1/2
          -translate-y-1/2
          text-gray-400
          pointer-events-none
        "
      />


      {/* Input */}

      <input
        type="text"
        placeholder="Search your wardrobe..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="
          w-full
          h-13
          pl-11
          pr-11
          rounded-2xl
          bg-white
          border
          border-gray-200
          text-gray-900
          placeholder:text-gray-400
          outline-none
          transition-all
          duration-200
          hover:border-gray-300
          focus:border-yellow-400
          focus:ring-4
          focus:ring-yellow-400/10
          shadow-sm
        "
      />


      {/* Clear button */}

      {search && (
        <button
          type="button"
          onClick={clearSearch}
          aria-label="Clear search"
          className="
            absolute
            right-3
            top-1/2
            -translate-y-1/2
            w-8
            h-8
            rounded-lg
            flex
            items-center
            justify-center
            text-gray-400
            hover:text-gray-900
            hover:bg-gray-100
            transition
          "
        >
          <X size={17} />
        </button>
      )}

    </div>
  );
}