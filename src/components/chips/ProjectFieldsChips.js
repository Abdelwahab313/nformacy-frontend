import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

const ProjectFieldsChips = ({ majorFields, fields }) => {
  const classes = useStyles();

  return (
    <>
      {majorFields.map((majorField) => (
        <Chip
          className={classes.field}
          label={majorField.label}
          key={majorField.id}
        />
      ))}
      {fields.map((field) => (
        <Chip className={classes.field} label={field.label} key={field.id} />
      ))}
    </>
  );
};

const useStyles = makeStyles(() => ({
  field: {
    margin: 2,
  },
  loadingContainer: {
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
  },
}));

export default ProjectFieldsChips;
