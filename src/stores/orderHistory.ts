import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Order } from '@/types/setting';
import { getListOrderHistory } from '@/services/order';

interface OrderHistoryState {
  orders: Order[];
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
  lastVisibleId: string | null;
}

const initialState: OrderHistoryState = {
  orders: [],
  loading: false,
  loadingMore: false,
  error: null,
  lastVisibleId: null,
};

export const fetchOrderHistory = createAsyncThunk<
  { orders: Order[]; lastVisibleId: string | null },
  { pageSize: number; lastVisibleId?: string },
  { rejectValue: string }
>('orderHistory/fetchAll', async ({ pageSize, lastVisibleId }, { rejectWithValue }) => {
  try {
    return await getListOrderHistory(pageSize, lastVisibleId);
  } catch (error) {
    return rejectWithValue('Failed to fetch order history');
  }
});

const orderHistoryStore = createSlice({
  name: 'orderHistory',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchOrderHistory.pending, (state, action) => {
        if (action.meta.arg.lastVisibleId) state.loadingMore = true;
        else {
          state.loading = true;
          state.error = null;
        }
      })
      .addCase(fetchOrderHistory.fulfilled, (state, action) => {
        if (state.loadingMore) {
          state.orders = [...state.orders, ...action.payload.orders];
          state.loadingMore = false;
        } else {
          state.orders = action.payload.orders;
          state.loading = false;
        }
        state.lastVisibleId = action.payload.lastVisibleId;
      })
      .addCase(fetchOrderHistory.rejected, (state, action) => {
        if (state.loadingMore) state.loadingMore = false;
        else {
          state.loading = false;
          state.orders = [];
        }
        state.error = action.payload as string;
      });
  },
});

export default orderHistoryStore.reducer;
