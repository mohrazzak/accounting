import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  {
    id: 1,
    accountId: 1,
    accountType: 'customer',
    accountName: 'علي',
    value: 50000,
    values: 300,
    billType: 'ادخال',
    invoice: '001',
    note: 'لا يوجد',
    timestamp: '10:00:00',
  },
  {
    id: 2,
    accountId: 1,
    accountName: 'علي',
    accountType: 'shop',

    value: 50000,
    values: 300,
    billType: 'ادخال',
    invoice: '002',
    note: 'لا يوجد',
    timestamp: '10:00:00',
  },
  {
    id: 3,
    accountId: 2,
    accountName: 'ممدوح',
    value: 50000,
    values: 300,
    billType: 'ادخال',
    invoice: '003',
    note: 'لا يوجد',
    timestamp: '10:00:00',
  },
  {
    id: 4,
    accountId: 3,
    accountName: 'حسن',
    value: 1000,
    values: 200,
    billType: 'صادر',
    invoice: '004',
    note: 'دفعة مستحقة',
    timestamp: '11:00:00',
  },
  {
    id: 5,
    accountId: 4,
    accountName: 'ابراهيم',
    value: 300000,
    values: 1500,
    billType: 'سحوبات',
    invoice: '005',
    note: 'دفعة مستحقة',
    timestamp: '11:00:00',
  },
  {
    id: 6,
    accountId: 5,
    accountName: 'محمود',
    value: 160000,
    values: 600,
    billType: 'مصروف',
    invoice: '006',
    note: 'دفعة مستحقة',
    timestamp: '11:00:00',
  },
  {
    id: 5,
    accountId: 6,
    accountName: 'صافي',
    value: 300000,
    values: 1000,
    billType: 'ادخال',
    invoice: '007',
    note: 'دفعة مستحقة',
    timestamp: '11:00:00',
  },
];

export const counterSlice = createSlice({
  name: 'dailyRows',
  initialState,
  reducers: {
    addDailyRow: (state, action) => {
      state.push(action.payload);
    },
    editDailyRow: (state, action) => {
      const { invoice, ...updatedRow } = action.payload;
      const rowIndex = state.findIndex((row) => row.invoice === invoice);
      if (rowIndex !== -1)
        state[rowIndex] = { ...state[rowIndex], ...updatedRow };
    },
    deleteDailyRow: (state, action) => {
      const index = state.findIndex((row) => row.invoice === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});

// // Action creators are generated for each case reducer function
export const { addDailyRow, editDailyRow, deleteDailyRow } =
  counterSlice.actions;

export default counterSlice.reducer;
