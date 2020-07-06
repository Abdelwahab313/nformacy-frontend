import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import {
  checkboxStyle,
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
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import t from '../../locales/en/freelancerProfile.json';

const WorkExperience = () => {
  const {
    control,
    user,
    register,
    watch,
    setDeletedExperiences,
  } = useFormContext();
  const classes = useStyles();
  const watchExperiences = watch('experiences');
  const experienceForm = useFieldArray({
    control,
    name: 'experiences',
    toDate: false,
  });
  console.log(watchExperiences);
  return (
    <Paper className={classes.paperSection} elevation={5}>
      <Container className={classes.nestedContainer}>
        <Grid container alignItems='center'>
          <Grid item xs>
            <Typography gutterBottom variant='h4'>
              {t['workExperience']}
            </Typography>
          </Grid>
        </Grid>
        <Divider variant='middle' />
        <Container>
          {experienceForm.fields.map((item, index) => (
            <Card key={item.id} className={classes.nestedCardContainer}>
              <ReactTooltip globalEventOff={'click'} />
              <CardContent>
                {!!user.current.experiences[index] && (
                  <Input
                    label={'id'}
                    type='hidden'
                    name={`experiences[${index}][id]`}
                    defaultValue={item.id}
                    inputRef={register()}
                  />
                )}
                <Container maxWidth={false} className={classes.formControl}>
                  <TextField
                    fullWidth
                    autoFocus={index === 0}
                    label={t['jobTitle']}
                    variant='outlined'
                    name={`experiences[${index}][title]`}
                    id={`work-experience-title-${index}`}
                    defaultValue={item.title}
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
                    label={t['company']}
                    variant='outlined'
                    name={`experiences[${index}][company]`}
                    id={`work-experience-company-${index}`}
                    defaultValue={item.company}
                    InputProps={{
                      classes: {
                        notchedOutline: classes.textField,
                      },
                    }}
                    inputRef={register()}
                  />
                </Container>
                <Container className={classes.datesContainer}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Container maxWidth={false} className={classes.formControl}>
                      <Controller
                        name={`experiences[${index}][startDate]`}
                        control={control}
                        as={
                          <KeyboardDatePicker
                            variant='inline'
                            views={['year', 'month']}
                            format='MM/yyyy'
                            autoOk
                            margin='normal'
                            label={t['startDate']}
                            KeyboardButtonProps={{
                              'aria-label': t['changeDate'],
                            }}
                            InputProps={{
                              style: dateInputStyle,
                            }}
                            onChange={(value) => value[0]}
                          />
                        }
                      />
                    </Container>
                    <Container maxWidth={false} className={classes.formControl}>
                      {!watchExperiences[index] ||
                        (!watchExperiences[index].toDate && (
                          <Controller
                            name={`experiences[${index}][endDate]`}
                            control={control}
                            as={
                              <KeyboardDatePicker
                                variant='inline'
                                views={['year', 'month']}
                                format='MM/yyyy'
                                autoOk
                                margin='normal'
                                label={t['endDate']}
                                inputRef={register()}
                                KeyboardButtonProps={{
                                  'aria-label': t['changeDate'],
                                }}
                                InputProps={{
                                  style: dateInputStyle,
                                }}
                                onChange={(value) => value[0]}
                              />
                            }
                          />
                        ))}
                    </Container>
                  </MuiPickersUtilsProvider>
                </Container>
                <Container maxWidth={false} className={classes.checkBoxControl}>
                  <FormControl
                    component='fieldset'
                    className={classes.formControl}
                    data-tip={t['presentHint']}>
                    <FormGroup>
                      <Controller
                        name={`experiences[${index}][toDate]`}
                        valueName='checked'
                        defaultValue={false}
                        type='checkbox'
                        control={control}
                        as={
                          <FormControlLabel
                            control={
                              <Checkbox
                                name={`experiences[${index}][toDate]`}
                                inputRef={register()}
                                style={checkboxStyle}
                              />
                            }
                            label={t['present?']}
                          />
                        }
                      />
                    </FormGroup>
                  </FormControl>
                </Container>
                <Container maxWidth={false} className={classes.formControl}>
                  <Button
                    variant='contained'
                    onClick={() => {
                      if (!!item.title) {
                        item['_destroy'] = true;
                        setDeletedExperiences((prevItems) => [
                          ...prevItems,
                          item,
                        ]);
                      }
                      experienceForm.remove(index);
                    }}
                    startIcon={<Icon>remove_circle</Icon>}>
                    {t['removeWorkExperience']}
                  </Button>
                </Container>
              </CardContent>
            </Card>
          ))}
          <section className={classes.formControl}>
            <Button
              variant='contained'
              id='add-work-experience'
              onClick={() => experienceForm.append({})}
              style={nextButtonStyles(false)}
              startIcon={<Icon>add_circle</Icon>}>
              {t['addWorkExperience']}
            </Button>
          </section>
        </Container>
      </Container>
    </Paper>
  );
};

export default WorkExperience;
