import { useEffect, useState } from 'react';
import { useAuth } from '../../auth/auth';
import { fetchClient } from '../clientsApi';
import { useParams } from 'react-router';
import { useClientState } from '../context';
import { UPDATE_CURRENT_CLIENT } from '../context/actionTypes';

const ClientDetails = () => {
  let { uuid } = useParams();
  const [__, dispatch] = useClientState();
  const [clientLocation, setClientLocation] = useState({
    lat: 322,
    lng: 133,
  });
  const [_, setPhoneNumbers] = useState([]);
  const [clientLoading, setClientLoading] = useState(true);
  const [clientNotFound, setClientNotFound] = useState(false);
  const { authTokens, setAuthTokens } = useAuth();

  useEffect(() => {
    fetchClient(uuid, authTokens)
      .then((res) => {
        const fetchedClient = res.data;
        adaptMapsLocation(
          fetchedClient.location.coordinates[0],
          fetchedClient.location.coordinates[1],
        );
        extractPhoneNumbers(fetchedClient);
        dispatch({ type: UPDATE_CURRENT_CLIENT, payload: fetchedClient });
      })
      .catch((reason) => {
        if (reason.response.status === 404) {
          setClientNotFound(true);
        } else if (reason.response.status === 401) {
          localStorage.removeItem('tokens');
          localStorage.removeItem('users');
          setAuthTokens();
        }
      })
      .finally(() => {
        setClientLoading(false);
      });
  }, []);

  const adaptMapsLocation = (lat, long) => {
    setClientLocation({
      lat: parseFloat(lat),
      lng: parseFloat(long),
    });
  };

  const extractPhoneNumbers = (fetchedClient) => {
    const phone_numbers = [];
    fetchedClient.contacts.forEach((contact) => {
      phone_numbers.push(contact.phone_number);
    });
    setPhoneNumbers(phone_numbers);
    fetchedClient.contacts = phone_numbers;
  };

  return { clientLocation, clientLoading, clientNotFound };
};

export default ClientDetails;
