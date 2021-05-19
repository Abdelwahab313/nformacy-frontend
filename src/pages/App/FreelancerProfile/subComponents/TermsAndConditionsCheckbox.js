import React from 'react';
import { useStyles } from 'styles/formsStyles';
import {
  Checkbox,
  FormControlLabel,
  Dialog,
  DialogContent,
  Button,
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import SubmitButton from 'components/buttons/SubmitButton';
import Transition from 'components/animations/Transition';
import CustomTypography from 'components/typography/Typography';

const TermsAndConditionsCheckbox = ({ isTermsChecked, setIsTermsChecked }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const onTermsChecked = () => {
    setIsTermsChecked(!isTermsChecked);
  };

  return (
    <>
      <FormControlLabel
        control={
          <Checkbox
            onChange={onTermsChecked}
            name='termsChecked'
            color='primary'
            checked={isTermsChecked}
          />
        }
        label={
          <CustomTypography
            className={classes.termsLinkColor}
            onClick={handleClickOpen}>
            I agree with the terms and conditions
          </CustomTypography>
        }
      />
      <Dialog
        TransitionComponent={Transition}
        maxWidth='lg'
        PaperProps={{ id: 'termsAndConditionsDialog' }}
        onClose={handleClose}
        open={open}>
        <DialogContent>
          <Grid container>
            <Grid item md={12}>
              <CustomTypography fontWeight='fontWeightBold' variant='h5'>
                Terms and Conditions
              </CustomTypography>
            </Grid>
            <Grid item md={12} className={classes.comingSoon}>
              Coming Soon!
            </Grid>
            <Grid item md={6}>
              <SubmitButton onClick={handleClose} buttonText='Agree' />
            </Grid>
            <Grid item md={6}>
              <Button
                onClick={handleClose}
                variant='contained'
                className={classes.cancelConditionsBtn}>
                Cancel
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TermsAndConditionsCheckbox;