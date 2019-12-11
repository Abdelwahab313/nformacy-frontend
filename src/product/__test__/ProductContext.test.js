import React from 'react';
import { ProductProvider, useProductState } from '../context/context';
import { fireEvent, render } from '@testing-library/react';
import Button from '@material-ui/core/Button';
import { getByText as findByText } from '@testing-library/dom';
import {
  CLOSE_INSERT_DIALOG_AND_SAVE,
  CLOSE_INSERT_DIALOG_WITHOUT_SAVE,
  CLOSE_UPDATE_DIALOG_AND_UPDATE,
  CLOSE_UPDATE_DIALOG_WITHOUT_SAVE,
  OPEN_INSERT_DIALOG,
  OPEN_UPDATE_DIALOG,
  SET_ERROR,
  UPDATE_PRODUCTS,
} from '../context/contextActions';

const ProductTestScreen = (props) => {
  const [
    { products, insertDialogOpened, updateDialogOpened, errorMessage },
    dispatch,
  ] = useProductState();
  return (
    <div>
      {products.map((product, index) => (
        <div key={product[0] || index}>
          <p data-testid={product[2]}>{product[1]}</p>
          <Button
            data-testid={'edit'}
            onClick={() =>
              dispatch({
                type: CLOSE_UPDATE_DIALOG_AND_UPDATE,
                payload: ['testUUID', 'nameEdit', 'testSKU', 22],
              })
            }>
            Edit Button
          </Button>
        </div>
      ))}
      <Button
        onClick={() =>
          dispatch({
            type: UPDATE_PRODUCTS,
            payload: [['newUUID', 'newName', 'newSKU', 30]],
          })
        }>
        Test Button
      </Button>
      {insertDialogOpened && <p data-testid={'isOpened'}>Yes</p>}
      {insertDialogOpened === false && <p data-testid={'isOpened'}>No</p>}
      <Button
        onClick={() =>
          dispatch({
            type: OPEN_INSERT_DIALOG,
            payload: !insertDialogOpened,
          })
        }>
        Toggle
      </Button>
      <Button
        onClick={() =>
          dispatch({
            type: CLOSE_INSERT_DIALOG_AND_SAVE,
            payload: ['newUUID', 'newName', 'newSKU', 30],
          })
        }>
        Close
      </Button>
      <Button
        onClick={() => dispatch({ type: CLOSE_INSERT_DIALOG_WITHOUT_SAVE })}>
        Close No Save
      </Button>
      {errorMessage && <p data-testid={'errorMessages'}>{errorMessage}</p>}
      <Button onClick={() => dispatch({ type: SET_ERROR, payload: 'error' })}>
        Error
      </Button>

      {updateDialogOpened && <p data-testid={'isUpdateDialogOpened'}>Yes</p>}
      {updateDialogOpened === false && (
        <p data-testid={'isUpdateDialogOpened'}>No</p>
      )}
      <Button
        onClick={() => {
          dispatch({
            type: OPEN_UPDATE_DIALOG,
          });
        }}>
        ToggleUpdate
      </Button>
      <Button
        onClick={() => {
          dispatch({
            type: CLOSE_UPDATE_DIALOG_WITHOUT_SAVE,
          });
        }}>
        Close Update No Save
      </Button>
    </div>
  );
};
describe('Product context', () => {
  it('should provide list of products to its children', () => {
    const testProductList = [['testUUID', 'testName', 'testSKU', 'testPrice']];
    const { getByTestId } = render(
      <ProductProvider initialValue={{ products: testProductList }}>
        <ProductTestScreen />
      </ProductProvider>,
    );
    expect(getByTestId('testSKU')).not.toBe(undefined);
  });

  it('should update state with new list of products', () => {
    const testProductList = [['testUUID', 'testName', 'testSKU', 'testPrice']];
    const { getByTestId, getByText } = render(
      <ProductProvider initialValue={{ products: testProductList }}>
        <ProductTestScreen />
      </ProductProvider>,
    );
    const button = getByText('Test Button');
    fireEvent.click(button);
    expect(getByTestId('newSKU')).not.toBe(undefined);
  });

  it('should throw an error if UseProductState used outside ProductProvider', () => {
    //to disable the redundant error massage in the test
    const originalError = console.error;
    console.error = jest.fn();

    const TestComponent = () => {
      const [state, dispatcher] = useProductState();
      return <div></div>;
    };
    let target = () => render(<TestComponent />);

    expect(target).toThrow();
    console.error = originalError;
  });

  it('should provide insertDialogOpened state', () => {
    const testProductList = [{ name: 'test', price: 'test', sku: 'test' }];
    const { getByTestId } = render(
      <ProductProvider
        initialValue={{ products: testProductList, insertDialogOpened: true }}>
        <ProductTestScreen />
      </ProductProvider>,
    );
    const isOpenedParagraph = getByTestId('isOpened');
    expect(isOpenedParagraph).not.toBe(undefined);
    expect(findByText(isOpenedParagraph, 'Yes')).not.toBe(undefined);
  });

  it('should set insertDialogOpened state to false by default', () => {
    const testProductList = [{ name: 'test', price: 'test', sku: 'test' }];
    const { getByTestId } = render(
      <ProductProvider initialValue={{ products: testProductList }}>
        <ProductTestScreen />
      </ProductProvider>,
    );
    const isOpenedParagraph = getByTestId('isOpened');
    expect(isOpenedParagraph).not.toBe(undefined);
    expect(findByText(isOpenedParagraph, 'No')).not.toBe(undefined);
  });

  it('should update insertDialogOpened state', () => {
    const testProductList = [{ name: 'test', price: 'test', sku: 'test' }];
    const { getByTestId, getByText } = render(
      <ProductProvider initialValue={{ products: testProductList }}>
        <ProductTestScreen />
      </ProductProvider>,
    );

    let isOpenedParagraph = getByTestId('isOpened');
    expect(isOpenedParagraph).not.toBe(undefined);
    expect(findByText(isOpenedParagraph, 'No')).not.toBe(undefined);

    const button = getByText('Toggle');
    fireEvent.click(button);

    isOpenedParagraph = getByTestId('isOpened');
    expect(isOpenedParagraph).not.toBe(undefined);
    expect(findByText(isOpenedParagraph, 'Yes')).not.toBe(undefined);
  });

  it('should close dialog and save', () => {
    const testProductList = [['testUUID', 'testName', 'testSKU', 'testPrice']];
    const { getByTestId, getByText } = render(
      <ProductProvider
        initialValue={{ products: testProductList, insertDialogOpened: true }}>
        <ProductTestScreen />
      </ProductProvider>,
    );

    let isOpenedParagraph = getByTestId('isOpened');
    expect(isOpenedParagraph).not.toBe(undefined);
    expect(findByText(isOpenedParagraph, 'Yes')).not.toBe(undefined);

    const button = getByText('Close');
    fireEvent.click(button);

    isOpenedParagraph = getByTestId('isOpened');
    expect(isOpenedParagraph).not.toBe(undefined);
    expect(findByText(isOpenedParagraph, 'No')).not.toBe(undefined);
    expect(getByTestId('newSKU')).not.toBe(undefined);
  });

  it('should close dialog without saving', () => {
    const testProductList = [{ name: 'test', price: 'test', sku: 'test' }];
    const { getByTestId, getByText } = render(
      <ProductProvider
        initialValue={{ products: testProductList, insertDialogOpened: true }}>
        <ProductTestScreen />
      </ProductProvider>,
    );

    let isOpenedParagraph = getByTestId('isOpened');
    expect(isOpenedParagraph).not.toBe(undefined);
    expect(findByText(isOpenedParagraph, 'Yes')).not.toBe(undefined);

    const button = getByText('Close No Save');
    fireEvent.click(button);

    isOpenedParagraph = getByTestId('isOpened');
    expect(isOpenedParagraph).not.toBe(undefined);
    expect(findByText(isOpenedParagraph, 'No')).not.toBe(undefined);
  });

  it('should provide errorMessage state with given value', () => {
    const testProductList = [{ name: 'test', price: 'test', sku: 'test' }];
    const { getByTestId } = render(
      <ProductProvider
        initialValue={{ products: testProductList, errorMessage: 'error' }}>
        <ProductTestScreen />
      </ProductProvider>,
    );
    const errorMessages = getByTestId('errorMessages');
    expect(errorMessages).not.toBe(undefined);
    expect(findByText(errorMessages, 'error')).not.toBe(undefined);
  });

  it('should set errorMessage state with given value', () => {
    const testProductList = [{ name: 'test', price: 'test', sku: 'test' }];
    const { getByTestId, getByText } = render(
      <ProductProvider initialValue={{ products: testProductList }}>
        <ProductTestScreen />
      </ProductProvider>,
    );
    const button = getByText('Error');
    fireEvent.click(button);

    let errorMessages = getByTestId('errorMessages');
    expect(errorMessages).not.toBe(undefined);
    expect(findByText(errorMessages, 'error')).not.toBe(undefined);
  });

  it('should display errorMessages if not empty', () => {
    const testProductList = [{ name: 'test', price: 'test', sku: 'test' }];
    const { getByTestId, getByText } = render(
      <ProductProvider initialValue={{ products: testProductList }}>
        <ProductTestScreen />
      </ProductProvider>,
    );
    expect(() => getByTestId('errorMessages')).toThrow();

    const button = getByText('Error');
    fireEvent.click(button);

    let errorMessages = getByTestId('errorMessages');
    expect(errorMessages).not.toBe(undefined);
    expect(findByText(errorMessages, 'error')).not.toBe(undefined);
  });

  it('should not display errorMessages if empty', () => {
    const testProductList = [{ name: 'test', price: 'test', sku: 'test' }];
    const { getByTestId } = render(
      <ProductProvider
        initialValue={{ products: testProductList, showError: true }}>
        <ProductTestScreen />
      </ProductProvider>,
    );
    expect(() => getByTestId('errorMessages')).toThrow();
  });

  it('should close dialog and edit', () => {
    const testProductList = [['testUUID', 'testName', 'testSKU', 'testPrice']];

    const { getByTestId, getByText } = render(
      <ProductProvider
        initialValue={{ products: testProductList, insertDialogOpened: true }}>
        <ProductTestScreen />
      </ProductProvider>,
    );
    let productParagraph = getByTestId('testSKU');
    expect(productParagraph.innerHTML).toEqual('testName');
    const editButton = getByTestId('edit');
    fireEvent.click(editButton);
    expect(productParagraph.innerHTML).toEqual('nameEdit');
  });

  it('should provide updateDialogOpened state', () => {
    const testProductList = [['testUUID', 'testName', 'testSKU', 30]];
    const { getByTestId } = render(
      <ProductProvider
        initialValue={{ products: testProductList, updateDialogOpened: true }}>
        <ProductTestScreen />
      </ProductProvider>,
    );
    const isOpenedParagraph = getByTestId('isUpdateDialogOpened');
    expect(isOpenedParagraph).not.toBe(undefined);
    expect(findByText(isOpenedParagraph, 'Yes')).not.toBe(undefined);
  });

  it('should set updateDialogOpened state to false by default', () => {
    const testProductList = [['testUUID', 'testName', 'testSKU', 30]];
    const { getByTestId } = render(
      <ProductProvider initialValue={{ products: testProductList }}>
        <ProductTestScreen />
      </ProductProvider>,
    );
    const isOpenedParagraph = getByTestId('isUpdateDialogOpened');
    expect(isOpenedParagraph).not.toBe(undefined);
    expect(findByText(isOpenedParagraph, 'No')).not.toBe(undefined);
  });

  it('should update updateDialogOpened state', () => {
    const testProductList = [['testUUID', 'testName', 'testSKU', 30]];
    const { getByTestId, getByText } = render(
      <ProductProvider initialValue={{ products: testProductList }}>
        <ProductTestScreen />
      </ProductProvider>,
    );

    let isOpenedParagraph = getByTestId('isUpdateDialogOpened');
    expect(isOpenedParagraph).not.toBe(undefined);
    expect(findByText(isOpenedParagraph, 'No')).not.toBe(undefined);

    const button = getByText('ToggleUpdate');
    fireEvent.click(button);

    isOpenedParagraph = getByTestId('isUpdateDialogOpened');
    expect(isOpenedParagraph).not.toBe(undefined);
    expect(findByText(isOpenedParagraph, 'Yes')).not.toBe(undefined);
  });

  it('should close update dialog without saving', () => {
    const testProductList = [['testUUID', 'testName', 'testSKU', 30]];
    const { getByTestId, getByText } = render(
      <ProductProvider
        initialValue={{ products: testProductList, updateDialogOpened: true }}>
        <ProductTestScreen />
      </ProductProvider>,
    );

    let isOpenedParagraph = getByTestId('isUpdateDialogOpened');
    expect(isOpenedParagraph).not.toBe(undefined);
    expect(findByText(isOpenedParagraph, 'Yes')).not.toBe(undefined);

    const button = getByText('Close Update No Save');
    fireEvent.click(button);

    isOpenedParagraph = getByTestId('isUpdateDialogOpened');
    expect(isOpenedParagraph).not.toBe(undefined);
    expect(findByText(isOpenedParagraph, 'No')).not.toBe(undefined);
  });
});
