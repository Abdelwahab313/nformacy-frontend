import { AuthProvider } from '../../pages/auth/context/auth';
import { LocaleProvider } from '../localization/context';
import { renderHook } from '@testing-library/react-hooks';
import { fetchCurrentUserFields } from '../../apis/userAPI';
import React from 'react';
import { queryCache } from 'react-query';
import useUserFieldsFetcher from '../useUserFieldsFetcher';

jest.mock('apis/userAPI', () => ({
  __esModule: true, // this property makes it work
  default: 'mockedDefaultExport',
  fetchCurrentUserFields: jest.fn().mockResolvedValue([
    {
      id: 1,
      label: 'Finance',
    },
    {
      id: 2,
      label: 'Marketing',
    },
    {
      id: 3,
      label: 'FinTech',
    },
    {
      id: 4,
      label: 'Accounting',
    },
  ]),
}));

describe('fetch user fields', () => {
  beforeEach(() => queryCache.clear());

  it('should fetch current user fields in english', async () => {
    const locale = 'en';
    const wrapper = ({ children }) => {
      return (
        <AuthProvider>
          <LocaleProvider initialLocale={locale}>{children}</LocaleProvider>
        </AuthProvider>
      );
    };

    const { result, waitForNextUpdate } = renderHook(
      () => useUserFieldsFetcher(),
      {
        wrapper,
      },
    );
    await waitForNextUpdate();

    expect(fetchCurrentUserFields).toHaveBeenLastCalledWith(
      locale,
      'currentUserFields',
    );
    expect(result.current.currentUserFields.length).toEqual(4);
  });

  it('should fetch current user fields in arabic', async () => {
    const locale = 'ar';
    const wrapper = ({ children }) => {
      return (
        <AuthProvider>
          <LocaleProvider initialLocale={locale}>{children}</LocaleProvider>
        </AuthProvider>
      );
    };

    const { result, waitForNextUpdate } = renderHook(
      () => useUserFieldsFetcher(),
      {
        wrapper,
      },
    );
    expect(result.current.loading).toEqual(true);
    await waitForNextUpdate();

    expect(fetchCurrentUserFields).toHaveBeenLastCalledWith(
      locale,
      'currentUserFields',
    );
    expect(result.current.currentUserFields.length).toEqual(4);
    expect(result.current.loading).toEqual(false);
  });
});
