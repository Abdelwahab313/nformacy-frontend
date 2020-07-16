import Box from '@material-ui/core/Box';
import { DatePicker, KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Grid } from '@material-ui/core';
import t from '../../locales/en/freelancerProfile.json';
import * as PropTypes from 'prop-types';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';


const AvailableTimeRangeForm = ({ dateRange, timeRange, onSubmitRange }) => {

  const { control, watch, handleSubmit, errors } = useForm({ defaultValues: { dateRange, timeRange } });

  return (<Box>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container spacing={2}>
        <Grid item xs>
          <Controller
            name={'dateRange[from]'}
            control={control}
            rules={{ required: t['requiredMessage'] }}
            value={dateRange.from}
            as={
              <KeyboardDatePicker
                disableToolbar
                autoOk
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="start-date-range-picker"
                label={t['startDate']}
                // minDate={
                //   new Date(watchExperiences[index].startDate)
                // }
                // maxDate={Date.now()}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            }
          />
        </Grid>
        <Grid item xs>
          <Controller
            name={'dateRange[to]'}
            control={control}
            rules={{ required: t['requiredMessage'] }}
            value={dateRange.to}
            as={
              <KeyboardDatePicker
                disableToolbar
                autoOk
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="end-date-range-picker"
                label={t['endDate']}
                minDate={
                  new Date(watch('dateRange[from]'))
                }
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            }
          />
        </Grid>
      </Grid>
    </MuiPickersUtilsProvider>
  </Box>);
};

AvailableTimeRangeForm.propTypes = {
  dateRange: PropTypes.shape({
    from: PropTypes.instanceOf(Date),
    to: PropTypes.instanceOf(Date),
  }),
  timeRange: PropTypes.shape({
    from: PropTypes.instanceOf(Date),
    to: PropTypes.instanceOf(Date),
  }),
  onSubmitRange: PropTypes.func,
};

export default AvailableTimeRangeForm;
