import {gql, useQuery} from "@apollo/client";

const getContactById = gql`
query GetContact($getContactId: ID) {
  getContact(id: $getContactId) {
    surname
    name
    id
    email
    phone
    town
    region
    box
    country
    comment1
    comment2
  }
}`
const getOneContact = (id) => {
    const {loading, error, data} = useQuery(getContactById, {
        variables: {
            getContactId: id
        }
    })

    return {
        load : loading,
        failed: error,
        response : data
    }
}

export default getOneContact
