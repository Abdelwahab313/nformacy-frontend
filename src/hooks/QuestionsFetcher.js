import { useEffect, useRef, useState } from 'react';
import { fetchAllQuestions } from '../apis/questionsAPI';
import { cloneDeep } from 'lodash';

const QuestionFetcher = () => {
  const allQuestions = useRef([]);
  const [questions, setQuestions] = useState();

  const questionsHasField = (toBeFiltered, key) => {
    return toBeFiltered?.filter((field) => field.value === key).length > 0;
  };

  const currentFilteredQuestionsHasNotKey = (
    filteredQuestions,
    referenceId,
  ) => {
    return (
      filteredQuestions.filter(
        (givenQuestion) => givenQuestion.referenceId === referenceId,
      ).length === 0
    );
  };

  const filterQuestions = (keys) => {
    if (keys.filter((key) => key === 'all').length > 0) {
      setQuestions(cloneDeep(allQuestions.current));
      return;
    }
    const filteredQuestions = [];
    keys?.forEach((key) => {
      questions?.forEach((question) => {
        if (
          questionsHasField(question.field, key) &&
          currentFilteredQuestionsHasNotKey(
            filteredQuestions,
            question.referenceId,
          )
        ) {
          filteredQuestions.push(question);
        }
      });
    });
    setQuestions(filteredQuestions);
  };

  useEffect(() => {
    fetchAllQuestions().then((response) => {
      setQuestions(response.data);
      allQuestions.current = response.data;
    });
  }, []);

  return { questions, filterQuestions };
};
export default QuestionFetcher;
