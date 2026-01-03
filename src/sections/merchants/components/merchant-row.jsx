import { Fragment } from 'react';
import { TableRow, TableCell, Chip } from '@mui/material';

const MerchantRow = ({ data, onRowClick }) => {
  return (
    <Fragment>
      {data.map((row, index) => (
        <TableRow key={index} hover>
          <TableCell>{data.merchantFullName}</TableCell>
          <TableCell>
            <Chip
              color={data.merchantIsVerified ? 'success' : 'warning'}
              label={data.merchantIsVerified ? 'Verified' : 'Not Verified'}
            />
          </TableCell>
          <TableCell>{data.merchantEmail ? data.merchantEmail : <em>Not Provided</em>}</TableCell>
          <TableCell>
            {data.merchantPrimaryMobile ? data.merchantPrimaryMobile : <em>Not Provided</em>}
          </TableCell>
          <TableCell>
            {data.merchantSecondaryMobile ? data.merchantSecondaryMobile : <em>Not Provided</em>}
          </TableCell>
          <TableCell>{data.merchantNicNumber}</TableCell>
        </TableRow>
      ))}
    </Fragment>
  );
};

export default MerchantRow;
