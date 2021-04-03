import React from 'react';
import { Grid } from '@material-ui/core';
import Direction from 'components/grid/Direction';

const PageContainer = ({ children }) => {
  return (
    <Direction>
      <Grid container alignItems={'flex-start'} justify={'center'}>
        <Grid item xs={10} sm={10}>
          {children}
        </Grid>
      </Grid>
    </Direction>
  );
};

export default PageContainer;
