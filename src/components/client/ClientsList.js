import React from 'react';
import { Table } from 'react-bootstrap';
import '../../styles/client.css';
import { makeStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { Link, Route, Switch } from 'react-router-dom';

const ClientsList = (props) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      background: '#b4b4b4',
      padding: theme.spacing(3),
    },
    card: {
      padding: theme.spacing(3),
    },
    button: {
      margin: theme.spacing(1),
    },
    input: {
      display: 'none',
    },
  }));
  const classes = useStyles();
  return (
    <div dir='rtl' className={classes.root}>
      <Paper className={classes.card} dir='rtl'>
        <Typography variant='h5' component='h3'>
          العملاء
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>رقم العميل</TableCell>
              <TableCell>أسم المكان</TableCell>
              <TableCell>أسم المدير</TableCell>
              <TableCell>رقم الهاتف</TableCell>
              <TableCell>العنوان</TableCell>
              <TableCell>الحاله</TableCell>
              <TableCell> عرض المزيد</TableCell>
            </TableRow>
            {props.clients.map((client, index) => (
              <TableRow>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{client.clientName}</TableCell>
                <TableCell>{client.ownerName}</TableCell>
                <TableCell>{client.mobile[0]}</TableCell>
                <TableCell>{client.address}</TableCell>
                <TableCell>{client.verified}</TableCell>
                <TableCell>
                  <Switch>
                    <Route>
                      <Link to={'/clients/' + client.id}>التفاصيل</Link>
                    </Route>
                  </Switch>
                </TableCell>
              </TableRow>
            ))}
          </TableHead>
        </Table>
      </Paper>
    </div>
  );
};

export default ClientsList;
