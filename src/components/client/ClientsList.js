import React, { useEffect, useState } from 'react';
import '../../styles/client.css';
import { makeStyles } from '@material-ui/core';
import { fetchClients } from '../../apis/clientsApi';
import Grid from '@material-ui/core/Grid';
import { MapWithMultipleMarkers } from '../GoogleMap';
import {
  default_location,
  GOOGLE_MAPS_API_KEY,
  table_localization,
} from '../../settings';
import CircularProgress from '@material-ui/core/CircularProgress';
import MaterialTable from 'material-table';
import ClientStatus from './status/ClientStatus';
import { Redirect } from 'react-router';
import { cloneDeep } from 'lodash';
import ErrorDialog from '../errors/ErrorDialog';
import { useAuth } from '../../auth/auth';

function ClientsList(props) {
  const [clients, setClients] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [redirectTo, setRedirectTo] = useState();
  const [clientsLoading, setClientsLoading] = useState(false);
  const [locations, setLocations] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const { authTokens, setAuthTokens } = useAuth();

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
        setClients(fetchedClients);
      })
      .catch((reason) => {
        if (reason.message === 'Network Error') {
          setErrorMessage('حدث خطأ أثناء الاتصال بالخادم');
          setShowError(true);
        } else if (reason.response.status === 401) {
          localStorage.removeItem('tokens');
          localStorage.removeItem('users');
          setAuthTokens();
        }
      })
      .finally(() => {
        setClientsLoading(false);
      });
  }, [authTokens, setAuthTokens]);

  function handleOnStateChanged(uuid) {
    const updatedClientIndex = clients.findIndex(
      (client) => client.uuid === uuid,
    );
    const tempClientState = cloneDeep(clients);
    tempClientState[updatedClientIndex].verified = true;
    setClients(tempClientState);
  }

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexFlow: 'row wrap',
      background: '#F5F5F5',
      padding: theme.spacing(3),
    },
    card: {
      padding: theme.spacing(1),
    },
    button: {
      margin: theme.spacing(1),
    },
    input: {
      display: 'none',
    },
    progressContainer: {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
    },
    tableContainer: {
      margin: theme.spacing(1),
    },
    tableContainerFW: {
      width: '100%',
      margin: theme.spacing(1),
    },
    mapContainer: {
      width: '100%',
      maxHeight: 600,
      margin: theme.spacing(1),
    },
  }));

  const classes = useStyles();

  if (redirect) {
    return <Redirect push to={redirectTo} />;
  }
  if (clientsLoading) {
    return (
      <div className={classes.progressContainer}>
        <CircularProgress />
      </div>
    );
  } else {
    return (
      <div dir='rtl' className={classes.root}>
        {showError && (
          <ErrorDialog
            message={errorMessage}
            close={() => {
              setShowError(false);
              setErrorMessage();
            }}
          />
        )}
        <Grid
          className={`tableContainer ${
            clients.length === 0
              ? classes.tableContainerFW
              : classes.tableContainer
          }`}>
          <MaterialTable
            id={'clientsList'}
            localization={table_localization('عملاء')}
            actions={[
              {
                icon: 'help',
                tooltip: 'تفاصيل العميل',
                iconProps: {
                  color: 'primary',
                },
                onClick: (event, rowData) => {
                  setRedirectTo(`/clients/${rowData.uuid}`);
                  setRedirect(true);
                },
              },
            ]}
            columns={[
              { title: 'أسم المكان', field: 'name' },
              { title: 'أسم المدير', field: 'ownerName' },
              { title: 'رقم الهاتف', field: 'contacts' },
              { title: 'العنوان', field: 'address' },
              {
                title: 'الحاله',
                field: 'verified',
                type: 'boolean',
                render: (client) => (
                  <ClientStatus
                    status={client.verified}
                    clientName={client.name}
                    onStateChanged={handleOnStateChanged}
                    uuid={client.uuid}
                  />
                ),
              },
              {
                title: 'تاريخ الاضافه',
                field: 'created',
                type: 'date',
                render: (client) => {
                  const date = new Date(client.created);
                  return `${date.toLocaleTimeString()} ${date.toLocaleDateString()}`;
                },
              },
            ]}
            data={clients}
            title={'العملاء'}
          />
        </Grid>
        {clients.length !== 0 && (
          <Grid
            id={'mapContainer'}
            item
            lg={4}
            className={classes.mapContainer}>
            <MapWithMultipleMarkers
              className={classes.map}
              markers={locations}
              isMarkerShown
              googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&key=${GOOGLE_MAPS_API_KEY}`}
              loadingElement={<div style={{ height: '100%' }} />}
              containerElement={
                <div
                  style={{ display: 'inline-block clear', height: '100%' }}
                />
              }
              mapElement={<div className={'mapElement'} />}
            />
          </Grid>
        )}
      </div>
    );
  }
}

export default ClientsList;
