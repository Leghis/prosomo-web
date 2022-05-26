import {gql, useQuery} from "@apollo/client";

const getAllRegion = gql`
  query Query {
    getRegions
  }`

const getRegions = () => {
  const {loading, error, data} = useQuery(getAllRegion)

  return {
    loadRegion : loading,
    errorRegion : error,
    dataRegion : data,
  }
}

export default getRegions
