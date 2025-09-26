import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
  isLoggedIn: boolean;
  user: {
    email?: string;
    userName?: string;
    phoneNumber?: string;
    address?: string;
    uid?: string;
  };
};

const initialState: AuthState = {
  isLoggedIn: false,
  user: {},
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(
      state,
      action: PayloadAction<{
        user: {
          email?: string;
          userName?: string;
          phoneNumber?: string;
          address?: string;
          uid?: string;
        };
      }>,
    ) {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = {};
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
