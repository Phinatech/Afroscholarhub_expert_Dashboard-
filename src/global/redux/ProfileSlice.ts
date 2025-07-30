import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PaymentVerification, ProfileState, Wallet } from '../../types/Interface';


const initialState: ProfileState = {
  profile: null,
  isLoading: false,
  expertId: null,
  wallet: null,
  applications: []
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile(state, action: PayloadAction<any>) {
      state.profile = action.payload;
    },
    setProfileLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setExpertId: (state, action: PayloadAction<string>) => {
        // const accessToken = localStorage.getItem("accessToken");
        // const refreshToken = localStorage.getItem("refreshToken");
  
        // // Only set expertId if tokens exist
        // if (accessToken && refreshToken) {
          state.expertId = action.payload;
        // } else {
        //   state.expertId = null;
        // }
    },
    clearProfile(state) {
      state.profile = null;
      state.expertId = null
      state.wallet = null;
      state.applications = []
    },
    setWallet(state, action: PayloadAction<Wallet>) {
      state.wallet = action.payload;
    },
    setApplication(state, action: PayloadAction<PaymentVerification[]>) {
      state.applications = action.payload; 
    },
    addApplication(state, action: PayloadAction<PaymentVerification>) {
      state.applications.push(action.payload); 
    },
  },
});

export const { setProfile, clearProfile, setProfileLoading, setExpertId, setWallet, setApplication, addApplication } = profileSlice.actions;

export default profileSlice.reducer;
