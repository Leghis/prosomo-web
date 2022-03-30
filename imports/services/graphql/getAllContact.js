import {gql, useQuery} from "@apollo/client";

const getAll = gql`
        query getAllContact{
            getAllContact {
            box
            id
            surname
            name
            email
            phone
            region
            town
            country
            comment1
            comment2
        }
      }`

const getllContact = () => {
    const { loading, error, data } = useQuery(getAll,{pollInterval: 500,})

    return {
        loadAllContact : loading,
        errorLoadAllContact : error,
        dataAllContact : data
    }
}

export default getllContact