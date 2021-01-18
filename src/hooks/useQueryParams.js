const { useLocation } = require('react-router');

const useQueryParams = () => {
  const location = useLocation();
  return new URLSearchParams(location.search);
};

export default useQueryParams;
