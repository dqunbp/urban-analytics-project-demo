import React from "react"
import ReactDOM from "react-dom"
import 'normalize.css'

class HelloMessage extends React.Component {
  render() {
    return (
        <div>Hello {this.props.name}</div>
    )
  }
}

var mountNode = document.getElementById("app")
ReactDOM.render(<HelloMessage name="MR!" />, mountNode)