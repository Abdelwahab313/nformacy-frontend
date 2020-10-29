import React from 'react';

import { render } from '@testing-library/react';
import FieldsSelect from '../FieldsSelect';


jest.mock('hooks/localization/useLocale', () => jest.fn().mockReturnValue({
  locale: 'en',
}));


xdescribe('Fields select render props', () => {
  it('should expose  prop', () => {
    const fieldsContainerCallbackMock = jest.fn();

    render(
      <FieldsSelect>{fieldsContainerCallbackMock}</FieldsSelect>,
    );
    expect(fieldsContainerCallbackMock).toHaveBeenCalledWith({});
  });
});