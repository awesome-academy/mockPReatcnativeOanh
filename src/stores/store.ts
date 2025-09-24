import { configureStore } from '@reduxjs/toolkit';
import authStore from './auth';
import homeStore from './home';

export const store = configureStore({
  reducer: {
    auth: authStore,
    home: homeStore,
  },
});

// Type helpers
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;