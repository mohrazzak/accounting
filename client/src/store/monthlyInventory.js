import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  {
    date: '2023-03-01',
    value: 1000,
    values: 100,
  },
  {
    date: '2023-03-02',
    value: 500000,
    values: 50,
  },
  {
    date: '2023-03-03',
    value: 25000,
    values: 20,
  },
  // and so on until day 30
  {
    date: '2023-03-30',
    value: -500,
    values: -10,
  },
];

export const counterSlice = createSlice({
  name: 'monthlyInventory',
  initialState,
  reducers: {
    editMonthly: (state, action) => {
      const { id, ...updatedRow } = action.payload;
      const rowIndex = state.findIndex((row) => row.id === id);
      if (rowIndex !== -1)
        state[rowIndex] = { ...state[rowIndex], ...updatedRow };
    },
    deleteMonthly: (state, action) => {
      const index = state.findIndex((row) => row.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});

// // Action creators are generated for each case reducer function
export const { editMonthly, deleteMonthly } = counterSlice.actions;

export default counterSlice.reducer;
