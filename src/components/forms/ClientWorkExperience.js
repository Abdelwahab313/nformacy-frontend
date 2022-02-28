import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { useFormContext, Controller } from 'react-hook-form';
import React from 'react';
import {
  useStyles,
  selectStyle,
  selectStyleAr,
  sectionContainerStyles,
  dividerStyle,
} from '../../styles/formsStyles';
import { useTranslation } from 'react-i18next';
import ReactTooltip from 'react-tooltip';
import t from '../../locales/en/freelancerProfile.json';
import { FormControl } from '@material-ui/core';
import ReactSelectMaterialUi from 'react-select-material-ui';
import { organizationalLevel } from 'constants/dropDownOptions';
import HelpIcon from '@material-ui/icons/Help';

const ClientWorkExperience = () => {
  const classes = useStyles();
  const { control, user } = useFormContext();
  const { i18n } = useTranslation('system');
  const lang = i18n.language;
  const isArlang = lang === 'ar';

  return (
    <Container style={sectionContainerStyles}>
      <ReactTooltip globalEventOff={'click'} />
      <Grid container alignItems='center'>
        <Grid item xs>
          <Typography gutterBottom className={classes.sectionHeaderStyles}>
            {t['workExperienceHeader']}
          </Typography>
        </Grid>
      </Grid>
      <Divider variant='middle' style={dividerStyle} />
      <Container maxWidth={false} className={classes.formControl}>
        <div className={classes.formHeader}>
          <Typography gutterBottom className={classes.fieldLabelStylesDesktop}>
            {t['organizationalLevel']}
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
                placeholder={t['selectYourOrganizationalLevel']}
                SelectProps={{
                  styles: isArlang ? selectStyleAr : selectStyle ,
                }}
                options={organizationalLevel}
              />
            }
          />
        </FormControl>
      </Container>
    </Container>
  );
};

export default ClientWorkExperience;
