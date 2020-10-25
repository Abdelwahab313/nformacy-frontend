import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useStyles } from '../../../styles/questionRoasterStyles';
import clsx from 'clsx';
import useLocale from '../../../hooks/localization/useLocale';
import DIRECTIONS from '../../../constants/direction';

const ITEM_HEIGHT = 48;

const ThreeDotsDropdown = ({ list, onClickFilter }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const classes = useStyles();
  const { locale } = useLocale();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        className={classes.threeDotButton}
        aria-label='more'
        aria-controls='long-menu'
        aria-haspopup='true'
        onClick={handleClick}
        id={'more-options-menu'}>
        <MoreHorizIcon id={'more-options-icon'} fontSize={'default'} />
      </IconButton>
      <Menu
        id='long-menu'
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
        {list.map((field, key) => (
          <MenuItem
            dir={DIRECTIONS[locale]}
            className={clsx(classes.menuItem, {
              [classes.selectedMenuItem]: field.isClicked,
            })}
            selected={field.isClicked}
            key={key}
            onClick={() => {
              handleClose();
              onClickFilter(field.value, field.isClicked);
            }}>
            {field.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default ThreeDotsDropdown;
