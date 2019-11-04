import React from "react";
import Grid from "@material-ui/core/Grid";

import { makeStyles } from "@material-ui/core/styles";
import GoogleMapComponent from "../GoogleMap";
import ImagesSlides from "../ImagesSlides";
import ClientVisits from "./ClientVisits";
import ClientDetails from "./ClientDetails";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(1)
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  details: {
    padding: theme.spacing(2)
  }
}));

const Client = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root} dir='rtl'>
      <Grid
        container
        justify='flex-start'
        alignItems='center'
        spacing={2}
        className={classes.details}>
        <Grid item lg={8} md={8} xs={12}>
          <ClientDetails client={props.client} id={"clientDetails"}/>
        </Grid>
        <Grid item lg={4} md={4} xs={12}>
          <ImagesSlides images={props.client.images} id={"clientImages"}/>
        </Grid>
      </Grid>
      <hr></hr>
      <Grid
        container
        justify='flex-start'
        alignItems='center'
        spacing={2}
        className={classes.details}>
        <Grid item lg={8} md={8} xs={12}>
          <ClientVisits visits={props.client.visits} id={"clientVisits"}/>
        </Grid>
        <Grid item lg={4} md={4} xs={12}>
          <GoogleMapComponent
            id={"clientMap"}
            location={props.client.location}
            isMarkerShown
            googleMapURL='https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places'
            loadingElement={<div style={{ height: "100%" }}/>}
            containerElement={<div style={{ height: "400px" }}/>}
            mapElement={<div style={{ height: "100%" }}/>}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Client;
