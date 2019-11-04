import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import React from "react";
import { makeStyles } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

const ClientDetails = props => {
  const classes = useStyles();
  return <Paper className={classes.paper}>
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
            {props.client.location.lat}, {props.client.location.lng}
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
              {" "}
              {phone} <br/>
            </>
          ))}
        </TableCell>
      </TableRow>
    </Table>
  </Paper>;
};

export default ClientDetails;