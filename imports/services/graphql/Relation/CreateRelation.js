import {gql, useMutation} from "@apollo/client";

const createRelation = gql`
  mutation CreateRelation($relation: RelationInput!) {
    createRelation(relation: $relation) {
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
  }
`
const postOneRelation = () => {
  const [CreateRelation, {data, loading, error,client}] = useMutation(createRelation,{
    async update(cache,result){
      await client.resetStore()
    }
  })

  return [CreateRelation, {dataRelation: data, loadingRelation: loading, errorCreateRelation: error}]
}

export default postOneRelation
