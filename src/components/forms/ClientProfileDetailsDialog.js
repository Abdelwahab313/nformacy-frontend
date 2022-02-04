import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import ErrorMessage from '../errors/ErrorMessage';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useStyles } from '../../styles/formsStyles';
import { useFormContext } from 'react-hook-form';

const ClientProfileDetailsDialog = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { errors, register, user } = useFormContext();

  return (
    <Container>
      <Grid container alignItems='center'>
        <Grid item xs>
          <Typography gutterBottom variant='h4'>
            {t('linkedInProfile')}
          </Typography>
        </Grid>
      </Grid>
      <Divider variant='middle' />
      <Container maxWidth={false} className={classes.formControl}>
        <Typography gutterBottom variant='subtitle2'>
          {t('linkedInProfileUrl')}
        </Typography>
        <TextField
          variant='outlined'
          margin='normal'
          fullWidth
          id='linkedInProfileUrl'
          name='linkedInProfileUrl'
          defaultValue={!user.current.linkedInProfileUrl && ''}
          inputRef={register({ required: t('requiredMessage') })}
          autoComplete='name'
          error={!!errors.linkedInProfileUrl}
        />
        <ErrorMessage errorField={errors.linkedInProfileUrl} />
      </Container>
    </Container>
  );
};
export default ClientProfileDetailsDialog;
