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
import { questionTypesOfAssignment } from 'constants/dropDownOptions';
import { ServiceRefIdLink } from 'templates/services/ServicesTable';
import { useTranslation } from 'react-i18next';
import { formattedDateTimeNoSeconds } from 'services/dateTimeParser';
import HomePageCard from './HomePageCard';
import { RoutesPaths } from 'constants/routesPath';
import { fetchFreelancerAnswers } from 'apis/answersAPI';
import TextCroppedWithTooltip from 'components/typography/TextCroppedWithTooltip';
import FieldsChips from 'components/chips/FieldsChips';
import FreelancerAnswerActionLink from 'templates/answers/FreelancerAnswerActionLink';
import { getAnswerState } from 'core/answerStatus';

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
                      <ServiceRefIdLink
                        serviceId={answer?.question?.service?.id}
                        referenceId={answer?.question?.referenceNumber}
                      />
                    </StyledTableCell>
                    <StyledTableCell scope='row'>
                      {
                        questionTypesOfAssignment.filter(
                          (assignmentOption) =>
                            assignmentOption.value ===
                            answer?.question?.assignmentType,
                        )[0]?.label
                      }
                    </StyledTableCell>
                    <StyledTableCell className={classes.desktopVisible}>
                      {answer?.question?.title}
                    </StyledTableCell>
                    <StyledTableCell className={classes.desktopVisible}>
                      {formattedDateTimeNoSeconds(
                        new Date(answer?.question?.createdAt),
                      )}
                    </StyledTableCell>
                    <StyledTableCell className={classes.desktopVisible}>
                      <FieldsChips fields={answer.question.fields} />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextCroppedWithTooltip
                        text={`#${answer.referenceNumber}`}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      {getAnswerState(answer.state)}
                    </StyledTableCell>
                    <StyledTableCell
                      className={[classes.desktopVisible, 'action']}>
                      <FreelancerAnswerActionLink answerStatus={answer.state} questionId={answer.question.id} />
                    </StyledTableCell>
                    <StyledTableCell>time</StyledTableCell>
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
