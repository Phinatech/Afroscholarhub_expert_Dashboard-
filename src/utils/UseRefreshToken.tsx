import { url } from "./Api";

export const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken"); 

    if (!refreshToken) {
      throw new Error("No refresh token found");
    }

    const response = await fetch(`${url}/expert/refreshToken`, {
      method: "POST",
      credentials: "include", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }), // Send refreshToken in request body
    });

    if (!response.ok) {
      throw new Error("Failed to refresh token");
    }

    const data = await response.json();
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken); // Update refreshToken if needed
    return data.accessToken;
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw error;
  }
};
