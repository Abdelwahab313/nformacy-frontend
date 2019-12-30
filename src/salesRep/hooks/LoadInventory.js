import { useAuth } from '../../auth/auth';
import { useSalesRepState } from '../context';
import { addInventoryToUser } from '../salesRepsAPI';
import { SET_ERROR_MESSAGE } from '../context/contextAction';
import useProductFetcher from '../../product/hooks/ProductFetcher';

const LoadInventory = ({ salesRep, closeForm }) => {
  const { authTokens, setAuthTokens } = useAuth();
  const [{ addedProducts }, dispatch] = useSalesRepState();
  const { productsLoading, setProductsLoading } = useProductFetcher();

  const submit = () => {
    setProductsLoading(true);
    const inventoryProducts = addedProducts.map((product) => ({
      product_uuid: product.productUUID,
      quantity: product.quantity,
    }));
    addInventoryToUser(salesRep[0], inventoryProducts, authTokens)
      .catch((response) => {
        if (response.status === 401) {
          localStorage.removeItem('tokens');
          localStorage.removeItem('users');
          setAuthTokens();
        } else {
          dispatch({
            type: SET_ERROR_MESSAGE,
            payload: 'حدث خطأ أثناء الاتصال بالخادم',
          });
        }
      })
      .finally(() => {
        closeForm();
        setProductsLoading(false);
      });
  };
  return { productsLoading, submit };
};

export default LoadInventory;
