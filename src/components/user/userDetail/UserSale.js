import React, { useEffect, useState } from 'react';
import { Button, makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import MaterialTable, { MTableToolbar } from 'material-table';
import {
  default_location,
  GOOGLE_MAPS_API_KEY,
  table_localization,
} from '../../../settings';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { fetchSalesByRep, getSalesWithDate } from '../../../apis/salesApi';
import { useAuth } from '../../../context/auth';
import ErrorDialog from '../../errors/ErrorDialog';
import { fetchClient } from '../../../apis/clientsApi';
import moment from 'moment';
import CircularProgress from '@material-ui/core/CircularProgress';
import { MapWithMultipleMarkers } from '../../GoogleMap';
import '../../../styles/sales.css';
import { Redirect } from 'react-router';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'row wrap',
    background: '#F5F5F5',
    paddingLeft: theme.spacing(1),
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
    width: '100%',
    margin: theme.spacing(1),
  },
  mapContainer: {
    width: '100%',
    maxHeight: 600,
    margin: theme.spacing(1),
  },
}));
const UserSalesScreen = ({ rep_uuid }) => {
  const [userSales, setUserSales] = useState([]);
  const { authTokens, setAuthTokens } = useAuth();
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const [allUserSales, setAllUserSales] = useState([]);
  const classes = useStyles();
  const [locations, setLocations] = useState([]);
  const [startDate, setStartDate] = useState(Date.now());
  const [endDate, setEndDate] = useState(Date.now());
  const [salesLoading, setSalesLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [redirectTo, setRedirectTo] = useState();

  useEffect(() => {
    setSalesLoading(true);
    let fetchedSales;
    fetchSalesByRep(authTokens, rep_uuid)
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
      .then(() => {
        setUserSales(fetchedSales);
        constructLocationsList(fetchedSales);
        setAllUserSales(fetchedSales);
      })
      .catch((reason) => {
        if (reason.message === 'Network Error') {
          setErrorMessage('حدث خطأ أثناء الاتصال بالخادم');
          setShowError(true);
        } else if (reason.response.status === 401) {
          localStorage.removeItem('tokens');
          localStorage.removeItem('userSales');
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
          `${fetchedSales[i].to}_${date.toLocaleDateString()}`,
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
        let filteredSales = allUserSales.filter(function(element) {
          return this.find((elem) => element['uuid'] === elem['uuid']);
        }, fetchedFilteredSales);
        return filteredSales;
      })
      .then((filteredSales) => {
        setUserSales(filteredSales);
        constructLocationsList(filteredSales);
      })
      .finally((res) => {
        setSalesLoading(false);
      });
  }

  if (redirect) {
    return <Redirect push to={redirectTo} />;
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
            userSales.length === 0
              ? classes.tableContainerFW
              : classes.tableContainer
          }`}>
          <MaterialTable
            id={'salesList'}
            localization={table_localization('مبيعات')}
            actions={[
              {
                icon: 'help',
                tooltip: 'تفاصيل الفاتورة',
                iconProps: {
                  color: 'primary',
                },
                onClick: (event, rowData) => {
                  setRedirectTo(`/sales/${rowData.uuid}`);
                  setRedirect(true);
                },
              },
            ]}
            columns={[
              { title: 'اسم العميل', field: 'to' },
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
            data={userSales}
            title={'المبيعات'}
            components={{
              Toolbar: (props) => (
                <Grid lg={12}>
                  <div className={'filterContainer'}>
                    <Grid lg={3} className={'filterTitle'}>
                      <label>تصفية النتائج:</label>
                    </Grid>
                    <Grid lg={9} className={'filterInputContainer'}>
                      <div>
                        <label>من</label>
                        <DatePicker
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                        />
                      </div>
                      <div>
                        <label>الي</label>
                        <DatePicker
                          style={{ borderRadius: 7, padding: 6, fontSize: 13 }}
                          selected={endDate}
                          onChange={(date) => setEndDate(date)}
                        />
                      </div>
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
        {userSales.length !== 0 && (
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
};

export default UserSalesScreen;
