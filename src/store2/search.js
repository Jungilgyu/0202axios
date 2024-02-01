import { createSlice } from '@reduxjs/toolkit';

const initialSearchState = {
  searchs: [],
};

const searchSlice = createSlice({
  name: 'search',
  initialState: initialSearchState,
  reducers: {
    addSearchData: (state, action) => {
      state.searchs = [...state.searchs, action.payload];
    },
    
    // 다른 리듀서 추가...
  },
});

export const { addSearchData } = searchSlice.actions;
export default searchSlice.reducer;
