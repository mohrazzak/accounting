import React, { useState } from 'react';
import MyTable from '../../components/MyTable';
import PageLayout from '../../components/PageLayout';
import MyDialog from '../../components/MyDialog';
import { Box, Button } from '@mui/material';
import useTable from '../../hooks/useTable';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { addCustomer, deleteCustomer, editCustomer } from '../../store/users';
import { useDispatch } from 'react-redux';
import PageHeading from '../../components/PageHeading';
import { deleteDailyRow, editDailyRow } from '../../store/dailyRows';
import CustomTableHeading from '../../components/CustomTableHeading';

const PAGE_TITLE = 'سحب';

const DAILY_ROW_INTIAL_VALUE = {
  id: '',
  name: '',
  value: 0,
  values: 0,
};

const validationSchema = Yup.object({
  name: Yup.string().required('يرجى إدخال اسم الحساب'),
  value: Yup.number().required('يرجى كتابة المبلغ'),
  values: Yup.number().required('يرجى كتابة قيمة المبلغ'),
  note: Yup.string(),
});
const ExpensesPage = () => {
  const { dialog, setDialog, handleOpenAddDialog } = useTable(
    DAILY_ROW_INTIAL_VALUE
  );
  const dispatch = useDispatch();
  const dailyRows = useSelector((state) => state.dailyRows);
  const users = useSelector((state) => state.users);
  const me = users.filter((user) => user.type === 'me');
  let rows = dailyRows.filter((row) => row.billType === 'مصروف');
  rows = rows.map((row) => ({
    id: row.accountId,
    name: row.accountName,
    invoice: row.id,
    value: row.value,
    values: row.values,
  }));
  const prevBalance = [
    { title: 'المبلغ الاجمالي', value: 32132 },
    { title: 'القيمة الاجمالية', value: -321 },
  ];
  const COLUMNS = [
    {
      id: 'id',
      label: 'رقم الحساب',
      minWidth: 80,
      align: 'center',
      isField: false,
    },
    {
      id: 'invoice',
      label: 'رقم الفاتورة',
      minWidth: 80,
      align: 'center',
      isField: false,
    },
    {
      id: 'name',
      label: 'اسم الحساب',
      minWidth: 150,
      align: 'left',
      isField: true,
      required: true,
      // isLink: true,
      options: me.map((partner) => ({
        value: partner.name,
        id: partner.id,
      })),
    },
    {
      id: 'value',
      label: 'المبلغ',
      minWidth: 50,
      align: 'center',
      isField: true,
      format: (value) => value.toLocaleString('en-US'),
      isMoney: true,
    },
    {
      id: 'values',
      label: 'القيمة',
      minWidth: 50,
      align: 'center',
      isField: true,
      format: (value) => value.toLocaleString('en-US'),
      isMoney: true,
    },
  ];
  const dispatchers = {
    edit: (editedInvoice) => {
      dispatch(editDailyRow(editedInvoice));
    },
    delete: (invoiceId) => dispatch(deleteDailyRow(invoiceId)),
  };
  return (
    <PageLayout title={`صفحة ${PAGE_TITLE}`}>
      <PageHeading title="صفحة المصروف" />
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

        <CustomTableHeading rows={prevBalance} />
      </Box>
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

export default ExpensesPage;
