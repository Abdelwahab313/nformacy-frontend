import React from 'react';
import { SalesRepProvider, useSalesRepState } from '../context';
import { fireEvent, render } from '@testing-library/react';
import Button from '@material-ui/core/Button';
import {
  CLOSE_INSERT_DIALOG_AND_SAVE,
  CLOSE_UPDATE_DIALOG_AND_SAVE,
  SET_ERROR_MESSAGE,
  SET_INSERT_DIALOG_OPEN,
  SET_UPDATE_DIALOG_OPEN,
  UPDATE_USERS,
} from '../context/contextAction';
import { act } from 'react-test-renderer';

const SalesRepTestComponent = () => {
  const [
    { users, isInsertDialogOpen, isUpdateDialogOpen, errorMessage },
    dispatch,
  ] = useSalesRepState();

  return (
    <div>
      {users.map((user) => (
        <p key={user[0]} data-testid={user[0]}>
          {user[1]}
        </p>
      ))}
      <Button
        data-testid={'UpdateUsersBtn'}
        onClick={() =>
          dispatch({
            type: UPDATE_USERS,
            payload: [
              [
                'test_uuid1',
                'test_name1',
                '0123456789',
                'test_national_id',
                'test_user_name1',
              ],
            ],
          })
        }
      />
      <p data-testid={'insert-dialog'}>{isInsertDialogOpen.toString()}</p>
      <Button
        data-testid={'set-insert-dialog'}
        onClick={() =>
          dispatch({
            type: SET_INSERT_DIALOG_OPEN,
            payload: !isInsertDialogOpen,
          })
        }
      />
      <Button
        data-testid={'close-insert-dialog-save'}
        onClick={() =>
          dispatch({
            type: CLOSE_INSERT_DIALOG_AND_SAVE,
            payload: [
              'new_uuid',
              'new_name',
              '0123456789',
              'new_national_id',
              'new_username',
            ],
          })
        }
      />
      <p data-testid={'error-message'}>{errorMessage.toString()}</p>
      <Button
        data-testid={'set-error-message'}
        onClick={() =>
          dispatch({
            type: SET_ERROR_MESSAGE,
            payload: 'error',
          })
        }
      />
      <p data-testid={'update-dialog'}>{isUpdateDialogOpen.toString()}</p>
      <Button
        data-testid={'set-update-dialog'}
        onClick={() =>
          dispatch({
            type: SET_UPDATE_DIALOG_OPEN,
            payload: !isUpdateDialogOpen,
          })
        }
      />
      <Button
        data-testid={'close-update-dialog-save'}
        onClick={() =>
          dispatch({
            type: CLOSE_UPDATE_DIALOG_AND_SAVE,
            payload: [
              'test_uuid',
              'new_name',
              '0123456789',
              'new_national_id',
              'new_username',
            ],
          })
        }
      />
    </div>
  );
};

