import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import { useStyles } from 'styles/formsStyles';
import LoadingCircle from 'components/progress/LoadingCircle';
import { groupFieldsByMajorFieldId } from 'core/fields';


const FieldsView = ({ loading, currentUserFields, fields }) => {
  const classes = useStyles();

  if (loading) {
    return (
      <Grid data-testid={'loading'} item xs={6}>
        <LoadingCircle containerClass={classes.loadingContainer} />
      </Grid>
    );
  }
  const groupedFieldsByMajorId = groupFieldsByMajorFieldId(fields, currentUserFields);
  return (
    <Grid item xs={6} className={classes.centeredText}>
      {groupedFieldsByMajorId?.map((majorField, key) => (
        <Grid
          id='majorFieldsOfExperience'
          key={key}
          className={classes.fieldLabelStylesDesktop}>
          {majorField.majorFieldLabel + ':'}
          <Grid container>
            {majorField.subfields?.map((field, key) => (
              <Grid
                item
                className={classes.subFieldContainerStyles}
                key={key}>
                <Typography
                  gutterBottom
                  className={classes.subFieldValueStyles}>
                  {field.label}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Grid>
      ),
      )}
    </Grid>
  );
};

export default FieldsView;