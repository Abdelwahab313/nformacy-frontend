import React from 'react';
import { Grid } from '@material-ui/core';
import { fieldsOfExperience } from 'constants/dropDownOptions';
import { useStyles } from 'styles/questionRoasterStyles';
import ThreeDotsDropdown from '../../components/ThreeDotsDropdown/ThreeDotsDropdown';
import t from '../../locales/en/questionRoaster';
import DropdownMenu from 'components/DropdownMenu/DropdownMenu';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import clsx from 'clsx';

const QuestionsFilter = ({
  isAllClicked,
  onClickAll,
  filtersState,
  onClickFilter,
}) => {
  const classes = useStyles();
  let filtersList = [];
  const numberOfVisibleFilters = 4;
  for (let i = 0; i < numberOfVisibleFilters; i++) {
    filtersList.push(
      <div
        key={i}
        id={`filters-${i}`}
        className={clsx({
          [classes.activeFilterStyle]: Boolean(filtersState[i]),
          [classes.inactiveFilterStyle]: !Boolean(filtersState[i]),
        })}
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
        justify={'space-evenly'}
        alignItems={'center'}
        className={classes.questionsCategoriesContainerDesktop}>
        <Grid item md={10} className={classes.fieldsFiltersContainer}>
          <div
            onClick={() => onClickAll()}
            className={clsx({
              [classes.activeFilterStyle]: isAllClicked,
              [classes.inactiveFilterStyle]: !isAllClicked,
            })}>
            {t['all']}
          </div>
          {filtersList.map((filter) => {
            return filter;
          })}
          <ThreeDotsDropdown
            numberOfVisibleFilters={numberOfVisibleFilters}
            onClickFilter={onClickFilter}
            list={filterDropdownOptions}
            filtersState={filtersState}
          />
        </Grid>
        <Grid item md={2} className={classes.languageFilterContainer}>
          <DropdownMenu
            dropdownClass={classes.dropdownDesktop}
            icon={true}
            id={'question-language-filter'}
            menuText={'Choose Langauge'}
          />
        </Grid>
      </Grid>
      <Grid
        container
        direction={'row'}
        justify={'center'}
        alignItems={'center'}
        className={classes.filterWrapper}>
        <Grid
          item
          xs={8}
          sm={9}
          id={'filters-mobile'}
          className={classes.questionsCategoriesContainerMobile}>
          <div
            onClick={() => onClickAll()}
            className={clsx({
              [classes.activeFilterStyle]: isAllClicked,
              [classes.inactiveFilterStyle]: !isAllClicked,
            })}>
            {t['all']}
          </div>
          {fieldsOfExperience.map((field, key) => {
            return (
              <div
                key={key}
                id={`filters-${key}`}
                className={clsx({
                  [classes.activeFilterStyle]: filtersState[key],
                  [classes.inactiveFilterStyle]: !filtersState[key],
                })}
                onClick={() => {
                  onClickFilter(field, key);
                }}>
                {field.label}
              </div>
            );
          })}
        </Grid>
        <Grid item xs={1} className={classes.nextIconSlider}>
          <NavigateNextIcon
            color={'primary'}
            className={classes.nextIconSize}
          />
        </Grid>
        <Grid item xs={2} sm={1} className={classes.dropdownMobile}>
          <DropdownMenu
            id={'question-language-filter-mobile'}
            icon={false}
            menuText={'E'}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default QuestionsFilter;
