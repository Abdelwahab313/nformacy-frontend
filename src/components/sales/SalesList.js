import React, { useEffect, useState } from 'react';
import { Button, makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import MaterialTable, { MTableToolbar } from 'material-table';
import { table_localization } from '../../settings';
import { default_location, GOOGLE_MAPS_API_KEY } from '../../settings';
import { sales } from '../../data';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { fetchSales, getSalesWithDate } from '../../apis/salesApi';
import { useAuth } from '../../context/auth';
import ErrorDialog from '../errors/ErrorDialog';
import { fetchClient } from '../../apis/clientsApi';
import { fetchUser } from '../../apis/usersApi';
import moment from 'moment';
import CircularProgress from '@material-ui/core/CircularProgress';
import '../../styles/client.css';
import { MapWithMultipleMarkers } from '../GoogleMap';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'row wrap',
    background: '#F5F5F5',
    padding: theme.spacing(3),
  },
  addButton: {
    marginBottom: theme.spacing(1),
  },
  toolBar: {
    position: 'relative',
    color: '#edf0f2',
    justifyContent: 'space-between',
    flexBasis: '100%',
  },
  addForm: {
    margin: 'auto',
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
    width: '85%',
    margin: theme.spacing(1),
  },
  mapContainer: {
    width: '85%',
    maxHeight: 600,
    margin: theme.spacing(1),
  },
}));
const SalesList = (props) => {
  const [sales, setSales] = useState([]);
  const { authTokens, setAuthTokens } = useAuth();
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const [allSales, setAllSales] = useState([]);
  const classes = useStyles();
  const [locations, setLocations] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [salesLoading, setSalesLoading] = useState(false);

  useEffect(() => {
    setSalesLoading(true);
    let fetchedSales;
    fetchSales(authTokens)
      .then((res) => {
        fetchedSales = res.data;
        fetchedSales.sort((a, b) => new Date(a.created) - new Date(b.created));
      })
      .then(async () => {
        return await Promise.all(
          fetchedSales.map(async (sale) => {
            let res = await fetchClient(sale.to, authTokens);
            sale.to = res.data.name;
          }),
        );
      })
      .then(async () => {
        return await Promise.all(
          fetchedSales.map(async (sale) => {
            let res = await fetchUser(sale.by, authTokens);
            sale.by = res.data.first_name + ' ' + res.data.last_name;
          }),
        );
      })
      .then(() => {
        setSales(fetchedSales);
        constructLocationsList(fetchedSales);
        setAllSales(fetchedSales);
      })
      .catch((reason) => {
        debugger;
        if (reason.message === 'Network Error') {
          setErrorMessage('حدث خطأ أثناء الاتصال بالخادم');
          setShowError(true);
        } else if (reason.response.status === 401) {
          localStorage.removeItem('tokens');
          localStorage.removeItem('sales');
          setAuthTokens();
        }
      })
      .finally((res) => {
        setSalesLoading(false);
      });
  }, []);
  const adaptMapsLocation = (lat, long, name) => {
    return {
      lat: parseFloat(lat),
      lng: parseFloat(long),
      label: name,
    };
  };

  function constructLocationsList(fetchedSales) {
    const extractedLocations = [];
    for (let i = 0; i < fetchedSales.length; i++) {
      let date = new Date(fetchedSales[i].created);
      extractedLocations.push(
        adaptMapsLocation(
          fetchedSales[i].saved_location.coordinates[0],
          fetchedSales[i].saved_location.coordinates[1],
          `${fetchedSales[i].to}_${
            fetchedSales[i].by
          }_${date.toLocaleDateString()}`,
        ),
      );
    }
    if (fetchedSales.length === 0) {
      extractedLocations.push(default_location);
    }
    setLocations(extractedLocations);
  }

  function handleOnFilterClick() {
    setSalesLoading(true);
    let formattedStartDate = moment(startDate).format('YYYY/MM/DD');
    let formattedEndDate = moment(endDate).format('YYYY/MM/DD 23:59:59');
    getSalesWithDate(formattedStartDate, formattedEndDate, authTokens)
      .then((res) => {
        let fetchedFilteredSales = res.data;
        let filteredSales = allSales.filter(function(element) {
          return this.find((elem) => element['uuid'] === elem['uuid']);
        }, fetchedFilteredSales);
        return filteredSales;
      })
      .then((filteredSales) => {
        setSales(filteredSales);
        constructLocationsList(filteredSales);
      })
      .finally((res) => {
        setSalesLoading(false);
      });
  }

  if (salesLoading) {
    return (
      <div className={classes.progressContainer}>
        <CircularProgress />
      </div>
    );
  } else {
    return (
      <div className={classes.root} dir='rtl'>
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
            sales.length === 0
              ? classes.tableContainerFW
              : classes.tableContainer
          }`}>
          <MaterialTable
            id={'salesList'}
            localization={table_localization('مبيعات')}
            columns={[
              { title: 'اسم العميل', field: 'to' },
              { title: 'اسم المندوب', field: 'by' },
              { title: 'الحساب الكلي', field: 'total_price' },
              {
                title: 'التاريخ',
                field: 'date',
                render: (sale) => {
                  const date = new Date(sale.created);
                  return `${date.toLocaleTimeString()} ${date.toLocaleDateString()}`;
                },
              },
            ]}
            options={{
              headerStyle: {
                zIndex: 0,
              },
            }}
            data={sales}
            title={'المبيعات'}
            components={{
              Toolbar: (props) => (
                <Grid lg={12}>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Grid
                      lg={3}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <label>تصفية النتائج:</label>
                    </Grid>
                    <Grid
                      lg={9}
                      style={{
                        display: 'flex',
                        padding: '10px',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                      }}>
                      <label>من</label>
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                      />
                      <label>الي</label>
                      <DatePicker
                        style={{ borderRadius: 7, padding: 6, fontSize: 13 }}
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                      />
                      <Button
                        size='small'
                        variant='contained'
                        onClick={handleOnFilterClick}
                        color='primary'>
                        عرض
                      </Button>
                    </Grid>
                  </div>
                  <MTableToolbar {...props} />
                </Grid>
              ),
            }}
          />
        </Grid>
        {sales.length !== 0 && (
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
              mapElement={<div style={{ height: '100%' }} />}
            />
          </Grid>
        )}
      </div>
    );
  }
};

export default SalesList;
