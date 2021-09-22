import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import { useStyles } from 'styles/formsStyles';
import { useFormContext } from 'react-hook-form';
import t from 'locales/en/freelancerProfile.json';
import ErrorMessage from 'components/errors/ErrorMessage';

const BeneficiaryBasicInfo = () => {
  const classes = useStyles();
  const { errors, register, client } = useFormContext();

  return (
    <Container>
      <Grid container alignItems='center'>
        <Grid item xs>
          <Typography gutterBottom variant='h4'>
            Basic Info
          </Typography>
        </Grid>
      </Grid>
      <Divider variant='middle' />
      <Container maxWidth={false} className={classes.formControl}>
        <Typography gutterBottom variant='subtitle2'>
          {t['firstName']}
        </Typography>
        <TextField
          variant='outlined'
          margin='normal'
          fullWidth
          id='firstName'
          name='firstName'
          defaultValue={client.firstName || ''}
          inputRef={register({ required: 'This field is required' })}
          autoComplete='name'
          error={!!errors.firstName}
        />
        <ErrorMessage errorField={errors.firstName} />
      </Container>
      <Container maxWidth={false} className={classes.formControl}>
        <Typography gutterBottom variant='subtitle2'>
          {t['lastName']}
        </Typography>
        <TextField
          variant='outlined'
          margin='normal'
          fullWidth
          id='lastName'
          name='lastName'
          defaultValue={client.lastName || ''}
          inputRef={register({ required: 'This field is required' })}
          autoComplete='name'
          error={!!errors.lastName}
        />
        <ErrorMessage errorField={errors.lastName} />
      </Container>
    </Container>
  );
};
export default BeneficiaryBasicInfo;
