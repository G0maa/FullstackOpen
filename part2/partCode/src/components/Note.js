import React from "react" // Why this line?

const Note = ({ note, toggleImportance }) => {
    const label = note.impoortant ? 'make not important' : 'make important'

    return (
        <li>
            {note.content}
            <button onClick={toggleImportance}>{label}</button>
        </li>
    )
}

export default Note