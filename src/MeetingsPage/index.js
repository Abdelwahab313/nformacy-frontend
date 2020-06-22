import React, { useRef, useState } from 'react';
import {
  AppBar,
  Button,
  Dialog,
  Grid,
  IconButton,
  Slide,
  Toolbar,
  Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import CircularProgress from '@material-ui/core/CircularProgress';
import MUIDataTable from 'mui-datatables';
import ErrorDialog from '../components/errors/ErrorDialog';
import useSalesRepsStyle from './styles/salesRepsPage';

import { tableLabels } from '../constants/tableLocalization';
import useMeetingsFetcher from './useMeetingFetcher';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const MeetingsPage = () => {
  const classes = useSalesRepsStyle();

  const { isLoading, fetchedMeetings, errorMessage } = useMeetingsFetcher();

  let selectedSalesRep = useRef(undefined);

  if (isLoading) {
    return (
      <div className={classes.progressContainer}>
        <CircularProgress />
      </div>
    );
  } else {
    return (
      <div className={classes.root}>
        {/* {!!errorMessage && (
          <ErrorDialog
            message={errorMessage}
            close={() => {}}
          />
        )} */}
        <Grid className={classes.tableContainer}>
          <Button
            className={classes.addButton}
            variant='contained'
            id={'add-sales-rep-button'}
            onClick={() => {}}
            color='primary'>
            اضافه موظف جديد
          </Button>
          <MUIDataTable
            title={'المستخدمين'}
            data={fetchedMeetings}
            columns={[
              {
                name: 'id',
                options: {
                  filter: false,
                  display: 'excluded',
                },
              },
              {
                name: 'first_name',
                options: {
                  filter: false,
                  display: 'excluded',
                },
              },
              {
                name: 'last_name',
                options: {
                  filter: false,
                  display: 'excluded',
                },
              },
              {
                name: 'أسم المستخدم',
                options: {
                  filter: false,
                },
              },
              {
                name: 'رقم الموبايل',
                options: {
                  filter: false,
                },
              },
              {
                name: 'رقم البطاقه',
                options: {
                  filter: false,
                },
              },
              {
                name: 'اسم تسجيل الدخول',
                options: {
                  filter: false,
                },
              },
            ]}
            options={{
              selectableRowsOnClick: true,
              selectableRows: 'single',
              responsive: 'scrollMaxHeight',
              filter: false,
              rowsPerPageOptions: [5, 10, 20],
              ...tableLabels,
            }}
          />
        </Grid>

        <Dialog
          fullScreen
          open={false}
          TransitionComponent={Transition}
          id={'add-user-dialog'}>
          <AppBar>
            <Toolbar className={classes.toolBar}>
              <IconButton
                edge='start'
                onClick={
                  () => {}
                  // dispatch({ type: SET_UPDATE_DIALOG_OPEN, payload: false })
                }
                aria-label='close'>
                <CloseIcon />
              </IconButton>
              <Typography>تعديل موظف</Typography>
            </Toolbar>
          </AppBar>
        </Dialog>
      </div>
    );
  }
};

export default MeetingsPage;
