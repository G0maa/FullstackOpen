import { useState } from "react"

const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>
        {text}
    </button>
)


const App = () => {
    
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const incrementVar = (vari, setVar) => {
        setVar(vari + 1)
    }

    
    return (
        <div>
            <h1>give feedback</h1>
            <Button handleClick={() => incrementVar(good, setGood)} text={"good"} />
            <Button handleClick={() => incrementVar(neutral, setNeutral)} text={"neutral"} />
            <Button handleClick={() => incrementVar(bad, setBad)} text={"bad"} />
            <Statistics ratings={[good, neutral, bad]}/>
        </div>
    )
}


const Statistics = ({ratings}) => {
    const good = ratings[0]
    const neutral = ratings[1]
    const bad = ratings[2]
    const total = good + bad + neutral
    return (
        <div>
            <h1>statistics</h1>
            <p>good {good}</p>
            <p>neutral {neutral}</p>
            <p>bad {bad}</p>
            <p>all {total}</p>
            <p>average {(good - bad) / total}</p>
            <p>positive {(good / total) * 100}%</p>
        </div>
    )
}


export default App
