import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import SubmitButton from 'components/buttons/SubmitButton';

const ActionButtonsContainer = ({ primaryButton, secondaryButton = {} }) => {
  const classes = useStyles();
  return (
    <Grid item xs={6} className={[classes.buttonsContainer]}>
      {!!secondaryButton?.buttonText && (
        <SubmitButton
          id={secondaryButton.id}
          onClick={secondaryButton.onClick}
          buttonText={secondaryButton.buttonText}
          className={[classes.buttonMargin]}
        />
      )}
      <SubmitButton
        id={primaryButton.id}
        onClick={primaryButton.onClick}
        buttonText={primaryButton.buttonText}
        className={[classes.buttonMargin]}
      />
    </Grid>
  );
};

const useStyles = makeStyles(() => ({
  buttonsContainer: {
    flexBasis: '100%',
    textAlign: 'right',
    marginTop: 20,
    maxWidth: '100%',
  },
  buttonMargin: {
    marginRight: '10px',
  },
}));

export default ActionButtonsContainer;
