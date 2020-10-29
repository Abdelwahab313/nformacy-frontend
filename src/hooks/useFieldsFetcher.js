import { useEffect, useState } from 'react';
import { fetchFields } from '../apis/fieldsAPI';
import useLocale from './localization/useLocale';

const useFieldFetcher = () => {
  const { locale } = useLocale();
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (locale) {
      fetchFields(locale).then((response) => {
        setFields(response.data);
        setLoading(false);
      });
    }
  }, [locale]);
  return { fields, loading };
};
export default useFieldFetcher;
