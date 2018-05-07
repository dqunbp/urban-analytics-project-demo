import React from "react"
import ReactDOM from "react-dom"
import 'normalize.css'

class App extends React.Component {
  render() {
    return (
        <div className="app">
            <div className="sibebar">
                Sidebar
            </div>
            <div className="map">
                Map
            </div>
        </div>
    )
  }
}

var mountNode = document.getElementById("app")
ReactDOM.render(<App />, mountNode)