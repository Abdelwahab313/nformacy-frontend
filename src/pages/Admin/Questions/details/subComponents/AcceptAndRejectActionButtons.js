import React from 'react';
import { Grid } from '@material-ui/core';
import RegularButton from 'components/buttons/RegularButton';
import { useStyles } from './AcceptAndRejectActionButtonsStyles';



const AcceptAndRejectActionButtons = ({onRejectAssignment, onAcceptAssignment}) => {

  const classes = useStyles();

    return(
        <Grid container direction='row-reverse' alignItems='flex-end'>
          <RegularButton
            id={'acceptButton'}
            className={classes.acceptButton}
            color='success'
            onClick={onAcceptAssignment}>
            Accept
          </RegularButton>
          <RegularButton
            id={'rejectButton'}
            className={classes.rejectButton}
            color='danger'
            onClick={onRejectAssignment}>
            Reject
          </RegularButton>
        </Grid>
    );
};


export default AcceptAndRejectActionButtons ;