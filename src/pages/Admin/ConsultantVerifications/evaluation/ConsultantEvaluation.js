import React, { useState, useEffect } from 'react';
import useFieldFetcher from 'hooks/useFieldsFetcher';
import LoadingCircle from 'components/progress/LoadingCircle';
import { getMajorFieldsFromSubfields } from 'core/fields';
import { useTranslation } from 'react-i18next';
import { createOrUpdateConsultantEvaluation, fetchEvaluationForConsultant } from 'apis/consultantEvaluationAPI';
import { getConsultantVerificationList, history } from 'services/navigation';
import { useSnackBar } from 'context/SnackBarContext';
import { useLocation } from 'react-router';
import ConsultantEvaluationForm from './ConsultantEvaluationForm';
import { fetchConsultantsDetails } from 'apis/consultantsAPI';

const ConsultantEvaluation = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const consultantId = location?.state?.consultantId;
  const { fields: fieldsLabels, loading } = useFieldFetcher();
  const { showSuccessMessage, showErrorMessage } = useSnackBar();

  const [userFields, setUserFields] = useState([]);
  const [consultantEvaluation, setConsultantEvaluation] = useState({
    fieldsRating: [],
    hourlyRate: 0,
    comment: '',
    isApproved: false,
  });

  const navigateToConsultantVerificationList = () => {
    history.push(getConsultantVerificationList());
  };

  useEffect(() => {
    fetchEvaluationForConsultant(consultantId)
      .then((response) => {
        const fetchedEvaluation = response?.data
        if (!!fetchedEvaluation?.comment) {
          setConsultantEvaluation(fetchedEvaluation);
        } else {
          fetchConsultantsDetails(consultantId)
            .then((response) => {
              const userDetails = response?.data
              if (userDetails?.fields) {
                setUserFields(userDetails?.fields)
              }
            })
        }
      })

  }, []);


  useEffect(() => {
    if (fieldsLabels?.length > 0 && userFields?.length > 0) {
      const majorFields = getMajorFieldsFromSubfields(fieldsLabels, userFields);

      const majorFieldsWithRating = majorFields?.map((field) => ({
        id: field.id,
        label: field.label,
        rating: field.rating,
      }));
      setConsultantEvaluation({
        ...consultantEvaluation,
        fieldsRating: majorFieldsWithRating,
      });
    }
  }, [fieldsLabels?.length, userFields?.length]);


  const onSubmit = () => {
    createOrUpdateConsultantEvaluation({
      ...consultantEvaluation,
      userId: consultantId,
    })
      .then(() => {
        showSuccessMessage(t('evaluationSubmitted'));
        navigateToConsultantVerificationList();
      })
      .catch(({ response }) => {
        response.data.errors.forEach(() => {
          showErrorMessage(t('somethingWrong'));
        });
      });
  };

  if (loading)
    return (
      <LoadingCircle />
    );

  return (
    <ConsultantEvaluationForm consultantEvaluation={consultantEvaluation} setConsultantEvaluation={setConsultantEvaluation} onSubmit={onSubmit} />
  );
};


export default ConsultantEvaluation;
