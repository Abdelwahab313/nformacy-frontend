import Table from "@material-ui/core/Table";
import { makeStyles, TableHead } from "@material-ui/core";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper";
import React from "react";


const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

const ClientVisits = (props) => {
  const classes = useStyles();
  return <Paper className={classes.paper}>
    <p id={"title"}>زيارات العميل</p>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>أسم المندوب</TableCell>
          <TableCell>تاريخ الزيارة</TableCell>
          <TableCell>الغرض من الزيارة</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {
          props.visits.map((visit, index) => <TableRow key={index}>
            <TableCell>{visit.salesName}</TableCell>
            <TableCell>{visit.date}</TableCell>
            <TableCell>{visit.target}</TableCell>
          </TableRow>)
        }
      </TableBody>
    </Table>
  </Paper>;
};

export default ClientVisits;