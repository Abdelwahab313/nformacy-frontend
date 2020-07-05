import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import { useStyles } from '../styles/successStyle';

const Success = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.successRootContainer}>
      <Hidden mdDown>
        <Grid md={3} item />
      </Hidden>
      <Grid
        xs={12}
        md={6}
        direction='column'
        alignItems='center'
        className={classes.successMessageContainer}
        container>
        <img src={require('../assets/fireworks.gif')} width={'50%'} />
        <Typography variant='h4' gutterBottom className={classes.successText}>
          Congratulations for becoming a member of our family. <br />
          We would love to welcome you to our community, <br />
          when is your preferred time to receive our welcome call?
        </Typography>
        <Typography variant='h6' className={classes.subtext}>
          Rada Hrout
          <br />
          Medad Co. Founder
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Success;
