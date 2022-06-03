import React, {useEffect, useState} from "react";
import {AutoField, DateField, AutoForm, ErrorsField, SubmitField, SelectField} from "uniforms-material";
import {bridge as schema} from "../../schema/GraphQLBridge/Contact/ContactSchema";
import {Link, Redirect, useHistory, useLocation, useParams} from "react-router-dom";
import getOneContact from "../../services/graphql/Contact/getOneContact";
import {Button, CircularProgress, Container} from "@material-ui/core";
import postOneContact from "../../services/graphql/Contact/postOneContact";
import updateOneContact from "../../services/graphql/Contact/updateOneContact";
import {makeStyles} from "@material-ui/core/styles";
import {useTranslation} from "react-i18next";
import {gql, useApolloClient} from "@apollo/client";
import moment from "moment";
import {useForm} from "uniforms";


const useStyles = makeStyles({
  root: {
    marginTop: 10
  }, containerLoader: {
    display: "flex", height: "max-content", justifyContent: "center", alignItems: "center"
  }, btnBack: {
    textDecoration: "none"
  }
});

//Fonction permettant de récupéré les erreurs du formulaire
async function isSomeSpecialCase(error) {
  let details = []
  details = error ? (error.details) : null
  return details;
}

//Fonction permettant d'effectuer la vérification de l'email
async function emailValidation(model, client) {
  let exist = false
  const queryEmailExist = gql`
    query Query($email: String) {
      emailExist(email: $email)
    }`

  await client.query({
    query: queryEmailExist, variables: {"email": model.email,}
  })
    .then(data => exist = data.data.emailExist)
    .catch(error => console.log(`received error ${error}`))

  return exist;
}


const Update = () => {
  //css style
  let [classes, setClasses] = useState(useStyles());
  const {t, i18n} = useTranslation();
  const client = useApolloClient();


  //get the id
  let {id} = useParams();

  //Hook to perform a redirection after the registration of a contact
  let history = useHistory();


  //Utiliser le service getOneContact pour récupérer les informations d'un
  // contact afin de les afficher dans le formulaire si l'id est existant
  const {load, failed, response} = getOneContact(id)


  const [CreateContact, {dataCreateContact, loadingContact, errorCreateContact}] = postOneContact()
  const [updateContact, {dataUpdateContact, loadingUpdate, errorUpdateContact}] = updateOneContact()

  //this hook will allow us to store the values of a contact if it exists
  const [FormValue, setFormValue] = useState(null)

  //this hook allows to store a boolean which will display a loader while waiting
  // for the data to be filled on the form if an id has been passed in parameter
  const [loading, setLoading] = useState(false)

  //this hook will allow us to know if there is an error in order to display a
  // specific error message to the user on the screen
  const [error, setError] = useState(false)

  //etat pays
  const [country, setCountry] = useState("")

  //province du canada
  let province = ["ALBERTA", "COLOMBIE-BRITANIQUE", "ÎLE-DU-PRINCE-ÉDOUARD", "MANITOBA", "MOUVEAU-BRUNSWICK", "NOUVELLE-ÉCOSSE", "ONTARIO", "QUEBEC", "SASKATCHEWAN", "TERRE-NEUVE-ET-LABRADOR", "NUNAVUT", "TERRITOIRES DU NORD-OUEST", "YUKON"]

  //We have used a Hook useEffect here to avoid multiple rendering
  // and to render when loadn failled or response is modified
  useEffect(() => {
    if (load) setLoading(load)
    if (failed) setError(true)
    if (response) {
      setCountry(response.getContact.country)
      let date = response.getContact.date
      setFormValue({...response.getContact, date:new Date(date)})
      console.log(new Date())
      console.log(FormValue)
    }
  }, [load, failed, response])

  const click = () => {
    history.goBack()
  }


  //model transform pour efectuer des modification sur le model
  function modelTransform(mode, model) {
    // This model will be passed to the fields.
    let newModel = null

    if (mode === 'form') {
    }

    // This model will be submitted.
    if (mode === 'submit') {
      let data = {
        ...model,
        country: model.country.toString().toUpperCase(),
        town: model.town.toString().toUpperCase(),
        region: model.region.toString().toUpperCase()
      }
      newModel = data
    }

    // This model will be validated.
    if (mode === 'validate') {
      /* ... */
    }


    // Otherwise, return unaltered model.
    return newModel ?? model;
  }

  //Fonction permettant de faire la validation asynchrone
  const onValidate = async (model, error) => {
    let details = await isSomeSpecialCase(error) ?? []

    let emailExist = await emailValidation(model, client)


    if (emailExist) {
      details.push({name: 'email', message: 'Cette adresse email est déjà existante'})
    }
    return details ? (details.length ? {details} : null) : null;
  };


  return (<div className={classes.root}>
    <Button variant="outlined" color="primary">
      <Link className={classes.btnBack} to={'/'}>
        {t("retourVersLaPageDaccueil")}
      </Link>
    </Button>
    <Container className={classes.containerLoader} maxWidth="sm">
      {/*while the page is loading, display a loader*/}
      {(id && (!FormValue)) && <CircularProgress/>}

      {/*Once the data has been loaded, display the form with the data if an id
                 has been passed in parameter*/}
      {FormValue &&
        <AutoForm
          onChange={(key, value) => key === "country" && setCountry(value)}
          modelTransform={modelTransform}
          model={FormValue} schema={schema}
          onSubmit={(e) =>{
            updateContact({
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
                  date:e.date,
                  comment1: e.comment1,
                  comment2: e.comment2
                }, "refreshContactId": id,
              }
            }).then(() => {
              click()
            }).catch(error => {
              console.log(error.message)
            })
          }}>
          <AutoField name="surname"/>
          <AutoField name="name"/>
          <AutoField name="email"/>
          <AutoField name="town"/>
          <SelectField name="country"/>
          {country ? country.toLowerCase() === "canada" ? <SelectField allowedValues={province} name="region"/> :
            <AutoField name="region"/> : <AutoField name="region"/>}
          <AutoField name="phone"/>
          <AutoField name="box"/>
          <DateField  type="date" name="date"/>
          <AutoField name="comment1"/>
          <AutoField name="comment2"/>
          <ErrorsField/>
          <SubmitField/>
        </AutoForm>}

      {/*if the id doesn't exist, it means we just want to create a new contact,
                so we will just display an empty form*/}
      {!id && <AutoForm onChange={(key, value) => key === "country" && setCountry(value.toString.toLowerCase())} onValidate={onValidate}
                        modelTransform={modelTransform}
                        placeholder
                        schema={schema}
                        onSubmit={e => CreateContact({
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
                              date: e.date,
                              comment1: e.comment1,
                              comment2: e.comment2
                            }
                          }
                        }).then(r => {
                          history.push('/')
                        }).catch(error => {
                          console.log(error.message)
                        })}>
        <AutoField name="surname"/>
        <AutoField name="name"/>
        <AutoField name="email"/>
        <AutoField name="town"/>
        <SelectField name="country"/>
        {country ? country.toLowerCase() === "canada" ? <SelectField allowedValues={province} name="region"/> :
          <AutoField name="region"/> : <AutoField name="region"/>}
        <AutoField name="phone"/>
        <AutoField name="box"/>
        <DateField type="date" name="date"/>
        <AutoField name="comment1"/>
        <AutoField name="comment2"/>
        <ErrorsField/>
        <SubmitField/>
      </AutoForm>

      }
    </Container>
  </div>)
}

export default Update
