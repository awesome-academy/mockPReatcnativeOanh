import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
  isLoggedIn: boolean;
  email: string | null;
};

const initialState: AuthState = {
  isLoggedIn: false,
  email: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ email: string }>) {
      state.isLoggedIn = true;
      state.email = action.payload.email;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.email = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
