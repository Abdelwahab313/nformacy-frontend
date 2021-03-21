import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import {
  sectionContainerStyles,
  selectStyle,
  useStyles,
  greyDividerStyle,
} from '../../styles/formsStyles';
import FormControl from '@material-ui/core/FormControl';
import ReactSelectMaterialUi from 'react-select-material-ui';
import HelpIcon from '@material-ui/icons/Help';
import 'react-phone-input-2/lib/bootstrap.css';
import ReactTooltip from 'react-tooltip';
import { Grow, TextField } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { corporateOrganizationalLevel } from 'constants/dropDownOptions';

const CorporateStepTwo = () => {
  const { control, user, register } = useFormContext();
  const classes = useStyles();
  const { t } = useTranslation();
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
                    {t('organizationInfo')}
                  </Typography>
                </Grid>
              </Grid>
              <Divider variant='middle' style={greyDividerStyle} />

              <Container maxWidth={false} className={classes.formControl}>
                <div className={classes.formHeader}>
                  <Typography
                    gutterBottom
                    className={classes.fieldLabelStylesDesktop}>
                    {t('currentJobLevel')}
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
                        options={corporateOrganizationalLevel}
                      />
                    }
                  />
                </FormControl>
              </Container>

              <Container maxWidth={false} className={classes.formControl}>
                <div className={classes.formHeader}>
                  <Typography
                    gutterBottom
                    className={classes.fieldLabelStylesDesktop}>
                    {t('jobTitle')}
                  </Typography>
                </div>
                <TextField
                  fullWidth
                  name='jobTitle'
                  variant='outlined'
                  placeholder={t('contactPersonJobTitle')}
                  id={'contactPersonJobTitle-field'}
                  InputProps={{
                    classes: {
                      notchedOutline: classes.registerTextField,
                    },
                  }}
                  inputRef={register({ required: t('requiredMessage') })}
                />
              </Container>

            </Container>
          </Paper>
        </Grid>
      </Grow>
    </Grid >
  );
};
export default CorporateStepTwo;
