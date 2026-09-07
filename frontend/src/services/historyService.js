import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

const getToken = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Please login again.");
  }

  return token;
};

// =====================================================
// GET HISTORY
// =====================================================

export const getHistory = async () => {
  const token = getToken();

  const response = await axios.get(
    `${API_URL}/api/history/`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// =====================================================
// DELETE ONE HISTORY ITEM
// =====================================================

export const deleteHistory = async (historyId) => {
  const token = getToken();

  const response = await axios.delete(
    `${API_URL}/api/history/${historyId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// =====================================================
// CLEAR ALL HISTORY
// =====================================================

export const clearHistory = async () => {
  const token = getToken();

  const response = await axios.delete(
    `${API_URL}/api/history/`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};