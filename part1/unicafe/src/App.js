import React, { useState } from 'react'

const Statistic = ({text,value,unit}) => {
  return (
      <tr>
        <td> {text} </td> 
        <td> {value} {unit} </td>
      </tr>
  )
}

const Statistics = ({good, bad, neutral}) => {
  if(good + bad + neutral === 0){
    return(
    <div>
      <h1>statistics</h1>
      <p>no feedback given</p>
      </div>
    ) 
  }

  return(
    <div>
      <h1>statistics</h1>
      <table>
        <Statistic text = "good" value = {good}/>
        <Statistic text = "neutral" value = {neutral}/>
        <Statistic text = "bad" value = {bad}/>
        <Statistic text = "all" value = {good + bad + neutral}/>
        <Statistic text = "average" value = {(good - bad) / (good + neutral + bad)}/>
        <Statistic text = "positive" value = {(good)/(good + neutral + bad) * 100} unit = "%"/>
      </table>
    </div>
  )
}

const Button = ({text, value, increment}) => {
  return(
    <button onClick = {increment(value)}>{text}</button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementGood = (good) => () => setGood(good + 1)
  const incrementNeutral = (neutral) => () => setNeutral(neutral + 1)
  const incrementBad = (bad) => () => setBad(bad + 1)


  return (
    <div>
      <h1>give feedback</h1>
      <Button text = "good" increment = {incrementGood} value = {good}/>
      <Button text = "neutral" increment = {incrementNeutral} value = {neutral}/>
      <Button text = "bad" increment = {incrementBad} value = {bad}/>
      <Statistics good = {good} bad = {bad} neutral = {neutral} />
    </div>
  )
}

export default App
