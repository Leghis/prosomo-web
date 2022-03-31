import React, {useEffect, useState} from "react";
import {AutoField, AutoForm, ErrorsField, SubmitField} from "uniforms-material";
import {bridge as schema} from "../../schema/Contact/ContactValidator";
import {Link, Redirect, useHistory, useLocation, useParams} from "react-router-dom";
import getOneContact from "../../services/graphql/getOneContact";
import {Button, CircularProgress, Container} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import postOneContact from "../../services/graphql/postOneContact";
import updateOneContact from "../../services/graphql/updateOneContact";


const useStyles = makeStyles({
    containerLoader: {
        display: "flex",
        height: "max-content",
        justifyContent: "center",
        alignItems: "center"
    },
    btnBack: {
        textDecoration: "none"
    }
});

const Update = () => {

    //css style
    const classes = useStyles();

    //get the id
    const {id} = useParams();

    //Hook to perform a redirection after the registration of a contact
    let history = useHistory();


    //Utiliser le service getOneContact pour récupérer les informations d'un
    // contact afin de les afficher dans le formulaire si l'id est existant
    const {load, failed, response} = getOneContact(id)


    const [CreateContact, {dataCreateContact, loadingContact, errorCreateContact}] = postOneContact()
    const [updateContact, {dataUpdateContact, loadingUpdate, errorUpdateContact}] = updateOneContact()

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
    }, [load, failed, response])

    const changeDataForm = (e) => {
        console.log(e)
    }

    return (
        <div>
            <Link className={classes.btnBack} to={'/'}>
                <Button variant="outlined" color="primary">
                    Retour vers la page d'accueil
                </Button>

            </Link>
            <Container className={classes.containerLoader} maxWidth="sm">
                {/*while the page is loading, display a loader*/}
                {
                    (id && (!FormValue)) && <CircularProgress/>
                }

                {/*Once the data has been loaded, display the form with the data if an id
                 has been passed in parameter*/}
                {
                    FormValue &&
                    <AutoForm schema={schema} onSubmit={e =>
                        updateContact(
                            {
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
                                    },
                                    "refreshContactId": id,
                                }
                            }).then(r => {
                            console.log(JSON.stringify(r))
                            history.push('/')
                        }).catch(error => {
                            console.log(error.message)
                        })
                    }/>
                }

                {/*if the id doesn't exist, it means we just want to create a new contact,
                so we will just display an empty form*/}
                {
                    !id &&
                    <AutoForm schema={schema} onSubmit={e =>
                        CreateContact({
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
                        }).then(r => {
                            console.log(JSON.stringify(r))
                            history.push('/')
                        }).catch(error => {
                            console.log(error.message)
                        })
                    }/>
                }
            </Container>
        </div>
    )
}

export default Update