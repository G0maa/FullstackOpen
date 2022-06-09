import React from "react" 

const Notification = ({ message, error }) => {
    if (message === null)
        return null

    // Probably not the best way to implement an error notification,
    // but I was lazy.
    const notificationStyle = {
        color: (error === true) ? 'red' : 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    return (
        <div style={notificationStyle}>
            {message}
        </div>
    )
}

export default Notification