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
    // justifyContent: 'center'
  },
  starsContainer: {
    justifyContent: 'center',
    display: 'flex',
    marginBottom: 20
  },
  callEvaluationContainer: {
    margin: 'auto',
    width: '95%'
  }
}));

export default useStyles;
