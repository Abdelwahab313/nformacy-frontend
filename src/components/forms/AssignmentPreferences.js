import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import HelpIcon from '@material-ui/icons/Help';
import { useTranslation } from 'react-i18next';
import { Controller, useFormContext } from 'react-hook-form';
import { assignmentLanguage, assignmentTypesTranslated } from '../../constants/dropDownOptions';
import ErrorMessage from '../errors/ErrorMessage';
import ReactSelect from 'react-select';
import React, { Fragment, useEffect } from 'react';
import { sectionContainerStyles, selectStyle, useStyles } from '../../styles/formsStyles';
import ReactTooltip from 'react-tooltip';
import { FormGroup } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const AssignmentPreferences = () => {
  const { errors, control, user, watch, register, setValue } = useFormContext();
  useEffect(() => {
    register({ name: 'typesOfAssignments' });
  }, [register]);
  const { t } = useTranslation();
  const assignmentTypes = assignmentTypesTranslated(t);
  const assignmentTypesValue = watch('typesOfAssignments') || [];
  const classes = useStyles();
  function handleAssignmentTypesChange(assignmentType) {
    let updatedTypesOfAssignment;
    if (!assignmentTypesValue.includes(assignmentType)) {
      assignmentTypesValue.push(assignmentType);
      updatedTypesOfAssignment = assignmentTypesValue;
    } else {
      updatedTypesOfAssignment = assignmentTypesValue.filter((selectedAssignmentType) => {
        return assignmentType.value !== selectedAssignmentType.value;
      });
    }
    setValue('typesOfAssignments', updatedTypesOfAssignment);
  }


  function isChecked(assignmentType) {
    if (assignmentTypesValue) {
      return assignmentTypesValue.filter((selectedAssignmentType) => {
        return assignmentType.value === selectedAssignmentType.value;
      }).length > 0;
    }
  }

  return (
    <Fragment>
      <Container className={classes.nestedContainer} style={sectionContainerStyles}>
        <ReactTooltip globalEventOff={'click'}/>
        <Container maxWidth={false} className={classes.formControl}>
          <div className={classes.formHeader}>
            <Typography gutterBottom className={classes.fieldLabelStylesDesktop}>
              {t('assignmentLanguage')}
            </Typography>
            <HelpIcon
              className={classes.formHeaderIcon}
              data-tip={t('assignmentLanguageHint')}
              data-multiline={true}
              color='primary'
              fontSize='small'
            />
          </div>
          <Controller
            name='languageOfAssignments'
            id='assignmentLanguage'
            rules={{ required: t('requiredMessage') }}
            control={control}
            as={
              <ReactSelect
                defaultValue={
                  !!user.current.languageOfAssignments
                    ? user.current.languageOfAssignments.map(
                    (userAssignmentLanguage) => {
                      return assignmentLanguage.find(
                        (assignmentLanguage) =>
                          userAssignmentLanguage ===
                          assignmentLanguage.value,
                      );
                    },
                    )
                    : []
                }
                isMulti
                options={assignmentLanguage}
                styles={selectStyle}
              />
            }
          />
          <ErrorMessage errorField={errors.languageOfAssignments}/>
        </Container>
        <Container maxWidth={false} className={classes.formControl}>
          <div className={classes.formHeader}>
            <Typography gutterBottom className={classes.fieldLabelStylesDesktop}>
              {t('typesOfAssignments')}
            </Typography>
            <HelpIcon
              className={classes.formHeaderIcon}
              data-tip={t('typesOfAssignmentsHint')}
              color='primary'
              fontSize='small'
            />
          </div>

          <FormGroup id='typesOfAssignmentCheckboxes'>
            {assignmentTypes.map((assignmentType) => {
              return <FormControlLabel
                label={assignmentType.label}
                key={assignmentType.value}
                id={`assignmentType-${assignmentType.value}`}
                control={<Checkbox
                  checked={isChecked(assignmentType)}
                  id={`assignmentType-${assignmentType.value}-input`}
                  onChange={() => {
                    handleAssignmentTypesChange(assignmentType);
                  }}
                  name={assignmentType.value}
                  color="primary"
                />}/>;
            })
            }
          </FormGroup>
          <ErrorMessage errorField={errors.typesOfAssignments}/>
        </Container>
      </Container>
    </Fragment>
  );
};

export default AssignmentPreferences;
