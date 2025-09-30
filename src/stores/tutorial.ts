import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Tutorial } from '@/types/setting';
import { getListTutorials } from '@/api/setting';

interface TutorialState {
  tutorials: Tutorial[];
  loading: boolean;
  error: string | null;
}

const initialState: TutorialState = {
  tutorials: [],
  loading: false,
  error: null,
};

export const fetchTutorialData = createAsyncThunk<Tutorial[]>(
  'tutorial/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await getListTutorials();
    } catch (err) {
      return rejectWithValue('Failed to fetch data');
    }
  },
);

const tutorialStore = createSlice({
  name: 'tutorial',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTutorialData.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTutorialData.fulfilled, (state, action) => {
        state.loading = false;
        state.tutorials = action.payload;
      })
      .addCase(fetchTutorialData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.tutorials = [];
      })
  },
});

export default tutorialStore.reducer;
