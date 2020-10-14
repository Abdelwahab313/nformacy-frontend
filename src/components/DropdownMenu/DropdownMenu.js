import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useStyles } from '../../styles/questionRoasterStyles';

const DropdownMenu = ({ id, menuText, dropdownClass, icon }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const classes = useStyles();

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id={id}
        className={dropdownClass}
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}>
        {menuText}
        {icon ? <ExpandMoreIcon id={'expand-menu-icon'} fontSize={'small'}/> : ''}
      </Button>
      <Menu
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        keepMounted
        PaperProps={{
          style: {
            borderRadius: '9px',
            padding: '15px 5px',
            minWidth: '13.5%',
          },
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        className={classes.openedDropdownMenu}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>All Langauges </MenuItem>
        <MenuItem onClick={handleClose}>Arabic</MenuItem>
        <MenuItem onClick={handleClose}>English</MenuItem>
      </Menu>
    </div>
  );
};

export default DropdownMenu;