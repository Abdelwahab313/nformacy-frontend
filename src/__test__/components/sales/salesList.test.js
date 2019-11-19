import React from 'react';
import { shallow } from 'enzyme';
import SalesList from '../../../components/sales/SalesList';

describe('Sales', () => {
  let tree;
  let wrapper;

  it('should render sales component with one div tag', () => {
    const wrapper = shallow(<SalesList />);
    expect(wrapper.find('div').length).toEqual(1);
  });
  it('should render sales list column numbers', () => {
    wrapper = shallow(<SalesList />);
    const salesColumns = wrapper.find('#salesList').props().columns;
    expect(salesColumns.length).toEqual(4);
  });
  it('should render table client name column', () => {
    wrapper = shallow(<SalesList />);
    const salesColumns = wrapper.find('#salesList').props().columns;
    expect(salesColumns).toContainEqual(
      expect.objectContaining({ field: 'client', title: 'اسم العميل' }),
    );
  });
  it('should render table total value column', () => {
    wrapper = shallow(<SalesList />);
    const salesColumns = wrapper.find('#salesList').props().columns;
    expect(salesColumns).toContainEqual(
      expect.objectContaining({ field: 'value', title: 'الحساب الكلي' }),
    );
  });
  it('should render table data column', () => {
    wrapper = shallow(<SalesList />);
    const salesColumns = wrapper.find('#salesList').props().columns;
    expect(salesColumns).toContainEqual(
      expect.objectContaining({ field: 'date', title: 'التاريخ' }),
    );
  });
});
