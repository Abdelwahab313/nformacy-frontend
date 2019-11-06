import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import '../../styles/client.css';
import { makeStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { Link, Route, Switch } from 'react-router-dom';
import { fetchClients } from '../../apis/clientsApi';
import ClientStatus from './clientStatus';
import Grid from '@material-ui/core/Grid';
import { MapWithMultipleMarkers } from '../GoogleMap';
import { default_location } from '../../settings';

function ClientsList(props) {
  const [clients, setClients] = useState(props.clients);
  const [locations, setLocations] = useState([]);

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
    fetchClients().then((res) => {
      const fetchedClients = res.data;
      fetchedClients.sort((a, b) => a.id - b.id);
      getFirstPhoneNumbers(fetchedClients);
      constructLocationsList(fetchedClients);
      setClients(fetchedClients);
    });
  }, []);
  const useStyles = makeStyles((theme) => ({
    root: {
      background: '#F5F5F5',
      padding: theme.spacing.unit * 3,
    },
    card: {
      padding: theme.spacing.unit,
    },
    button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
    },
  }));

  const classes = useStyles();

  return (
    <div dir='rtl' className={classes.root}>
      <Grid container spacing={3} className={classes.details}>
        <Grid>
          <Paper className={classes.card} dir='rtl'>
            <Typography variant='h5' component='h3'>
              العملاء
            </Typography>
            <Table id={'all-clients'}>
              <TableHead>
                <TableRow>
                  <TableCell>رقم العميل</TableCell>
                  <TableCell>أسم المكان</TableCell>
                  <TableCell>أسم المدير</TableCell>
                  <TableCell>رقم الهاتف</TableCell>
                  <TableCell>العنوان</TableCell>
                  <TableCell>الحاله</TableCell>
                  <TableCell> عرض المزيد</TableCell>
                </TableRow>
                {clients.map((client, index) => (
                  <TableRow id={'client-' + (index + 1)}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{client.name}</TableCell>
                    <TableCell>{client.ownerName}</TableCell>
                    <TableCell>{client.contacts}</TableCell>
                    <TableCell>{client.address}</TableCell>
                    <TableCell>
                      <ClientStatus
                        status={client.verified}
                        clientName={client.name}
                        id={client.id}
                      />
                    </TableCell>
                    <TableCell id={'details'}>
                      <Switch>
                        <Route>
                          <Link to={'/clients/' + client.id}>التفاصيل</Link>
                        </Route>
                      </Switch>
                    </TableCell>
                  </TableRow>
                ))}
              </TableHead>
            </Table>
          </Paper>
        </Grid>
        <Grid item lg={4}>
          <MapWithMultipleMarkers
            className={classes.map}
            markers={locations}
            isMarkerShown
            googleMapURL='https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyAkTN0O0xKX8L9-NHvR7YSNungyim6nkgk'
            loadingElement={<div style={{ height: '100%' }} />}
            containerElement={<div style={{ height: '550px' }} />}
            mapElement={<div style={{ height: '100%' }} />}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default ClientsList;
