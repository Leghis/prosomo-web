import React, {useEffect, useState} from "react";
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
import {CircularProgress, TablePagination} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FullScreenDialogComponent from "./FullScreenDialogComponent";
import getAllContact from "../../services/graphql/getAllContact";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 15,
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
  loaderCircle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }

});


function ListContact() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const {loading, error, data} = getAllContact(page, rowsPerPage)
  const [mutateFunction, {dateDelete, loadingDelete, errorDelete}] = deleteOneContact()
  const classes = useStyles();

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
    console.log(`page au niveau de la liste ${newPage}`)
  };

  const handleChangeRowsPerPage = (event) => {
    console.assert(`Event ${event.target.value}`)
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  if (loading) return <div className={classes.loaderCircle}>
    <CircularProgress/></div>
  if (data) {
    console.log(data)
    if (data.getAllContact === null) {
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
                <StyledTableCell>Voir plus</StyledTableCell>
                <StyledTableCell>Mettre a jour</StyledTableCell>
                <StyledTableCell>Supprimer</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.getAllContact.data.map(data => (
                <StyledTableRow key={data._id}>
                  <StyledTableCell>
                    {data.surname}
                  </StyledTableCell>
                  <StyledTableCell>{data.name}</StyledTableCell>
                  <StyledTableCell>{data.email}</StyledTableCell>
                  <StyledTableCell>{data.phone}</StyledTableCell>
                  <StyledTableCell>{data.town}</StyledTableCell>
                  <StyledTableCell>
                    <FullScreenDialogComponent data={data}/>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Link className={classes.btnStyle} to={`/update/${data._id}`}>
                      <Button variant="outlined" color="primary" startIcon={<EditIcon/>}>
                        Modifier
                      </Button>
                    </Link>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Button onClick={() => mutateFunction(
                      {variables: {deleteContactId: data._id}}
                    ).then((response) => {
                      console.log(JSON.stringify(response))
                    }).catch((error) => {
                      console.log(JSON.stringify(error))
                    })
                    } variant="contained" color="secondary" startIcon={<DeleteIcon/>}>
                      Supprimer
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={data.getAllContact.count}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      )
    }
  }


}

export default ListContact
