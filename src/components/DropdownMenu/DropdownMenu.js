import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const DropdownMenu = ({id, menuText, dropdownClass, icon}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

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
        {icon ? <ExpandMoreIcon id={'expand-menu-icon'} fontSize={'small'} /> : ''}
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
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