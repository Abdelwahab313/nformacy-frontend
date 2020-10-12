import { makeStyles } from '@material-ui/core/styles';
import { darkBlue, grey, lightGrey, white } from './colors';
import bannerBackground from '../assets/banner2X.png';

export const useStyles = makeStyles((theme) => ({
  bannerStyles: {
    backgroundImage: `url(${bannerBackground})`,
    height: '35vh',
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
    width: '44.931vw',
    border: 'solid 1px' + darkBlue,
    borderRadius: '11px',
    maxHeight: '52px',
    [theme.breakpoints.down('sm')]: {
      width: '72vw',
    },
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
  questionsCategoriesContainerDesktop: {
    marginTop: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  questionsCategoriesContainerMobile: {
    marginTop: theme.spacing(3),
    display: 'flex',
    overflowX: 'scroll',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
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
  questionFieldLabel: {
    marginRight: '10px',
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
  subFieldChip: { marginLeft: '5px', marginRight: '5px' },
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
  answerButtonContainer: { display: 'flex', justifyContent: 'flex-end' },
  attachButtonStyle: {
    backgroundColor: darkBlue,
    color: white,
  },
  attachmentUploaderContainer: {
    display: 'flex',
    alignItems: 'center',
    width: 'fit-content',
  },
  pageHeaderStyle: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    backgroundColor: darkBlue,
    color: white,
    marginBottom: theme.spacing(5),
    borderRadius: '5px',
  },
  headerTextStyles: {
    padding: theme.spacing(1),
  },
  bannerFontStyles: {
    fontSize: '3.125vw',
    color: white,
    fontFamily: 'Apercu Pro Medium',
    marginBottom: '38px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '5.600vw',
    },
  },
  activeFilterStyle: {
    margin: `0 ${theme.spacing(1)}px`,
    backgroundColor: darkBlue,
    cursor: 'default',
    color: white,
    borderRadius: '9px',
    padding: theme.spacing(2),
    fontSize: '1.458vw',
    alignItems: 'center',
    display: 'flex',
    height: 'fit-content',
    [theme.breakpoints.down('sm')]: {
      fontSize: '4vw',
      whiteSpace: 'nowrap',
    },
  },
  inactiveFilterStyle: {
    margin: `0 ${theme.spacing(1)}px`,
    cursor: 'default',
    color: grey,
    padding: theme.spacing(2),
    fontSize: '1.458vw',
    alignItems: 'center',
    display: 'flex',
    height: 'fit-content',
    [theme.breakpoints.down('sm')]: {
      fontSize: '4vw',
      whiteSpace: 'nowrap',
    },
  },
  moreFiltersList: {},
}));
export const attachButtonStyle = () => {
  return {
    backgroundColor: darkBlue,
    color: white,
    alignSelf: 'center',
    borderRadius: '4px',
    height: '36px',
    textTransform: 'uppercase',
  };
};

const defaultFieldStyles = (theme) => ({
  backgroundColor: lightGrey,
  border: 'solid 1px' + darkBlue,
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
