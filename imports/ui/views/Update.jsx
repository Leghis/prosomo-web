import React, {useEffect, useState} from "react";
import {AutoField, AutoForm} from "uniforms-material";
import {bridge as schema} from "../../schema/Contact/ContactValidator";
import {gql, useMutation, useQuery} from "@apollo/client";
import {useParams} from "react-router-dom";
import getOneContact from "../../services/graphql/getOneContact";
import {CircularProgress, Container} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import postOneContact from "../../services/graphql/postOneContact";


const useStyles = makeStyles({
    containerLoader:{
        display:"flex",
        height:"max-content",
        justifyContent:"center",
        alignItems:"center"
    }
});

const Update = () => {

    //css style
    const classes = useStyles();

    //get the id
    const {id} = useParams();

    //Utiliser le service getOneContact pour récupérer les informations d'un
    // contact afin de les afficher dans le formulaire si l'id est existant
    const {load,failed,response} = getOneContact(id)

    const [mutateFunction, {dataCreateContact, loadingContact, errorCreateContact}] = postOneContact()

    //this hook will allow us to store the values of a contact if it exists
    const [FormValue, setFormValue] = useState({})

    //this hook allows to store a boolean which will display a loader while waiting
    // for the data to be filled on the form if an id has been passed in parameter
    const [loading, setLoading] = useState(false)

    //this hook will allow us to know if there is an error in order to display a
    // specific error message to the user on the screen
    const [error, setError] = useState(false)

    //We have used a Hook useEffect here to avoid multiple rendering
    // and to render when loadn failled or response is modified
    useEffect(() => {
        if (load) setLoading(load)
        if (failed) setError(true)
        if (response) setFormValue((response.getContact))
    }, [load,failed, response])

        return(
            <Container className={classes.containerLoader} maxWidth="sm">
                {
                    (id &&(loading === false && !FormValue)) && <CircularProgress />
                }
                {/*{*/}
                {/*    FormValue &&*/}
                {/*    <AutoForm schema={schema} onSubmit={e =>*/}
                {/*        postOneContact(*/}
                {/*            {*/}
                {/*                variables: {*/}
                {/*                    "contact": {*/}
                {/*                        box: e.box,*/}
                {/*                        surname: e.surname,*/}
                {/*                        name: e.name,*/}
                {/*                        email: e.email,*/}
                {/*                        phone: e.phone.toString(),*/}
                {/*                        town: e.town,*/}
                {/*                        region: e.region,*/}
                {/*                        country: e.country,*/}
                {/*                        comment1: e.comment1,*/}
                {/*                        comment2: e.comment2*/}
                {/*                    }*/}
                {/*                }*/}
                {/*            }).then(response => {*/}
                {/*            alert(JSON.stringify(response))*/}
                {/*        }).catch(error => alert(JSON.stringify(error)))*/}
                {/*    }>*/}
                {/*        <AutoField value={FormValue.box} name="box"/>*/}
                {/*        <AutoField value={FormValue.surname} name="surname"/>*/}
                {/*        <AutoField value={FormValue.name} name="name"/>*/}
                {/*        <AutoField value={FormValue.email} name="email"/>*/}
                {/*        <AutoField value={FormValue.phone} name="phone"/>*/}
                {/*        <AutoField value={FormValue.town} name="town"/>*/}
                {/*        <AutoField value={FormValue.region} name="region"/>*/}
                {/*        <AutoField value={FormValue.country} name="country"/>*/}
                {/*        <AutoField value={FormValue.comment1} name="comment1"/>*/}
                {/*        <AutoField value={FormValue.comment2} name="comment2"/>*/}
                {/*    </AutoForm>*/}
                {/*}*/}
                {
                    !id &&
                    <AutoForm schema={schema} onSubmit={e =>
                        mutateFunction({
                            variables: {
                                "contact": {
                                    box: e.box,
                                    surname: e.surname,
                                    name: e.name,
                                    email: e.email,
                                    phone: e.phone.toString(),
                                    town: e.town,
                                    region: e.region,
                                    country: e.country,
                                    comment1: e.comment1,
                                    comment2: e.comment2
                                }
                            }
                        }).then(r=>{
                            alert(JSON.stringify(r))
                        }).catch(error=>{
                            console.log(error.message)
                        })
                    }/>
                }
            </Container>
        )
}

export default Update