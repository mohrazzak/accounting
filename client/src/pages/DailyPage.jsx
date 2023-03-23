import React, { useState } from 'react';
import MyTable from '../components/MyTable';
import PageLayout from '../components/PageLayout';
import MyDialog from '../components/MyDialog';
import { Box, Button } from '@mui/material';
import CustomTableHeading from '../components/CustomTableHeading';
import useTable from '../hooks/useTable';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { addDailyRow, deleteDailyRow, editDailyRow } from '../store/dailyRows';
import PageHeading from '../components/PageHeading';

const PAGE_TITLE = 'اليومية';
const prevBalance = [
  { title: 'الأساس', value: 0 },
  { title: 'قيمة الأساس', value: 0 },
];

const DAILY_ROW_INTIAL_VALUE = {
  accountId: '',
  id: '',
  accountName: '',
  value: '',
  values: '',
  billType: '',
  note: '',
};
const dailyBalance = [
  { title: 'المدور', value: 0 },
  { title: 'قيمة المدور', value: 0 },
];

const DailyPage = () => {
  const { dialog, setDialog, handleOpenAddDialog } = useTable(
    DAILY_ROW_INTIAL_VALUE
  );
  const dispatch = useDispatch();

  const dispatchers = {
    add: (row) => dispatch(addDailyRow(row)),
    edit: (editedRow) => dispatch(editDailyRow(editedRow)),
    delete: (invoiceId) => dispatch(deleteDailyRow(invoiceId)),
  };
  const rows = useSelector((state) => state.dailyRows);

  const validationSchema = Yup.object({
    accountName: Yup.string().required('يرجى إدخال اسم الحساب'),
    value: Yup.number().required('يرجى إدخال المبلغ'),
    values: Yup.number().required('يرجى إدخال القيمة'),
    note: Yup.string(),
    billType: Yup.string().required('يرجى اختيار نوع الفاتورة'),
  });
  const users = useSelector((state) => state.users);

  const COLUMNS = [
    {
      id: 'id',
      label: 'رقم الفاتورة',
      minWidth: 70,
      align: 'center',
      isField: false,
    },
    {
      id: 'accountId',
      label: 'ايدي الحساب',
      minWidth: 80,
      align: 'center',
      isField: false,
      isLink: false,
    },
    {
      id: 'accountName',
      label: 'اسم الحساب',
      minWidth: 150,
      align: 'left',
      isField: true,
      options: users.map((user) => ({
        value: user.name,
        id: user.id,
        type: user.type,
      })),
      required: true,
      isLink: true,
    },
    {
      id: 'value',
      label: 'المبلغ',
      minWidth: 100,
      align: 'center',
      format: (value) => value.toLocaleString('en-US'),
      isField: true,
      required: true,
      isBill: true,
    },
    {
      id: 'values',
      label: 'القيمة',
      minWidth: 50,
      align: 'center',
      format: (value) => value.toLocaleString('en-US'),
      isField: true,
      isBill: true,
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
      id: 'note',
      label: 'ملاحظة',
      minWidth: 170,
      align: 'left',
      isField: true,
    },
  ];

  return (
    <PageLayout>
      <PageHeading title="صفحة اليومية" />
      <Box>
        <CustomTableHeading rows={prevBalance} />
        <MyTable
          COLUMNS={COLUMNS}
          deletedLabel={`فاتورة ${PAGE_TITLE}`}
          setDialog={setDialog}
          rows={rows}
          dispatchers={dispatchers}
        />
        <CustomTableHeading rows={dailyBalance} />
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
          {'اضافة فاتورة جديدة'}
        </Button>
      </Box>
      <MyDialog
        title={`فاتورة ${PAGE_TITLE}`}
        dialog={dialog}
        setDialog={setDialog}
        ROW_INTIAL_VALUE={DAILY_ROW_INTIAL_VALUE}
        validationSchema={validationSchema}
        FIELDS={COLUMNS.filter((e) => e.isField)}
        rows={rows}
        dispatchers={dispatchers}
      />
    </PageLayout>
  );
};

export default DailyPage;
