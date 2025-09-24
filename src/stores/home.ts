import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Plant, PlantPot, Tool } from '@/types/product';
import { getListLimitedPlants } from '@/api/plant';
import { getListLimitedPlantPots } from '@/api/pot';
import { getListLimitedTools } from '@/api/tool';

interface HomeState {
  plants: Plant[];
  plantPots: PlantPot[];
  tools: Tool[];
  loading: boolean;
  error: string | null;
}

const initialState: HomeState = {
  plants: [],
  plantPots: [],
  tools: [],
  loading: false,
  error: null,
};

export const fetchHomeData = createAsyncThunk(
  'home/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const [plantsRes, plantPotsRes, toolsRes] = await Promise.all([
        getListLimitedPlants(4),
        getListLimitedPlantPots(4, 2),
        getListLimitedTools(4),
      ]);
      return {
        plants: plantsRes,
        plantPots: plantPotsRes,
        tools: toolsRes,
      };
    } catch (err) {
      return rejectWithValue('Failed to fetch data');
    }
  }
);

const homeStore = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomeData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHomeData.fulfilled, (state, action) => {
        state.loading = false;
        state.plants = action.payload.plants;
        state.plantPots = action.payload.plantPots;
        state.tools = action.payload.tools;
      })
      .addCase(fetchHomeData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.plants = [];
        state.plantPots = [];
        state.tools = [];
      });
  },
});

export default homeStore.reducer;
