import React from 'react';
import Grid from '@material-ui/core/Grid';
import '../styles/client_detail.css';
import { MapWithAMarker } from '../components/GoogleMap';
import ClientDetails from './components/ClientDetail';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import WarningIcon from '@material-ui/icons/Warning';
import { cloneDeep } from 'lodash';
import { GOOGLE_MAPS_API_KEY } from '../settings';
import useClientDetailsStyle from './styles/clientDetailsPage';
import useClientDetails from './hooks/ClientDetails';
import {
  UPDATE_CURRENT_CLIENT,
  VERIFY_CURRENT_CLIENT,
} from './context/actionTypes';
import { useClientState } from './context';

const ClientDetailsPage = () => {
  const classes = useClientDetailsStyle();
  const { clientLocation, clientLoading, clientNotFound } = useClientDetails();

  const [{ currentClient }, dispatch] = useClientState();

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
      <Grid container className={classes.details}>
        <Grid item lg={12}>
          <ClientDetails id={'clientDetails'} passedClient={currentClient} />
        </Grid>
      </Grid>
      <Grid container className={classes.mapContainer}>
        <Grid item lg={6} className={classes.imgContainer}>
          <img
            className={classes.img}
            src={currentClient.image_link}
            id={'client-image'}
          />
        </Grid>
        <Grid item lg={6} className={classes.mapGrid}>
          <MapWithAMarker
            location={clientLocation}
            isMarkerShown
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&key=${GOOGLE_MAPS_API_KEY}`}
            loadingElement={<div style={{ height: '100%' }} />}
            containerElement={
              <div
                style={{
                  width: '100%',
                  marginLeft: 0,
                }}
              />
            }
            mapElement={<div className='mapElement' />}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default ClientDetailsPage;
