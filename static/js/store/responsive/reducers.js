import { RESIZING, LANDSCAPE, PORTRAIT } from './actions'

export default function responsiveReducer(state = {
  width: 0,
  height: 0,
  orientation: LANDSCAPE,
  works_stage: 0
}, action) {
  switch (action.type) {
    case RESIZING:
      return Object.assign({}, state, {
        width: action.width,
        height: action.height,
        orientation: action.orientation,
        works_stage: action.works_stage
      })
    default:
      return state
  }
}