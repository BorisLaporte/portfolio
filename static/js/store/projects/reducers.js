import { REQUEST_PROJECTS, RECEIVE_PROJECTS, CLICK_PROJECTS } from './actions'

function projectsReducer(state = {
  isFetching: false,
  items: [],
  index: 0
}, action) {
  switch (action.type) {
    case REQUEST_PROJECTS:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_PROJECTS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.projects
      })
    case CLICK_PROJECTS:
      return Object.assign({}, state, {
        index: action.index
      })
    default:
      return state
  }
}

export default projectsReducer