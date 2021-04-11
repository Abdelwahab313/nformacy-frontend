import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import BreadcrumbsCustomSeparator from 'components/breadcrumbs/Breadcrumbs';
import LoadingCircle from 'components/progress/LoadingCircle';
import useFetchData from 'hooks/useFetchData';
import { fetchPointsList } from 'apis/userAPI';
import authManager from 'services/authManager';
import { activityName } from 'constants/dropDownOptions';
import PageContainer from 'components/grid/PageContainer';
import LinkText from 'components/typography/LinkText';
import { getAnswerQuestionLink } from 'services/navigation';

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

export const Pointing = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const currentUser = authManager.retrieveCurrentUser();
  const { fetchedData: points, isLoading } = useFetchData(() => {
    return fetchPointsList(currentUser.id);
  });

  if (isLoading) {
    return <LoadingCircle />;
  }

  return (
    <PageContainer>
      <BreadcrumbsCustomSeparator pageName={t('pointingTable')} />
      <Grid container>
        <Grid item md={12} className={classes.activityTable}>
          <TableContainer component={Paper} >
            <Table stickyHeader aria-label='My Activity Table'>
              <TableHead>
                <TableRow>
                  <StyledTableCell className={classes.desktopVisible}>
                    {t('serviceId')}
                  </StyledTableCell>
                  <StyledTableCell className={classes.desktopVisible}>
                    {t('answerId')}
                  </StyledTableCell>
                  <StyledTableCell className={classes.desktopVisible}>
                    {t('serviceType')}
                  </StyledTableCell>
                  <StyledTableCell className={classes.desktopVisible}>
                    {t('date')}
                  </StyledTableCell>
                  <StyledTableCell className={classes.desktopVisible}>
                    {t('activity')}
                  </StyledTableCell>
                  <StyledTableCell className={classes.desktopVisible}>
                    {t('pointsCollected')}
                  </StyledTableCell>
                  <StyledTableCell className={classes.desktopVisible}>
                    {t('validTill')}
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {points.length === 0 ?
                  <TableCell colspan="8" className={classes.noRecords}>Sorry, no matching records found</TableCell>
                  : points.map((dataRow) => (
                    <StyledTableRow
                      reference-number={dataRow.activityId}
                      key={dataRow.id}>

                      <StyledTableCell className={classes.desktopVisible}>
                        {dataRow.modelId}
                      </StyledTableCell>

                      <StyledTableCell className={classes.desktopVisible}>
                        <LinkText to={getAnswerQuestionLink(dataRow.serviceId)}>
                          {dataRow.serviceId}
                        </LinkText>
                      </StyledTableCell>

                      <StyledTableCell className={classes.desktopVisible}>
                        {dataRow.modelType}
                      </StyledTableCell>

                      <StyledTableCell className={classes.desktopVisible}>
                        {dataRow.createdAt}
                      </StyledTableCell>

                      <StyledTableCell className={classes.desktopVisible}>
                        {activityName.find(
                          (status) =>
                            status.value === dataRow.activity,
                        )?.label
                        }
                      </StyledTableCell>

                      <StyledTableCell className={classes.desktopVisible}>
                        {dataRow.pointsCollected}
                      </StyledTableCell>

                      <StyledTableCell className={classes.desktopVisible}>
                        {dataRow.pointsCollected}
                      </StyledTableCell>

                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

const useStyles = makeStyles((theme) => ({
  desktopVisible: {
    display: 'table-cell',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  activityTable: {
    maxWidth: '70%',
    margin: '0 auto ',
    marginTop: '60px',
    maxHeight: '350px'
  },
  noRecords: {
    textAlign: 'center',
    fontWeight: 'bold'
  }
}));

export default Pointing;