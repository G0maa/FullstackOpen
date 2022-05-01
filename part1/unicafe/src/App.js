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
    // Not sure if total should have been in its own state... probably?

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

    const average = (good - bad) / total
    const positive = (good / total) * 100

    if(total > 0)
        return (
            <div>
                <h1>statistics</h1>
                <StatisticLine text={"good"} value={good} />
                <StatisticLine text={"neutral"} value={neutral} />
                <StatisticLine text={"bad"} value={bad} />
                <StatisticLine text={"all"} value={total} />
                <StatisticLine text={"average"} value={average} />
                <StatisticLine text={"positive"} value={positive} />
            </div>
        )
    else
        return (
            <div>
                <p>No feedback given</p>
            </div>
        )
}

const StatisticLine = ({text, value}) => {
    return (
        <p>{text} {value}</p>
    )
}
export default App
