const Header = ({ name }) => <h1>{name}</h1>


const Total = ({ sum }) => <p>Number of exercises {sum}</p>


const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>


const Content = ({ parts }) => {
  return (
    <>
      {parts.map(part => <Part key={part.id} part={part}/>)}
    </>
  )
}


const Course = ({course}) => {
  let sum = 0
  for(const elem of course.parts)
    sum += elem.exercises

  return (
    <>
      <Header name={course.name}/>
      <Content parts={course.parts}/> 
      <Total sum={sum}/>
    </>
  )
}


const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Test',
        exercises: 121,
        id: 4
      }
    ]
  }

  return <Course course={course}/>
}

export default App