import { makeStyles } from '@material-ui/core/styles';
import {
  grey,
  lighterPink,
  lightGrey,
  lightPink,
  darkBlue,
  white,
  lightOrange,
  darkOrange
} from './colors';

export const useStyles = makeStyles((theme) => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  timeLineContent: {
    padding: '16px',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  maleFemaleIcon: {
    marginRight: theme.spacing(2),
  },
  coloredBorder: {
    borderColor: darkBlue,
  },
  paperSection: {
    marginTop: theme.spacing(5),
    padding: theme.spacing(3),
  },
  nestedContainer: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 0,
    paddingRight: 0,
  },
  freelancerProfileContainer: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'scroll',
    padding: theme.spacing(3),
    height: '100vh',
  },
  form: {
    display: 'flex',
    width: '100%',
    maxWidth: '400px',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(1),
  },
  nestedForm: {
    display: 'flex',
    width: '100vw',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(1),
  },
  formControl: {
    marginTop: theme.spacing(3),
  },
  profileContainer: {
    marginBottom: theme.spacing(3),
  },
  dateController: {
    marginTop: theme.spacing(1),
  },
  formHeader: {
    display: 'flex',
  },
  formHeaderIcon: {
    marginLeft: theme.spacing(1),
    justifyContent: 'center',
  },
  selectControl: {
    minWidth: 120,
  },
  checkBoxControl: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(3),
  },
  datesContainer: {
    display: 'flex',
    width: '100%',
  },
  nestedCardContainer: {
    margin: theme.spacing(3),
  },
  editButton: {
    width: '10%',
    marginBottom: theme.spacing(3),
  },
  submit: {
    marginTop: theme.spacing(5),
  },
  signupButton: {
    marginTop: theme.spacing(2),
    backgroundColor: lightOrange,
    '&:hover': {
      backgroundColor: darkOrange
    }
  },
  progressContainer: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
  error: {
    color: 'red',
    margin: theme.spacing(1),
  },
  signupLink: {
    color: white,
    fontSize: 'initial',
    textDecoration: 'none'
  },
  forgetPasswordLink: {
    margin: theme.spacing(1),
    color: lightOrange,
    fontSize: 'initial',
    textAlign: 'right',
    width: '100%'
  },
  newUser: {
    marginTop: theme.spacing(4),
    width: '100%',
    textAlign: 'center',
    borderBottom: '1px solid #d1d0d0',
    lineHeight: '0.1em',
    margin: '10px 0 20px',
    zIndex: 999
  },
  newUserText: {
    background: white,
    padding: '0 10px',
  },
  hintContainer: {
    borderRadius: '5%',
    padding: theme.spacing(3),
    backgroundColor: lightGrey,
  },
  hintText: {
    textAlign: 'center',
    fontSize: '1.190vw',
    [theme.breakpoints.down('sm')]: {
      fontSize: '2.604vw',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '4vw',
    },
  },

  textField: {
    borderWidth: '1px',
    borderColor: `${darkBlue} !important`,
  },
  registerTextField: {
    borderWidth: '1px',
    borderColor: lightGrey,
    '&:hover': {
      borderColor: `${darkBlue} !important`,
      color: darkBlue,
    },
  },
  fieldLabelStylesDesktop: {
    fontSize: '1.190vw',
    fontWeight: 'bold',
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
  fieldValueStyles: {
    width: '50%',
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
  subFieldValueStyles: {
    width: 'fit-content',
    fontSize: '1.190vw',
    margin: '0 !important',
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
  subFieldContainerStyles: {
    backgroundColor: lightGrey,
    borderRadius: '50px',
    padding: '5px 10px',
    margin: '5px !important',
  },
  summaryValueStyles: {
    marginLeft: theme.spacing(2),
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
  timelineFieldValueStyles: {
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
  timelineDateFieldStyles: {
    height: 'fit-content',
    alignSelf: 'center',
  },
  sectionHeaderStyles: {
    fontSize: '2.024vw',
    textAlign: 'center',
    fontWeight: '600',
    [theme.breakpoints.down('sm')]: {
      fontSize: '3vw',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '5vw',
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '1.00vw',
    },
  },
  gifContainerStyles: {
    paddingLeft: '0 !important',
    paddingRight: '0 !important',
  },
  paddingZero: {
    padding: '0 !important',
  },
  buttonsContainer: {
    marginTop: '40px !important',
  },
  stepTwoContainer: {
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'nowrap !important',
      flexDirection: 'column-reverse',
    },
  },
  stepThreeContainer: {
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'nowrap !important',
      flexDirection: 'column-reverse',
    },
  },
  imageUploadContainer: {
    marginTop: theme.spacing(5),
    [theme.breakpoints.down('sm')]: {
      alignSelf: 'center',
    },
  },
  sideHintContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    padding: '0 !important',

    [theme.breakpoints.up('lg')]: {
      paddingTop: '24px !important',
      marginTop: '40px',
    },
  },
  removeNestedText: {
    color: grey,
  },
  logInPageContainer: {
    padding: theme.spacing(5),
    [theme.breakpoints.up('md')]: {
      height: '100vh',
    },
  },
  alignRight: { alignSelf: 'center' },
  loginInTitleContainer: { height: 'fit-content', marginBottom: '50px' },
  pageHeaderStyle: {
    fontSize: '2.024vw',
    textAlign: 'left',
    fontWeight: '600',
    [theme.breakpoints.down('sm')]: {
      fontSize: '3vw',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '5vw',
    },
  },
  paperSectionHeaderStyles: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  sectionRowStyles: {
    display: 'flex',
    margin: '15px 0',
  },
  sectionRowContainerStyles: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  sectionContainerPaddingLeft: {
    paddingLeft: '45px',
  },
  loadingContainer: {
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
  },
  paperSectionContentStyles: {
    marginTop: '10px !important',
  },
  profilePhotoContainer: {
    padding: '10px !important',
    display: 'flex',
    justifyContent: 'center',
  },
  largeProfilePic: {
    width: '200px',
    height: '200px',
    [theme.breakpoints.down('md')]: {
      width: '150px',
      height: '150px',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100px',
      height: '100px',
    },
    borderRadius: '100%',
  },
  signUpHeaderStyle: {
    fontSize: '1.190vw',
    textAlign: 'left',
    color: white,
    [theme.breakpoints.down('sm')]: {
      fontSize: '2.604vw',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '4vw',
    },
  },
  logInButtonContainer: {
    display: 'flex',
    width: '100%',
    justifySelf: 'center',
  },
  signUpButtonContainer: {
    display: 'flex',
    width: '100%',
    alignSelf: 'flex-end',
  },
  headerWithBackground: {
    padding: theme.spacing(3),
    backgroundColor: darkBlue,
    border: `1px solid ${darkBlue}`,
    borderRadius: '16px',
    width: 'fit-content',
    height: 'fit-content',
  },
  nextBtnContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: '10px',
    alignSelf: 'center',
    width: '100%',
    marginTop: '40px !important',
  },
  nextBtnContainerFlexEnd: {
    justifyContent: 'space-between',
  },
  termsLinkColor: {
    color: darkBlue,
    '&:hover': { color: darkBlue },
  },
}));

