import React from 'react';
import { Grid } from '@material-ui/core';
import RegularButton from 'components/buttons/RegularButton';



const AcceptAndRejectActionButtons = ({onRejectAssignment, onAcceptAssignment}) => {
    return(
        <Grid container direction='row-reverse' alignItems='flex-end'>
          <RegularButton
            id={'acceptButton'}
            color='success'
            onClick={onAcceptAssignment}
            style={{
              marginLeft: '10px',
            }}>
            Accept
          </RegularButton>
          <RegularButton
            id={'rejectButton'}
            color='danger'
            onClick={onRejectAssignment}>
            Reject
          </RegularButton>
        </Grid>
    );
};


export default AcceptAndRejectActionButtons ;