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
import deleteOneContact from "../../services/graphql/deleteOneContact";
import HeaderComponent from "./HeaderComponent";

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
    },
    alert: {
        backgroundColor: "#FDD7AA",
        padding: "20px",
        borderRadius: "5px",
        color: "white",
        transition: "background .7s",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        '&:hover': {
            background: "#FDAF75",
        },
    },

});


function ListContact({loading, error, data}) {
    const [mutateFunction, {dateDelete, loadingDelete, errorDelete}] = deleteOneContact()
    const classes = useStyles();

    if (loading) return <p>Pas de donnée dans la liste</p>
    if (data) {
        if (data.getAllContact.length === 0) {
            return (<div className={classes.alert}>
                <span>Liste de contact vide</span>
                <svg xmlns="http://www.w3.org/2000/svg" width={25} fill="none" viewBox="0 0 24 24" stroke="currentColor"
                     strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                </svg>
            </div>)
        } else {
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
                                        <Button onClick={() => mutateFunction(
                                            {variables: {deleteContactId: data.id}}
                                        ).then((response) => {
                                            console.log(JSON.stringify(response))
                                        }).catch((error) => {
                                            console.log(JSON.stringify(error))
                                        })
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


}

export default ListContact
