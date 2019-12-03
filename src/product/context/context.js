import React, { createContext, useContext, useReducer } from 'react';
import {
  CLOSE_INSERT_DIALOG_AND_SAVE,
  CLOSE_UPDATE_DIALOG_AND_UPDATE,
  CLOSE_INSERT_DIALOG_WITHOUT_SAVE,
  CLOSE_UPDATE_DIALOG_WITHOUT_SAVE,
  OPEN_INSERT_DIALOG,
  OPEN_UPDATE_DIALOG,
  SET_ERROR,
  UPDATE_PRODUCTS,
} from './contextActions';

const ProductContext = createContext();
const initValues = {
  products: [],
  insertDialogOpened: false,
  updateDialogOpened: false,
  errorMessage: '',
};

const ProductProvider = ({ children, initialValue }) => {
  initialValue = { ...initValues, ...initialValue };
  const { Provider } = ProductContext;
  return (
    <Provider value={useReducer(productReducer, initialValue)}>
      {children}
    </Provider>
  );
};

const useProductState = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('UseProductState must be used within a ProductProvider');
  }
  return context;
};

const productReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_PRODUCTS:
      return { ...state, products: action.payload };
    case OPEN_INSERT_DIALOG:
      return { ...state, insertDialogOpened: true };
    case OPEN_UPDATE_DIALOG:
      return { ...state, updateDialogOpened: true };
    case CLOSE_INSERT_DIALOG_AND_SAVE:
      return {
        ...state,
        insertDialogOpened: false,
        products: [...state.products, action.payload],
      };
    case CLOSE_UPDATE_DIALOG_AND_UPDATE:
      let toBeEditedIndex = state.products.findIndex(
        (product) => product[0] === action.payload[0],
      );
      state.products[toBeEditedIndex] = action.payload;
      return {
        ...state,
        updateDialogOpened: false,
        products: state.products,
      };
    case CLOSE_INSERT_DIALOG_WITHOUT_SAVE:
      return {
        ...state,
        insertDialogOpened: false,
      };
    case CLOSE_UPDATE_DIALOG_WITHOUT_SAVE:
      return {
        ...state,
        updateDialogOpened: false,
      };
    case SET_ERROR:
      return {
        ...state,
        errorMessage: action.payload,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export { useProductState, ProductProvider };
