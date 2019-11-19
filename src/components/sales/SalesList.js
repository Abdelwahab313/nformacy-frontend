import React, { useState } from 'react';
import { makeStyles, Slide } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MaterialTable from 'material-table';
import { table_localization } from '../../settings';
import { sales } from '../../data';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Button } from '@material-ui/core';
import { getSalesWithDate } from '../../apis/salesApi';
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
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});
const SalesList = (props) => {
  const classes = useStyles();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (
    <div className={classes.root} dir='rtl'>
      <Grid container className={classes.details}>
        <Grid item lg={7} md={8} xs={12}>
          <Paper>
            <label>تاريخ البدء</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
            <label>تاريخ الانتهاء</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
            />
            <Button onClick={getSalesWithDate} color='primary'>
              عرض
            </Button>
          </Paper>
          <Paper>
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
                { title: 'اسم العميل', field: 'client' },
                { title: 'اسم المندوب', field: 'rep' },
                { title: 'الحساب الكلي', field: 'value' },
                { title: 'التاريخ', field: 'date' },
              ]}
              data={sales}
              title={'المبيعات'}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default SalesList;
