import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Tool } from '@/types/product';
import { getListTools } from '@/api/tool';

interface ToolState {
  tools: Tool[];
  loading: boolean;
  error: string | null;
}

const initialState: ToolState = {
  tools: [],
  loading: false,
  error: null,
};

export const fetchToolData = createAsyncThunk(
  'tool/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await getListTools();
    } catch (err) {
      return rejectWithValue('Failed to fetch data');
    }
  },
);

const toolStore = createSlice({
  name: 'tool',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchToolData.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchToolData.fulfilled, (state, action) => {
        state.loading = false;
        state.tools = action.payload;
      })
      .addCase(fetchToolData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.tools = [];
      });
  },
});

export default toolStore.reducer;
