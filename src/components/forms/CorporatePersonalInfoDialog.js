import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ErrorMessage from '../errors/ErrorMessage';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  useStyles, selectStyle,selectStyleAr
} from '../../styles/formsStyles';
import { useFormContext } from 'react-hook-form';
import HelpIcon from '@material-ui/icons/Help';
import FormControl from '@material-ui/core/FormControl';
import { Controller } from 'react-hook-form';
import ReactSelectMaterialUi from 'react-select-material-ui';
import CreatableSelect from 'react-select/creatable';
import { industries, companySizeOptions } from 'constants/dropDownOptions';
import { getCountriesOptions } from 'constants/countries';

const CorporatePersonalInfoDialog = () => {
  const classes = useStyles();
  const { errors, control, user } = useFormContext();
  const countries = getCountriesOptions(isArlang);
  const { t } = useTranslation();
  const { i18n } = useTranslation('system');
  const lang = i18n.language;
  const isArlang = lang === 'ar';

  return (
    <Container>
      <Grid container alignItems='center'>
        <Grid item xs>
          <Typography gutterBottom variant='h4'>
            Personal Information
          </Typography>
        </Grid>
      </Grid>
      <Divider variant='middle' />
      <Container maxWidth={false} className={classes.formControl}>
        <div className={classes.formHeader}>
          <Typography gutterBottom className={classes.fieldLabelStylesDesktop}>
            {t('country')}
          </Typography>
          <HelpIcon
            className={classes.formHeaderIcon}
            data-tip={t('selectCountryOfResidenceMessage')}
            color='primary'
            fontSize='small'
          />
        </div>
        <FormControl fullWidth id='country-select'>
          <Controller
            name='country'
            rules={{ required: t('requiredMessage') }}
            control={control}
            defaultValue={!user.current.country && 0}
            as={
              <ReactSelectMaterialUi
                fullWidth={true}
                placeholder={t('selectCountryMessage')}
                SelectProps={{
                  styles: isArlang ? selectStyleAr : selectStyle ,
                }}
                options={countries}
              />
            }
          />
        </FormControl>

        <ErrorMessage errorField={errors.country} />
      </Container>

      <Container maxWidth={false} className={classes.formControl}>
        <div className={classes.formHeader}>
          <Typography gutterBottom className={classes.fieldLabelStylesDesktop}>
            {t('industryOfExperience')}
          </Typography>
          <HelpIcon
            className={classes.formHeaderIcon}
            data-tip={t('industryOfExperienceHint')}
            color='primary'
            fontSize='small'
          />
        </div>
        <Controller
          name='industriesOfExperience'
          id='industriesOfExperience'
          rules={{ required: t('requiredMessage') }}
          control={control}
          as={
            <CreatableSelect
              defaultValue={
                !!user.current.industriesOfExperience
                  ? user.current.industriesOfExperience.map((userIndustry) => {
                    return industries(t).find(
                      (industry) => userIndustry === industry.value,
                    );
                  })
                  : []
              }
              styles={selectStyle}
              isMulti
              options={industries(t)}
            />
          }
        />
        <ErrorMessage errorField={errors.industriesOfExperience} />
      </Container>

      <Container maxWidth={false} className={classes.formControl}>
        <div className={classes.formHeader}>
          <Typography gutterBottom className={classes.fieldLabelStylesDesktop}>
            {t('companySize')}
          </Typography>
        </div>
        <Controller
          name='companySize'
          id='companySize'
          rules={{ required: t('requiredMessage') }}
          control={control}
          defaultValue={!user.current.companySize && 0}
          as={
            <ReactSelectMaterialUi
              fullWidth={true}
              placeholder={t('selectCompanySize')}
              SelectProps={{
                styles: isArlang ? selectStyleAr : selectStyle ,
              }}
              options={companySizeOptions}
            />
          }
        />
        <ErrorMessage errorField={errors.companySize} />
      </Container>
    </Container>
  );
};
export default CorporatePersonalInfoDialog;
