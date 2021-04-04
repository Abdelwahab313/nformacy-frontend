import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import {
  useStyles, sectionContainerStyles
} from '../../styles/formsStyles';
import { useFormContext } from 'react-hook-form';
import t from '../../locales/en/freelancerProfile.json';
import ReactTooltip from 'react-tooltip';
import TextField from '@material-ui/core/TextField';
import ErrorMessage from '../errors/ErrorMessage';

const CorporateContactPersonalInfoDialog = () => {
  const classes = useStyles();
  const { errors, register, user } = useFormContext();

  return (
    <Container style={sectionContainerStyles}>
      <ReactTooltip globalEventOff={'click'} />
      <Grid container alignItems='center'>
        <Grid item xs>
          <Typography gutterBottom variant='h4'>
            {t['contactPersonInfo']}
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
          defaultValue={!user.current.firstName && ''}
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
          defaultValue={!user.current.lastName && ''}
          inputRef={register({ required: 'This field is required' })}
          autoComplete='name'
          error={!!errors.lastName}
        />
        <ErrorMessage errorField={errors.lastName} />
      </Container>
      <Container maxWidth={false} className={classes.formControl}>
        <Typography gutterBottom variant='subtitle2'>
          {t['jobTitle']}
        </Typography>
        <TextField
          variant='outlined'
          margin='normal'
          fullWidth
          id='jobTitle'
          name='jobTitle'
          defaultValue={!user.current.jobTitle && ''}
          inputRef={register({ required: 'This field is required' })}
          autoComplete='name'
          error={!!errors.jobTitle}
        />
        <ErrorMessage errorField={errors.jobTitle} />
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
export default CorporateContactPersonalInfoDialog;
