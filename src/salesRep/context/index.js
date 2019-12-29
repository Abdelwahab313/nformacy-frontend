import React, { createContext, useContext, useReducer } from 'react';
import {
  SET_ERROR_MESSAGE,
  SET_INSERT_DIALOG_OPEN,
  UPDATE_USERS,
  CLOSE_INSERT_DIALOG_AND_SAVE,
  SET_UPDATE_DIALOG_OPEN,
  CLOSE_UPDATE_DIALOG_AND_SAVE,
  ADD_PRODUCT,
  REMOVE_PRODUCT,
} from './contextAction';

const SalesRepContext = createContext();
const defaultValues = {
  users: [],
  addedProducts: [],
  errorMessage: '',
  isInsertDialogOpen: false,
  isUpdateDialogOpen: false,
};

const SalesRepProvider = ({ children, initialValue }) => {
  const { Provider } = SalesRepContext;
  initialValue = { ...defaultValues, ...initialValue };
  return (
    <Provider value={useReducer(salesRepReducer, initialValue)}>
      {children}
    </Provider>
  );
};

const useSalesRepState = () => {
  const context = useContext(SalesRepContext);
  if (context === undefined) {
    throw new Error('useSalesRepState must be used within a SalesRepProvider');
  }
  return context;
};

const salesRepReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case SET_INSERT_DIALOG_OPEN:
      return {
        ...state,
        isInsertDialogOpen: action.payload,
      };
    case SET_UPDATE_DIALOG_OPEN:
      return {
        ...state,
        isUpdateDialogOpen: action.payload,
      };
    case SET_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case CLOSE_INSERT_DIALOG_AND_SAVE:
      return {
        ...state,
        isInsertDialogOpen: false,
        users: [...state.users, action.payload],
      };
    case CLOSE_UPDATE_DIALOG_AND_SAVE:
      let toBeEditedIndex = state.users.findIndex(
        (user) => user[0] === action.payload[0],
      );
      state.users[toBeEditedIndex] = action.payload;
      return {
        ...state,
        isUpdateDialogOpen: false,
        users: state.users,
      };
    case ADD_PRODUCT:
      const existingProductIndex = state.addedProducts.findIndex(
        (addedProduct) =>
          addedProduct.productUUID === action.payload.selectedProduct,
      );
      if (existingProductIndex >= 0) {
        state.addedProducts[existingProductIndex]['quantity'] += Number(
          action.payload.productQuantity,
        );
        return {
          ...state,
        };
      } else {
        return {
          ...state,
          addedProducts: [
            ...state.addedProducts,
            {
              productUUID: action.payload.selectedProduct,
              quantity: Number(action.payload.productQuantity),
            },
          ],
        };
      }
    case REMOVE_PRODUCT:
      return {
        ...state,
        addedProducts: state.addedProducts.filter(
          (product) => product.productUUID !== action.payload,
        ),
      };
  }
};

export { SalesRepProvider, useSalesRepState };
