import React from 'react';
import { Grid } from '@material-ui/core';
import RegularButton from 'components/buttons/RegularButton';

import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  rejectButton: {
    fontSize: '0.972vw',
    height: '40px',
    borderRadius: '9px',
  },
  acceptButton: {
    marginLeft: '10px',
    fontSize: '0.972vw',
    height: '40px',
    borderRadius: '9px',
  },
}));

const AcceptAndRejectActionButtons = ({
  acceptButtonProps,
  rejectButtonProps,
}) => {
  const classes = useStyles();

  return (
    <Grid container direction='row-reverse' alignItems='flex-end'>
      <RegularButton
        className={classes.acceptButton}
        color='success'
        {...acceptButtonProps}>
        Accept
      </RegularButton>
      <RegularButton
        className={classes.rejectButton}
        color='danger'
        {...rejectButtonProps}>
        Reject
      </RegularButton>
    </Grid>
  );
};

export default AcceptAndRejectActionButtons;
