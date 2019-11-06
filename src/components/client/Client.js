import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';

import { makeStyles } from '@material-ui/core/styles';
import { MapWithAMarker } from '../GoogleMap';
import { useParams } from 'react-router-dom';
import ClientDetails from './clientDetail';
import { fetchClient } from '../../apis/clientsApi';

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
    height: 255,
    maxWidth: 400,
    overflow: 'hidden',
    display: 'block',
    width: '100%',
  },
}));

function Client(props) {
  let { id } = useParams();
  const [client, setClient] = useState({});
  const [clientLocation, setClientLocation] = useState({
    lat: 322,
    lng: 133,
  });
  const [clientPhoneNumbers, setPhoneNumbers] = useState([]);
  const classes = useStyles();

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
    fetchedClient.contacts = clientPhoneNumbers;
  };

  useEffect(() => {
    fetchClient(id).then((res) => {
      const fetchedClient = res.data;
      adaptMapsLocation(
        fetchedClient.location.coordinates[0],
        fetchedClient.location.coordinates[1],
      );
      extractPhoneNumbers(fetchedClient);
      setClient(fetchedClient);
    });
  }, []);
  return (
    <div className={classes.root} dir='rtl'>
      <Grid container spacing={3} className={classes.details}>
        <Grid item lg={8} md={8} xs={12}>
          <ClientDetails client={client} />
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
          googleMapURL='https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyAkTN0O0xKX8L9-NHvR7YSNungyim6nkgk'
          loadingElement={<div style={{ height: '100%' }} />}
          containerElement={<div style={{ height: '400px' }} />}
          mapElement={<div style={{ height: '100%' }} />}
        />
      </div>
    </div>
  );
}

export default Client;
