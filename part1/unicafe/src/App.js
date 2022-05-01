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
            <Stats ratings={[good, neutral, bad]}/>
        </div>
    )
}


const Stats = ({ratings}) => {
    return (
        <div>
            <h1>statistics</h1>
            <p>good {ratings[0]}</p>
            <p>neutral {ratings[1]}</p>
            <p>bad {ratings[2]}</p>
        </div>
    )
}


export default App
