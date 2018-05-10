import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga'

import rootSaga from './sagas'
import areaReducer from './reducers/area'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const sagaMiddleware = createSagaMiddleware()

export default () => {
  let middlewares = [sagaMiddleware]
  if (process.env.NODE_ENV !== 'production') {
    const logger = createLogger()
    middlewares.push(logger)
  }
  const store = {
    ...createStore(
    combineReducers({
        area: areaReducer
    }),
    composeEnhancers(applyMiddleware(...middlewares))
  ),
  runSaga: sagaMiddleware.run
}

  return store
}