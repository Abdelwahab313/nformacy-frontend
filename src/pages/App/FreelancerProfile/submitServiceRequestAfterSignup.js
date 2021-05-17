import { createOrUpdateService } from 'apis/servicesAPI';

export const submitQuestionAfterRegister = () => {
  try {
    const questionFormStorage = JSON.parse(localStorage.getItem('requests'));
    if (!!questionFormStorage) {
      createOrUpdateService({ ...questionFormStorage, state: 'pending' }).then(
        () => {
          localStorage.setItem('requests', '');
        },
      );
    }
  } catch (e) {
    return false;
  }
};
