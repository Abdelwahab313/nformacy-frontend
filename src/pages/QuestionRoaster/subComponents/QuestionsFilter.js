import React, { useMemo } from 'react';
import { Grid } from '@material-ui/core';
import { fieldsOfExperience } from 'constants/dropDownOptions';
import { useStyles } from 'styles/questionRoasterStyles';
import ThreeDotsDropdown from './ThreeDotsDropdown';
import LanguagesDropdownMenu from './LanguagesDropdownMenu';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import clsx from 'clsx';
import { useQuestionRoasterContext } from '../context';
import {
  addFieldFilter,
  removeFieldFilter,
  resetFieldsFilters,
} from '../context/questionsRoasterAction';
import { useTranslation } from 'react-i18next';

const QuestionsFilter = () => {
  const classes = useStyles();
  const [{ fieldsFilters }, dispatch] = useQuestionRoasterContext();
  const { t } = useTranslation();

  const isAllClicked = useMemo(() => fieldsFilters.length === 0, [
    fieldsFilters,
  ]);
  const fieldsFiltersToDisplay = useMemo(() => {
    return fieldsOfExperience.map((field) => ({
      value: field.value,
      label: field.label,
      isClicked: fieldsFilters.includes(field.value),
    }));
  }, [fieldsFilters]);

  const onClickFilter = (field, isClicked) => {
    if (isClicked) {
      removeFieldFilter(dispatch, field);
    } else {
      addFieldFilter(dispatch, field);
    }
  };
  const onClickAll = () => {
    resetFieldsFilters(dispatch);
  };
  let filtersList = [];
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
          onClickFilter(value, isClicked);
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
            {isAllClicked ? t('questionRoaster:all') : t('questionRoaster:clearAll')}
          </div>
          {filtersList.map((filter) => {
            return filter;
          })}
          <ThreeDotsDropdown
            numberOfVisibleFilters={numberOfVisibleFilters}
            onClickFilter={onClickFilter}
            list={filterDropdownOptions}
            fieldsFilters={fieldsFilters}
          />
        </Grid>
        <Grid item md={2} className={classes.languageFilterContainer}>
          <LanguagesDropdownMenu
            isMobile={false}
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
            {t('questionRoaster:all')}
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
                  onClickFilter(field.value, field.isClicked);
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
            isMobile={true}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default QuestionsFilter;
