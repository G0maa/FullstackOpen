import { useState } from "react"

const App = () => {

    const anecdotes = [
        'If it hurts, do it more often',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
    ]

    const [selected, setSelected] = useState(0)
    const [voteArr, setVotes] = useState(Array(7).fill(0))

    console.log(voteArr)


    const setRandom = () => {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
        const nextSelected = Math.floor(Math.random() * 7)
        setSelected(nextSelected)
    }

    const incrementVote = () => {

        const voteArrCopy = [...voteArr] 
        voteArrCopy[selected] += 1
        setVotes(voteArrCopy)
    }

    let mostVotesidx = 0
    for(let idx = 0; idx < 7; ++idx)
        if(voteArr[idx] > voteArr[mostVotesidx])
            mostVotesidx = idx


    return (
        <>
            <h1>Anecdote of the day</h1>
            <DisplayAnecdote anecdoteText={anecdotes[selected]} anecdoteVotes={voteArr[selected]}/>
            
            <button onClick={incrementVote}>vote</button>
            <button onClick={setRandom}>Next anecdotes</button>

            <h1>Anecdote with most votes</h1>
            <DisplayAnecdote anecdoteText={anecdotes[mostVotesidx]} anecdoteVotes={voteArr[mostVotesidx]}/>
        </>
    )
}


const DisplayAnecdote = ({anecdoteText, anecdoteVotes}) => {
    return(
        <>
            <p>
                {anecdoteText}
            </p>
            <p>has {anecdoteVotes} votes</p>
        </>
    )
}

export default App;
