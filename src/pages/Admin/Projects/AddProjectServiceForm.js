import React, { Fragment, useState } from 'react';
import GridContainer from 'components/grid/GridContainer';
import GridItem from 'components/grid/GridItem';
import CardBody from 'components/card/CardBody';
import { useStyles } from 'styles/Admin/questionFormStyles';
import TextField from '@material-ui/core/TextField';
import CardFooter from 'components/card/CardFooter';
import {
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
} from '@material-ui/core';
import CardHeader from 'components/card/CardHeader';
import { useTranslation } from 'react-i18next';
import FormControl from '@material-ui/core/FormControl';
import ReactSelectMaterialUi from 'react-select-material-ui';
import { selectStyle } from 'styles/formsStyles';
import { frequency, projectManagers } from 'constants/dropDownOptions';
import SubmitButton from 'components/buttons/SubmitButton';
import { RoutesPaths } from 'constants/routesPath';
import { useHistory } from 'react-router';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment';
import CustomTypography from 'components/typography/Typography';

const AddProjectServiceForm = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const history = useHistory();
  const [showMentoringSetting, setShowMentoringSetting] = useState();
  const constraint = {
    startDate: moment('10-10-2019').toDate(),
    endDate: moment('1-1-2022').toDate(),
  };

  const handleProjectServiceForm = () => {
    history.push(RoutesPaths.Admin.AddProjectListForm);
  };

  const updateContaraint = () => {};

  const onCheckMentoring = (e) => {
    setShowMentoringSetting(e.target.checked)
  }
  return (
    <Fragment>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <CardHeader color='primary'>
            <Grid container>
              <Grid item md={6} xs={6}>
                <Typography component={'h4'}>{t('solutions')}</Typography>
              </Grid>
            </Grid>
          </CardHeader>
        </GridItem>
      </GridContainer>
      <CardBody>
        <GridContainer className={classes.inputsRow}>
          <GridItem xs={12} sm={4}>
            <FormControlLabel
              value='start'
              control={<Checkbox color='primary' />}
              label={t('askTheExpert')}
              labelPlacement='end'
            />
          </GridItem>

          <GridItem xs={12} sm={2}>
            <TextField
              id='standard-number'
              label='Amount'
              type='number'
              InputLabelProps={{
                shrink: true,
              }}
              variant='outlined'
            />
          </GridItem>
          <GridItem xs={12} sm={2}>
            <FormControl fullWidth id='country-select'>
              <ReactSelectMaterialUi
                fullWidth={true}
                placeholder={t('selectFrequency')}
                SelectProps={{
                  styles: selectStyle,
                }}
                options={frequency}
              />
            </FormControl>
          </GridItem>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <GridItem xs={12} sm={2}>
              <KeyboardDatePicker
                disableToolbar
                autoOk
                variant='inline'
                format='dd/MM/yyyy'
                margin='normal'
                id='start-date-range-picker'
                label={t['startDate']}
                value={constraint.startDate}
                onChange={(date) => updateContaraint('startDate', date)}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </GridItem>
            <GridItem xs={12} sm={2}>
              <KeyboardDatePicker
                disableToolbar
                autoOk
                variant='inline'
                format='dd/MM/yyyy'
                margin='normal'
                id='end-date-range-picker'
                label={t['endDate']}
                value={constraint.endDate}
                onChange={(date) => updateContaraint('endDate', date)}
                minDate={constraint.startDate}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </GridItem>
          </MuiPickersUtilsProvider>
        </GridContainer>

        <GridContainer className={classes.inputsRow}>
          <GridItem xs={12} sm={4}>
            <FormControlLabel
              value='start'
              control={<Checkbox color='primary' />}
              label={t('callTheExpert')}
              labelPlacement='end'
            />
          </GridItem>

          <GridItem xs={12} sm={2}>
            <TextField
              id='standard-number'
              label='Amount'
              type='number'
              InputLabelProps={{
                shrink: true,
              }}
              variant='outlined'
            />
          </GridItem>
          <GridItem xs={12} sm={2}>
            <FormControl fullWidth id='country-select'>
              <ReactSelectMaterialUi
                fullWidth={true}
                placeholder={t('selectFrequency')}
                SelectProps={{
                  styles: selectStyle,
                }}
                options={frequency}
              />
            </FormControl>
          </GridItem>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <GridItem xs={12} sm={2}>
              <KeyboardDatePicker
                disableToolbar
                autoOk
                variant='inline'
                format='dd/MM/yyyy'
                margin='normal'
                id='start-date-range-picker'
                label={t['startDate']}
                value={constraint.startDate}
                onChange={(date) => updateContaraint('startDate', date)}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </GridItem>
            <GridItem xs={12} sm={2}>
              <KeyboardDatePicker
                disableToolbar
                autoOk
                variant='inline'
                format='dd/MM/yyyy'
                margin='normal'
                id='end-date-range-picker'
                label={t['endDate']}
                value={constraint.endDate}
                onChange={(date) => updateContaraint('endDate', date)}
                minDate={constraint.startDate}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </GridItem>
          </MuiPickersUtilsProvider>
        </GridContainer>

        <GridContainer className={classes.inputsRow}>
          <GridItem xs={12} sm={4}>
            <FormControlLabel
              value='start'
              control={<Checkbox color='primary' />}
              label={t('hireTheExpert')}
              labelPlacement='end'
            />
          </GridItem>

          <GridItem xs={12} sm={2}>
            <TextField
              id='standard-number'
              label='Amount'
              type='number'
              InputLabelProps={{
                shrink: true,
              }}
              variant='outlined'
            />
          </GridItem>
          <GridItem xs={12} sm={2}>
            <FormControl fullWidth id='country-select'>
              <ReactSelectMaterialUi
                fullWidth={true}
                placeholder={t('selectFrequency')}
                SelectProps={{
                  styles: selectStyle,
                }}
                options={frequency}
              />
            </FormControl>
          </GridItem>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <GridItem xs={12} sm={2}>
              <KeyboardDatePicker
                disableToolbar
                autoOk
                variant='inline'
                format='dd/MM/yyyy'
                margin='normal'
                id='start-date-range-picker'
                label={t['startDate']}
                value={constraint.startDate}
                onChange={(date) => updateContaraint('startDate', date)}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </GridItem>
            <GridItem xs={12} sm={2}>
              <KeyboardDatePicker
                disableToolbar
                autoOk
                variant='inline'
                format='dd/MM/yyyy'
                margin='normal'
                id='end-date-range-picker'
                label={t['endDate']}
                value={constraint.endDate}
                onChange={(date) => updateContaraint('endDate', date)}
                minDate={constraint.startDate}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </GridItem>
          </MuiPickersUtilsProvider>
        </GridContainer>

        <GridContainer className={classes.inputsRow}>
          <GridItem xs={12} sm={4}>
            <FormControlLabel
              value='start'
              control={<Checkbox color='primary'  onChange={(e) => {
                onCheckMentoring(e);
              }} />}
              label={t('mentoringTheExpert')}
              labelPlacement='end'
            />
          </GridItem>

          <GridItem xs={12} sm={2}>
            <TextField
              id='standard-number'
              label='Amount'
              type='number'
              InputLabelProps={{
                shrink: true,
              }}
              variant='outlined'
            />
          </GridItem>
          <GridItem xs={12} sm={2}>
            <FormControl fullWidth id='country-select'>
              <ReactSelectMaterialUi
                fullWidth={true}
                placeholder={t('selectFrequency')}
                SelectProps={{
                  styles: selectStyle,
                }}
                options={frequency}
              />
            </FormControl>
          </GridItem>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <GridItem xs={12} sm={2}>
              <KeyboardDatePicker
                disableToolbar
                autoOk
                variant='inline'
                format='dd/MM/yyyy'
                margin='normal'
                id='start-date-range-picker'
                label={t['startDate']}
                value={constraint.startDate}
                onChange={(date) => updateContaraint('startDate', date)}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </GridItem>
            <GridItem xs={12} sm={2}>
              <KeyboardDatePicker
                disableToolbar
                autoOk
                variant='inline'
                format='dd/MM/yyyy'
                margin='normal'
                id='end-date-range-picker'
                label={t['endDate']}
                value={constraint.endDate}
                onChange={(date) => updateContaraint('endDate', date)}
                minDate={constraint.startDate}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </GridItem>
          </MuiPickersUtilsProvider>
        </GridContainer>
        {showMentoringSetting && <MentorsSetting />}
      </CardBody>
      <CardFooter className={classes.nextStepBtn}>
        <SubmitButton
          onClick={() => {
            handleProjectServiceForm();
          }}
          buttonText={t('nextStep')}
        />
      </CardFooter>
    </Fragment>
  );
};

