import React from 'react';
import { Grid } from '@material-ui/core';
import { fieldsOfExperience } from 'constants/dropDownOptions';
import withStyles from '@material-ui/core/styles/withStyles';
import Chip from '@material-ui/core/Chip';
import { lightPink } from 'styles/colors';
import { useStyles } from 'styles/questionRoasterStyles';


const StyledChip = withStyles({
  root: {
    '&:hover': {
      backgroundColor: lightPink,
    },
  },
})(Chip);

const QuestionsFilter = ({ isAllClicked, onClickAll, filtersState, onClickFilter, onDeleteFilter }) => {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={10}>
      <Grid
        id={'filters'}
        container
        justify={'center'}
        className={classes.questionsCategoriesContainer}>
        <StyledChip
          label='All'
          onClick={() => onClickAll()}
          color='primary'
          variant={isAllClicked ? 'default' : 'outlined'}
          clickable={true}
          className={classes.fieldNameFilterStyles}
        />
        {fieldsOfExperience.map((field, key) => {
          return (
            <StyledChip
              key={key}
              id={`filters-${key}`}
              label={field.label}
              onClick={() => {
                onClickFilter(field, key);
              }}
              onDelete={filtersState[key] ? () => {
                onDeleteFilter(field, key);
              } : null}
              color='primary'
              clickable={true}
              variant={filtersState[key] ? 'default' : 'outlined'}
              className={classes.fieldNameFilterStyles}
            />
          );
        })}
      </Grid>
    </Grid>
  );
};

export default QuestionsFilter;