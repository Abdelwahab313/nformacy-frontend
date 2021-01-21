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
import { useStyles } from 'styles/Admin/questionFormStyles';
import LoadingCircle from 'components/progress/LoadingCircle';
import useFetchData from 'hooks/useFetchData';
import { fetchAdmins } from 'apis/adminsAPI';

const AdminsList = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const classes = useStyles();
  const { fetchedData: admins, isLoading } = useFetchData(() => {
    return fetchAdmins();
  });

  if (isLoading) {
    return <LoadingCircle />;
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12} className={classes.addAdminBtn}>
        <SubmitButton
          id={'addAdminBtn'}
          onClick={() => history.push(RoutesPaths.Admin.AddAdmin)}
          buttonText={
            <CustomTypography variant='body1'>
              {t('addAdminBtn')}
            </CustomTypography>
          }
        />
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardBody id='questionsList'>
            <AdminsTable admins={admins} />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
};

export default AdminsList;
