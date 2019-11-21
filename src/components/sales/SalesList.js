import React, { useEffect, useState } from 'react';
import { Button, makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MaterialTable, { MTableToolbar } from 'material-table';
import { table_localization } from '../../settings';
import { sales } from '../../data';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { fetchSales, getSalesWithDate } from '../../apis/salesApi';
import { useAuth } from '../../context/auth';
import ErrorDialog from '../errors/ErrorDialog';
import { fetchClient } from '../../apis/clientsApi';
import { fetchUser } from '../../apis/usersApi';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  root: {
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
  tableContainer: {
    width: '85%',
    margin: theme.spacing(1),
  },
}));
const SalesList = (props) => {
  const [sales, setSales] = useState([]);
  const [users, setUsers] = useState([]);
  const { authTokens, setAuthTokens } = useAuth();
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const [allSales, setAllSales] = useState([]);
  const classes = useStyles();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
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
        setAllSales(fetchedSales);
      })
      .catch((reason) => {
        if (reason.message === 'Network Error') {
          setErrorMessage('حدث خطأ أثناء الاتصال بالخادم');
          setShowError(true);
        } else if (reason.response.status === 401) {
          localStorage.removeItem('tokens');
          localStorage.removeItem('sales');
          setAuthTokens();
        }
      })
      .finally((res) => {});
  }, []);

  function handleOnFilterClick() {
    let formattedStartDate = moment(startDate).format('YYYY/MM/DD HH:MM:SSZ');
    let formattedEndDate = moment(endDate).format('YYYY/MM/DD HH:MM:SSZ');
    getSalesWithDate(formattedStartDate, formattedEndDate, authTokens).then(
      (res) => {
        let fetchedFilteredSales = res.data;
        let filteredSales = allSales.filter(function(element) {
          return this.find((elem) => element['uuid'] === elem['uuid']);
        }, fetchedFilteredSales);
        setSales(filteredSales);
      },
    );
  }

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
      <Grid className={classes.tableContainer}>
        <MaterialTable
          id={'salesList'}
          localization={table_localization('مبيعات')}
          actions={[
            {
              icon: 'help',
              tooltip: 'تفاصيل المبيعات',
              iconProps: {
                color: 'primary',
              },
            },
          ]}
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
                    <label>تاريخ البدء</label>
                    <DatePicker
                      showTimeSelect
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                    />
                    <label>تاريخ الانتهاء</label>
                    <DatePicker
                      style={{ borderRadius: 7, padding: 6, fontSize: 13 }}
                      showTimeSelect
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                    />
                    <Button
                      size='small'
                      variant='contained'
                      onClick={handleOnFilterClick}
                      color='primary'>
                      عرض النتايج
                    </Button>
                  </Grid>
                </div>
                <MTableToolbar {...props} />
              </Grid>
            ),
          }}
        />
      </Grid>
    </div>
  );
};

export default SalesList;
