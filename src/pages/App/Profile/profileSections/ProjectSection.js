import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Typography from '@material-ui/core/Typography';
import t from '../../../../locales/en/freelancerProfile.json';
import Divider from '@material-ui/core/Divider';
import { dividerStyle, useStyles } from '../../../../styles/formsStyles';
import React, { useEffect, useRef, useState } from 'react';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import Transition from '../../../../components/animations/Transition';
import LaptopIcon from '@material-ui/icons/Laptop';
import ProjectForm from 'components/forms/ProjectForm.js';

const ProjectSection = () => {
  const user = useRef(JSON.parse(localStorage.getItem('user')));
  const [resume, setResume] = useState([]);
  const [open, setOpen] = useState(false);

  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const mergeHistory = () => {
    const history = [];
    user.current.projects.forEach((project) => {
      const historyEntry = {
        type: 'project',
        ...project,
        date: new Date(project.startDate),
      };
      history.push(historyEntry);
    });
    return history.sort((entry1, entry2) =>
      entry1.date <= entry2.date ? 1 : -1,
    );
  };

  useEffect(() => {
    const mergedHistory = mergeHistory();
    setResume(mergedHistory);
  }, [user.current]);

  const renderProjectItem = (project, key) => {
    return (
      <TimelineItem key={key}>
        <TimelineSeparator>
          <TimelineDot color='primary'>
            <LaptopIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.timeLineContent}>
            <Typography
              className={classes.sectionHeaderStyles}
              color={'primary'}>
              {t['majorAchievedProjects']}
            </Typography>
            <Typography className={classes.fieldLabelStylesDesktop}>
              {project.title}
            </Typography>
            <Typography className={classes.timelineFieldValueStyles}>
              {project.jobRole}
            </Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
    );
  };
  return (
    <Grid item id='project'>
      <Dialog
        TransitionComponent={Transition}
        maxWidth='lg'
        PaperProps={{ id: 'projectDialog' }}
        onClose={handleClose}
        open={open}>
        <DialogContent>
          <Grid container>
            <ProjectForm user={user} closeDialog={handleClose} />
          </Grid>
        </DialogContent>
      </Dialog>
      <Paper className={classes.paperSection} elevation={3}>
        <Grid container justify={'space-between'}>
          <Grid container alignItems='center'>
            <Grid item xs={1} className={classes.paperSectionHeaderStyles} />
            <Grid item xs={10} className={classes.paperSectionHeaderStyles}>
              <Typography gutterBottom className={classes.sectionHeaderStyles}>
                {t['majorAchievedProjects']}
              </Typography>
            </Grid>
            <Grid item xs={1} className={classes.paperSectionHeaderStyles}>
              <IconButton aria-label='edit' onClick={handleClickOpen}>
                <EditIcon color={'primary'} />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        <Divider variant='middle' style={dividerStyle} />
        <Timeline align='alternate'>
          {resume.map((history, key) => {
            return renderProjectItem(history, key);
          })}
        </Timeline>
      </Paper>
    </Grid>
  );
};

export default ProjectSection;
