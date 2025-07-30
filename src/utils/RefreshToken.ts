import axios from "axios";
import { url } from "./Api";

const API_BASE_URL = url || "https://afro-scholar-hub-server.onrender.com/api/v1"

export const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken"); // Ensure refreshToken is stored
    if (!refreshToken) throw new Error("No refresh token available");

    const response = await axios.post(`${API_BASE_URL}/expert/refreshToken`, {}, {
      headers: {
        Authorization: `Bearer ${refreshToken}`, // Send refresh token
      },
    });

    if (response.data?.accessToken) {
      localStorage.setItem("accessToken", JSON.stringify(response.data.accessToken));
      return response.data.accessToken;
    } else {
      throw new Error("Failed to refresh token");
    }
  } catch (error) {
    console.error("Error refreshing token:", error);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/login"; // Redirect to login if refresh fails
    return null;
  }
};
