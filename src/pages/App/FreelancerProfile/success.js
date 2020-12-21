import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import { useStyles } from '../../../styles/successStyle';
import SubmitButton from '../../../components/buttons/SubmitButton';
import { RoutesPaths } from 'constants/routesPath';

const Success = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.successRootContainer}>
      <Hidden smDown>
        <Grid sm={3} item />
      </Hidden>
      <Grid
        id='welcomeContainer'
        xs={12}
        direction='column'
        alignItems='center'
        className={classes.successMessageContainer}
        container>
        <Grid item>
          <img src={require('../../../assets/fireworks.gif')} width={'50%'} />
        </Grid>
        <Grid item>
          <Typography gutterBottom className={classes.successText}>
            Congratulations for becoming a member of our family. <br />
            We would love to welcome you to our community, <br />
            when is your preferred time to receive our welcome call?
            <br />
            <span className={classes.subtext}>
              Rada Hrout
              <br />
              Nformacy Co. Founder
            </span>
          </Typography>
        </Grid>
        <Grid item className={classes.buttonContainer}>
          <SubmitButton href={RoutesPaths.App.Home} buttonText='Home' />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Success;
