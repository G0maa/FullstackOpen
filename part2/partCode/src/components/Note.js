import React from "react" // Why this line?

const Note = ({ note }) => {
    return (
        <li>{note.content}</li>
    )
}

export default Note