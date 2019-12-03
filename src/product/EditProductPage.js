import React from 'react';
import { useAuth } from '../context/auth';
import { editProduct } from './productsApi';
import { useProductState } from './context/context';
import { convertObjToArray } from './utils';
import ProductForm from './components/ProductForm';
import {
  CLOSE_UPDATE_DIALOG_AND_UPDATE,
  SET_ERROR,
} from './context/contextActions';

const EditProductPage = ({ product }) => {
  const { authTokens, setAuthTokens } = useAuth();
  const [_, dispatch] = useProductState();
  const onSubmit = (data) => {
    editProduct(data, product[0], authTokens)
      .then((response) => {
        dispatch({
          type: CLOSE_UPDATE_DIALOG_AND_UPDATE,
          payload: convertObjToArray(response.data),
        });
      })
      .catch(({ response }) => {
        if (response.status === 400 && response.data.hasOwnProperty('sku')) {
          dispatch({ type: SET_ERROR, payload: response.data.sku });
        }
        if (response.status === 401) {
          localStorage.removeItem('tokens');
          localStorage.removeItem('products');
          setAuthTokens();
        }
      });
  };
  return (
    <ProductForm
      pageTitle={'تعديل منتج'}
      onSubmit={onSubmit}
      name={product[1]}
      sku={product[2]}
      price={product[3]}
    />
  );
};

export default EditProductPage;
