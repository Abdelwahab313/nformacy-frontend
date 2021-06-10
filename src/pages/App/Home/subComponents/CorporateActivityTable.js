import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useTranslation } from 'react-i18next';
import LoadingCircle from 'components/progress/LoadingCircle';
import parseServicesToTableRows from 'templates/services/parseServicesToTableRows';
import useFetchCorporateActivities from 'hooks/useFetchCorporateActivities';
import authManager from 'services/authManager';

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
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    height: '75px',
  },
}))(TableRow);

const CorporateActivityTable = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const currentUser = authManager.retrieveCurrentUser();
  const { activities: services, isLoading } = useFetchCorporateActivities(
    currentUser.id,
  );
  const servicesRows = parseServicesToTableRows(services, t);
  if (isLoading) {
    return <LoadingCircle />;
  }

  return (
    <Grid container>
      <Grid item md={12} className={classes.activityTable}>
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table stickyHeader aria-label='My Activity Table'>
            <TableHead>
              <TableRow>
                <StyledTableCell>{t('by')}</StyledTableCell>
                <StyledTableCell>{t('activityType')}</StyledTableCell>
                <StyledTableCell>{t('refNo')}</StyledTableCell>
                <StyledTableCell className={classes.desktopVisible}>
                  {t('title')}
                </StyledTableCell>
                <StyledTableCell className={classes.desktopVisible}>
                  {t('requestDate')}
                </StyledTableCell>
                <StyledTableCell>{t('state')}</StyledTableCell>
                <StyledTableCell className={classes.desktopVisible}>
                  {t('actionNeeded')}
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {servicesRows.length === 0 ? (
                <TableCell colspan='8' className={classes.noRecords}>
                  Sorry, no matching records found
                </TableCell>
              ) : (
                servicesRows.map((service) => (
                  <StyledTableRow
                    reference-number={service.refNumber}
                    key={service.id}>
                    <StyledTableCell scope='row'>
                      {service?.serviceOwner}
                    </StyledTableCell>
                    <StyledTableCell scope='row'>
                      {service.requestType}
                    </StyledTableCell>
                    <StyledTableCell>{service.serviceRef}</StyledTableCell>
                    <StyledTableCell className={classes.desktopVisible}>
                      {service.title}
                    </StyledTableCell>
                    <StyledTableCell className={classes.desktopVisible}>
                      {service.createdAt}
                    </StyledTableCell>
                    <StyledTableCell>{service.status}</StyledTableCell>
                    <StyledTableCell
                      className={[classes.desktopVisible, 'action']}>
                      {service.action}
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    maxHeight: '350px',
  },
  desktopVisible: {
    display: 'table-cell',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  activityTable: {
    width: '100%',
  },
  noRecords: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
}));
export default CorporateActivityTable;
