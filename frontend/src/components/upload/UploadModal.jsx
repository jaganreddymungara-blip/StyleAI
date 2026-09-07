import { X, Sparkles } from "lucide-react";

import DropZone from "./DropZone";
import UploadForm from "./UploadForm";
import UploadSubmitButton from "./UploadSubmitButton";
import { UploadProvider } from "./uploadContext";

export default function UploadModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/55
        backdrop-blur-sm
        p-4
        sm:p-6
      "
    >
      <UploadProvider>
        <div
          className="
            relative
            w-full
            max-w-3xl
            max-h-[92vh]
            overflow-y-auto
            rounded-[28px]
            border
            border-gray-200
            bg-[#FAF9F7]
            shadow-[0_30px_80px_rgba(0,0,0,0.25)]
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
              border-b
              border-gray-200
              bg-[#FAF9F7]/95
              backdrop-blur-md
              px-6
              py-6
              sm:px-8
            "
          >
            <div className="pr-12">

              <div className="flex items-center gap-2">

                <Sparkles
                  size={15}
                  className="text-yellow-500"
                />

                <span
                  className="
                    text-[11px]
                    font-bold
                    uppercase
                    tracking-[0.2em]
                    text-gray-400
                  "
                >
                  Wardrobe
                </span>

              </div>

              <h2
                className="
                  mt-2
                  text-2xl
                  sm:text-3xl
                  font-black
                  tracking-tight
                  text-gray-900
                "
              >
                Add New Clothing
              </h2>

              <p className="mt-2 text-sm sm:text-base text-gray-500">
                Add a piece to your wardrobe and let StyleAI
                use it in your future outfit recommendations.
              </p>

            </div>

            {/* Close */}

            <button
              type="button"
              onClick={onClose}
              aria-label="Close upload modal"
              className="
                absolute
                right-5
                top-5
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                border
                border-gray-200
                bg-white
                text-gray-500
                transition-all
                duration-200
                hover:border-gray-300
                hover:bg-gray-100
                hover:text-gray-900
                hover:rotate-90
              "
            >
              <X size={19} />
            </button>

          </div>


          {/* ================================================= */}
          {/* CONTENT */}
          {/* ================================================= */}

          <div className="px-6 py-7 sm:px-8 sm:py-8">

            {/* Image Upload */}

            <section>

              <div className="mb-4">

                <h3 className="text-sm font-bold text-gray-900">
                  Clothing photo
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                  Upload a clear photo of the clothing item.
                </p>

              </div>

              <DropZone />

            </section>


            {/* Divider */}

            <div className="my-8 h-px bg-gray-200" />


            {/* Clothing Details */}

            <section>

              <div className="mb-5">

                <h3 className="text-sm font-bold text-gray-900">
                  Clothing details
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                  Tell StyleAI a little about this piece.
                </p>

              </div>

              <UploadForm />

            </section>


            {/* Submit */}

            <div className="mt-8 border-t border-gray-200 pt-6">

              <UploadSubmitButton onSuccess={onClose} />

            </div>

          </div>

        </div>
      </UploadProvider>
    </div>
  );
}