import Button from '@material-ui/core/Button';
import React from 'react';
import { CANCEL_BUTTON, DELETE_BUTTON, SAVE_BUTTON } from '@devexpress/dx-scheduler-core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  actionButton: {
    margin: theme.spacing(1),
  },
}));
const CalenderCommandButtons = ({ id, onExecute, disableSaveButton }) => {
  const classes = useStyles();

  switch (id) {
    case SAVE_BUTTON:
      return (
        <Button
          id={id}
          className={classes.actionButton}
          color='primary'
          onClick={onExecute}
          variant='contained'
          disabled={disableSaveButton}>
          Save
        </Button>
      );
    case DELETE_BUTTON:
      return (
        <IconButton
          className={classes.actionButton}
          id={id}
          onClick={onExecute}>
          <DeleteIcon />
        </IconButton>
      );
    case CANCEL_BUTTON:
      return <></>;
  }
};

export default CalenderCommandButtons;
