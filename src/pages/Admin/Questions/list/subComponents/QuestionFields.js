import { useStyles } from '../../../../../styles/Admin/questionTableStyles';
import useFieldFetcher from '../../../../../hooks/useFieldsFetcher';
import LoadingCircle from '../../../../../components/progress/LoadingCircle';
import Chip from '@material-ui/core/Chip';
import React from 'react';
import { getMajorFieldsFromSubfields } from '../../../../../core/fields';

const QuestionFields = ({ fields }) => {
  const classes = useStyles();
  const { fields: fieldsLabels, loading } = useFieldFetcher();
  const majorFields = getMajorFieldsFromSubfields(fieldsLabels, fields);

  if (loading)
    return (
      <LoadingCircle size={15} containerClass={classes.loadingContainer}/>
    );

  return (majorFields.map((field) => (
    <div key={field.id}>
      <Chip
        className={classes.field}
        label={field.label}
        key={field.id}
      />
    </div>
  )));
};

export default QuestionFields;