describe('SalesRep Context', () => {
  it('should have users state in context', () => {
    const wrapper = (
      <SalesRepProvider
        initialValue={{
          users: [
            [
              'test_uuid1',
              'test_name1',
              '0123456789',
              'test_national_id',
              'test_user_name1',
            ],
          ],
        }}>
        <SalesRepTestComponent />
      </SalesRepProvider>
    );
    const { getByTestId } = render(wrapper);
    expect(getByTestId('test_uuid1')).toBeDefined();
  });

  it('should set default users list to empty array in context', () => {
    const wrapper = ({ children }) => (
      <SalesRepProvider>{children}</SalesRepProvider>
    );
    const { getByTestId } = render(
      <SalesRepProvider>
        <SalesRepTestComponent />
      </SalesRepProvider>,
    );
    expect(() => getByTestId('test_user_uuid')).toThrow(Error);
  });

  it('should update users with given list', async () => {
    const wrapper = (
      <SalesRepProvider>
        <SalesRepTestComponent />
      </SalesRepProvider>
    );
    const { getByTestId } = render(wrapper);
    const updateBtn = getByTestId('UpdateUsersBtn');

    fireEvent.click(updateBtn);
    const user = getByTestId('test_uuid1');
    expect(user).toBeDefined();
  });

  it('should have insertDialogOpen state', () => {
    const wrapper = (
      <SalesRepProvider>
        <SalesRepTestComponent />
      </SalesRepProvider>
    );
    const { getByTestId } = render(wrapper);
    expect(getByTestId('insert-dialog')).toBeDefined();
    expect(getByTestId('insert-dialog').innerHTML).toEqual('false');
  });

  it('should set insertDialogOpen state', () => {
    const wrapper = (
      <SalesRepProvider>
        <SalesRepTestComponent />
      </SalesRepProvider>
    );
    const { getByTestId } = render(wrapper);
    expect(getByTestId('insert-dialog')).toBeDefined();
    expect(getByTestId('insert-dialog').innerHTML).toEqual('false');
    const insertDialogBtn = getByTestId('set-insert-dialog');

    expect(insertDialogBtn).toBeDefined();
    fireEvent.click(insertDialogBtn);
    expect(getByTestId('insert-dialog').innerHTML).toEqual('true');
  });

  it('should have errorMessage state', () => {
    const wrapper = (
      <SalesRepProvider>
        <SalesRepTestComponent />
      </SalesRepProvider>
    );
    const { getByTestId } = render(wrapper);
    expect(getByTestId('error-message')).toBeDefined();
    expect(getByTestId('error-message').innerHTML).toEqual('');
  });

  it('should set errorMessage state', () => {
    const wrapper = (
      <SalesRepProvider>
        <SalesRepTestComponent />
      </SalesRepProvider>
    );
    const { getByTestId } = render(wrapper);
    expect(getByTestId('error-message')).toBeDefined();
    expect(getByTestId('error-message').innerHTML).toEqual('');
    const insertDialogBtn = getByTestId('set-error-message');

    expect(insertDialogBtn).toBeDefined();
    fireEvent.click(insertDialogBtn);
    expect(getByTestId('error-message').innerHTML).toEqual('error');
  });

  it('should have close insertDialog and save', async () => {
    const wrapper = (
      <SalesRepProvider initialValue={{ isInsertDialogOpen: true }}>
        <SalesRepTestComponent />
      </SalesRepProvider>
    );
    const { getByTestId } = render(wrapper);
    expect(getByTestId('insert-dialog')).toBeDefined();
    expect(getByTestId('insert-dialog').innerHTML).toEqual('true');
    const insertDialogAndSaveBtn = getByTestId('close-insert-dialog-save');

    expect(insertDialogAndSaveBtn).toBeDefined();
    await act(async () => {
      fireEvent.click(insertDialogAndSaveBtn);
    });
    expect(getByTestId('insert-dialog').innerHTML).toEqual('false');
    const user = getByTestId('new_uuid');
    expect(user).toBeDefined();
  });

  it('should have updateDialogOpen state', () => {
    const wrapper = (
      <SalesRepProvider>
        <SalesRepTestComponent />
      </SalesRepProvider>
    );
    const { getByTestId } = render(wrapper);
    expect(getByTestId('update-dialog')).toBeDefined();
    expect(getByTestId('update-dialog').innerHTML).toEqual('false');
  });

  it('should set updateDialogOpen state', () => {
    const wrapper = (
      <SalesRepProvider>
        <SalesRepTestComponent />
      </SalesRepProvider>
    );
    const { getByTestId } = render(wrapper);
    expect(getByTestId('update-dialog')).toBeDefined();
    expect(getByTestId('update-dialog').innerHTML).toEqual('false');
    const updateDialogBtn = getByTestId('set-update-dialog');

    expect(updateDialogBtn).toBeDefined();
    fireEvent.click(updateDialogBtn);
    expect(getByTestId('update-dialog').innerHTML).toEqual('true');
  });

  it('should have close updateDialog and save', () => {
    const users = [
      [
        'test_uuid',
        'test_fname',
        'test_lname',
        '010498313748',
        '21324872692749',
        'test_user_name',
      ],
    ];
    const wrapper = (
      <SalesRepProvider
        initialValue={{ isUpdateDialogOpen: true, users: users }}>
        <SalesRepTestComponent />
      </SalesRepProvider>
    );
    const { getByTestId } = render(wrapper);
    expect(getByTestId('update-dialog')).toBeDefined();
    expect(getByTestId('update-dialog').innerHTML).toEqual('true');
    const updateDialogAndSaveBtn = getByTestId('close-update-dialog-save');

    expect(updateDialogAndSaveBtn).toBeDefined();
    fireEvent.click(updateDialogAndSaveBtn);
    expect(getByTestId('update-dialog').innerHTML).toEqual('false');
    const user = getByTestId('test_uuid');
    expect(user).toBeDefined();
    expect(user.innerHTML).toBe('new_name');
  });
});
