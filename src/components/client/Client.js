import React from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';

import { makeStyles } from '@material-ui/core/styles';
import MapWithAMarker from '../GoogleMap';
import ImagesSlides from '../ImagesSlides';
import { useParams } from 'react-router-dom';
import { clients } from '../../data';

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
}));

const Client = (props) => {
  let { id } = useParams();
  const classes = useStyles();
  const client = clients[parseInt(id)];
  return (
    <div className={classes.root} dir='rtl'>
      <Grid container spacing={3} className={classes.details}>
        <Grid item lg={8} md={8} xs={12}>
          <Paper className={classes.paper}>
            <p>تفاصيل العميل</p>
            <Table>
              <TableRow>
                <TableCell>أسم المكان</TableCell>
                <TableCell>{client.clientName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>أسم المدير</TableCell>
                <TableCell>{client.ownerName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>العنوان</TableCell>
                <TableRow>
                  <TableCell>الموقع</TableCell>
                  <TableCell>
                    {client.location.lat}, {client.location.lng}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>العنوان</TableCell>
                  <TableCell>{client.address}</TableCell>
                </TableRow>
              </TableRow>
              <TableRow>
                <TableCell>التليفون</TableCell>
                <TableCell>
                  {client.mobile.map((phone) => (
                    <>
                      {' '}
                      {phone} <br />
                    </>
                  ))}
                </TableCell>
              </TableRow>
            </Table>
          </Paper>
        </Grid>
        <Grid item lg={4} md={4} xs={12}>
          <ImagesSlides />
        </Grid>
      </Grid>
      <div className={classes.root}>
        <MapWithAMarker
          location={client.location}
          isMarkerShown
          googleMapURL='https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places'
          loadingElement={<div style={{ height: '100%' }} />}
          containerElement={<div style={{ height: '400px' }} />}
          mapElement={<div style={{ height: '100%' }} />}
        />
      </div>
    </div>
  );
};

export default Client;
