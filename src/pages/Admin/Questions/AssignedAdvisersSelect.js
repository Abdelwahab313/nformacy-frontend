import React, { useEffect, useRef, useState } from 'react';
import { fetchAdvisersList } from '../../../apis/userAPI';

import DropdownSelectField from 'components/CustomInput/DropdownSelectField';



const AssignedAdvisersSelect = ({questionDetails, onChangeQuestionField}) => {

    const [fetchedAdvisersList, setFetchedAdvisersList] = useState([]);
  useEffect(() => {
    fetchAdvisersList().then((response) => {
      setFetchedAdvisersList(response.data);
    });
  }, []);

  const adviserListOptions = fetchedAdvisersList.map((adviser) => {
    return {
      value: adviser.id,
      label: adviser.firstName + ' ' + adviser.lastName,
    };
  });

    return (<DropdownSelectField
        fieldId='assignAdviser'
        fieldName='AssignAdviser'
        fieldOptions={adviserListOptions}
        fieldValue={
          adviserListOptions.length > 0
            ? adviserListOptions.filter(
                (option) =>
                  option.value === questionDetails.assignedAdviserId,
              )[0]
            : {}
        }
        onFieldChange={(e, option) => {
          onChangeQuestionField('assignedAdviserId', option.value);
        }}
        fieldLabel='Assign Adviser'
      />)
}

export default AssignedAdvisersSelect;