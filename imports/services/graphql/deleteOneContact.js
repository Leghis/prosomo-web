import {gql, useMutation} from "@apollo/client";

const deleteContact = gql`
  mutation DeleteContact($deleteContactId: ID!) {
    deleteContact(id: $deleteContactId)
  }
`

const deleteOneContact = () => {
  const [mutateFunction, {data, loading, error,client}] = useMutation(deleteContact,{
    async update(cache,result){
      await client.resetStore()
    }
  })

  return [mutateFunction, {dateDelete: data, loadingDelete: loading, errorDelete: error}]
}

export default deleteOneContact
