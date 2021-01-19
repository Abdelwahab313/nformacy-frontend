import React from 'react';
import GridItem from '../../../../components/grid/GridItem';

import Card from '../../../../components/card/Card';
import CardBody from '../../../../components/card/CardBody';
import GridContainer from '../../../../components/grid/GridContainer';
import AdminsTable from 'templates/admins/AdminsTable';
import SubmitButton from 'components/buttons/SubmitButton';
import CustomTypography from 'components/typography/Typography';
import { useTranslation } from 'react-i18next';
import { RoutesPaths } from 'constants/routesPath';
import { useHistory } from 'react-router';

const AdminsList = () => {
  const { t } = useTranslation();
  const history = useHistory();
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardBody id='questionsList'>
            <AdminsTable />
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <SubmitButton
          id={'addAdminBtn'}
          onClick={() => history.push(RoutesPaths.Admin.AddAdmin)}
          // onClick={() => { }}
          buttonText={
            <CustomTypography variant='body1'>
              {t('addAdminBtn')}
            </CustomTypography>
          }
        />
      </GridItem>
    </GridContainer>
  );
};

export default AdminsList;
