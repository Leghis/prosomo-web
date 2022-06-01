import {gql, useMutation} from "@apollo/client";

const update = gql`
  mutation RefreshRelation($refreshRelationId: ID!, $relation: RelationInput) {
    refreshRelation(id: $refreshRelationId, relation: $relation) {
      _id
    }
  }
`
const updateOneContact = () => {
  const [updateRelation, {data, loading, error, client}] = useMutation(update,{
     async update(cache,result){
       await client.resetStore()
    }
  })

  return [updateRelation, {dataUpdateRelation: data, loadingUpdate: loading, errorUpdateRelation: error}]
}

export default updateOneContact
