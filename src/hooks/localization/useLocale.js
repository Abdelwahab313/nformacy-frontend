import { useAuth } from '../../pages/auth/context/auth';
import { CHANGE_LOCALE, useLocaleContext } from './context';
import { changeLocaleAPI } from '../../apis/userAPI';

const SWITCH_LOCAL = {
  en: 'ar',
  ar: 'en',
};
const useLocale = () => {
  const [{ currentUser }, dispatchUserAction] = useAuth();
  const [locale, dispatch] = useLocaleContext();

  const toggleLocale = () => {
    const newLocale = SWITCH_LOCAL[locale];
    dispatch({
      type: CHANGE_LOCALE,
      payload: { locale: newLocale },
    });
    changeLocaleAPI(currentUser?.id, newLocale).then(() => {
      dispatchUserAction({
        type: CHANGE_LOCALE,
        payload: { locale: newLocale },
      });
    });
  };

  const setLocale = (newLocale) => {
    dispatch({
      type: CHANGE_LOCALE,
      payload: { locale: newLocale },
    });
  };
  return { locale, toggleLocale, setLocale };
};
export default useLocale;
