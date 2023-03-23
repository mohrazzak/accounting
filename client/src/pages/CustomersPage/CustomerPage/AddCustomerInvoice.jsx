import React from 'react';
import PageLayout from '../../../components/PageLayout';
import { AiOutlineCloseCircle } from 'react-icons/ai';
const PAGE_TITLE = 'انشاء فاتورة';
import { Formik, Form, Field, FieldArray, useFormik } from 'formik';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Paper,
  Typography,
} from '@mui/material';
import { TextField } from 'formik-material-ui';
import { object, number, string, array } from 'yup';
const AddCustomerInvoice = () => {
  return (
    <PageLayout title={`صفحة ${PAGE_TITLE}`}>
      <Formik
        initialValues={{
          products: [{ name: '', count: '', value: '', values: '', note: '' }],
        }}
        validationSchema={object({
          products: array(
            object({
              name: string().required('يرجى اختيار المنتج'),
              count: number()
                .min(1, 'يرجى كتابة عدد اكبر من الصفر')
                .required('يرجى تحديد عدد البضاعة'),
              value: number()
                .min(1, 'يرجى كتابة عدد اكبر من الصفر')
                .required('يرجى كتابة المبلغ'),
              values: number()
                .min(1, 'يرجى كتابة عدد اكبر من الصفر')
                .required('يرجى كتابة القيمة'),
              note: string(),
            })
          ).min(1, 'يرجى اضافة منتج واحد على الاقل للفاتورة'),
        })}
        onSubmit={(values) => {
          console.log(values);
          return new Promise((res) => setTimeout(res, 2500));
        }}
      >
        {({ values, errors, touched, isSubmitting }) => (
          <Form autoComplete="off">
            <Grid container>
              <FieldArray name="products">
                {({ push, remove }) => (
                  <>
                    <Grid container>
                      {values.products.map((_, index) => (
                        <Box
                          key={index}
                          sx={{
                            width: '100%',
                            p: 2,
                            mb: 3,
                            boxShadow: '0px 0px 10px 1px #0d0d0d4a',
                            borderRadius: '.5rem',
                          }}
                        >
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              mb: 2,
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: '1.3rem',
                                width: '100%',
                              }}
                            >
                              المنتج رقم {index + 1}
                            </Typography>
                            <IconButton
                              onClick={() => remove(index)}
                              variant="outlined"
                              color="error"
                              size="large"
                            >
                              <AiOutlineCloseCircle />
                            </IconButton>
                          </Box>
                          <Grid item sx={{ width: '100%' }}>
                            <Field
                              name={`products.[${index}].name`}
                              component={TextField}
                              label="اسم المنتج"
                              fullWidth
                              sx={{ mb: 3 }}
                            />
                          </Grid>
                          <Grid item sx={{ width: '100%' }}>
                            <Field
                              name={`products.[${index}].count`}
                              type="number"
                              component={TextField}
                              label="العدد"
                              fullWidth
                              sx={{ mb: 3 }}
                            />
                          </Grid>
                          <Grid item sx={{ width: '100%' }}>
                            <Field
                              name={`products.[${index}].value`}
                              type="number"
                              component={TextField}
                              label="المبلغ للواحدة"
                              fullWidth
                              sx={{ mb: 3 }}
                            />
                          </Grid>
                          <Grid item sx={{ width: '100%' }}>
                            <Field
                              name={`products.[${index}].values`}
                              type="number"
                              component={TextField}
                              label="القيمة للواحدة"
                              fullWidth
                              sx={{ mb: 3 }}
                            />
                          </Grid>
                          <Grid item sx={{ width: '100%' }}>
                            <Field
                              name={`products.[${index}].note`}
                              component={TextField}
                              label="ملاحظة"
                              fullWidth
                              sx={{ mb: 3 }}
                            />
                          </Grid>
                        </Box>
                      ))}
                      <Grid
                        container
                        sx={{ width: '100%' }}
                        spacing={2}
                        justifyContent={'space-between'}
                      >
                        <Grid item sx={{ width: '50%' }}>
                          <Button
                            onClick={() =>
                              push({
                                name: '',
                                count: '',
                                value: '',
                                values: '',
                                note: '',
                              })
                            }
                            fullWidth
                            variant="outlined"
                            color="info"
                          >
                            اضافة منتج جديد
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </>
                )}
              </FieldArray>
              <Grid item sx={{ direction: 'rtl', width: '100%' }}>
                <Button
                  variant="contained"
                  color="success"
                  sx={{ p: 2, mt: 3 }}
                  type="submit"
                  fullWidth
                  disabled={isSubmitting}
                  startIcon={
                    isSubmitting && (
                      <CircularProgress size={'1rem'} sx={{ ml: 2 }} />
                    )
                  }
                >
                  {isSubmitting ? 'جاري الانشاء' : 'انشاء الفاتورة'}
                </Button>
                <Typography
                  sx={{
                    color: 'tomato',
                    mt: 3,
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}
                >
                  {values.products.length === 0 &&
                    'يرجى تحديد منتج واحد على الاقل'}
                </Typography>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </PageLayout>
  );
};

export default AddCustomerInvoice;
