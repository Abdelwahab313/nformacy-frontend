import { useEffect, useMemo, useState } from 'react';
import { fetchOpenedQuestions } from 'apis/questionsAPI';
import { updateFetchedQuestions } from '../context/questionsRoasterAction';
import { useQuestionRoasterContext } from '../context';

const hasField = (question, selectedFields) => {
  return question.fields.some((field) => selectedFields.includes(field.majorFieldId));
};

export const filterQuestionsByFields = (questions, fieldsFilters) => {
  if (fieldsFilters.length === 0) {
    return questions;
  }
  return questions.filter((question) => hasField(question, fieldsFilters));
};

export const filterQuestionsByLanguage = (questions, languageFilter) => {
  if (!languageFilter) {
    return questions;
  }
  return questions.filter((question) => question.language === languageFilter);
};

const useQuestionsFilter = () => {
  const [loading, setLoading] = useState(false);
  const [
    { questions, fieldsFilters, languageFilter },
    dispatch,
  ] = useQuestionRoasterContext();

  useEffect(() => {
    setLoading(true);
    fetchOpenedQuestions()
      .then((response) => {
        updateFetchedQuestions(dispatch, response.data.reverse());
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredQuestions = useMemo(() => {
    let filtered = filterQuestionsByFields(questions, fieldsFilters);
    if (!!languageFilter) {
      filtered = filterQuestionsByLanguage(filtered, languageFilter);
    }
    return filtered;
  }, [questions, fieldsFilters, languageFilter]);

  return {
    filteredQuestions,
    loading,
    dispatch,
  };
};
export default useQuestionsFilter;
