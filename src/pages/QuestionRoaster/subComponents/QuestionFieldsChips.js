import React from 'react';
import { Grid, Tooltip } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { useStyles } from '../../../styles/questionRoasterStyles';
import styled from 'styled-components';
import Chip from '@material-ui/core/Chip';
import * as colors from '../../../styles/colors';
import useFieldsFetcher from '../../../hooks/useFieldsFetcher';
import { groupFieldsByMajorFieldId } from '../../../core/fields';
import LoadingCircle from '../../../components/progress/LoadingCircle';

const StyledFilterChip = styled(Chip)`
  background-color: ${(props) => getColorForField(props.index)};
`;
const getColorForField = (index) => {
  if (index === 0 || index % 3 === 0) {
    return colors.turquoise;
  } else if (isInSecondSequence(index)) {
    return colors.darkOrange;
  }
  return colors.lightOrange;
};

const isInSecondSequence = (number) => {
  for (let i = 1; i <= number; i += 3) {
    if (i === number) return true;
  }
  return false;
};

const QuestionFieldsChips = ({ questionDetails }) => {
  const classes = useStyles();
  const { fields: fieldsLabels, loading } = useFieldsFetcher();

  if (loading) {
    return (
      <Grid item xs={6}>
        <LoadingCircle containerClass={classes.loadingContainer} />
      </Grid>
    );
  }

  const groupedFields = groupFieldsByMajorFieldId(
    fieldsLabels,
    questionDetails.fields,
  );
  return (
    <Grid className={classes.fieldContainer}>
      {groupedFields?.map((majorField, key) => (
        <Grid>
          <Tooltip
            title={
              <Typography>
                {majorField.subfields.map((field, key) => (
                  <Grid
                    key={key}
                    id={`questionSubFields-${questionDetails.referenceNumber}-${key}`}
                    item>
                    {field.label}
                  </Grid>
                ))}
              </Typography>
            }>
            <StyledFilterChip
              key={key}
              index={key}
              className={classes.fieldChip}
              label={
                <Typography
                  id={`questionMajorFields-${questionDetails.referenceNumber}-${key}`}
                  className={classes.fieldChipText}>
                  {majorField.majorFieldLabel}
                </Typography>
              }
            />
          </Tooltip>
        </Grid>
      ))}
    </Grid>
  );
};

export default QuestionFieldsChips;
