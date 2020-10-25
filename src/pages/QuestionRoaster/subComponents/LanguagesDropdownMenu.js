import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useStyles } from '../../../styles/questionRoasterStyles';
import clsx from 'clsx';
import useLocale from '../../../hooks/localization/useLocale';
import DIRECTIONS from '../../../constants/direction';
import { addLanguageFilter } from '../context/questionsRoasterAction';
import { useQuestionRoasterContext } from '../context';

const languagesOfAssignment = [
  {
    label: 'All Langauges',
    shortcutLabel: 'E',
    value: '',
  },
  {
    label: 'English',
    shortcutLabel: 'EN',
    value: 'english',
  },
  {
    label: 'Arabic',
    shortcutLabel: 'AR',
    value: 'arabic',
  },
];
const LanguagesDropdownMenu = ({
  id,
  menuText,
  dropdownClass,
  icon,
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { locale } = useLocale();
  const [{ languageFilter }, dispatch] = useQuestionRoasterContext();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onClickItem = (value) => {
    handleClose();
    addLanguageFilter(dispatch, value);
  };
  return (
    <div>
      <Button
        id={id}
        className={dropdownClass}
        aria-controls='simple-menu'
        aria-haspopup='true'
        onClick={handleClick}>
        {menuText}
        {icon ? (
          <ExpandMoreIcon id={'expand-menu-icon'} fontSize={'small'} />
        ) : (
          ''
        )}
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
        open={Boolean(anchorEl)}
        onClose={handleClose}>
        {languagesOfAssignment.map((language, key) => (
          <MenuItem
            key={key}
            dir={DIRECTIONS[locale]}
            className={clsx(classes.menuItem, {
              [classes.selectedMenuItem]: languageFilter === language.value,
            })}
            onClick={() => onClickItem(language.value)}>
            {language.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default LanguagesDropdownMenu;
