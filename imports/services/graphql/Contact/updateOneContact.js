import {gql, useMutation} from "@apollo/client";

const update = gql`
  mutation RefreshContact($refreshContactId: ID!, $contact: ContactInput) {
    refreshContact(id: $refreshContactId, contact: $contact) {
      _id
    }
  }
`
const updateOneContact = () => {
  const [updateContact, {data, loading, error, client}] = useMutation(update,{
    async update(cache,result){
      await client.resetStore()
    }
  })

  return [updateContact, {dataUpdateContact: data, loadingUpdate: loading, errorUpdateContact: error}]
}

export default updateOneContact