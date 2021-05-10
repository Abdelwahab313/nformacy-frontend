import { createOrUpdateService } from 'apis/servicesAPI';

export const submitQuestionAfterRegister = () => {
  const questionFormStorage = JSON.parse(localStorage.getItem('requests'));
  if (questionFormStorage) {
    createOrUpdateService({ ...questionFormStorage, state: 'pending' });
  }
};