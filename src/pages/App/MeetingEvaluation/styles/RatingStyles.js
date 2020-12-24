import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  circleRate: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    border: '2px solid #d3d3d3',
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
    width: '50%'
  },
  ratingRadioCheck: {
    display: 'none'
  },
  evaluationQuestion: {
    display: 'flex',
    justifyContent: 'center'
  },
  starsContainer: {
    justifyContent: 'center',
    display: 'flex'
  }
}));

export default useStyles;
