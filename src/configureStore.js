import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import LogRocket from 'logrocket';

import rootSaga from './sagas'
import areaReducer from './reducers/area'
import filters from './reducers/filters'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const sagaMiddleware = createSagaMiddleware()

export default () => {
    let middlewares = [
        sagaMiddleware,
        LogRocket.reduxMiddleware()
    ]
    if (process.env.NODE_ENV !== 'production') {
        const logger = createLogger()
        middlewares.push(logger)
    }
    const store = {
        ...createStore(
            combineReducers({
                area: areaReducer,
                filters
            }),
            composeEnhancers(applyMiddleware(...middlewares))
        ),
        runSaga: sagaMiddleware.run
    }

    return store
}