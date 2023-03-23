import React, { useState } from 'react';
import MyTable from '../components/MyTable';
import PageLayout from '../components/PageLayout';
import MyDialog from '../components/MyDialog';
import { Box, Button } from '@mui/material';
import useTable from '../hooks/useTable';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
// import { addCustomer, deleteCustomer, editCustomer } from '../store/users';
import { useDispatch } from 'react-redux';
import { addProduct, deleteProduct, editProduct } from '../store/products';
import Logs from '../components/Logs';
import PageHeading from '../components/PageHeading';
import TableSubHeader from '../components/TableSubHeader';
import LogsTable from '../components/LogsTable';
import { deleteMonthly, editMonthly } from '../store/monthlyInventory';
const PAGE_TITLE = 'الجرد الشهري';

const LOGS_ROW_INTIAL_VALUE = {
  value: '',
  values: '',
};

const LOGS_COLUMNS = [
  {
    id: 'month',
    label: 'الشهر',
    minWidth: 100,
    align: 'center',
    isField: false,
  },
  {
    id: 'input',
    label: 'ادخال',
    minWidth: 100,
    align: 'center',
    isField: true,
    isMoney: true,
  },
  {
    id: 'output',
    label: 'صادر',
    minWidth: 100,
    align: 'center',
    isField: true,
    isMoney: true,
  },
  {
    id: 'withdrawal',
    label: 'سحوبات',
    minWidth: 100,
    align: 'center',
    isField: true,
    isMoney: true,
  },
  {
    id: 'expense',
    label: 'مصروف',
    minWidth: 100,
    align: 'center',
    isField: true,
    isMoney: true,
  },
];
const LOGS_VALIDATION_SCHEMA = Yup.object({
  value: Yup.number().required('يرجى إدخال المبلغ '),
  values: Yup.string().required('يرجى إدخال القيمة'),
});
const MonthlyInventoryPage = () => {
  const dispatch = useDispatch();
  const dispatchers = {
    edit: (editedProd) => dispatch(editMonthly(editedProd)),
    delete: (prodId) => dispatch(deleteMonthly(prodId)),
  };
  const logs = useSelector((state) => state.monthlyInventory);

  return (
    <PageLayout>
      <PageHeading title="الجرد الشهري" />
      <LogsTable
        deletedLabel={`فاتورة ${PAGE_TITLE}`}
        rows={logs}
        validationSchema={LOGS_VALIDATION_SCHEMA}
        columns={LOGS_COLUMNS}
        rowInitialValue={LOGS_ROW_INTIAL_VALUE}
        dispatchers={dispatchers}
      />
    </PageLayout>
  );
};

export default MonthlyInventoryPage;
