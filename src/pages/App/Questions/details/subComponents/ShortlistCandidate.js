import React, { useState } from 'react';
import { Box, Grid } from '@material-ui/core';
import useStyles from '../styles/ShortlistCandidate';
import SubmitButton from 'components/buttons/SubmitButton';
import Collapse from '@material-ui/core/Collapse';
import CustomTypography from 'components/typography/Typography';
import { lightOrange, lightTurquoise, lighterPink } from 'styles/colors';

const getUserName = (user) => {
  return `${user?.firstName[0]}. ${user?.lastName}`;
};

const ShortlistCandidate = ({ candidates }) => {
  const classes = useStyles();
  const [focusedItem, setFocusedItem] = useState('');
  const shortlistedContainerColors = [lightOrange, lightTurquoise, lighterPink];
  return (
    <Grid
      container
      justify='space-around'
      className={classes.shortlistContainer}>
      {candidates.map((candidate, index) => (
        <Grid item xs={12} md={3}>
          <Box>
            <CandidateItem
              bgcolor={shortlistedContainerColors[index]}
              candidate={candidate}
              isFocused={candidate.id === focusedItem}
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
  bgcolor,
}) => {
  const classes = useStyles();
  const defaultImage = require('../../../../../assets/emptyavatar.jpg');

  return (
    <div className={classes.candidateContainerBorder}>
      <Collapse in={isFocused} collapsedHeight={350} timeout={500}>
        <Grid
          container
          onMouseEnter={() => setFocusedItem(candidate.id)}
          onMouseLeave={() => setFocusedItem('')}>
          <Box style={{ backgroundColor: bgcolor }}>
            <Grid item xs={12} md={12}>
              <img
                src={!!candidate.avatar ? candidate.avatar : defaultImage}
                className={classes.candidateImg}
              />
            </Grid>
          </Box>
          <Box p={2}>
            <Grid item xs={12}>
              <CustomTypography variant='h6' fontWeight='bold'>
                {getUserName(candidate)}
              </CustomTypography>
              <CustomTypography
                variant='body1'
                fontWeight='light'
                className={classes.candidateDesc}>
                {candidate.summary}
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
