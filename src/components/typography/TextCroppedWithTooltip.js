import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

const TextCroppedWithTooltip = ({ text }) => {
  const classes = useStyles();
  const MaxCharNumber = 30;
  if (!text) {
    return '';
  }
  return (
    <Tooltip title={<Typography variant={'caption'}>{text}</Typography>} arrow>
      <Typography noWrap variant={'body2'} className={classes.tooltip}>
        {text.length > MaxCharNumber
          ? `${text.substring(0, MaxCharNumber)} ....`
          : text}
      </Typography>
    </Tooltip>
  );
};

const useStyles = makeStyles(() => ({
  tooltip: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}));

export default TextCroppedWithTooltip;
