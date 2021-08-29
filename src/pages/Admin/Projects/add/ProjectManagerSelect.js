import React, { useMemo } from 'react';

import DropdownSelectField from 'components/inputs/DropdownSelectField';
import { useTranslation } from 'react-i18next';
import { fetchProjectManagers } from 'apis/projectMangersAPI';
import useFetchData from 'hooks/useFetchData';
import LoadingCircle from 'components/progress/LoadingCircle';

const ProjectManagerSelect = ({
  selectedProjectMangerId,
  onChangeProjectManagerId,
}) => {
  const { t } = useTranslation();

  const { fetchedData: projectManagers, isLoading } = useFetchData(() => {
    return fetchProjectManagers();
  });

  const projectManagerOptions = useMemo(() => {
    return projectManagers.map((projectManager) => ({
      value: projectManager.id,
      label: `${projectManager.firstName} ${projectManager.lastName}`,
    }));
  }, [projectManagers]);

  if (isLoading) {
    return <LoadingCircle />;
  }

  return (
    <DropdownSelectField
      fieldId='projectManagerSelect'
      fieldName='projectManagerId'
      fieldOptions={projectManagerOptions}
      fieldValue={
        projectManagerOptions.length > 0
          ? projectManagerOptions.filter(
              (option) => option.value === selectedProjectMangerId,
            )[0]
          : {}
      }
      onFieldChange={(option) => {
        onChangeProjectManagerId(option.value);
      }}
      fieldLabel={t('selectProjectManager')}
    />
  );
};

export default ProjectManagerSelect;
