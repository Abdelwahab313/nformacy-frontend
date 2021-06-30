import React, { useMemo, useRef, useState } from 'react';
import GridContainer from 'components/grid/GridContainer';
import GridItem from 'components/grid/GridItem';
import CardHeader from 'components/card/CardHeader';
import { Grid, Typography } from '@material-ui/core';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import AddProjectForm from './AddProjectForm';
import { RoutesPaths } from 'constants/routesPath';
import countryList from 'react-select-country-list';
import moment from 'moment';

const AddProject = () => {
  const [project, setProject] = useState({});
  const history = useHistory();
  const { t } = useTranslation();
  const richTextRef = useRef(null);
  const [countries] = useState(countryList().getData());

  const handleCreateProject = () => {
    history.push(RoutesPaths.Admin.AddProjectServiceForm);
  };
  const defaultTimeZone = useMemo(
    () => Intl.DateTimeFormat().resolvedOptions().timeZone,
    [],
  );
  const [initialRange] = useState({
    timeZone: defaultTimeZone,
    startDate: moment(),
    endDate: moment(),
  });
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <CardHeader color='primary'>
          <Grid container>
            <Grid item md={6} xs={6}>
              <Typography component={'h4'}>{t('addNewProject')}</Typography>
            </Grid>
          </Grid>
        </CardHeader>
        <AddProjectForm
          project={project}
          options={countries}
          richTextRef={richTextRef}
          setProject={setProject}
          initialRange={initialRange}
          viewOnly
          primaryButton={{
            id: 'createAdviserButton',
            onClick: () => {
              handleCreateProject();
            },
            buttonText: 'Next Step',
          }}
        />
      </GridItem>
    </GridContainer>
  );
};
export default AddProject;
