import React from 'react';
import { useAuth } from '../context/auth';
import { postProduct } from './productsApi';
import ProductForm from './components/ProductForm';
import { useProductState } from './context/context';
import {
  CLOSE_INSERT_DIALOG_AND_SAVE,
  SET_ERROR,
} from './context/contextActions';

const AddProductPage = () => {
  const { authTokens, setAuthTokens } = useAuth();
  const [_, dispatch] = useProductState();

  const onSubmit = (data) => {
    postProduct(data, authTokens)
      .then((response) => {
        const adaptedData = [
          response.data.uuid,
          response.data.name,
          response.data.sku,
          response.data.price,
        ];
        dispatch({ type: CLOSE_INSERT_DIALOG_AND_SAVE, payload: adaptedData });
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
  return <ProductForm pageTitle={'اضافه منتج جديد'} onSubmit={onSubmit} />;
};

export default AddProductPage;
