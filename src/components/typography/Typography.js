import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import fontNames from 'constants/fonts';

// fontWeght will be ['regular', 'bold', 'light',]
const CustomTypography = ({
  variant,
  fontWeight = 'regular',
  children,
  ...props
}) => {
  // check the font family based on both variant and weight
  // map the variant for the sizes
  const classes = useStyles({ variant, fontWeight });

  return (
    <Typography variant={variant} className={classes.fontStyles} {...props}>
      {children}
    </Typography>
  );
};

const useStyles = makeStyles({
  fontStyles: {
    fontFamily: (props) =>
      getFontFamilyFromVariant(props.variant, props.fontWeight),
  },
});

const getFontFamilyFromVariant = (variant, fontWeight) => {
  if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(variant)) {
    return fontMapping.AP[fontWeight];
  } else {
    return fontMapping.SF[fontWeight];
  }
};

const fontWeights = {
  LIGHT: 'light',
  REGULAR: 'regular',
  BOLD: 'bold',
};
const fontMapping = {
  SF: {
    [fontWeights.LIGHT]: fontNames.SF_UI_LIGHT,
    [fontWeights.REGULAR]: fontNames.SF_UI_REGULAR,
    [fontWeights.BOLD]: fontNames.SF_UI_BOLD,
  },
  AP: {
    [fontWeights.LIGHT]: fontNames.APERCU_PRO_Regular,
    [fontWeights.REGULAR]: fontNames.APERCU_PRO_Regular,
    [fontWeights.BOLD]: fontNames.APERCU_PRO_BOLD,
  },
};
export default CustomTypography;