export const selectStyle = {
  menu: (provided) => ({
    ...provided,
    zIndex: 9999,
  }),
  control: (provided) => ({
    ...provided,
    borderRadius: 5,
    borderBottom: `solid 1px ${lightGrey}`,
    borderWidth: 1,
    borderColor: lightGrey,
    '&:hover': { color: darkBlue },
  }),
  indicatorSeparator: () => ({
    borderLeft: 0,
  }),
  dropdownIndicator: () => ({
    color: darkBlue,
    '&:hover': { color: darkBlue },
  }),
  singleValue: (provided) => ({
    ...provided,
    marginLeft: 10,
  }),
  placeholder: (provided) => ({
    ...provided,
    marginLeft: 10,
  }),
  input: (provided) => ({
    ...provided,
    height: 51,
    display: 'flex',
    alignItems: 'center',
  }),
};

export const multiSelectStyles = {
  searchBox: {
    // To change search box element look
    borderColor: darkBlue,
    padding: '4px 8px',
    minHeight: '60px',
    display: 'flex',
    flexGrow: 1,
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  chips: {
    // To change css chips(Selected options)
    background: '#e6e6e6',
    color: '#333333',
    borderRadius: 0,
  },
};

export const radioStyle = makeStyles({
  root: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  icon: {
    borderRadius: '50%',
    width: 20,
    height: 20,
    boxShadow:
      'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: 'white',
    backgroundImage:
      'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    '$root.Mui-focusVisible &': {
      outline: '2px auto rgba(19,124,189,.6)',
      outlineOffset: 2,
    },
    'input:hover ~ &': {
      backgroundColor: lightPink,
    },
    'input:disabled ~ &': {
      boxShadow: 'none',
      background: 'rgba(206,217,224,.5)',
    },
  },
  checkedIcon: {
    backgroundColor: darkBlue,
    backgroundImage:
      'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    borderRadius: 50,
    '&:before': {
      display: 'block',
      width: 20,
      height: 20,
      backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
      content: '""',
    },
    'input:hover ~ &': {
      backgroundColor: lightPink,
    },
  },
});
export const checkboxStyle = {
  color: darkBlue,
};

export const dividerStyle = {
  backgroundColor: lightPink,
};
export const greyDividerStyle = {
  backgroundColor: lightGrey,
};

export const stepIndicatorStyles = {
  container: {
    width: '50%',
    alignSelf: 'center',
  },
};

export const nextButtonStyles = (disabled) => {
  return {
    backgroundColor: disabled ? lighterPink : darkBlue,
    color: white,
    alignSelf: 'center',
  };
};

export const saveButtonStyle = () => {
  return {
    width: '10%',
    marginTop: '20px',
  };
};

export const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
};

export const iconStyle = {
  fill: darkBlue,
  alignSelf: 'center',
};

export const dateInputStyle = {
  borderBottom: '0',
  border: `solid 1px ${darkBlue}`,
  padding: '5px',
  borderRadius: '5%',
};

export const sectionContainerStyles = {
  padding: 0,
};

export const selectCheckBox = { marginRight: 8 };
