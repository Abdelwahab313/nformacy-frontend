import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import React from 'react';
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
  DatePicker,
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import t from '../../locales/en/freelancerProfile.json';

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

  return (
    <Paper className={classes.paperSection} elevation={5}>
      <Container className={classes.nestedContainer}>
        <Grid container alignItems='center'>
          <Grid item xs>
            <Typography gutterBottom variant='h4'>
              {t['certifications']}
            </Typography>
          </Grid>
        </Grid>
        <Divider variant='middle' />
        <Container>
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
                    label={t['name']}
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
                    label={'Issuing organization'}
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
                    label={t['credential']}
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
                    label={t['credentialURL']}
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
                            label={t['completedBy']}
                            maxDate={Date.now()}
                            KeyboardButtonProps={{
                              'aria-label': t['changeDate'],
                            }}
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
                  <Button
                    variant='contained'
                    onClick={() => {
                      if (!!item.name) {
                        item['_destroy'] = true;
                        setDeletedCertifications((prevItems) => [
                          ...prevItems,
                          item,
                        ]);
                      }
                      certificationForm.remove(index);
                    }}
                    startIcon={<Icon>remove_circle</Icon>}>
                    {t['removeCertification']}
                  </Button>
                </Container>
              </CardContent>
            </Card>
          ))}
          <section className={classes.formControl}>
            <Button
              variant='contained'
              style={nextButtonStyles(false)}
              onClick={() => certificationForm.append({})}
              startIcon={<Icon>add_circle</Icon>}
              id='add-certification'>
              {t['addCertification']}
            </Button>
          </section>
        </Container>
      </Container>
    </Paper>
  );
};

export default Certification;
