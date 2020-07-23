import { useEffect, useRef, useState } from 'react';
import { fetchAllQuestions } from '../apis/questionsAPI';
import { cloneDeep } from 'lodash';

const useQuestionFetcher = () => {
  const allQuestions = useRef([]);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState();
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetchAllQuestions()
      .then((response) => {
        setQuestions(response.data);
        allQuestions.current = response.data;
      })
      .finally(() => setLoading(false));
  }, []);

  const addFilter = (key) => {
    const tempFilters = cloneDeep(filters);
    tempFilters.push(key);
    setFilters(tempFilters);
    filterQuestions(key);
  };

  const removeFilter = (key) => {
    const tempFilters = filters.filter((filter) => filter !== key);
    setFilters(tempFilters);
    const filteredQuestions = [];
    tempFilters.forEach((filter) => {
      allQuestions.current.forEach((question) => {
        if (
          questionsHasField(question.field, filter) &&
          currentFilteredQuestionsHasNotKey(
            filteredQuestions,
            question.referenceNumber,
          )
        ) {
          filteredQuestions.push(question);
        }
      });
    });
    if (tempFilters.length === 0) {
      setQuestions(allQuestions.current);
    } else {
      setQuestions(filteredQuestions);
    }
  };

  const questionsHasField = (toBeFiltered, key) => {
    return toBeFiltered.filter((field) => field.value === key).length > 0;
  };

  const currentFilteredQuestionsHasNotKey = (
    filteredQuestions,
    referenceNumber,
  ) => {
    return (
      filteredQuestions.filter(
        (givenQuestion) => givenQuestion.referenceNumber === referenceNumber,
      ).length === 0
    );
  };

  const filterQuestions = (key, remove = false) => {
    if (key === 'all') {
      setQuestions(cloneDeep(allQuestions.current));
      setFilters([]);
      return;
    }
    const filteredQuestions = [];
    const toBeFiltered = remove ? allQuestions.current : questions;
    toBeFiltered.forEach((question) => {
      if (
        questionsHasField(question.field, key) &&
        currentFilteredQuestionsHasNotKey(
          filteredQuestions,
          question.referenceNumber,
        )
      ) {
        filteredQuestions.push(question);
      }
    });
    setQuestions(filteredQuestions);
  };

  return {
    questions,
    filterQuestions,
    addFilter,
    filters,
    removeFilter,
    setFilters,
    loading,
  };
};
export default useQuestionFetcher;
