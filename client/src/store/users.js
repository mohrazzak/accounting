import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  {
    id: 1,
    name: 'عبدالرحمن علي',
    mobileNumber: '0501234567',
    landLineNumber: '0112345678',
    address: 'الرياض، المملكة العربية السعودية',
    accountBalance: -1000,
    note: 'ملاحظة 1',
    type: 'customer',
    accountBalanceValue: -100,
  },
  {
    id: 2,
    name: 'فاطمة محمد',
    mobileNumber: '0557654321',
    landLineNumber: '0123456789',
    address: 'جدة، المملكة العربية السعودية',
    accountBalance: 9876.54,
    note: 'ملاحظة 2',
    type: 'customer',
    accountBalanceValue: 100,
  },
  {
    id: 3,
    name: 'محمد عبدالله',
    mobileNumber: '0598765432',
    landLineNumber: '0134567890',
    address: 'الدمام، المملكة العربية السعودية',
    accountBalance: 23456.78,
    note: 'ملاحظة 3',
    type: 'customer',
    accountBalanceValue: 1000,
  },
  {
    id: 4,
    name: 'أحمد خالد',
    mobileNumber: '0501112233',
    landLineNumber: '0112233445',
    address: 'المدينة المنورة، المملكة العربية السعودية',
    accountBalance: 5000,
    note: 'ملاحظة 4',
    type: 'shop',
    accountBalanceValue: 500,
  },
  {
    id: 5,
    name: 'ريما علي',
    mobileNumber: '0544445555',
    landLineNumber: '0123456789',
    address: 'جدة، المملكة العربية السعودية',
    accountBalance: -2500.5,
    note: 'ملاحظة 5',
    type: 'shop',
    accountBalanceValue: -200,
  },
  {
    id: 6,
    name: 'ناصر محمد',
    mobileNumber: '0577778888',
    landLineNumber: '0134567890',
    address: 'الرياض، المملكة العربية السعودية',
    accountBalance: 0,
    note: 'ملاحظة 6',
    type: 'partner',
    accountBalanceValue: 0,
  },
  {
    id: 6,
    name: 'انا',
    mobileNumber: '0577778888',
    landLineNumber: '0134567890',
    address: 'الرياض، المملكة العربية السعودية',
    accountBalance: 0,
    note: 'ملاحظة 6',
    type: 'me',
    accountBalanceValue: 0,
  },
];

export const counterSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addCustomer: (state, action) => {
      state.push(action.payload);
    },
    editCustomer: (state, action) => {
      const { id, ...updatedRow } = action.payload;
      const rowIndex = state.findIndex((row) => row.id === id);
      if (rowIndex !== -1)
        state[rowIndex] = { ...state[rowIndex], ...updatedRow };
    },
    deleteCustomer: (state, action) => {
      const index = state.findIndex((row) => row.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});

// // Action creators are generated for each case reducer function
export const { addCustomer, editCustomer, deleteCustomer } =
  counterSlice.actions;

export default counterSlice.reducer;
