import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Plant } from '@/types/product';
import { getListAllPlants } from '@/api/plant';

interface PlantState {
  plants: Plant[];
  loading: boolean;
  error: string | null;
}

const initialState: PlantState = {
  plants: [],
  loading: false,
  error: null,
};

export const fetchPlantData = createAsyncThunk(
  'plant/fetchAll',
  async (filters: any, { rejectWithValue }) => {
    try {
      return await getListAllPlants(filters);
    } catch (err) {
      return rejectWithValue('Failed to fetch data');
    }
  },
);

const plantStore = createSlice({
  name: 'plant',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPlantData.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlantData.fulfilled, (state, action) => {
        state.loading = false;
        state.plants = action.payload;
      })
      .addCase(fetchPlantData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.plants = [];
      });
  },
});

export default plantStore.reducer;
