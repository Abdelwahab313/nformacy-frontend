import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import selectedToolbarStyle from '../styles/tableSelectedToolBar';
const TableSelectedToolBar = ({ onUpdate }) => {
  const classes = selectedToolbarStyle();
  return (
    <Tooltip title='تعديل'>
      <IconButton
        className={classes.iconButton}
        id={'edit_product_btn'}
        onClick={onUpdate}
        aria-label='تعديل'>
        <EditIcon />
      </IconButton>
    </Tooltip>
  );
};

export default TableSelectedToolBar;
