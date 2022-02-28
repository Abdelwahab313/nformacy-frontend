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
import LoadingCircle from 'components/progress/LoadingCircle';
import useFetchFreelancerActivities from 'hooks/useFetchFreelancerActivities';
import parseActivitiesToTableRow from 'templates/activities/parseActivitiesToTable';
import { useTranslation } from 'react-i18next';
import TextCroppedWithTooltip from 'components/typography/TextCroppedWithTooltip';
import CustomTypography from 'components/typography/Typography';
import ActivityRefLink from 'templates/services/ActivityRefLink';
import { formattedDateTimeNoSeconds } from 'services/dateTimeParser';
import FreelancerAnswerTime from 'templates/answers/FreelancerAnswerTime';

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

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    height: '75px',
  },
}))(TableRow);

const ConsultantActivityTable = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  const { activities, isLoading } = useFetchFreelancerActivities();
  const parsedActivitiesToTable = parseActivitiesToTableRow(activities, t);

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
                <StyledTableCell>{t('assignmentType')}</StyledTableCell>
                <StyledTableCell className={classes.desktopVisible}>
                  {t('title')}
                </StyledTableCell>
                <StyledTableCell className={classes.desktopVisible}>
                  {t('requestDate')}
                </StyledTableCell>
                <StyledTableCell className={classes.desktopVisible}>
                  {t('fields')}
                </StyledTableCell>
                <StyledTableCell className={classes.desktopVisible}>
                  {t('answer')}
                </StyledTableCell>
                <StyledTableCell>{t('state')}</StyledTableCell>
                <StyledTableCell className={classes.desktopVisible}>
                  {t('actionNeeded')}
                </StyledTableCell>
                <StyledTableCell className={classes.desktopVisible}>
                  {t('time')}
                </StyledTableCell>
                <StyledTableCell className={classes.desktopVisible}>
                  {t('alarm')}
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {parsedActivitiesToTable.length === 0 ? (
                <TableCell colspan='8' className={classes.noRecords}>
                   {t('noMatchingRecord')}
                </TableCell>
              ) : (
                parsedActivitiesToTable.map((dataRow) => (
                  <StyledTableRow
                    reference-number={dataRow.serviceId}
                    key={dataRow.serviceId}>
                    <StyledTableCell>
                      <ActivityRefLink
                        activityType={dataRow.activityType}
                        serviceId={dataRow.serviceId}
                        questionId={dataRow.questionId}
                        referenceId={dataRow.activityRef}
                      />
                    </StyledTableCell>
                    <StyledTableCell>{dataRow.requestType}</StyledTableCell>
                    <StyledTableCell className={classes.desktopVisible}>
                      <TextCroppedWithTooltip
                        text={dataRow.title}
                        maxChar={15}
                      />
                    </StyledTableCell>
                    <StyledTableCell className={classes.desktopVisible}>
                      <CustomTypography variant='body2' gutterBottom>
                        {formattedDateTimeNoSeconds(dataRow.date)}
                      </CustomTypography>
                    </StyledTableCell>
                    <StyledTableCell className={classes.desktopVisible}>
                      {dataRow.fields}
                    </StyledTableCell>
                    <StyledTableCell className={classes.desktopVisible}>
                      {dataRow.answerRef}
                    </StyledTableCell>
                    <StyledTableCell>{dataRow.status}</StyledTableCell>
                    <StyledTableCell
                      className={[classes.desktopVisible, 'action']}>
                      {dataRow.action}
                    </StyledTableCell>
                    <StyledTableCell className={classes.desktopVisible}>
                      <FreelancerAnswerTime currentActionTime={dataRow.time} />
                    </StyledTableCell>
                    <StyledTableCell className={classes.desktopVisible}>
                      {dataRow.timeAlarm}
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
export default ConsultantActivityTable;
