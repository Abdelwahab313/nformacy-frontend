import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
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
    margin: '30px 0'
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
    marginBottom: 20
  },
  commentField: {
    marginTop: 30,
  },
  evaluationComment: {
    position: 'absolute',
    bottom: 0,
    width: '80%'
  },
  callEvaluationContainer: {
    margin: 'auto',
    width: '80%'
  },
  submitEvaluationBtnContainer: {
    float: 'right',
    marginTop: '30px'
  }
}));

export default useStyles;
