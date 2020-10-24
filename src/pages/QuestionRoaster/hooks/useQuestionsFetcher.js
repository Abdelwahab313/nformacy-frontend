import { useEffect, useRef, useState } from 'react';
import { fetchOpenedQuestions } from 'apis/questionsAPI';
import { cloneDeep } from 'lodash';

const useQuestionFetcher = () => {
  const allQuestions = useRef([]);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState();
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetchOpenedQuestions()
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
    filterQuestions(key, tempFilters);
  };

  const removeFilter = (key) => {
    const tempFilters = filters.filter((filter) => filter !== key);
    setFilters(tempFilters);
    filterQuestions(key, tempFilters);
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

  const filterQuestions = (key, filtersToBeApplied) => {
    if (key === 'all') {
      setQuestions(cloneDeep(allQuestions.current));
      setFilters([]);
      return;
    }
    const filteredQuestions = [];
    const questionsToBeFiltered = allQuestions.current;
    filtersToBeApplied.forEach((filter) => {
      questionsToBeFiltered.forEach((question) => {
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
    if (filtersToBeApplied.length === 0) {
      setQuestions(allQuestions.current);
    } else {
      setQuestions(filteredQuestions);
    }
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
