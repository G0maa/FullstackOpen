import { useState } from "react"

// const History = ({allClicks}) => {
//     if(allClicks.length === 0) {
//         return(
//             <div>
//                 the app is used by pressing the buttons.
//             </div>
//         )
//     }

//     return(
//         <div>
//             button press history: {allClicks.join(' ')}
//         </div>
//     )

// }


// const Button = ({handleClick, text}) => (
//     <button onClick={handleClick}>
//         {text}
//     </button>
// )


// const App = () => {
//     const [left, setLeft] = useState(0)
//     const [right, setRight] = useState(0)
//     const [allClicks, setAll] = useState([])

//     console.log("A re-render happened...")
//     const handleLeftClick = () => {
//         setAll(allClicks.concat('L'))
//         setLeft(left + 1)
//     }
//     // debugger
//     const handleRightClick = () => {
//         setAll(allClicks.concat('R'))
//         setRight(right + 1)
//     }

//     return (
//         <div>
//             {left}
//             <Button handleClick={handleLeftClick} text='left' />
//             <Button handleClick={handleRightClick} text='right' />
//             {right}
//             <History allClicks={allClicks} />
//         </div>
//     )
// }


const App = () => {
    
    // Verbose version:
    // const hello = (who) => {
    //     const handler = () => {
    //       console.log('hello', who)
    //     }
      
    //     return handler
    //   }

    // Shorthand
    const hello = (who) => () => {
            console.log('Hello', who)
        }
    

    // ?Note that in the first render, three functions are created each with their respected
    // parameter, NOT one function depending on a button click.?
    return (
        <div>
            <button onClick={hello('world')}>button</button>
            <button onClick={hello('react')}>button</button>
            <button onClick={hello('funcion')}>button</button>
        </div>
    )
}

export default App
