import { makeStyles } from '@material-ui/core/styles';
import { grey, lighterPink, lightGrey, lightPink, pink, white } from './colors';

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
    padding: '6px 16px',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  maleFemaleIcon: {
    marginRight: theme.spacing(2),
  },
  coloredBorder: {
    borderColor: pink,
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
  formControl: {
    marginTop: theme.spacing(3),
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
    margin: theme.spacing(1),
    color: pink,
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
    borderColor: `${pink} !important`,
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
    marginTop: '50px !important',
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
  },
  sectionRowContainerStyles: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  paperSectionContentStyles: {
    marginTop: '10px !important',
  },
  profilePhotoContainer: {
    padding: '10px !important',
    display: 'flex',
    justifyContent: 'center',
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
    width: '40%',
    justifySelf: 'center',
  },
  signUpButtonContainer: {
    display: 'flex',
    width: '40%',
    alignSelf: 'flex-end',
  },
  headerWithBackground: {
    padding: theme.spacing(3),
    backgroundColor: pink,
    border: `1px solid ${pink}`,
    borderRadius: '16px',
    width: 'fit-content',
    height: 'fit-content',
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
    borderBottom: `solid 1px ${pink}`,
    borderWidth: 1,
    borderColor: pink,
    '&:hover': { color: pink },
  }),
  indicatorSeparator: (provided) => ({
    borderLeft: 0,
  }),
  dropdownIndicator: (provided) => ({
    color: pink,
    '&:hover': { color: pink },
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
  searchBox: { // To change search box element look
    borderColor: pink,
    padding: '4px 8px',
    minHeight: '60px',
    display: 'flex',
    flexGrow: 1,
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  chips: { // To change css chips(Selected options)
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
    backgroundColor: pink,
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
  color: pink,
};

export const dividerStyle = {
  backgroundColor: lightPink,
};

export const stepIndicatorStyles = {
  container: {
    width: '50%',
    alignSelf: 'center',
  },
};

export const nextButtonStyles = (disabled) => {
  return {
    backgroundColor: disabled ? lighterPink : pink,
    color: white,
    alignSelf: 'center',
  };
};

export const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
};

export const navigationButtonsContainer = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: '10px',
  alignSelf: 'center',
  width: '100%',
};

export const iconStyle = {
  fill: pink,
  alignSelf: 'center',
};

export const dateInputStyle = {
  borderBottom: '0',
  border: `solid 1px ${pink}`,
  padding: '5px',
  borderRadius: '5%',
};

export const sectionContainerStyles = {
  padding: 0,
};
