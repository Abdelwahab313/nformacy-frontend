import React, { useRef, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import useStyles from '../styles/HomePageStyles';
import { Link } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import authManager from 'services/authManager';

const ProfileSummaryCard = () => {
  const classes = useStyles();
  const user = useRef(JSON.parse(localStorage.getItem('user')));
  const [profilePic,] = useState(
    user.current.avatar || require('../../../../assets/emptyavatar.jpg'),
  );

  return (
    <Card className={classes.card}>
      <CardActionArea
        component={Link}
        className={classes.cardContainer}
        to={'/user/edit'}>
        <Box className={classes.media}>
          <img
            id='profilePicture'
            src={profilePic}
            className={classes.largeProfilePic}
            alt='Profile Picture'
          />
        </Box>
        <CardContent>
          <Typography align={'center'} gutterBottom variant="h5" component="h1">
            {user.current.firstName + ' ' + user.current.lastName}
          </Typography>
          <Typography align={'center'} variant="body2" color="textSecondary" component="p">
            {authManager.isClient() ? user.current.jobTitle : `Expert in the ${user.current.fields[0].label} field`}
          </Typography>
          <Typography align={'center'} variant="body2" color="textSecondary" component="p">
            {authManager.isClient() ? user.current.organizationName : `In ${user.current.industriesOfExperience[0].label} industry`}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProfileSummaryCard;