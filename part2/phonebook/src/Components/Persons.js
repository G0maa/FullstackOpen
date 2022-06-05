import React from "react" 

const Persons = ({filteredPersonsArr, onDeleteFunc}) => {
    return(
        <>
            {filteredPersonsArr.map((element) => <Person key={element.id} person={element} onDeleteFunc={onDeleteFunc} />)}
        </>
    )
}

const Person = ({person, onDeleteFunc}) => {
    // I guess the `onDleteFunc()` function can be moved here.

    const buttonClick = () => {
        if(window.confirm(`Delete "${person.name}"?`))
            onDeleteFunc(person.id)
    }

    return (
        <li key={person.id}>{person.name}, {person.number} <button onClick={buttonClick}>delete</button></li>
    )
}

export default Persons