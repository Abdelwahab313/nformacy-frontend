import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import FieldsOfExperience from '../../EditProfile/FieldsOfExpereience';
import HelpIcon from '@material-ui/icons/Help';
import { Controller, useFormContext } from 'react-hook-form';
import CreatableSelect from 'react-select/creatable/dist/react-select.esm';
import { industries } from '../../constants/dropDownOptions';
import ErrorMessage from '../errors/ErrorMessage';
import React from 'react';
import { dividerStyle, selectStyle, useStyles } from '../../styles/formsStyles';
import ReactTooltip from 'react-tooltip';

function FieldsOfSpecialization() {
  const { errors, control, user, getValues, setValue } = useFormContext();
  const classes = useStyles();

  return (
    <Paper className={classes.paperSection} elevation={5}>
      <Container>
        <Grid container alignItems='center'>
          <Grid item xs>
            <Typography gutterBottom variant='h4'>
              Fields of Specialization
            </Typography>
            <Typography variant='subtitle1' gutterBottom>
              What are your areas of expertise as a subject matter expert, and
              the industries you have deep knowledge in.
            </Typography>
          </Grid>
        </Grid>
        <Divider variant='middle' style={dividerStyle} />
        <ReactTooltip globalEventOff={'click'} />
        <FieldsOfExperience user={user.current} />
        <Container maxWidth={false} className={classes.formControl}>
          <div className={classes.formHeader}>
            <Typography gutterBottom variant='subtitle2'>
              Industry of experience
            </Typography>
            <HelpIcon
              className={classes.formHeaderIcon}
              data-tip='You can choose more than one industry, if your industry is not listed please type it down.'
              color='primary'
              fontSize='small'
            />
          </div>
          <Controller
            name='industriesOfExperience'
            id='industriesOfExperience'
            rules={{ required: 'This field is required' }}
            control={control}
            as={
              <CreatableSelect
                defaultValue={
                  !!user.current.industriesOfExperience
                    ? user.current.industriesOfExperience.map(
                        (userIndustry) => {
                          return industries.find(
                            (industry) => userIndustry === industry.value,
                          );
                        },
                      )
                    : []
                }
                styles={selectStyle}
                isMulti
                options={industries}
              />
            }
          />
          <ErrorMessage errorField={errors.industriesOfExperience} />
        </Container>
      </Container>
    </Paper>
  );
}

export default FieldsOfSpecialization;
