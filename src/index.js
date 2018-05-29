import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import 'normalize.css'
import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css'
import './styles/style.css'

import rootSaga from './sagas'
import configureStore from './configureStore'
import UrbanAnalyticsApp from './components/UrbanAnalyticsApp'

const mountNode = document.getElementById("app")
const store = configureStore()
const jsx = (
    <Provider store={store}>
        <UrbanAnalyticsApp />
    </Provider>
)
ReactDOM.render(jsx, mountNode)
store.runSaga(rootSaga)