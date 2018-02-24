import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Paper from 'material-ui/Paper'


class Display extends Component {
  constructor(props) {
    super(props)
    //this.state = {nihongo: props.nihongo, romeji:""}
  }
  
  render() {

    const style_paper = {
      height: 100,
      width: 100,
      margin: 20,
      padding:20,
      textAlign: 'center',
      display: 'inline-block',
    }

    const style_paper2 = {
      height: 50,
      width: 50,
      margin: 5,
      padding:15,
      textAlign: 'center',
      display: 'inline-block',
    }


    return (
      <div>
        <div>
          { this.props.nihongo.split('').map((c) => {
            return <Paper style={style_paper} zDepth={2} key={c}><font fontFamily="serif" size='7'>{c}</font></Paper>
            })
          }
        </div>
        <div>
          { this.props.romeji.split('').map((c) => {
            return <Paper style={style_paper2} zDepth={2}><font fontFamily="serif" size='4'>{c}</font></Paper>
            })
          }
        </div>
      </div>
    )
  }
}

export default Display