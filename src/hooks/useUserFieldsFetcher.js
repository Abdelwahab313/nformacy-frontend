import { useQuery } from 'react-query';
import { fetchCurrentUserFields } from '../apis/userAPI';
import { immortalQueryConfig } from '../settings';
import useLocale from './localization/useLocale';

const useUserFieldsFetcher = () => {
  const { locale } = useLocale();
  const { refetch, data, isFetching } = useQuery(
    [locale, 'currentUserFields'],
    fetchCurrentUserFields,
    {
      ...immortalQueryConfig,
    },
  );
  return {
    loading: isFetching,
    currentUserFields: data,
    updateUserFields: refetch,
  };
};

export default useUserFieldsFetcher;
