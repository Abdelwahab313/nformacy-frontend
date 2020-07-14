import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import Transition from '../animations/Transition';
import DialogContent from '@material-ui/core/DialogContent';
import ShowMoreText from 'react-show-more-text';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import t from '../../locales/en/freelancerProfile.json';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Divider from '@material-ui/core/Divider';
import { dividerStyle, useStyles } from '../../styles/formsStyles';
import React, { useRef } from 'react';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import SummaryForm from '../forms/SummaryForm';

const SummarySection = () => {
  const user = useRef(JSON.parse(localStorage.getItem('user')));
  const [open, setOpen] = React.useState(false);
  const handleClick = (isExpanded) => {
    if (!isExpanded) window.dispatchEvent(new Event('resize'));
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();
  return (
    <Grid item id='summary'>
      <Dialog
        TransitionComponent={Transition}
        maxWidth='lg'
        PaperProps={{ id: 'summaryDialog' }}
        onClose={handleClose}
        open={open}>
        <DialogContent>
          <Grid container xs={12}>
            <SummaryForm user={user} closeDialog={handleClose} />
          </Grid>
        </DialogContent>
      </Dialog>
      <Paper className={classes.paperSection} elevation={3}>
        <Grid container justify={'space-between'}>
          <Grid item xs={11} className={classes.paperSectionHeaderStyles}>
            <Typography gutterBottom className={classes.sectionHeaderStyles}>
              {t['summary']}
            </Typography>
          </Grid>
          <Grid item xs={1} className={classes.paperSectionHeaderStyles}>
            <IconButton
              aria-label='edit'
              id='editSummary'
              onClick={handleClickOpen}>
              <EditIcon color={'primary'} />
            </IconButton>
          </Grid>
        </Grid>
        <Divider variant='middle' style={dividerStyle} />
        <Grid
          container
          spacing={5}
          className={classes.paperSectionContentStyles}>
          <Grid item xs={12}>
            <Typography
              id='summaryValue'
              gutterBottom
              className={classes.summaryValueStyles}>
              <ShowMoreText
                lines={2}
                more={
                  <Grid>
                    Show more <ExpandMore />
                  </Grid>
                }
                less={
                  <Grid>
                    Show less <ExpandLess />
                  </Grid>
                }>
                {user.current.summary || 'No summary to display'}
              </ShowMoreText>
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};
export default SummarySection;
