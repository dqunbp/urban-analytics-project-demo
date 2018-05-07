import React from "react"
import ReactDOM from "react-dom"
import 'normalize.css'
import 'leaflet/dist/leaflet.css'
import 'c3/c3.css'

import './styles/style.css'

import UrbanAnalyticsApp from './components/UrbanAnalyticsApp'

var mountNode = document.getElementById("app")
ReactDOM.render(<UrbanAnalyticsApp />, mountNode)