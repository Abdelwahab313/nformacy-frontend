import React from 'react';
import Button from '@material-ui/core/Button';
import { FormContext, useForm } from 'react-hook-form';
import { saveButtonStyle, useStyles } from 'styles/formsStyles';
import { updateClient } from 'apis/clientsAPI';
import BeneficiaryBasicInfo from './BeneficiaryBasicInfo';

const BeneficiaryProfileDetailsForm = ({ client, closeDialog, setClient }) => {
  const formMethod = useForm({
    defaultValues: { ...client },
  });

  const classes = useStyles();

  const onSubmitBasicInfo = (userData) => {
    const userToBeSubmitted = {
      ...userData,
      id: client.id,
    };
    updateClient(userToBeSubmitted).then((response) => {
      setClient(response.data);
    });
    client = { ...client, ...userData };
    closeDialog();
  };

  return (
    <FormContext client={client} {...formMethod}>
      <form
        id='editBasicInfoForm'
        className={classes.nestedForm}
        noValidate
        onSubmit={formMethod.handleSubmit(onSubmitBasicInfo)}>
        <BeneficiaryBasicInfo client={client} />
        <Button
          id='saveBasicInfo'
          type='submit'
          variant='contained'
          color='primary'
          style={saveButtonStyle()}>
          Save
        </Button>
      </form>
    </FormContext>
  );
};

export default BeneficiaryProfileDetailsForm;
