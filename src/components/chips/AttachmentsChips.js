import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

const AttachmentsChips = ({ attachments }) => {
  const classes = useStyles();

  if (!attachments || attachments.length< 1) {
    return '';
  }
  return attachments.map((attachment) => (
    <Chip
      className={classes.chip}
      size='small'
      label={attachment.filename}
      onClick={() => {
        window.open(attachment.url, '_blank');
      }}
    />
  ));
};

const useStyles = makeStyles((theme) => ({
  chip: {
    margin: theme.spacing(1),
  },
}));

export default AttachmentsChips;
