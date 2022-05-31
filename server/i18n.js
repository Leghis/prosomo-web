import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      "home_title": "Contact list",
      "table":{
        "nom" : "Last name",
        "prenom":"Last name",
        "courriel":"E-mail",
        "telephone":"Phone",
        "ville":"Town",
        "region":"Region",
        "bp":"Box",
        "pays":"Country",
        "commentaire01": "First comment",
        "commentaire02":"Second comment",
        "options":"Options"
      },
      "detailDuContact" : "Detail of the contact",
      "modifier" : "Edit",
      "supprimer" : "Delete",
      "plusDeDetail":"More details",
      "rapports":"Report",
      "ajouter":"Add",
      "filtreParProvince":"Filter by province",
      "filtreParBoitePostal" : "Filter By P.O. Box",
      "tableauDeFiltreDeRegions" : "Regions filter table",
      "tableauDeFiltreDeBoitePostale":"Post Office Box Filter Chart",
      "total":"Total",
      "retourVersLaPageDaccueil":"Back to the home page",
      "listeDeRelations":"List of relations",
      "aucunContactPrincipal":"No main contact",
      "listeDeContactVide":"Empty contact list",
      "ajouterUneRelation":"Add a relationship",
      "lignesParPage":"rowsPerPage"
    }
  },
  fr: {
    translation: {
      "home_title": "Liste de contact",
      "table":{
        "nom" : "Nom",
        "prenom":"Prenom",
        "courriel":"courriel",
        "telephone":"Téléphone",
        "ville":"Ville",
        "region":"Région",
        "bp":"Boite postal",
        "pays":"Pays",
        "commentaire01": "Premier commentaire",
        "commentaire02":"Deuxième commentaire",
        "options":"Options"
      },
      "detailDuContact" : "Détail du contact",
      "modifier" : "Modifier",
      "supprimer" : "Supprimer",
      "plusDeDetail":"Plus de détail",
      "rapports":"Rapports",
      "ajouter":"Ajouter",
      "filtreParProvince":"Filtre par province",
      "filtreParBoitePostal" : "Filtre Par Boite Postal",
      "tableauDeFiltreDeRegions" : "Tableau de filtre de regions",
      "tableauDeFiltreDeBoitePostale":"Tableau de filtre de boite postale",
      "total":"Total",
      "retourVersLaPageDaccueil":"Retour vers la page d'accueil",
      "listeDeRelations":"Liste de relations",
      "aucunContactPrincipal":"Aucun contact principal",
      "listeDeContactVide":"Liste de contact vide",
      "ajouterUneRelation":"Ajouter une relation",
      "lignesParPage":"lignes par page"
    }
  }
};


i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "fr", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false // react already safes from xss
    },

    // react i18next special options (optional)
    react: {
      wait: false,
      bindI18n: 'languageChanged loaded',
      bindStore: 'added removed',
      nsMode: 'default'
    }
  });

export default i18n;
