import { useSelector, useDispatch } from 'react-redux'
import { dispatchVote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
    return(
        <div>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={handleClick}>vote</button>
            </div>
        </div>
    )
}

const AnecdoteList = () => {
    const anecdotes = useSelector(({filter, anecdotes}) => {
        if(filter === '') {
            return anecdotes
        }
        // Uhh... I'm not sure about this one.
        return anecdotes.filter((anecdote) => anecdote.content.toLowerCase().match(filter.toLowerCase()))
    })
    const dispatch = useDispatch()

    const vote = async (anecdote) => {
        console.log('vote', anecdote)

        // Uhh... I am not sure if this is correct.
        // If you vote too many times this will lead to two things:
        // 1. many calls to setTimeout()
        // 2. the vote won't _really_ last 5 seconds, it will get removed
        // when the first setTimeout() gets fullfilled.
        const votedAnecdote = {...anecdote, votes: anecdote.votes + 1}
        dispatch(dispatchVote(votedAnecdote))
        dispatch(showNotification(`Voted for '${anecdote.content}'`, 5))
    }

    return (
        <div>
            {anecdotes.map(anecdote =>
                <Anecdote key={anecdote.id} anecdote={anecdote} handleClick={() => vote(anecdote)}/>
            )}
        </div>
    )
}

export default AnecdoteList
