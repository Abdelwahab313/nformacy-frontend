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
  return (
    <Paper className={classes.paper}>
      <p id={"title"}>زيارات العميل</p>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell id={"salesNameHeader"}>أسم المندوب</TableCell>
            <TableCell id={"dateHeader"}>تاريخ الزيارة</TableCell>
            <TableCell id={"targetHeader"}>الغرض من الزيارة</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.visits.map((visit, index) => (
            <TableRow key={index} id={"visitsDetails-"+ index}>
              <TableCell>{visit.salesName}</TableCell>
              <TableCell>{visit.date}</TableCell>
              <TableCell>{visit.target}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default ClientVisits;
