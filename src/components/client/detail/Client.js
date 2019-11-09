import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';

import { makeStyles } from '@material-ui/core/styles';
import { MapWithAMarker } from '../../GoogleMap';
import { useParams } from 'react-router-dom';
import ClientDetails from './ClientDetail';
import { fetchClient } from '../../../apis/clientsApi';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import WarningIcon from '@material-ui/icons/Warning';
import { cloneDeep } from 'lodash';
import { GOOGLE_MAPS_API_KEY } from '../../../settings';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  details: {
    padding: theme.spacing(2),
  },
  img: {
    height: '100%',
    maxHeight: 425,
    maxWidth: 400,
    overflow: 'hidden',
    display: 'block',
    width: '100%',
  },
  emptyContainer: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
  largeIcon: {
    width: 40,
    height: 40,
    color: 'red',
  },
  notFound: {
    color: 'red',
  },
}));

function Client(props) {
  let { id } = useParams();
  const [client, setClient] = useState({});
  const [clientLocation, setClientLocation] = useState({
    lat: 322,
    lng: 133,
  });
  const [_, setPhoneNumbers] = useState([]);
  const [clientLoading, setClientLoading] = useState(false);
  const [clientNotFound, setClientNotFound] = useState(false);

  const classes = useStyles();

  const adaptMapsLocation = (lat, long) => {
    setClientLocation({
      lat: parseFloat(lat),
      lng: parseFloat(long),
    });
  };

  function handleOnStateChanged() {
    const tempClientState = cloneDeep(client);
    tempClientState.verified = true;
    setClient(tempClientState);
  }

  const extractPhoneNumbers = (fetchedClient) => {
    const phone_numbers = [];
    fetchedClient.contacts.forEach((contact) => {
      phone_numbers.push(contact.phone_number);
    });
    setPhoneNumbers(phone_numbers);
    fetchedClient.contacts = phone_numbers;
  };

  useEffect(() => {
    setClientLoading(true);
    fetchClient(id)
      .then((res) => {
        const fetchedClient = res.data;
        adaptMapsLocation(
          fetchedClient.location.coordinates[0],
          fetchedClient.location.coordinates[1],
        );
        extractPhoneNumbers(fetchedClient);
        setClient(fetchedClient);
      })
      .catch((reason) => {
        if (reason.response.status === 404) {
          setClientNotFound(true);
        }
      })
      .finally(() => {
        setClientLoading(false);
      });
  }, []);
  if (clientLoading) {
    return (
      <div className={classes.emptyContainer}>
        <CircularProgress />
      </div>
    );
  } else if (clientNotFound) {
    return (
      <div className={classes.emptyContainer}>
        <Typography variant='h3' className={classes.notFound} gutterBottom>
          العميل المطلوب غير موجود <WarningIcon className={classes.largeIcon} />
        </Typography>
      </div>
    );
  }
  return (
    <div className={classes.root} dir='rtl'>
      <Grid container spacing={3} className={classes.details}>
        <Grid item lg={8} md={8} xs={12}>
          <ClientDetails
            id={'clientDetails'}
            passedClient={client}
            onStateChanged={handleOnStateChanged}
          />
        </Grid>
        <Grid item lg={4} md={4} xs={12}>
          <img
            className={classes.img}
            src={client.image_link}
            id={'client-image'}
          />
        </Grid>
      </Grid>
      <div className={classes.root} id={'client-location'}>
        <MapWithAMarker
          location={clientLocation}
          isMarkerShown
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&key=${GOOGLE_MAPS_API_KEY}`}
          loadingElement={<div style={{ height: '100%' }} />}
          containerElement={<div style={{ height: '400px' }} />}
          mapElement={<div style={{ height: '100%' }} />}
        />
      </div>
    </div>
  );
}

export default Client;
