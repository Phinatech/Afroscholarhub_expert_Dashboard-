

export const url = import.meta.env.VITE_APP_API_URL;

import axios from "axios";
import { setApplication, setWallet } from "../global/redux/ProfileSlice";
// import { refreshAccessToken } from "./RefreshToken";

// other API

// get user wallet
export const getWallet = async (userId: string, accessToken: string | null, dispatch: any) => {
  try {
    const response = await axios.get(`${url}/payment/wallet/${userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    dispatch(setWallet(response.data.data));
    console.log("wallet", response.data.data)
  } catch (error) {
    console.error("Error fetching wallet:", error);
    console.log("trans-error", error)
    throw error; 
  }
};

// get applications
export const getApplications = async (
    expertId: string, 
    expertToken: any | null, 
      dispatch: any
      ) => {
  try {
    const response = await axios.get(`${url}/application/${expertId}`, {
      headers: {
        Authorization: `Bearer ${expertToken}`,
        // "Content-Type": "application/json",
      },
    });

    dispatch(setApplication(response.data.data))
    console.log("expert-app", response.data)
  } catch (error) {
    console.error("Error fetching applications:", error);
    console.log("trans-error", error)
    throw error;
  }
}
