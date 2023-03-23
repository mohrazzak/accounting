import { createSlice } from '@reduxjs/toolkit';
import { AiFillHome, AiOutlineShoppingCart } from 'react-icons/ai';
import { BsPersonLinesFill, BsFillCalendarDateFill } from 'react-icons/bs';
import { GiMoneyStack } from 'react-icons/gi';
import { ImBoxAdd } from 'react-icons/im';
import { RiMoneyDollarCircleLine, RiBook2Line } from 'react-icons/ri';
const initialState = [
  { title: 'الرئيسية', url: '/', icon: 'AiFillHome' },
  {
    title: 'اليومية',
    url: '/daily',
    icon: 'RiBook2Line',
  },
  { title: 'الزبائن', url: '/customers', icon: 'BsPersonLinesFill' },
  {
    title: 'السوق',
    url: '/shops',
    icon: 'AiOutlineShoppingCart',
  },
  { title: 'المستودع', url: '/storage', icon: 'ImBoxAdd' },
  {
    title: 'المصروف',
    url: '/expenses',
    icon: 'RiMoneyDollarCircleLine',
  },
  { title: 'السحوبات', url: '/withdrawals', icon: 'GiMoneyStack' },
  {
    title: 'الجرد الشهري',
    url: '/monthly-inventory',
    icon: 'BsFillCalendarDateFill',
  },
];

export const getIconComponent = (iconName) => {
  switch (iconName) {
    case 'AiFillHome':
      return AiFillHome;
    case 'AiOutlineShoppingCart':
      return AiOutlineShoppingCart;
    case 'BsPersonLinesFill':
      return BsPersonLinesFill;
    case 'BsFillCalendarDateFill':
      return BsFillCalendarDateFill;
    case 'GiMoneyStack':
      return GiMoneyStack;
    case 'ImBoxAdd':
      return ImBoxAdd;
    case 'RiMoneyDollarCircleLine':
      return RiMoneyDollarCircleLine;
    case 'RiBook2Line':
      return RiBook2Line;
    default:
      return null;
  }
};

export const counterSlice = createSlice({
  name: 'pages',
  initialState,
  reducers: [],
});

// // Action creators are generated for each case reducer function
export const {} = counterSlice.actions;

export default counterSlice.reducer;
