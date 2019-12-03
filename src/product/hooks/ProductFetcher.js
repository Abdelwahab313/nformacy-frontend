import React, { useEffect, useState } from 'react';
import { useProductState } from '../context/context';
import { useAuth } from '../../context/auth';
import { SET_ERROR, UPDATE_PRODUCTS } from '../context/contextActions';
import { fetchProducts } from '../productsApi';
import { convertObjToArray } from '../utils';

const ProductFetcher = () => {
  const [_, dispatch] = useProductState();
  const { authTokens, setAuthTokens } = useAuth();
  const [productsLoading, setProductsLoading] = useState(false);

  function sortByDate(data) {
    const fetchedProducts = data;
    fetchedProducts.sort((a, b) => new Date(a.created) - new Date(b.created));
    return fetchedProducts;
  }

  function handleApiErrors(reason) {
    if (reason.message === 'Network Error') {
      dispatch({
        type: SET_ERROR,
        payload: 'حدث خطأ أثناء الاتصال بالخادم',
      });
    } else if (reason.response.status === 401) {
      localStorage.removeItem('tokens');
      localStorage.removeItem('users');
      setAuthTokens();
    }
  }

  function adaptDataForPresentation(sortedProducts) {
    return sortedProducts.map((product) => convertObjToArray(product));
  }

  function getProducts() {
    setProductsLoading(true);
    return fetchProducts(authTokens)
      .then((res) => {
        return sortByDate(res.data);
      })
      .then((sortedProducts) => {
        const adaptedProducts = adaptDataForPresentation(sortedProducts);
        dispatch({ type: UPDATE_PRODUCTS, payload: adaptedProducts });
      })
      .catch((reason) => {
        handleApiErrors(reason);
      });
  }

  useEffect(() => {
    getProducts().finally(() => {
      setProductsLoading(false);
    });
  }, [setProductsLoading]);
  return { productsLoading };
};
export default ProductFetcher;
