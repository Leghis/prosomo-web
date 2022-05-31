import React, {useEffect, useState} from "react";
import {AutoField, AutoForm, ErrorsField, SubmitField, TextField} from "uniforms-material";
import {bridge as schema} from "../../schema/GraphQLBridge/Contact/ContactSchema";
import {Link, Redirect, useHistory, useLocation, useParams} from "react-router-dom";
import {Button, CircularProgress, Container} from "@material-ui/core";
import updateOneContact from "../../services/graphql/Contact/updateOneContact";
import {makeStyles} from "@material-ui/core/styles";
import postOneRelation from "../../services/graphql/Relation/CreateRelation";
import getOneRelation from "../../services/graphql/Relation/getOneRelation";
import updateOneRelation from "../../services/graphql/Relation/updateOneRelation";
import {useTranslation} from "react-i18next";

const useStyles = makeStyles({
  root: {
    marginTop: 10
  },
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

const addRelation = () => {
  //css style
  let [classes, setClasses] = useState(useStyles());

  //get the id
  let {contactID, id} = useParams();

  //Hook to perform a redirection after the registration of a contact
  let history = useHistory();

  const { t, i18n } = useTranslation();



  //Utiliser le service getOneContact pour récupérer les informations d'un
  // contact afin de les afficher dans le formulaire si l'id est existant
  const {load, failed, response} = getOneRelation(id)


  const [CreateRelation] = postOneRelation()
  const [updateRelation] = updateOneRelation()

  //this hook will allow us to store the values of a contact if it exists
  const [FormValue, setFormValue] = useState(null)

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
    if (response) {
      setFormValue(response.getRelation)
    }
  }, [load, failed, response])

  const click = ()=>{
    history.goBack()
  }


  return (
    <div className={classes.root}>
      <Button variant="outlined" color="primary">
        <Link className={classes.btnBack} to={'/'}>
          {t("retourVersLaPageDaccueil")}
        </Link>
      </Button>
      <Container className={classes.containerLoader} maxWidth="sm">
        {/*while the page is loading, display a loader*/}
        {
          (id && (!FormValue)) && <CircularProgress/>
        }

        {/*Once the data has been loaded, display the form with the data if an id
                 has been passed in parameter*/}
        {
          FormValue &&
          <AutoForm model={FormValue} schema={schema} onSubmit={(e) =>
            updateRelation(
              {
                variables: {
                  "relation": {
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
                  "refreshRelationId": id,
                }
              }).then(() => {
              click()
            }).catch(error => {
              console.log(error.message)
            })
          }/>
        }

        {/*if the id doesn't exist, it means we just want to create a new contact,
                so we will just display an empty form*/}
        {
          !id &&
          <AutoForm placeholder schema={schema} onSubmit={e =>
            CreateRelation({
              variables: {
                "relation": {
                  contactID:contactID,
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
              history.goBack()
            }).catch(error => {
              console.log(error.message)
            })
          }/>
        }
      </Container>
    </div>
  )
}

export default addRelation
