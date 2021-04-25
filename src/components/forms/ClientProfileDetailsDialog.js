import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import ErrorMessage from '../errors/ErrorMessage';
import React from 'react';
import { useStyles } from '../../styles/formsStyles';
import { useFormContext } from 'react-hook-form';
import t from '../../locales/en/freelancerProfile.json';

const ClientProfileDetailsDialog = () => {
  const classes = useStyles();
  const { errors, register, user } = useFormContext();

  return (
    <Container>
      <Grid container alignItems='center'>
        <Grid item xs>
          <Typography gutterBottom variant='h4'>
            LinkedIn Profile
          </Typography>
        </Grid>
      </Grid>
      <Divider variant='middle' />
      <Container maxWidth={false} className={classes.formControl}>
        <Typography gutterBottom variant='subtitle2'>
          {t['linkedInProfileUrl']}
        </Typography>
        <TextField
          variant='outlined'
          margin='normal'
          fullWidth
          id='linkedInProfileUrl'
          name='linkedInProfileUrl'
          defaultValue={!user.current.linkedInProfileUrl && ''}
          inputRef={register({ required: 'This field is required' })}
          autoComplete='name'
          error={!!errors.linkedInProfileUrl}
        />
        <ErrorMessage errorField={errors.linkedInProfileUrl} />
      </Container>
    </Container>
  );
};
export default ClientProfileDetailsDialog;
