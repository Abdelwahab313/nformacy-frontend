import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ErrorMessage from '../errors/ErrorMessage';
import React, { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import {
  dividerStyle,
  radioStyle,
  selectStyle,
  useStyles,
} from '../../styles/formsStyles';
import FormControl from '@material-ui/core/FormControl';
import ReactSelectMaterialUi from 'react-select-material-ui';
import { employmentStatus } from '../../constants/dropDownOptions';
import HelpIcon from '@material-ui/icons/Help';
import countryList from 'react-select-country-list';
import 'react-phone-input-2/lib/bootstrap.css';
import PhoneInput from 'react-phone-input-2';
import { pink } from '../../styles/colors';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ReactTooltip from 'react-tooltip';
import IconTint from 'react-icon-tint';
import Hidden from '@material-ui/core/Hidden';

const PersonalInfo = () => {
  const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
  const { errors, control, user } = useFormContext();
  const [countries] = useState(countryList().getData());
  const classes = useStyles();
  const radiosStyles = radioStyle();

  return (
    <Paper className={classes.paperSection} elevation={3}>
      <Container>
        <ReactTooltip globalEventOff={'click'} />
        <Grid container alignItems='center'>
          <Grid item xs>
            <Typography gutterBottom variant='h4'>
              Personal info
            </Typography>
          </Grid>
        </Grid>
        <Divider variant='middle' style={dividerStyle} />
        <Container maxWidth={false} className={classes.formControl}>
          <FormControl fullWidth className={classes.formControl}>
            <Typography gutterBottom variant='subtitle2'>
              Gender
            </Typography>
            <Controller
              name='gender'
              as={
                <RadioGroup row horizontal>
                  <FormControlLabel
                    value='M'
                    control={
                      <Radio
                        id='maleRadio'
                        className={radiosStyles.root}
                        color='default'
                        checkedIcon={
                          <span className={radiosStyles.checkedIcon} />
                        }
                        icon={<span className={radiosStyles.icon} />}
                      />
                    }
                    label='Male'
                    defaultValue={user?.current?.gender}
                  />
                  <Hidden mdDown>
                    <div className={classes.maleFemaleIcon}>
                      <IconTint
                        color={pink}
                        src={require('../../assets/maleFemale.png')}
                      />
                    </div>
                  </Hidden>
                  <FormControlLabel
                    value='F'
                    control={
                      <Radio
                        id='femaleRadio'
                        className={radiosStyles.root}
                        color='default'
                        checkedIcon={
                          <span className={radiosStyles.checkedIcon} />
                        }
                        icon={<span className={radiosStyles.icon} />}
                      />
                    }
                    label='Female'
                  />
                </RadioGroup>
              }
              control={control}
              rules={{ required: 'This field is required' }}
            />
            <ErrorMessage errorField={errors.gender} />
          </FormControl>
        </Container>
        <Container maxWidth={false} className={classes.formControl}>
          <div className={classes.formHeader}>
            <Typography gutterBottom variant='subtitle2'>
              Country
            </Typography>
            <HelpIcon
              className={classes.formHeaderIcon}
              data-tip='Select your country of residence'
              color='primary'
              fontSize='small'
            />
          </div>
          <FormControl fullWidth id='country-select'>
            <Controller
              name='country'
              rules={{ required: 'This field is required' }}
              control={control}
              defaultValue={!user.current.country && 0}
              as={
                <ReactSelectMaterialUi
                  fullWidth={true}
                  placeholder='Select your country'
                  SelectProps={{
                    styles: selectStyle,
                  }}
                  options={countries}
                />
              }
            />
          </FormControl>

          <ErrorMessage errorField={errors.country} />
        </Container>
        <Container maxWidth={false} className={classes.formControl}>
          <Typography gutterBottom variant='subtitle2'>
            Mobile Number
          </Typography>
          <Controller
            as={
              <PhoneInput
                preferredCountries={['jo', 'eg']}
                inputStyle={{ width: '100%', borderColor: pink }}
                inputProps={{
                  id: 'mobile_number',
                  name: 'mobile_number',
                  required: true,
                }}
                enableSearch
              />
            }
            name='mobileNumber'
            rules={{
              validate: (value) => {
                try {
                  const number = phoneUtil.parse('+' + value);
                  return (
                    phoneUtil.isValidNumber(number) ||
                    'Invalid Phone Number format'
                  );
                } catch (e) {
                  return 'Invalid Phone Number format';
                }
              },
            }}
            control={control}
            error={!!errors.mobileNumber}
          />
          <ErrorMessage errorField={errors.mobileNumber} />
        </Container>
        <Container maxWidth={false} className={classes.formControl}>
          <Typography gutterBottom variant='subtitle2'>
            Current Employment Status
          </Typography>
          <FormControl
            id='currentEmploymentStatus'
            className={classes.formControl}
            fullWidth>
            <Controller
              name='currentEmploymentStatus'
              rules={{ required: 'This field is required' }}
              control={control}
              defaultValue={!user.current.currentEmploymentStatus && 0}
              as={
                <ReactSelectMaterialUi
                  fullWidth
                  id='employmentStatus'
                  placeholder='Current Employment Status'
                  SelectProps={{
                    styles: selectStyle,
                  }}
                  options={employmentStatus}
                />
              }
            />
            <ErrorMessage errorField={errors.currentEmploymentStatus} />
          </FormControl>
        </Container>
      </Container>
    </Paper>
  );
};

export default PersonalInfo;
