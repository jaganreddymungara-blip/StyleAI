import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Check, Loader2, Sparkles } from "lucide-react";

import { useUpload } from "./uploadContext";

export default function UploadSubmitButton({ onSuccess }) {
const { selectedFile, formData } = useUpload();
const [loading, setLoading] = useState(false);

const handleUpload = async () => {
if (!selectedFile) {
toast.error("Please select a clothing image first.");
return;
}


const userEmail = localStorage.getItem("userEmail");

if (!userEmail) {
  toast.error("Your session has expired. Please log in again.");
  return;
}

setLoading(true);

try {
  const data = new FormData();

  data.append("file", selectedFile);
  data.append("user_email", userEmail);

  data.append("category", formData.category);
  data.append("brand", formData.brand);
  data.append("color", formData.color);
  data.append("description", formData.description);
  data.append("season", formData.season);
  data.append("occasion", formData.occasion);

  await axios.post(
    "http://127.0.0.1:8000/api/wardrobe/upload",
    data
  );

  toast.success("Added to your wardrobe!");

  if (onSuccess) {
    onSuccess();
  }

} catch (err) {
  console.error("Wardrobe upload error:", err);

  const message =
    err.response?.data?.detail ||
    err.response?.data?.message ||
    "Something went wrong while uploading.";

  toast.error(message);

} finally {
  setLoading(false);
}


};

return ( <button
   type="button"
   onClick={handleUpload}
   disabled={loading}
   className="
     group
     w-full
     h-14
     rounded-xl
     bg-black
     text-white
     font-semibold
     flex
     items-center
     justify-center
     gap-2.5
     shadow-lg
     shadow-black/10
     transition-all
     duration-300
     hover:bg-yellow-500
     hover:text-black
     hover:shadow-xl
     hover:-translate-y-0.5
     active:translate-y-0
     disabled:cursor-not-allowed
     disabled:opacity-60
     disabled:hover:bg-black
     disabled:hover:text-white
     disabled:hover:translate-y-0
   "
 >
{loading ? (
<> <Loader2
         size={19}
         className="animate-spin"
       />


      <span>
        Adding to wardrobe...
      </span>
    </>
  ) : (
    <>
      <Sparkles
        size={18}
        className="transition-transform duration-300 group-hover:rotate-12"
      />

      <span>
        Add to My Wardrobe
      </span>

      <Check
        size={17}
        className="
          opacity-0
          -ml-1
          translate-x-1
          transition-all
          duration-300
          group-hover:opacity-100
          group-hover:translate-x-0
        "
      />
    </>
  )}
</button>


);
}
