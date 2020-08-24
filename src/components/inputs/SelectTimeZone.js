import * as React from 'react';
import * as moment from 'moment-timezone';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useState } from 'react';

const useStyles = makeStyles({
  option: {
    fontSize: 15,
    '& > span': {
      marginRight: 10,
      fontSize: 18,
    },
  },
});

const SelectTimeZone = ({ onChange, defaultTimezoneName, ...rest }) => {
  const options = React.useMemo(() => getTimeZoneOptions(), []);
  const [timeZoneName, setTimeZoneName] = useState(
    options.find((option) => option.value === defaultTimezoneName),
  );
  const handleChange = React.useCallback(
    (event, newTimeZone) => {
      let timeZone;
      if (!newTimeZone) {
        onChange && onChange(defaultTimezoneName);
        timeZone = options.find((option) => option.value === defaultTimezoneName);
      } else {
        !!newTimeZone && onChange && onChange(newTimeZone.value);
        timeZone = newTimeZone;
      }
      setTimeZoneName(timeZone);
    },
    [onChange],
  );

  const defaultValue = React.useMemo(() => {
    if (defaultTimezoneName === undefined) {
      return undefined;
    }
    console.log('this is a ', defaultTimezoneName);
    return options.find((option) => option.value === defaultTimezoneName);
  }, [options, defaultTimezoneName]);

  const classes = useStyles();

  return (
    <Autocomplete
      id='time-zone-picker'
      {...rest}
      style={{ width: 300 }}
      options={options}
      classes={{ option: classes.option }}
      defaultValue={defaultValue}
      value={timeZoneName}
      autoHighlight
      onChange={handleChange}
      getOptionLabel={(option) => option.label}
      renderInput={(params) => (
        <TextField
          {...params}
          label='TimeZone'
          variant='outlined'
          inputProps={{
            ...params.inputProps,
          }}
        />
      )}
    />
  );
};

export default SelectTimeZone;

export const getTimeZoneOptions = () => {
  const timeZones = moment.tz.names();

  const timeZoneOptions = timeZones.map((tz) => {
    const tzOffset = moment.tz(tz).format('Z');
    const timezoneOffset = parseInt(
      tzOffset
        .replace(':00', '.00')
        .replace(':15', '.25')
        .replace(':30', '.50')
        .replace(':45', '.75'),
    ).toFixed(2);

    return {
      label: `${tz} (GMT${tzOffset})`,
      value: tz,
      timezoneOffset,
    };
  });
  return timeZoneOptions;
};
