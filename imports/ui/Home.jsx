import React, {useEffect, useRef, useState} from 'react';
import { useTranslation } from 'react-i18next';
import {Box, Button, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import ListContact from "./components/ListContact";
import {Link} from "react-router-dom";

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
  const { t, i18n } = useTranslation();


  //hook for storing the number of available contacts
  const [contactNumber, setContactNumber] = useState(0)


  const firstUpdate = useRef(true)
  return (
    <div>
      <Box className={classes.headerBox} component="span" m={1}>
        <Typography className={classes.contactTitle} variant="h5" gutterBottom>
          {t("home_title")} : {contactNumber}
        </Typography>
        <Box component="div" m={2}>
          <Link className={classes.btnAddContact} to={'/report'}>
            <Button className={classes.btnRefresh} variant="outlined" color="primary">
              {t("rapports")}
            </Button>
          </Link>
          <Link className={classes.btnAddContact} to={'/add'}>
            <Button variant="outlined" color="primary">
              {t("ajouter")}
            </Button>
          </Link>
        </Box>

      </Box>

      <ListContact/>
    </div>
  )
};

export default Home
