import { Fragment } from 'react';
import { TableRow, TableCell, Chip } from '@mui/material';

const MerchantRow = ({ data, onRowClick }) => {
  return (
    <Fragment>
      {data.map((row, index) => (
        <TableRow key={index} hover sx={{ cursor: 'pointer' }}>
          <TableCell>{row.merchantFullName}</TableCell>
          <TableCell>{row.merchantType}</TableCell>
          <TableCell>
            <Chip
              color={row.merchantIsVerified ? 'success' : 'warning'}
              label={row.merchantIsVerified ? 'Verified' : 'Not Verified'}
              sx={{ color: 'white' }}
            />
          </TableCell>
          <TableCell>{row.merchantEmail ? row.merchantEmail : <em>Not Provided</em>}</TableCell>
          <TableCell>
            {row.merchantPrimaryMobileNumber ? (
              row.merchantPrimaryMobileNumber
            ) : (
              <em>Not Provided</em>
            )}
          </TableCell>
          <TableCell>
            {row.merchantSecondaryMobileNumber ? (
              row.merchantSecondaryMobileNumber
            ) : (
              <em>Not Provided</em>
            )}
          </TableCell>
          <TableCell>{row.merchantNicNumber}</TableCell>
        </TableRow>
      ))}
    </Fragment>
  );
};

export default MerchantRow;
