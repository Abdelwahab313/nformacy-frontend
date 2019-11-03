import React from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const Client = (props) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      background: '#b4b4b4',
      padding: theme.spacing(3),
    },
    card: {
      padding: theme.spacing(3),
    },
  }));
  const classes = useStyles();

  return (
    <div dir='rtl' className={classes.root}>
      <Paper className={classes.card} dir='rtl'>
        <Typography variant='h5' component='h3'>
          تفاصيل العميل
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>أسم المكان</TableCell>
              <TableCell>{props.client.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>أسم المدير</TableCell>
              <TableCell>{props.client.ownerName}</TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </Paper>
    </div>
  );
};

export default Client;
