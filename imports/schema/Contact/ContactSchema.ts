import {JSONSchemaBridge} from 'uniforms-bridge-json-schema';
import {LongTextField} from 'uniforms-material';

const schema = {
    title: 'Contact',
    type: 'object',
    properties: {
        surname: {type: 'string'},
        name: {type: 'string'},
        email: {type: 'string'},
        phone: {type: 'integer'},
        town: {type: 'string'},
        region: {type: 'string'},
        box: {type: 'string'},
        country: {type: 'string'},
        comment1: {
            type: 'string',
        },
        comment2: {
            type: 'string',
        }
    },
    required: ['surname', 'name', 'email','phone', 'town','region',
    'box','country'],
};

export default schema
