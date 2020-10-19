import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { AuthProvider, useAuth } from '../../pages/auth/context/auth';
import useLocale from '../../hooks/localization/useLocale';

describe('Page translations', () => {
  let result;
  beforeEach(() => {
    const currentUser = { locale: 'en' };

    const wrapper = ({ children }) => (
      <AuthProvider initialValue={{ currentUser }}>{children}</AuthProvider>
    );
    const renderedHook = renderHook(() => useLocale(), { wrapper });
    result = renderedHook.result;
  });
  it('should retrieve locale upon first render', () => {
    expect(result.current.locale).toEqual('en');
  });

  it('should change locale when changeLocale is called', () => {
    expect(result.current.locale).toEqual('en');

    act(() => {
      result.current.changeLocale('ar');
    });

    expect(result.current.locale).toEqual('ar');
  });
});
