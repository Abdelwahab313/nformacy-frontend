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
        height: '28px',
        width: '30px',
        color: black,
        fontFamily: fontNames.APERCU_PRO_MEDUIUM,
        fontSize: '23px',
        fontWeight: 'bold',
        lineHeight: '29px',
        textAlign: 'center',
        [theme.breakpoints.down('md')]: {
            height: '21px',
            width: '21px',
            fontSize: '17px',
            lineHeight: '21px',
        },
    },
    counterText:{
        height: '11px',
        width: '17px',
        color: black,
        fontFamily: fontNames.APERCU_PRO_MEDUIUM,
        fontSize: '10px',
        lineHeight: '11px',
        textAlign: 'center',
        [theme.breakpoints.down('md')]: {
            height: '11px',
            width: '22px',
            fontSize: '10px',
            lineHeight: '11px',
        },
    },

}));