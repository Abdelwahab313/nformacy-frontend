import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ImageUploader from 'react-images-upload';
import TextField from '@material-ui/core/TextField';
import ErrorMessage from '../errors/ErrorMessage';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useStyles } from '../../styles/formsStyles';
import { useFormContext } from 'react-hook-form';

const ClientProfilePictureDialog = () => {
  const classes = useStyles();
  const { errors, setAvatar, register, user } = useFormContext();

  const uploadPhoto = (picture) => {
    setAvatar(picture);
  };
  const { t } = useTranslation();
  return (
    <Container>
      <Grid container alignItems='center'>
        <Grid item xs>
          <Typography gutterBottom variant='h4'>
           {t('basicInfo')}
          </Typography>
        </Grid>
      </Grid>
      <Divider variant='middle' />
      <Container maxWidth={false} className={classes.formControl}>
        <Typography gutterBottom variant='subtitle2'>
         {t('profilePicture')}
        </Typography>
        <ImageUploader
          withPreview={true}
          singleImage={true}
          label={t('maxFileSize')}
          withIcon={true}
          buttonText= {t('chooseImages')}
          imgExtension={['.jpg', '.gif', '.png', 'jpeg']}
          maxFileSize={1048576}
          onChange={uploadPhoto}
        />
      </Container>
      <Container maxWidth={false} className={classes.formControl}>
        <Typography gutterBottom variant='subtitle2'>
          {t('firstName')}
        </Typography>
        <TextField
          variant='outlined'
          margin='normal'
          fullWidth
          id='firstName'
          name='firstName'
          defaultValue={!user.current.firstName && ''}
          inputRef={register({ required: t('requiredMessage') })}
          autoComplete='name'
          error={!!errors.firstName}
        />
        <ErrorMessage errorField={errors.firstName} />
      </Container>
      <Container maxWidth={false} className={classes.formControl}>
        <Typography gutterBottom variant='subtitle2'>
          {t('lastName')}
        </Typography>
        <TextField
          variant='outlined'
          margin='normal'
          fullWidth
          id='lastName'
          name='lastName'
          defaultValue={!user.current.lastName && ''}
          inputRef={register({ required:  t('requiredMessage')  })}
          autoComplete='name'
          error={!!errors.lastName}
        />
        <ErrorMessage errorField={errors.lastName} />
      </Container>
    </Container>
  );
};
export default ClientProfilePictureDialog;
