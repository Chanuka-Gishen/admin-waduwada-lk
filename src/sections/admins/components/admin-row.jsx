import { Chip, IconButton, TableCell, TableRow } from '@mui/material';
import EditNoteIcon from '@mui/icons-material/EditNote';

import { fDateTime } from 'src/utils/format-time';
import { getUserRoleLabel } from 'src/utils/common-util';

export const AdminRow = ({ data, onEdit }) => {
  return (
    <>
      {data.map((row, index) => (
        <TableRow key={index} hover>
          <TableCell>{row.full_name}</TableCell>
          <TableCell>{row.email}</TableCell>
          <TableCell>{getUserRoleLabel(row.role)}</TableCell>
          <TableCell>
            <Chip
              label={row.is_first_login ? 'Enabled' : 'No'}
              color={row.is_first_login ? 'info' : 'success'}
            />
          </TableCell>
          <TableCell>
            <Chip
              label={row.is_active ? 'Active' : 'Terminated'}
              color={row.is_active ? 'success' : 'error'}
            />
          </TableCell>
          <TableCell>{fDateTime(row.last_login_at)}</TableCell>
          <TableCell align="right">
            <IconButton
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onEdit(row);
              }}
            >
              <EditNoteIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};
