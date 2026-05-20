import { useEffect, useState } from 'react';
import { CategoriesView } from '../view/categories-view';
import useCategory from 'src/hooks/use-category';

const categoryInitialValues = {
  name: '',
  parent_id: null,
  icon_url: '',
  is_active: true,
};

const CategoriesController = () => {
  const [initialValues, setInitialValues] = useState(categoryInitialValues);

  const {
    categories,
    categoryOptions,
    isLoadingCategories,
    isLoadingCategoryOptions,
    isLoadingCreateCategory,
    isLoadingUpdateCategory,
    fetchCategories,
    fetchCategoryOptions,
    createCategory,
    updateCategory,
  } = useCategory();

  const [isOpenAdd, setIsOpenAdd] = useState(false);

  const handleToggleAdd = () => {
    setIsOpenAdd(!isOpenAdd);
  };

  const handleAddNewCategory = async (values, resetForm) => {
    const result = await createCategory(values);

    if (result) {
      handleToggleAdd();
      resetForm();
      fetchCategories();
    }
  };

  useEffect(() => {
    if (isOpenAdd) {
      fetchCategoryOptions(true, false);
    }
  }, [isOpenAdd]);

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <CategoriesView
      initialValues={initialValues}
      categories={categories?.parents}
      categoryOptions={categoryOptions}
      isOpenAdd={isOpenAdd}
      isLoadingCategories={isLoadingCategories}
      isLoadingCategoryOptions={isLoadingCategoryOptions}
      isLoadingCreateCategory={isLoadingCreateCategory}
      handleToggleAdd={handleToggleAdd}
      handleAddNewCategory={handleAddNewCategory}
    />
  );
};

export default CategoriesController;
