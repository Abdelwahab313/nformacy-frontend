import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ErrorMessage from '../errors/ErrorMessage';
import React, { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import {
  radioStyle,
  sectionContainerStyles,
  selectStyle,
  useStyles,
  greyDividerStyle,
  checkboxStyle,
} from '../../styles/formsStyles';
import FormControl from '@material-ui/core/FormControl';
import ReactSelectMaterialUi from 'react-select-material-ui';
import HelpIcon from '@material-ui/icons/Help';
import countryList from 'react-select-country-list';
import 'react-phone-input-2/lib/bootstrap.css';
import { darkBlue } from '../../styles/colors';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ReactTooltip from 'react-tooltip';
import IconTint from 'react-icon-tint';
import Hidden from '@material-ui/core/Hidden';
import FieldsOfExperience from './FieldsOfExpereience';
import { Checkbox, Grow } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const ClientStepOne = () => {
  const { errors, control, user } = useFormContext();
  const [countries] = useState(countryList().getData());
  const classes = useStyles();
  const { t } = useTranslation();
  const radiosStyles = radioStyle();

  return (
    <Grid
      id='stepOneForm'
      container
      direction='row'
      justify='center'
      alignItems='center'
      spacing={5}>
      <Grow in={true} timeout={3500}>
        <Grid item xs={12} sm={7} lg={5}>
          <Paper className={classes.paperSection} elevation={3}>
            <Container style={sectionContainerStyles}>
              <ReactTooltip globalEventOff={'click'} />
              <Grid container alignItems='center'>
                <Grid item xs>
                  <Typography
                    gutterBottom
                    className={classes.sectionHeaderStyles}>
                    {t('personalInfo')}
                  </Typography>
                </Grid>
              </Grid>
              <Divider variant='middle' style={greyDividerStyle} />
              <Container maxWidth={false} className={classes.formControl}>
                <FormControl fullWidth className={classes.formControl}>
                  <Typography
                    gutterBottom
                    className={classes.fieldLabelStylesDesktop}>
                    {t('gender')}
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
                          label={t('male')}
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
                          label={t('female')}
                        />
                      </RadioGroup>
                    }
                    control={control}
                    rules={{ required: t('requiredMessage') }}
                  />
                  <ErrorMessage errorField={errors.gender} />
                </FormControl>
              </Container>
              <Container maxWidth={false} className={classes.formControl}>
                <div className={classes.formHeader}>
                  <Typography
                    gutterBottom
                    className={classes.fieldLabelStylesDesktop}>
                    {t('country')}
                  </Typography>
                  <HelpIcon
                    className={classes.formHeaderIcon}
                    data-tip={t('selectCountryOfResidenceMessage')}
                    color='primary'
                    fontSize='small'
                  />
                </div>
                <FormControl fullWidth id='country-select'>
                  <Controller
                    name='country'
                    rules={{ required: t('requiredMessage') }}
                    control={control}
                    defaultValue={!user.current.country && 0}
                    as={
                      <ReactSelectMaterialUi
                        fullWidth={true}
                        placeholder={t('selectCountryMessage')}
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
              <FieldsOfExperience />

              <Container maxWidth={false} className={classes.formControl}>
                <FormControl fullWidth id='country-select'>
                  <Controller
                    name={'isEmployed'}
                    valueName='checked'
                    defaultValue={false}
                    type='checkbox'
                    control={control}
                    as={
                      <FormControlLabel
                        control={
                          <Checkbox
                            id={'isEmployed-field'}
                            style={checkboxStyle}
                          />
                        }
                        label={t('isEmployed')}
                      />
                    }
                  />
                </FormControl>
                <ErrorMessage errorField={errors.country} />
              </Container>
            </Container>
          </Paper>
        </Grid>
      </Grow>
    </Grid>
  );
};

export default ClientStepOne;
