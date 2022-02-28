import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { useTranslation } from 'react-i18next';
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
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Link from '@material-ui/core/Link';

const Certification = () => {
  const {
    control,
    user,
    register,
    setDeletedCertifications,
  } = useFormContext();
  const classes = useStyles();
  const certificationForm = useFieldArray({
    control,
    name: 'certifications',
  });
  const { t } = useTranslation();
  return (
    <Container className={classes.nestedContainer}>
      <Grid container alignItems='center'>
        <Grid item xs>
          <Typography gutterBottom className={classes.fieldLabelStylesDesktop}>
            {t('certifications')}
          </Typography>
        </Grid>
      </Grid>
      <Divider variant='middle' />
      <Fragment>
        {certificationForm.fields.map((item, index) => (
          <Card key={item.id} className={classes.nestedCardContainer}>
            <ReactTooltip globalEventOff={'click'} />
            <CardContent>
              {!!user.current.certifications[index] && (
                <Input
                  label={'id'}
                  type='hidden'
                  name={`certifications[${index}][id]`}
                  defaultValue={item.id}
                  inputRef={register()}
                />
              )}
              <Container maxWidth={false} className={classes.formControl}>
                <TextField
                  id={`certification-name-${index}`}
                  fullWidth
                  label={t('name')}
                  variant='outlined'
                  name={`certifications[${index}].name`}
                  defaultValue={item.name}
                  inputRef={register()}
                  InputProps={{
                    classes: {
                      notchedOutline: classes.textField,
                    },
                  }}
                />
              </Container>
              <Container maxWidth={false} className={classes.formControl}>
                <TextField
                  fullWidth
                  label={t('issuingOrganization')}
                  variant='outlined'
                  name={`certifications[${index}].issuingOrganization`}
                  defaultValue={item.issuingOrganization}
                  inputRef={register()}
                  InputProps={{
                    classes: {
                      notchedOutline: classes.textField,
                    },
                  }}
                />
              </Container>
              <Container maxWidth={false} className={classes.formControl}>
                <TextField
                  fullWidth
                  label={t('credential')}
                  variant='outlined'
                  name={`certifications[${index}].credential`}
                  defaultValue={item.credential}
                  inputRef={register()}
                  InputProps={{
                    classes: {
                      notchedOutline: classes.textField,
                    },
                  }}
                />
              </Container>
              <Container maxWidth={false} className={classes.formControl}>
                <TextField
                  fullWidth
                  label={t('credentialURL')}
                  variant='outlined'
                  name={`certifications[${index}].credentialUrl`}
                  defaultValue={item.credentialUrl}
                  inputRef={register()}
                  InputProps={{
                    classes: {
                      notchedOutline: classes.textField,
                    },
                  }}
                />
              </Container>
              <Grid>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Container maxWidth={false} className={classes.formControl}>
                    <Controller
                      name={`certifications[${index}].startDate`}
                      control={control}
                      as={
                        <KeyboardDatePicker
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
                    if (!!item.name) {
                      item['_destroy'] = true;
                      setDeletedCertifications((prevItems) => [
                        ...prevItems,
                        item,
                      ]);
                    }
                    certificationForm.remove(index);
                  }}>
                  {t('removeCertification')}
                </Link>
              </Container>
            </CardContent>
          </Card>
        ))}
        <section className={classes.formControl}>
          <Link
            id='add-certification'
            className={classes.fieldLabelStylesDesktop}
            component='button'
            variant='body2'
            onClick={(e) => {
              e.preventDefault();
              certificationForm.append({ startDate: Date.now() });
            }}>
            {t('addCertification')}
          </Link>
        </section>
      </Fragment>
    </Container>
  );
};

export default Certification;
