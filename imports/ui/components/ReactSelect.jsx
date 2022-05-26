import React, {useState} from 'react'
import Select from 'react-select'


function ReactSelect({valueselect,options}) {
  let options2 = {value: 'chargement...', label: 'chargement...'}
  const handleChange = (e) =>{
    valueselect(e.value)
  }
  return(
    <div>
      <Select onChange={handleChange} options={options ? options : options2}/>
    </div>
  )

}

export default ReactSelect
