import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export const generateStylingRecommendation = async ({
  occasion = "casual",
  season = "summer",
  style = "smart casual",
  color = "Any",
} = {}) => {
  const userEmail =
    localStorage.getItem("userEmail") || "jagan@gmail.com";

  const response = await axios.post(
    `${API_URL}/api/stylist/generate`,
    {
      user_email: userEmail,
      occasion,
      season,
      style,
      color,
    }
  );

  return response.data;
};