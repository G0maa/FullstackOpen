import React from "react" 

const Filter = ({searchFilterVar, onChangeFilterFunc}) => {
    return(
      <div>Fitler shown with: <input value={searchFilterVar} onChange={onChangeFilterFunc}/></div>
    )
}

export default Filter