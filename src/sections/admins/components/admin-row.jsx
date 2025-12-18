import { Chip, IconButton, TableCell, TableRow } from '@mui/material';
import EditNoteIcon from '@mui/icons-material/EditNote';

import { fDateTime } from 'src/utils/format-time';

export const AdminRow = ({ data, onEdit }) => {
  return (
    <>
      {data.map((row, index) => (
        <TableRow key={index} hover>
          <TableCell>{row.adminFullName}</TableCell>
          <TableCell>{row.adminEmail}</TableCell>
          <TableCell>{row.adminRole}</TableCell>
          <TableCell>
            <Chip
              label={row.isAdminFirstLogin ? 'Enabled' : 'No'}
              color={row.isAdminFirstLogin ? 'info' : 'success'}
            />
          </TableCell>
          <TableCell>{fDateTime(row.adminLastLoginAt)}</TableCell>
          <TableCell>
            <Chip
              label={row.adminIsActive ? 'Active' : 'Terminated'}
              color={row.adminIsActive ? 'success' : 'error'}
            />
          </TableCell>
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
