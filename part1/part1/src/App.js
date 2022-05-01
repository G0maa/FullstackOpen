import { useState } from "react"

const Display = ({value}) => <div>{value}</div>


const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>
        {text}
    </button>
)


const App = () => {
    
    const [value, setValue] = useState(0)

    const setToValue = (newValue) => {
        setValue(newValue)
    }

    // Passing event handlers to child components
    return (
        <div>
            <Display value={value} />
            <Button handleClick={() => setToValue(1000)} text={"thousand"} />
            <Button handleClick={() => setValue(0)} text={"reset"} />
            <Button handleClick={() => setToValue(value + 1)} text={"increment"} />
        </div>
    )
}

export default App
