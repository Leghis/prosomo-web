import { GraphQLBridge } from 'uniforms-bridge-graphql';
import { buildASTSchema, parse } from 'graphql';
const {gql} = require("apollo-server")

const schema = gql`
    type Author {
        id:        String!
        firstName: String
        lastName:  String
    }

    type Post {
        id:     Int!
        author: Author!
        title:  String
        votes:  Int
    }

    # This is required by buildASTSchema
    type Query { anything: ID }
`;

const schemaType = buildASTSchema(parse(schema)).getType('Post');
const schemaExtras = {
    id: {
        allowedValues: [1, 2, 3]
    },
    title: {
        options: [
            { label: 1, value: 'a' },
            { label: 2, value: 'b' }
        ]
    },
    'author.firstName': {
        placeholder: 'John'
    }
};

const schemaValidator = (model: object) => {
    const details = [];

    // @ts-ignore
    if (!model.id) {
        details.push({ name: 'id', message: 'ID is required!' });
    }

    // @ts-ignore
    if (!model.author.id) {
        details.push({ name: 'author.id', message: 'Author ID is required!' });
    }

    // @ts-ignore
    if (model.votes < 0) {
        details.push({
            name: 'votes',
            message: 'Votes must be a non-negative number!'
        });
    }

    // ...

    return details.length ? { details } : null;
};

// @ts-ignore
const bridge = new GraphQLBridge(schemaType, schemaValidator, schemaExtras);

export default bridge