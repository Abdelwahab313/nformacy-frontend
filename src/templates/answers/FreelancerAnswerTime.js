import React from 'react';
import QuestionCountDown from 'components/counters/QuestionCountDown';

const FreelancerAnswerTime = ({ currentActionTime }) => {
  return (
    <QuestionCountDown
      showIcon={false}
      className={'currentActionTime'}
      date={currentActionTime}
    />
  );
};

export default FreelancerAnswerTime;
