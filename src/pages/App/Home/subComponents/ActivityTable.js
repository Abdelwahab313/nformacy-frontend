
import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import useStyles from '../styles/HomePageStyles';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
// import useFetchData from 'hooks/useFetchData';
// import { fetchClientServices } from 'apis/servicesAPI';

const createData = (name, calories, fat, carbs, protein) => {
    return { name, calories, fat, carbs, protein };
}
const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: '#3a3b4b',
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

const rows = [
    createData('Question', '#77116', 'Inner Banner Advertising', '18 Apr 2020', 'Active', 'Lorem ipsum'),
    createData('Call', '#77116', 'Inner Banner Advertising', '18 Apr 2020', 'Active', 'Lorem ipsum'),
    createData('Assignemt', '#77116', 'Inner Banner Advertising', '18 Apr 2020', 'Active', 'Lorem ipsum'),
    createData('Question', '#77116', 'Inner Banner Advertising', '18 Apr 2020', 'Active', 'Lorem ipsum'),
    createData('Call', '#77116', 'Inner Banner Advertising', '18 Apr 2020', 'Active', 'Lorem ipsum'),
    createData('Assignemt', '#77116', 'Inner Banner Advertising', '18 Apr 2020', 'Active', 'Lorem ipsum'),

];
const ActivityTable = () => {

    const classes = useStyles();
    // const { fetchedData: services, isLoading } = useFetchData(
    //     fetchClientServices,
    // );
    return (
        <Grid container className={classes.tableContainer}>
            <Grid container>
                <Grid item md={6}>
                    <Typography align={'left'} component="h1">
                        My Activity
            </Typography>
                </Grid>
                <Grid item md={6}>
                    <Typography align={'right'} component="h1">
                        View All
            </Typography>
                </Grid>
            </Grid>

            <Grid container>
                <Grid item md={12}>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Activity Type</StyledTableCell>
                                    <StyledTableCell align="right">Ref. No.</StyledTableCell>
                                    <StyledTableCell align="right">Tite</StyledTableCell>
                                    <StyledTableCell align="right">Request Date</StyledTableCell>
                                    <StyledTableCell align="right">Status</StyledTableCell>
                                    <StyledTableCell align="right">Action</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <StyledTableRow key={row.name}>
                                        <StyledTableCell component="th" scope="row">
                                            {row.name}
                                        </StyledTableCell>
                                        <StyledTableCell align="right">{row.calories}</StyledTableCell>
                                        <StyledTableCell align="right">{row.fat}</StyledTableCell>
                                        <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                                        <StyledTableCell align="right">{row.protein}</StyledTableCell>
                                        <StyledTableCell align="right">{row.protein}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>

        </Grid>


    )
}
export default ActivityTable;