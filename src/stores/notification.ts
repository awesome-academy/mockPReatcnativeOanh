import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Notification } from '@/types/setting';
import { getListNotification } from '@/services/notification';

interface NotificationState {
  notifications: Notification[];
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
  lastVisibleId: string | null;
}

const initialState: NotificationState = {
  notifications: [],
  loading: false,
  loadingMore: false,
  error: null,
  lastVisibleId: null,
};

export const fetchListNotification = createAsyncThunk<
  { notifications: Notification[]; lastVisibleId: string | null },
  { pageSize: number; lastVisibleId?: string },
  { rejectValue: string }
>(
  'notification/fetchAll',
  async ({ pageSize, lastVisibleId }, { rejectWithValue }) => {
    try {
      return await getListNotification(pageSize, lastVisibleId);
    } catch (error) {
      return rejectWithValue('Failed to fetch notification');
    }
  },
);

const notificationStore = createSlice({
  name: 'notification',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchListNotification.pending, (state, action) => {
        if (action.meta.arg.lastVisibleId) state.loadingMore = true;
        else {
          state.loading = true;
          state.error = null;
        }
      })
      .addCase(fetchListNotification.fulfilled, (state, action) => {
        const isLoadMore = !!action.meta.arg.lastVisibleId;

        if (isLoadMore) {
          state.notifications = [
            ...state.notifications,
            ...action.payload.notifications,
          ];
        } else {
          state.notifications = action.payload.notifications;
        }

        state.loading = false;
        state.loadingMore = false;
        state.lastVisibleId = action.payload.lastVisibleId;
      })
      .addCase(fetchListNotification.rejected, (state, action) => {
        state.loading = false;
        state.loadingMore = false;
        if (!action.meta.arg.lastVisibleId) state.notifications = [];
        state.error = action.payload as string;
      });
  },
});

export default notificationStore.reducer;
