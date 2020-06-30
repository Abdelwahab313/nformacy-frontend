import { makeStyles } from '@material-ui/core/styles';
import { lightPink, pink, white } from './colors';

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
    padding: theme.spacing(5),
  },
  nestedContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  freelancerProfileContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100vh',
  },
  form: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(1),
  },
  formControl: {
    marginTop: theme.spacing(3),
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
    color: 'royalblue',
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
  }),
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

export const dividerStyle = {
  backgroundColor: lightPink,
};

export const stepIndicatorStyles = {
  container: {
    width: '50%',
    alignSelf: 'center',
  },
};

export const nextButtonStyles = {
  backgroundColor: pink,
  color: white,
  alignSelf: 'center',
  marginTop: '30px',
  width: '20%',
};

export const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
};
