import React from 'react';
import GridItem from '../../../../components/grid/GridItem';

import Card from '../../../../components/card/Card';
import CardBody from '../../../../components/card/CardBody';
import GridContainer from '../../../../components/grid/GridContainer';
import SubmitButton from 'components/buttons/SubmitButton';
import CustomTypography from 'components/typography/Typography';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { useStyles } from 'styles/Admin/questionFormStyles';
import { RoutesPaths } from 'constants/routesPath';
import AccountsTable from 'pages/App/Accounts/list/AccountsTable';
import useFetchData from 'hooks/useFetchData';
import { fetchAccounts } from 'apis/accountsAPI';
import LoadingCircle from 'components/progress/LoadingCircle';

const CorporateAccountsList = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const classes = useStyles();
  const { fetchedData: accounts, isLoading } = useFetchData(() => {
    return fetchAccounts();
  });

  if (isLoading) {
    return <LoadingCircle />;
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12} className={classes.addAdminBtn}>
        <div className={classes.corporateList}>

          <SubmitButton
            id={'addNewAccount'}
            onClick={() => history.push(RoutesPaths.App.AddAccount)}
            buttonText={
              <CustomTypography variant='body1'>
                {t('addNewAccount')}
              </CustomTypography>
            }
          />
        </div>
      </GridItem>

      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardBody id='questionsList' className={classes.cardBodyAcountsList}>
            <AccountsTable accounts={accounts} />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
};

export default CorporateAccountsList;
