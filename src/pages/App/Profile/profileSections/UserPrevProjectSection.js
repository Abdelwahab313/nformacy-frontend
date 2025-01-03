import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Paper from '@material-ui/core/Paper';
import { useTranslation } from 'react-i18next';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { dividerStyle, useStyles } from 'styles/formsStyles';
import React, { useRef, useState, useEffect } from 'react';
import Transition from 'components/animations/Transition';
import WorkIcon from '@material-ui/icons/Work';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import UserPrevProjectForm from 'components/forms/UserPrevProjectForm.js';
import { flatMap } from 'lodash';
import useUserFieldsFetcher from 'hooks/useUserFieldsFetcher.js';
import moment from 'moment';
import ProjectFieldsChips from 'components/chips/ProjectFieldsChips';

const UserPrevProjectSection = () => {
  const user = useRef(JSON.parse(localStorage.getItem('user')));
  const [resume, setResume] = useState([]);
  const [open, setOpen] = useState(false);
  const {
    currentUserFields,
    updateUserFields,
  } = useUserFieldsFetcher();

  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const mergeHistory = () => {
    const history = [];
    user.current.prevProjects.forEach((project) => {
      const historyEntry = {
        type: 'project',
        ...project,
        date: new Date(project.completedAt),
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
  const { t } = useTranslation();

  const renderProjectItem = (project, key) => {
    return (
      <TimelineItem key={key}>
        <TimelineOppositeContent className={classes.timelineDateFieldStyles}>
          <Typography
            className={classes.timelineFieldValueStyles}
            color='textSecondary'>
            {moment(project.completedAt).format('YYYY')}
          </Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot color='primary'>
            <WorkIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.timeLineContent}>
            <Typography
              className={classes.sectionHeaderStyles}
              color={'primary'}>
              {t('project')}
            </Typography>
            <Typography className={classes.fieldLabelStylesDesktop}>
              {project.title}
            </Typography>
            <Typography className={classes.timelineFieldValueStyles}>
              {project.jobRole}
            </Typography>
            <ProjectFieldsChips fields={project.fields} majorFields={project.majorFields} />
          </Paper>
        </TimelineContent>
      </TimelineItem>
    );
  };
  return (
    <Grid item id='achievedProject'>
      <Dialog
        TransitionComponent={Transition}
        maxWidth='lg'
        PaperProps={{ id: 'achievedProjectDialog' }}
        onClose={handleClose}
        open={open}>
        <DialogContent>
          <Grid container>
            <UserPrevProjectForm user={user}
              fields={flatMap(currentUserFields)}
              updateFields={() => updateUserFields()}
              closeDialog={handleClose} />
          </Grid>
        </DialogContent>
      </Dialog>
      <Paper className={classes.paperSection} elevation={3}>
        <Grid container justify={'space-between'}>
          <Grid container alignItems='center'>
            <Grid item xs={1} className={classes.paperSectionHeaderStyles} />
            <Grid item xs={10} className={classes.paperSectionHeaderStyles}>
              <Typography gutterBottom className={classes.sectionHeaderStyles}>
                {t('majorAchievedProjects')}
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

export default UserPrevProjectSection;
