import {gql, useQuery} from "@apollo/client";

const getAll = gql`
  query GetAllRelation($contactId: String) {
    getAllRelation(contactID: $contactId) {
      _id
      contactID
      surname
      name
      phone
      email
      town
      region
      box
      country
      comment1
      comment2
    }
  }`

const getAllRelation =  (id) => {
  const {loading, error, data} =  useQuery(getAll, {
      variables: {
        contactId:id
      },
      pollInterval: 1000,
    }
  )

  return {
    loading,
    error,
    data ,
  }
}

export default getAllRelation
