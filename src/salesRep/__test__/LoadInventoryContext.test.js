import { SalesRepProvider, useSalesRepState } from '../context';
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Button from '@material-ui/core/Button';
import {
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  UPDATE_USERS,
} from '../context/contextAction';

const SalesRepTestComponent = () => {
  const [{ addedProducts }, dispatch] = useSalesRepState();
  return (
    <div>
      {addedProducts.map((product) => (
        <div>
          <p key={product.productUUID} data-testid={product.productUUID}>
            {product.name}
          </p>

          <p
            key={product.productUUID}
            data-testid={`${product.productUUID}-quantity`}>
            {product.quantity}
          </p>
          <Button
            data-testid={`${product.productUUID}-RemoveProductBtn`}
            onClick={() =>
              dispatch({
                type: REMOVE_PRODUCT,
                payload: 'test_uuid',
              })
            }
          />
        </div>
      ))}
      <Button
        data-testid={'AddProductBtn'}
        onClick={() =>
          dispatch({
            type: ADD_PRODUCT,
            payload: {
              selectedProduct: 'test_uuid2',
              productQuantity: 3,
            },
          })
        }
      />
      <Button
        data-testid={'AddExistingBtn'}
        onClick={() =>
          dispatch({
            type: ADD_PRODUCT,
            payload: {
              selectedProduct: 'test_uuid',
              productQuantity: 3,
            },
          })
        }
      />
    </div>
  );
};

describe('Load Inventory Context', () => {
  it('should have addedProducts state in context', () => {
    const wrapper = (
      <SalesRepProvider
        initialValue={{
          addedProducts: [
            {
              productUUID: 'test_uuid',
              name: 'test_product',
              quantity: 2,
            },
          ],
        }}>
        <SalesRepTestComponent />
      </SalesRepProvider>
    );
    const { getByTestId } = render(wrapper);
    expect(getByTestId('test_uuid')).toBeDefined();
  });

  it('should set default addedProducts list to empty array in context', () => {
    const wrapper = ({ children }) => (
      <SalesRepProvider>{children}</SalesRepProvider>
    );
    const { getByTestId } = render(
      <SalesRepProvider>
        <SalesRepTestComponent />
      </SalesRepProvider>,
    );
    expect(() => getByTestId('test_uuid')).toThrow(Error);
  });

  it('should add product in addedProducts list', () => {
    const wrapper = (
      <SalesRepProvider>
        <SalesRepTestComponent />
      </SalesRepProvider>
    );
    const { getByTestId } = render(wrapper);
    const addBtn = getByTestId('AddProductBtn');

    fireEvent.click(addBtn);
    const product = getByTestId('test_uuid2');
    expect(product).toBeDefined();
  });

  it('should change quantity of existing product in addedProducts list', () => {
    const wrapper = (
      <SalesRepProvider
        initialValue={{
          addedProducts: [
            {
              productUUID: 'test_uuid',
              name: 'test_product',
              quantity: 2,
            },
          ],
        }}>
        <SalesRepTestComponent />
      </SalesRepProvider>
    );
    const { getByTestId } = render(wrapper);
    const addBtn = getByTestId('AddExistingBtn');

    fireEvent.click(addBtn);
    const product = getByTestId('test_uuid-quantity');
    expect(Number(product.innerHTML)).toBe(5);
  });

  it('should remove product from addedProducts list', () => {
    const wrapper = (
      <SalesRepProvider
        initialValue={{
          addedProducts: [
            {
              productUUID: 'test_uuid',
              name: 'test_product',
              quantity: 2,
            },
          ],
        }}>
        <SalesRepTestComponent />
      </SalesRepProvider>
    );
    const { getByTestId } = render(wrapper);
    const removeBtn = getByTestId('test_uuid-RemoveProductBtn');

    fireEvent.click(removeBtn);
    expect(() => getByTestId('test_uuid')).toThrow(Error);
  });
});
