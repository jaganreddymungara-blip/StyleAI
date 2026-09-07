import { createContext, useContext, useState } from "react";

const UploadContext = createContext();

export function UploadProvider({ children }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const [formData, setFormData] = useState({
    category: "shirt",
    brand: "",
    color: "black",
    description: "",
    season: "summer",
    occasion: "casual",
  });

  return (
    <UploadContext.Provider
      value={{
        selectedFile,
        setSelectedFile,
        formData,
        setFormData,
      }}
    >
      {children}
    </UploadContext.Provider>
  );
}

export function useUpload() {
  return useContext(UploadContext);
}