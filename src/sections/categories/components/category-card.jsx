import React from 'react';
import {
  Typography,
  Grid,
  Card,
  ListItemIcon,
  ListItemText,
  List,
  ListItem,
  Box,
  ListItemButton,
  Stack,
  Chip,
  Avatar,
} from '@mui/material';
import { Folder as FolderIcon } from '@mui/icons-material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const CategoryCard = ({ category, onUpdate, isLoadingUpdate }) => {
  return (
    <Grid key={category.id} size={{ xs: 12, sm: 3, lg: 4 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 1,
          mt: 4,
          mb: 2,
          cursor: 'pointer',
        }}
        onClick={() => onUpdate(sub)}
      >
        {category.icon_url ? (
          <Avatar
            src={category.icon_url}
            alt=""
            sx={{ width: 32, height: 32, bgcolor: category.is_active ? 'success' : 'default' }}
          />
        ) : (
          <FolderIcon color={'primary'} />
        )}
        <Typography variant="h6" component="div">
          {category.name}
        </Typography>
        <Chip
          size="small"
          icon={category.is_active ? <CheckCircleIcon /> : <CancelIcon />}
          label={category.is_active ? 'Active' : 'Inactive'}
          color={category.is_active ? 'success' : 'default'}
          variant={category.is_active ? 'filled' : 'outlined'}
        />
      </Box>

      <Card>
        <List>
          {category.children?.length === 0 && <Typography>No Subcategories found</Typography>}

          {category.children.map((sub) => (
            <ListItemButton key={sub.id} onClick={() => onUpdate(sub)}>
              <ListItemIcon>
                {sub.icon_url ? (
                  <Avatar
                    src={sub.icon_url}
                    alt=""
                    sx={{ width: 32, height: 32, bgcolor: sub.is_active ? 'success' : 'default' }}
                  />
                ) : (
                  <FolderIcon color={sub.is_active ? 'success' : 'default'} />
                )}
              </ListItemIcon>
              <ListItemText primary={sub.name} />
            </ListItemButton>
          ))}
        </List>
      </Card>
    </Grid>
  );
};

export default CategoryCard;
