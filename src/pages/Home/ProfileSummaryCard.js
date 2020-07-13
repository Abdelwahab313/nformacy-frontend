import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import useStyles from './styles/HomePageStyles';

const ProfileSummaryCard = () => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography  align={'center'} gutterBottom variant="h5" component="h2">
            Profile
          </Typography>
          <Typography align={'center'} variant="body2" color="textSecondary" component="p">
            Expert in the (Fields/subfields)
          </Typography>
          <Typography  align={'center'} variant="body2" color="textSecondary" component="p">
            In these industries
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProfileSummaryCard;