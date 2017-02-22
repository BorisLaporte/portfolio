import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import colorsReducer from './colors/reducers'
import projectsReducer from './projects/reducers'

const portfolioApp = combineReducers({
  colorsReducer,
  projectsReducer
})

const loggerMiddleware = createLogger()

export default function configureStore() {
  return createStore(
    portfolioApp,
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    )
  )
}