import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import HelpIcon from '@material-ui/icons/Help';
import { Controller, useFormContext } from 'react-hook-form';
import CreatableSelect from 'react-select/creatable/dist/react-select.esm';
import {
  assignmentLanguage,
  assignmentLocations,
  assignmentTypes,
} from '../../constants/dropDownOptions';
import ErrorMessage from '../errors/ErrorMessage';
import ReactSelect from 'react-select';
import React from 'react';
import { selectStyle, useStyles } from '../../styles/formsStyles';
import ReactTooltip from 'react-tooltip';
import t from '../../locales/en/freelancerProfile.json';

const AssignmentPreferences = () => {
  const { errors, control, user } = useFormContext();
  const classes = useStyles();
  return (
    <Paper className={classes.paperSection} elevation={5}>
      <Container className={classes.nestedContainer}>
        <Grid container alignItems='center'>
          <Grid item xs>
            <Typography gutterBottom variant='h4'>
              {t['assignmentPreferences']}
            </Typography>
            <Typography variant='subtitle1' gutterBottom>
              {t['assignmentPreferencesSubtitle']}
            </Typography>
          </Grid>
        </Grid>
        <Divider variant='middle' />
        <ReactTooltip globalEventOff={'click'} />
        <Container maxWidth={false} className={classes.formControl}>
          <div className={classes.formHeader}>
            <Typography gutterBottom variant='subtitle2'>
              {t['assignmentLanguage']}
            </Typography>
            <HelpIcon
              className={classes.formHeaderIcon}
              data-tip={t['assignmentLanguageHint']}
              data-multiline={true}
              color='primary'
              fontSize='small'
            />
          </div>
          <Controller
            name='languageOfAssignments'
            id='assignmentLanguage'
            rules={{ required: t['requiredMessage'] }}
            control={control}
            as={
              <CreatableSelect
                defaultValue={
                  !!user.current.languageOfAssignments
                    ? user.current.languageOfAssignments.map(
                        (userAssignmentLanguage) => {
                          return assignmentLanguage.find(
                            (assignmentLanguage) =>
                              userAssignmentLanguage ===
                              assignmentLanguage.value,
                          );
                        },
                      )
                    : []
                }
                isMulti
                options={assignmentLanguage}
                styles={selectStyle}
              />
            }
          />
          <ErrorMessage errorField={errors.languageOfAssignments} />
        </Container>
        <Container maxWidth={false} className={classes.formControl}>
          <div className={classes.formHeader}>
            <Typography gutterBottom variant='subtitle2'>
              {t['typesOfAssignments']}
            </Typography>
            <HelpIcon
              className={classes.formHeaderIcon}
              data-tip={t['typesOfAssignmentsHint']}
              color='primary'
              fontSize='small'
            />
          </div>

          <Controller
            name='typesOfAssignments'
            id='assignmentTypesSelect'
            rules={{ required: t['requiredMessage'] }}
            control={control}
            as={
              <ReactSelect
                isMulti
                options={assignmentTypes}
                className={classes.selectControl}
                id='assignmentTypesSelect'
                styles={selectStyle}
                value={
                  !!user.current.typesOfAssignments
                    ? user.current.typesOfAssignments.map(
                        (userAssignmentType) => {
                          return assignmentTypes.find(
                            (assignmentType) =>
                              userAssignmentType === assignmentType.value,
                          );
                        },
                      )
                    : []
                }
                label={t['assignmentTypes']}
              />
            }
          />
          <ErrorMessage errorField={errors.typesOfAssignments} />
        </Container>
        <Container maxWidth={false} className={classes.formControl}>
          <div className={classes.formHeader}>
            <Typography gutterBottom variant='subtitle2'>
              {t['locationOfAssignments']}
            </Typography>
            <HelpIcon
              className={classes.formHeaderIcon}
              data-tip={t['locationOfAssignmentsHint']}
              data-multiline={true}
              color='primary'
              fontSize='small'
            />
          </div>
          <Controller
            name='locationOfAssignments'
            rules={{ required: t['requiredMessage'] }}
            control={control}
            as={
              <CreatableSelect
                isMulti
                options={assignmentLocations}
                id='locationOfAssignment'
                styles={selectStyle}
                defaultValue={
                  !!user.current.locationOfAssignments
                    ? user.current.locationOfAssignments.map(
                        (userAssignmentLocation) => {
                          return assignmentLocations.find(
                            (assignmentLocation) =>
                              userAssignmentLocation ===
                              assignmentLocation.value,
                          );
                        },
                      )
                    : []
                }
              />
            }
          />
          <ErrorMessage errorField={errors.locationOfAssignments} />
        </Container>
      </Container>
    </Paper>
  );
};

export default AssignmentPreferences;
