import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import React, { useState } from 'react';
import {
  dateInputStyle,
  nextButtonStyles,
  useStyles,
} from '../../styles/formsStyles';
import ReactTooltip from 'react-tooltip';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Input } from '@material-ui/core';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

const Education = () => {
  const { errors, control, user, register } = useFormContext();
  const classes = useStyles();
  const [deletedEducations, setDeletedEducations] = useState([]);
  const educationForm = useFieldArray({
    control,
    name: 'educations',
  });

  return (
    <Paper className={classes.paperSection} elevation={5}>
      <Container className={classes.nestedContainer}>
        <Grid container alignItems='center'>
          <Grid item xs>
            <Typography gutterBottom variant='h4'>
              Education
            </Typography>
          </Grid>
        </Grid>
        <Divider variant='middle' />
        <Container>
          {educationForm.fields.map((item, index) => (
            <Card key={item.id} className={classes.nestedCardContainer}>
              <ReactTooltip globalEventOff={'click'} />
              <CardContent>
                {!!user.educations[index] && (
                  <Input
                    label={'id'}
                    type='hidden'
                    name={`educations[${index}][id]`}
                    defaultValue={item.id}
                    inputRef={register()}
                  />
                )}
                <Container maxWidth={false} className={classes.formControl}>
                  <TextField
                    fullWidth
                    label={'University'}
                    variant='outlined'
                    name={`educations[${index}].school`}
                    id={`educations-school-${index}`}
                    defaultValue={item.school}
                    InputProps={{
                      classes: {
                        notchedOutline: classes.textField,
                      },
                    }}
                    inputRef={register()}
                  />
                </Container>
                <Container maxWidth={false} className={classes.formControl}>
                  <TextField
                    fullWidth
                    label={'Degree'}
                    variant='outlined'
                    name={`educations[${index}].degree`}
                    id={`educations[${index}]-degree`}
                    defaultValue={item.degree}
                    InputProps={{
                      classes: {
                        notchedOutline: classes.textField,
                      },
                    }}
                    inputRef={register()}
                  />
                </Container>
                <Container maxWidth={false} className={classes.formControl}>
                  <TextField
                    fullWidth
                    label={'Field of study'}
                    variant='outlined'
                    name={`educations[${index}].fieldOfStudy`}
                    InputProps={{
                      classes: {
                        notchedOutline: classes.textField,
                      },
                    }}
                    defaultValue={item.fieldOfStudy}
                    inputRef={register()}
                  />
                </Container>
                <Container className={classes.datesContainer}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Container maxWidth={false} className={classes.formControl}>
                      <Controller
                        name={`educations[${index}].endYear`}
                        control={control}
                        as={
                          <KeyboardDatePicker
                            variant='inline'
                            autoOk
                            views={['year', 'month']}
                            format='MM/yyyy'
                            margin='normal'
                            label='end date'
                            KeyboardButtonProps={{
                              'aria-label': 'change date',
                            }}
                            onChange={(value) => value[0]}
                            InputProps={{
                              style: dateInputStyle,
                            }}
                          />
                        }
                      />
                    </Container>
                  </MuiPickersUtilsProvider>
                </Container>
                <Container maxWidth={false} className={classes.formControl}>
                  <Button
                    variant='contained'
                    onClick={() => {
                      if (!!item.school) {
                        item['_destroy'] = true;
                        setDeletedEducations((prevItems) => [
                          ...prevItems,
                          item,
                        ]);
                      }
                      educationForm.remove(index);
                    }}
                    startIcon={<Icon>remove_circle</Icon>}>
                    Remove Education
                  </Button>
                </Container>
              </CardContent>
            </Card>
          ))}
          <section className={classes.formControl}>
            <Button
              variant='contained'
              id='add-education'
              onClick={() => educationForm.append({})}
              startIcon={<Icon>add_circle</Icon>}
              style={nextButtonStyles}>
              Add Education
            </Button>
          </section>
        </Container>
      </Container>
    </Paper>
  );
};

export default Education;
