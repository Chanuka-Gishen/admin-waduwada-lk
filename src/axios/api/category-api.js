import { BACKEND_API } from '../constant/backend-api';
import { backendAuthApi } from '../instance/backend-axios-instance';

export const fetchCategoriesApi = (cancelToken) =>
  backendAuthApi({
    url: BACKEND_API.CATEGORIES,
    method: 'GET',
    cancelToken,
  });

export const fetchCategoryOptionsApi = (includeParents, includeChildren, cancelToken) =>
  backendAuthApi({
    url: BACKEND_API.CATEGORY_OPTIONS,
    method: 'GET',
    cancelToken,
    params: {
      includeParents,
      includeChildren,
    },
  });

export const createCategoryApi = (data, cancelToken) =>
  backendAuthApi({
    url: BACKEND_API.CATEGORY_CREATE,
    method: 'POST',
    cancelToken,
    data,
  });

export const updateCategoryApi = (data, cancelToken) =>
  backendAuthApi({
    url: BACKEND_API.CATEGORY_UPDATE,
    method: 'PUT',
    cancelToken,
    data,
  });
