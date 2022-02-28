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
import ServiceRefLink from 'templates/services/ServiceRefLink';
import TextCroppedWithTooltip from 'components/typography/TextCroppedWithTooltip';
import CustomTypography from 'components/typography/Typography';
import { formattedDateMonthAndDay } from 'services/dateTimeParser';
import QuestionCountDown from 'components/counters/QuestionCountDown';

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

const ServicesStyledTable = ({ services, isMultiUser }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Grid container>
      <Grid item md={12} className={classes.activityTable}>
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table stickyHeader aria-label='My Activity Table'>
            <TableHead>
              <TableRow>
                {!!isMultiUser && <StyledTableCell>{t('by')}</StyledTableCell>}

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
                {!isMultiUser && (
                  <>
                    <StyledTableCell className={classes.desktopVisible}>
                      {t('time')}
                    </StyledTableCell>
                    <StyledTableCell className={classes.desktopVisible}>
                      {t('alarm')}
                    </StyledTableCell>
                  </>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {services.length === 0 ? (
                <TableCell colspan='8' className={classes.noRecords}>
                  {t('noMatchingRecord')}
                </TableCell>
              ) : (
                services.map((service) => (
                  <StyledTableRow
                    reference-number={service.RefNumber}
                    key={service.id}>
                    {!!isMultiUser && (
                      <StyledTableCell scope='row'>
                        {service?.serviceOwner}
                      </StyledTableCell>
                    )}
                    <StyledTableCell scope='row'>
                      {service.requestType}
                    </StyledTableCell>
                    <StyledTableCell>
                      <ServiceRefLink
                        serviceId={service.rowServiceId}
                        serviceState={service.rowServiceState}
                        referenceId={service.serviceRef}
                      />
                    </StyledTableCell>
                    <StyledTableCell className={classes.desktopVisible}>
                      <TextCroppedWithTooltip
                        text={service.title}
                        maxChar={15}
                      />
                    </StyledTableCell>
                    <StyledTableCell className={classes.desktopVisible}>
                      <CustomTypography variant='body2' gutterBottom>
                        {formattedDateMonthAndDay(service.createdAt)}
                      </CustomTypography>
                    </StyledTableCell>
                    <StyledTableCell>{service.status}</StyledTableCell>
                    <StyledTableCell
                      className={[classes.desktopVisible, 'action']}>
                      {service.action}
                    </StyledTableCell>
                    {!isMultiUser && (
                      <>
                        <StyledTableCell className={classes.desktopVisible}>
                          <QuestionCountDown
                            date={service.actionTime}
                            data-date={service.actionTime}
                            showIcon={false}
                            className={'currentActionTime'}
                          />
                        </StyledTableCell>
                        <StyledTableCell className={classes.desktopVisible}>
                          {service.alarm}
                        </StyledTableCell>
                      </>
                    )}
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
export default ServicesStyledTable;
