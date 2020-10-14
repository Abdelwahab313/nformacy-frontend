import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const ITEM_HEIGHT = 48;

const ThreeDotsDropdown = ({ list }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
        id={'more-options-menu'}
      >
        <MoreHorizIcon id={'more-options-icon'} fontSize={'large'}/>
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            borderRadius: '9px',
            padding: '15px 5px',
            maxHeight: ITEM_HEIGHT * 4.5,
            width: 'fit-content',
          },
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}>
        {list.map((option, key) => (
          <MenuItem key={key} onClick={handleClose}>
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default ThreeDotsDropdown;