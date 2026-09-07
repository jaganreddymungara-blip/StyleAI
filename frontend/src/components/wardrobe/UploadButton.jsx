import { Plus, Upload } from "lucide-react";

export default function UploadButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        group
        h-13
        px-6
        rounded-2xl
        bg-black
        text-white
        flex
        items-center
        justify-center
        gap-3
        font-semibold
        text-sm
        shadow-sm
        hover:bg-yellow-500
        hover:text-black
        hover:shadow-lg
        hover:-translate-y-0.5
        active:translate-y-0
        transition-all
        duration-200
        whitespace-nowrap
      "
    >
     <Upload
        size={16}
        className="
          opacity-100
          -translate-x-1
          group-hover:opacity-100
          group-hover:translate-x-0
          transition-all
          duration-200
        "
      />
      Add Clothing

     
    </button>
  );
}