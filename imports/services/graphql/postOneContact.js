import {gql, useMutation} from "@apollo/client";

const createContact = gql`
mutation($contact: ContactInput!){
  createContact(contact: $contact) {
    box
    id
    surname
    name
    email
    phone
    town
    region
    country
    comment1
    comment2
  }
}
`
const postOneContact =  () => {
    const [mutateFunction, {data, loading, error}] = useMutation(createContact)

    return  [mutateFunction, {dataCreateContact:data, loadingContact:loading, errorCreateContact:error}]
}

export default postOneContact