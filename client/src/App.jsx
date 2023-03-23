import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  Router,
  RouterProvider,
  Routes,
} from 'react-router-dom';
import ErrorPage from './pages/others/ErrorPage';
import Root from './pages/others/Root';
import { createTheme, ThemeProvider } from '@mui/material';
import store from './store/index';
import { Provider } from 'react-redux';
import HomePage from './pages/HomePage';
import DailyPage from './pages/DailyPage';
import ExpensesPage from './pages/ExpensesPage';
// import MonthlyInventoryPage from './pages/MonthlyInventoryPage';
import StoragePage from './pages/StoragePage';
import WithdrawalsPage from './pages/WithDrawalsPage';
import CustomersPage from './pages/CustomersPage';
import CustomerPage from './pages/CustomersPage/CustomerPage';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import ShopsPage from './pages/Shops';
import ShopPage from './pages/Shops/Shop';
import Login from './pages/LoginPage';
import PrivateRoute from './components/PrivateRoute';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/PrivateRoute';
import MonthlyInventoryPage from './pages/MonthlyInventoryPage';
import CustomerInvoice from './pages/CustomersPage/CustomerPage/CustomerInvoice';
import ShopInvoice from './pages/Shops/Shop/ShopInvoice.jsx';
import AddShopInvoice from './pages/Shops/Shop/AddShopInvoice.jsx';
import AddCustomerInvoice from './pages/CustomersPage/CustomerPage/AddCustomerInvoice';
import ExpensePage from './pages/ExpensesPage/ExpensePage';
import WithDrawalPage from './pages/WithDrawalsPage/WithDrawalPage';
// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

const theme = createTheme({
  typography: {
    fontFamily: ['Droid Arabic Naskh', 'sans-serif'].join(','),
  },
  direction: 'rtl',
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: (
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        ),
      },
      { path: '/login', element: <Login /> },
      {
        path: '/daily',
        element: (
          <PrivateRoute>
            <DailyPage />
          </PrivateRoute>
        ),
      },
      {
        path: '/expenses',
        element: (
          <PrivateRoute>
            <ExpensesPage />
          </PrivateRoute>
        ),
      },
      {
        path: '/expenses/:id',
        element: (
          <PrivateRoute>
            <ExpensePage />
          </PrivateRoute>
        ),
      },
      {
        path: '/monthly-inventory',
        element: (
          <PrivateRoute>
            <MonthlyInventoryPage />
          </PrivateRoute>
        ),
      },
      {
        path: '/shops',
        element: (
          <PrivateRoute>
            <ShopsPage />
          </PrivateRoute>
        ),
      },
      {
        path: '/shops/:id',
        element: (
          <PrivateRoute>
            <ShopPage />
          </PrivateRoute>
        ),
      },
      {
        path: '/storage',
        element: (
          <PrivateRoute>
            <StoragePage />
          </PrivateRoute>
        ),
      },
      {
        path: '/withdrawals',
        element: (
          <PrivateRoute>
            <WithdrawalsPage />
          </PrivateRoute>
        ),
      },
      {
        path: '/withdrawals/:id',
        element: (
          <PrivateRoute>
            <WithDrawalPage />
          </PrivateRoute>
        ),
      },
      {
        path: '/customers',
        element: (
          <PrivateRoute>
            <CustomersPage />
          </PrivateRoute>
        ),
      },
      {
        path: '/customers/:id',
        element: (
          <PrivateRoute>
            <CustomerPage />
          </PrivateRoute>
        ),
      },
      {
        path: '/customers/:customerId/invoices/:invoiceId',
        element: (
          <PrivateRoute>
            <CustomerInvoice />
          </PrivateRoute>
        ),
      },
      {
        path: '/shops/:shopId/invoices/:invoiceId',
        element: (
          <PrivateRoute>
            <CustomerInvoice />
          </PrivateRoute>
        ),
      },
      {
        path: '/customers/:customerId/invoices/add',
        element: (
          <PrivateRoute>
            <AddCustomerInvoice />
          </PrivateRoute>
        ),
      },
      {
        path: '/shops/:shopId/invoices/add',
        element: (
          <PrivateRoute>
            <AddShopInvoice />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
function App() {
  return (
    <CacheProvider value={cacheRtl}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router} />
          {/* <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <HomePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/daily"
                element={
                  <ProtectedRoute>
                    <DailyPage />
                  </ProtectedRoute>
                }
              />

              <Route path="/login" element={<Login />} />
            </Routes>
          </BrowserRouter> */}
        </ThemeProvider>
      </Provider>
    </CacheProvider>
  );
}

export default App;
