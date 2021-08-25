import React, { useEffect, useState } from 'react';

import DropdownSelectField from 'components/inputs/DropdownSelectField';
import { fetchProjectManagers } from 'apis/projectMangersAPI';
import { useTranslation } from 'react-i18next';

const AssignedProjectManagerSelect = ({ projectManagers, onChangeField }) => {
  const { t } = useTranslation();
  const [fetchedProjectManagersList, setFetchedProjectManagersList] = useState(
    [],
  );
  useEffect(() => {
    fetchProjectManagers().then((response) => {
      setFetchedProjectManagersList(response.data);
    });
  }, []);

  const projectManagerListOptions = fetchedProjectManagersList.map(
    (projectManager) => {
      return {
        value: projectManager.id,
        label: `${projectManager.firstName} ${projectManager.lastName}`,
      };
    },
  );

  return (
    <DropdownSelectField
      fieldId='assignProjectManager'
      fieldName='AssignProjectManager'
      fieldOptions={projectManagerListOptions}
      fieldValue={
        projectManagerListOptions.length > 0
          ? projectManagerListOptions.filter(
              (option) => option.value === projectManagers.projectManagerId,
            )[0]
          : {}
      }
      onFieldChange={(option) => {
        onChangeField('projectManagerId', option.value);
      }}
      fieldLabel={t('assignProjectManager')}
    />
  );
};

export default AssignedProjectManagerSelect;
