import React, { useMemo } from 'react';
import { Grid } from '@material-ui/core';
import { fieldsOfExperience } from 'constants/dropDownOptions';
import { useStyles } from 'styles/questionRoasterStyles';
import ThreeDotsDropdown from './ThreeDotsDropdown';
import t from 'locales/en/questionRoaster';
import LanguagesDropdownMenu from 'pages/QuestionRoaster/subComponents/LanguagesDropdownMenu';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import clsx from 'clsx';

const QuestionsFilter = ({
  selectedFieldsFilters,
  onClickAll,
  onClickFilter,
}) => {
  const classes = useStyles();
  let filtersList = [];

  const isAllClicked = useMemo(() => selectedFieldsFilters.length === 0, [
    selectedFieldsFilters,
  ]);

  const fieldsFiltersToDisplay = useMemo(() => {
    return fieldsOfExperience.map((field) => ({
      value: field.value,
      label: field.label,
      isClicked: selectedFieldsFilters.includes(field.value),
    }));
  }, [selectedFieldsFilters]);

  const numberOfVisibleFilters = 4;
  for (let i = 0; i < numberOfVisibleFilters; i++) {
    const { value, label, isClicked } = fieldsFiltersToDisplay[i];
    filtersList.push(
      <div
        key={i}
        id={`filters-${i}`}
        className={clsx({
          [classes.activeFilterStyle]: isClicked,
          [classes.inactiveFilterStyle]: !isClicked,
        })}
        onClick={() => {
          onClickFilter(value);
        }}>
        {label}
      </div>,
    );
  }
  const filterDropdownOptions = [];
  for (let i = numberOfVisibleFilters; i < fieldsFiltersToDisplay.length; i++) {
    filterDropdownOptions.push(fieldsFiltersToDisplay[i]);
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
            selectedFieldsFilters={selectedFieldsFilters}
          />
        </Grid>
        <Grid item md={2} className={classes.languageFilterContainer}>
          <LanguagesDropdownMenu
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
          {fieldsFiltersToDisplay.map((field, key) => {
            return (
              <div
                key={key}
                id={`filters-${key}`}
                className={clsx({
                  [classes.activeFilterStyle]: field.isClicked,
                  [classes.inactiveFilterStyle]: !field.isClicked,
                })}
                onClick={() => {
                  onClickFilter(field.value);
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
          <LanguagesDropdownMenu
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
