import React from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
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
import { questionTypesOfAssignment } from 'constants/dropDownOptions';
import { getServiceStatus } from 'core/serviceStatus';
import { ServiceRefIdLink } from 'templates/services/ServicesTable';
import { useTranslation } from 'react-i18next';
import { formattedDateTimeNoSeconds } from 'services/dateTimeParser';
import ServiceActionLink from 'templates/services/ServiceActionLink';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#3a3b4b',
    color: theme.palette.common.white,
    textAlign: 'center',
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

const ActivityTable = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { fetchedData: services, isLoading } = useFetchData(
    fetchClientServices,
  );
  if (isLoading) {
  }
  return (
    <Grid container>
      <Grid container>
        <Grid item md={6}>
          <Typography align={'left'} variant='h6'>
            {t('myActivityTableTitle')}
          </Typography>
        </Grid>
        <Grid item md={6}>
          <Typography align={'right'} variant='h6'>
            {t('viewAll')}
          </Typography>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item md={12}>
          <TableContainer component={Paper} className={classes.tableContainer}>
            <Table stickyHeader aria-label='My Activity Table'>
              <TableHead>
                <TableRow>
                  <StyledTableCell>{t('activityType')}</StyledTableCell>
                  <StyledTableCell>{t('refNo')}</StyledTableCell>
                  <StyledTableCell>{t('title')}</StyledTableCell>
                  <StyledTableCell>{t('requestDate')}</StyledTableCell>
                  <StyledTableCell>{t('state')}</StyledTableCell>
                  <StyledTableCell>{t('actionNeeded')}</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {services.map((service) => (
                  <StyledTableRow key={service.id}>
                    <StyledTableCell scope='row'>
                      {
                        questionTypesOfAssignment.filter(
                          (assignmentOption) =>
                            assignmentOption.value === service.assignmentType,
                        )[0]?.label
                      }
                    </StyledTableCell>
                    <StyledTableCell>
                      <ServiceRefIdLink
                        serviceId={service.id}
                        referenceId={service.referenceNumber}
                      />
                    </StyledTableCell>
                    <StyledTableCell>{service.title}</StyledTableCell>
                    <StyledTableCell>
                      {formattedDateTimeNoSeconds(new Date(service.createdAt))}
                    </StyledTableCell>
                    <StyledTableCell>
                      {t(
                        `serviceStatus:${getServiceStatus(
                          service.state,
                          service.questionState,
                        )}`,
                      )}
                    </StyledTableCell>
                    <StyledTableCell>
                      <ServiceActionLink
                        status={service.state}
                        serviceId={service.id}
                        questionId={service.questionId}
                        questionState={service.questionState}
                      />
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles(() => ({
  tableContainer: {
    maxHeight: '350px',
  },
}));
export default ActivityTable;
