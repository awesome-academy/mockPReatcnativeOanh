import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Question } from '@/types/setting';
import { getListQuestions } from '@/api/setting';

interface QuestionState {
  questions: Question[];
  loading: boolean;
  error: string | null;
}

const initialState: QuestionState = {
  questions: [],
  loading: false,
  error: null,
};

export const fetchQuestionData = createAsyncThunk(
  'question/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await getListQuestions();
    } catch (err) {
      return rejectWithValue('Failed to fetch data');
    }
  },
);

const questionStore = createSlice({
  name: 'question',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchQuestionData.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuestionData.fulfilled, (state, action) => {
        state.loading = false;
        state.questions = action.payload;
      })
      .addCase(fetchQuestionData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.questions = [];
      });
  },
});

export default questionStore.reducer;
