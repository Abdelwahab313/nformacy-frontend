import React from 'react';
import { Grid } from '@material-ui/core';
import { fieldsOfExperience } from 'constants/dropDownOptions';
import { useStyles } from 'styles/questionRoasterStyles';
import ThreeDotsDropdown from '../../components/ThreeDotsDropdown/ThreeDotsDropdown';
import t from '../../locales/en/questionRoaster';

const QuestionsFilter = ({ isAllClicked, onClickAll, filtersState, onClickFilter }) => {
  const classes = useStyles();
  let filtersList = [];
  const numberOfVisibleFilters = 5;
  for (let i = 0; i < numberOfVisibleFilters; i++) {
    filtersList.push(
      <div id={`filters-${i}`}
           className={filtersState[i] ? classes.activeFilterStyle : classes.inactiveFilterStyle}
           onClick={() => {
             onClickFilter(fieldsOfExperience[i], i);
           }}>
        {fieldsOfExperience[i].label}
      </div>,
    );
  }
  const filterDropdownOptions = [];
  for (let i = numberOfVisibleFilters; i < fieldsOfExperience.length; i++) {
    filterDropdownOptions.push(fieldsOfExperience[i]);
  }

  return (
    <Grid item xs={12} sm={10}>
      <Grid
        id={'filters'}
        container
        justify={'center'}
        className={classes.questionsCategoriesContainer}>
        <div onClick={() => onClickAll()}
             className={isAllClicked ? classes.activeFilterStyle : classes.inactiveFilterStyle}>
          {t['all']}
        </div>
        {filtersList.map((filter) => {
          return filter;
        })}
        <ThreeDotsDropdown
          list={filterDropdownOptions}/>
      </Grid>
    </Grid>
  );
};

export default QuestionsFilter;