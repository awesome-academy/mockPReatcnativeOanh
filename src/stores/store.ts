import { configureStore } from '@reduxjs/toolkit';
import authStore from './auth';
import homeStore from './home';
import plantPotStore from './plantPot';
import toolStore from './tool';
import plantStore from './plant';
import questionStore from './question';
import tutorialStore from './tutorial';
import orderHistoryStore from './orderHistory';
import searchStore from './search';
import shoppingCartStore from './shoppingCart';
import notificationStore from './notification';

export const store = configureStore({
  reducer: {
    auth: authStore,
    home: homeStore,
    plantPot: plantPotStore,
    tool: toolStore,
    plant: plantStore,
    question: questionStore,
    tutorial: tutorialStore,
    orderHistory: orderHistoryStore,
    search: searchStore,
    shoppingCart: shoppingCartStore,
    notification: notificationStore,
  },
});

// Type helpers
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
