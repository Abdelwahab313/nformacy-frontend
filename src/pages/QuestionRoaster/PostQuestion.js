import React, { useState } from 'react';
import { FormControl, Grid } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { useStyles } from '../../styles/questionRoasterStyles';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { fieldsOfExperience } from '../../constants/dropDownOptions';

const PostQuestion = () => {

  const classes = useStyles();
  const [majorField, setMajorField] = useState([]);


  return (
    <Grid container justify={'center'}>
      <Grid item xs={12} className={classes.pageHeaderStyle}>
        <Typography id={'post-question-page-header'} className={[classes.questionFieldLabel, classes.headerTextStyles]}>Add a New Question</Typography>
      </Grid>
      <Grid item xs={12} sm={11}>
        <TextField
          required
          id="question-title-field"
          label="Question title"
          defaultValue="Enter title here"
          variant="outlined"
          color={'primary'}
          fullWidth={true}
        />
        <Grid container justify={'space-between'}>
          <Grid item xs={4}>
            {/*<FormControl className={classes.formControl}>*/}
            {/*  <InputLabel id="demo-simple-select-label">Field</InputLabel>*/}
            {/*  <Select*/}
            {/*    labelId="demo-simple-select-label"*/}
            {/*    id="demo-simple-select"*/}
            {/*    value={majorField}*/}
            {/*  >*/}
            {/*    {fieldsOfExperience.map((field, key) => {*/}
            {/*      <MenuItem id={`choice-${key}`} value={field.value}>{field.label}</MenuItem>*/}
            {/*    })*/}
            {/*    }*/}
            {/*  </Select>*/}
            {/*</FormControl>*/}
          </Grid>
          <Typography className={[classes.questionFieldLabel, classes.headerTextStyles]}>Add a New Question</Typography>
          <Typography className={[classes.questionFieldLabel, classes.headerTextStyles]}>Add a New Question</Typography>
        </Grid>
      </Grid>
    </Grid>
  );

};

export default PostQuestion;