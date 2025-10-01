import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Order } from '@/types/setting';
import { getListOrderHistory } from '@/api/setting';

interface OrderHistoryState {
  orders: Order[];
  loading: boolean;
  error: string | null;
}

const initialState: OrderHistoryState = {
  orders: [],
  loading: false,
  error: null,
};

export const fetchOrderHistory = createAsyncThunk<Order[]>(
  'orderHistory/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await getListOrderHistory();
    } catch (err) {
      return rejectWithValue('Failed to fetch data');
    }
  },
);

const orderHistoryStore = createSlice({
  name: 'orderHistory',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchOrderHistory.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrderHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.orders = [];
      })
  },
});

export default orderHistoryStore.reducer;
