import React from 'react';
import GridItem from '../../../../components/grid/GridItem';

import Card from '../../../../components/card/Card';
import CardBody from '../../../../components/card/CardBody';
import GridContainer from '../../../../components/grid/GridContainer';
import SubmitButton from 'components/buttons/SubmitButton';
import CustomTypography from 'components/typography/Typography';
import { useTranslation } from 'react-i18next';
import { useStyles } from 'styles/Admin/questionFormStyles';
import ConsultantsTable from 'templates/consultants/ConsultantsTable';
import { fetchConsultants } from 'apis/consultantsAPI';
import useFetchData from 'hooks/useFetchData';
import LoadingCircle from 'components/progress/LoadingCircle';

const ConsultantsList = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { fetchedData: consultants, isLoading } = useFetchData(() => {
    return fetchConsultants();
  });

  if (isLoading) {
    return <LoadingCircle />;
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12} className={classes.addAdminBtn}>
        <SubmitButton
          id={'addConsultantBtn'}
          onClick={() => { }}
          buttonText={
            <CustomTypography variant='body1'>
              {t('addConsultantBtn')}
            </CustomTypography>
          }
        />
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardBody id='questionsList'>
            <ConsultantsTable consultants={consultants} />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
};

export default ConsultantsList;
