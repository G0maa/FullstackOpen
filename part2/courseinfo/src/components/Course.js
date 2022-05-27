const Course = ({course}) => {
  return (
    <>
      <Header name={course.name}/>
      <Content parts={course.parts}/> 
      <Total parts={course.parts}/>
    </>
  )
}


const Header = ({ name }) => <h1>{name}</h1>


const Content = ({ parts }) => {
  return (
    <>
      {parts.map(part => <Part key={part.id} part={part}/>)}
    </>
  )
}


const Total = ({ parts }) => {
  const total = parts.reduce((sum, element) => sum += element.exercises, 0)
  return(
    <p><strong>Total of exercises is {total}</strong></p>
  )
}


const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>
export default Course