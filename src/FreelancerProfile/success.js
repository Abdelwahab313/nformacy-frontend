import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import { useStyles } from '../styles/successStyle';
import SubmitButton from '../components/buttons/SubmitButton';

const Success = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.successRootContainer}>
      <Hidden smDown>
        <Grid sm={3} item/>
      </Hidden>
      <Grid
        id='welcomeContainer'
        xs={12}
        sm={6}
        direction='column'
        alignItems='center'
        className={classes.successMessageContainer}
        container>
        <img src={require('../assets/fireworks.gif')} width={'50%'}/>
        <Typography gutterBottom className={classes.successText}>
          Congratulations for becoming a member of our family. <br/>
          We would love to welcome you to our community, <br/>
          when is your preferred time to receive our welcome call?<br/>
          <span className={classes.subtext}>Rada Hrout
          <br/>
          Medad Co. Founder</span>
        </Typography>
        <Grid container justify={'center'} style={{marginTop: '50px'}}>
          <Grid item xs={10} sm={6} style={{ display: 'flex', justifyContent: 'center' }}>
            <SubmitButton href='/' buttonText='Home'/>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Success;
