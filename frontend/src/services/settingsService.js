import axios from "axios";

const API_URL = "http://127.0.0.1:8000";


// =====================================================
// GET AUTH TOKEN
// =====================================================

const getToken = () => {

  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error(
      "Authentication token not found."
    );
  }

  return token;
};


// =====================================================
// AUTH HEADERS
// =====================================================

const getAuthHeaders = () => {

  return {
    Authorization: `Bearer ${getToken()}`,
  };
};


// =====================================================
// CHANGE PASSWORD
// =====================================================

export const changePassword = async ({
  currentPassword,
  newPassword,
}) => {

  const response = await axios.put(
    `${API_URL}/api/auth/change-password`,
    {
      current_password: currentPassword,
      new_password: newPassword,
    },
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
// DELETE ACCOUNT
// =====================================================

export const deleteAccount = async () => {

  const response = await axios.delete(
    `${API_URL}/api/auth/account`,
    {
      headers: getAuthHeaders(),
    }
  );

  return response.data;
};