import React from 'react'


const Course = ({course}) => {
    return (
      <div>
        <Header course = {course}/>
        <Content course = {course}/>
        <Total course = {course}/>
      </div>
    )
}
  
const Header = ({course}) => {
  return (
    <div>
      <h1>{course.name}</h1>
    </div>
  )
}
  
const Content = ({course}) => {
  return (
    <div>
      {course.parts.map (
          part => 
          <Part key = {part.id} part ={part}/>
        )
      }
    </div>
  )
}

const Part = ({part}) => {
  return(
    <div>
      <p>{part.name} {part.exercises}</p>
    </div>
  )
}
 
const Total = ({course}) => {
  const total = course.parts.reduce((s,p) => 
  {return s + p.exercises}, 0)
    return (
    <div>
      <b>total of exercises {total}</b>
    </div>
  )
}
  


export default Course
