import {
  PAYMENT_METHOD_CODE,
  TRANSPORT_METHOD_CODE,
} from '@/constants/product';
import { CheckoutFormType, Product } from '@/types/product';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface shoppingCartState {
  items: Product[];
  checkoutForm: CheckoutFormType;
}

const initialState: shoppingCartState = {
  items: [],
  checkoutForm: {
    transport_method: TRANSPORT_METHOD_CODE.FAST,
    payment_method: PAYMENT_METHOD_CODE.VISA_MASTERCARD,
  },
};

const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const existing = state.items.find(item => item.id === product.id);
      if (existing) {
        existing.quantity +=
          typeof product.quantity === 'number' && product.quantity > 0
            ? product.quantity
            : 1;
      } else {
        state.items.push({ ...product, selected: product.selected ?? false });
      }
    },
    increase: (state, action) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item) item.quantity += 1;
    },
    decrease: (state, action) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
    },
    toggleSelect: (state, action) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item) item.selected = !item.selected;
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(i => i.id !== action.payload);
    },
    removeAllItems: state => {
      state.items = [];
    },
    resetSelected: state => {
      state.items = state.items.map(item => ({
        ...item,
        selected: false,
      }));
    },
    removeSelectedItems: state => {
      state.items = state.items.filter(item => !item.selected);
    },
    setCheckoutForm: (
      state,
      action: PayloadAction<Partial<CheckoutFormType>>,
    ) => {
      state.checkoutForm = {
        ...state.checkoutForm,
        ...action.payload,
      };
    },
    resetCheckoutForm: state => {
      state.checkoutForm = initialState.checkoutForm;
    },
  },
});

export const {
  addToCart,
  increase,
  decrease,
  toggleSelect,
  removeItem,
  removeSelectedItems,
  resetSelected,
  removeAllItems,
  setCheckoutForm,
  resetCheckoutForm,
} = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;
