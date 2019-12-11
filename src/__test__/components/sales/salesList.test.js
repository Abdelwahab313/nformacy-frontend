import React from 'react';
import { render, shallow } from 'enzyme';

import SalesList from '../../../components/sales/SalesList';
import * as AuthContextMoudle from '../../../auth/auth';
import { AuthContext } from '../../../auth/auth';

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
  it.skip('should contain a button with title and href for details', () => {
    const salesData = [
      {
        uuid: '0cda32b8-7f6b-4814-a06b-67c53490f09f',
        to: 'test',
        by: 'test test',
        total_price: 'L.E.80.00',
        created: '2019-11-25T10:20:51.421812Z',
        created_location: { coordinates: [37.4219983, -122.084] },
        saved_location: { coordinates: [37.4219983, -122.084] },
        // __test__: (2) [{…}, {…}]
      },
    ];
    tree = (
      <AuthContext.Provider>
        <SalesList salesData={salesData} />
      </AuthContext.Provider>
    );
    const renderWrapper = render(tree);
    const detailsButton = renderWrapper.find(
      'button.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-colorInherit',
    )[0];
    expect(detailsButton.attribs.title).toEqual('تفاصيل الفاتورة');
  });
});
