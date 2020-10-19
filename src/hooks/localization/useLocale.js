import { useAuth } from '../../pages/auth/context/auth';
import { useState } from 'react';

const useLocale = () => {
  const [{ currentUser }] = useAuth();
  const [locale, setLocale] = useState(
    currentUser ? currentUser?.locale : 'en',
  );

  const changeLocale = (newLocale) => {
    setLocale(newLocale);
  };

  return { locale, changeLocale };
};
export default useLocale;
