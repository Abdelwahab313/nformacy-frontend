import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ErrorMessage from '../errors/ErrorMessage';
import React from 'react';
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

const ClientStepTwo = () => {
  const { errors, control, register } = useFormContext();
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Grid
      id='stepTwoForm'
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
                    {t('organizationalLevel')}
                  </Typography>
                  <HelpIcon
                    className={classes.formHeaderIcon}
                    data-tip={t('selectYourOrganizationalLevel')}
                    color='primary'
                    fontSize='small'
                  />
                </div>
                <FormControl fullWidth id='organizational-select'>
                  <Controller
                    name='organizationLevel'
                    rules={{ required: t('requiredMessage') }}
                    control={control}
                    defaultValue={0}
                    // defaultValue={!user.current.country && 0}
                    as={
                      <ReactSelectMaterialUi
                        fullWidth={true}
                        name='organizationLevel'
                        placeholder={t('selectYourOrganizationalLevel')}
                        SelectProps={{
                          styles: selectStyle,
                        }}
                        options={organizationalLevel}
                      />
                    }
                  />
                </FormControl>

                <ErrorMessage errorField={errors.country} />
              </Container>
            </Container>
            {/* <ClientWorkExperience/> */}
            <Container maxWidth={false} className={classes.formControl}>
              <TextField
                fullWidth
                label={t('jobTitle')}
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
            <Container maxWidth={false} className={classes.formControl}>
              <TextField
                fullWidth
                label={t('company')}
                variant='outlined'
                name={'company'}
                id={'work-experience-company-0'}
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

export default ClientStepTwo;
