import { fetchFields } from '../apis/fieldsAPI';
import useLocale from './localization/useLocale';
import { useQuery } from 'react-query';
import { immortalQueryConfig } from '../settings';

const useFieldFetcher = () => {
  const { locale } = useLocale();
  const { isFetching, data: fields } = useQuery(locale, fetchFields, {
    staleTime: 'Infinity',
    ...immortalQueryConfig,
  });

  return {
    fields,
    loading: isFetching,
  };
};
export default useFieldFetcher;
