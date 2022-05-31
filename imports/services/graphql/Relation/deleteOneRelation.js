import {gql, useMutation} from "@apollo/client";

const deleteRelation = gql`
  mutation DeleteRelation($deleteRelationId: ID!) {
    deleteRelation(id: $deleteRelationId)
  }
`

const deleteOneRelation = () => {
  const [mutateFunction, {data, loading, error,client}] = useMutation(deleteRelation,{
    async update(cache,result){
      await client.resetStore()
    }
  })

  return [mutateFunction, {dateDelete: data, loadingDelete: loading, errorDelete: error}]
}

export default deleteOneRelation
