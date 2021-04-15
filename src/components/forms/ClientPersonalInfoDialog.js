import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import ErrorMessage from '../errors/ErrorMessage';
import React, { useState } from 'react';
import {
  useStyles, selectStyle
} from '../../styles/formsStyles';
import { useFormContext } from 'react-hook-form';
import t from '../../locales/en/freelancerProfile.json';
import countryList from 'react-select-country-list';
import HelpIcon from '@material-ui/icons/Help';
import FormControl from '@material-ui/core/FormControl';
import { Controller } from 'react-hook-form';
import ReactSelectMaterialUi from 'react-select-material-ui';

const ClientPersonalInfoDialog = () => {
  const classes = useStyles();
  const { errors, control, register, user } = useFormContext();
  const [countries] = useState(countryList().getData());

  return (
    <Container>
      <Grid container alignItems='center'>
        <Grid item xs>
          <Typography gutterBottom variant='h4'>
            Personal Information
          </Typography>
        </Grid>
      </Grid>
      <Divider variant='middle' />
      <Container maxWidth={false} className={classes.formControl}>
        <div className={classes.formHeader}>
          <Typography gutterBottom className={classes.fieldLabelStylesDesktop}>
            {t['country']}
          </Typography>
          <HelpIcon
            className={classes.formHeaderIcon}
            data-tip={t['selectCountryOfResidenceMessage']}
            color='primary'
            fontSize='small'
          />
        </div>
        <FormControl fullWidth id='country-select'>
          <Controller
            name='country'
            rules={{ required: t['requiredMessage'] }}
            control={control}
            defaultValue={!user.current.country && 0}
            as={
              <ReactSelectMaterialUi
                fullWidth={true}
                placeholder={t['selectCountryMessage']}
                SelectProps={{
                  styles: selectStyle,
                }}
                options={countries}
              />
            }
          />
        </FormControl>

        <ErrorMessage errorField={errors.country} />
      </Container>

      <Container maxWidth={false} className={classes.formControl}>
        <Typography gutterBottom variant='subtitle2'>
          {t['email']}
        </Typography>
        <TextField
          variant='outlined'
          margin='normal'
          fullWidth
          id='email'
          name='email'
          defaultValue={!user.current.email && ''}
          inputRef={register({ required: 'This field is required' })}
          autoComplete='name'
          error={!!errors.email}
        />
        <ErrorMessage errorField={errors.email} />
      </Container>
    </Container>
  );
};
export default ClientPersonalInfoDialog;