import React from 'react';

import { FormControlLabel, Box, Checkbox } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import GridContainer from 'components/grid/GridContainer';
import GridItem from 'components/grid/GridItem';
import { useStyles } from 'styles/Admin/questionFormStyles';
import { darkBlue } from 'styles/colors';
import { lightBlue } from '@material-ui/core/colors';

const AdminRoles = ({ roles, setRoles }) => {
  const classes = useStyles();

  const onChangeRole = (role, isChecked) => {
    setRoles({ ...roles, [role]: isChecked });
  };

  return (
    <Box className={[classes.checkboxContainer, classes.inputsRow]}>
      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <FormControlLabel
            control={
              <AdminCheckbox
                checked={roles.requestsManager}
                onChange={(e) => {
                  onChangeRole('requestsManager', e.target.checked);
                }}
                name='requestsManager'
              />
            }
            label='Requests Manager'
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <FormControlLabel
            control={
              <AdminCheckbox
                checked={roles.questionsManager}
                onChange={(e) => {
                  onChangeRole('questionsManager', e.target.checked);
                }}
                name='questionsManager'
              />
            }
            label='Question Roaster Manager'
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <FormControlLabel
            control={
              <AdminCheckbox
                checked={roles.advisorsManager}
                onChange={(e) => {
                  onChangeRole('advisorsManager', e.target.checked);
                }}
                name='advisorsManager'
              />
            }
            label='Advisors Manager'
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <FormControlLabel
            control={
              <AdminCheckbox
                checked={roles.clientsManager}
                onChange={(e) => {
                  onChangeRole('clientsManager', e.target.checked);
                }}
                name='clientsManager'
              />
            }
            label='Clients Manager'
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <FormControlLabel
            control={
              <AdminCheckbox
                checked={roles.consultantsManager}
                onChange={(e) => {
                  onChangeRole('consultantsManager', e.target.checked);
                }}
                name='consultantsManager'
              />
            }
            label='Consultant Manager'
          />
        </GridItem>
      </GridContainer>
    </Box>
  );
};

const AdminCheckbox = withStyles({
  root: {
    color: lightBlue,
    '&$checked': {
      color: darkBlue,
    },
  },
  checked: {},
})((props) => <Checkbox color='default' {...props} />);

export default AdminRoles;
