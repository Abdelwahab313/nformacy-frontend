import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import HelpIcon from '@material-ui/icons/Help';
import selectedToolbarStyle from '../../styles/tableSelectedToolBar';

const TableSelectedToolBar = ({ onUpdate, onView }) => {
  const classes = selectedToolbarStyle();
  return (
    <div>
      <Tooltip title='التفاصيل'>
        <IconButton
          className={classes.iconButton}
          id={'show_details_client_btn'}
          onClick={onView}
          aria-label='التفاصيل'>
          <HelpIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default TableSelectedToolBar;
