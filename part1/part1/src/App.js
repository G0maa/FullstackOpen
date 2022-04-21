const Hello = (props) => {
  return (
    <>
      <p>Hello {props.name}, you are {props.age} years old.</p>
    </>
  )
}


const App = () => {
  const name = 'Ahmed'
  const age = 10
  return (
    <>
      <h1>Greetings!</h1>
      <Hello name="Gomaa" age="21"/>
      <Hello name={name} age={age + 10}/>
    </>
  )
}


export default App
