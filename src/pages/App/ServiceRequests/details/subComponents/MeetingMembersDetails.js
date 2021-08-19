import React from 'react';
import Collapse from '@material-ui/core/Collapse';
import CustomTypography from 'components/typography/Typography';
import { useTranslation } from 'react-i18next';
import { getUserName } from 'core/user';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
} from '@material-ui/core';
import useStyles from '../styles/ShortlistCandidate';
import authManager from 'services/authManager';
import DefaultSummary from './DefaultSummary';
import Transition from 'components/animations/Transition';
import JoinJitsiMeetingButton from 'components/buttons/JoinJitsiMeetingButton';

const MeetingMembersDetails = ({
  candidate,
  isFocused,
  setFocusedCandidate,
  bgcolor,
  meeting,
  clientType = '',
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const isAdmin = authManager.isAdmin();
  const defaultImage = require('../../../../../assets/emptyavatar.jpg');
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.candidateContainerBorder}>
      <Dialog
        TransitionComponent={Transition}
        maxWidth='lg'
        onClose={handleClose}
        open={open}>
        <DialogContent>
          <Grid container>
            <DefaultSummary candidate={candidate} />
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary' autoFocus>
            {t('cancel')}
          </Button>
        </DialogActions>
      </Dialog>
      <Collapse in={isFocused} collapsedHeight={350} timeout={500}>
        <Grid
          container
          justify='center'
          onMouseEnter={() => setFocusedCandidate(candidate.id)}
          onMouseLeave={() => setFocusedCandidate('')}>
          <Box
            style={{ backgroundColor: bgcolor }}
            textAlign='center'
            width={1}>
            <Grid item xs={12} md={12}>
              <img
                src={!!candidate.avatar ? candidate.avatar : defaultImage}
                className={classes.candidateImg}
              />
            </Grid>
          </Box>
          <Box p={2} textAlign='center'>
            <Grid item xs={12}>
              <CustomTypography variant='h6' fontWeight='bold'>
                {getUserName(candidate)}
              </CustomTypography>
              <Button
                onClick={handleClickOpen}
                className={classes.defaultSummaryBtn}>
                {t('summary')}
              </Button>
              <CustomTypography
                variant='body1'
                fontWeight='light'
                className={classes.candidateDesc}></CustomTypography>
            </Grid>

            <JoinJitsiMeetingButton
              buttonText={'Join call'}
              meetingRoomId={meeting.jitsiRoomName}
            />

            <Grid item xs={12}>
              {!!isAdmin && <CustomTypography>{clientType}</CustomTypography>}
            </Grid>
          </Box>
        </Grid>
      </Collapse>
    </div>
  );
};

export default MeetingMembersDetails;
