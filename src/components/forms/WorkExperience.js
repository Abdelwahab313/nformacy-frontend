import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import React, { Fragment } from 'react';
import { useStyles, checkboxStyle } from '../../styles/formsStyles';
import ReactTooltip from 'react-tooltip';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Input, FormControl, FormGroup, FormControlLabel, Checkbox } from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import t from '../../locales/en/freelancerProfile.json';
import Link from '@material-ui/core/Link';
import ErrorMessage from '../errors/ErrorMessage';

const WorkExperience = () => {
  const {
    control,
    user,
    register,
    errors,
    setDeletedExperiences,
    watch
  } = useFormContext();
  const classes = useStyles();
  const watchExperiences = watch('experiences');
  const experienceForm = useFieldArray({
    control,
    name: 'experiences',
    toDate: false,
  });
  const getFormattedDateForPicker = (index) => {
    const endDate = watchExperiences[index].endDate || new Date().toISOString();
    const formattedDate = endDate?.includes('/')
      ? new Date(endDate.split('/')[1], endDate.split('/')[0])
      : endDate;
    return formattedDate;
  };
  return (
    <Container maxWidth={false} className={classes.nestedContainer}>
      <Grid container alignItems='center'>
        <Grid item xs>
          <Typography gutterBottom className={classes.fieldLabelStylesDesktop}>
            {t['workExperience']}
          </Typography>
        </Grid>
      </Grid>
      <Divider variant='middle' />
      <Fragment>
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
                  inputRef={register({ required: t['requiredMessage'] })}
                />
                <ErrorMessage
                  errorField={
                    errors.experiences && errors.experiences[index]?.title
                  }
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
                  inputRef={register({ required: t['requiredMessage'] })}
                />
                <ErrorMessage
                  errorField={
                    errors.experiences && errors.experiences[index]?.title
                  }
                />
              </Container>
              <Grid>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Container
                    maxWidth={false}
                    className={classes.dateController}>
                    <Controller
                      name={`experiences[${index}][startDate]`}
                      control={control}
                      rules={{ required: t['requiredMessage'] }}
                      as={
                        <DatePicker
                          id={`work-experience-startDate-${index}`}
                          views={['year', 'month']}
                          format='MM/yyyy'
                          inputVariant='outlined'
                          autoOk
                          margin='normal'
                          maxDate={
                            watchExperiences[index]?.toDate === false
                              ? getFormattedDateForPicker(index)
                              : Date.now()
                          }
                          label={t['startDate']}
                          InputProps={{
                            classes: {
                              notchedOutline: classes.textField,
                            },
                          }}
                          onChange={(value) => value[0]}
                        />
                      }
                    />
                    {errors.experiences &&
                      errors.experiences[index]?.startDate && (
                        <Grid maxWidth={false}>
                          <ErrorMessage
                            errorField={
                              errors.experiences &&
                              errors.experiences[index]?.startDate
                            }
                          />
                        </Grid>
                      )}
                  </Container>
                  <Container
                    maxWidth={false}
                    className={classes.dateController}>
                    {!watchExperiences[index] ||
                      (!watchExperiences[index].toDate && (
                        <Fragment>
                          <Controller
                            id={`work-experience-endDate-${index}`}
                            rules={{
                              validate: (endDate) =>
                                (watchExperiences[index] &&
                                  watchExperiences[index].toDate) ||
                                endDate ||
                                t['requiredMessage'],
                            }}
                            name={`experiences[${index}][endDate]`}
                            control={control}
                            as={
                              <DatePicker
                                views={['year', 'month']}
                                format='MM/yyyy'
                                autoOk
                                inputVariant='outlined'
                                margin='normal'
                                label={t['endDate']}
                                minDate={
                                  new Date(watchExperiences[index].startDate)
                                }
                                maxDate={Date.now()}
                                inputRef={register()}
                                InputProps={{
                                  classes: {
                                    notchedOutline: classes.textField,
                                  },
                                }}
                                onChange={(value) => value[0]}
                              />
                            }
                          />
                          {errors.experiences &&
                            errors.experiences[index]?.endDate && (
                              <Grid maxWidth={false}>
                                <ErrorMessage
                                  errorField={
                                    errors.experiences &&
                                    errors.experiences[index]?.endDate
                                  }
                                />
                              </Grid>
                            )}
                        </Fragment>
                      ))}
                    <Grid item className={classes.checkBoxControl}>
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
                                    id={`experiences-toDate-${index}`}
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
                    </Grid>
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
                    if (!!item.title) {
                      item['_destroy'] = true;
                      setDeletedExperiences((prevItems) => [
                        ...prevItems,
                        item,
                      ]);
                    }
                    experienceForm.remove(index);
                  }}>
                  {t['removeWorkExperience']}
                </Link>
              </Container>
            </CardContent>
          </Card>
        ))}
        <ErrorMessage errorField={errors.experiencesLength} />
        <section className={classes.formControl}>
          <Link
            className={classes.fieldLabelStylesDesktop}
            id='add-work-experience'
            component='button'
            variant='body2'
            onClick={() => experienceForm.append({})}>
            {t['addWorkExperience']}
          </Link>
        </section>
      </Fragment>
    </Container>
  );
};

export default WorkExperience;
