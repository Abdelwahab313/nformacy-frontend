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
import useFetchClientActivities from 'hooks/useFetchClientActivities';

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

const ProjectActivitiesTable = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { activities: services, isLoading } = useFetchClientActivities();
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
                <StyledTableCell>{t('activityId')}</StyledTableCell>
                <StyledTableCell className={classes.desktopVisible}>
                  {t('type')}
                </StyledTableCell>
                <StyledTableCell className={classes.desktopVisible}>
                  {t('title')}
                </StyledTableCell>
                <StyledTableCell>{t('date')}</StyledTableCell>
                <StyledTableCell className={classes.desktopVisible}>
                  {t('Beneficiaries')}
                </StyledTableCell>
                <StyledTableCell className={classes.desktopVisible}>
                  {t('state')}
                </StyledTableCell>
                <StyledTableCell className={classes.desktopVisible}>
                  {t('action')}
                </StyledTableCell>
                <StyledTableCell className={classes.desktopVisible}>
                  {t('deliverable')}
                </StyledTableCell>
                <StyledTableCell className={classes.desktopVisible}>
                  {t('evaluation')}
                </StyledTableCell>
                <StyledTableCell className={classes.desktopVisible}>
                  {t('consultant')}
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
export default ProjectActivitiesTable;
