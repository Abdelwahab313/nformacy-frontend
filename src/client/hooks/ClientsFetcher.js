import { useEffect, useState } from 'react';
import { useAuth } from '../../auth/auth';
import { fetchClients } from '../clientsApi';
import { default_location } from '../../settings';
import { cloneDeep } from 'lodash';
import { useClientState } from '../context';
import { UPDATE_CLIENTS } from '../context/actionTypes';
import { SET_ERROR_MESSAGE } from '../context/actionTypes';
import { convertObjectToArray } from '../utils';

const ClientsFetcher = () => {
  const [{ clients }, dispatch] = useClientState();
  const [clientsLoading, setClientsLoading] = useState(false);
  const [locations, setLocations] = useState([]);
  const { authTokens, setAuthTokens } = useAuth();

  function handleOnStateChanged(uuid) {
    const updatedClientIndex = clients.findIndex(
      (client) => client.uuid === uuid,
    );
    const tempClientState = cloneDeep(clients);
    tempClientState[updatedClientIndex].verified = true;
    dispatch({ type: UPDATE_CLIENTS, payload: tempClientState });
  }

  function getFirstPhoneNumbers(fetchedClients) {
    for (let i = 0; i < fetchedClients.length; i++) {
      fetchedClients[i].contacts = fetchedClients[i].contacts[0].phone_number;
    }
  }

  const adaptMapsLocation = (lat, long, name) => {
    return {
      lat: parseFloat(lat),
      lng: parseFloat(long),
      label: name,
    };
  };

  function constructLocationsList(fetchedClients) {
    const extractedLocations = [];
    for (let i = 0; i < fetchedClients.length; i++) {
      extractedLocations.push(
        adaptMapsLocation(
          fetchedClients[i].location.coordinates[0],
          fetchedClients[i].location.coordinates[1],
          fetchedClients[i].name,
        ),
      );
    }
    if (fetchedClients.length === 0) {
      extractedLocations.push(default_location);
    }
    setLocations(extractedLocations);
  }

  useEffect(() => {
    setClientsLoading(true);
    fetchClients(authTokens)
      .then((res) => {
        const fetchedClients = res.data;
        fetchedClients.sort(
          (a, b) => new Date(a.created) - new Date(b.created),
        );
        getFirstPhoneNumbers(fetchedClients);
        constructLocationsList(fetchedClients);

        const fetchedClientsAsArray = fetchedClients.map((client) =>
          convertObjectToArray(client),
        );
        dispatch({ type: UPDATE_CLIENTS, payload: fetchedClientsAsArray });
      })
      .catch((reason) => {
        if (reason.message === 'Network Error') {
          dispatch({
            type: SET_ERROR_MESSAGE,
            payload: 'حدث خطأ أثناء الاتصال بالخادم',
          });
        } else if (reason.response.status === 401) {
          localStorage.removeItem('tokens');
          localStorage.removeItem('users');
          setAuthTokens();
        }
      })
      .finally(() => {
        setClientsLoading(false);
      });
  }, []);

  return {
    clientsLoading,
    locations,
    handleOnStateChanged,
  };
};

export default ClientsFetcher;
