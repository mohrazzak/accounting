import React from 'react';
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from '@mui/material';

const CustomTableHeading = ({ rows }) => {
  return (
    <Table>
      <TableBody>
        {rows.map((row, index) => (
          <TableRow key={index}>
            <TableCell sx={{ fontSize: '1.2rem' }}>{row.title}</TableCell>
            <TableCell
              colSpan={1}
              sx={{
                color: row.value >= 0 ? 'green' : 'tomato',
                fontWeight: 'bold',
                fontSize: '1.2rem',
              }}
            >
              <Typography
                style={{
                  direction: 'ltr',
                  fontWeight: 'bold',
                  color: row.value >= 0 ? 'green' : 'tomato',
                }}
              >
                {row.value}
              </Typography>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CustomTableHeading;
