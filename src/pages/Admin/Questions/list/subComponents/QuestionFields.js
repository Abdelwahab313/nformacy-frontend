import { useStyles } from '../../../../../styles/Admin/questionTableStyles';
import useFieldFetcher from '../../../../../hooks/useFieldsFetcher';
import LoadingCircle from '../../../../../components/progress/LoadingCircle';
import { flatMap } from 'lodash';
import Chip from '@material-ui/core/Chip';
import React from 'react';

const QuestionFields = ({ fields }) => {
  const classes = useStyles();
  const { getFieldLabel, loading } = useFieldFetcher();

  if (loading)
    return (
      <LoadingCircle size={15} containerClass={classes.loadingContainer} />
    );

  return flatMap(fields)?.map((field) => (
    <div>
      <Chip
        className={classes.field}
        label={getFieldLabel(parseInt(field.majorFieldId))}
        key={field.id}
      />
    </div>
  ));
};

export default QuestionFields;
