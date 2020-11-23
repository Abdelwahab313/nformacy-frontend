import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import useStyles from './../styles/HomePageStyles';
import SubmitButton from 'components/buttons/SubmitButton';
import Collapse from '@material-ui/core/Collapse';



const services = [
  {name: 'call', title: 'Call the Expert', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', icon: require('../../../../assets/client-call.svg'), btnTxt:'Request a Call'}, 
  {name: 'question', title: 'Assign a Consultant', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', icon: require('../../../../assets/consultant.png'), btnTxt:'Start the process'}, 
  {name: 'project', title: 'It’s a Project', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', icon: require('../../../../assets/client-project.svg'), btnTxt: 'Start the process'}, 
];

const AvailableServices = () => {
  const classes = useStyles();
  const [focusedItem, setFocusedItem] =useState('');
  const isMobile = window.innerWidth < 768;
  return (
    services.map((service) => (
      <Grid item xs={3} md={3} className={[classes.askQuestionBox, classes.clientThreeBtns]}>
        {isMobile
           ?<MobileServiceItem service={service}/>
           :<ServiceItem service={service} isFocused={service.name === focusedItem} setFocusedItem={setFocusedItem}/>
        }
      </Grid>
        ))
  );
};

const MobileServiceItem = ({ service }) => {
  const classes = useStyles();
  return (
    <Grid container >
    <Grid item xs={8} md={9}>
      <p>{service.title}</p>
  <p className={classes.clientText}>{service.description}</p>
    </Grid>
    <Grid item xs={3} md={3}>
      <img src={service.icon} className={classes.clientImg} />
    </Grid>
    <Grid container xs={12}>
       <SubmitButton
          id={'proceedBtn'}
          onClick={() => { }}
          className={[classes.proceedBtn, classes.startProcessBtn]}
          buttonText={service.btnTxt}
        />
    </Grid>
  </Grid>
  );
};

const ServiceItem = ({ service, isFocused, setFocusedItem }) => {
  const classes = useStyles();
  return (
    <Collapse in={isFocused} collapsedHeight={150} timeout={500}>
    <Grid container onMouseEnter={() => setFocusedItem(service.name)} onMouseLeave={() => setFocusedItem('')}>
    <Grid item xs={8} md={9}>
      <p>{service.title}</p>
  <p className={classes.clientText}>{service.description}</p>
    </Grid>
    <Grid item xs={3} md={3}>
      <img src={service.icon} className={classes.clientImg} />
    </Grid>
    <Grid container xs={12}>
       { isFocused && (<SubmitButton
          id={'proceedBtn'}
          onClick={() => { }}
          className={[classes.proceedBtn, classes.startProcessBtn]}
          buttonText={service.btnTxt}
        />)}
    </Grid>
  </Grid>
  </Collapse>
  );
};

export default AvailableServices;
