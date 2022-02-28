import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import ImageUploader from 'react-images-upload';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { nextButtonStyles, useStyles } from '../../styles/formsStyles';
import ErrorMessage from '../errors/ErrorMessage';

const CV = () => {
  const { cv, setCV, errors, user } = useFormContext();
  const classes = useStyles();
  const cvLink = user?.current?.cv;
  const cvFileName = cvLink?.split('/').pop().replace('%20', ' ');
  const { t } = useTranslation();

  const uploadCV = (cv) => {
    setCV(cv);
  };

  const handleCVFileName = () => {
    if (cv?.length > 0) {
      return (<Typography gutterBottom variant='subtitle2'>
        {cv[0].name}
      </Typography>);
    }
    else if (user?.current?.cv?.indexOf('.pdf') != -1) {
      return cvFileName;
    }
  };
  return <Container className={classes.nestedContainer}>
    <Grid container alignItems='center'>
      <Grid item xs>
        <Typography gutterBottom className={classes.fieldLabelStylesDesktop}>
          {t('CV')}
        </Typography>
      </Grid>
    </Grid>
    <Divider variant='middle' />
    <Fragment>
      <ImageUploader
        singleImage={true}
        label={t('acceptedFileFormat')}
        accept='application/pdf'
        withIcon={true}
        onChange={uploadCV}
        buttonStyles={nextButtonStyles(false)}
        buttonText={t('chooseCV')}
        imgExtension={['.pdf']}
      />
      {handleCVFileName()}
      <ErrorMessage errorField={errors.cv} />
    </Fragment>
  </Container>;
};

export default CV;
