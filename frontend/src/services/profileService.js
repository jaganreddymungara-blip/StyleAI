import axios from "axios";


const API_URL = "http://127.0.0.1:8000";


// =====================================================
// GET AUTH TOKEN
// =====================================================

const getToken = () => {

  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error(
      "Authentication token not found. Please login again."
    );
  }

  return token;
};


// =====================================================
// AUTH HEADERS
// =====================================================

const getAuthHeaders = () => {

  const token = getToken();

  return {
    Authorization: `Bearer ${token}`,
  };
};


// =====================================================
// GET PROFILE
// =====================================================

export const getProfile = async () => {

  const response = await axios.get(
    `${API_URL}/api/profile/`,
    {
      headers: getAuthHeaders(),
    }
  );

  return response.data;
};


// =====================================================
// CREATE PROFILE
// =====================================================

export const createProfile = async (
  profileData
) => {

  const response = await axios.post(
    `${API_URL}/api/profile/`,
    profileData,
    {
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};


// =====================================================
// UPDATE PROFILE
// =====================================================

export const updateProfile = async (
  profileData
) => {

  const response = await axios.put(
    `${API_URL}/api/profile/`,
    profileData,
    {
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};


// =====================================================
// UPLOAD PROFILE PHOTO
// =====================================================

export const uploadProfilePhoto = async (
  file
) => {

  const formData = new FormData();

  formData.append(
    "file",
    file
  );

  const response = await axios.post(
    `${API_URL}/api/profile/photo`,
    formData,
    {
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};


// =====================================================
// DELETE PROFILE PHOTO
// =====================================================

export const deleteProfilePhoto = async () => {

  const response = await axios.delete(
    `${API_URL}/api/profile/photo`,
    {
      headers: getAuthHeaders(),
    }
  );

  return response.data;
};