import { makeStyles } from '@material-ui/core/styles';
import { lightGrey, lightPink, pink, white } from './colors';

export const useStyles = makeStyles((theme) => ({
  bannerStyles: {
    backgroundColor: lightPink,
    height: '30vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: white,
    marginBottom: theme.spacing(3),
  },
  searchBarContainer: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
    border: 'solid 1px' + pink,
  },
  searchInput: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  searchGridStyles: {
    display: 'flex',
    justifyContent: 'center',
  },
  fieldNameFilterStyles: {
    border: 'solid 1px',
    height: '40px',
    margin: '2px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px',
    cursor: 'pointer',
    fontSize: '1.190vw',
    [theme.breakpoints.up('lg')]: {
      fontSize: '1.00vw',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '2.604vw',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '4vw',
    },
  },
  questionsCategoriesContainer: {
    marginTop: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(3),
    margin: theme.spacing(2),
  },
  questionContainer: {
    marginTop: theme.spacing(3),
  },
  assignmentTypeIcon: { fontSize: '50px' },
  fieldContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  flexContainer: {
    display: 'flex',
  },
  questionContentField: {
    ...defaultFieldStyles(theme),
  },
  questionFieldsStyles: {
    ...defaultFieldStyles(theme),
    minHeight: '36px',
    display: 'flex',
    alignItems: 'center',
    fontSize: '1.190vw',
    [theme.breakpoints.up('lg')]: {
      fontSize: '1.00vw',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '2.604vw',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '4vw',
    },
  },
  progressContainer: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
  answerButtonsContainer: {
    display: 'flex',
    marginTop: '20px',
  },
  attachButtonStyle: {
    backgroundColor: pink,
    color: white,
  },
  attachmentUploaderContainer: {
    display: 'flex',
    alignItems: 'center',
    width: 'fit-content',
  },
}));
export const attachButtonStyle = () => {
  return {
    backgroundColor: pink,
    color: white,
    alignSelf: 'center',
    borderRadius: '4px',
    height: '36px',
    textTransform: 'uppercase',
  };
};

const defaultFieldStyles = (theme) => ({
  backgroundColor: lightGrey,
  border: 'solid 1px' + pink,
  borderRadius: '5px',
  minHeight: '36px',
  margin: theme.spacing(1),
  padding: theme.spacing(1),
});

export const attachContainerStyle = () => {
  return {
    boxShadow: 'none',
    height: 'fit-content',
    padding: 0,
    margin: '0 10px 0 0',
  };
};
