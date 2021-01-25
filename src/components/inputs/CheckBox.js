import React from 'react';

import { Checkbox } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

import { darkBlue } from 'styles/colors';
import { lightBlue } from '@material-ui/core/colors';

const CheckBox = withStyles({
  root: {
    color: lightBlue,
    '&$checked': {
      color: darkBlue,
    },
  },
  checked: {},
})((props) => <Checkbox color='default' {...props} />);

export default CheckBox;
