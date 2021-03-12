import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
  const getMaxMsg = () => {
    let max = -1, index = -1; 
    for (var i = 0; i < selected.votes.length; i++) {
      if (max < selected.votes[i]){
        max = selected.votes[i]
        index = i
      }
    }
    return (index)
  }

  const [selected, setSelected] = useState({
    index: 0, votes: Array(anecdotes.length).fill(0), mostVoted: 0
  })
  
  const getRand = () => 
    setSelected({...selected, index: Math.floor((Math.random() * Math.floor(anecdotes.length)))
      , mostVoted: getMaxMsg(0)})
  const incrementVote = () => {
    const temp =  selected.votes
    temp[selected.index]+=1
    return (
      setSelected({...selected, votes: temp, mostVoted: getMaxMsg(0)})
    )
  }

  return (
    <div>
      <h1>Ancedote of the day</h1>
      <p>{anecdotes[selected.index]} <br/>
      has {selected.votes[selected.index]} votes</p>
      <button onClick = {incrementVote}>vote</button>
      <button onClick = {getRand}> next ancendote </button> 
      <h1>Ancedote with most votes</h1>
      <p>{anecdotes[selected.mostVoted]}</p>

    </div>ls
  )
}

export default App