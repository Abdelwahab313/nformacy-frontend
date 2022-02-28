import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import { useStyles } from 'styles/formsStyles';
import ReactTooltip from 'react-tooltip';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Input } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import ErrorMessage from '../errors/ErrorMessage';
import CustomTypography from 'components/typography/Typography';
import HelpIcon from '@material-ui/icons/Help';
import FieldsSelect from 'components/inputs/FieldsSelect/FieldsSelect';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const UserPrevProject = () => {
  const {
    control,
    user,
    register,
    setValue,
    setDeletedProjects,
    errors,
  } = useFormContext();
  const classes = useStyles();
  const projectForm = useFieldArray({
    control,
    name: 'prevProjects',
  });
  const { t } = useTranslation();
  return (
    <Container className={classes.nestedContainer}>
      <Grid container alignItems='center'>
        <Grid item xs>
          <Typography gutterBottom className={classes.fieldLabelStylesDesktop}>
            {t('majorAchievedProjects')}
          </Typography>
        </Grid>
      </Grid>
      <Divider variant='middle' />
      <Fragment>
        {projectForm.fields.map((item, index) => (
          <Card key={item.id} className={classes.nestedCardContainer}>
            <ReactTooltip globalEventOff={'click'} />
            <CardContent>
              {!!user.current.prevProjects[index] && (
                <Input
                  label={'id'}
                  type='hidden'
                  name={`prevProjects[${index}][id]`}
                  defaultValue={item.id}
                  inputRef={register()}
                />
              )}
              <Container maxWidth={false} className={classes.formControl}>
                <TextField
                  fullWidth
                  id={`projects-title-${index}`}
                  label={t['title']}
                  variant='outlined'
                  name={`prevProjects[${index}].title`}
                  defaultValue={item.title}
                  InputProps={{
                    classes: {
                      notchedOutline: classes.textField,
                    },
                  }}
                  inputRef={register({ required: t['requiredMessage'] })}
                />
                <ErrorMessage
                  errorField={errors.prevProjects && errors.prevProjects[index]?.title}
                />
              </Container>

              <FieldsSelect
                initialFields={item.fields}
                initialMajorFields={item.majorFieldIds}
                updateMajorFields={(updatedMajorFields) => {
                  setValue(
                    `prevProjects[${index}].majorFields`,
                    updatedMajorFields,
                  );
                }}
                updateFields={(updatedFields) => {
                  setValue(`prevProjects[${index}].fields`, updatedFields);
                }}>
                {({ MajorField, Field }) => (
                  <Fragment>
                    <Container maxWidth={false} className={classes.formControl}>
                      <div className={classes.formHeader}>
                        <Typography
                          gutterBottom
                          className={classes.fieldLabelStylesDesktop}>
                          {t['experiencedIn']}
                        </Typography>
                        <HelpIcon
                          className={classes.formHeaderIcon}
                          data-tip={t('experiencedInHint')}
                          color='primary'
                          fontSize='small'
                        />
                      </div>
                      <CustomTypography
                        variant='body1'
                        fontWeight='light'
                        className={classes.removeNestedText}
                        gutterBottom>
                        {t('experiencedInHint')}
                      </CustomTypography>
                      <Controller
                        as={({ field }) => (
                          <MajorField
                            id={`projects-majorFields-${index}`}
                            name={`prevProjects[${index}].majorFields`}
                            {...field}
                          />
                        )}
                        name={`prevProjects[${index}].majorFields`}
                        control={control}
                        defaultValue={item.majorFields} // make sure to set up defaultValue
                      />
                      <ErrorMessage
                        errorField={errors.majorFieldsOfExperience}
                      />
                    </Container>
                    <Container maxWidth={false} className={classes.formControl}>
                      <div className={classes.formHeader}>
                        <Typography
                          gutterBottom
                          className={classes.fieldLabelStylesDesktop}>
                          {t('specificallyIn')}
                        </Typography>
                        <HelpIcon
                          className={classes.formHeaderIcon}
                          data-tip={t('specificallyInHint')}
                          color='primary'
                          fontSize='small'
                        />
                      </div>
                      <CustomTypography
                        variant='body1'
                        fontWeight='light'
                        className={classes.removeNestedText}
                        gutterBottom>
                        {t('specificallyInHint')}
                      </CustomTypography>
                      <Controller
                        as={({ field }) => (
                          <Field
                            id={`projects-fields-${index}`}
                            name={`prevProjects[${index}].fields`}
                            {...field}
                          />
                        )}
                        name={`prevProjects[${index}].fields`}
                        control={control}
                        defaultValue={item.fields} // make sure to set up defaultValue
                      />
                      <ErrorMessage errorField={errors.fields} />
                    </Container>
                  </Fragment>
                )}
              </FieldsSelect>

              <Container maxWidth={false} className={classes.formControl}>
                <TextField
                  fullWidth
                  id={`projects-role-${index}`}
                  label={t('jobRole')}
                  variant='outlined'
                  name={`prevProjects[${index}].jobRole`}
                  defaultValue={item.jobRole}
                  InputProps={{
                    classes: {
                      notchedOutline: classes.textField,
                    },
                  }}
                  inputRef={register({ required: t('requiredMessage') })}
                />
                <ErrorMessage
                  errorField={
                    errors.prevProjects && errors.prevProjects[index]?.jobRole
                  }
                />
              </Container>
              <Grid>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Container maxWidth={false} className={classes.formControl}>
                    <Controller
                      rules={{ required: t('requiredMessage') }}
                      name={`prevProjects[${index}].completedAt`}
                      control={control}
                      as={
                        <DatePicker
                          id={`projects-completedAt-${index}`}
                          inputVariant='outlined'
                          autoOk
                          views={['year', 'month']}
                          format='MM/yyyy'
                          margin='normal'
                          label={t('completedBy')}
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
                    {errors.prevProjects && errors.prevProjects[index]?.completedAt && (
                      <Grid maxWidth={false}>
                        <ErrorMessage
                          errorField={
                            errors.prevProjects &&
                            errors.prevProjects[index]?.completedAt
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
                    if (!!item.title) {
                      item['_destroy'] = true;
                      setDeletedProjects((prevItems) => [...prevItems, item]);
                    }
                    projectForm.remove(index);
                  }}>
                  {t('removeProject')}
                </Link>
              </Container>
            </CardContent>
          </Card>
        ))}
        <ErrorMessage errorField={errors.projectLength} />
        <section className={classes.formControl}>
          <Link
            className={classes.fieldLabelStylesDesktop}
            id='add-project'
            component='button'
            variant='body2'
            onClick={() => projectForm.append({})}>
            {t('addProject')}
          </Link>
        </section>
      </Fragment>
    </Container>
  );
};

export default UserPrevProject;
