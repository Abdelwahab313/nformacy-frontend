import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import HelpIcon from '@material-ui/icons/Help';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import selectedToolbarStyle from '../../styles/tableSelectedToolBar';

const TableSelectedToolBar = ({ onUpdate, onView, onResetPassword }) => {
  const classes = selectedToolbarStyle();
  return (
    <div>
      <Tooltip title='إعادة تعيين كلمة المرور'>
        <IconButton
          className={classes.iconButton}
          id={'reset_password_salesRep_btn'}
          onClick={onResetPassword}
          aria-label='إعادة تعيين كلمة المرور'>
          <VpnKeyIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title='تعديل'>
        <IconButton
          className={classes.iconButton}
          id={'edit_salesRep_btn'}
          onClick={onUpdate}
          aria-label='تعديل'>
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title='التفاصيل'>
        <IconButton
          className={classes.iconButton}
          id={'show_details_salesRep_btn'}
          onClick={onView}
          aria-label='التفاصيل'>
          <HelpIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default TableSelectedToolBar;