const MentorsSetting = () => {
  const classes = useStyles();
  const clients = [
    {
      id: 1,
      firstName: 'Ahmed',
      lastName: 'Ali',
      organizationName: 'Netflix',
    },
    {
      id: 2,
      firstName: 'Sam',
      lastName: 'Micheal',
      organizationName: 'Amazon',
    },
    {
      id: 3,
      firstName: 'Erik',
      lastName: 'Ericksen',
      organizationName: 'nformacy',
    },
  ];
  return (
    <>
      <CustomTypography variant='h6'>
        Assign Mentors for Beneficiaries
      </CustomTypography>
      {clients.map((client) => (
        <GridContainer className={classes.inputsRow}>
          <GridItem xs={3}>
            <CustomTypography>
              {`${client.firstName} ${client.lastName}`}
            </CustomTypography>
          </GridItem>
          <GridItem xs={3}>
            <CustomTypography>{client.organizationName}</CustomTypography>
          </GridItem>
          <GridItem xs={3}>
            <FormControl fullWidth id='project-manager-select'>
              <ReactSelectMaterialUi
                fullWidth={true}
                placeholder={'Select Mentor'}
                SelectProps={{
                  styles: selectStyle,
                }}
                options={projectManagers}
              />
            </FormControl>
          </GridItem>
        </GridContainer>
      ))}
    </>
  );
};

export default AddProjectServiceForm;
