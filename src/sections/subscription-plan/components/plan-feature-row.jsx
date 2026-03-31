import { useState } from 'react';

import { Box, Button, IconButton, TextField, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const PlanFeatureRow = ({ feature, onEdit, onDelete, isEditing }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedFeature, setEditedFeature] = useState(feature.feature);

  const handleSave = () => {
    onEdit(feature.id, editedFeature);
    setEditMode(false);
  };

  if (editMode) {
    return (
      <Box display="flex" alignItems="center" gap={1} sx={{ py: 1 }}>
        <TextField
          size="small"
          value={editedFeature}
          onChange={(e) => setEditedFeature(e.target.value)}
          fullWidth
          autoFocus
        />
        <Button size="small" variant="contained" onClick={handleSave}>
          Save
        </Button>
        <Button size="small" onClick={() => setEditMode(false)}>
          Cancel
        </Button>
      </Box>
    );
  }

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ py: 1 }}>
      <Typography>{feature.feature}</Typography>
      <Box>
        <IconButton size="small" onClick={() => setEditMode(true)}>
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton size="small" color="error" onClick={() => onDelete(feature.id)}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default PlanFeatureRow;
