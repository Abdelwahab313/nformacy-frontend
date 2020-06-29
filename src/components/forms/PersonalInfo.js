import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import ErrorMessage from '../errors/ErrorMessage';
import React, { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import useStyles from '../../styles/formsStyles';
import FormControl from '@material-ui/core/FormControl';
import ReactSelectMaterialUi from 'react-select-material-ui';
import { employmentStatus, gender } from '../../constants/dropDownOptions';
import HelpIcon from '@material-ui/icons/Help';
import countryList from 'react-select-country-list';
import 'react-phone-input-2/lib/bootstrap.css';
import PhoneInput from 'react-phone-input-2';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const PersonalInfo = () => {
  const { errors, control, user } = useFormContext();
  const [countries] = useState(countryList().getData());
  const classes = useStyles();

  return (
    <Paper className={classes.paperSection} elevation={5}>
      <Container>
        <Grid container alignItems='center'>
          <Grid item xs>
            <Typography gutterBottom variant='h4'>
              Personal info
            </Typography>
          </Grid>
        </Grid>
        <Divider variant='middle' />
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
                    control={<Radio id='maleRadio' />}
                    label='Male'
                    defaultValue={user?.gender}
                  />
                  <img
                    className={classes.maleFemaleIcon}
                    src={require('../../assets/male-female.png')}
                    width={50}
                  />
                  <FormControlLabel
                    value='F'
                    control={<Radio id='femaleRadio' />}
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
              defaultValue={!user.country && 0}
              as={
                <ReactSelectMaterialUi
                  fullWidth={true}
                  placeholder='Select your country'
                  SelectProps={{
                    styles: {
                      menu: (provided) => ({ ...provided, zIndex: 9999 }),
                    },
                    variant: 'outlined',
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
                inputStyle={{ width: '100%' }}
                inputProps={{
                  id: 'mobile_number',
                  name: 'mobile_number',
                  required: true,
                }}
                enableSearch
              />
            }
            name='mobileNumber'
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
              defaultValue={!user.currentEmploymentStatus && 0}
              as={
                <ReactSelectMaterialUi
                  fullWidth
                  id='employmentStatus'
                  placeholder='Current Employment Status'
                  SelectProps={{
                    styles: {
                      menu: (provided) => ({
                        ...provided,
                        zIndex: 9999,
                      }),
                    },
                    variant: 'outlined',
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
