import { useState } from 'react';
import { fetchFields } from '../apis/fieldsAPI';
import useLocale from './localization/useLocale';
import { useQuery } from 'react-query';
import { fetchCurrentUserFields } from '../apis/userAPI';

const queryConfig = {
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  refetchOnMount: false,
};

const useFieldFetcher = () => {
  const { locale } = useLocale();
  const { isFetching, data: response } = useQuery(locale, fetchFields, {
    staleTime: 'Infinity',
    ...queryConfig,
    onSuccess: (response) => {
      setFields(response);
    },
  });
  const [fields, setFields] = useState(response ? response : []);
  const {
    refetch,
    data: userFieldsResponse,
    isFetching: isUserFieldsFetching,
  } = useQuery([locale, 'currentUserFields'], fetchCurrentUserFields, {
    ...queryConfig,
    onSuccess: (response) => {
      setCurrentUserFields(response);
    },
  });

  const [currentUserFields, setCurrentUserFields] = useState(
    userFieldsResponse
      ? userFieldsResponse
      : [],
  );


  return {
    fields,
    loading: isFetching || isUserFieldsFetching,
    currentUserFields,
    updateUserFields: refetch,
  };
};
export default useFieldFetcher;