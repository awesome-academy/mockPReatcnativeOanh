import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    history: [] as string[],
  },
  reducers: {
    addHistory: (state, action: PayloadAction<string>) => {
      const keyword = action.payload.trim();
      if (!keyword) return;

      if (!state.history.includes(keyword)) {
        state.history.unshift(keyword);
        if (state.history.length > 5) state.history.pop();
      }
    },
    clearHistory: (state) => {
      state.history = [];
    },
  },
});

export const { addHistory, clearHistory } = searchSlice.actions;
export default searchSlice.reducer;
