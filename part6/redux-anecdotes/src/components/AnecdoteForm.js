// import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
    // const dispatch = useDispatch()

    const submitForm = async (event) => {
        event.preventDefault()
        const quote = event.target.quote.value
        event.target.quote.value = ''

        // dispatch(createAnecdote({
        //     content: quote,
        //     votes: 0
        // }))
        // Uhh... I am not sure if this is correct.
        // dispatch(showNotification(`Added new ancdote '${quote}'`, 5))
        props.createAnecdote({
            content: quote,
            votes: 0
        })
        props.showNotification(`Added new ancdote '${quote}'`, 5)
      }

    return(
        <div>
            <h2>create new</h2>
            <form onSubmit={submitForm}>
            <div><input name='quote'/></div>
            <button>create</button>
            </form>
        </div>
    )
}

// export default AnecdoteForm
export default connect(
    null,
    { createAnecdote, showNotification },
)(AnecdoteForm)
