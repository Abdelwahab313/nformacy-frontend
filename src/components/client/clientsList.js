import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import '../../styles/client.css';
import { makeStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { Link, Route, Switch } from 'react-router-dom';
import { fetchClients } from './clientsApi';
import ClientStatus from './clientStatus';

function ClientsList(props) {
  const [clients, setClients] = useState(props.clients);
  useEffect(() => {
    fetchClients().then((res) => {
      const fetchedClients = res.data;
      fetchedClients.sort((a, b) => a.id - b.id);
      for (let i = 0; i < fetchedClients.length; i++) {
        fetchedClients[i].contacts = fetchedClients[i].contacts[0].phone_number;
      }
      setClients(fetchedClients);
    });
  }, []);
  const useStyles = makeStyles((theme) => ({
    root: {
      background: '#F5F5F5',
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
        <Table id={'all-clients'}>
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
            {clients.map((client, index) => (
              <TableRow id={'client-' + (index + 1)}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{client.name}</TableCell>
                <TableCell>{client.ownerName}</TableCell>
                <TableCell>{client.contacts}</TableCell>
                <TableCell>{client.address}</TableCell>
                <TableCell>
                  <ClientStatus
                    status={client.verified}
                    clientName={client.name}
                    id={client.id}
                  />
                </TableCell>
                <TableCell id={'details'}>
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
}

export default ClientsList;
