import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import React, { useState } from 'react';
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
import countryList from 'react-select-country-list';
import 'react-phone-input-2/lib/bootstrap.css';
import ReactTooltip from 'react-tooltip';
import { Grow, TextField } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import CreatableSelect from 'react-select/creatable';
import { industries } from 'constants/dropDownOptions';

const CorporateStepOne = () => {
  const { control, user, register } = useFormContext();
  const [countries] = useState(countryList().getData());
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
                    {t('organizationName')}
                  </Typography>
                </div>
                <TextField
                  fullWidth
                  variant='outlined'
                  id={'jobTitle-field'}
                  InputProps={{
                    classes: {
                      notchedOutline: classes.registerTextField,
                    },
                  }}
                  inputRef={register({ required: t('requiredMessage') })}
                />
              </Container>

              <Container maxWidth={false} className={classes.formControl}>
                <div className={classes.formHeader}>
                  <Typography
                    gutterBottom
                    className={classes.fieldLabelStylesDesktop}>
                    {t('organizationLocation')}
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
              </Container>

              <Container maxWidth={false} className={classes.formControl}>
                <div className={classes.formHeader}>
                  <Typography gutterBottom className={classes.fieldLabelStylesDesktop}>
                    {t('corporateIndustryOfExperience')}
                  </Typography>
                  <HelpIcon
                    className={classes.formHeaderIcon}
                    data-tip={t('industryOfExperienceHint')}
                    color='primary'
                    fontSize='small'
                  />
                </div>
                <Controller
                  name='industriesOfExperience'
                  id='industriesOfExperience'
                  rules={{ required: t['requiredMessage'] }}
                  control={control}
                  as={
                    <CreatableSelect
                      defaultValue={
                        !!user.current.industriesOfExperience
                          ? user.current.industriesOfExperience.map((userIndustry) => {
                            return industries.find(
                              (industry) => userIndustry === industry.value,
                            );
                          })
                          : []
                      }
                      styles={selectStyle}
                      isMulti
                      options={industries}
                    />
                  }
                />
              </Container>

              <Container maxWidth={false} className={classes.formControl}>
                <div className={classes.formHeader}>
                  <Typography
                    gutterBottom
                    className={classes.fieldLabelStylesDesktop}>
                    {t('contactPersonName')}
                  </Typography>
                </div>
                <TextField
                  fullWidth
                  variant='outlined'
                  id={'contactPersonName-field'}
                  InputProps={{
                    classes: {
                      notchedOutline: classes.registerTextField,
                    },
                  }}
                  inputRef={register({ required: t('requiredMessage') })}
                />
              </Container>

              <Container maxWidth={false} className={classes.formControl}>
                <div className={classes.formHeader}>
                  <Typography
                    gutterBottom
                    className={classes.fieldLabelStylesDesktop}>
                    {t('contactPersonJobTitle')}
                  </Typography>
                </div>
                <TextField
                  fullWidth
                  variant='outlined'
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
    </Grid>
  );
};
export default CorporateStepOne;
