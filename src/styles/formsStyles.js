import { makeStyles } from '@material-ui/core/styles';
import {
  grey,
  lightGrey,
  darkBlue,
  white,
  lightOrange,
  darkOrange,
  lighterGrey,
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
  detailsText: { display: 'flex' },
  freelancerProfileContainer: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'scroll',
    padding: theme.spacing(3),
    flexGrow: 1,
  },
  freelancerProfileContainerAr: {
direction: 'ltr'
  },
  detailsContainer: {
    alignItems: 'center',
  },
  comingSoon: {
    textAlign: 'center',
    padding: 80,
  },
  cancelConditionsBtn: {
    float: 'right',
  },
  form: {
    display: 'flex',
    width: '100%',
    maxWidth: '400px',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(1),
  },
  formAr: {
   direction: 'ltr',
  },
  nestedForm: {
    display: 'flex',
    width: '100vw',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(1),
  },
  nestedFormAr: {
direction: 'ltr',
  },
  formControl: {
    marginTop: theme.spacing(3),
  },
  profileContainer: {
    direction: 'ltr',
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
  socialLoginContainer: {
    width: '100%',
    display: 'flex',
    marginTop: '16px',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  socialLoginButton: {
    textAlign: 'center',
    fontSize: '24px',
    color: 'white',
    height: '50px',
    width: '50px',
    border: 'none',
    cursor: 'pointer',
  },
  submit: {
    marginTop: theme.spacing(5),
  },
  signupButton: {
    marginTop: theme.spacing(2),
    backgroundColor: '#ED7D31 !important',
    '&:hover': {
      backgroundColor: '#E7923D !important',
    },
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
    textAlign: 'center'
  },
  errorAr: {
    Display: 'flex',
    direction: 'ltr',
  },
  signupLink: {
    color: white,
    fontSize: 'initial',
    textDecoration: 'none',
  },
  linkedLinkMobile: {
    margin: '0 auto',
  },
  forgetPasswordLink: {
    margin: theme.spacing(1),
    color: lightOrange,
    fontSize: 'initial',
    textAlign: 'right',
    width: '100%',
  },
  newUser: {
    marginTop: theme.spacing(4),
    width: '100%',
    textAlign: 'center',
    borderBottom: '1px solid #d1d0d0',
    lineHeight: '0.1em',
    margin: '10px 0 20px',
    zIndex: 999,
  },
  forgetPasswordHeader: {
    color: darkOrange,
    marginBottom: 20,
  },
  forgetPasswordForm: {
    border: '1px solid #ccc',
    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    padding: 80,
    marginTop: 0,
    [theme.breakpoints.down('xs')]: {
      padding: 50,
    },
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
      fontSize: 15,
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
      fontSize: 14,
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
  },
  alignRight: { alignSelf: 'center' },
  loginInTitleContainer: {
    height: 'fit-content',
    marginBottom: '50px',
    [theme.breakpoints.down('md')]: {
      marginBottom: 0,
    },
  },
  loginMobile: {
    [theme.breakpoints.down('md')]: {
      marginTop: 0,
    },
  },
  loginPageTitle: {
    textAlign: 'center !important',
    fontWeight: 'bold !important',
    fontSize: '2.024vw !important',
  },
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
    // margin: '15px 0',
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
  profileAndNameContainer: {
    display: 'inline-block',
    textAlign: 'center',
  },
  personalInfoSections: {
    border: '1px solid #dddcda',
    borderRadius: 10,
    padding: '0 20px',
    margin: '15px 0',
  },
  personalInfoSectionsAr: {
display: 'flex',
flexDirection: 'column',
direction: 'ltr',
  },
  personalInfoHeaderContainer: {
    margin: '15px 0',
  },
  personalInfoHeader: {
    fontSize: 18,
    fontWeight: 'bold',
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
    alignSelf: 'center',
    width: '100%',
    marginTop: '40px !important',
    marginBottom: '40px',
  },
  acceptTermsContainer: {
    marginTop: '40px !important',
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '-20px',
    alignSelf: 'center',
    width: '100%',
  },
  nextBtnContainerFlexEnd: {
    justifyContent: 'space-between',
  },
  termsLinkColor: {
    color: darkBlue,
    '&:hover': { color: darkBlue },
    [theme.breakpoints.down('sm')]: {
      fontSize: 13,
    },
  },
  testingClassAr: {
    indicatorsContainer: ()=>({  
      left: '-45px',
   
    }),
  },

  continueLaterBtn: {
    margin: `0 ${theme.spacing(2)}px`,
    alignSelf: 'flex-start',
    [theme.breakpoints.down('sm')]: {
      fontSize: 13,
    },
  },
  disabledNextButtonMobile: {
    [theme.breakpoints.down('sm')]: {
      padding: '16px 25px',
    },
  },
  backButton: {
    marginRight: 'auto',
    [theme.breakpoints.down('sm')]: {
      padding: '0 25px',
    },
  },

  centeredText: {
    [theme.breakpoints.down('md')]: {
      margin: '0 auto',
      float: 'right',
      overflowX: 'scroll',
    },
  },
  profileURLMobile: {
    overflowX: 'scroll',
    width: '100%',
    float: 'left',
    [theme.breakpoints.down('md')]: {
      margin: '0 auto',
    },
  },
  profileEmailMobile: {
    overflowX: 'scroll',
  },
  corporateDesc: {
    marginLeft: 30,
    color: darkBlue,
  },
}));

export const selectStyleAr = {

  indicatorsContainer: () => ({
    right: 'auto',
    left: 0,
  }),
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
    marginRight: 0,
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
    marginRight: 14,
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

export const selectStyle = {
  menu: (provided) => ({
    ...provided,
    zIndex: 9999,
  }),
  indicatorsContainer: () => ({
    left: 'auto',
    right: 30,
  }),
  control: (provided) => ({
    ...provided,
    borderRadius: 5,
    borderBottom: `solid 1px ${lightGrey}`,
    borderWidth: 1,
    borderColor: lightGrey,
    '&:hover': { color: darkBlue },
    marginRight: 0,
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
      backgroundColor: lightGrey,
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
      backgroundColor: lightGrey,
    },
  },
});
export const checkboxStyle = {
  color: darkBlue,
};

export const dividerStyle = {
  backgroundColor: lightGrey,
};
export const greyDividerStyle = {
  backgroundColor: lightGrey,
};

export const stepIndicatorStyles = {
  container: {
    width: '60%',
    alignSelf: 'center',
  },
};

export const nextButtonStyles = (disabled) => {
  return {
    backgroundColor: disabled ? lighterGrey : darkBlue,
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
