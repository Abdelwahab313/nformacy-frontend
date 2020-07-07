import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import { nextButtonStyles, useStyles } from '../../styles/formsStyles';
import ReactTooltip from 'react-tooltip';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Input } from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import t from '../../locales/en/freelancerProfile.json';

const Education = () => {
  const { control, user, register, setDeletedEducations } = useFormContext();
  const classes = useStyles();
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
              {t['education']}
            </Typography>
          </Grid>
        </Grid>
        <Divider variant='middle' />
        <Container>
          {educationForm.fields.map((item, index) => (
            <Card key={item.id} className={classes.nestedCardContainer}>
              <ReactTooltip globalEventOff={'click'} />
              <CardContent>
                {!!user.current.educations[index] && (
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
                    label={t['university']}
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
                    label={t['degree']}
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
                    label={t['fieldOfStudy']}
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
                <Grid>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Container maxWidth={false} className={classes.formControl}>
                      <Controller
                        name={`educations[${index}].endYear`}
                        control={control}
                        as={
                          <DatePicker
                            inputVariant='outlined'
                            autoOk
                            views={['year', 'month']}
                            format='MM/yyyy'
                            margin='normal'
                            label={t['endDate']}
                            maxDate={Date.now()}
                            KeyboardButtonProps={{
                              'aria-label': t['changeDate'],
                            }}
                            onChange={(value) => value[0]}
                            InputProps={{
                              classes: {
                                notchedOutline: classes.textField,
                              },}}
                          />
                        }
                      />
                    </Container>
                  </MuiPickersUtilsProvider>
                </Grid>
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
                    {t['removeEducation']}
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
              style={nextButtonStyles(false)}>
              {t['addEducation']}
            </Button>
          </section>
        </Container>
      </Container>
    </Paper>
  );
};

export default Education;
