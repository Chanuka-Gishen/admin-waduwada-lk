import { Fragment } from 'react';
import { TableRow, TableCell, Chip } from '@mui/material';
import { fDateTime } from 'src/utils/format-time';

const ShopRow = ({ data, onRowClick }) => {
  return (
    <Fragment>
      {data.map((row, index) => (
        <TableRow key={index} hover sx={{ cursor: 'pointer' }}>
          <TableCell>{row.name}</TableCell>
          <TableCell>{row.shop_type}</TableCell>
          <TableCell>{row.subscription.name}</TableCell>
          <TableCell>
            <Chip
              color={row.is_accepting_custom_orders ? 'success' : 'warning'}
              label={row.is_accepting_custom_orders ? 'Yes' : 'No'}
              sx={{ color: 'white', width: '100%' }}
            />
          </TableCell>
          <TableCell>
            {row.established_year ? row.established_year : <em>Not Provided</em>}
          </TableCell>
          <TableCell>{row.br_number ? row.br_number : <em>Not Provided</em>}</TableCell>
          <TableCell>
            <Chip
              color={row.is_active ? 'success' : 'warning'}
              label={row.is_active ? 'Verified' : 'Not Verified'}
              sx={{ color: 'white', width: '100%' }}
            />
          </TableCell>
          <TableCell>{fDateTime(row.created_at)}</TableCell>
          <TableCell>{fDateTime(row.updated_at)}</TableCell>
        </TableRow>
      ))}
    </Fragment>
  );
};

export default ShopRow;
