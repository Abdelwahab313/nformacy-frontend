import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { FormContext, useFieldArray, useForm } from 'react-hook-form';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Typography from '@material-ui/core/Typography';
import t from '../../locales/en/freelancerProfile.json';
import Divider from '@material-ui/core/Divider';
import { dividerStyle, useStyles } from '../../styles/formsStyles';
import React, { useEffect, useRef, useState } from 'react';
import ResumeForm from '../forms/ResumeForm';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import WorkIcon from '@material-ui/icons/Work';
import SchoolIcon from '@material-ui/icons/School';
import MenuBookIcon from '@material-ui/icons/MenuBook';

const ResumeSection = () => {
  const user = useRef(JSON.parse(localStorage.getItem('user')));
  const [resume, setResume] = useState([]);
  const [open, setOpen] = useState(false);
  const formMethod = useForm({
    defaultValues: { ...user.current },
  });
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const mergeHistory = () => {
    const history = [];
    user.current.experiences.forEach((experience) => {
      const historyEntry = {
        type: 'experience',
        ...experience,
        date: new Date(experience.startDate),
      };
      history.push(historyEntry);
    });
    user.current.educations.forEach((education) => {
      const historyEntry = {
        type: 'education',
        ...education,
        date: new Date(education.endYear),
      };
      history.push(historyEntry);
    });
    user.current.certifications.forEach((certificate) => {
      const historyEntry = {
        type: 'certificate',
        ...certificate,
        date: new Date(certificate.startDate),
      };
      history.push(historyEntry);
    });
    return history.sort((entry1, entry2) =>
      entry1.date <= entry2.date ? -1 : 1,
    );
  };

  useEffect(() => {
    const mergedHistory = mergeHistory();
    setResume(mergedHistory);
  }, [user.current]);

  const renderExperienceItem = (experience, key) => {
    return (
      <TimelineItem key={key}>
        <TimelineOppositeContent>
          <Typography className={classes.timelineFieldValueStyles} color='textSecondary'>
            {experience.date?.toDateString()}
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
            <Typography className={classes.fieldLabelStylesDesktop}>
              {experience.title}
            </Typography>
            <Typography className={classes.timelineFieldValueStyles}>{experience.company}</Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
    );
  };
  const renderEducationItem = (education, key) => {
    return (
      <TimelineItem key={key}>
        <TimelineOppositeContent>
          <Typography className={classes.timelineFieldValueStyles} color='textSecondary'>
            {education.date?.toDateString()}
          </Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot color='primary'>
            <SchoolIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.timeLineContent}>
            <Typography className={classes.fieldLabelStylesDesktop}>
              {education.degree}
            </Typography>
            <Typography className={classes.timelineFieldValueStyles}>
              {education.fieldOfStudy}
            </Typography>
            <Typography className={classes.timelineFieldValueStyles}>
              {education.school}
            </Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
    );
  };
  const renderCertificationItem = (certification, key) => {
    return (
      <TimelineItem key={key}>
        <TimelineOppositeContent>
          <Typography className={classes.timelineFieldValueStyles} color='textSecondary'>
            {certification.date?.toDateString()}
          </Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot color='primary'>
            <MenuBookIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.timeLineContent}>
            <Typography className={classes.fieldLabelStylesDesktop}>
              {certification.name}
            </Typography>
            <Typography className={classes.timelineFieldValueStyles}>
              {certification.issuingOrganization}
            </Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
    );
  };
  return (
    <Grid item id='resume'>
      <Dialog
        PaperProps={{ id: 'resumeDialog' }}
        onClose={handleClose}
        open={open}>
        <DialogContent>
          <FormContext {...formMethod} user={user}>
            <ResumeForm />
          </FormContext>
        </DialogContent>
      </Dialog>
      <Paper className={classes.paperSection} elevation={3}>
        <Grid container justify={'space-between'}>
          <Grid container alignItems='center'>
            <Grid item xs={11} className={classes.paperSectionHeaderStyles}>
              <Typography gutterBottom className={classes.sectionHeaderStyles}>
                {t['resume']}
              </Typography>
            </Grid>
            <Grid item xs={1} className={classes.paperSectionHeaderStyles}>
              <IconButton aria-label='edit' onClick={handleClickOpen}>
                <EditIcon color={'primary'}/>
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        <Divider variant='middle' style={dividerStyle} />
        <Timeline align='alternate'>
          {resume.map((history, key) => {
            if (history.type === 'experience') {
              return renderExperienceItem(history, key);
            } else if (history.type === 'education') {
              return renderEducationItem(history, key);
            } else if (history.type === 'certificate') {
              return renderCertificationItem(history, key);
            }
          })}
        </Timeline>
      </Paper>
    </Grid>
  );
};

export default ResumeSection;
