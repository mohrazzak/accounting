import React from 'react';
import { Breadcrumbs } from '@mui/material';
import { Link } from 'react-router-dom';
const PageLinks = ({ history }) => {
  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2, padding: '.5rem 2rem' }}>
      {history.map((segment, index) => {
        const isInvoiceLink = /\/[A-Za-z0-9]+\/[0-9]+\/[A-Za-z0-9]+\/[0-9]+/i;
        if (segment.label === 'الفواتير') return;
        if (segment.link.match(isInvoiceLink))
          return (
            <Link
              key={segment.link}
              style={{
                color: index === history.length - 1 ? 'textPrimary' : 'inherit',
              }}
              to={segment.link}
            >
              {` فاتورة رقم ${segment.label}`}
            </Link>
          );
        const isAddInvoiceRelated = /\/[A-Za-z]+\/[0-9]+\/invoices\/add/i;
        if (segment.link.match(isAddInvoiceRelated)) {
          const userName = 'فاتورة جديدة';
          return (
            <Link
              key={segment.link}
              style={{
                color: index === history.length - 1 ? 'textPrimary' : 'inherit',
              }}
              to={segment.link}
            >
              {userName}
            </Link>
          );
        }
        const isCustomerOrShopsLink = /\/[A-Za-z0-9]+\/[0-9]+/i;
        if (segment.link.match(isCustomerOrShopsLink)) {
          const userName = 'محمد الاحمد';
          return (
            <Link
              key={segment.link}
              style={{
                color: index === history.length - 1 ? 'textPrimary' : 'inherit',
              }}
              to={segment.link}
            >
              {userName}
            </Link>
          );
        }
        return (
          <Link
            key={segment.link}
            style={{
              color: index === history.length - 1 ? 'textPrimary' : 'inherit',
            }}
            to={segment.link}
          >
            {segment.label}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default PageLinks;
