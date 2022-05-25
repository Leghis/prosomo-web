import {gql, useQuery} from "@apollo/client";

const getAll = gql`
  query GetAllContact($perPage: Int, $page: Int) {
    getAllContact(perPage: $perPage,page: $page) {
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
      }
    }
  }`

const getllContact = (page, rowsPerPage) => {
  const {loading, error, data, fetchMore} = useQuery(getAll, {
      variables: {
        perPage: rowsPerPage,
        page: page
      },
      pollInterval: 500,
    }
  )

  return {
    loading,
    error,
    data,
  }
}

export default getllContact
