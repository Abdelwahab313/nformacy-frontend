import React, { Fragment, useEffect, useMemo, useState } from 'react';

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
import { useHistory } from 'react-router';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import CustomTypography from 'components/typography/Typography';
import { Dialog } from '@material-ui/core';
import { DialogContent } from '@material-ui/core';
import Transition from 'components/animations/Transition';
import { DialogActions } from '@material-ui/core';
import EditMentorsDialog from './EditMentorsDialog';
import {
  addMentors,
  fetchProjectSettings,
  submitProjectSettings,
} from 'apis/projectsAPI';
import { useSnackBar } from 'context/SnackBarContext';
import LoadingCircle from 'components/progress/LoadingCircle';
import useLocationState from 'hooks/useLocationState';
import { getConsultantsProjectWizard } from 'services/navigation';
import ErrorMessage from 'components/errors/ErrorMessage';

const ProjectSettingsForm = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const history = useHistory();
  const projectId = useLocationState((state) => state?.projectId);
  const { showSuccessMessage, showErrorMessage } = useSnackBar();

  const [isErrors, setIsErrors] = useState({
    askSettings: { amount: 'error in amount' },
    callSettings: { amount: 'error in amount' },
    hireSettings: { amount: 'error in amount' },
    mentorSettings: { amount: 'error in amount' },
  });

  const [projectSettings, setProjectSettings] = useState({
    askSettings: {},
    callSettings: {},
    hireSettings: {},
    mentorSettings: {},
  });
  const [isLoading, setIsLoading] = useState(false);

  const showMentoringSetting = useMemo(
    () => projectSettings?.mentorSettings?.isEnabled,
    [projectSettings?.mentorSettings],
  );

  useEffect(() => {
    if (projectId) {
      setIsLoading(true);
      fetchProjectSettings(projectId)
        .then((response) => {
          setProjectSettings(response.data);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, []);

  const validate = () => {
    const newErrors = [];
    const enabledSettingKey = Object.keys(projectSettings).filter(
      (serviceKey) => {
        return projectSettings[serviceKey]?.isEnabled;
      },
    );
    if (!Object.values(projectSettings).some((val) => val.isEnabled === true)) {
      showErrorMessage(t('settingsRequired'));
      return false;
    } else {
      enabledSettingKey.forEach((serviceKey) => {
        if (projectSettings[serviceKey].amount === undefined) {
          newErrors[projectSettings[serviceKey].amount] = {
            message: t('requiredAmount'),
          };
          setIsErrors(newErrors);
          return false;
        }
      });
    }
    return true;
  };

  const handleProjectServiceForm = () => {
    if (!!validate()) {
      submitProjectSettings({ ...projectSettings, projectId: projectId })
        .then(() => {
          showSuccessMessage(t('serviceSaveSuccessfully'));
          history.push(getConsultantsProjectWizard(projectId));
        })
        .catch(() => {});
    }
  };

  if (isLoading) {
    return <LoadingCircle />;
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
        <SettingRow
          serviceKey={'askSettings'}
          serviceSetting={projectSettings['askSettings']}
          updateServiceSetting={(serviceSetting) => {
            setProjectSettings({
              ...projectSettings,
              askSettings: serviceSetting,
            });
          }}
          errors={isErrors?.askSettings?.amount}
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
          errors={isErrors?.callSettings?.amount}
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
          errors={isErrors?.hireSettings?.amount}
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
          errors={isErrors?.mentorSettings?.amount}
        />

        {showMentoringSetting && <MentorsSetting projectId={projectId} />}
      </CardBody>
      <CardFooter className={classes.nextStepBtn}>
        <SubmitButton
          onClick={() => {
            handleProjectServiceForm();
          }}
          buttonText={t('save')}
        />
      </CardFooter>
    </Fragment>
  );
};

const SettingRow = ({
  serviceKey,
  serviceSetting,
  updateServiceSetting,
  errors,
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
              checked={!!serviceSetting.isEnabled}
              color='primary'
              onChange={(e) => onChangeField('isEnabled', e.target.checked)}
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
          value={serviceSetting.amount}
          onChange={(e) => onChangeField('amount', e.target.value)}
          error={!errors}
        />
        <ErrorMessage errorField={errors} />
      </GridItem>
      <GridItem xs={12} sm={2}>
        <FormControl fullWidth id='country-select'>
          <ReactSelectMaterialUi
            fullWidth={true}
            placeholder={t('selectFrequency')}
            SelectProps={{
              styles: selectStyle,
            }}
            value={serviceSetting.frequency}
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

const MentorsSetting = ({ projectId }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [mentors, setMentors] = useState([]);
  const { showSuccessMessage } = useSnackBar();

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

      <CustomTypography
        color='primary'
        variant='body1'
        className={classes.clickableTextButton}
        onClick={handleClickOpen}>
        {t('assignMentorsForBeneficiaries')}
      </CustomTypography>
    </>
  );
};

export default ProjectSettingsForm;
