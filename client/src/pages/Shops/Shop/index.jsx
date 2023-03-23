import React, { useState } from 'react';
import MyTable from '../../../components/MyTable';
import PageLayout from '../../../components/PageLayout';
import MyDialog from '../../../components/MyDialog';
import { Box, Button, Typography } from '@mui/material';
import useTable from '../../../hooks/useTable';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import {
  addCustomer,
  deleteCustomer,
  editCustomer,
} from '../../../store/users';
import { useDispatch } from 'react-redux';
import PageHeading from '../../../components/PageHeading';
import { useNavigate, useParams } from 'react-router-dom';
import userImage from '../../../assets/userImage.png';
const PAGE_TITLE = 'الزبائن';
const COLUMNS = [
  {
    id: 'id',
    label: 'رقم الفاتورة',
    minWidth: 80,
    align: 'center',
    isInvoice: true,
    urlPath: 'invoices',
  },
  // {
  //   id: 'productName',
  //   label: 'اسم المنتج',
  //   minWidth: 100,
  //   align: 'center',
  //   isField: true,
  //   options: [
  //     { value: 'منتج 1', id: '1' },
  //     { value: 'منتج 2', id: '2' },
  //   ],
  // },
  // {
  //   id: 'type',
  //   label: 'النوع',
  //   minWidth: 150,
  //   align: 'center',
  //   isField: false,
  //   required: true,
  //   options: [
  //     { value: 'ادخال', id: '1' },
  //     { value: 'صادر', id: '2' },
  //   ],
  // },
  {
    id: 'value',
    label: 'المبلغ',
    minWidth: 150,
    align: 'left',
    isField: true,
    required: true,
    isLink: false,
  },
  {
    id: 'values',
    label: 'القيمة',
    minWidth: 150,
    align: 'left',
    isField: true,
    required: true,
    isLink: false,
  },
  // {
  //   id: 'count',
  //   label: 'العدد',
  //   minWidth: 100,
  //   align: 'center',
  //   isField: true,
  // },
  {
    id: 'note',
    label: 'ملاحظة',
    minWidth: 170,
    align: 'left',
    isField: true,
  },
  {
    id: 'date',
    label: 'التاريخ',
    minWidth: 120,
    align: 'center',
  },
];
const DAILY_ROW_INTIAL_VALUE = {
  value: '',
  values: '',
  type: 'صادر',
  productName: '',
  count: '',
  note: '',
};
const validationSchema = Yup.object({
  amount: Yup.string().required('يرجى إدخال المبلغ'),
  type: Yup.string().required('يرجى إدخال نوع الفاتورة'),
  productName: Yup.string().required('يرجى إدخال اسم المنتج'),
  count: Yup.number().required('يرجى إدخال الكمية'),
  note: Yup.string(),
});
const index = () => {
  const navigate = useNavigate();
  const params = useParams();
  const pageFields = [
    { fieldName: 'رقم الحساب', value: '12' },
    { fieldName: 'النوع', value: 'تاجر سوق' },

    { fieldName: 'رقم الهاتف', value: '0995587028' },
    { fieldName: 'رقم الارضي', value: '432325435' },

    { fieldName: 'العنوان', value: 'حلب جمعية الزهؤاء' },
    { fieldName: 'ملاحظة', value: 'ملاحظة ' },
    {
      fieldName: 'صافي الحساب',
      value: -100,
      isMoney: true,
    },
    {
      fieldName: 'صافي الحساب',
      value: 15,
      isMoney: true,
    },
  ];
  const { dialog, setDialog, handleOpenAddDialog } = useTable(
    DAILY_ROW_INTIAL_VALUE
  );
  const dispatch = useDispatch();
  const rows = useSelector((state) => state.dailyRows);
  const dispatchers = {
    add: (customer) => dispatch(addCustomer({ ...customer, isCustomer: true })),
    edit: (editedCustomer) =>
      dispatch(editCustomer({ ...editedCustomer, isCustomer: true })),
    delete: (customerId) => dispatch(deleteCustomer(customerId)),
  };
  return (
    <PageLayout title="صفحة زبون">
      <Box>
        <Box sx={{ width: '100px', overflow: 'hidden', margin: 'auto', mb: 3 }}>
          <img
            src={userImage}
            alt="user image"
            width="100%"
            style={{ objectFit: 'contain' }}
          />
        </Box>
        <Box sx={{ mb: 6 }}>
          <Typography
            sx={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: '2rem',
              mb: 4,
            }}
          >
            ابراهيم محمد
          </Typography>
          {pageFields.map((pf) => (
            <Box sx={{ mb: 3 }}>
              <Typography
                sx={{
                  display: 'inline-block',
                  mr: 4,
                  fontWeight: 'bold',
                  fontSize: '1.3rem',
                  minWidth: '120px',
                }}
              >
                {`${pf.fieldName}:`}
              </Typography>
              <Typography
                sx={{
                  display: 'inline-block',
                  direction: pf.isMoney && 'rtl',
                  textAlign: pf.isMoney && 'center',

                  color: pf.isMoney
                    ? pf.value >= 0
                      ? 'green'
                      : 'tomato'
                    : 'inherit',
                  fontSize: '1.3rem',
                  fontWeight: pf.isMoney && 'bold',
                  minWidth: '120px',
                }}
              >
                {`${pf.value}`}
              </Typography>
            </Box>
          ))}
        </Box>
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
            onClick={() => navigate('invoices/add')}
          >
            {`انشاء فاتورة`}
          </Button>
        </Box>
        {/* <MyDialog
          title={`فاتورة ${PAGE_TITLE}`}
          dialog={dialog}
          setDialog={setDialog}
          ROW_INTIAL_VALUE={DAILY_ROW_INTIAL_VALUE}
          FIELDS={COLUMNS.filter((e) => e.isField)}
          rows={rows}
          validationSchema={validationSchema}
          dispatchers={dispatchers}
        /> */}
      </Box>
    </PageLayout>
  );
};

export default index;
