import React from 'react';
import { Paper } from '@material-ui/core';
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
import { projectManagers } from 'constants/dropDownOptions';
import { selectStyle } from 'styles/formsStyles';

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

const EditMentorsDialog = () => {
  const { t } = useTranslation();
  const classes = useStyles();

  const clients = [
    {
      id: 1,
      firstName: 'William',
      lastName: 'Michael',
      organizationName: 'Netflix',
    },
    {
      id: 2,
      firstName: 'Sam',
      lastName: 'Micheal',
      organizationName: 'Amazon',
    },
    {
      id: 3,
      firstName: 'Erik',
      lastName: 'Ericksen',
      organizationName: 'nformacy',
    },
    {
      id: 4,
      firstName: 'Jake',
      lastName: 'Oliver',
      organizationName: 'nformacy',
    },
    {
      id: 5,
      firstName: 'Jason',
      lastName: 'Sam',
      organizationName: 'nformacy',
    },
    {
      id: 6,
      firstName: 'Harry',
      lastName: 'James',
      organizationName: 'nformacy',
    },
    {
      id: 7,
      firstName: 'George',
      lastName: 'David',
      organizationName: 'nformacy',
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
    }));
  };
  const servicesRows = parseClientsToTableRows(clients, t);

  return (
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
                <StyledTableCell scope='row'>{client.lastName}</StyledTableCell>
                <StyledTableCell>{client.organizationName}</StyledTableCell>
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
  );
};

export default EditMentorsDialog;
