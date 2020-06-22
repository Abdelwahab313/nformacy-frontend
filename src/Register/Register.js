import Container from '@material-ui/core/Container';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import CssBaseline from '@material-ui/core/CssBaseline';

const Register = () => {
  return (
    <Container component='main' maxWidth='xs' dir='ltr'>
      <CssBaseline />
      <form className='registerationForm' noValidate autoComplete='off'>
        <TextField id='standard-basic' label='Standard' />
        <TextField id='filled-basic' label='Filled' variant='filled' />
        <TextField id='outlined-basic' label='Outlined' variant='outlined' />
      </form>
    </Container>
  );
};
export default Register;
