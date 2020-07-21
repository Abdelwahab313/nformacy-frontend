import { useEffect, useRef, useState } from 'react';
import { fetchAllQuestions } from '../apis/questionsAPI';
import { cloneDeep } from 'lodash';

const QuestionFetcher = () => {
  const allQuestions = useRef([]);
  const [questions, setQuestions] = useState();
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    fetchAllQuestions().then((response) => {
      setQuestions(response.data);
      allQuestions.current = response.data;
    });
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
    const filteredQuestions = questions.filter(
      (question) => !questionsHasField(question.field, key),
    );
    setQuestions(filteredQuestions);
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

  return { questions, filterQuestions, addFilter, removeFilter, setFilters };
};
export default QuestionFetcher;
