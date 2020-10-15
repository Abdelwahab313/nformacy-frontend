import { Grid, Typography } from '@material-ui/core';
import React, { Fragment } from 'react'
import TimerBoxSection from './TimerBoxSection';

function CountdownBoxShape({ days, hours, minutes, completed }) {
    return (
        <Fragment>
            { completed ? 
            <Typography>Closed</Typography> 
            :
            <Grid container>
            <TimerBoxSection item md={4} xs={4}
            time={days}
            text={"Day"}/>
            <TimerBoxSection item md={4} xs={4}
            time={hours}
            text={"Hours"}/>
            <TimerBoxSection item md={4} xs={4}
            time={minutes}
            text={"Minutes"}/>
            </Grid>
            }
        </Fragment>
    )
}

export default CountdownBoxShape ;