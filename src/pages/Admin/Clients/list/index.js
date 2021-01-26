import React from 'react';
import GridItem from '../../../../components/grid/GridItem';

import Card from '../../../../components/card/Card';
import CardBody from '../../../../components/card/CardBody';
import GridContainer from '../../../../components/grid/GridContainer';
import SubmitButton from 'components/buttons/SubmitButton';
import CustomTypography from 'components/typography/Typography';
import { useTranslation } from 'react-i18next';
import { useStyles } from 'styles/Admin/questionFormStyles';
import ClientsTable from 'templates/clients/ClientsTable';

const ClientsList = () => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12} className={classes.addAdminBtn}>
        <SubmitButton
          id={'addClientBtn'}
          onClick={() => { }}
          buttonText={
            <CustomTypography variant='body1'>
              {t('addClientBtn')}
            </CustomTypography>
          }
        />
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardBody id='questionsList'>
            <ClientsTable clients={[]} />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
};

export default ClientsList;
