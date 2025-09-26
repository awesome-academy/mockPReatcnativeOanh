import { configureStore } from '@reduxjs/toolkit';
import authStore from './auth';
import homeStore from './home';
import plantPotStore from './plantPot';
import toolStore from './tool';
import plantStore from './plant';

export const store = configureStore({
  reducer: {
    auth: authStore,
    home: homeStore,
    plantPot: plantPotStore,
    tool: toolStore,
    plant: plantStore,
  },
});

// Type helpers
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
