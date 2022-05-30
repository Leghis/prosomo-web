import React, {useEffect, useRef, useState} from 'react';
import HeaderComponent from "./components/HeaderComponent";
import CardComponent from "./components/CardComponent";
import {Box, Button, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import ListContact from "./components/ListContact";
import {gql, useQuery} from "@apollo/client";
import {Link} from "react-router-dom";
import getAllContact from "../services/graphql/Contact/getAllContact";

//definition of the css styles used
const useStyles = makeStyles({
  headerBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  btnRefresh: {
    marginRight: "10px"
  },
  contactTitle: {
    color: "#808095"
  },
  btnAddContact: {
    textDecoration: "none"
  }
})


const Home = () => {
  const classes = useStyles()
  const [page, setPage] = useState(1);

  //hook for storing the number of available contacts
  const [contactNumber, setContactNumber] = useState(0)


  const firstUpdate = useRef(true)
  return (
    <div>
      <Box className={classes.headerBox} component="span" m={1}>
        <Typography className={classes.contactTitle} variant="h5" gutterBottom>
          Liste de contact : {contactNumber}
        </Typography>
        <Box component="div" m={2}>
          <Link className={classes.btnAddContact} to={'/report'}>
            <Button className={classes.btnRefresh} variant="outlined" color="primary">
              Rapports
            </Button>
          </Link>
          <Link className={classes.btnAddContact} to={'/add'}>
            <Button variant="outlined" color="primary">
              Ajouter
            </Button>
          </Link>
        </Box>

      </Box>

      <ListContact/>
    </div>
  )
};

export default Home
