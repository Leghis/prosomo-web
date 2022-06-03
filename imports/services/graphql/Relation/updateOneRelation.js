import {gql, useMutation} from "@apollo/client";

const update = gql`
  mutation RefreshRelation($refreshRelationId: ID!, $relation: RelationInput) {
    refreshRelation(id: $refreshRelationId, relation: $relation) {
      _id
    }
  }
`
const updateOneContact = () => {
  const [updateRelation, {data, loading, error, client}] = useMutation(update)

  return [updateRelation, {dataUpdateRelation: data, loadingUpdate: loading, errorUpdateRelation: error}]
}

export default updateOneContact
