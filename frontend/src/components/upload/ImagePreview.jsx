import { useEffect, useState } from "react";
import { ImageIcon, Trash2 } from "lucide-react";
import { useUpload } from "./uploadContext";

export default function ImagePreview() {
const { selectedFile, setSelectedFile } = useUpload();
const [imageUrl, setImageUrl] = useState("");

useEffect(() => {
if (!selectedFile) {
setImageUrl("");
return;
}

const url = URL.createObjectURL(selectedFile);
setImageUrl(url);

return () => {
  URL.revokeObjectURL(url);
};


}, [selectedFile]);

if (!selectedFile) return null;

const fileSize =
selectedFile.size >= 1024 * 1024
? `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB`
: `${Math.round(selectedFile.size / 1024)} KB`;

return ( <div className="space-y-4">


  {/* Preview */}

  <div className="relative overflow-hidden rounded-[24px] border border-gray-200 bg-gray-100">

    {imageUrl && (
      <img
        src={imageUrl}
        alt="Selected clothing preview"
        className="
          w-full
          h-72
          sm:h-80
          object-cover
        "
      />
    )}

    {/* Image overlay */}

    <div
      className="
        absolute
        inset-x-0
        bottom-0
        bg-gradient-to-t
        from-black/60
        via-black/10
        to-transparent
        p-5
        pt-16
      "
    >
      <div className="flex items-end justify-between gap-4">

        <div className="min-w-0">

          <p className="text-white text-sm font-semibold truncate">
            {selectedFile.name}
          </p>

          <p className="text-white/70 text-xs mt-1">
            {fileSize}
          </p>

        </div>

        <div
          className="
            shrink-0
            w-9
            h-9
            rounded-full
            bg-white/15
            backdrop-blur-md
            flex
            items-center
            justify-center
            text-white
          "
        >
          <ImageIcon size={17} />
        </div>

      </div>
    </div>


    {/* Remove */}

    <button
      type="button"
      onClick={() => setSelectedFile(null)}
      aria-label="Remove selected image"
      className="
        absolute
        top-4
        right-4
        w-10
        h-10
        rounded-full
        bg-black/60
        backdrop-blur-md
        text-white
        flex
        items-center
        justify-center
        border
        border-white/20
        hover:bg-red-500
        transition-all
        duration-200
        hover:scale-105
      "
    >
      <Trash2 size={18} />
    </button>

  </div>


  {/* Replace hint */}

  <p className="text-xs text-gray-400 text-center">
    Image selected. Remove it to choose a different photo.
  </p>

</div>

);
}
