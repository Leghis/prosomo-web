import {gql, useMutation} from "@apollo/client";

const createContact = gql`
  mutation($contact: ContactInput!){
    createContact(contact: $contact) {
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
const postOneContact = () => {
  const [CreateContact, {data, loading, error}] = useMutation(createContact)

  return [CreateContact, {dataCreateContact: data, loadingContact: loading, errorCreateContact: error}]
}

export default postOneContact
