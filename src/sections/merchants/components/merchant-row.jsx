import { Fragment } from 'react';
import { TableRow, TableCell, Chip } from '@mui/material';
import { getUserRoleLabel } from 'src/utils/common-util';

const MerchantRow = ({ data, onRowClick }) => {
  return (
    <Fragment>
      {data.map((row, index) => (
        <TableRow key={index} hover sx={{ cursor: 'pointer' }}>
          <TableCell>{row.full_name}</TableCell>
          <TableCell>{getUserRoleLabel(row.role)}</TableCell>
          <TableCell>
            <Chip
              color={row.is_verified ? 'success' : 'warning'}
              label={row.is_verified ? 'Verified' : 'Not Verified'}
              sx={{ color: 'white' }}
            />
          </TableCell>
          <TableCell>{row.email ? row.email : <em>Not Provided</em>}</TableCell>
          <TableCell>
            {row.primary_mobile_number ? row.primary_mobile_number : <em>Not Provided</em>}
          </TableCell>
          <TableCell>
            {row.secondary_mobile_number ? row.secondary_mobile_number : <em>Not Provided</em>}
          </TableCell>
          <TableCell>{row.nic_number}</TableCell>
        </TableRow>
      ))}
    </Fragment>
  );
};

export default MerchantRow;
