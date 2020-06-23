import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import moment from 'moment';

import { IconButton } from '@material-ui/core';
import { useHistory } from 'react-router';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const MeetingsTable = ({ meetings }) => {
  const classes = useStyles();
  const history = useHistory();

  function handleEditClick(meetingId) {
    history.push('/meeting/edit', { meetingId });
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label='customized table'>
        <TableHead>
          <TableRow>
            <StyledTableCell>Field</StyledTableCell>
            <StyledTableCell align='right'>Sub field</StyledTableCell>
            <StyledTableCell align='right'>Status</StyledTableCell>
            <StyledTableCell align='right'>submitted since</StyledTableCell>
            <StyledTableCell align='right'>last update</StyledTableCell>
            <StyledTableCell align='right'>Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {meetings.map((meeting) => (
            <StyledTableRow key={meeting.id} id={`meeting-${meeting.id}`}>
              <StyledTableCell component='th' scope='row'>
                {meeting.field}
              </StyledTableCell>
              <StyledTableCell align='right'>
                {meeting.subfield}
              </StyledTableCell>
              <StyledTableCell className={'status'} align='right'>
                {meeting.status}
              </StyledTableCell>
              <StyledTableCell align='right'>
                {moment(meeting.created_at).format('MM/DD/YYYY h:mm a')}
              </StyledTableCell>
              <StyledTableCell align='right'>
                {moment(meeting.updated_at).format('MM/DD/YYYY h:mm a')}
              </StyledTableCell>
              <StyledTableCell align='right'>
                <IconButton
                  className={'edit'}
                  onClick={() => handleEditClick(meeting.id)}
                  aria-label='edit'>
                  <EditIcon />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MeetingsTable;
