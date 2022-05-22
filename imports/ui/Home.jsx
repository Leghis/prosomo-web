import React, {useEffect, useRef, useState} from 'react';
import HeaderComponent from "./components/HeaderComponent";
import CardComponent from "./components/CardComponent";
import {Box, Button, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import ListContactComponent from "./components/ListContactComponent/ListContactComponent";
import ListContact from "./components/ListContact";
import {gql, useQuery} from "@apollo/client";
import {Link} from "react-router-dom";
import getAllContact from "../services/graphql/getAllContact";

//definition of the css styles used
const useStyles = makeStyles({
    headerBox:{
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center"
    },
    btnRefresh:{
        marginRight:"10px"
    },
    contactTitle:{
        color : "#808095"
    },
    btnAddContact:{
        textDecoration:"none"
    }
})


const Home =  () => {
    const classes = useStyles()
    //hook for storing the number of available contacts
    const [contactNumber, setContactNumber] = useState(0)

    if (typeof window !== 'undefined') {
        //here `window` is available
        console.log(window.__APOLLO_STATE__["Contact:cd679a2d-9657-46fe-81c1-0824ee02409c"])

    }


    //Data loading
    const { loadAllContact, errorLoadAllContact, dataAllContact } = getAllContact()

    const firstUpdate = useRef(true)
    //if there are any changes in the data we will update the size of the list
    useEffect(()=>{
        if(firstUpdate.current && !dataAllContact){
            firstUpdate.current = false
            return 0
        }
        setContactNumber(dataAllContact.getAllContact.length)
    },[dataAllContact])

    return (
        <div>
            <HeaderComponent />
            <Box className={classes.headerBox} component="span" m={1}>
                <Typography className={classes.contactTitle} variant="h5" gutterBottom>
                    Liste de contact : {contactNumber}
                </Typography>
                <Box component="div" m={2}>
                    <Button className={classes.btnRefresh} variant="outlined" color="primary">
                        Actualiser
                    </Button>
                    <Link className={classes.btnAddContact} to={'/add'}>
                        <Button variant="outlined" color="primary">
                            Ajouter
                        </Button>
                    </Link>
                </Box>

            </Box>

            <ListContact loading={loadAllContact} error={errorLoadAllContact} data={dataAllContact}/>
        </div>
    )
};

export default Home