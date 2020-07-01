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
import TextField from '@material-ui/core/TextField';
import React from 'react';
import { selectStyle, useStyles } from '../../styles/formsStyles';
import { pink } from '../../styles/colors';
import ReactTooltip from 'react-tooltip';

const AssignmentPreferences = () => {
  const { errors, control, user, register } = useFormContext();
  const classes = useStyles();
  return (
    <Paper className={classes.paperSection} elevation={5}>
      <Container className={classes.nestedContainer}>
        <Grid container alignItems='center'>
          <Grid item xs>
            <Typography gutterBottom variant='h4'>
              Assignment Preferences
            </Typography>
            <Typography variant='subtitle1' gutterBottom>
              What are your preferences in a project or assignment.
            </Typography>
          </Grid>
        </Grid>
        <Divider variant='middle' />
        <ReactTooltip globalEventOff={'click'} />
        <Container maxWidth={false} className={classes.formControl}>
          <div className={classes.formHeader}>
            <Typography gutterBottom variant='subtitle2'>
              Assignment language
            </Typography>
            <HelpIcon
              className={classes.formHeaderIcon}
              data-tip='Your preferred languages of the assignments you want to tackle (You may select more than one option).<br> if your language is not listed please type it down.'
              data-multiline={true}
              color='primary'
              fontSize='small'
            />
          </div>
          <Controller
            name='languageOfAssignments'
            id='assignmentLanguage'
            rules={{ required: 'This field is required' }}
            control={control}
            as={
              <CreatableSelect
                defaultValue={
                  !!user.languageOfAssignments
                    ? user.languageOfAssignments.map(
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
              Types of Assignments
            </Typography>
            <HelpIcon
              className={classes.formHeaderIcon}
              data-tip='Your preferred types of the assignments you want to tackle (You may select more than one option)'
              color='primary'
              fontSize='small'
            />
          </div>

          <Controller
            name='typesOfAssignments'
            id='assignmentTypesSelect'
            rules={{ required: 'This field is required' }}
            control={control}
            as={
              <ReactSelect
                isMulti
                options={assignmentTypes}
                className={classes.selectControl}
                id='assignmentTypesSelect'
                styles={selectStyle}
                value={
                  !!user.typesOfAssignments
                    ? user.typesOfAssignments.map((userAssignmentType) => {
                        return assignmentTypes.find(
                          (assignmentType) =>
                            userAssignmentType === assignmentType.value,
                        );
                      })
                    : []
                }
                label='Assignment Types'
              />
            }
          />
          <ErrorMessage errorField={errors.typesOfAssignments} />
        </Container>
        <Container maxWidth={false} className={classes.formControl}>
          <div className={classes.formHeader}>
            <Typography gutterBottom variant='subtitle2'>
              Location of Assignments
            </Typography>
            <HelpIcon
              className={classes.formHeaderIcon}
              data-tip='Your preferred location of the assignments you want to tackle (You may select more than one option).<br> if your language is not listed please type it down.'
              data-multiline={true}
              color='primary'
              fontSize='small'
            />
          </div>
          <Controller
            name='locationOfAssignments'
            rules={{ required: 'This field is required' }}
            control={control}
            as={
              <CreatableSelect
                isMulti
                options={assignmentLocations}
                id='locationOfAssignment'
                styles={selectStyle}
                defaultValue={
                  !!user.locationOfAssignments
                    ? user.locationOfAssignments.map(
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
        <Container maxWidth={false} className={classes.formControl}>
          <Typography gutterBottom variant='subtitle2'>
            Daily Rate
          </Typography>
          <TextField
            variant='outlined'
            margin='normal'
            inputRef={register({ required: 'This field is required' })}
            fullWidth
            id='daily_rate'
            name='dailyRate'
            type='number'
            InputProps={{
              classes: {
                notchedOutline: classes.textField,
              },
              inputMode: 'numeric',
            }}
            error={!!errors.dailyRate}
            defaultValue={user.dailyRate}
          />
          <ErrorMessage errorField={errors.dailyRate} />
        </Container>
      </Container>
    </Paper>
  );
};

export default AssignmentPreferences;
