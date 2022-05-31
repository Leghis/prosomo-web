import {gql, useQuery} from "@apollo/client";

const getAll = gql`
  query GetAllContact($perPage: Int, $page: Int) {
    getAllContact(perPage: $perPage, page: $page) {
      count
      data {
        _id
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
        DefaultRelation {
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
          default
        }
      }
    }
  }`

const getllContact = (page, rowsPerPage) => {
  const {loading, error, data} = useQuery(getAll, {
      variables: {
        perPage: rowsPerPage,
        page: page
      },
      pollInterval: 1000,
    }
  )

  return {
    loading,
    error,
    data,
  }
}

export default getllContact
