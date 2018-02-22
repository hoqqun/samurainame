import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton'
import DatePicker from 'material-ui/DatePicker'
import Paper from 'material-ui/Paper'


class InputForm extends Component {
  constructor(props) {
    super(props)
    this.state = {name: "", romeji: "Shimura", nihongo: "しむら", male:true, birth_year:"1999", birth_month:"01", birth_day:"01"}
  }

  onClickSubmit() {

    const csrfToken = document.getElementsByName('csrf-token').item(0).content

    fetch('http://localhost:3000/names/fetch', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken,
      },
      body: JSON.stringify({name: 
        {
          name: this.state.name, 
          male: this.state.male,
          birth_year: this.state.birth_year,
          birth_month: this.state.birth_month,
          birth_day: this.state.birth_day,
          birth_date: this.state.birth_date
        }})
    })
    .then((response) => response.json())
    .then((json) => this.setState({nihongo: json.nihongo, romeji: json.romeji}))
  }

  onChangeName(event) {
    this.setState({name: event.target.value})
  }

  onChangeMale(event,value) {
    this.setState({male: value == "on"})
  }

  onChangeDate(event,date) {
    this.setState({birth_year: date.getFullYear(), birth_month: date.getMonth(), birth_day: date.getDate()})
  }

  render() {
    const style = {
      margin: 12,
    }

    return (
      <MuiThemeProvider>
        <div>
          <div><TextField hintText="FirstName LastName" errorText="Error" onChange={(event) => this.onChangeName(event)} /></div>
          <div>
            <RadioButtonGroup name="male" defaultSelected="on" onChange={(event,value) => this.onChangeMale(event,value)}>
              <RadioButton value="on" label="Male"/>
              <RadioButton value="off" label="Female"/>
            </RadioButtonGroup>
          </div>
          <div><DatePicker hintText="Your Birth Day" container="inline" onChange={(event, date) => this.onChangeDate(event,date)} /></div>
          <div><RaisedButton label="Generate" onClick={() => this.onClickSubmit()} style={style} /></div>
          <br/>
          <div><Display nihongo={this.state.nihongo} romeji={this.state.romeji} /></div>
        </div>
      </MuiThemeProvider>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <InputForm />,
    document.body.appendChild(document.createElement('div'))
  )
})

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