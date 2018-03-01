import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'


class Display extends Component {
  constructor(props) {
    super(props)
    //this.state = {nihongo: props.nihongo, romeji:""}
    console.log(this.props)
  }
  
  render() {
    const style = {
      margin: 12,
    }

    if (this.props.nihongo == "") {
      return (
        <div></div>
      )
    } else {
      return (
        <div>
          <div ><p className="meimei">命名(Named)</p></div>
          <div ><p className="namae">{this.props.nihongo}</p></div>
          <div ><p className="romeji">{this.props.romeji}</p></div>
        </div>
      )
    }
  }
}

export default Display