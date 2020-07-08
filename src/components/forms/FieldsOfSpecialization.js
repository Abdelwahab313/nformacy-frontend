import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import FieldsOfExperience from '../../EditProfile/FieldsOfExpereience';
import HelpIcon from '@material-ui/icons/Help';
import { Controller, useFormContext } from 'react-hook-form';
import CreatableSelect from 'react-select/creatable/dist/react-select.esm';
import { industries } from '../../constants/dropDownOptions';
import ErrorMessage from '../errors/ErrorMessage';
import React, { Fragment } from 'react';
import { dividerStyle, sectionContainerStyles, selectStyle, useStyles } from '../../styles/formsStyles';
import ReactTooltip from 'react-tooltip';
import t from '../../locales/en/freelancerProfile.json';
import AssignmentPreferences from './AssignmentPreferences';

function FieldsOfSpecialization() {
  const { errors, control, user } = useFormContext();
  const classes = useStyles();

  return (
    <Paper className={classes.paperSection} elevation={5}>
      <Container style={sectionContainerStyles}>
        <Grid container alignItems='center'>
          <Grid item xs>
            <Typography gutterBottom className={classes.sectionHeaderStyles}>
              {t['fieldsOfSpecialization']}
            </Typography>
          </Grid>
        </Grid>
        <Divider variant='middle' style={dividerStyle} />
        <ReactTooltip globalEventOff={'click'} />
        <FieldsOfExperience user={user.current} />
        <Container maxWidth={false} className={classes.formControl}>
          <div className={classes.formHeader}>
            <Typography gutterBottom className={classes.fieldLabelStylesDesktop}>
              {t['industryOfExperience']}
            </Typography>
            <HelpIcon
              className={classes.formHeaderIcon}
              data-tip={t['industryOfExperienceHint']}
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
                    ? user.current.industriesOfExperience.map(
                        (userIndustry) => {
                          return industries.find(
                            (industry) => userIndustry === industry.value,
                          );
                        },
                      )
                    : []
                }
                styles={selectStyle}
                isMulti
                options={industries}
              />
            }
          />
          <ErrorMessage errorField={errors.industriesOfExperience} />
        </Container>
        <AssignmentPreferences/>
      </Container>
    </Paper>
  );
}

export default FieldsOfSpecialization;
