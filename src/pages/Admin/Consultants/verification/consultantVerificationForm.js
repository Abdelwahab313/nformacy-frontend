import React, { Fragment, useState, useEffect } from 'react';
import GridContainer from 'components/grid/GridContainer';
import GridItem from 'components/grid/GridItem';
import useFieldFetcher from 'hooks/useFieldsFetcher';
import LoadingCircle from 'components/progress/LoadingCircle';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, FormControlLabel, Radio, RadioGroup, TextField, InputLabel } from '@material-ui/core';
import authManager from 'services/authManager';
import { getMajorFieldsFromSubfields } from 'core/fields';

const ConsultantVerificationForm = () => {
  const classes = useStyles();
  const currentUser = authManager.retrieveCurrentUser();
  const subFields = currentUser.fields;
  const { fields: fieldsLabels, loading } = useFieldFetcher();
  const majorFields = getMajorFieldsFromSubfields(fieldsLabels, subFields);



  const [consultantEvaluation, setConsultantEvaluation] = useState({ fieldsEvaluation: [], hourlyRate: 0, comment: '', isVerified: false });

  useEffect(() => {
    if (!!majorFields) {
      const majorFieldsWithRating = majorFields?.map((field) => ({
        id: field.id,
        label: field.label,
        rating: field.rating,
      }));
      setConsultantEvaluation({ ...consultantEvaluation, fieldsEvaluation: majorFieldsWithRating });
    }
  }, [majorFields?.length]);

  const handleFieldsEvaluation = (e, fieldId) => {
    const newFieldsEvaluation = consultantEvaluation?.fieldsEvaluation?.map(field => field.id == fieldId ? { ...field, rating: e.target.value } : field);
    setConsultantEvaluation({ ...consultantEvaluation, fieldsEvaluation: [...newFieldsEvaluation] });
  };

  if (loading)
    return (
      <LoadingCircle size={15} containerClass={classes.loadingContainer} />
    );

  return (
    <form noValidate autoComplete="off">
      {consultantEvaluation?.fieldsEvaluation?.map((field, key) => {
        return (
          <Fragment>
            <Grid container>
              <Grid item xs={6}>
                <div key={key}>{field.label}</div>
              </Grid>
              <Grid item xs={6}>
                <RadioGroup row aria-label="position" name="position" onChange={(e) => handleFieldsEvaluation(e, field.id)}>
                  <GridContainer>
                    <GridItem xs={3}>
                      <FormControlLabel
                        value="0"
                        control={<Radio color="primary" />}
                        label="Junior"
                        labelPlacement="end"
                      />
                    </GridItem>
                    <GridItem xs={3}>
                      <FormControlLabel
                        value="1"
                        control={<Radio color="primary" />}
                        label="Mid"
                        t="end"
                      />
                    </GridItem>
                    <GridItem xs={3}>
                      <FormControlLabel
                        value="2"
                        control={<Radio color="primary" />}
                        label="Expert"
                        labelPlacement="end"
                      />
                    </GridItem>
                    <GridItem xs={3}>
                      <FormControlLabel
                        value="3"
                        control={<Radio color="primary" />}
                        label="Guru"
                        labelPlacement="end"
                      />
                    </GridItem>
                  </GridContainer>
                </RadioGroup>
              </Grid>
            </Grid>
          </Fragment>
        );
      })}

      <GridContainer>
        <GridItem xs={3}>
          <InputLabel shrink>Hourly Rated Requested:</InputLabel>
        </GridItem>
        <GridItem xs={9}>
          <TextField id="outlined-basic" variant="outlined" />
        </GridItem>
      </GridContainer>
      <br />
      <GridContainer>
        <GridItem xs={3}>
          <InputLabel shrink>Comments:</InputLabel>
        </GridItem>
        <GridItem xs={9}>
          <TextField id="outlined-basic" variant="outlined" />
        </GridItem>
      </GridContainer>
      <br />
      <GridContainer>
        <GridItem xs={3}>
          <InputLabel shrink>Confirm as a Verified Consultant:</InputLabel>
        </GridItem>
        <GridItem xs={9}>
          <RadioGroup row aria-label="position" name="position">
            <GridContainer>
              <GridItem xs={6}>
                <FormControlLabel
                  value="yes"
                  control={<Radio color="primary" />}
                  label="Yes"
                  labelPlacement="end"
                />
              </GridItem>
            </GridContainer>
            <GridItem xs={6}>
              <FormControlLabel
                value="no"
                control={<Radio color="primary" />}
                label="No"
                labelPlacement="end"
              />
            </GridItem>
          </RadioGroup>
        </GridItem>
      </GridContainer>
    </form>
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

export default ConsultantVerificationForm; 