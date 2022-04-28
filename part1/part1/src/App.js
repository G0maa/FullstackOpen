import { useState } from "react"

const Display = ({counter}) => <div>{counter}</div>

const Button = ({text, onClick}) => (
    <button onClick={onClick}>
        {text}
    </button>
)

const App = () => {
    const [counter, setCounter] = useState(0)

    const increaseByOne = () => setCounter(counter + 1)
    const decreaseByOne = () => setCounter(counter - 1)
    const setToZero = () => setCounter(0)

    return (
        <div>
            <Display counter={counter} />
            <Button text={"plus"} onClick={increaseByOne} />
            <Button text={"zero"} onClick={setToZero} />
            <Button text={"minus"} onClick={decreaseByOne} />
        </div>
    )
}


export default App
