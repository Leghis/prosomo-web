import { parse } from 'graphql/language/parser';
import { buildASTSchema } from 'graphql/utilities';
import { GraphQLBridge } from 'uniforms-bridge-graphql';

const schema = `
  type Contact{
      surname: String
      name: String
      email: String
      phone: String
      town: String
      region: String
      box: String
      country: String
      comment1: String
      comment2: String
  }

  # This is required by buildASTSchema
  type Query { anything: ID }
`;


const validator = (model: object) => {
    const details = [];
    let BoxPattern = /^(?!.*[DFIOQU])[A-VXY][0-9][A-Z] ?[0-9][A-Z][0-9]$/;
    let EmailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let PhonePattern = /^\(\d{3}\)\s?\d{3}-\d{4}$/
    // @ts-ignore
    if(!model.surname){
        details.push({ name: 'surname', message: 'Veuillez inserer votre prénom' })
    }
    // @ts-ignore
    if(!model.name){
        details.push({ name: 'name', message: 'Veuillez inserer votre nom' })
    }
    // @ts-ignore
    if(!model.email){
        details.push({ name: 'email', message: 'Veuillez inserer une adresse email' })
    }else { // @ts-ignore
        if(EmailPattern.test(model.email)==false){
            details.push({ name: 'email', message: 'Veuillez inserer une adresse email valide' })
        }
    }

    // @ts-ignore
    if(!model.phone){
        details.push({ name: 'phone', message: 'Veuillez inserer un numero de téléphone' })
    }else { // @ts-ignore
        if(PhonePattern.test(model.phone)==false){
            details.push({ name: 'phone', message: 'Veuillez inserer un numero de téléphone sous la forme (000)000-0000' })
        }
    }


    // @ts-ignore
    if(!model.town){
        details.push({ name: 'town', message: 'Veuillez inserer votre ville' })
    }

    // @ts-ignore
    if(!model.region){
        details.push({ name: 'region', message: 'Veuillez inserer votre région' })
    }
    // @ts-ignore
    if(!model.box){
        details.push({ name: 'box', message: 'Veuillez inserer votre boite postal' })
    }else { // @ts-ignore
        if(BoxPattern.test(model.box)==false){
            details.push({ name: 'box', message: 'Veuillez inserer votre boite postal sous le format canadien ex : A9A9A9' })
        }
    }


    // @ts-ignore
    if(!model.country){
        details.push({ name: 'country', message: 'Veuillez inserer votre pays' })
    }



    return details.length ? { details } : null;
};


const args = {
    surname: {type: 'string',label:'Prénom'},
    name: {type: 'string',label:'Nom'},
    email: {type: 'string',format:'email',label:'Email'},
    phone: {type: 'string',label:'Téléphone'},
    town: {type: 'string',label:'Ville'},
    region: {type: 'string',label:'Région'},
    box: {type: 'string',label:'Boite postal',pattern: "^(?!.*[DFIOQU])[A-VXY][0-9][A-Z] ?[0-9][A-Z][0-9]$",
        format: "regex"},
    country: {type: 'string',label:'Pays'},
    comment1: {
        type: 'string'
        ,label:'Premier commentaire',
    },
    comment2: {
        type: 'string',
        label:'Deuxième commentaire',
    }
};

const type = buildASTSchema(parse(schema)).getType('Contact')!;

export const bridge = new GraphQLBridge(type, validator, args);
