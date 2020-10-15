import { useStyles } from 'styles/TimerBoxSectionStyles';
import React from 'react'
import { Grid, Typography } from '@material-ui/core';


function TimerBoxSection({time, text}) {

    const classes = useStyles();

    return (
    <Grid container className={classes.counterContainer} >
        <Grid item md={12} xs={12}>
            <Typography className={classes.counterTime} >{time}</Typography>
        </Grid>
        <Grid item md={12} xs={12}>
            <Typography className={classes.counterText} >{text}</Typography>
        </Grid>
    </Grid>
    )
}


export default TimerBoxSection

