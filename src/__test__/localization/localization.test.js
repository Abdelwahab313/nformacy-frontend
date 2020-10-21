import React from 'react';
import { render } from '@testing-library/react';
import useLocale from '../../hooks/localization/useLocale';
import { LocaleProvider } from '../../hooks/localization/context';
import { renderHook, act } from '@testing-library/react-hooks';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { API_BASE_URL } from '../../settings';
import { AuthProvider } from '../../pages/auth/context/auth';

const TestComponent = () => {
  const { locale } = useLocale();
  return { locale };
};

const axiosMock = new MockAdapter(axios);
describe('Page translations', () => {
  let result, credentials;
  beforeEach(async (done) => {
    credentials = { currentUser: { id: 2 } };
    axiosMock.onPatch().reply(200);
    await act(async () => {
      const wrapper = ({ children }) => (
        <AuthProvider initialValue={credentials}>
          <LocaleProvider>{children}</LocaleProvider>
        </AuthProvider>
      );
      const renderedHook = renderHook(() => useLocale(), { wrapper });
      result = renderedHook.result;
      await renderedHook.waitForNextUpdate();
      done();
    });
  });
  afterEach(() => {
    axiosMock.reset();
  });
  it('should only be used within context provider', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});

    const wrapper = ({ children }) => (
      <AuthProvider initialValue={credentials}>{children}</AuthProvider>
    );
    expect(() => render(<TestComponent />, { wrapper })).toThrow(
      'useLocale should only be used within locale provider',
    );

    jest.restoreAllMocks();
  });

  it('should have default state of locale as en', () => {
    expect(result.current.locale).toEqual('en');
  });

  it('should toggle locale when dispatching toggle locale action', async () => {
    act(() => result.current.toggleLocale());

    expect(result.current.locale).toEqual('ar');
  });

  it('should toggle locale when dispatching toggle locale action', () => {
    act(() => result.current.toggleLocale());
    expect(result.current.locale).toEqual('ar');
    act(() => result.current.toggleLocale());
    expect(result.current.locale).toEqual('en');
  });

  it('should post to the server the new locale', (done) => {
    act(() => result.current.toggleLocale());
    setTimeout(() => {
      expect(axiosMock.history.patch.length).toEqual(1);
      expect(axiosMock.history.patch[0].url).toEqual(
        `${API_BASE_URL}/users/${credentials.currentUser.id}/language`,
      );
      const expectedRequestBody = JSON.stringify({ locale: 'ar' });
      expect(axiosMock.history.patch[0].data).toEqual(expectedRequestBody);
      done();
    }, 500);
  });

  it('should update locale on the currentUser in localStorage', (done) => {
    const currentUser = { id: 2, locale: 'en' };
    localStorage.setItem('user', JSON.stringify(currentUser));

    act(() => result.current.toggleLocale());

    const expectedLocale = 'ar';
    setTimeout(() => {
      const userFromStorage = JSON.parse(localStorage.getItem('user'));
      const actualLocale = userFromStorage.locale;
      expect(expectedLocale).toEqual(actualLocale);
      done();
    }, 500);
  });

  it('should set locale to the given locale', () => {
    expect(result.current.locale).toEqual('en');

    act(() => result.current.setLocale('ar'));

    expect(result.current.locale).toEqual('ar');
  });
});
