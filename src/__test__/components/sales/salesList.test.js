import React from 'react';
import { shallow } from 'enzyme';
import SalesList from '../../../components/sales/SalesList';
import * as AuthContextMoudle from '../../../context/auth';
import { AuthContext } from '../../../context/auth';

describe('Sales', () => {
  let tree;
  let wrapper;
  let salesColumns;
  beforeEach(() => {
    jest.spyOn(AuthContextMoudle, 'useAuth').mockImplementation(() => ({
      authTokens: '',
    }));
    tree = (
      <AuthContext.Provider>
        <SalesList />
      </AuthContext.Provider>
    );
    wrapper = shallow(tree).dive();
    salesColumns = wrapper.find('#salesList').props().columns;
  });

  it('should render sales component with one div tag', () => {
    expect(wrapper.find('div').length).toEqual(1);
  });
  it('should render sales list column numbers', () => {
    expect(salesColumns.length).toEqual(4);
  });
  it('should render table sales header to contain operations', () => {
    const tableHeaderOperationsTitle = wrapper.find('#salesList').props()
      .localization.header.actions;
    expect(tableHeaderOperationsTitle).toEqual('عمليات');
  });
  it('should render table sales client name column', () => {
    expect(salesColumns).toContainEqual(
      expect.objectContaining({ field: 'to', title: 'اسم العميل' }),
    );
  });
  it('should render sales table representative name  column', () => {
    expect(salesColumns).toContainEqual(
      expect.objectContaining({ field: 'by', title: 'اسم المندوب' }),
    );
  });
  it('should render sales table total value column', () => {
    expect(salesColumns).toContainEqual(
      expect.objectContaining({ field: 'total_price', title: 'الحساب الكلي' }),
    );
  });
  it('should render table data column', () => {
    expect(salesColumns).toContainEqual(
      expect.objectContaining({ field: 'date', title: 'التاريخ' }),
    );
  });
});
