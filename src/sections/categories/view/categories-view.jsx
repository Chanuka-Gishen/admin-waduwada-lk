import {
  Box,
  Button,
  Card,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { CategoryForm } from '../components/category-form';
import { Fragment } from 'react';
import CategoryCard from '../components/category-card';

export const CategoriesView = ({
  initialValues,
  categories,
  categoryOptions,
  isOpenAdd,
  isLoadingCategories,
  isLoadingCategoryOptions,
  isLoadingCreateCategory,
  handleToggleAdd,
  handleAddNewCategory,
}) => {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h4">Category Management</Typography>
            <Button
              variant="outlined"
              loading={isLoadingCreateCategory}
              disabled={isLoadingCreateCategory}
              startIcon={<AddCircleOutlineOutlinedIcon />}
              onClick={handleToggleAdd}
            >
              New Category
            </Button>
          </Stack>
        </Grid>
        {/* Loading State */}
        {isLoadingCategories && (
          <Grid size={12}>
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          </Grid>
        )}
        {!isLoadingCategories && categories && (
          <Fragment>
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                isLoadingUpdate={false}
                onUpdate={null}
              />
            ))}
          </Fragment>
        )}
      </Grid>
      {isOpenAdd && (
        <CategoryForm
          initialValues={initialValues}
          open={isOpenAdd}
          categoryOptions={categoryOptions}
          isLoading={isLoadingCreateCategory}
          isLoadingCategoryOptions={isLoadingCategoryOptions}
          onClose={handleToggleAdd}
          onSubmit={handleAddNewCategory}
        />
      )}
    </Container>
  );
};
