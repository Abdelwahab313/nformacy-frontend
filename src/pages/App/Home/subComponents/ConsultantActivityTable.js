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
import { useTranslation } from 'react-i18next';
import { formattedDateTimeNoSeconds } from 'services/dateTimeParser';
import HomePageCard from './HomePageCard';
import { RoutesPaths } from 'constants/routesPath';
import { fetchFreelancerAnswers } from 'apis/answersAPI';
import TextCroppedWithTooltip from 'components/typography/TextCroppedWithTooltip';
import FieldsChips from 'components/chips/FieldsChips';
import FreelancerAnswerActionLink from 'templates/answers/FreelancerAnswerActionLink';
import { getAnswerState } from 'core/answerStatus';
import FreelancerAnswerTime from 'templates/answers/FreelancerAnswerTime';
import { getAnswerQuestionLink } from 'services/navigation';
import LinkText from 'components/typography/LinkText';

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
  const { fetchedData: answers, isLoading } = useFetchData(
    fetchFreelancerAnswers,
  );
  if (isLoading) {
  }
  return (
    <HomePageCard
      title={t('myActivityTableTitle')}
      viewMoreText={t('viewAll')}
      viewMoreUrl={RoutesPaths.App.AnswersList}>
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
                {answers.map((answer) => (
                  <StyledTableRow
                    reference-number={answer?.question?.referenceNumber}
                    key={answer?.question?.service?.id}>
                    <StyledTableCell>
                      {`#${answer.question?.service?.referenceNumber}`}
                    </StyledTableCell>
                    <StyledTableCell scope='row'>
                      {t(answer?.question?.assignmentType)}
                    </StyledTableCell>
                    <StyledTableCell className={classes.desktopVisible}>
                      <LinkText to={getAnswerQuestionLink(answer.question?.id)}>
                        <TextCroppedWithTooltip text={answer.question?.title} />
                      </LinkText>
                    </StyledTableCell>
                    <StyledTableCell className={classes.desktopVisible}>
                      {formattedDateTimeNoSeconds(
                        new Date(answer?.question?.createdAt),
                      )}
                    </StyledTableCell>
                    <StyledTableCell className={classes.desktopVisible}>
                      <FieldsChips fields={answer?.question?.fields} />
                    </StyledTableCell>
                    <StyledTableCell>
                      <LinkText to={getAnswerQuestionLink(answer.question?.id)}>
                        <TextCroppedWithTooltip
                          text={`#${answer.referenceNumber}`}
                        />
                      </LinkText>
                    </StyledTableCell>
                    <StyledTableCell>
                      {t(`answerStatus:${getAnswerState(answer.state)}`)}
                    </StyledTableCell>
                    <StyledTableCell
                      className={[classes.desktopVisible, 'action']}>
                      <FreelancerAnswerActionLink
                        answerStatus={answer.state}
                        questionId={answer.question.id}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      {!!answer?.question?.currentActionTime ? (
                        <FreelancerAnswerTime
                          currentActionTime={
                            answer?.question?.currentActionTime
                          }
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
