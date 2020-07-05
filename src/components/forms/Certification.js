import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import React, { useState } from 'react';
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
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const Certification = () => {
  const { errors, control, user, register, watch } = useFormContext();
  const watchCertifications = watch('certifications');
  const classes = useStyles();
  const [deletedCertification, setDeletedCertifications] = useState([]);
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
              Certifications
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
                    label={'Name'}
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
                    label={'Credential'}
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
                    label={'Credential URL'}
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
                <Container className={classes.datesContainer}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Container maxWidth={false} className={classes.formControl}>
                      <Controller
                        name={`certifications[${index}].startDate`}
                        control={control}
                        as={
                          <KeyboardDatePicker
                            variant='inline'
                            autoOk
                            views={['year', 'month']}
                            format='MM/yyyy'
                            margin='normal'
                            label='Completed by'
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
                    Remove Certification
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
              Add Certification
            </Button>
          </section>
        </Container>
      </Container>
    </Paper>
  );
};

export default Certification;
