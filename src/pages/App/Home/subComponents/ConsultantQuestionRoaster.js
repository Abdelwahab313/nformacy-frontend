import React from 'react';
import { Grid, Divider, Link, Box } from '@material-ui/core';
import useStyles from '../styles/HomePageStyles';
import { useTranslation } from 'react-i18next';
import SubmitButton from 'components/buttons/SubmitButton';
import ShowMore from 'components/typography/ShowMore';
import ColoredFieldsChips from '../../../../components/chips/ColoredFieldsChips';

import { formattedDateMonthAndDay } from 'services/dateTimeParser';
import CustomTypography from 'components/typography/Typography';
import { useHistory } from 'react-router';
import useFetchData from 'hooks/useFetchData';
import { fetchOpenedQuestions } from 'apis/questionsAPI';

import useLocale from 'hooks/localization/useLocale';
import createMarkup from 'services/markup';
import { RoutesPaths } from 'constants/routesPath';
import LoadingCircle from 'components/progress/LoadingCircle';

const ConsultantQuestionRoaster = () => {
  const { local } = useLocale();
  const { fetchedData: Questions, isLoading } = useFetchData(
    fetchOpenedQuestions,
  );

  const classes = useStyles();
  const { t } = useTranslation();

  const history = useHistory();

  const onClickMore = () => {
    history.push(RoutesPaths.App.Questions);
  };
  if (isLoading) {
    return <LoadingCircle />;
  }
  return (
    <Box className={classes.askQuestionBox}>
      <CustomTypography variant='h5' fontWeight='bold' gutterBottom>
        {t('topActiveQuestions')}
      </CustomTypography>
      <Box height={500} overflow={'scroll'}>
        {Questions.slice(0, 5).map((question) => (
          <Grid item>
            <Grid container alignItems='center' justify='space-between'>
              <Grid
                item
                xs={!!question.thumbnailUrl ? 9 : 12}
                className={classes.feedsLeftSide}>
                <CustomTypography
                  align={'left'}
                  variant='body2'
                  className={classes.feedsDate}>
                  {formattedDateMonthAndDay(
                    new Date(question.createdAt),
                    local,
                  )}
                </CustomTypography>
                <CustomTypography
                  align={'left'}
                  variant='body1'
                  className={classes.feedsSubText}>
                  <ShowMore>
                    <div
                      dangerouslySetInnerHTML={createMarkup(question.content)}
                    />
                  </ShowMore>
                </CustomTypography>
                <ColoredFieldsChips fields={question.fields} />
              </Grid>

              {!!question.thumbnailUrl && (
                <Grid item xs={3} md={3} className={classes.feedsRightSide}>
                  <img
                    className={classes.questionImg}
                    color={'primary'}
                    src={question.thumbnailUrl}
                  />
                </Grid>
              )}
            </Grid>
            <Divider className={classes.dividers} />
          </Grid>
        ))}
      </Box>
      <Grid container>
        <Grid item xs={8} md={8}>
          <Link
            underline='none'
            className={classes.askQuestionLink}
            href='#'
            onClick={() => onClickMore()}>
            {t('howToWriteBestAnswer')}
          </Link>
          <Divider
            className={[classes.dividers, classes.writeQuestionBorder]}
          />
        </Grid>

        <Grid item xs={4} md={4} justify='center'>
          <SubmitButton
            id={'readMoreBtn'}
            onClick={() => onClickMore()}
            className={classes.proceedBtn}
            buttonText={
              <CustomTypography variant='body1'>
                {t('goToQR')}
              </CustomTypography>
            }
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ConsultantQuestionRoaster;
