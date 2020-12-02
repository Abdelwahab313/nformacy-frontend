import React, { useState } from 'react';
import { Box, Grid } from '@material-ui/core';
import useStyles from '../styles/ShortlistCandidate';
import SubmitButton from 'components/buttons/SubmitButton';
import Collapse from '@material-ui/core/Collapse';
import CustomTypography from 'components/typography/Typography';
import { lightOrange, lightTurquoise, lighterPink } from 'styles/colors';

const ShortlistCandidate = ({ shortlisted }) => {
  const classes = useStyles();
  const [focusedItem, setFocusedItem] = useState('');
  const candidateImg = require('../../../../assets/emptyavatar.jpg');
  const shortlistedContainerColors = [lightOrange, lightTurquoise, lighterPink];
  return (
    <Grid
      container
      justify='space-around'
      className={classes.shortlistContainer}>
      {shortlisted.map((candidate, index) => (
        <Grid item xs={12} md={3}>
          <Box>
            <CandidateItem
              classes={classes}
              bgcolor={shortlistedContainerColors[index]}
              candidateImg={candidateImg}
              candidate={candidate}
              isFocused={candidate.userName === focusedItem}
              setFocusedItem={setFocusedItem}
              onCandidateClick={() => {}}
            />
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

const CandidateItem = ({
  candidate,
  isFocused,
  setFocusedItem,
  onCandidateClick,
  candidateImg,
  bgcolor,
  classes,
}) => {
  return (
    <div className={classes.candidateContainerBorder}>
      <Collapse in={isFocused} collapsedHeight={350} timeout={500}>
        <Grid
          container
          onMouseEnter={() => setFocusedItem(candidate.userName)}
          onMouseLeave={() => setFocusedItem('')}>
          <Box style={{ backgroundColor: bgcolor }}>
            <Grid item xs={12} md={12}>
              <img src={candidateImg} className={classes.candidateImg} />
            </Grid>
          </Box>
          <Box p={2}>
            <Grid item xs={12} md={12}>
              <CustomTypography variant='h6' fontWeight='bold'>
                {candidate.userName}
              </CustomTypography>
              <CustomTypography
                variant='body1'
                fontWeight='light'
                className={classes.candidateDesc}>
                description about candidate description about candidate
                description about candidate description about candidate
                description about candidate description about candidate
                description about candidate description about candidate
              </CustomTypography>
            </Grid>
            <Grid container justify='center' xs={12}>
              {isFocused && (
                <SubmitButton
                  id={'proceedBtn'}
                  onClick={() => onCandidateClick()}
                  buttonText={
                    <CustomTypography variant='body1'>
                      Book Candidate
                    </CustomTypography>
                  }
                />
              )}
            </Grid>
          </Box>
        </Grid>
      </Collapse>
    </div>
  );
};

export default ShortlistCandidate;
