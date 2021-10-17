import React, { useState } from 'react';
import { useStyles } from 'styles/Admin/questionFormStyles';
import { Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import SubmitButton from 'components/buttons/SubmitButton';
import CustomTypography from 'components/typography/Typography';
import { Paper } from '@material-ui/core';
import { TableContainer } from '@material-ui/core';
import { TableHead } from '@material-ui/core';
import { TableRow } from '@material-ui/core';
import { withStyles } from '@material-ui/core';
import { TableCell } from '@material-ui/core';
import { TableBody } from '@material-ui/core';
import { Table } from '@material-ui/core';
import EditMentorsDialog from './EditMentorsDialog';
import useLocationState from 'hooks/useLocationState';
import useFetchData from 'hooks/useFetchData';
import { fetchProjectMentors } from 'apis/projectsAPI';
import LoadingCircle from 'components/progress/LoadingCircle';

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

const MentoringList = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const projectId = useLocationState((state) => state?.projectId);

  const {
    fetchedData: projectMentors,
    setFetchedData: setProjectMentors,
    isLoading,
  } = useFetchData(() => fetchProjectMentors(projectId));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  if (isLoading) {
    return <LoadingCircle />;
  }

  const parseClientsToTableRows = (projectMentors) => {
    return projectMentors?.map((projectMentors) => ({
      ...projectMentors,
      firstName: (
        <CustomTypography variant={'body1'}>
          {projectMentors.beneficiary.firstName}
        </CustomTypography>
      ),
      lastName: (
        <CustomTypography variant={'body1'}>
          {projectMentors.beneficiary.lastName}
        </CustomTypography>
      ),
      organizationName: (
        <CustomTypography variant={'body1'}>
          {projectMentors.beneficiary.organizationName}
        </CustomTypography>
      ),
      consultantName: (
        <CustomTypography variant={'body1'}>
          {projectMentors.consultant.email}
        </CustomTypography>
      ),
    }));
  };
  const servicesRows = parseClientsToTableRows(projectMentors, t);

  return (
    <>
      <EditMentorsDialog
        isOpened={open}
        handleClose={handleClose}
        setProjectMentors={setProjectMentors}
      />

      <Grid container>
        <Grid
          item
          md={12}
          className={[classes.activityTable, classes.mentoringActivityTable]}>
          <TableContainer component={Paper} className={classes.tableContainer}>
            <Table stickyHeader aria-label='My Activity Table'>
              <TableHead>
                <TableRow>
                  <StyledTableCell>{t('beneficiaryFirstName')}</StyledTableCell>
                  <StyledTableCell>{t('beneficiaryLastName')}</StyledTableCell>
                  <StyledTableCell>{t('organizationName')}</StyledTableCell>
                  <StyledTableCell className={classes.desktopVisible}>
                    {t('consultantEmail')}
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {servicesRows.length === 0 ? (
                  <TableCell colspan='8' className={classes.noRecords}>
                    Sorry, no matching records found
                  </TableCell>
                ) : (
                  servicesRows.map((client) => (
                    <StyledTableRow
                      reference-number={client.RefNumber}
                      key={client.id}>
                      <StyledTableCell scope='row'>
                        {client.firstName}
                      </StyledTableCell>
                      <StyledTableCell scope='row'>
                        {client.lastName}
                      </StyledTableCell>
                      <StyledTableCell>
                        {client.organizationName}
                      </StyledTableCell>
                      <StyledTableCell className={classes.desktopVisible}>
                        {client.consultantName}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      <SubmitButton
        onClick={handleClickOpen}
        className={classes.editMentorsBtn}
        color='primary'
        buttonText={'Edit'}
      />
    </>
  );
};

export default MentoringList;
