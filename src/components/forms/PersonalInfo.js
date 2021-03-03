import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ErrorMessage from '../errors/ErrorMessage';
import React, { useState, Fragment } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import {
  dividerStyle,
  radioStyle,
  sectionContainerStyles,
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
import { darkBlue, lightGrey } from '../../styles/colors';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ReactTooltip from 'react-tooltip';
import IconTint from 'react-icon-tint';
import Hidden from '@material-ui/core/Hidden';
import t from '../../locales/en/freelancerProfile.json';
import authManager from 'services/authManager';
import FieldsOfExperience from './FieldsOfExpereience';

const PersonalInfo = () => {
  const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
  const { errors, control, user } = useFormContext();
  const [countries] = useState(countryList().getData());
  const classes = useStyles();
  const radiosStyles = radioStyle();

  const isClient = authManager.isClient();

  return (
    <Container style={sectionContainerStyles}>
      <ReactTooltip globalEventOff={'click'} />
      <Grid container alignItems='center'>
        <Grid item xs>
          <Typography gutterBottom className={classes.sectionHeaderStyles}>
            {t['personalInfo']}
          </Typography>
        </Grid>
      </Grid>
      <Divider variant='middle' style={dividerStyle} />
      <Container maxWidth={false} className={classes.formControl}>
        <FormControl fullWidth className={classes.formControl}>
          <Typography gutterBottom className={classes.fieldLabelStylesDesktop}>
            {t['gender']}
          </Typography>
          <Controller
            name='gender'
            as={
              <RadioGroup row>
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
                  label={t['male']}
                  defaultValue={user?.current?.gender}
                />
                <Hidden mdDown>
                  <div className={classes.maleFemaleIcon}>
                    <IconTint
                      color={darkBlue}
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
                  label={t['female']}
                />
              </RadioGroup>
            }
            control={control}
            rules={{ required: t['requiredMessage'] }}
          />
          <ErrorMessage errorField={errors.gender} />
        </FormControl>
      </Container>
      <Container maxWidth={false} className={classes.formControl}>
        <div className={classes.formHeader}>
          <Typography gutterBottom className={classes.fieldLabelStylesDesktop}>
            {t['country']}
          </Typography>
          <HelpIcon
            className={classes.formHeaderIcon}
            data-tip={t['selectCountryOfResidenceMessage']}
            color='primary'
            fontSize='small'
          />
        </div>
        <FormControl fullWidth id='country-select'>
          <Controller
            name='country'
            rules={{ required: t['requiredMessage'] }}
            control={control}
            defaultValue={!user.current.country && 0}
            as={
              <ReactSelectMaterialUi
                fullWidth={true}
                placeholder={t['selectCountryMessage']}
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
      {!isClient && (
        <Fragment>
          <Container maxWidth={false} className={classes.formControl}>
            <Typography gutterBottom className={classes.fieldLabelStylesDesktop}>
              {t['mobileNumber']}
            </Typography>
            <Controller
              as={
                <PhoneInput
                  preferredCountries={['jo', 'eg']}
                  inputStyle={{ width: '100%', borderColor: lightGrey }}
                  inputProps={{
                    id: 'mobile_number',
                    name: 'mobile_number',
                    required: t['requiredMessage'],
                  }}
                  enableSearch
                  placeholder='Mobile Number'
                />
              }
              name='mobileNumber'
              rules={{
                validate: (value) => {
                  try {
                    const number = phoneUtil.parse('+' + value);
                    return (
                      phoneUtil.isValidNumber(number) || t['invalidPhoneMessage']
                    );
                  } catch (e) {
                    return t['invalidPhoneMessage'];
                  }
                },
              }}
              control={control}
              error={!!errors.mobileNumber}
            />
            <ErrorMessage errorField={errors.mobileNumber} />
          </Container>
          <Container maxWidth={false} className={classes.formControl}>
            <Typography gutterBottom className={classes.fieldLabelStylesDesktop}>
              {t['currentEmploymentStatus']}
            </Typography>
            <FormControl
              id='currentEmploymentStatus'
              className={classes.formControl}
              fullWidth>
              <Controller
                name='currentEmploymentStatus'
                rules={{ required: t['requiredMessage'] }}
                control={control}
                defaultValue={user.current.currentEmploymentStatus}
                as={
                  <ReactSelectMaterialUi
                    fullWidth
                    id='employmentStatus'
                    placeholder={t['currentEmploymentStatus']}
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
        </Fragment>
      )}
      {!!isClient && (
        <FieldsOfExperience />
      )}
    </Container>
  );
};

export default PersonalInfo;
