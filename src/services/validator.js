import moment from 'moment';

class Validator {
  static validateRequiredText(text) {
    if (!text) {
      return 'required';
    }
  }
  static validateStartDate(startDate) {
    if (!startDate) {
      return 'requiredStartDate';
    } else if (!moment(startDate).isValid()) {
      return 'invalidStartDate';
    } else {
      return '';
    }
  }

  static validateEndDate(startDate, endDate) {
    if (!endDate) {
      return 'requiredEndDate';
    } else if (!moment(endDate).isValid()) {
      return 'invalidEndDate';
    } else if (moment(endDate).isBefore(moment(startDate))) {
      return 'endDateShouldBeAfterStartDate';
    }
  }
}

export default Validator;
