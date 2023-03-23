import React, { useState } from 'react';
import MyTable from '../../../components/MyTable';
import PageLayout from '../../../components/PageLayout';
import MyDialog from '../../../components/MyDialog';
import { Box, Breadcrumbs, Button, Typography } from '@mui/material';
import useTable from '../../../hooks/useTable';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
// import { addCustomer, deleteCustomer, editCustomer } from '../store/users';
import { useDispatch } from 'react-redux';
import {
  addProduct,
  deleteProduct,
  editProduct,
} from '../../../store/products';
import Logs from '../../../components/Logs';
import PageHeading from '../../../components/PageHeading';
import TableSubHeader from '../../../components/TableSubHeader';
import LogsTable from '../../../components/LogsTable';
import { Link, useParams } from 'react-router-dom';

const PAGE_TITLE = 'فاتورة رقم';
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
    isField: false,
    required: true,
  },
  {
    id: 'valuePerEach',
    label: 'المبلغ للواحدة',
    minWidth: 100,
    align: 'center',
    isField: true,
  },
  {
    id: 'valuesPerEach',
    label: 'القيمة للواحدة',
    minWidth: 100,
    align: 'center',
    isField: true,
  },
  {
    id: 'totalValue',
    label: 'المبلغ الاجمالي',
    minWidth: 100,
    align: 'center',
    isField: false,
  },
  {
    id: 'totalValues',
    label: 'القيمة الاجمالية',
    minWidth: 100,
    align: 'center',
    isField: false,
  },
  {
    id: 'colors',
    label: 'الألوان',
    minWidth: 100,
    align: 'center',
    isField: true,
  },
  {
    id: 'sizes',
    label: 'المقاسات',
    minWidth: 100,
    align: 'center',
    isField: true,
  },
  {
    id: 'note',
    label: 'ملاحظة',
    minWidth: 100,
    align: 'center',
    isField: true,
  },
];
const dictionary = {
  customers: 'الزبائن',
  invoices: 'الفاتورة',
  shops: 'السوق',
  storage: 'المستودع',
};
const DAILY_ROW_INTIAL_VALUE = {
  name: '',
  stock: '',
  valuePerEach: '',
  valuesPerEach: '',
  totalValue: '',
  totalValues: '',
  sizes: '',
  colors: '',
  note: '',
};

const validationSchema = Yup.object({
  name: Yup.string().required('يرجى إدخال اسم المنتج'),
  stock: Yup.number().required('يرجى إدخال الكمية المتاحة'),
  valuePerEach: Yup.number().required('يرجى إدخال مبلغ القطعة الواحدة'),
  valuesPerEach: Yup.number().required('يرجى إدخال قيمة القطعة الواحدة'),
  note: Yup.string(),
  colors: Yup.string(),
  sizes: Yup.string(),
});

const CustomerInvoice = () => {
  const params = useParams();
  const { dialog, setDialog, handleOpenAddDialog } = useTable(
    DAILY_ROW_INTIAL_VALUE
  );
  const dispatch = useDispatch();
  const rows = useSelector((state) => state.products);
  const invoiceId = params.invoiceId;
  const dispatchers = {
    add: (prod) => dispatch(addToInvoice(invoiceId, prod)),
    edit: (editedProd) => dispatch(editProduct(invoiceId, editedProd)),
    delete: (prodId) => dispatch(deleteProduct(invoiceId, prodId)),
  };

  return (
    <PageLayout title={`صفحة ${PAGE_TITLE}`}>
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
          {`اضافة منتج للفاتورة`}
        </Button>
      </Box>
      <MyDialog
        title={`منتج جديد للفاتورة`}
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

export default CustomerInvoice;
