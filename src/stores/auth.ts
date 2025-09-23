import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
  isLoggedIn: boolean;
  uid: string | null;
};

const initialState: AuthState = {
  isLoggedIn: false,
  uid: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ uid: string }>) {
      state.isLoggedIn = true;
      state.uid = action.payload.uid;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.uid = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
