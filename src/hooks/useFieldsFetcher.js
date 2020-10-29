import { useState } from 'react';
import { fetchFields } from '../apis/fieldsAPI';
import useLocale from './localization/useLocale';
import { useQuery } from 'react-query';

const useFieldFetcher = () => {
  const { locale } = useLocale();
  const { isFetching, data: response } = useQuery(locale, fetchFields, {
    staleTime: 'Infinity',
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    onSuccess: (response) => {
      setFields(response.data);
    },
  });
  const [fields, setFields] = useState(response ? response.data : []);

  const getFieldLabel = (fieldId) => {
    return fields?.find((field) => field.id === fieldId)?.label;
  };

  return { fields, loading: isFetching, getFieldLabel };
};
export default useFieldFetcher;
