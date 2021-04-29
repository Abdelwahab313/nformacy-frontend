import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import React, { Fragment } from 'react';
import { useStyles } from '../../styles/formsStyles';
import ReactTooltip from 'react-tooltip';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Input } from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import t from '../../locales/en/freelancerProfile.json';
import Link from '@material-ui/core/Link';
import ErrorMessage from '../errors/ErrorMessage';

const Project = () => {
  const {
    control,
    user,
    register,
    setDeletedEducations,
    errors,
  } = useFormContext();
  const classes = useStyles();
  const educationForm = useFieldArray({
    control,
    name: 'projects',
  });

  return (
    <Container className={classes.nestedContainer}>
      <Grid container alignItems='center'>
        <Grid item xs>
          <Typography gutterBottom className={classes.fieldLabelStylesDesktop}>
            {t['project']}
          </Typography>
        </Grid>
      </Grid>
      <Divider variant='middle' />
      <Fragment>
        {educationForm.fields.map((item, index) => (
          <Card key={item.id} className={classes.nestedCardContainer}>
            <ReactTooltip globalEventOff={'click'} />
            <CardContent>
              {!!user.current.projects[index] && (
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
                  id={`educations-degree-${index}`}
                  label={t['degree']}
                  variant='outlined'
                  name={`educations[${index}].degree`}
                  defaultValue={item.degree}
                  InputProps={{
                    classes: {
                      notchedOutline: classes.textField,
                    },
                  }}
                  inputRef={register({ required: t['requiredMessage'] })}
                />
                <ErrorMessage
                  errorField={
                    errors.projects && errors.projects[index]?.degree
                  }
                />
              </Container>
              <Container maxWidth={false} className={classes.formControl}>
                <TextField
                  fullWidth
                  id={`educations-fieldOfStudy-${index}`}
                  label={t['fieldOfStudy']}
                  variant='outlined'
                  name={`educations[${index}].fieldOfStudy`}
                  InputProps={{
                    classes: {
                      notchedOutline: classes.textField,
                    },
                  }}
                  defaultValue={item.fieldOfStudy}
                  inputRef={register({ required: t['requiredMessage'] })}
                />
                <ErrorMessage
                  errorField={
                    errors.projects && errors.projects[index]?.fieldOfStudy
                  }
                />
              </Container>
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
                  inputRef={register({ required: t['requiredMessage'] })}
                />
                <ErrorMessage
                  errorField={
                    errors.projects && errors.projects[index]?.school
                  }
                />
              </Container>
              <Grid>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Container maxWidth={false} className={classes.formControl}>
                    <Controller
                      rules={{ required: t['requiredMessage'] }}
                      name={`educations[${index}].endYear`}
                      control={control}
                      as={
                        <DatePicker
                          id={`educations-endYear-${index}`}
                          inputVariant='outlined'
                          autoOk
                          views={['year', 'month']}
                          format='MM/yyyy'
                          margin='normal'
                          label={t['completedBy']}
                          maxDate={Date.now()}
                          onChange={(value) => value[0]}
                          InputProps={{
                            classes: {
                              notchedOutline: classes.textField,
                            },
                          }}
                        />
                      }
                    />
                    {errors.projects && errors.projects[index]?.endYear && (
                      <Grid maxWidth={false}>
                        <ErrorMessage
                          errorField={
                            errors.projects &&
                            errors.projects[index]?.endYear
                          }
                        />
                      </Grid>
                    )}
                  </Container>
                </MuiPickersUtilsProvider>
              </Grid>
              <Container maxWidth={false} className={classes.formControl}>
                <Link
                  className={[
                    classes.fieldLabelStylesDesktop,
                    classes.removeNestedText,
                  ]}
                  component='button'
                  variant='body2'
                  onClick={() => {
                    if (!!item.school) {
                      item['_destroy'] = true;
                      setDeletedEducations((prevItems) => [...prevItems, item]);
                    }
                    educationForm.remove(index);
                  }}>
                  {t['removeEducation']}
                </Link>
              </Container>
            </CardContent>
          </Card>
        ))}
        <ErrorMessage errorField={errors.educationLength} />
        <section className={classes.formControl}>
          <Link
            className={classes.fieldLabelStylesDesktop}
            id='add-education'
            component='button'
            variant='body2'
            onClick={() => educationForm.append({})}>
            {t['addEducation']}
          </Link>
        </section>
      </Fragment>
    </Container>
  );
};

export default Project;
