import React, { useEffect, useState } from 'react';
import '../../styles/client.css';
import { makeStyles } from '@material-ui/core';
import { fetchClients } from '../../apis/clientsApi';
import Grid from '@material-ui/core/Grid';
import { MapWithMultipleMarkers } from '../GoogleMap';
import { default_location } from '../../settings';
import CircularProgress from '@material-ui/core/CircularProgress';
import MaterialTable from 'material-table';
import ClientStatus from './status/ClientStatus';
import { Redirect } from 'react-router';
import { cloneDeep } from 'lodash';

function ClientsList(props) {
  const [clients, setClients] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [redirectTo, setRedirectTo] = useState();
  const [clientsLoading, setClientsLoading] = useState(false);
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
    setClientsLoading(true);
    fetchClients()
      .then((res) => {
        const fetchedClients = res.data;
        fetchedClients.sort((a, b) => a.id - b.id);
        getFirstPhoneNumbers(fetchedClients);
        constructLocationsList(fetchedClients);
        setClients(fetchedClients);
      })
      .finally(() => {
        setClientsLoading(false);
      });
  }, []);

  function handleOnStateChanged(id) {
    debugger;
    const updatedClientIndex = clients.findIndex((client) => client.id === id);
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
    mapContainer: {
      width: '100%',
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
        <Grid className={`tableContainer ${classes.tableContainer}`}>
          <MaterialTable
            localization={{
              pagination: {
                labelDisplayedRows: '{from}-{to} من {count}',
                labelRowsSelect: 'عملاء',
                firstAriaLabel: 'الصفحه الاولى',
                firstTooltip: 'الصفحه الاولى',
                previousAriaLabel: 'الصفحه السابقه',
                previousTooltip: 'الصفحه السابقه',
                nextAriaLabel: 'الصفحه التاليه',
                nextTooltip: 'الصفحه التاليه',
                lastAriaLabel: 'الصفحه الأخيره',
                lastTooltip: 'الصفحه الأخيره',
              },
              toolbar: {
                searchPlaceholder: 'بحث',
                searchTooltip: 'بحث',
              },
              header: {
                actions: 'عمليات',
              },
              body: {
                emptyDataSourceMessage: 'لا يوجد عملاء لعرضهم',
                filterRow: {
                  filterTooltip: 'Filter',
                },
              },
            }}
            actions={[
              {
                icon: 'help',
                tooltip: 'تفاصيل العميل',
                iconProps: {
                  color: 'primary',
                },
                onClick: (event, rowData) => {
                  setRedirectTo(`/clients/${rowData.id}`);
                  setRedirect(true);
                },
              },
              // {
              //   icon: 'delete',
              //   tooltip: 'حذف العميل',
              //   iconProps: {
              //     color: 'secondary',
              //   },
              //   onClick: (event, rowData) => {
              //   },
              // },
              // {
              //   icon: 'edit',
              //   tooltip: 'تعديل العميل',
              //   iconProps: {
              //     color: 'inherit',
              //   },
              //   onClick: (event, rowData) => {
              //   },
              // },
            ]}
            columns={[
              // { title: 'رقم العميل', field: 'id' },
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
                    id={client.id}
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
          <Grid item lg={4} className={classes.mapContainer}>
            <MapWithMultipleMarkers
              className={classes.map}
              markers={locations}
              isMarkerShown
              googleMapURL='https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyAkTN0O0xKX8L9-NHvR7YSNungyim6nkgk'
              loadingElement={<div style={{ height: '100%' }} />}
              containerElement={<div style={{ height: '580px' }} />}
              mapElement={<div style={{ height: '100%' }} />}
            />
          </Grid>
        )}
      </div>
    );
  }
}

export default ClientsList;
