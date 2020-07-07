import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import HelpIcon from '@material-ui/icons/Help';
import { Controller, useFormContext } from 'react-hook-form';
import CreatableSelect from 'react-select/creatable/dist/react-select.esm';
import { assignmentLanguage, assignmentTypes } from '../../constants/dropDownOptions';
import ErrorMessage from '../errors/ErrorMessage';
import ReactSelect from 'react-select';
import React from 'react';
import { dividerStyle, sectionContainerStyles, selectStyle, useStyles } from '../../styles/formsStyles';
import ReactTooltip from 'react-tooltip';
import t from '../../locales/en/freelancerProfile.json';

const AssignmentPreferences = () => {
  const { errors, control, user } = useFormContext();
  const classes = useStyles();
  return (
    <Paper className={classes.paperSection} elevation={5}>
      <Container className={classes.nestedContainer} style={sectionContainerStyles}>
        <Grid container alignItems='center'>
          <Grid item xs>
            <Typography gutterBottom className={classes.sectionHeaderStyles}>
              {t['assignmentPreferences']}
            </Typography>
          </Grid>
        </Grid>
        <Divider variant='middle' style={dividerStyle}/>
        <ReactTooltip globalEventOff={'click'}/>
        <Container maxWidth={false} className={classes.formControl}>
          <div className={classes.formHeader}>
            <Typography gutterBottom className={classes.fieldLabelStylesDesktop}>
              {t['assignmentLanguage']}
            </Typography>
            <HelpIcon
              className={classes.formHeaderIcon}
              data-tip={t['assignmentLanguageHint']}
              data-multiline={true}
              color='primary'
              fontSize='small'
            />
          </div>
          <Controller
            name='languageOfAssignments'
            id='assignmentLanguage'
            rules={{ required: t['requiredMessage'] }}
            control={control}
            as={
              <CreatableSelect
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
              {t['typesOfAssignments']}
            </Typography>
            <HelpIcon
              className={classes.formHeaderIcon}
              data-tip={t['typesOfAssignmentsHint']}
              color='primary'
              fontSize='small'
            />
          </div>

          <Controller
            name='typesOfAssignments'
            id='assignmentTypesSelect'
            rules={{ required: t['requiredMessage'] }}
            control={control}
            as={
              <ReactSelect
                isMulti
                options={assignmentTypes}
                className={classes.selectControl}
                id='assignmentTypesSelect'
                styles={selectStyle}
                value={
                  !!user.current.typesOfAssignments
                    ? user.current.typesOfAssignments.map(
                    (userAssignmentType) => {
                      return assignmentTypes.find(
                        (assignmentType) =>
                          userAssignmentType === assignmentType.value,
                      );
                    },
                    )
                    : []
                }
                label={t['assignmentTypes']}
              />
            }
          />
          <ErrorMessage errorField={errors.typesOfAssignments}/>
        </Container>
      </Container>
    </Paper>
  );
};

export default AssignmentPreferences;
