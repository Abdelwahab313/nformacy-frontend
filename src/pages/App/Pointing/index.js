import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import BreadcrumbsCustomSeparator from 'components/breadcrumbs/Breadcrumbs';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#3a3b4b',
    color: theme.palette.common.white,
    textAlign: 'center',
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
  },
  body: {
    fontSize: 14,
    textAlign: 'center',
    whiteSpace: 'nowrap',
  },
}))(TableCell);

export const Pointing = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Grid container>
      <Grid item md={12} className={classes.activityTable}>
        <BreadcrumbsCustomSeparator pageName={t('pointingTable')} />
        <TableContainer component={Paper} >
          <Table stickyHeader aria-label='My Activity Table'>
            <TableHead>
              <TableRow>
                <StyledTableCell className={classes.desktopVisible}>
                  {t('serviceId')}
                </StyledTableCell>
                <StyledTableCell className={classes.desktopVisible}>
                  {t('serviceType')}
                </StyledTableCell>
                <StyledTableCell className={classes.desktopVisible}>
                  {t('date')}
                </StyledTableCell>
                <StyledTableCell className={classes.desktopVisible}>
                  {t('activity')}
                </StyledTableCell>
                <StyledTableCell className={classes.desktopVisible}>
                  {t('pointsCollected')}
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableCell colspan="8" className={classes.noRecords}>Sorry, no matching records found</TableCell>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  desktopVisible: {
    display: 'table-cell',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  activityTable: {
    maxWidth: '50%',
    margin: '0 auto ',
    marginTop: '60px',
    maxHeight: '350px'
  },
  noRecords: {
    textAlign: 'center',
    fontWeight: 'bold'
  }
}));

export default Pointing;