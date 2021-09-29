import React, { Fragment } from 'react';

import GridContainer from 'components/grid/GridContainer';
import GridItem from 'components/grid/GridItem';
import CustomTypography from 'components/typography/Typography';
import CardHeader from 'components/card/CardHeader';
import ProjectSettingsForm from './ProjectSettingsForm';

const ProjectSettingsPage = () => {
  return (
    <Fragment>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <CardHeader color='primary'>
            <GridContainer>
              <GridItem md={6} xs={6}>
                <CustomTypography component={'h4'}>
                  {'Solutions'}
                </CustomTypography>
              </GridItem>
            </GridContainer>
          </CardHeader>
        </GridItem>
      </GridContainer>
      <ProjectSettingsForm />
    </Fragment>
  );
};

export default ProjectSettingsPage;
