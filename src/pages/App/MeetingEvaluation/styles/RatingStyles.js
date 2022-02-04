import { makeStyles } from '@material-ui/core';
import { darkBlue, darkOrange } from 'styles/colors';

const useStyles = makeStyles((theme) => ({
  circleRate: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    border: '1px solid #d3d3d3',
    margin: 'auto'
  },
  starRatingContainer: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  ratingDescription: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    textAlign: 'center',
    width: '50%',
    margin: '40px 0'
  },
  ratingRadioCheck: {
    display: 'none'
  },
  evaluationQuestion: {
    display: 'flex',
  },
  starsContainer: {
    justifyContent: 'center',
    display: 'flex',
    marginBottom: 20,
    [theme.breakpoints.down('sm')]: {
      margin: 7,
      textAlign: 'center',
    }
  },
  commentField: {
    marginTop: 30,
    minWidth: '100%',
    maxWidth: '100%',
    marginBottom: 50
  },
  evaluationComment: {
    bottom: 0,
    width: '80%',
    marginTop: '9%',
    marginBottom: 30,
  },
  callEvaluationContainer: {
    margin: 'auto',
    width: '80%',
  },
  callEvaluationContainerAr: {
  display: 'flex',
  direction: 'ltr'
  },
  submitEvaluationBtnContainer: {
    float: 'right',
    marginTop: '30px'
  },
  recommendationStyle: {
    marginTop: 15
  },
  centerText: {
    textAlign: 'center'
  },
  submitEvaluationBtn: {
    padding: '15px 35px'
  },
  callEvaluationStarsContainer: {
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'normal',
      marginTop: 30
    }
  },
  ratingDescriptionContainer: {
    color: darkBlue,
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    },
  },
  callEvaluationHeader: {
    color: darkOrange,
    marginTop: 40
  },
  notSumbmittedEvaluation: {
    margin: '5% 0',
    [theme.breakpoints.down('sm')]: {
      margin: '10% 0',
    },
  }
}));

export default useStyles;
