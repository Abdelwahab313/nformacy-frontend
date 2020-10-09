import { toast } from 'react-toastify';

const showToast = (message, notificationId) => {
  toast(message, {
    toastId: notificationId,
  });
};

export default showToast;

