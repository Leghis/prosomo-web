import React from "react";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import TableContainer from "@material-ui/core/TableContainer";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import {gql, useMutation} from "@apollo/client";

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


const useStyles = makeStyles({
    table: {
        minWidth: 500,
    },
    btnStyle: {
        textDecoration: "none"
    }
});
const deleteContact = gql`
    mutation DeleteContact($deleteContactId: ID!) {
    deleteContact(id: $deleteContactId)
    }
    `


function ListContact({loading, error, data}) {
    const [mutateFunction, {dataa, loadingg, errorr}] = useMutation(deleteContact)
    const classes = useStyles();
    if (loading) {
        return <p>En cours de chargement</p>
    } else if (data) {
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
                        {data.getAllContact.map(data => (
                            <StyledTableRow key={data.id}>
                                <StyledTableCell>
                                    {data.surname}
                                </StyledTableCell>
                                <StyledTableCell>{data.name}</StyledTableCell>
                                <StyledTableCell>{data.email}</StyledTableCell>
                                <StyledTableCell>{data.phone}</StyledTableCell>
                                <StyledTableCell>{data.town}</StyledTableCell>
                                <StyledTableCell>
                                    <Link className={classes.btnStyle} to={`/update/${data.id}`}>
                                        <Button variant="outlined" color="primary">
                                            Modifier
                                        </Button>
                                    </Link>
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Button onClick={e => mutateFunction(
                                        {variables: {deleteContactId: data.id}}
                                    )
                                    } variant="contained" color="secondary">
                                        Supprimer
                                    </Button>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }

}

export default ListContact
