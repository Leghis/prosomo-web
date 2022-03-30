import React, {useEffect} from 'react';
import HeaderComponent from "../components/HeaderComponent";
import CardComponent from "../components/CardComponent";
import {Box, Button, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import ListContactComponent from "../components/ListContactComponent/ListContactComponent";
import ListContact from "../components/ListContact";
import {gql, useQuery} from "@apollo/client";
import {Link} from "react-router-dom";

const useStyles = makeStyles({})


const getllContact = gql`
        query getAllContact{
            getAllContact {
            box
            id
            surname
            name
            email
            phone
            region
            town
            country
            comment1
            comment2
        }
      }`

const Home = () => {
    const { loading, error, data } = useQuery(getllContact)
    return (
        <div>
            <HeaderComponent/>
            <Box component="span" m={1}>
                <Typography variant="h5" gutterBottom>
                    Liste de contact
                </Typography>
                <Button variant="outlined" color="primary">
                    Actualiser
                </Button>
                <Link to={'/add'}>
                    <Button variant="outlined" color="primary">
                        Ajouter
                    </Button>
                </Link>

            </Box>

            <ListContact loading={loading} error={error} data={data}/>
        </div>
    )
};

export default Home