import { makeStyles } from '@material-ui/core';
import { lightOrange, white, whiteLilac, darkBlue } from 'styles/colors';

const useStyles = makeStyles((theme) => ({
  headerCard: {
    position: 'relative',
    width: '100%',
  },
  headerCardImg: {
    height: 370,
    objectFit: 'fill',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  headerCardImgMob: {
    display: 'none',
    [theme.breakpoints.down('md')]: {
      display: 'block',
      height: 370,
      objectFit: 'cover',
      height: 125,
    },
  },
  headerCardTxt: {
    position: 'absolute',
    top: '40%',
    left: 0,
    right: 0,
    textAlign: 'center',
    padding: '25px 0px 0px 85px',
    [theme.breakpoints.down('md')]: {
      padding: '0',
    },
  },
  landingSectionsContainerPadding: {
    padding: theme.spacing(11),
    [theme.breakpoints.down('md')]: {
      padding: [theme.spacing(6), theme.spacing(2)],
    },
  },
  lighterGrayContainer: {
    background: whiteLilac,
  },
  lighterGrayContainer: {
    background: whiteLilac,
  },
  subTextMargin: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  orangeBg: {
    backgroundColor: lightOrange,
    color: white,
  },
  expertsBox: {
    backgroundColor: white,
    borderRadius: 20,
    border: '1px solid #ecedf0',
    overflow: 'hidden',
    margin: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      margin: '10px 0',
      borderRadius: 10,
      minHeight: 'initial',
    },
  },
  darkBlueText: {
    color: darkBlue,
  },
  expertImgBox_1: {
    textAlign: 'right',
    margin: [theme.spacing(3), theme.spacing(2)],
  },
  expertImgBox_2: {
    textAlign: 'left',
    margin: [theme.spacing(3), theme.spacing(2)],
  },
  expertImg: {
    borderRadius: 10,
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
}));

export default useStyles;
