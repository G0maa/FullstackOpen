import React from "react" 

const Persons = ({filteredPersonsArr}) => {
    return(
        <>
        {filteredPersonsArr.map((element) => <Person key={element.id} person={element} />)}
        </>
    )
}

const Person = ({person}) => {
    return (
        <li key={person.id}>{person.name}, {person.number}</li>
    )
}

export default Persons