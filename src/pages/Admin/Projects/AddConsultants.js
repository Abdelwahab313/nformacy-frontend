import React from 'react';
import GridContainer from 'components/grid/GridContainer';
import GridItem from 'components/grid/GridItem';
import AddConsultantsTable from './AddConsultantsTable';
import { fetchConsultantsList } from 'apis/projectsAPI';
import useFetchData from 'hooks/useFetchData';
import LoadingCircle from 'components/progress/LoadingCircle';
import SubmitButton from 'components/buttons/SubmitButton';
import { useStyles } from 'styles/Admin/postProjectStyles';
import { useTranslation } from 'react-i18next';

const AddConsultants = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  const { fetchedData: consultants, isLoading } = useFetchData(() => {
    return fetchConsultantsList();
  });

  if (isLoading) {
    return <LoadingCircle />;
  }

  return (
    <GridContainer>
      <GridItem xs={12}>
        <AddConsultantsTable consultants={consultants} />
      </GridItem>
      <GridItem xs={12}>
        <SubmitButton
          id='postProjectButton'
          className={classes.addNewConsultantBtn}
          buttonText={t('createNewConsultant')}
          onClick={() => {}}
        />
      </GridItem>
    </GridContainer>
  );
};
export default AddConsultants;
