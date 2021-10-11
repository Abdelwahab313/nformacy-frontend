import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ErrorMessage from '../errors/ErrorMessage';
import React, { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import {
  dividerStyle,
  sectionContainerStyles,
  selectStyle,
  useStyles,
} from '../../styles/formsStyles';
import FormControl from '@material-ui/core/FormControl';
import ReactSelectMaterialUi from 'react-select-material-ui';
import HelpIcon from '@material-ui/icons/Help';
import 'react-phone-input-2/lib/bootstrap.css';
import ReactTooltip from 'react-tooltip';
import { Grow, TextField } from '@material-ui/core';
import { organizationalLevel } from '../../constants/dropDownOptions';
import { useTranslation } from 'react-i18next';
import countryList from 'react-select-country-list';
import { addUserRole } from 'apis/userAPI';
import authManager from 'services/authManager';
import { useSnackBar } from 'context/SnackBarContext';


const ClientStepOne = () => {
  const { errors, control, register, user } = useFormContext();
  const classes = useStyles();
  const { t } = useTranslation();
  const [countries] = useState(countryList().getData());

  const { showErrorMessage } = useSnackBar();

  useEffect(() => {
    addUserRole('client').then((response) => {
      authManager.updateUser(response.data);
    })
      .catch((reason) => {
        if (reason.response) {
          showErrorMessage(reason.response.errors);
        }
      });
  }, []);

  return (
    <Grid
      id='stepOneForm'
      container
      direction='row'
      justify='center'
      alignItems='center'>
      <Grow in={true} timeout={1000}>
        <Grid item xs={12} sm={6} lg={6}>
          <Paper className={classes.paperSection} elevation={3}>
            <Container style={sectionContainerStyles}>
              <ReactTooltip globalEventOff={'click'} />
              <Grid container alignItems='center'>
                <Grid item xs>
                  <Typography
                    gutterBottom
                    className={classes.sectionHeaderStyles}>
                    {t('workExperience')}
                  </Typography>
                </Grid>
              </Grid>
              <Divider variant='middle' style={dividerStyle} />

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

              <Container maxWidth={false} className={classes.formControl}>
                <div className={classes.formHeader}>
                  <Typography
                    gutterBottom
                    className={classes.fieldLabelStylesDesktop}>
                    {t('myCurrentJobLevel')}
                  </Typography>
                  <HelpIcon
                    className={classes.formHeaderIcon}
                    data-tip={t('selectYourLevel')}
                    color='primary'
                    fontSize='small'
                  />
                </div>
                <FormControl fullWidth id='organizational-select'>
                  <Controller
                    name='organizationLevel'
                    rules={{ required: false }}
                    control={control}
                    defaultValue={!user.current.organizationLevel && ''}
                    as={
                      <ReactSelectMaterialUi
                        fullWidth={true}
                        name='organizationLevel'
                        placeholder={t('selectYourLevel')}
                        SelectProps={{
                          styles: selectStyle,
                        }}
                        options={organizationalLevel}
                      />
                    }
                  />
                </FormControl>
              </Container>

            </Container>

            <Container maxWidth={false} className={classes.formControl}>
              <TextField
                fullWidth
                label={t('myOrganizationName')}
                variant='outlined'
                name={'organizationName'}
                id={'organizationName'}
                InputProps={{
                  classes: {
                    notchedOutline: classes.registerTextField,
                  },
                }}
                inputRef={register({ required: t('requiredMessage') })}
              />
              <ErrorMessage
                errorField={errors.experiences && errors.experiences[0]?.title}
              />
            </Container>

            <Container maxWidth={false} className={classes.formControl}>
              <TextField
                fullWidth
                label={t('myCurrentJobTitle')}
                name={'jobTitle'}
                variant='outlined'
                id={'jobTitle-field'}
                InputProps={{
                  classes: {
                    notchedOutline: classes.registerTextField,
                  },
                }}
                inputRef={register({ required: t('requiredMessage') })}
              />
              <ErrorMessage
                errorField={errors.experiences && errors.experiences[0]?.title}
              />
            </Container>
          </Paper>
        </Grid>
      </Grow>
    </Grid>
  );
};

export default ClientStepOne;
