import {gql, useMutation} from "@apollo/client";

const deleteContact = gql`
    mutation DeleteContact($deleteContactId: ID!) {
    deleteContact(id: $deleteContactId)
    }
    `
const deleteOneContact = () => {
    const [mutateFunction, {data, loading, error}] = useMutation(deleteContact)

       return [mutateFunction, {dateDelete:data, loadingDelete:loading, errorDelete:error}]
}

export default deleteOneContact