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
import useFetchData from 'hooks/useFetchData';
import { fetchClientServices } from 'apis/servicesAPI';
import { useTranslation } from 'react-i18next';
import HomePageCard from './HomePageCard';
import { RoutesPaths } from 'constants/routesPath';
import LoadingCircle from 'components/progress/LoadingCircle';
import parseServicesToTableRows from 'templates/services/parseServicesToTableRows';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#3a3b4b',
    color: theme.palette.common.white,
    textAlign: 'center',
    fontWeight: 'bold',
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

const ClientActivityTable = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { fetchedData: services, isLoading } = useFetchData(
    fetchClientServices,
  );
  const servicesRows = parseServicesToTableRows(services, t);
  if (isLoading) {
    return <LoadingCircle />;
  }
  return (
    <HomePageCard
      title={t('myActivityTableTitle')}
      viewMoreText={t('viewAll')}
      viewMoreUrl={RoutesPaths.App.Services}>
      <Grid container>
        <Grid item md={12} className={classes.activityTable}>
          <TableContainer component={Paper} className={classes.tableContainer}>
            <Table stickyHeader aria-label='My Activity Table'>
              <TableHead>
                <TableRow>
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
                {servicesRows.map((service) => (
                  <StyledTableRow
                    reference-number={service.serviceRef}
                    key={service.id}>
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
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </HomePageCard>
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
}));
export default ClientActivityTable;
