import React from 'react';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';

function MeetingScheduledSection({ selectedFreelancer }) {
  const meetingTime = moment(selectedFreelancer.scheduledTime).format(
    'DD-MM-YYYY hh:mm A',
  );
  return (
    <Typography variant='h6' align='center'>
      {`Meeting has been scheduled with ${selectedFreelancer.user.firstName} at ${meetingTime}`}
    </Typography>
  );
}

export default MeetingScheduledSection;
