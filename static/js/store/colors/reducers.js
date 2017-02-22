import { ADD_COLOR, ListColors } from './actions'

function colorsReducer(state = ListColors, action){
  switch (action.type) {
    case ADD_COLOR:
      return [
        ...state,
        action.color
      ]
    default:
      return state
  }
}

export default colorsReducer