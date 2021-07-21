import React, { Fragment, useState } from 'react';
import { useStyles } from 'styles/Admin/questionFormStyles';
import { Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import FormControl from '@material-ui/core/FormControl';
import ReactSelectMaterialUi from 'react-select-material-ui';
import { selectStyle } from 'styles/formsStyles';
import { projectManagers } from 'constants/dropDownOptions';
import SubmitButton from 'components/buttons/SubmitButton';
import CustomTypography from 'components/typography/Typography';
import { Dialog } from '@material-ui/core';
import { DialogContent } from '@material-ui/core';
import Transition from 'components/animations/Transition';
import { Paper } from '@material-ui/core';
import { TableContainer } from '@material-ui/core';
import { TableHead } from '@material-ui/core';
import { TableRow } from '@material-ui/core';
import { withStyles } from '@material-ui/core';
import { TableCell } from '@material-ui/core';
import { TableBody } from '@material-ui/core';
import { Table } from '@material-ui/core';
import { DialogActions } from '@material-ui/core';

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

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const clients = [
    {
      id: 1,
      firstName: 'William',
      lastName: 'Michael',
      organizationName: 'Netflix',
      consultantName: 'Noah',
    },
    {
      id: 2,
      firstName: 'Sam',
      lastName: 'Micheal',
      organizationName: 'Amazon',
      consultantName: 'James',
    },
    {
      id: 3,
      firstName: 'Erik',
      lastName: 'Ericksen',
      organizationName: 'nformacy',
      consultantName: 'Joseph',
    },
    {
      id: 4,
      firstName: 'Jake',
      lastName: 'Oliver',
      organizationName: 'nformacy',
      consultantName: 'Robert',
    },
  ];
  const parseClientsToTableRows = (clients) => {
    return clients?.map((client) => ({
      ...clients,
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
      consultantName: (
        <CustomTypography variant={'body1'}>
          {client.consultantName}
        </CustomTypography>
      ),
    }));
  };
  const servicesRows = parseClientsToTableRows(clients, t);

  return (
    <>
      <Dialog
        TransitionComponent={Transition}
        maxWidth='lg'
        PaperProps={{ id: 'fieldsOfSpecializationDialog' }}
        onClose={handleClose}
        open={open}>
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
                        {t('consultantName')}
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
                            <FormControl fullWidth id='project-manager-select'>
                              <ReactSelectMaterialUi
                                fullWidth={true}
                                placeholder={'Select Mentor'}
                                SelectProps={{
                                  styles: selectStyle,
                                }}
                                options={projectManagers}
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
            onClick={handleClose}
            color='primary'
            buttonText={'Submit'}
          />
        </DialogActions>
      </Dialog>
      <Grid container>
        <Grid item md={12} className={classes.activityTable}>
          <TableContainer component={Paper} className={classes.tableContainer}>
            <Table stickyHeader aria-label='My Activity Table'>
              <TableHead>
                <TableRow>
                  <StyledTableCell>{t('beneficiaryFirstName')}</StyledTableCell>
                  <StyledTableCell>{t('beneficiaryLastName')}</StyledTableCell>
                  <StyledTableCell>{t('organizationName')}</StyledTableCell>
                  <StyledTableCell className={classes.desktopVisible}>
                    {t('consultantName')}
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
        color='primary'
        buttonText={'Edit'}
      />
    </>
  );
};

export default MentoringList;
