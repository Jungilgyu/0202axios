import { createSlice } from '@reduxjs/toolkit';

const initialPayState = {
  status: {price: 0}
};

const paySlice = createSlice({
  name: 'pay',
  initialState: initialPayState,
  reducers: {
    pay: (state, action) => {
      state.status.price = action.payload;
    },
    payComplete: (state) => {
      state.status= null;
    },
  },
});

export const { pay, payComplete } = paySlice.actions;
export default paySlice.reducer;
