import React from 'react';
import { Grid } from '@material-ui/core';
import CustomTypography from 'components/typography/Typography';
import SubmitButton from 'components/buttons/SubmitButton';
import { makeStyles } from '@material-ui/core/styles';
import { turquoise } from 'styles/colors';

const ContinueLater = ({ onClickSaveLater }) => {
  const classes = useStyles();

  return (
    <Grid
      className={classes.container}
      container
      alignItems='center'
      justify='center'>
      <CustomTypography component='span' variant='h6'>
        You can continue the form later
      </CustomTypography>
      <SubmitButton
        id='continueLater'
        buttonText='complete later'
        color='secondary'
        onClick={onClickSaveLater}
        className={classes.continueLaterBtn}
      />
    </Grid>
  );
};

const useStyles = makeStyles(() => ({
  container: {
    padding: '10px 0',
    backgroundColor: turquoise,
  },
  continueLaterBtn: {
    margin: '0 8px',
    alignSelf: 'flex-start',
  },
}));

export default ContinueLater;
