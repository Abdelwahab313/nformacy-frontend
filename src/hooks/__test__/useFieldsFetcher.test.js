import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { AuthProvider } from '../../pages/auth/context/auth';
import { LocaleProvider } from '../localization/context';
import useFieldsFetcher from '../useFieldsFetcher';
import { fetchFields } from '../../apis/fieldsAPI';
import { fetchCurrentUserFields } from '../../apis/userAPI';
import { queryCache } from 'react-query';

jest.mock('apis/fieldsAPI', () => ({
  __esModule: true, // this property makes it work
  default: 'mockedDefaultExport',
  fetchFields: jest.fn().mockResolvedValue({
    data: [
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
    ],
  }),
}));

jest.mock('apis/userAPI', () => ({
  __esModule: true, // this property makes it work
  default: 'mockedDefaultExport',
  fetchCurrentUserFields: jest.fn().mockResolvedValue({
    data: [
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
    ],
  }),
}));

describe('fetch fields', () => {
  beforeEach(() => queryCache.clear())

  it('should fetch all major fields in english', async () => {
    const locale = 'en';
    const wrapper = ({ children }) => {
      return (
        <AuthProvider>
          <LocaleProvider initialLocale={locale}>{children}</LocaleProvider>
        </AuthProvider>
      );
    };

    const { result, waitForNextUpdate } = renderHook(() => useFieldsFetcher(), {
      wrapper,
    });
    await waitForNextUpdate()

    expect(fetchFields).toHaveBeenLastCalledWith(locale);
    expect(result.current.fields.length).toEqual(4);
  });

  it('should fetch all major fields in arabic', async () => {
    const locale = 'ar';
    const wrapper = ({ children }) => {
      return (
        <AuthProvider>
          <LocaleProvider initialLocale={locale}>{children}</LocaleProvider>
        </AuthProvider>
      );
    };

    const { result, waitForNextUpdate } = renderHook(() => useFieldsFetcher(), {
      wrapper,
    });
    expect(result.current.loading).toEqual(true)
    await waitForNextUpdate()

    expect(fetchFields).toHaveBeenLastCalledWith(locale);
    expect(result.current.fields.length).toEqual(4);
    expect(result.current.loading).toEqual(false)
  });

  it('should fetch current user fields in english', async () => {
    const locale = 'en';
    const wrapper = ({ children }) => {
      return (
        <AuthProvider>
          <LocaleProvider initialLocale={locale}>{children}</LocaleProvider>
        </AuthProvider>
      );
    };

    const { result, waitForNextUpdate } = renderHook(() => useFieldsFetcher(), {
      wrapper,
    });
    await waitForNextUpdate()

    expect(fetchCurrentUserFields).toHaveBeenLastCalledWith(locale, "currentUserFields");
    expect(result.current.fields.length).toEqual(4);
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

    const { result, waitForNextUpdate } = renderHook(() => useFieldsFetcher(), {
      wrapper,
    });
    expect(result.current.loading).toEqual(true)
    await waitForNextUpdate()

    expect(fetchCurrentUserFields).toHaveBeenLastCalledWith(locale, "currentUserFields");
    expect(result.current.fields.length).toEqual(4);
    expect(result.current.loading).toEqual(false)
  });
});
