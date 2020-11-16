import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useFieldFetcher from 'hooks/useFieldsFetcher';
import LoadingCircle from '../progress/LoadingCircle';
import Chip from '@material-ui/core/Chip';
import { getMajorFieldsFromSubfields } from 'core/fields';

const FieldsChips = ({ fields }) => {
  const classes = useStyles();
  const { fields: fieldsLabels, loading } = useFieldFetcher();
  const majorFields = getMajorFieldsFromSubfields(fieldsLabels, fields);

  if (loading)
    return (
      <LoadingCircle size={15} containerClass={classes.loadingContainer} />
    );

  return majorFields.map((field) => (
    <div key={field.id}>
      <Chip className={classes.field} label={field.label} key={field.id} />
    </div>
  ));
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

export default FieldsChips;
