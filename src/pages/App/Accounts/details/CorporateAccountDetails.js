import React, { useMemo } from 'react';
import {
  Grid,
  TableHead,
  TableCell,
  TableRow,
  TableContainer,
  Paper,
  Table,
  TableBody,
  makeStyles,
} from '@material-ui/core';
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
import BreadcrumbsCustomSeparator from 'components/breadcrumbs/Breadcrumbs';
import Direction from 'components/grid/Direction';
import DeactivateAccountButton from './DeactivateAccountButton';
import ReactivateAccountButton from './ReactivateAccountButton';
import clsx from 'clsx';

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

  const isDeactivatedUser = useMemo(() => {
    return !!account?.deactivatedAt;
  }, [account]);

  if (isLoading) {
    return <LoadingCircle />;
  }

  return (
    <Direction>
      <PageContainer>
        <Grid container alignItems={'flex-start'} justify={'center'}>
          <Grid item xs={10} sm={10} className={classes.pageContainerMargin}>
            <BreadcrumbsCustomSeparator pageName={t('accountDetails')} />
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              className={classes.accountDetailsWrapper}>
              <Grid
                container
                direction={'row'}
                justify='space-between'
                className={clsx(
                  classes.pageContainerMargin,
                  classes.marginBottom,
                )}>
                <Grid item>
                  <CustomTypography variant='h5' fontWeight='bold'>
                    {account.firstName + ' ' + account.lastName}
                  </CustomTypography>
                </Grid>
                <Grid item>
                  {!!isDeactivatedUser ? (
                    <ReactivateAccountButton accountId={accountId} />
                  ) : (
                    <DeactivateAccountButton accountId={accountId} />
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item md={12} className={classes.activityTable}>
                <TableContainer
                  component={Paper}
                  className={classes.tableContainer}>
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
                              {service.createdAt}
                            </StyledTableCell>
                            <StyledTableCell>
                              {service.serviceRef}
                            </StyledTableCell>
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
                        ))
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </PageContainer>
    </Direction>
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
  accountDetailsWrapper: {
    margin: [theme.spacing(4), theme.spacing(1)],
  },
  noRecords: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
}));

export default CorporateAccountDetails;
