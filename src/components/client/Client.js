import React from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
}));

const Client = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root} dir='rtl'>
      <Paper className={classes.root}>
        <p>تفاصيل العميل</p>
        <Table>
          <TableRow>
            <TableCell>أسم المكان</TableCell>
            <TableCell>{props.client.name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>أسم المدير</TableCell>
            <TableCell>{props.client.ownerName}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>العنوان</TableCell>
            <TableRow>
              <TableCell>الموقع</TableCell>
              <TableCell>
                {props.client.location.long}, {props.client.location.lat}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>العنوان</TableCell>
              <TableCell>{props.client.address}</TableCell>
            </TableRow>
          </TableRow>
          <TableRow>
            <TableCell>التليفون</TableCell>
            <TableCell>
              {props.client.phones.map((phone) => (
                <>
                  {' '}
                  {phone} <br />
                </>
              ))}
            </TableCell>
          </TableRow>
        </Table>
      </Paper>
    </div>
  );
};

export default Client;
