import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { PlantPot } from '@/types/product';
import { getListPlantPots } from '@/api/pot';

interface PlantPotState {
  plantPots: PlantPot[];
  loading: boolean;
  error: string | null;
}

const initialState: PlantPotState = {
  plantPots: [],
  loading: false,
  error: null,
};

export const fetchPlantPotData = createAsyncThunk(
  'plantPot/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await getListPlantPots();
    } catch (err) {
      return rejectWithValue('Failed to fetch data');
    }
  },
);

const plantPotStore = createSlice({
  name: 'plantPot',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPlantPotData.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlantPotData.fulfilled, (state, action) => {
        state.loading = false;
        state.plantPots = action.payload;
      })
      .addCase(fetchPlantPotData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.plantPots = [];
      });
  },
});

export default plantPotStore.reducer;
