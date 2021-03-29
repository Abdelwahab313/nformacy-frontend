import React from 'react';
import { Grid, TableHead, TableCell, TableRow, TableContainer, Paper, Table, TableBody, makeStyles } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import parseServicesToTableRows from 'templates/services/parseServicesToTableRows';
import LoadingCircle from 'components/progress/LoadingCircle';
import PageContainer from 'components/grid/PageContainer';
import CustomTypography from 'components/typography/Typography';
import { fetchClientServices } from 'apis/servicesAPI';
import useFetchData from 'hooks/useFetchData';
import { useLocation } from 'react-router';
import { fetchClientsDetails } from 'apis/clientsAPI';
import LinkText from 'components/typography/LinkText';
import BreadcrumbsCustomSeparator from 'components/breadcrumbs/Breadcrumbs';
import GridItem from 'components/grid/GridItem';
import Direction from 'components/grid/Direction';

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

const CorporateAccountDetails = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const location = useLocation();
  const accountId = location?.state?.accountId;

  const { fetchedData: services, isLoading } = useFetchData(() =>
    fetchClientServices(accountId),
  );
  const servicesRows = parseServicesToTableRows(services, t);

  const { fetchedData: account } = useFetchData(() => {
    return fetchClientsDetails(accountId);
  });

  if (isLoading) {
    return <LoadingCircle />;
  }

  return (
    <GridItem xs={12} sm={12} md={12}>
      <BreadcrumbsCustomSeparator pageName={t('accountDetails')} />
      <Direction>
        <PageContainer>
          <Grid>
            <Grid
              container
              direction={'row'}
              justify='space-between'
              className={classes.marginBottom}>
              <Grid item>
                <CustomTypography variant='h5' fontWeight='bold'>
                  {account.firstName + ' ' + account.lastName}
                </CustomTypography>
              </Grid>
              <Grid item>
                <LinkText to={() => { }}>
                  {t('deactivate')}
                </LinkText>
              </Grid>
            </Grid>
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
                              {service.createdAt}
                            </StyledTableCell>
                            <StyledTableCell>{service.serviceRef}</StyledTableCell>
                            <StyledTableCell className={classes.desktopVisible}>
                              {service.requestType}
                            </StyledTableCell>
                            <StyledTableCell className={classes.desktopVisible}>
                              {/* <ColoredFieldsChips fields={service?.fields} /> */}
                            </StyledTableCell>
                            <StyledTableCell>
                              {/* {service.status} */}
                            </StyledTableCell>
                            <StyledTableCell
                              className={[classes.desktopVisible, 'action']}>
                              {/* {service.action} */}
                            </StyledTableCell>
                          </StyledTableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </Grid>
        </PageContainer>
      </Direction>
    </GridItem>
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