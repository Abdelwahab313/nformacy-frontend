import SalesRepForm from '../components/SalesRepForm';
import React from 'react';
import { render } from '@testing-library/react';

describe('SalesRep Form', () => {
  beforeEach(() => {
    return require('mutationobserver-shim');
  });
  it('should render form with no data if props not passed to form', () => {
    const onSubmit = jest.fn();
    let pageTitle = 'اضافه موظف جديد';
    const { asFragment } = render(
      <SalesRepForm
        pageTitle={pageTitle}
        onSubmit={onSubmit}
        formType={'ADD'}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
