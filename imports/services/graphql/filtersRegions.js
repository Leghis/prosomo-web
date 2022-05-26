import {gql, useQuery} from "@apollo/client";

const getFilters = gql`
  query FilterRegion($region: String) {
    filterRegion(region: $region) {
      _id
      state
      total
    }
  }`

const getFilterRegions =  (regions) => {
  const {loading, error, data} =  useQuery(getFilters,
    {
      variables: {
        region: regions
      }
    })

  return {
    loadFilterR: loading,
    errorFilterR: error,
    dataFilterR: data,
  }
}

export default getFilterRegions
