import React from 'react';
import { Grid, TableHead, TableCell, TableRow, TableContainer, Paper, Table, TableBody, makeStyles } from '@material-ui/core';
import HomePageCard from './HomePageCard';
import { withStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import useFetchClientActivities from 'hooks/useFetchClientActivities';
import parseServicesToTableRows from 'templates/services/parseServicesToTableRows';
import LoadingCircle from 'components/progress/LoadingCircle';
import { RoutesPaths } from 'constants/routesPath';

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
    // borderRight: '1px solid black',
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

const CorporateAccountDetails = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { activities: services, isLoading } = useFetchClientActivities();
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
                  <StyledTableCell>{t('date')}</StyledTableCell>
                  <StyledTableCell>{t('assignmentId')}</StyledTableCell>
                  <StyledTableCell className={classes.desktopVisible}>
                    {t('type')}
                  </StyledTableCell>
                  <StyledTableCell className={classes.desktopVisible}>
                    {t('fields')}
                  </StyledTableCell>
                  <StyledTableCell>{t('results')}</StyledTableCell>
                  <StyledTableCell className={classes.desktopVisible}>
                    {t('review')}
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {servicesRows.length === 0 ?
                  <TableCell colspan="8" className={classes.noRecords}>Sorry, no matching records found</TableCell>
                  : servicesRows.map((service) => (
                    <StyledTableRow
                      reference-number={service.RefNumber}
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
                      <StyledTableCell className={classes.desktopVisible}>
                        {service.actionTime}
                      </StyledTableCell>
                      <StyledTableCell className={classes.desktopVisible}>
                        {service.alarm}
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
  noRecords: {
    textAlign: 'center',
    fontWeight: 'bold'
  }
}));

export default CorporateAccountDetails;