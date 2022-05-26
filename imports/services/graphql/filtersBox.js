import {gql, useQuery} from "@apollo/client";

const getFilters = gql`
  query FilterBox($box: String) {
    filterBox(box: $box) {
      _id
      postalCode
      total
    }
  }`

const getFilterBox =  (Box) => {
  const {loading, error, data} =  useQuery(getFilters,
    {
      variables: {
        box: Box
      }
    })
  return {
    loadFilterB: loading,
    errorFilterB: error,
    dataFilterB: data,
  }
}

export default getFilterBox
