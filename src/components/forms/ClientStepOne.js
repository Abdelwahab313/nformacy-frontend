import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ErrorMessage from '../errors/ErrorMessage';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import {
  radioStyle,
  sectionContainerStyles,
  useStyles,
  greyDividerStyle,
} from '../../styles/formsStyles';
import FormControl from '@material-ui/core/FormControl';
import 'react-phone-input-2/lib/bootstrap.css';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ReactTooltip from 'react-tooltip';
import { Grow } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import CustomTypography from 'components/typography/Typography';

const ClientStepOne = () => {
  const { errors, control } = useFormContext();
  const classes = useStyles();
  const { t } = useTranslation();
  const radiosStyles = radioStyle();

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
                    {t('accountType')}
                  </Typography>
                  <Controller
                    name='accountType'
                    as={
                      <RadioGroup row>
                        <Grid container>
                          <Grid item md={6}>
                            <FormControlLabel
                              value='corporate'
                              control={
                                <Radio
                                  id='corporateAccount'
                                  className={radiosStyles.root}
                                  color='default'
                                  checkedIcon={
                                    <span className={radiosStyles.checkedIcon} />
                                  }
                                  icon={<span className={radiosStyles.icon} />}
                                />
                              }
                              label={t('corporateAccount')}
                            />
                            <CustomTypography variant="subtitle2" className={classes.corporateDesc}>I'm representing an organization/team</CustomTypography>
                          </Grid>
                          <Grid item md={6}>
                            <FormControlLabel
                              value='individual'
                              control={
                                <Radio
                                  id='individualAccount'
                                  className={radiosStyles.root}
                                  color='default'
                                  checkedIcon={
                                    <span className={radiosStyles.checkedIcon} />
                                  }
                                  icon={<span className={radiosStyles.icon} />}
                                />
                              }
                              label={t('individualAccount')}
                            />
                            <CustomTypography variant="subtitle2" className={classes.corporateDesc}>I'm representing myself</CustomTypography>
                          </Grid>
                        </Grid>
                      </RadioGroup>
                    }
                    control={control}
                    rules={{ required: t('requiredMessage') }}
                  />
                  <ErrorMessage errorField={errors.accountType} />
                </FormControl>
              </Container>

              {/* <FieldsOfExperience /> */}

            </Container>
          </Paper>
        </Grid>
      </Grow>
    </Grid>
  );
};

export default ClientStepOne;
