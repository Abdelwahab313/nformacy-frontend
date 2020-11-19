
import React from 'react';
import { Grid, Button, InputBase, Divider, Link } from '@material-ui/core';
import ProfileSummaryCard from './subComponents/ProfileSummaryCard';
import useStyles from './styles/HomePageStyles';
import CalendarCard from './subComponents/CalendarCard';
import { useAuth } from '../../auth/context/auth';
import authManager from '../../../services/authManager';
import AvailableServiceSection from './subComponents/AvailableServices';
import { useTranslation } from 'react-i18next';
import SubmitButton from 'components/buttons/SubmitButton';

const HomePage = () => {
  const classes = useStyles();
  const [{ currentUser }] = useAuth();
  const { t } = useTranslation();

  return (
    <Grid container justify="center" className={classes.clientHomeContainer}>

      <Grid item xs={12} md={3}>
        <ProfileSummaryCard />
        <CalendarCard currentUser={currentUser} />
      </Grid>

      <Grid item xs={12} md={8}>

        <Grid container>

          <Grid item xs={12} md={8} className={classes.askQuestionBox}>
            <Grid container className={classes.askExpertContainer}>
              <Grid xs={2} md={1}>
                <img
                  color={'primary'}
                  src={require('../../../assets/question.svg')}
                  width={'50%'}
                />
              </Grid>
              <Grid xs={10} md={11}>
                <form>
                  <InputBase
                    className={classes.askExpertInputField}
                    placeholder="Ask the expert"
                  />
                </form>
              </Grid>
            </Grid>
            <Divider className={classes.dividers} />

            <Grid container>
              <Grid item xs={8} md={8}>
                <Link
                  underline="none"
                  className={classes.askQuestionLink}
                  href="#" onClick={() => { }}>
                  {t('writeGreatQuestion')}
                </Link>
                <Divider className={[classes.dividers, classes.writeQuestionBorder]} />
              </Grid>

              <Grid item xs={4} md={4} justify="center" >
                <SubmitButton
                  id={'proceedBtn'}
                  onClick={() => { }}
                  className={classes.proceedBtn}
                  buttonText={'proceed'}
                />
              </Grid>
            </Grid>

          </Grid>

          <Grid item xs={12} md={3} className={classes.askQuestionBox}>
            <div>you have 40 points</div>
            <Button>proceed</Button>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12} md={3} className={classes.askQuestionBox}>
            <Grid container>
              <Grid item xs={12} md={6}>
                <h5>call the expert</h5>
                <p>test test</p>
              </Grid>
              <Grid item xs={12} md={6}>
                <img
                  color={'primary'}
                  src={require('../../../assets/project.svg')}
                  width={'100%'}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={3} className={classes.askQuestionBox}>
            <Grid container>
              <Grid item xs={12} md={6}>
                <h5>call the expert</h5>
                <p>test test</p>
              </Grid>
              <Grid item xs={12} md={6}>
                <img src=""></img>
              </Grid>
              <Button>start the process</Button>
            </Grid>
          </Grid>

          <Grid item xs={12} md={3} className={classes.askQuestionBox}>
            <Grid container>
              <Grid item xs={12} md={6}>
                <h5>call the expert</h5>
                <p>test test</p>
              </Grid>
              <Grid item xs={12} md={6}>
                <img src=""></img>
              </Grid>
            </Grid>
          </Grid>

        </Grid>

        {authManager.isClient() && (<AvailableServiceSection />)}
      </Grid>

    </Grid>
  );
};


export default HomePage;
