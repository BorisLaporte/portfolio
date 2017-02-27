import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import colorsReducer from './colors/reducers'
import projectsReducer from './projects/reducers'
import responsiveReducer from './responsive/reducers'

const portfolioApp = combineReducers({
  colorsReducer,
  projectsReducer,
  responsiveReducer
})

// const loggerMiddleware = createLogger()

export default function configureStore() {
  return createStore(
    portfolioApp,
    applyMiddleware(
      thunkMiddleware
    )
  )
}