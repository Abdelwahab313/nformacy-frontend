import { useEffect, useState } from 'react';
import { fetchFields } from '../../../apis/fieldsAPI';
import useLocale from '../../../hooks/localization/useLocale';

const useFieldFetcher = () => {
  const { locale } = useLocale();
  const [majorFields, setMajorFields] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (locale) {
      fetchFields(locale).then((response) => {
        setMajorFields(response.data);
        setLoading(false);
      });
    }
  }, [locale]);
  return { majorFields, loading };
};
export default useFieldFetcher;
