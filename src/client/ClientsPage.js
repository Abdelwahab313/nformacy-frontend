import React, { useRef, useState } from 'react';
import '../styles/client.css';
import useClientsFetcher from './hooks/ClientsFetcher';
import Grid from '@material-ui/core/Grid';
import { MapWithMultipleMarkers } from '../components/GoogleMap';
import { GOOGLE_MAPS_API_KEY, table_localization } from '../settings';
import CircularProgress from '@material-ui/core/CircularProgress';
import ClientStatus from './components/ClientStatus';
import { Redirect } from 'react-router';
import ErrorDialog from '../components/errors/ErrorDialog';
import { useClientState } from './context';
import {
  SET_ERROR_MESSAGE,
  SET_UPDATE_DIALOG_OPEN,
} from '../salesRep/context/contextAction';
import useClientsPageStyle from './styles/clientsPage';
import MUIDataTable from 'mui-datatables';
import { tableLabels } from '../constants/tableLocalization';
import TableSelectedToolBar from './components/TableSelectedToolBar';
import { VERIFY_CLIENT } from './context/actionTypes';

const ClientsPage = () => {
  const [{ clients, errorMessage }, dispatch] = useClientState();
  const [redirect, setRedirect] = useState(false);
  const [redirectTo, setRedirectTo] = useState();
  let selectedClient = useRef(undefined);
  const {
    clientsLoading,
    locations,
    handleOnStateChanged,
  } = useClientsFetcher();

  const classes = useClientsPageStyle();

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
        {errorMessage && (
          <ErrorDialog
            message={errorMessage}
            close={() => {
              dispatch({
                type: SET_ERROR_MESSAGE,
                payload: '',
              });
            }}
          />
        )}
        <Grid
          className={`tableContainer ${
            clients.length === 0
              ? classes.tableContainerFW
              : classes.tableContainer
          }`}>
          <MUIDataTable
            title={'العملاء'}
            data={clients}
            columns={[
              {
                name: 'id',
                options: {
                  filter: false,
                  display: 'excluded',
                },
              },
              {
                name: 'أسم المكان',
                options: {
                  filter: false,
                },
              },
              {
                name: 'أسم المدير',
                options: {
                  filter: false,
                },
              },
              {
                name: 'العنوان',
                options: {
                  filter: false,
                },
              },
              {
                name: 'صوره العميل',
                options: {
                  display: 'excluded',
                  filter: false,
                },
              },
              {
                name: 'رقم الهاتف',
                options: {
                  filter: false,
                },
              },
              {
                name: 'الحاله',
                options: {
                  filterOptions: {
                    names: ['مُوثق', 'غير مُوثق'],
                    logic(status, filters) {
                      if (filters[0] === 'مُوثق') {
                        return status !== true;
                      } else if (filters[0] === 'غير مُوثق') {
                        return status !== false;
                      }
                      return false;
                    },
                  },
                  filter: true,
                  customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                      <ClientStatus
                        status={tableMeta.rowData[6]}
                        clientName={tableMeta.rowData[1]}
                        uuid={tableMeta.rowData[0]}
                        onStateChange={() =>
                          dispatch({
                            type: VERIFY_CLIENT,
                            payload: { uuid: tableMeta.rowData[0] },
                          })
                        }
                      />
                    );
                  },
                },
              },
              {
                name: 'تاريخ الاضافه',
                options: {
                  filter: false,
                  customBodyRender: (value, tableMeta, updateValue) => {
                    const date = new Date(value);
                    return (
                      <p>{`${date.toLocaleString('en-GB', {
                        hour12: true,
                      })}`}</p>
                    );
                  },
                },
              },
            ]}
            options={{
              selectableRowsOnClick: true,
              selectableRows: 'single',
              responsive: 'scrollMaxHeight',
              filter: true,
              rowsPerPageOptions: [5, 10, 20],
              customToolbarSelect: (
                selectedRows,
                displayData,
                setSelectedRows,
              ) => {
                const selectedClientIndex = selectedRows.data[0].dataIndex;
                selectedClient.current = clients[selectedClientIndex];
                return (
                  <TableSelectedToolBar
                    onView={() => {
                      setRedirectTo(`${selectedClient.current[0]}`);
                      setRedirect(true);
                    }}
                    onUpdate={() =>
                      dispatch({ type: SET_UPDATE_DIALOG_OPEN, payload: true })
                    }
                  />
                );
              },
              ...tableLabels,
            }}
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
};

export default ClientsPage;
