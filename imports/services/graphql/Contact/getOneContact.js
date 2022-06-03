import {gql, useQuery} from "@apollo/client";

const getContactById = gql`
  query GetContact($getContactId: ID) {
    getContact(id: $getContactId) {
      surname
      name
      email
      phone
      _id
      town
      region
      box
      country
      date
      comment1
      comment2
    }
  }`
const getOneContact = (id) => {
  const {loading, error, data} =  useQuery(getContactById, {
    variables: {
      getContactId: id
    }
  })

  return {
    load: loading,
    failed: error,
    response: data
  }
}

export default getOneContact
