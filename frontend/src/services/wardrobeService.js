import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

const getUserEmail = () => {
  const email = localStorage.getItem("userEmail");

  if (!email) {
    throw new Error("User email not found. Please login again.");
  }

  return email;
};


// =====================================================
// GET USER WARDROBE
// =====================================================

export const getWardrobe = async () => {
  const userEmail = getUserEmail();

  const response = await axios.get(
    `${API_URL}/api/wardrobe/?user_email=${encodeURIComponent(userEmail)}`
  );

  return response.data;
};


// =====================================================
// UPLOAD CLOTHING
// =====================================================

export const uploadClothing = async (formData) => {
  const userEmail = getUserEmail();

  // Make sure the logged-in user's email is attached
  formData.set("user_email", userEmail);

  const response = await axios.post(
    `${API_URL}/api/wardrobe/upload`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};


// =====================================================
// UPDATE CLOTHING
// =====================================================

export const updateClothing = async (clothingId, clothingData) => {
  const response = await axios.put(
    `${API_URL}/api/wardrobe/${clothingId}`,
    clothingData
  );

  return response.data;
};


// =====================================================
// DELETE CLOTHING
// =====================================================

export const deleteClothing = async (itemId) => {
  const response = await axios.delete(
    `${API_URL}/api/wardrobe/${itemId}`
  );

  return response.data;
};


// =====================================================
// TOGGLE FAVORITE
// =====================================================

export const toggleFavorite = async (itemId) => {
  const response = await axios.patch(
    `${API_URL}/api/wardrobe/${itemId}/favorite`
  );

  return response.data;
};