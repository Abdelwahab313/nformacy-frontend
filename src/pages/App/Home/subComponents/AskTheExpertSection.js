import React, { useState } from 'react';
import { Grid, InputBase, Divider, Link, Box } from '@material-ui/core';
import useStyles from '../styles/HomePageStyles';
import { useTranslation } from 'react-i18next';
import SubmitButton from 'components/buttons/SubmitButton';

import CustomTypography from 'components/typography/Typography';
import { useHistory } from 'react-router';
import { RoutesPaths } from 'constants/routesPath';

const AskTheExpertSection = () => {
  const [questionTitle, setQuestionTitle] = useState('');
  const classes = useStyles();
  const { t } = useTranslation();

  const history = useHistory();

  const onClickProceed = () => {
    history.push(RoutesPaths.App.EditServiceRequest, {
      service: { assignmentType: 'question', content: questionTitle },
    });
  };

  return (
    <Box className={[classes.askQuestionBox, classes.pointsContainer]}>
      <Grid container className={classes.askExpertContainer}>
        <Grid xs={2} md={1}>
          <img
            color={'primary'}
            src={require('../../../../assets/question.svg')}
            width={'50%'}
          />
        </Grid>
        <Grid xs={10} md={11}>
          <form>
            <InputBase
              className={classes.askExpertInputField}
              onChange={(event) => setQuestionTitle(event.target.value)}
              placeholder={t('askTheExpert')}
            />
          </form>
        </Grid>
      </Grid>
      <Divider className={classes.dividers} />

      <Grid container>
        <Grid item xs={8} md={8}>
          <Link
            underline='none'
            className={classes.askQuestionLink}
            href='#'
            onClick={() => {}}>
            {t('writeGreatQuestion')}
          </Link>
          <Divider
            className={[classes.dividers, classes.writeQuestionBorder]}
          />
        </Grid>

        <Grid item xs={4} md={4} justify='center'>
          <SubmitButton
            id={'proceedBtn'}
            onClick={() => onClickProceed()}
            className={classes.proceedBtn}
            buttonText={
              <CustomTypography variant='body1'>
                {t('proceed')}
              </CustomTypography>
            }
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AskTheExpertSection;
