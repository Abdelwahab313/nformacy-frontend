import React from 'react';

import { TextField } from '@material-ui/core';
import useStyles from 'pages/App/MeetingEvaluation/styles/RatingStyles';

const CommentBox = ({ comment, setComment, ...props }) => {
  const classes = useStyles();

  return (
    <TextField
      multiline
      rowsMax={6}
      rows={4}
      variant='outlined'
      className={classes.commentField}
      value={comment}
      onChange={(event) => setComment(event.target.value)}
      {...props}
    />
  );
};

export default CommentBox;
