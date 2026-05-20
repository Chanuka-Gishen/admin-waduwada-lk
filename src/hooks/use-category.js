import { useState } from 'react';
import axios from 'axios';
import useApiActions from './use-api-actions';
import {
  createCategoryApi,
  fetchCategoriesApi,
  fetchCategoryOptionsApi,
  updateCategoryApi,
} from 'src/axios/api/category-api';

const useCategory = () => {
  const sourceToken = axios.CancelToken.source();

  const [categories, setCategories] = useState(null);
  const [categoryOptions, setCategoryOptions] = useState([]);

  const { request: fetchCategoriesRequest, loading: isLoadingCategories } =
    useApiActions(fetchCategoriesApi);
  const { request: fetchCategoryOptionsRequest, loading: isLoadingCategoryOptions } =
    useApiActions(fetchCategoryOptionsApi);
  const { request: createCategoryRequest, loading: isLoadingCreateCategory } =
    useApiActions(createCategoryApi);
  const { request: updateCategoryRequest, loading: isLoadingUpdateCategory } =
    useApiActions(updateCategoryApi);

  const fetchCategories = async () => {
    const result = await fetchCategoriesRequest(sourceToken.token);

    if (result) {
      setCategories(result);
    }
  };

  const fetchCategoryOptions = async (includeParents = false, includeChildren = true) => {
    const result = await fetchCategoryOptionsRequest(
      includeParents,
      includeChildren,
      sourceToken.token
    );

    if (result) {
      setCategoryOptions(result);
    }
  };

  const createCategory = async (data) => {
    const result = await createCategoryRequest(data, sourceToken.token);

    return !!result;
  };

  const updateCategory = async (data) => {
    const result = await updateCategoryRequest(data, sourceToken.token);

    return !!result;
  };

  return {
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
  };
};

export default useCategory;
