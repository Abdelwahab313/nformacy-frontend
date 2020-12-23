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
import { formattedDateTimeNoSeconds } from 'services/dateTimeParser';
import HomePageCard from './HomePageCard';
import { RoutesPaths } from 'constants/routesPath';
import TextCroppedWithTooltip from 'components/typography/TextCroppedWithTooltip';
import FieldsChips from 'components/chips/FieldsChips';
import FreelancerAnswerActionLink from 'templates/answers/FreelancerAnswerActionLink';
import { getAnswerState } from 'core/answerStatus';
import FreelancerAnswerTime from 'templates/answers/FreelancerAnswerTime';
import { getAnswerQuestionLink } from 'services/navigation';
import LinkText from 'components/typography/LinkText';
import LoadingCircle from 'components/progress/LoadingCircle';
import useFetchFreelancerActivities from 'hooks/useFetchFreelancerActivities';

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

  if (isLoading) {
    return <LoadingCircle />;
  }

  return (
    <HomePageCard
      title={t('myActivityTableTitle')}
      viewMoreText={t('viewAll')}
      viewMoreUrl={RoutesPaths.App.ActivitiesList}>
      <Grid container>
        <Grid item md={12} className={classes.activityTable}>
          <TableContainer component={Paper} className={classes.tableContainer}>
            <Table stickyHeader aria-label='My Activity Table'>
              <TableHead>
                <TableRow>
                  <StyledTableCell>
                    {t('serviceReferenceNumber')}
                  </StyledTableCell>
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
                </TableRow>
              </TableHead>
              <TableBody>
                {activities.map((dataRow) => (
                  <StyledTableRow
                    reference-number={dataRow.questionId}
                    key={dataRow.serviceId}>
                    <StyledTableCell>{`#${dataRow.serviceRef}`}</StyledTableCell>
                    <StyledTableCell scope='row'>
                      {t(dataRow?.assignmentType)}
                    </StyledTableCell>
                    <StyledTableCell className={classes.desktopVisible}>
                      <LinkText to={getAnswerQuestionLink(dataRow.questionId)}>
                        <TextCroppedWithTooltip text={dataRow.title} />
                      </LinkText>
                    </StyledTableCell>
                    <StyledTableCell className={classes.desktopVisible}>
                      {formattedDateTimeNoSeconds(new Date(dataRow.createdAt))}
                    </StyledTableCell>
                    <StyledTableCell className={classes.desktopVisible}>
                      <FieldsChips fields={dataRow.fields} />
                    </StyledTableCell>
                    <StyledTableCell className={classes.desktopVisible}>
                      <LinkText to={getAnswerQuestionLink(dataRow.questionId)}>
                        {`#${dataRow.answerRef}`}
                      </LinkText>
                    </StyledTableCell>
                    <StyledTableCell>
                      {t(`answerStatus:${getAnswerState(dataRow.answerState)}`)}
                    </StyledTableCell>
                    <StyledTableCell
                      className={[classes.desktopVisible, 'action']}>
                      <FreelancerAnswerActionLink
                        answerStatus={dataRow.answerState}
                        questionId={dataRow.questionId}
                      />
                    </StyledTableCell>
                    <StyledTableCell className={classes.desktopVisible}>
                      {!!dataRow?.questionTime ? (
                        <FreelancerAnswerTime
                          currentActionTime={dataRow?.questionTime}
                        />
                      ) : null}
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
export default ConsultantActivityTable;
