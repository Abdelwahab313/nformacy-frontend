import React from 'react';
import Container from '@material-ui/core/Container';
import { useTranslation } from 'react-i18next';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import {
  useStyles, selectStyle, sectionContainerStyles, selectStyleAr
} from '../../styles/formsStyles';
import { useFormContext } from 'react-hook-form';
import HelpIcon from '@material-ui/icons/Help';
import FormControl from '@material-ui/core/FormControl';
import { Controller } from 'react-hook-form';
import ReactSelectMaterialUi from 'react-select-material-ui';
import { organizationalLevel } from 'constants/dropDownOptions';
import ReactTooltip from 'react-tooltip';

const ClientWorkStatusDialog = () => {
  const classes = useStyles();
  const { control, user } = useFormContext();
  const { t } = useTranslation();
  const { i18n } = useTranslation('system');
  const lang = i18n.language;
  const isArlang = lang === 'ar';
  const organizationalLevelOptions = organizationalLevel.map(organizationalLevel => {
    const translatedValue = t(organizationalLevel.label);
    return {
      label: translatedValue,
      value: organizationalLevel.value
    };
  });
  return (
    <Container style={sectionContainerStyles}>
      <ReactTooltip globalEventOff={'click'} />
      <Grid container alignItems='center'>
        <Grid item xs>
          <Typography gutterBottom variant='h4'>
            {t('workExperienceHeader')}
          </Typography>
        </Grid>
      </Grid>
      <Divider variant='middle' />
      <Container maxWidth={false} className={classes.formControl}>
        <div className={classes.formHeader}>
          <Typography gutterBottom className={classes.fieldLabelStylesDesktop}>
            {t('organizationalLevel')}
          </Typography>
          <HelpIcon
            className={classes.formHeaderIcon}
            data-tip={t['selectYourOrganizationalLevel']}
            color='primary'
            fontSize='small'
          />
        </div>
        <FormControl fullWidth id='organizational-select'>
          <Controller
            name='organizationLevel'
            control={control}
            defaultValue={!user.current.organizationLevel && ''}
            as={
              <ReactSelectMaterialUi
                fullWidth={true}
                name='organizationLevel'
                placeholder={t('selectYourOrganizationalLevel')}
                SelectProps={{
                  styles: isArlang ? selectStyleAr : selectStyle ,
                }}

                options={organizationalLevelOptions} 
              />
            }
          />
        </FormControl>
      </Container>
    </Container>
  );
};
export default ClientWorkStatusDialog;
