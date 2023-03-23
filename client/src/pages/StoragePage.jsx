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
const PAGE_TITLE = 'المستودع';
const COLUMNS = [
  {
    id: 'id',
    label: 'رقم المنتج',
    minWidth: 80,
    align: 'center',
    isField: false,
  },
  {
    id: 'name',
    label: 'اسم المنتج',
    minWidth: 150,
    align: 'left',
    isField: true,
    required: true,
  },
  {
    id: 'count',
    label: 'العدد',
    minWidth: 100,
    align: 'center',
    isField: true,
    required: true,
  },
  {
    id: 'valuePerEach',
    label: 'القيمة للواحدة',
    minWidth: 100,
    align: 'center',
    isField: true,
    isPrice: true,
  },
  {
    id: 'colors',
    label: 'الألوان',
    minWidth: 100,
    align: 'center',
    isField: true,
    // required: true,
  },
  {
    id: 'sizes',
    label: 'المقاسات',
    minWidth: 100,
    align: 'center',
    isField: true,
    // required: true,
  },
  {
    id: 'note',
    label: 'ملاحظة',
    minWidth: 100,
    align: 'center',
    isField: true,
  },
];

const LOGS_ROW_INTIAL_VALUE = {
  invoice: '',
  accountId: '',
  accountName: '',
  productName: '',
  productColors: '',
  productSizes: '',
  billType: '',
  billNote: '',
  values: '',
};
const DAILY_ROW_INTIAL_VALUE = {
  id: '',
  name: '',
  stock: '',
  valuePerEach: '',
  note: '',
  sizes: '',
  colors: '',
};
const LOGS_VALIDATION_SCHEMA = Yup.object({
  accountName: Yup.string().required('يرجى إدخال اسم الحساب '),
  productName: Yup.string().required('يرجى إدخال اسم المنتج'),
  productColors: Yup.string(),
  productSizes: Yup.string(),
  billType: Yup.string().required('يرجى إدخال نوع الفاتورة'),
  billNote: Yup.string(),
  values: Yup.number().required('يرجى إدخال القيمة'),
});

const validationSchema = Yup.object({
  name: Yup.string().required('يرجى إدخال اسم المنتج'),
  stock: Yup.number().required('يرجى إدخال الكمية المتاحة'),
  valuePerEach: Yup.number().required('يرجى إدخال قيمة القطعة الواحدة'),
  note: Yup.string(),
  colors: Yup.string(),
  sizes: Yup.string(),
});

const ShopsPage = () => {
  const { dialog, setDialog, handleOpenAddDialog } = useTable(
    DAILY_ROW_INTIAL_VALUE
  );
  const dispatch = useDispatch();
  const rows = useSelector((state) => state.products);

  const dispatchers = {
    add: (prod) => dispatch(addProduct(prod)),
    edit: (editedProd) => dispatch(editProduct(editedProd)),
    delete: (prodId) => dispatch(deleteProduct(prodId)),
  };

  const users = useSelector((state) => state.users);
  const logs = useSelector((state) => state.storageLogs);

  const LOGS_COLUMNS = [
    {
      id: 'invoice',
      label: 'رقم الفاتورة',
      minWidth: 50,
      align: 'center',
      isField: false,
    },
    {
      id: 'accountId',
      label: 'رقم الحساب',
      minWidth: 50,
      align: 'left',
      isField: false,
    },
    {
      id: 'accountName',
      label: 'اسم الحساب',
      minWidth: 100,
      isLink: true,
      options: users.map((user) => ({
        value: user.name,
        id: user.id,
        isCustomer: user.isCustomer,
      })),
      align: 'center',
      required: true,
      isField: true,
    },
    {
      id: 'productName',
      label: 'اسم المنتج',
      options: rows.map((row) => ({ value: row.name, id: row.id })),
      minWidth: 80,
      align: 'center',
      isField: true,
      required: true,
    },
    {
      id: 'billType',
      label: 'نوع الفاتورة',
      type: 'select',
      options: [
        { value: 'ادخال' },
        { value: 'صادر' },
        { value: 'مصروف' },
        { value: 'سحوبات' },
      ],
      required: true,
      isField: true,
    },
    {
      id: 'billNote',
      label: 'ملاحظة الفاتورة',
      minWidth: 170,
      align: 'left',
      isField: true,
    },
    {
      id: 'values',
      label: 'قيمة المبلغ',
      minWidth: 100,
      align: 'center',
      isField: true,
      format: (value) => value.toLocaleString('en-US'),
      isMoney: true,
    },
  ];

  return (
    <PageLayout title={`صفحة ${PAGE_TITLE}`}>
      <TableSubHeader title="المستودع" />
      <Box>
        <MyTable
          columns={COLUMNS}
          deletedLabel={`فاتورة ${PAGE_TITLE}`}
          setDialog={setDialog}
          rows={rows}
          COLUMNS={COLUMNS}
          validationSchema
          dispatchers={dispatchers}
        />
        <Button
          variant="contained"
          sx={{
            height: '60px',
            margin: '2rem auto',
            display: 'block',
            width: '50%',
          }}
          color="error"
          onClick={handleOpenAddDialog}
        >
          {`اضافة منتج`}
        </Button>
      </Box>
      {/* <TableSubHeader title="سجل المستودع" />
      <LogsTable
        deletedLabel={`فاتورة ${PAGE_TITLE}`}
        rows={logs}
        validationSchema={LOGS_VALIDATION_SCHEMA}
        columns={LOGS_COLUMNS}
        rowInitialValue={LOGS_ROW_INTIAL_VALUE}
        dispatchers={dispatchers}
      /> */}
      <MyDialog
        title={`فاتورة ${PAGE_TITLE}`}
        dialog={dialog}
        setDialog={setDialog}
        ROW_INTIAL_VALUE={DAILY_ROW_INTIAL_VALUE}
        FIELDS={COLUMNS.filter((e) => e.isField)}
        rows={rows}
        validationSchema={validationSchema}
        dispatchers={dispatchers}
      />
    </PageLayout>
  );
};

export default ShopsPage;
