import { makeStyles } from '@material-ui/core/styles';
import fontNames from '../constants/fonts';
import { black } from './colors';

export const useStyles = makeStyles((theme) => ({
    counterContainer:{
        boxSizing: 'border-box',
        height: '50px',
        width: '52px',
        border: '1px solid rgba(0,0,0,0.05)',
        borderRadius: '5px',
        backgroundColor: '#FFFFFF',
        [theme.breakpoints.down('md')]: {
            height: '42px',
            width: '44px',
          },
    },
    counterTime:{
        color: black,
        fontFamily: fontNames.APERCU_PRO_MEDUIUM,
        fontSize: '23px',
        fontWeight: 'bold',
        lineHeight: '29px',
        textAlign: 'center',
        [theme.breakpoints.down('xs')]: {
            fontSize: '17px',
            lineHeight: '21px',
        },
    },
    counterText:{
        color: black,
        fontFamily: fontNames.APERCU_PRO_MEDUIUM,
        fontSize: '10px',
        lineHeight: '11px',
        textAlign: 'center',
        [theme.breakpoints.down('md')]: {
            fontSize: '10px',
            lineHeight: '11px',
        },
    },
    closedQuestion:{
        fontFamily: fontNames.SF_UI_REGULAR,
        fontWeight: 'bold'
    }

}));