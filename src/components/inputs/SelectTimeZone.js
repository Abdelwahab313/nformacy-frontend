import * as React from 'react';
import * as moment from 'moment-timezone';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import makeStyles from '@material-ui/core/styles/makeStyles';


const useStyles = makeStyles({
  option: {
    fontSize: 15,
    '& > span': {
      marginRight: 10,
      fontSize: 18,
    },
  },
});

const SelectTimeZone = ({
                          onChange,
                          defaultTimezoneName,
                          timezoneName,
                          ...rest
                        }) => {

  const handleChange = React.useCallback((event, newValue) => {

      onChange && onChange(newValue);
    },
    [onChange],
  );

  const options = React.useMemo(() => getTimeZoneOptions(), []);

  const defaultValue = React.useMemo(() => {
    if (defaultTimezoneName === undefined) {
      return undefined;
    }
    console.log('this is a ', defaultTimezoneName )
    return options.find((option) => option.value === defaultTimezoneName);
  }, [options, defaultTimezoneName]);

  const value = React.useMemo(() => {
    if (timezoneName === undefined) {
      return undefined;
    }
    return options.find((option) => option.value === timezoneName);
  }, [options, timezoneName]);

  const classes = useStyles();

  return (
    <Autocomplete
      id="time-zone-picker"
      key={timezoneName}
      {...rest}
      style={{ width: 300 }}
      options={options}
      classes={{ option: classes.option }}
      defaultValue={defaultValue}
      value={value}
      autoHighlight
      onChange={handleChange}
      getOptionLabel={(option) => option.label}
      renderInput={(params) => (
        <TextField
          {...params}
          label="TimeZone"
          variant="outlined"
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
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

      return ({
        label: `${tz} (GMT${tzOffset})`,
        value: tz,
        timezoneOffset,
      });
    });
    return timeZoneOptions;
  }
;
