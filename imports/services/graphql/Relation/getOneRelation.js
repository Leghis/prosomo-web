import {gql, useQuery} from "@apollo/client";

const getRelationById = gql`
  query GetRelation($getRelationId: ID) {
    getRelation(id: $getRelationId) {
      _id
      contactID
      surname
      name
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
const getOneRelation = (id) => {
  const {loading, error, data} = useQuery(getRelationById, {
    variables: {
      getRelationId: id
    }
  })

  return {
    load: loading,
    failed: error,
    response: data
  }
}

export default getOneRelation
