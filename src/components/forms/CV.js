import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import t from '../../locales/en/freelancerProfile.json';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import ImageUploader from 'react-images-upload';
import { useFormContext } from 'react-hook-form';
import { nextButtonStyles, useStyles } from '../../styles/formsStyles';
import ErrorMessage from '../errors/ErrorMessage';

const CV = () => {
  const { cv, setCV, errors } = useFormContext();
  const classes = useStyles();

  const uploadCV = (cv) => {
    setCV(cv);
  };
  return <Container className={classes.nestedContainer}>
    <Grid container alignItems='center'>
      <Grid item xs>
        <Typography gutterBottom className={classes.fieldLabelStylesDesktop}>
          {t['CV']}
        </Typography>
      </Grid>
    </Grid>
    <Divider variant='middle' />
    <Fragment>
      <ImageUploader
        singleImage={true}
        label={'Accepted File Format: pdf'}
        accept='application/pdf'
        withIcon={true}
        onChange={uploadCV}
        buttonStyles={nextButtonStyles(false)}
        buttonText={t['chooseCV']}
        imgExtension={['.pdf']}
      />
      {cv?.length > 0 && (
        <Typography gutterBottom variant='subtitle2'>
          {cv[0].name}
        </Typography>
      )}
      <ErrorMessage errorField={errors.cv} />
    </Fragment>
  </Container>;
};

export default CV;
