import { useEffect, useMemo, useState } from 'react';
import { fetchOpenedQuestions } from 'apis/questionsAPI';

const questionsHasField = (questionFields, selectedFields) => {
  return questionFields.some((field) => selectedFields.includes(field.value));
};

export const filterQuestionsByFields = (questionsToBeFiltered, filters) => {
  return questionsToBeFiltered.filter((question) => {
    return questionsHasField(question.field, filters);
  });
};

const useQuestionsFilter = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState();
  const [selectedFieldsFilters, setSelectedFieldsFilters] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetchOpenedQuestions()
      .then((response) => {
        setQuestions(response.data);
      })
      .finally(() => setLoading(false));
  }, []);

  const addFieldFilter = (field) => {
    if (selectedFieldsFilters.includes(field)) {
      return;
    }
    setSelectedFieldsFilters((prevFields) => [...prevFields, field]);
  };

  const removeFieldFilter = (field) => {
    const filtersAfterRemove = selectedFieldsFilters.filter(
      (filter) => filter !== field,
    );
    setSelectedFieldsFilters(filtersAfterRemove);
  };

  const resetFieldsFilter = () => {
    setSelectedFieldsFilters([]);
  };

  const filteredQuestions = useMemo(() => {
    if (selectedFieldsFilters.length === 0) {
      return questions;
    }

    return filterQuestionsByFields(questions, selectedFieldsFilters);
  }, [questions, selectedFieldsFilters]);

  return {
    filteredQuestions,
    addFieldFilter,
    selectedFieldsFilters,
    removeFieldFilter,
    resetFieldsFilter,
    loading,
  };
};
export default useQuestionsFilter;
