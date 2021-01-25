import React from 'react';

import { FormControlLabel, Box } from '@material-ui/core';
import GridContainer from 'components/grid/GridContainer';
import GridItem from 'components/grid/GridItem';
import { useStyles } from 'styles/Admin/questionFormStyles';
import { ADMIN_ROLES } from 'constants/userRoles';
import { useTranslation } from 'react-i18next';
import CheckBox from 'components/inputs/CheckBox';

const AdminRoles = ({ roles, setRoles }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const onChangeRole = (role, isChecked) => {
    setRoles({ ...roles, [role]: isChecked });
  };

  return (
    <Box className={[classes.checkboxContainer, classes.inputsRow]}>
      <GridContainer>
        {Object.keys(ADMIN_ROLES).map((role) => (
          <RoleCheck
            isChecked={roles[role]}
            onChange={(e) => onChangeRole(role, e.target.checked)}
            label={t(role)}
          />
        ))}
      </GridContainer>
    </Box>
  );
};

const RoleCheck = ({ isChecked, onChange, label }) => {
  return (
    <GridItem xs={12} sm={12} md={4}>
      <FormControlLabel
        control={<CheckBox checked={isChecked} onChange={onChange} />}
        label={label}
      />
    </GridItem>
  );
};

export default AdminRoles;
