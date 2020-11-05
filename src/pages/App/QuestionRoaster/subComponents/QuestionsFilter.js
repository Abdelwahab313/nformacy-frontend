import React, { useMemo } from 'react';
import { Grid } from '@material-ui/core';
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
import useFieldsFetcher from '../../../../hooks/useFieldsFetcher';
import LoadingCircle from '../../../../components/progress/LoadingCircle';

const QuestionsFilter = () => {
  const classes = useStyles();
  const [{ fieldsFilters }, dispatch] = useQuestionRoasterContext();
  const { fields: fieldsLabels, loading } = useFieldsFetcher();
  const { t } = useTranslation();

  const isAllClicked = useMemo(() => fieldsFilters.length === 0, [
    fieldsFilters,
  ]);
  const fieldsFiltersToDisplay = useMemo(() => {
    if (!!!fieldsLabels) return [];
    return fieldsLabels?.map((field) => ({
      id: field.id,
      label: field.label,
      isClicked: fieldsFilters.includes(field.id),
    }));
  }, [fieldsFilters, loading]);

  if (loading) {
    return (
      <Grid data-testid={'loading'} item xs={6}>
        <LoadingCircle containerClass={classes.loadingContainer} />
      </Grid>
    );
  }

  const onClickFilter = (fieldId, isClicked) => {
    if (isClicked) {
      removeFieldFilter(dispatch, fieldId);
    } else {
      addFieldFilter(dispatch, fieldId);
    }
  };
  const onClickAll = () => {
    resetFieldsFilters(dispatch);
  };
  const NUMBER_OF_VISIBLE_FILTERS = 4;

  const visibleFilters = fieldsFiltersToDisplay?.slice(
    0,
    NUMBER_OF_VISIBLE_FILTERS,
  );
  const filterDropdownOptions = fieldsFiltersToDisplay?.slice(
    NUMBER_OF_VISIBLE_FILTERS,
    fieldsFiltersToDisplay.length,
  );

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
            {isAllClicked
              ? t('questionRoaster:all')
              : t('questionRoaster:clearAll')}
          </div>
          {visibleFilters?.map((filter, key) => {
            return (
              <div
                key={key}
                id={`filters-${key}`}
                className={clsx({
                  [classes.activeFilterStyle]: filter.isClicked,
                  [classes.inactiveFilterStyle]: !filter.isClicked,
                })}
                onClick={() => {
                  onClickFilter(filter.id, filter.isClicked);
                }}>
                {filter.label}
              </div>
            );
          })}
          <ThreeDotsDropdown
            onClickFilter={onClickFilter}
            list={filterDropdownOptions}
          />
        </Grid>
        <Grid item md={2} className={classes.languageFilterContainer}>
          <LanguagesDropdownMenu isMobile={false} />
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
                  onClickFilter(field.id, field.isClicked);
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
          <LanguagesDropdownMenu isMobile={true} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default QuestionsFilter;
