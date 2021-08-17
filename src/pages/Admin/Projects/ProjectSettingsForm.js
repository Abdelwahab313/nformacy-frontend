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
import { frequency } from 'constants/dropDownOptions';
import SubmitButton from 'components/buttons/SubmitButton';
import { RoutesPaths } from 'constants/routesPath';
import { useHistory } from 'react-router';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import CustomTypography from 'components/typography/Typography';
import LinkText from 'components/typography/LinkText';
import { Dialog } from '@material-ui/core';
import { DialogContent } from '@material-ui/core';
import Transition from 'components/animations/Transition';
import { DialogActions } from '@material-ui/core';
import EditMentorsDialog from './EditMentorsDialog';
import { addMentors, submitProjectSettings } from 'apis/projectsAPI';
import { useSnackBar } from 'context/SnackBarContext';

const ProjectSettingsForm = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const history = useHistory();
  const [showMentoringSetting, setShowMentoringSetting] = useState();
  const [projectSettings, setProjectSettings] = useState({
    askSettings: {},
    callSettings: {},
    hireSettings: {},
    mentorSettings: {},
  });

  const handleProjectServiceForm = () => {
    submitProjectSettings({ ...projectSettings, projectId: 1 })
      .then(() => {
        history.push(RoutesPaths.Admin.AddConsutlantsToProjectWizard);
      })
      .catch(() => {});
  };

  const onCheckMentoring = (checked) => {
    setShowMentoringSetting(checked);
  };

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
        <SettingRow
          serviceKey={'askSettings'}
          serviceSetting={projectSettings['askSettings']}
          updateServiceSetting={(serviceSetting) => {
            setProjectSettings({
              ...projectSettings,
              askSettings: serviceSetting,
            });
          }}
        />

        <SettingRow
          serviceKey={'callSettings'}
          serviceSetting={projectSettings['callSettings']}
          updateServiceSetting={(serviceSetting) => {
            setProjectSettings({
              ...projectSettings,
              callSettings: serviceSetting,
            });
          }}
        />

        <SettingRow
          serviceKey={'hireSettings'}
          serviceSetting={projectSettings['hireSettings']}
          updateServiceSetting={(serviceSetting) => {
            setProjectSettings({
              ...projectSettings,
              hireSettings: serviceSetting,
            });
          }}
        />

        <SettingRow
          serviceKey={'mentorSettings'}
          serviceSetting={projectSettings['mentorSettings']}
          updateServiceSetting={(serviceSetting) => {
            setProjectSettings({
              ...projectSettings,
              mentorSettings: serviceSetting,
            });
          }}
          onCheck={(checked) => onCheckMentoring(checked)}
        />

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

const SettingRow = ({
  serviceKey,
  serviceSetting,
  updateServiceSetting,
  onCheck,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const serviceKeysTitle = {
    askSettings: t('askTheExpert'),
    callSettings: t('callTheExpert'),
    hireSettings: t('hireTheExpert'),
    mentorSettings: t('mentoringTheExpert'),
  };
  const onChangeField = (name, value) => {
    updateServiceSetting({
      ...serviceSetting,
      [name]: value,
    });
  };

  return (
    <GridContainer className={classes.inputsRow}>
      <GridItem xs={12} sm={4}>
        <FormControlLabel
          value='start'
          control={
            <Checkbox
              color='primary'
              onChange={(e) => onCheck?.(e.target.checked)}
            />
          }
          label={serviceKeysTitle[serviceKey]}
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
          onChange={(e) => onChangeField('amount', e.target.value)}
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
            onChange={(value) => onChangeField('frequency', value)}
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
            value={serviceSetting.startDate}
            onChange={(date) => onChangeField('startDate', date)}
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
            value={serviceSetting.endDate}
            onChange={(date) => onChangeField('endDate', date)}
            minDate={serviceSetting.startDate}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </GridItem>
      </MuiPickersUtilsProvider>
    </GridContainer>
  );
};

const MentorsSetting = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [mentors, setMentors] = useState([]);
  const { showSuccessMessage } = useSnackBar();

  const projectId = 1;

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const onSelectConsultant = (beneficiaryId, consultantId) => {
    setMentors((prevMentors) => [
      ...prevMentors.filter(
        (beneficiaryId) => mentors.beneficiaryId !== beneficiaryId,
      ),
      { beneficiaryId, consultantId },
    ]);
  };

  const handleSubmit = () => {
    addMentors(projectId, mentors).then(() => {
      showSuccessMessage(t('Mentors Added Successfully!'));
      handleClose();
    });
  };

  return (
    <>
      <Dialog
        TransitionComponent={Transition}
        maxWidth='lg'
        PaperProps={{ id: 'fieldsOfSpecializationDialog' }}
        onClose={handleClose}
        open={open}>
        <DialogContent className={classes.mentorsDialogContainer}>
          <Grid container>
            <Grid item md={12} className={classes.activityTable}>
              <EditMentorsDialog onSelectConsultant={onSelectConsultant} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <SubmitButton
            onClick={handleSubmit}
            color='primary'
            buttonText={'Submit'}
          />
        </DialogActions>
      </Dialog>

      <LinkText to={() => {}}>
        <CustomTypography
          color='primary'
          variant='body1'
          onClick={handleClickOpen}>
          {t('assignMentorsForBeneficiaries')}
        </CustomTypography>
      </LinkText>
    </>
  );
};

export default ProjectSettingsForm;
