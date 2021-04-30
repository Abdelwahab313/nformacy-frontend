import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { useFieldArray, useFormContext } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import React, { Fragment } from 'react';
import { useStyles } from '../../styles/formsStyles';
import ReactTooltip from 'react-tooltip';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Input } from '@material-ui/core';
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
  const projectForm = useFieldArray({
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
        {projectForm.fields.map((item, index) => (
          <Card key={item.id} className={classes.nestedCardContainer}>
            <ReactTooltip globalEventOff={'click'} />
            <CardContent>
              {!!user.current.projects[index] && (
                <Input
                  label={'id'}
                  type='hidden'
                  name={`projects[${index}][id]`}
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
                  name={`projects[${index}].title`}
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
                    errors.projects && errors.projects[index]?.title
                  }
                />
              </Container>

              <Container maxWidth={false} className={classes.formControl}>
                <TextField
                  fullWidth
                  id={`projects-role-${index}`}
                  label={t['jobRole']}
                  variant='outlined'
                  name={`projects[${index}].jobRole`}
                  defaultValue={item.jobRole}
                  InputProps={{
                    classes: {
                      notchedOutline: classes.textField,
                    },
                  }}
                  inputRef={register({ required: t['requiredMessage'] })}
                />
                <ErrorMessage
                  errorField={
                    errors.projects && errors.projects[index]?.jobRole
                  }
                />
              </Container>

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
                    projectForm.remove(index);
                  }}>
                  {t['removeProject']}
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
            onClick={() => projectForm.append({})}>
            {t['addProject']}
          </Link>
        </section>
      </Fragment>
    </Container>
  );
};

export default Project;
