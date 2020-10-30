import { useState } from 'react';
import { fetchFields } from '../apis/fieldsAPI';
import useLocale from './localization/useLocale';
import { useQuery } from 'react-query';
import { fetchCurrentUserFields } from '../apis/userAPI';
import { groupBy } from 'lodash';

const queryConfig = {
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  refetchOnMount: false,
};

const groupFieldsByMajorFieldId = (fields) => {
  return groupBy(fields, 'majorFieldId');
};

const useFieldFetcher = () => {
  const { locale } = useLocale();
  const { isFetching, data: response } = useQuery(locale, fetchFields, {
    staleTime: 'Infinity',
    ...queryConfig,
    onSuccess: (response) => {
      setFields(response.data);
    },
  });
  const [fields, setFields] = useState(response ? response.data : []);
  const {
    refetch,
    data: userFieldsResponse,
    isFetching: isUserFieldsFetching,
  } = useQuery([locale, 'currentUserFields'], fetchCurrentUserFields, {
    ...queryConfig,
    onSuccess: (response) => {
      const fieldsGroupedByMajor = groupFieldsByMajorFieldId(response.data);
      setCurrentUserFields(fieldsGroupedByMajor);
    },
  });

  const [currentUserFields, setCurrentUserFields] = useState(
    userFieldsResponse
      ? groupFieldsByMajorFieldId(userFieldsResponse.data)
      : [],
  );

  const getFieldLabel = (fieldId) => {
    return fields?.find((field) => field.id === fieldId)?.label;
  };

  return {
    fields,
    loading: isFetching || isUserFieldsFetching,
    getFieldLabel,
    currentUserFields,
    updateUserFields: refetch,
  };
};
export default useFieldFetcher;
