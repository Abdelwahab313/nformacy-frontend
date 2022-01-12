import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { fontNames, fontWieghts } from 'constants/fonts';
import clsx from 'clsx';

// fontWeght will be ['regular', 'bold', 'light',]
const CustomTypography = ({
  variant,
  fontWeight = 'regular',
  className,
  children,
  ...props
}) => {
  // check the font family based on both variant and weight
  // map the variant for the sizes
  const classes = useStyles({ variant, fontWeight });

  return (
    <Typography
      variant={variant}
      className={clsx(classes.fontStyles, className)}
      {...props}>
      {children}
    </Typography>
  );
};

const useStyles = makeStyles({
  fontStyles: {
    fontFamily: fontNames.Roboto,
    fontWeight: (props) => getFontWeightFromVariant(props.fontWeight),
  },
});

const getFontWeightFromVariant = (fontWeight) => {
  if (fontWeightsEnum.LIGHT === fontWeight) return fontWieghts.LIGHT;
  else if (fontWeightsEnum.BOLD === fontWeight) return fontWieghts.BOLD;
  return fontWieghts.REGULAR;
};

const fontWeightsEnum = {
  LIGHT: 'light',
  REGULAR: 'regular',
  BOLD: 'bold',
};

export default CustomTypography;
