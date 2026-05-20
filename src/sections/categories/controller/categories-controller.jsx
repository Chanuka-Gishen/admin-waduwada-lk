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
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);

  const handleToggleAdd = () => {
    setIsOpenAdd(!isOpenAdd);
  };

  const handleToggleUpdate = (values = null) => {
    if (!isOpenUpdate && !values) return;

    if (!isOpenUpdate) {
      setInitialValues({
        id: values.id,
        name: values.name,
        icon_url: values.icon_url,
        is_active: values.is_active,
        parent_id: values.parent_id ?? null,
      });
    } else {
      setInitialValues(categoryInitialValues);
    }

    setIsOpenUpdate(!isOpenUpdate);
  };

  const handleAddNewCategory = async (values, resetForm) => {
    const result = await createCategory(values);

    if (result) {
      handleToggleAdd();
      resetForm();
      fetchCategories();
    }
  };

  const handleUpdateCategory = async (values, resetForm) => {
    const result = await updateCategory(values);

    if (result) {
      handleToggleUpdate();
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
      isOpenUpdate={isOpenUpdate}
      isLoadingCategories={isLoadingCategories}
      isLoadingCategoryOptions={isLoadingCategoryOptions}
      isLoadingCreateCategory={isLoadingCreateCategory}
      isLoadingUpdateCategory={isLoadingUpdateCategory}
      handleToggleAdd={handleToggleAdd}
      handleToggleUpdate={handleToggleUpdate}
      handleAddNewCategory={handleAddNewCategory}
      handleUpdateCategory={handleUpdateCategory}
    />
  );
};

export default CategoriesController;
