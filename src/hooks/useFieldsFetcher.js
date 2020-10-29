import { useState } from 'react';
import { fetchFields } from '../apis/fieldsAPI';
import useLocale from './localization/useLocale';
import { useQuery } from 'react-query';

const useFieldFetcher = () => {
  const { locale } = useLocale();
  const [fields, setFields] = useState([]);
  const { isFetching } = useQuery(locale, fetchFields, {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    onSuccess: (response) => {
      setFields(response.data);
    },
  });

  const getFieldLabel = (fieldId) => {
    return fields?.find((field) => field.id === fieldId)?.label;
  };

  return { fields, loading: isFetching, getFieldLabel };
};
export default useFieldFetcher;
