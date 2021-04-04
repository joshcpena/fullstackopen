const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action, state)
  switch (action.type) {
    case 'GOOD': {
      const updatedState = { ...state, good: state.good + 1 }
      return updatedState
    }
    case 'OK': {
      const updatedState = { ...state, ok: state.ok + 1 }
      return updatedState
    }
    case 'BAD': {
      const updatedState = { ...state, bad: state.bad + 1 }
      return updatedState
    }
    case 'RESET': {
      return initialState
    }
    default: return state
  }

}

export default counterReducer