import { useRef } from "react";
import { UploadCloud } from "lucide-react";
import { useUpload } from "./uploadContext";
import ImagePreview from "./ImagePreview";

export default function DropZone() {
  const inputRef = useRef(null);

  const { selectedFile, setSelectedFile } = useUpload();

  const handleFile = (file) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    setSelectedFile(file);
  };

  const handleInputChange = (e) => {
    handleFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  if (selectedFile) {
    return <ImagePreview />;
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={() => inputRef.current.click()}
      className="
        border-2
        border-dashed
        border-gray-300
        rounded-2xl
        p-10
        text-center
        cursor-pointer
        hover:border-yellow-500
        hover:bg-yellow-50
        transition
      "
    >
      <UploadCloud
        size={50}
        className="mx-auto text-gray-400"
      />

      <h3 className="mt-4 text-xl font-bold">
        Drag & Drop Image
      </h3>

      <p className="text-gray-500 mt-2">
        or click to browse
      </p>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleInputChange}
      />
    </div>
  );
}