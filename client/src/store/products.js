import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  {
    id: '1',
    name: 'تيشيرت',
    stock: 10,
    pricePerEach: 20.5,
    valuePerEach: 25,
    note: 'متوفر بألوان مختلفة',
  },
  {
    id: '2',
    name: 'تيشيرت',
    stock: 10,
    pricePerEach: 20.5,
    valuePerEach: 25,
    note: 'متوفر بألوان مختلفة',
  },
];

export const counterSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.push(action.payload);
    },
    editProduct: (state, action) => {
      const { id, ...updatedRow } = action.payload;
      const rowIndex = state.findIndex((row) => row.id === id);
      if (rowIndex !== -1)
        state[rowIndex] = { ...state[rowIndex], ...updatedRow };
    },
    deleteProduct: (state, action) => {
      const index = state.findIndex((row) => row.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});

// // Action creators are generated for each case reducer function
export const { addProduct, editProduct, deleteProduct } = counterSlice.actions;

export default counterSlice.reducer;
