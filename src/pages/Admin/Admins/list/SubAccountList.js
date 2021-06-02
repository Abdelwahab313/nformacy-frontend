import React from 'react';
import GridItem from '../../../../components/grid/GridItem';
import Card from '../../../../components/card/Card';
import CardBody from '../../../../components/card/CardBody';
import GridContainer from '../../../../components/grid/GridContainer';
import LoadingCircle from 'components/progress/LoadingCircle';
import useFetchData from 'hooks/useFetchData';
import AccountsTable from 'pages/App/Accounts/list/AccountsTable';
import { fetchAccounts } from 'apis/accountsAPI';
import { useLocation } from 'react-router';

const SubAccountList = () => {
  const location = useLocation();
  const corporateId = location?.state?.corporateId;

  const { fetchedData: clients, isLoading } = useFetchData(() => {
    return fetchAccounts(corporateId);
  });

  if (isLoading) {
    return <LoadingCircle />;
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardBody id='questionsList'>
            <AccountsTable clients={clients} />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
};

export default SubAccountList;
