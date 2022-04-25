import { useState } from "react"

const App = () => {
    const [counter, setCounter] = useState(0)



    // setCounter(counter + 1)
    

    console.log('rendering...', counter)
  
    return (
        <div>
            {counter}
        </div>
    )
}


export default App
