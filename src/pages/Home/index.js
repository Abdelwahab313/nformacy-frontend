import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';
import Container from '@material-ui/core/Container';

const HomePage = () => {
  return (
    <Container>
      <Box mt={8}>
        <Typography variant='h4' align='center'>
          Welcome to Medad! 🎉
        </Typography>
      </Box>
    </Container>
  );
};

export default HomePage;
