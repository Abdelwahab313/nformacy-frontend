import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Box, Grid } from '@material-ui/core';

const HomePage = () => {
  return (
    <Grid container>
      <Grid md={2}>
        <Typography>Hello</Typography>
      </Grid>
      <Grid md={8}>
        <Box mt={8}>
          <Typography variant='h4' align='center'>
            Welcome to Medad! 🎉
          </Typography>
        </Box>
      </Grid>
      <Grid md={2}>
        <Typography>Hello</Typography>
      </Grid>
    </Grid>
  );
};

export default HomePage;
