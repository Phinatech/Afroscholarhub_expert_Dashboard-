import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  user: any;
  accessToken?: any;
  refreshToken?: any;
}

const initialState: UserState = {
  user: null,
  accessToken: null,
  refreshToken: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<any>) {
      state.user = action.payload;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    clearUser(state) {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
    },
    // setAccessToken: (state, action) => {
    //   state.accessToken = action.payload;
    // },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;


