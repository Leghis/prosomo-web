import {gql, useMutation} from "@apollo/client";

const update = gql`
mutation RefreshContact($refreshContactId: ID!, $contact: ContactInput) {
  refreshContact(id: $refreshContactId, contact: $contact) {
    id
  }
}
`
const updateOneContact =  () => {
    const [updateContact, {data, loading, error}] = useMutation(update)

    return  [updateContact, {dataUpdateContact:data, loadingUpdate:loading, errorUpdateContact:error}]
}

export default updateOneContact