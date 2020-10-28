import useFieldFetcher from './useFieldsFetcher';

const FieldsSelect = ({ children }) => {
  const { majorFields, loading } = useFieldFetcher();

  return children(majorFields, loading);
};

export default FieldsSelect;
