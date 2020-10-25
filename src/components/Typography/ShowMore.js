import Grid from '@material-ui/core/Grid';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import ShowMoreText from 'react-show-more-text';
import React from 'react';
import useStyles  from './styles/showMore';

const ShowLessComponent = () => {
  const classes = useStyles();
  return (
    <Grid container direction='row' className={classes.icons}>
      <div> Show less </div>
      <ExpandLess className={classes.icon} />
    </Grid>
  );
};

const ShowMoreComponent = () => {
  const classes = useStyles();

  return (
    <Grid container direction='row' className={classes.icons}>
      <div> Show More </div>
      <ExpandMore className={classes.icon} />
    </Grid>
  );
};

const MAXIMUM_NUMBER_OF_LINES = 2;
const ShowMore = ({ children, ...restProps }) => {
  const classes = useStyles();

  return (
    <ShowMoreText
      lines={MAXIMUM_NUMBER_OF_LINES}
      anchorClass={classes.anchor}
      more={<ShowMoreComponent />}
      less={<ShowLessComponent />}
      {...restProps}>
      {children}
    </ShowMoreText>
  );
};

export default ShowMore;
