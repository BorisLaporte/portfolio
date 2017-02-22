import fetch from 'isomorphic-fetch'

export const REQUEST_PROJECTS = 'REQUEST_PROJECTS'

function requestProjects() {
  return {
    type: REQUEST_PROJECTS
  }
}


export const RECEIVE_PROJECTS = 'RECEIVE_PROJECTS'

function receiveProjects(json) {
  return {
    type: RECEIVE_PROJECTS,
    projects: json
  }
}


export function fetchProjects() {
  return function (dispatch) {
    dispatch(requestProjects())
    return fetch(window.location.href+"api/projects?lang=en")
      .then(response => response.json())
      .then(json =>
        dispatch(receiveProjects(json))
      )
  }
}