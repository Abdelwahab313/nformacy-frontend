import React from 'react';
import GridContainer from '../../../../components/grid/GridContainer';
import GridItem from 'components/grid/GridItem';

const AddAdmin = () => {
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <div>{'Add a New Admin'}</div>
      </GridItem>
    </GridContainer>
  );
};

export default AddAdmin;
