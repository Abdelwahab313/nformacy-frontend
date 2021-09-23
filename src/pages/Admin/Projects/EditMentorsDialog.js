import React, { useEffect, useState } from 'react';
import {
  Dialog,
  Grid,
  Paper,
  DialogContent,
  DialogActions,
} from '@material-ui/core';
import { TableContainer } from '@material-ui/core';
import { TableHead } from '@material-ui/core';
import { TableRow } from '@material-ui/core';
import { withStyles } from '@material-ui/core';
import { TableCell } from '@material-ui/core';
import { TableBody } from '@material-ui/core';
import { Table } from '@material-ui/core';
import CustomTypography from 'components/typography/Typography';
import { useTranslation } from 'react-i18next';
import { useStyles } from 'styles/Admin/questionFormStyles';
import FormControl from '@material-ui/core/FormControl';
import ReactSelectMaterialUi from 'react-select-material-ui';
import { selectStyle } from 'styles/formsStyles';
import LoadingCircle from 'components/progress/LoadingCircle';
import useFetchData from 'hooks/useFetchData';
import Transition from 'components/animations/Transition';
import {
  addMentors,
  fetchProjectBeneficiaries,
  fetchProjectConsultants,
  fetchProjectMentors,
} from 'apis/projectsAPI';
import useLocationState from 'hooks/useLocationState';
import { useSnackBar } from 'context/SnackBarContext';
import SubmitButton from 'components/buttons/SubmitButton';

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

const EditMentorsDialog = ({ handleClose, isOpened, setProjectMentors }) => {
  const [mentors, setMentors] = useState([]);
  const { showSuccessMessage } = useSnackBar();

  const { t } = useTranslation();
  const classes = useStyles();
  const projectId = useLocationState((state) => state?.projectId);

  useEffect(() => {
    if (!!projectId) {
      fetchProjectMentors(projectId).then((response) => {
        setMentors(response.data);
      });
    }
  }, [isOpened]);

  const { fetchedData: clients, isLoading } = useFetchData(() => {
    return fetchProjectBeneficiaries(projectId);
  });

  const { fetchedData: consultants } = useFetchData(() => {
    return fetchProjectConsultants(projectId);
  });

  const handleSubmit = () => {
    addMentors(projectId, mentors).then((response) => {
      showSuccessMessage(t('Mentors Added Successfully!'));
      !!setProjectMentors && setProjectMentors(response.data);
      handleClose();
    });
  };

  const onSelectConsultant = (beneficiaryId, consultantId) => {
    setMentors((prevMentors) => {
      const existingMentorIndex = prevMentors.findIndex(
        (mentor) => mentor.beneficiaryId === beneficiaryId,
      );
      if (existingMentorIndex < 0) {
        return [...prevMentors, { beneficiaryId, consultantId }];
      } else {
        prevMentors[existingMentorIndex]['consultantId'] = consultantId;
        return [...prevMentors];
      }
    });
  };

  const parseBeneficiariesToTableRows = (clients) => {
    return clients?.map((client) => ({
      ...client,
      firstName: (
        <CustomTypography variant={'body1'}>
          {client.firstName}
        </CustomTypography>
      ),
      lastName: (
        <CustomTypography variant={'body1'}>{client.lastName}</CustomTypography>
      ),
      organizationName: (
        <CustomTypography variant={'body1'}>
          {client.organizationName}
        </CustomTypography>
      ),
    }));
  };
  const availableBeneficiaries = parseBeneficiariesToTableRows(clients, t);

  if (isLoading) {
    return <LoadingCircle />;
  }

  return (
    <Dialog
      TransitionComponent={Transition}
      maxWidth='lg'
      PaperProps={{ id: 'fieldsOfSpecializationDialog' }}
      onClose={handleClose}
      open={isOpened}>
      <DialogContent className={classes.mentorsDialogContainer}>
        <Grid container>
          <Grid item md={12} className={classes.activityTable}>
            <TableContainer
              component={Paper}
              className={classes.tableContainer}>
              <Table stickyHeader aria-label='My Activity Table'>
                <TableHead>
                  <TableRow>
                    <StyledTableCell>
                      {t('beneficiaryFirstName')}
                    </StyledTableCell>
                    <StyledTableCell>
                      {t('beneficiaryLastName')}
                    </StyledTableCell>
                    <StyledTableCell>{t('organizationName')}</StyledTableCell>
                    <StyledTableCell className={classes.desktopVisible}>
                      {t('consultantEmail')}
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {availableBeneficiaries.length === 0 ? (
                    <TableCell colspan='8' className={classes.noRecords}>
                      Sorry, no matching records found
                    </TableCell>
                  ) : (
                    availableBeneficiaries.map((client) => (
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
                          <FormControl fullWidth id='project-manager-select'>
                            <ReactSelectMaterialUi
                              fullWidth={true}
                              placeholder={'Select Mentor'}
                              SelectProps={{
                                styles: selectStyle,
                              }}
                              value={
                                mentors.find(
                                  (mentor) =>
                                    mentor?.beneficiaryId === client?.id,
                                )?.consultantId || ''
                              }
                              options={consultants.map((consultant) => {
                                var consultantOption = {
                                  value: consultant.id,
                                  label: consultant.email,
                                };
                                return consultantOption;
                              })}
                              onChange={(value) =>
                                onSelectConsultant(client.id, value)
                              }
                            />
                          </FormControl>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <SubmitButton
          onClick={handleSubmit}
          color='primary'
          buttonText={'Submit'}
        />
      </DialogActions>
    </Dialog>
  );
};

export default EditMentorsDialog;
