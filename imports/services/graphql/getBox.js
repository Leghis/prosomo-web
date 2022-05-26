import {gql, useQuery} from "@apollo/client";

const getAllbox = gql`
  query Query {
    getBox
  }`

const getBox = () => {
  const {loading, error, data} = useQuery(getAllbox)

  return {
    loadBox : loading,
    errorBox : error,
    dataBox : data,
  }
}

export default getBox
