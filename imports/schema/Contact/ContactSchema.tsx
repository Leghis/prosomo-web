import {JSONSchemaBridge} from 'uniforms-bridge-json-schema';
import {LongTextField} from 'uniforms-material';

const schema = {
    title: 'Contact',
    type: 'object',
    properties: {
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
    },
    required: ['surname', 'name', 'email','phone', 'town','region',
    'box','country'],
};

export default schema
