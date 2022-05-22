import React from 'react';
import {withStyles, makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
// import LoaderComponent from "../LoaderComponent/LoaderComponent";
// import './ListContactComponent.css'

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 10,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const datas = [
    {
        lastName: "Maerik",
        firstName: "Ayina",
        email: "ayinamaerik@gmail.com",
        phone: "694936708",
        city: "Douala",
        province: "Littoral",
        box: "A9A 9A9",
        contry: "Cameroun",
        comment1: "none",
        comment2: "none"
    }
];

const useStyles = makeStyles({
    table: {
        minWidth: 500,
    },
    btnStyle: {
        textDecoration:"none"
    }
});

 function ListContactComponent() {
    const classes = useStyles();

    return (
            <TableContainer>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Prénom</StyledTableCell>
                            <StyledTableCell>Nom</StyledTableCell>
                            <StyledTableCell>Courriel</StyledTableCell>
                            <StyledTableCell>Téléphone</StyledTableCell>
                            <StyledTableCell>Ville</StyledTableCell>
                            <StyledTableCell>Mettre a jour</StyledTableCell>
                            <StyledTableCell>Supprimer</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {datas.map((data, index) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell>
                                    {data.lastName}
                                </StyledTableCell>
                                <StyledTableCell>{data.firstName}</StyledTableCell>
                                <StyledTableCell>{data.email}</StyledTableCell>
                                <StyledTableCell>{data.phone}</StyledTableCell>
                                <StyledTableCell>{data.city}</StyledTableCell>
                                <StyledTableCell>
                                    <Link className={classes.btnStyle} to={`/update/${index}`}>
                                        <Button  variant="outlined" color="primary">
                                            Modifier
                                        </Button>
                                    </Link>
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Button onClick={()=>alert('suppression')} variant="contained" color="secondary">
                                        Supprimer
                                    </Button>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
    );
}

export default ListContactComponent
