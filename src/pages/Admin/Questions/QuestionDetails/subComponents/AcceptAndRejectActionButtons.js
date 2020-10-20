import React from 'react';
import { Grid } from '@material-ui/core';
import RegularButton from 'components/buttons/RegularButton';
import { useStyles } from './AcceptAndRejectActionButtonsStyles';



const AcceptAndRejectActionButtons = ({ acceptButtonProps, rejectButtonProps}) => {

  const classes = useStyles();

    return(
        <Grid container direction='row-reverse' alignItems='flex-end'>
          <RegularButton
            className={classes.acceptButton}
            color='success'
            {... acceptButtonProps}>
            Accept
          </RegularButton>
          <RegularButton
            className={classes.rejectButton}
            color='danger'
            {... rejectButtonProps}>
            Reject
          </RegularButton>
        </Grid>
    );
};


export default AcceptAndRejectActionButtons ;